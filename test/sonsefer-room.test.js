import test from 'node:test';
import assert from 'node:assert/strict';
import { startServer } from '../src/server.js';
import { Client, setup, tmpDb, fresh } from './helpers.js';

// Ev sahibi hikâyeyi seçer ve oyunu başlatır
async function startSS(n, srv) {
  const g = await setup(n, srv);
  assert.ok((await g.host.req('setStory', { storyId: 'son_sefer' })).ok);
  await Promise.all(g.cs.map((c) => c.until((s) => s.storyId === 'son_sefer')));
  assert.ok((await g.host.req('start')).ok);
  await Promise.all(g.cs.map((c) => c.until((s) => s.phase === 'READING')));
  return g;
}
const byName = (snap, name) => snap.players.find((p) => p.name === name).id;

async function everyoneReady(cs) {
  const v = cs[0].snap.phaseVersion;
  await Promise.all(cs.map((c) => c.until((s) => s.phaseVersion === v)));
  for (const c of cs) { const r = await c.ready(); assert.ok(r.ok, r.error); }
  await Promise.all(cs.map((c) => c.until((s) => s.phaseVersion > v)));
}
async function everyoneVotes(cs, pick) {
  const v = cs[0].snap.phaseVersion;
  await Promise.all(cs.map((c) => c.until((s) => s.phaseVersion === v && s.phase === 'VOTING')));
  for (const [i, c] of cs.entries()) { const r = await c.vote(pick(c.snap, i)); assert.ok(r.ok, r.error); }
  await Promise.all(cs.map((c) => c.until((s) => s.phaseVersion > v)));
}

test('Son Sefer: hikâye seçimi yalnız ev sahibinde ve lobide', async () => {
  const srv = await fresh();
  const { cs, host } = await setup(4, srv);
  assert.match((await cs[1].req('setStory', { storyId: 'son_sefer' })).error, /ev sahibi/);
  assert.match((await host.req('setStory', { storyId: 'yok' })).error, /Bilinmeyen/);
  assert.ok(host.snap.stories.length >= 2);
  await host.req('setStory', { storyId: 'son_sefer' });
  await host.until((s) => s.storyId === 'son_sefer' && s.intro.goal.includes('kıyıya'));
  await host.req('start');
  await host.until((s) => s.phase === 'READING');
  assert.match((await host.req('setStory', { storyId: 'adin_kimde_kaldi' })).error, /başladıktan/);
  assert.equal(host.snap.page.nodeId, 'S2_N01');
  cs.forEach((c) => c.close());
  await srv.close();
});

test('Son Sefer: görevli oylaması, ölüm yalnız ölene gider, ölü oy verir ama aday olamaz', async () => {
  const srv = await fresh();
  const { cs, host } = await startSS(4, srv);
  // N01 D (görevsiz)
  await everyoneReady(cs);
  assert.equal(host.snap.voting.kind, 'ACTION');
  assert.equal(host.snap.voting.options.length, 4);
  await everyoneVotes(cs, () => 'D');
  assert.equal(host.snap.phase, 'RESULT');
  await everyoneReady(cs);
  // N02 D: lomboz → birinci görevli ölür
  await everyoneReady(cs);
  await everyoneVotes(cs, () => 'D');
  assert.equal(host.snap.voting.kind, 'PRIMARY');
  assert.equal(host.snap.voting.options.length, 4);
  const victimName = 'Kişi 2';
  const victim = byName(host.snap, victimName);
  // eşitlik: 2–2 → yeniden
  const other = byName(host.snap, 'Kişi 3');
  await everyoneVotes(cs, (s, i) => (i < 2 ? victim : other));
  assert.equal(host.snap.phase, 'TIE_RESULT');
  assert.equal(host.snap.page.remaining.length, 2);
  await everyoneReady(cs);
  assert.equal(host.snap.voting.kind, 'PRIMARY');
  assert.equal(host.snap.voting.options.length, 2);
  await everyoneVotes(cs, () => victim);
  assert.equal(host.snap.phase, 'RESULT');
  assert.deepEqual(host.snap.page.deathsNow, [victimName]);
  const vc = cs.find((c) => c.session.playerId === victim);
  await vc.until(() => vc.deaths?.length === 1);
  assert.match(vc.deaths[0].event.key, /^JS0\d$/);
  for (const c of cs) if (c !== vc) assert.ok(!c.deaths, 'ölüm başkasına gitti');
  assert.ok(vc.snap.page.personal && vc.snap.page.personal.key === 'JS04');
  assert.ok(!host.snap.page.personal);
  assert.ok(!JSON.stringify(host.snap).includes('JS04'), 'jumpscare anahtarı başkasının ekranına sızdı');
  assert.ok((await vc.req('ackDeath', { eventId: vc.deaths[0].event.eventId })).ok);
  await everyoneReady(cs);
  // N03: ölü sahnede etiketli, hayalet sayfası açılır; aday listesinde yok ama oy veriyor
  assert.equal(vc.snap.page.viewerDead, true);
  assert.ok(vc.snap.page.ghost == null); // N02 ölümü sırasında aynı aralığın sayfası kartta verildi
  await everyoneReady(cs);
  await everyoneVotes(cs, () => 'D'); // N03 D: 1 görevli
  assert.equal(host.snap.voting.kind, 'PRIMARY');
  assert.ok(!host.snap.voting.options.some((o) => o.id === victim));
  assert.deepEqual(host.snap.voting.ghosts, [victimName]);
  assert.match((await vc.vote(victim)).error, /oylanmıyor/);
  const pick = host.snap.voting.options[0].id;
  await everyoneVotes(cs, () => pick);
  assert.equal(host.snap.phase, 'RESULT');
  assert.equal(host.snap.survival.players[pick].fatigue, 1);
  await everyoneReady(cs);
  // N04'te ölüye yeni aralığın sayfası gelir
  assert.equal(vc.snap.page.ghost.title, 'Basıncı Taklit Edemez');
  assert.equal(host.snap.page.ghost, null);
  cs.forEach((c) => c.close());
  await srv.close();
});

