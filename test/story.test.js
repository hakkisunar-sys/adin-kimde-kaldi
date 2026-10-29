import test from 'node:test';
import assert from 'node:assert/strict';
import {
  STORY, NODES, ENDINGS, initialState, applyEffects, decide, resolveCross,
  renderScene, renderResult, renderEnding, contributionFor,
} from '../src/engine.js';

const castOf = (n, names) => Array.from({ length: n }, (_, i) => ({ playerId: 'p' + i, displayName: names ? names[i] : `Oyuncu${i + 1}` }));

test('içerik sayıları: 20 düğüm, 80 seçenek, 20 final', () => {
  assert.equal(STORY.nodes.length, 20);
  assert.equal(new Set(STORY.nodes.map((n) => n.id)).size, 20);
  assert.equal(STORY.endings.length, 20);
  assert.equal(new Set(STORY.endings.map((e) => e.id)).size, 20);
  let opts = 0;
  for (const n of STORY.nodes) {
    assert.deepEqual(n.options.map((o) => o.id), ['A', 'B', 'C', 'D'], n.id);
    for (const o of n.options) {
      opts++;
      assert.ok(o.label.length > 0 && o.result.join('').length > 0, `${n.id}${o.id} boş`);
    }
    assert.ok(n.text.length > 0 && n.question.length > 0);
  }
  assert.equal(opts, 80);
  for (const e of STORY.endings) assert.ok(e.text.length > 0);
});

test('metinlerde markdown kalıntısı yok', () => {
  const all = JSON.stringify(STORY.nodes) + JSON.stringify(STORY.endings);
  assert.ok(!all.includes('**'), 'yıldız kalmış');
  assert.ok(!all.includes('Geliştirici'), 'geliştirici notu sızmış');
});

test('bütün hedefler mevcut ve ileri yönlü', () => {
  for (const n of STORY.nodes) {
    for (const o of n.options) {
      if (o.next.startsWith('ROUTE_')) continue;
      if (o.next.startsWith('E')) assert.ok(ENDINGS[o.next], o.next);
      else {
        assert.ok(NODES[o.next], o.next);
        assert.ok(Number(o.next.slice(1)) > Number(n.id.slice(1)), `geri bağlantı ${n.id}->${o.next}`);
      }
    }
  }
});

// Ek B örnek yolları
const PATHS = {
  E01: 'N01A N02A N03A N04B N05B N06A N07A N08A N09A N10A N11A N12A N13A N14A N15A N16A N17A N18A N19A N20A',
  E02: 'N01C N02B N04C N06B N07C N09A N10D N11C N12D N13A N14B N15B N16A N17B N18A N19A N20A',
  E03: 'N01B N02B N04C N06D N07A N08B N09A N10B N11A N12D N13C N14B N15B N16A N17C N18A N19A N20A',
  E04: 'N01D N02B N04C N06A N07C N09C N10A N11C N12A N13A N14D N15A N16A N17C N18A N19A N20A',
  E05: 'N01D N02B N04C N06A N07C N09A N10A N11A N12C N13D',
  E06: 'N01C N02B N04C N06D N07C N09C N10B N11B N12C N13A N14B N15A N16A N17C N18A N19B N20A',
  E07: 'N01D N02B N04C N06C N07C N09D N10A N11D N12C N13B',
  E08: 'N01A N02B N04C N06B N07C N09C N10D N11B N12A N13A N14A N15B N16A N17A N18C N19C N20D',
  E09: 'N01D N02B N04C N06A N07C N09C N10B N11B N12D N13A N14C N15A N16D N17B N18A N19B N20B',
  E10: 'N01C N02B N04C N06B N07D',
  E11: 'N01B N02B N04C N06A N07C N09B N10D N11A N12B',
  E12: 'N01C N02B N04C N06C N07C N09D N10B N11B N12D N13A N14A N15D N16A N17B N18C N19B N20B',
  E13: 'N01B N02B N04A N05C',
  E14: 'N01D N02B N04C N06D N07C N09A N10C',
  E15: 'N01A N02B N04B N05D',
  E16: 'N01A N02B N04C N06C N07C N09C N10A N11C N12C N13A N14B N15C',
  E17: 'N01D N02B N04C N06C N07C N09B N10A N11B N12A N13C N14D N15A N16A N17B N18B',
  E18: 'N01D N02B N04C N06C N07C N09D N10A N11C N12C N13A N14A N15A N16A N17D',
  E19: 'N01A N02B N04C N06C N07C N09B N10A N11A N12A N13A N14A N15D N16B',
  E20: 'N01B N02B N04C N06B N07C N09B N10D N11C N12C N13A N14C N15B N16C N17B N18C N19C N20C',
};

