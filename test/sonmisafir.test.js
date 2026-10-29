import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {
  NODES, ENDINGS, STORY, initialState, resolve, livingIds, focusId, fill, applyConditionals, taskNeed,
  evalCond, checklistFor, ghostPageFor, clone, JS_KEYS,
} from '../src/sonmisafir/engine.js';

const read = (p) => JSON.parse(fs.readFileSync(new URL(p, import.meta.url)));
const ORIG = read('../content/son-misafirler/story.orig.json');
const SIMPLE = read('../content/son-misafirler/story.json');
const V = read('../content/son-misafirler/validation.json');
const castOf = (n) => Array.from({ length: n }, (_, i) => ({ playerId: 'p' + i, displayName: `Oyuncu${i + 1}` }));

function play(n, steps) {
  const cast = castOf(n);
  let s = initialState(cast);
  let at = 'S3_N01';
  const deaths = [];
  for (const st of steps) {
    assert.equal(st.node, at, `yol kopuk: ${at} beklenirken ${st.node}`);
    const opt = NODES[at].options.find((o) => o.id === st.choice);
    const need = taskNeed(opt, livingIds(s, cast).length);
    const actors = st.actors.slice(0, need).map((i) => cast[i].playerId);
    const r = resolve(at, st.choice, s, actors, cast);
    deaths.push(...r.deaths);
    s = r.state;
    at = r.target;
  }
  return { ending: at, state: s, cast, deaths };
}

test('sadeleştirme oyun mantığını değiştirmedi (koşul, etki, ölüm, final, görevli sayısı aynı)', () => {
  assert.equal(SIMPLE.nodes.length, 24);
  for (const [i, n] of ORIG.nodes.entries()) {
    const m = SIMPLE.nodes[i];
    assert.equal(m.id, n.id);
    assert.equal(m.next, n.next);
    for (const [oid, o] of Object.entries(n.choices)) {
      const mo = m.choices[oid];
      assert.equal(mo.taskCount, o.taskCount, `${n.id}${oid}`);
      assert.equal(mo.cases.length, o.cases.length);
      for (const [k, c] of o.cases.entries()) {
        const mc = mo.cases[k];
        for (const f of ['when', 'effects', 'kill', 'jumpscare', 'ending']) assert.deepEqual(mc[f], c[f], `${n.id}${oid}${k}.${f}`);
      }
    }
  }
  assert.deepEqual(SIMPLE.endings.map((e) => [e.id, e.status, e.childOutcome, e.entityOutcome]), ORIG.endings.map((e) => [e.id, e.status, e.childOutcome, e.entityOutcome]));
  assert.deepEqual(SIMPLE.initialFlags, ORIG.initialFlags);
});

test('içerik: 24 sahne, 96 seçenek, 116 sonuç, 20 final, her sonuç listesi varsayılanla biter', () => {
  let opts = 0, cases = 0;
  for (const n of Object.values(NODES)) {
    assert.deepEqual(n.options.map((o) => o.id), ['A', 'B', 'C', 'D']);
    for (const o of n.options) {
      opts++; cases += o.cases.length;
      assert.deepEqual(o.cases.at(-1).when, { always: true }, `${n.id}${o.id}`);
      if (o.taskCount === 2) assert.ok(o.soloBrief);
    }
  }
  assert.equal(opts, 96);
  assert.equal(cases, 116);
  assert.equal(Object.keys(ENDINGS).length, 20);
});

for (const [ending, w] of Object.entries(V.endingWitnesses)) {
  test(`doğrulanmış yol → ${ending} (${w.playerCount} kişi)`, () => {
    const r = play(w.playerCount, w.steps);
    assert.equal(r.ending, ending);
    assert.equal(livingIds(r.state, r.cast).length, w.living);
  });
}

test('JS01–JS08 her biri en az bir ölümden tetiklenir', () => {
  const used = new Set();
  for (const n of Object.values(NODES)) for (const o of n.options) for (const c of o.cases) if (c.jumpscare) used.add(c.jumpscare);
  assert.deepEqual([...used].sort(), JS_KEYS);
});

