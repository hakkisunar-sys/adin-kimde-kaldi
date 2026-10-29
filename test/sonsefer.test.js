import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {
  STORY, NODES, ENDINGS, initialState, resolve, livingIds, focusId, evalCond, fill, paras,
  taskNeed, variantKey, resolveFinal, arrivalText, ghostPageFor, clone,
} from '../src/sonsefer/engine.js';

const V = JSON.parse(fs.readFileSync(new URL('../content/son-sefer/validation.json', import.meta.url)));
const castOf = (n) => Array.from({ length: n }, (_, i) => ({ playerId: 'p' + (i + 1), displayName: `Oyuncu${i + 1}` }));

function play(n, pathSteps) {
  const cast = castOf(n);
  let s = initialState(cast);
  let at = 'S2_N01';
  const deaths = [];
  for (const step of pathSteps) {
    assert.equal(step.nodeId, at, `yol kopuk: ${at} beklenirken ${step.nodeId}`);
    const opt = NODES[at].options.find((o) => o.id === step.optionId);
    const need = taskNeed(opt, livingIds(s, cast).length);
    const actors = step.actors.slice(0, need);
    const r = resolve(at, step.optionId, s, actors, cast);
    for (const d of r.deaths) deaths.push({ playerId: d.playerId, nodeId: at, optionId: step.optionId, asset: d.key });
    s = r.state;
    at = r.target;
  }
  return { ending: at, state: s, deaths, cast };
}

test('içerik: 20 düğüm, 80 eylem, 90 sonuç, 20 final, 8 hayalet sayfa, 8 jumpscare', () => {
  assert.equal(STORY.storyId, 'son_sefer');
  assert.equal(STORY.nodes.length, 20);
  assert.equal(Object.keys(ENDINGS).length, 20);
  let opts = 0, cases = 0;
  for (const n of STORY.nodes) {
    assert.deepEqual(n.options.map((o) => o.id), ['A', 'B', 'C', 'D']);
    for (const o of n.options) {
      opts++; cases += o.cases.length;
      assert.ok(!o.cases.at(-1).when, `${n.id}${o.id} varsayılan case yok`);
      if (o.taskCount === 2) assert.ok(o.soloBrief, `${n.id}${o.id} soloBrief yok`);
      for (const c of o.cases) {
        if (c.kill) assert.ok(c.jumpscare, `${n.id}${o.id} ölümün görseli yok`);
        if (c.ending) assert.ok(ENDINGS[c.ending]);
      }
    }
    assert.ok(n.next === 'RESOLVE_FINAL' || NODES[n.next], n.id);
  }
  assert.equal(opts, 80);
  assert.equal(cases, 90);
  assert.equal(STORY.ghostPages.length, 8);
  assert.equal(STORY.jumpscares.length, 8);
});

for (const [ending, w] of Object.entries(V.checkedEndingWitnesses)) {
  test(`doğrulanmış yol → ${ending}`, () => {
    const r = play(w.initialPlayers, w.path);
    assert.equal(r.ending, ending);
    assert.deepEqual(livingIds(r.state, r.cast), w.finalAlive);
    assert.deepEqual(r.deaths, w.deaths);
  });
}

for (const c of V.playerCountChecks) {
  test(`${c.players} kişi: son yaşayan yolu → ${c.lastAliveEnding}`, () => {
    const r = play(c.players, c.lastAlivePath);
    assert.equal(r.ending, c.lastAliveEnding);
    assert.equal(livingIds(r.state, r.cast).length, 1);
  });
}

test('yorgunluk eşikleri belgeyle aynı', () => {
  const cast = castOf(4);
  for (const f of V.fatigueBoundaryChecks) {
    const s = initialState(cast);
    s.fatigue.p1 = f.fatigueBefore;
    const r = resolve(f.nodeId, f.optionId, s, ['p1'], cast);
    assert.equal(!r.state.alive.p1, f.death, `${f.nodeId}${f.optionId} y=${f.fatigueBefore}`);
  }
});

test('yorgunluk 0–2: başarılı görev +1, ölümde artış yok, dinlenme negatife inmez', () => {
  const cast = castOf(4);
  let s = initialState(cast);
  s = resolve('S2_N01', 'B', s, ['p1'], cast).state;
  assert.equal(s.fatigue.p1, 1);
  s.fatigue.p1 = 2;
  s = resolve('S2_N02', 'A', s, ['p1'], cast).state; // kuru iş, 2/2'de ölüm yok
  assert.equal(s.alive.p1, true);
  assert.equal(s.fatigue.p1, 2);
  s.fatigue.p2 = 0;
  s = resolve('S2_N01', 'D', s, [], cast).state; // restAll
  assert.equal(s.fatigue.p1, 1);
  assert.equal(s.fatigue.p2, 0);
});

test('ölü görevli olamaz; aynı kişi iki görevde olamaz; görevli sayısı zorunlu', () => {
  const cast = castOf(4);
  const s = initialState(cast);
  s.alive.p2 = false;
  assert.throws(() => resolve('S2_N02', 'A', s, ['p2'], cast), /Ölü/);
  assert.throws(() => resolve('S2_N04', 'B', s, ['p1', 'p1'], cast), /iki görev/);
  assert.throws(() => resolve('S2_N02', 'A', s, [], cast), /Görevli sayısı/);
});