test('Son Sefer: iki görevli eylemde ikinci turda birinci aday yok; restart PRIMARY/HELPER içinde devam eder', async () => {
  const db = tmpDb();
  let srv = await startServer({ port: 0, host: '127.0.0.1', dbFile: db, quiet: true });
  const { cs, host, code } = await startSS(5, srv);
  for (const opt of ['B', 'A', 'D']) { // N01B, N02A, N03D
    await everyoneReady(cs);
    await everyoneVotes(cs, () => opt);
    if (host.snap.phase === 'VOTING') await everyoneVotes(cs, (s) => s.voting.options[0].id);
    await everyoneReady(cs);
  }
  // N04 B: iki görevli
  await everyoneReady(cs);
  await everyoneVotes(cs, () => 'B');
  assert.equal(host.snap.voting.kind, 'PRIMARY');
  assert.equal(host.snap.voting.action.need, 2);
  const first = host.snap.voting.options[0].id;
  await everyoneVotes(cs, () => first);
  assert.equal(host.snap.voting.kind, 'HELPER');
  assert.ok(!host.snap.voting.options.some((o) => o.id === first));
  assert.equal(host.snap.voting.options.length, 4);
  await cs[0].vote(host.snap.voting.options[1].id);
  const sessions = cs.map((c) => c.session);
  cs.forEach((c) => c.close());
  await srv.close();
  srv = await startServer({ port: 0, host: '127.0.0.1', dbFile: db, quiet: true });
  const back = [];
  for (const s of sessions) { const c = new Client(srv.port); await c.open(); await c.req('resume', { roomCode: code, playerId: s.playerId, key: s.key }); c.session = s; back.push(c); }
  await back[0].until((s) => s.phase === 'VOTING' && s.voting.kind === 'HELPER' && s.voting.votedCount === 1);
  const helper = back[0].snap.voting.options[1].id;
  for (const c of back.slice(1)) await c.vote(helper);
  await back[0].until((s) => s.phase === 'RESULT');
  assert.equal(back[0].snap.page.actors.length, 2);
  assert.equal(srv.rooms.get(code).decisionLog.at(-1).actors[0], first);
  back.forEach((c) => c.close());
  await srv.close();
});

test('Son Sefer: 1 kişi + 3 bot tam oyunu bitirir; botların ölümü kimseye jumpscare göndermez', async () => {
  const srv = await fresh();
  for (let trial = 0; trial < 3; trial++) {
    const host = new Client(srv.port); await host.open();
    await host.req('create', { name: 'Yalnız' });
    await host.req('setStory', { storyId: 'son_sefer' });
    for (let i = 0; i < 3; i++) await host.req('addBot');
    await host.until((s) => s.players.length === 4);
    await host.req('start');
    await host.until((s) => s.phase === 'READING');
    let guard = 0;
    while (!['ENDING', 'FINISHED'].includes(host.snap.phase) && guard++ < 800) {
      const s = host.snap;
      if (s.phase === 'VOTING') {
        const o = s.voting.options;
        await host.vote(o[(guard * 7 + trial) % o.length].id);
      } else {
        const r = await host.ready();
        assert.ok(r.ok, r.error);
      }
      await host.until((x) => x.phaseVersion > s.phaseVersion);
    }
    assert.equal(host.snap.phase, 'ENDING');
    assert.ok(host.snap.ending.title);
    assert.ok(!/[{}]/.test(host.snap.ending.paragraphs.join('')));
    const room = srv.rooms.get(host.session.roomCode);
    for (const e of room.ss.deathEvents) {
      const bot = !!room.players.find((p) => p.id === e.playerId).isBot;
      assert.equal(e.status === 'skipped', bot);
    }
    const myDeaths = room.ss.deathEvents.filter((e) => e.playerId === host.session.playerId).length;
    assert.equal(host.deaths?.length || 0, myDeaths);
    host.close();
  }
  await srv.close();
});