test('N15C: yorgunluk 2 veya tanınma 3 ise ölür, değilse ölmez; eşik görevden önceki değer', () => {
  const cast = castOf(4);
  for (const [f, e, dies] of [[0, 0, false], [1, 2, false], [2, 0, true], [0, 3, true], [1, 2, false]]) {
    const s = initialState(cast); s.fatigue.p0 = f; s.exposure.p0 = e;
    const r = resolve('S3_N15', 'C', s, ['p0'], cast);
    assert.equal(!r.state.alive.p0, dies, `f=${f} e=${e}`);
    if (!dies) { assert.equal(r.state.fatigue.p0, Math.min(2, f + 1)); assert.equal(r.state.exposure.p0, Math.min(3, e + 1)); }
  }
});

test('N16B yalnız tanınma 3 iken ölümcül', () => {
  const cast = castOf(4);
  for (const [e, dies] of [[2, false], [3, true]]) {
    const s = initialState(cast); s.exposure.p1 = e; s.fatigue.p1 = 2;
    assert.equal(!resolve('S3_N16', 'B', s, ['p1'], cast).state.alive.p1, dies);
  }
});

test('arınma: N18A görev artışından sonra tanınmayı sıfırlar; N23D ortak, yeni iz yok', () => {
  const cast = castOf(4);
  const s = initialState(cast);
  s.flags.power = true; s.flags.tagged = true; s.flags.invited = true;
  s.exposure.p0 = 2; s.exposure.p2 = 3;
  const r = resolve('S3_N18', 'A', s, ['p0', 'p1'], cast).state;
  assert.deepEqual(Object.values(r.exposure), [0, 0, 0, 0]);
  assert.equal(r.flags.tagged, false);
  assert.equal(r.flags.invited, false);
  assert.equal(r.fatigue.p0, 1); // yorgunluk artışı kalır
  const s2 = initialState(cast); s2.exposure.p3 = 3;
  const r2 = resolve('S3_N23', 'D', s2, [], cast).state;
  assert.deepEqual(Object.values(r2.exposure), [0, 0, 0, 0]);
});

test('ölen görevliye artış yok; başarısız ama ölümsüz görevde artış var; taskCount 0 artış yok', () => {
  const cast = castOf(4);
  const s = initialState(cast);
  const dead = resolve('S3_N03', 'B', s, ['p0'], cast).state;
  assert.equal(dead.alive.p0, false);
  assert.equal(dead.fatigue.p0, 0);
  const fail = resolve('S3_N10', 'A', s, ['p1'], cast).state; // anahtar yok → başarısız
  assert.equal(fail.fatigue.p1, 1);
  assert.equal(fail.completedTasks.p1, 1);
  const none = resolve('S3_N01', 'D', s, [], cast).state;
  assert.deepEqual(none.fatigue, s.fatigue);
});

test('N14A önkoşul eksikse öldürmez; N19C önceki serbest bırakmayı geri almaz', () => {
  const cast = castOf(4);
  const s = initialState(cast);
  const r = resolve('S3_N14', 'A', s, ['p0'], cast);
  assert.equal(r.deaths.length, 0);
  assert.equal(r.state.flags.childFreed, false);
  const f = initialState(cast); f.flags.childFreed = true;
  assert.equal(resolve('S3_N19', 'C', f, ['p0'], cast).state.flags.childFreed, true);
});

test('son yaşayanın sıradan ölümü E20; erken toplu finaller kendi finalinde kalır', () => {
  const cast = castOf(4);
  const s = initialState(cast);
  for (const p of ['p1', 'p2', 'p3']) s.alive[p] = false;
  assert.equal(resolve('S3_N03', 'B', s, ['p0'], cast).target, 'S3_E20');
  const all = resolve('S3_N05', 'C', initialState(cast), [], cast);
  assert.equal(all.target, 'S3_E18');
  assert.equal(all.deaths.length, 4);
  assert.equal(new Set(all.deaths.map((d) => d.key)).size, 4);
  const one = resolve('S3_N12', 'B', s, [], cast);
  assert.equal(one.target, 'S3_E17');
  assert.deepEqual(one.deaths.map((d) => d.playerId), ['p0']); // daha önce ölene ikinci olay yok
});