test('tek yaşayan: iki kişilik iş tek kişiye iner; FOCUS ölüye dönmez', () => {
  const cast = castOf(5);
  const s = initialState(cast);
  for (const p of ['p1', 'p2', 'p3', 'p5']) s.alive[p] = false;
  assert.equal(taskNeed(NODES.S2_N04.options[1], 1), 1);
  for (let k = 1; k <= 20; k++) assert.equal(focusId(`S2_N${String(k).padStart(2, '0')}`, s, cast), 'p4');
  const r = resolve('S2_N04', 'B', s, ['p4'], cast);
  assert.equal(r.state.alive.p4, true);
});

test('son yaşayan ölünce E20; açık toplu sonlar E20e çevrilmez', () => {
  const cast = castOf(4);
  const s = initialState(cast);
  for (const p of ['p2', 'p3', 'p4']) s.alive[p] = false;
  assert.equal(resolve('S2_N02', 'D', s, ['p1'], cast).target, 'S2_E20');
  const all = initialState(cast);
  const r = resolve('S2_N08', 'D', all, [], cast);
  assert.equal(r.target, 'S2_E15');
  assert.equal(livingIds(r.state, cast).length, 0);
  assert.deepEqual(r.deaths.map((d) => d.key), ['JS07', 'JS08', 'JS01', 'JS02']);
});

test('E09/E12 terminal ölümleri: herkes ölür, final değişmez', () => {
  const cast = castOf(6);
  const s = initialState(cast);
  s.alive.p3 = false;
  const r = resolve('S2_N20', 'B', s, [], cast); // engineSafe yok
  assert.equal(r.target, 'S2_E09');
  assert.equal(r.terminal, true);
  assert.equal(livingIds(r.state, cast).length, 0);
  assert.deepEqual(r.deaths.map((d) => d.playerId), ['p1', 'p2', 'p4', 'p5', 'p6']);
  assert.equal(r.deaths[0].key, 'JS02');
  const r2 = resolve('S2_N20', 'C', initialState(cast), ['p2'], cast);
  assert.equal(r2.target, 'S2_E12');
  assert.equal(r2.deaths[0].key, 'JS07');
});

test('final çözümleyici öncelikleri', () => {
  const cast = castOf(4);
  const ok = initialState(cast);
  for (const f of ['beacon', 'rescueVerified', 'sosAnswered', 'logProof', 'doorSealed', 'gateOpen']) ok.flags[f] = true;
  assert.equal(resolveFinal('A', ok, cast), 'S2_E01');
  const one = clone(ok); for (const p of ['p2', 'p3', 'p4']) one.alive[p] = false;
  assert.equal(resolveFinal('A', one, cast), 'S2_E03');
  const two = clone(ok); two.alive.p2 = false;
  assert.equal(resolveFinal('A', two, cast), 'S2_E02');
  assert.equal(resolveFinal('A', { ...clone(ok), flags: { ...ok.flags, contamination: true } }, cast), 'S2_E04');
  assert.equal(resolveFinal('A', { ...clone(ok), flags: { ...ok.flags, falseReply: true } }, cast), 'S2_E05');
  assert.equal(resolveFinal('A', { ...clone(ok), flags: { ...ok.flags, beacon: false, falseReply: true } }, cast), 'S2_E06');
  assert.equal(resolveFinal('D', ok, cast), 'S2_E14');
});

test('koşul dili: bilinmeyen alanlar reddedilir', () => {
  const s = initialState(castOf(4));
  assert.throws(() => evalCond({ flag: 'yok' }, s), /Bilinmeyen bayrak/);
  assert.throws(() => evalCond({ eval: '1' }, s), /Bilinmeyen koşul/);
  assert.equal(evalCond({ any: [{ flag: 'rope' }, { not: { flag: 'battery' } }] }, s), true);
});

test('JS varyantı 8 üzerinden döner', () => {
  assert.equal(variantKey('JS07', 0), 'JS07');
  assert.equal(variantKey('JS07', 1), 'JS08');
  assert.equal(variantKey('JS07', 2), 'JS01');
});

test('4–10 kişide bütün metinler yer tutucusuz dolar', () => {
  for (let n = 4; n <= 10; n++) {
    const cast = castOf(n);
    const s = initialState(cast);
    s.alive.p2 = false;
    for (const node of STORY.nodes) {
      const focus = focusId(node.id, s, cast);
      const t = fill(node.text, { cast, state: s, focus, arrivalState: s });
      assert.ok(!/[{}]/.test(t), node.id);
      for (const o of node.options) for (const c of o.cases) {
        assert.ok(!/[{}]/.test(fill(c.text, { cast, state: s, focus, actors: ['p1', 'p3'] })), `${node.id}${o.id}`);
      }
    }
    for (const [id, e] of Object.entries(ENDINGS)) assert.ok(!/[{}]/.test(fill(e.text, { cast, state: s })), id);
    const none = initialState(cast); for (const c of cast) none.alive[c.playerId] = false;
    assert.ok(fill(ENDINGS.S2_E20.text, { cast, state: none }).includes('Oyuncu10') || n < 10);
  }
});

test('N11 varış metni durumdan seçilir; hayalet sayfa aralıkları', () => {
  const s = initialState(castOf(4));
  assert.match(arrivalText(s), /akıntıyla/);
  s.flags.chart = true; s.flags.engineSafe = true;
  assert.match(arrivalText(s), /bakım hattından/);
  s.flags.lifeRaft = true;
  assert.match(arrivalText(s), /filikasıyla/);
  assert.equal(ghostPageFor('S2_N02').index, 0);
  assert.equal(ghostPageFor('S2_N20').index, 7);
  assert.ok(paras(STORY.nodes[0].text).length > 5);
});