function play(pathStr) {
  let s = initialState();
  let at = 'N01';
  for (const step of pathStr.split(' ')) {
    const node = step.slice(0, 3), opt = step[3];
    assert.equal(node, at, `yol kopuk: ${at} bekleniyordu, ${node} geldi`);
    const r = decide(node, opt, s);
    s = r.state;
    at = r.target;
  }
  return { ending: at, state: s };
}

for (const [ending, p] of Object.entries(PATHS)) {
  test(`Ek B yolu → ${ending}`, () => assert.equal(play(p).ending, ending));
}

test('stain 0–12 aralığında kalır; -2 sıfırın altına inmez', () => {
  assert.equal(applyEffects({ ...initialState(), stain: 1 }, { stain: -2 }).state.stain, 0);
  assert.equal(applyEffects({ ...initialState(), stain: 11 }, { stain: 2 }).state.stain, 12);
});

test('N19A çözümleyici: eksik bayrakta isimler geri gelmez, borrowedName korunur', () => {
  const s = { ...initialState(), proof: true, anchor: true, namesCounted: true, exitPrepared: false, borrowedName: true };
  const r = applyEffects(s, { resolveNames: true }).state;
  assert.equal(r.namesRestored, false);
  assert.equal(r.borrowedName, true);
  const ok = applyEffects({ ...s, exitPrepared: true }, { resolveNames: true }).state;
  assert.equal(ok.namesRestored, true);
  assert.equal(ok.borrowedName, false);
  assert.ok(!('resolveNames' in ok));
});

test('N19B geçiş hazırlasa da isimleri mühürlemez', () => {
  const s = { ...initialState(), proof: true, anchor: true, namesCounted: true, seal: true };
  const r = decide('N19', 'B', s);
  assert.equal(r.state.exitPrepared, true);
  assert.equal(r.state.namesRestored, false);
  assert.equal(resolveCross(r.state), 'E06');
});

test('Ek C final öncelikleri', () => {
  const base = { ...initialState(), namesRestored: true, seal: true };
  assert.equal(resolveCross({ ...base, namesRestored: false, memoryLost: true }), 'E06');
  assert.equal(resolveCross({ ...base, memoryLost: true, voiceTaken: true }), 'E02');
  assert.equal(resolveCross({ ...base, voiceTaken: true }), 'E03');
  assert.equal(resolveCross({ ...base, guest: true }), 'E08');
  assert.equal(resolveCross({ ...base, seal: false }), 'E04');
  assert.equal(resolveCross({ ...base, stain: 2 }), 'E04');
  assert.equal(resolveCross({ ...base, stain: 1 }), 'E01');
  assert.equal(decide('N20', 'B', base).target, 'E12');
  assert.equal(decide('N20', 'B', { ...base, guest: true }).target, 'E09');
  assert.equal(decide('N20', 'D', { ...base, mirrored: true }).target, 'E10');
  assert.equal(decide('N20', 'D', base).target, 'E08');
  assert.equal(decide('N20', 'C', base).target, 'E20');
});

