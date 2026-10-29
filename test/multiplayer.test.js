import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import WebSocket from 'ws';
import { startServer } from '../src/server.js';

let seq = 0;
class Client {
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

async function setup(n, srv) {
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

async function allReady(cs, nextPhase) {
  const v = cs[0].snap.phaseVersion;
  await Promise.all(cs.map((c) => c.until((s) => s.phaseVersion === v)));
  for (const c of cs) await c.ready();
  await Promise.all(cs.map((c) => c.until((s) => s.phaseVersion > v)));
  if (nextPhase) assert.equal(cs[0].snap.phase, nextPhase);
}

async function voteAll(cs, opts) {
  const v = cs[0].snap.phaseVersion;
  await Promise.all(cs.map((c) => c.until((s) => s.phaseVersion === v && s.phase === 'VOTING')));
  const rs = await Promise.all(cs.map((c, i) => c.vote(opts[i])));
  for (const r of rs) assert.ok(r.ok, r.error);
  await Promise.all(cs.map((c) => c.until((s) => s.phaseVersion > v)));
  return cs[0].snap;
}

const tmpDb = () => path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'akk-')), 'test.db');
const fresh = () => startServer({ port: 0, host: '127.0.0.1', dbFile: tmpDb(), quiet: true });

test('3 oyuncuyla başlamaz, 11. oyuncu katılamaz, aynı ad reddedilir', async () => {
  const srv = await fresh();
  const { cs, code, host } = await setup(3, srv);
  assert.match((await host.req('start')).error, /En az 4/);
  const dupe = new Client(srv.port); await dupe.open();
  assert.match((await dupe.req('join', { roomCode: code, name: 'kişi 1' })).error, /kullanılıyor/);
  assert.match((await dupe.req('join', { roomCode: code, name: '​​' })).error, /görünmeyen/);
  assert.match((await dupe.req('join', { roomCode: code, name: '!!' })).error, /harf/);
  const extra = [];
  for (let i = 3; i < 10; i++) { const c = new Client(srv.port); await c.open(); assert.ok((await c.req('join', { roomCode: code, name: `Ek ${i}` })).ok); extra.push(c); }
  const eleven = new Client(srv.port); await eleven.open();
  assert.match((await eleven.req('join', { roomCode: code, name: 'On Bir' })).error, /dolu/);
  // ev sahibi olmayan başlatamaz
  assert.match((await cs[1].req('start')).error, /ev sahibi/);
  [...cs, ...extra, dupe, eleven].forEach((c) => c.close());
  await srv.close();
});

test('4 kişi: E01 yolu oynanır, okuma kapısı ve sonuç sayfası işler', async () => {
  const srv = await fresh();
  const { cs, host } = await setup(4, srv);
  assert.ok((await host.req('start')).ok);
  await host.until((s) => s.phase === 'READING');
  const route = 'A A A B B A A A A A A A A A A A A A A A'.split(' ');
  // Okuma kapısı: üç kişi okuyunca oylama açılmaz
  for (const c of cs.slice(0, 3)) await c.ready();
  await host.until((s) => s.readyCount === 3);
  assert.equal(host.snap.phase, 'READING');
  await cs[3].ready();
  await host.until((s) => s.phase === 'VOTING');
  for (let i = 0; i < route.length; i++) {
    if (i > 0) await allReady(cs, 'VOTING');
    const s = await voteAll(cs, [route[i], route[i], route[i], route[i]]);
    assert.equal(s.phase, 'RESULT');
    assert.ok(s.page.paragraphs.length > 0);
    assert.ok(!/[{}]/.test(s.page.paragraphs.join('')));
    await allReady(cs);
  }
  assert.equal(host.snap.phase, 'ENDING');
  assert.equal(host.snap.ending.endingId, 'E01');
  assert.equal(host.snap.ending.path.length, 20);
  await allReady(cs, 'FINISHED');
  // yeniden oyna: lobiye temiz durumla döner
  const oldGame = host.snap.gameId;
  assert.ok((await host.req('returnToLobby')).ok);
  await host.until((s) => s.phase === 'LOBBY');
  assert.notEqual(host.snap.gameId, oldGame);
  cs.forEach((c) => c.close());
  await srv.close();
});

