import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import WebSocket from 'ws';
import { startServer } from '../src/server.js';

let seq = 0;
export class Client {
  constructor(port) { this.port = port; this.snap = null; this.pending = new Map(); this.waiters = []; }
  open() {
    return new Promise((res, rej) => {
      this.ws = new WebSocket(`ws://127.0.0.1:${this.port}/ws`);
      this.ws.on('open', res);
      this.ws.on('error', rej);
      this.ws.on('message', (raw) => {
        const m = JSON.parse(raw);
        if (m.type === 'snapshot' && (!this.snap || m.snapshot.rev >= this.snap.rev || m.snapshot.gameId !== this.snap.gameId)) {
          this.snap = m.snapshot;
          this.waiters = this.waiters.filter((w) => !(w.pred(this.snap) && (w.res(this.snap), true)));
        }
        if (m.type === 'session') this.session = m;
        if (m.type === 'death') (this.deaths ||= []).push(m);
        if (m.type === 'response' && this.pending.has(m.requestId)) { this.pending.get(m.requestId)(m); this.pending.delete(m.requestId); }
      });
    });
  }
  req(type, body = {}, requestId = `r${++seq}`) {
    return new Promise((res) => { this.pending.set(requestId, res); this.ws.send(JSON.stringify({ type, requestId, ...body })); });
  }
  until(pred, ms = 3000) {
    if (this.snap && pred(this.snap)) return Promise.resolve(this.snap);
    return new Promise((res, rej) => {
      const t = setTimeout(() => rej(new Error('zaman aşımı; faz=' + this.snap?.phase)), ms);
      this.waiters.push({ pred, res: (s) => { clearTimeout(t); res(s); } });
    });
  }
  ready() { return this.req('ready', { pageId: this.snap.pageId, phaseVersion: this.snap.phaseVersion }); }
  vote(opt) { const v = this.snap.voting; return this.req('vote', { nodeId: v.nodeId, voteRound: v.round, optionId: opt, phaseVersion: this.snap.phaseVersion }); }
  close() { this.ws.close(); }
}

export async function setup(n, srv) {
  const host = new Client(srv.port); await host.open();
  assert.ok((await host.req('create', { name: 'Ev Sahibi' })).ok);
  const code = host.session.roomCode;
  const cs = [host];
  for (let i = 1; i < n; i++) {
    const c = new Client(srv.port); await c.open();
    const r = await c.req('join', { roomCode: code, name: `Kişi ${i}` });
    assert.ok(r.ok, r.error);
    cs.push(c);
  }
  await host.until((s) => s.players.length === n);
  return { cs, code, host };
}

export async function allReady(cs, nextPhase) {
  const v = cs[0].snap.phaseVersion;
  await Promise.all(cs.map((c) => c.until((s) => s.phaseVersion === v)));
  for (const c of cs) await c.ready();
  await Promise.all(cs.map((c) => c.until((s) => s.phaseVersion > v)));
  if (nextPhase) assert.equal(cs[0].snap.phase, nextPhase);
}

export async function voteAll(cs, opts) {
  const v = cs[0].snap.phaseVersion;
  await Promise.all(cs.map((c) => c.until((s) => s.phaseVersion === v && s.phase === 'VOTING')));
  const rs = await Promise.all(cs.map((c, i) => c.vote(opts[i])));
  for (const r of rs) assert.ok(r.ok, r.error);
  await Promise.all(cs.map((c) => c.until((s) => s.phaseVersion > v)));
  return cs[0].snap;
}

export const tmpDb = () => path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'akk-')), 'test.db');
export const fresh = () => startServer({ port: 0, host: '127.0.0.1', dbFile: tmpDb(), quiet: true });