test('kestirmeler atlanan sahnenin bayraklarını vermez', () => {
  assert.deepEqual(decide('N02', 'B', initialState()).state, initialState());
});

test('4–10 kişide bütün metinler yer tutucusuz yerleşir; FOCUS≠PARTNER', () => {
  for (let N = 4; N <= 10; N++) {
    const cast = castOf(N);
    for (const n of STORY.nodes) {
      const sc = renderScene(n.id, initialState(), {}, cast);
      const all = [...sc.paragraphs, sc.contribution].join(' ');
      assert.ok(!/[{}]/.test(all), `${N} kişi ${n.id}`);
      const k = Number(n.id.slice(1));
      assert.notEqual(cast[(k - 1) % N].displayName, cast[k % N].displayName);
      for (const o of n.options) {
        for (const post of [initialState(), { ...initialState(), namesRestored: true, seal: true }]) {
          const r = renderResult(n.id, o.id, initialState(), post, cast);
          assert.ok(!/[{}]/.test(r.paragraphs.join(' ')), `${n.id}${o.id}`);
        }
      }
    }
    for (const e of STORY.endings) assert.ok(!/[{}]/.test(renderEnding(e.id, cast).paragraphs.join(' ')), e.id);
  }
});

test('N01 kadro listesi herkesi içerir; N ve N+1 doğru', () => {
  const cast = castOf(7);
  const sc = renderScene('N01', initialState(), {}, cast);
  for (const c of cast) assert.ok(sc.paragraphs.join('\n').includes(c.displayName));
  const n2 = renderScene('N02', initialState(), {}, cast).paragraphs.join(' ');
  assert.ok(n2.includes('7 bardak') && n2.includes('sayısı 8 olmuş'));
});

test('her oyuncu ana yolda en az bir kez katkı satırında görünür (10 kişi)', () => {
  const cast = castOf(10);
  const seen = new Set();
  for (const n of STORY.nodes) {
    const c = contributionFor(n.id, cast);
    for (const p of cast) if (c.includes(p.displayName)) seen.add(p.displayName);
  }
  assert.equal(seen.size, 10);
});

test('N06D ilk ses kaybında P4 bağlama cümlesi eklenir; tekrar edilmez', () => {
  const cast = castOf(5);
  const pre = initialState();
  const post = decide('N06', 'D', pre).state;
  assert.ok(renderResult('N06', 'D', pre, post, cast).paragraphs.at(-1).includes('Oyuncu4 boğazında'));
  const pre2 = { ...pre, voiceTaken: true };
  const r2 = renderResult('N06', 'D', pre2, decide('N06', 'D', pre2).state, cast);
  assert.ok(!r2.paragraphs.join(' ').includes('boğazında susuyor'));
});

test('hatırlatma: N04 öncesi yok, en son değişen gösterilir', () => {
  const cast = castOf(4);
  const s = { ...initialState(), guest: true, voiceTaken: true };
  assert.equal(renderScene('N03', s, { guest: 0, voiceTaken: 1 }, cast).reminder, null);
  assert.ok(renderScene('N05', s, { guest: 0, voiceTaken: 1 }, cast).reminder.includes('Oyuncu4'));
  assert.ok(renderScene('N05', s, { guest: 2, voiceTaken: 1 }, cast).reminder.includes('ayak sesi'));
  assert.ok(renderScene('N05', s, { guest: 2, voiceTaken: 2 }, cast).reminder.includes('Oyuncu4')); // eşitlikte tablo sırası
});

test('uzun ve Türkçe karakterli adlarla metin bozulmaz', () => {
  const cast = castOf(4, ['Şükrü', 'İpek Ağaçgöz', 'Ğğ Öö', 'Çağlayanınkiler']);
  const r = renderEnding('E06', cast).paragraphs.join(' ');
  assert.ok(r.includes('İpek Ağaçgöz yok') && r.includes('Şükrü'));
});