test('eşitlik: 2–2 tekrar, 1–1–1–1 dörtlü tekrar, elenen seçenek kullanılamaz, 20 tur eşitlik ilerlemez', async () => {
  const srv = await fresh();
  const { cs, host } = await setup(4, srv);
  await host.req('start');
  await host.until((s) => s.phase === 'READING');
  await allReady(cs, 'VOTING');
  let s = await voteAll(cs, ['A', 'B', 'C', 'D']);
  assert.equal(s.phase, 'TIE_RESULT');
  assert.deepEqual(s.page.remaining.map((o) => o.id), ['A', 'B', 'C', 'D']);
  await allReady(cs, 'VOTING');
  s = await voteAll(cs, ['A', 'A', 'B', 'B']);
  assert.deepEqual(s.page.remaining.map((o) => o.id), ['A', 'B']);
  await allReady(cs, 'VOTING');
  assert.deepEqual(host.snap.voting.options.map((o) => o.id), ['A', 'B']);
  assert.match((await cs[0].vote('C')).error, /oylanmıyor/);
  for (let r = 0; r < 20; r++) {
    s = await voteAll(cs, ['A', 'A', 'B', 'B']);
    assert.equal(s.phase, 'TIE_RESULT');
    await allReady(cs, 'VOTING');
  }
  assert.equal(host.snap.voting.round, 23);
  s = await voteAll(cs, ['B', 'A', 'B', 'B']);
  assert.equal(s.phase, 'RESULT');
  assert.equal(s.page.optionId, 'B');
  cs.forEach((c) => c.close());
  await srv.close();
});

test('6 kişide 2–2–2–0 üçlü tekrar; 10 kişide 4–4–1–1 ikili tekrar; 4 kişide 2–1–1–0 kazanır', async () => {
  const srv = await fresh();
  for (const [n, votes, expect] of [
    [6, 'A A B B C C', ['A', 'B', 'C']],
    [10, 'A A A A B B B B C D', ['A', 'B']],
    [4, 'C C A B', null],
  ]) {
    const { cs, host } = await setup(n, srv);
    await host.req('start');
    await host.until((s) => s.phase === 'READING');
    await allReady(cs, 'VOTING');
    const s = await voteAll(cs, votes.split(' '));
    if (expect) assert.deepEqual(s.page.remaining.map((o) => o.id), expect);
    else { assert.equal(s.phase, 'RESULT'); assert.equal(s.page.optionId, 'C'); assert.deepEqual(s.page.tally, { A: 1, B: 1, C: 2, D: 0 }); }
    cs.forEach((c) => c.close());
  }
  await srv.close();
});

test('aynı oy iki kez / iki sekme / eski tur: tek oy, tek karar', async () => {
  const srv = await fresh();
  const { cs, host, code } = await setup(4, srv);
  await host.req('start');
  await host.until((s) => s.phase === 'READING');
  await allReady(cs, 'VOTING');
  // ikinci sekme aynı oturumla
  const tab2 = new Client(srv.port); await tab2.open();
  assert.ok((await tab2.req('resume', { roomCode: code, playerId: cs[1].session.playerId, key: cs[1].session.key })).ok);
  await tab2.until((s) => s.phase === 'VOTING');
  assert.ok((await cs[1].vote('A')).ok);
  assert.match((await tab2.vote('B')).error, /kilitlendi/);
  await host.until((s) => s.voting.votedCount === 1);
  // aynı requestId ile son oyu iki kez gönder
  await cs[0].vote('A');
  await cs[2].vote('A');
  const v = host.snap.voting;
  const body = { nodeId: v.nodeId, voteRound: v.round, optionId: 'A', phaseVersion: host.snap.phaseVersion };
  const [r1, r2] = await Promise.all([cs[3].req('vote', body, 'same-1'), new Promise((res) => setTimeout(() => res(cs[3].req('vote', body, 'same-1')), 5))]);
  assert.ok(r1.ok && r2.ok);
  await host.until((s) => s.phase === 'RESULT');
  assert.equal(srv.rooms.get(code).decisionLog.length, 1);
  // eski turun oyu artık kabul edilmez
  const stale = await cs[0].req('vote', body);
  assert.equal(stale.error, 'STALE');
  // geçersiz anahtar
  const bad = new Client(srv.port); await bad.open();
  assert.match((await bad.req('resume', { roomCode: code, playerId: cs[1].session.playerId, key: 'yanlis' })).error, /Oturum/);
  [...cs, tab2, bad].forEach((c) => c.close());
  await srv.close();
});