test('N24 koşulları sırayla: tam kadro E01, kayıplı E02, sığınak E03', () => {
  const cast = castOf(4);
  const s = initialState(cast);
  for (const f of ['proof', 'childFreed', 'sealKnown', 'power', 'negative']) s.flags[f] = true;
  assert.equal(resolve('S3_N24', 'A', s, [], cast).target, 'S3_E01');
  const lost = clone(s); lost.alive.p3 = false;
  assert.equal(resolve('S3_N24', 'A', lost, [], cast).target, 'S3_E02');
  const ward = initialState(cast); ward.flags.wardKnown = true;
  assert.equal(resolve('S3_N24', 'A', ward, [], cast).target, 'S3_E03');
  const cl = checklistFor('S3_N24', 'A', s);
  assert.ok(cl.find((c) => c.label === 'Kanıt').ok);
  assert.equal(checklistFor('S3_N10', 'A', s), null);
  const dirty = initialState(cast); dirty.flags.invited = true;
  assert.equal(checklistFor('S3_N24', 'B', dirty).find((c) => c.label === 'Üzerinizde iz yok').ok, false);
});

test('koşullu cümleler: oyuncu yalnız kendi durumunu görür', () => {
  const cast = castOf(4);
  const s = initialState(cast);
  const n10 = fill(NODES.S3_N10.text, { cast, state: s, focus: 'p0' });
  assert.match(n10, /kendi sesiniz/);
  assert.ok(!/\[\[|\]\]/.test(n10));
  s.alive.p2 = false; s.deathOrder.push('p2');
  assert.match(fill(NODES.S3_N10.text, { cast, state: s, focus: 'p0' }), /Oyuncu3 sizi çağırıyor/);
  assert.match(fill(NODES.S3_N11.text, { cast, state: s }), /içeri almamıştınız/);
  s.flags.invited = true;
  assert.match(fill(NODES.S3_N11.text, { cast, state: s }), /koridordan onun ayak seslerini/);
  assert.throws(() => applyConditionals('[[foo|a|b]]', s), /Geçersiz/);
});

test('4–10 kişide bütün metinler yer tutucusuz ve koşulsuz dolar', () => {
  for (let n = 4; n <= 10; n++) {
    const cast = castOf(n);
    for (const variant of [0, 1]) {
      const s = initialState(cast);
      if (variant) { s.alive.p1 = false; s.deathOrder.push('p1'); for (const f of Object.keys(s.flags)) s.flags[f] = true; }
      for (const node of Object.values(NODES)) {
        const focus = focusId(node.id, s, cast);
        const t = fill(node.text, { cast, state: s, focus });
        assert.ok(!/[{}[\]]/.test(t), `${n} ${node.id}: ${t.match(/[{}[\]].{0,20}/)}`);
        for (const o of node.options) for (const c of o.cases) {
          const ct = fill(c.text, { cast, state: s, condState: s, focus, actors: ['p0', 'p2'] });
          assert.ok(!/[{}[\]]/.test(ct), `${node.id}${o.id}`);
        }
      }
      for (const e of Object.values(ENDINGS)) assert.ok(!/[{}[\]]/.test(fill(e.text, { cast, state: s, victims: ['p0'] })), e.id);
    }
  }
});

test('ölü sayfaları altı aralığı kapsar; koşul dili bilinmeyen alanı reddeder', () => {
  assert.equal(STORY.ghostPages.length, 6);
  for (let k = 1; k <= 24; k++) assert.ok(ghostPageFor(`S3_N${String(k).padStart(2, '0')}`));
  assert.throws(() => evalCond({ eval: 1 }, initialState(castOf(4)), null, castOf(4)), /Bilinmeyen/);
  assert.throws(() => evalCond({ flag: 'yok' }, initialState(castOf(4)), null, castOf(4)), /Bilinmeyen bayrak/);
});