test('kopan oyuncu beklenir, kilitli oyu korunur; sunucu yeniden başlatılınca VOTING ve RESULT devam eder', async () => {
  const db = tmpDb();
  let srv = await startServer({ port: 0, host: '127.0.0.1', dbFile: db, quiet: true });
  let { cs, host, code } = await setup(4, srv);
  await host.req('start');
  await host.until((s) => s.phase === 'READING');
  await allReady(cs, 'VOTING');
  await cs[0].vote('B');
  await cs[1].vote('B');
  const lost = cs[3].session;
  cs[3].close();
  await host.until((s) => s.players.some((p) => !p.connected));
  await cs[2].vote('B');
  await new Promise((r) => setTimeout(r, 100));
  assert.equal(host.snap.phase, 'VOTING'); // kopan için bekler
  const sessions = cs.map((c) => c.session);
  cs.forEach((c) => c.close());
  await srv.close();

  // yeniden başlat
  srv = await startServer({ port: 0, host: '127.0.0.1', dbFile: db, quiet: true });
  const back = [];
  for (const s of sessions) {
    const c = new Client(srv.port); await c.open();
    assert.ok((await c.req('resume', { roomCode: code, playerId: s.playerId, key: s.key })).ok);
    c.session = { ...s, ...c.session };
    back.push(c);
  }
  await back[0].until((s) => s.phase === 'VOTING' && s.voting.votedCount === 3);
  assert.equal(back[0].snap.voting.myVote, 'B'); // kilitli oy korundu
  assert.ok((await back[3].vote('A')).ok);
  await back[0].until((s) => s.phase === 'RESULT');
  const resultPage = back[0].snap.pageId;
  await back[0].ready();
  await srv.close();
  back.forEach((c) => c.close());

  srv = await startServer({ port: 0, host: '127.0.0.1', dbFile: db, quiet: true });
  const again = [];
  for (const s of sessions) {
    const c = new Client(srv.port); await c.open();
    await c.req('resume', { roomCode: code, playerId: s.playerId, key: s.key });
    again.push(c);
  }
  await again[0].until((s) => s.phase === 'RESULT');
  assert.equal(again[0].snap.pageId, resultPage);
  assert.equal(again[0].snap.readyCount, 1);
  assert.equal(srv.rooms.get(code).decisionLog.length, 1);
  await allReady(again, 'READING');
  assert.equal(again[0].snap.page.nodeId, 'N02');
  again.forEach((c) => c.close());
  await srv.close();
  void lost;
});

test('ev sahibi koparsa yetki en erken katılan bağlı oyuncuya geçer; duraklatma oyu engeller', async () => {
  const srv = await fresh();
  const { cs, host } = await setup(4, srv);
  await host.req('start');
  await cs[1].until((s) => s.phase === 'READING');
  assert.ok((await host.req('pause', { paused: true })).ok);
  await cs[1].until((s) => s.paused);
  assert.match((await cs[1].ready()).error, /duraklatıldı/);
  host.close();
  await cs[1].until((s) => s.me.isHost);
  assert.ok((await cs[1].req('pause', { paused: false })).ok);
  cs.slice(1).forEach((c) => c.close());
  await srv.close();
});
