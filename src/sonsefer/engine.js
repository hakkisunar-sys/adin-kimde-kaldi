// SON SEFER — saf hikâye motoru. Ağ, zaman veya rastgelelik içermez.
// Kaynak: content/son-sefer/story.json (belge: content/son-sefer/kaynak.md)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
export const STORY = JSON.parse(fs.readFileSync(path.join(here, '../../content/son-sefer/story.json'), 'utf8'));
export const NODES = Object.fromEntries(STORY.nodes.map((n) => [n.id, n]));
export const ENDINGS = STORY.endings; // { S2_E01: {title, class, text} }
export const JS_KEYS = STORY.jumpscares.map((j) => j.key); // JS01..JS08
export const FLAGS = Object.keys(STORY.initialFlags);
export const FATIGUE_LABELS = ['Dinç', 'Yorulmuş', 'Tükenmiş'];
const FINAL_NODE = 'S2_N20';
export const PREFIX = 'S2_N';
export const FIRST_NODE = 'S2_N01';
export const MEDIA_DIR = 'son-sefer';

export const nodeNum = (id) => Number(id.replace(/^S2_N/, ''));

// ---------- Durum ----------
/** cast: [{playerId, displayName}] sabit sırada */
export function initialState(cast) {
  return {
    flags: { ...STORY.initialFlags },
    alive: Object.fromEntries(cast.map((c) => [c.playerId, true])),
    fatigue: Object.fromEntries(cast.map((c) => [c.playerId, 0])),
    finalChoice: null,
  };
}

export const clone = (s) => JSON.parse(JSON.stringify(s));
export const livingIds = (state, cast) => cast.filter((c) => state.alive[c.playerId]).map((c) => c.playerId);
export const deadIds = (state, cast) => cast.filter((c) => !state.alive[c.playerId]).map((c) => c.playerId);

export function focusId(nodeId, state, cast) {
  const living = livingIds(state, cast);
  if (!living.length) return null;
  return living[(nodeNum(nodeId) - 1) % living.length];
}

// ---------- Koşul dili (kapalı yorumlayıcı; eval yok) ----------
export function evalCond(cond, state, actorId) {
  if (!cond || typeof cond !== 'object') throw new Error('Geçersiz koşul');
  const keys = Object.keys(cond);
  if (keys.length !== 1) throw new Error('Koşulda tek anahtar olmalı: ' + JSON.stringify(cond));
  const [k] = keys;
  const v = cond[k];
  switch (k) {
    case 'flag':
      if (!FLAGS.includes(v)) throw new Error('Bilinmeyen bayrak: ' + v);
      return state.flags[v] === true;
    case 'not': return !evalCond(v, state, actorId);
    case 'all': return v.every((c) => evalCond(c, state, actorId));
    case 'any': return v.some((c) => evalCond(c, state, actorId));
    case 'actorFatigueAtLeast':
      if (!actorId) throw new Error('Görevlisi olmayan eylemde yorgunluk koşulu');
      return (state.fatigue[actorId] ?? 0) >= v;
    default: throw new Error('Bilinmeyen koşul: ' + k);
  }
}

export function pickCase(option, state, actorId) {
  const i = option.cases.findIndex((c) => !c.when || evalCond(c.when, state, actorId));
  if (i < 0) throw new Error('Varsayılan case yok');
  return i;
}

/** Görev gereksinimi; tek yaşayan kalınca iki kişilik iş tek kişilik olur. */
export function taskNeed(option, livingCount) {
  if (option.taskCount === 0 || livingCount === 0) return 0;
  if (livingCount === 1) return 1;
  return option.taskCount;
}
export function briefFor(option, livingCount) {
  return option.taskCount === 2 && livingCount === 1 && option.soloBrief ? option.soloBrief : option.taskBrief;
}

/** Toplu ölümde JS varyantı: taban + kurban indeksi, 8 üzerinden döner. */
export function variantKey(baseKey, index) {
  const base = JS_KEYS.indexOf(baseKey);
  if (base < 0) throw new Error('Bilinmeyen jumpscare: ' + baseKey);
  return JS_KEYS[(base + index) % JS_KEYS.length];
}

function killAll(state, cast, baseKey) {
  return livingIds(state, cast).map((pid, i) => {
    state.alive[pid] = false;
    return { playerId: pid, key: variantKey(baseKey, i) };
  });
}

export function resolveFinal(choice, s, cast) {
  const f = s.flags;
  const alive = livingIds(s, cast).length;
  switch (choice) {
    case 'A':
      if (!f.beacon) return 'S2_E06';
      if (!f.rescueVerified || f.falseReply) return 'S2_E05';
      if (!f.sosAnswered || !f.logProof || !f.doorSealed || !f.gateOpen || f.contamination) return 'S2_E04';
      if (alive === cast.length) return 'S2_E01';
      if (alive === 1) return 'S2_E03';
      return 'S2_E02';
    case 'B':
      if (f.contamination) return 'S2_E07';
      if (!f.engineSafe) return 'S2_E09';
      if (!f.chart) return 'S2_E08';
      return 'S2_E10';
    case 'C': return f.sosAnswered ? 'S2_E11' : 'S2_E12';
    case 'D': return f.contamination ? 'S2_E13' : 'S2_E14';
    default: throw new Error('Final seçimi yok');
  }
}

/**
 * Bir kararı çözer. entry: düğüme giriş durumu (değiştirilmez).
 * actors: [birinci, ikinci?] — yaşayan, farklı oyuncu kimlikleri.
 * Dönen: { caseIndex, state, deaths:[{playerId,key}], target, terminal }
 */
export function resolve(nodeId, optionId, entry, actors, cast) {
  const node = NODES[nodeId];
  const opt = node.options.find((o) => o.id === optionId);
  if (!opt) throw new Error('Geçersiz seçenek');
  const living = livingIds(entry, cast);
  const need = taskNeed(opt, living.length);
  if (actors.length !== need) throw new Error(`Görevli sayısı ${need} olmalı`);
  if (new Set(actors).size !== actors.length) throw new Error('Aynı kişi iki görevde olamaz');
  for (const a of actors) if (!entry.alive[a]) throw new Error('Ölü oyuncu görevli olamaz');

  const caseIndex = pickCase(opt, entry, actors[0]);
  const c = opt.cases[caseIndex];
  const s = clone(entry);
  // 5. efektler
  for (const [k, v] of Object.entries(c.effects || {})) {
    if (k === 'restAll') {
      for (const pid of livingIds(s, cast)) s.fatigue[pid] = Math.max(0, s.fatigue[pid] - v);
    } else if (k === 'finalChoice') s.finalChoice = v;
    else if (FLAGS.includes(k)) s.flags[k] = !!v;
    else throw new Error('Bilinmeyen efekt: ' + k);
  }
  // 6. ölümler ve görev yorgunluğu
  const deaths = [];
  if (c.kill === 'all') deaths.push(...killAll(s, cast, c.jumpscare));
  else if (Array.isArray(c.kill)) {
    for (const role of c.kill) {
      if (role !== 'primary') throw new Error('Bilinmeyen ölüm rolü: ' + role);
      const pid = actors[0];
      if (pid && s.alive[pid]) { s.alive[pid] = false; deaths.push({ playerId: pid, key: c.jumpscare }); }
    }
  }
  for (const a of actors) if (s.alive[a]) s.fatigue[a] = Math.min(2, s.fatigue[a] + 1);
  // 7. hedef
  let target;
  if (c.ending) target = c.ending;
  else if (!livingIds(s, cast).length) target = 'S2_E20';
  else if (nodeId === FINAL_NODE) target = resolveFinal(s.finalChoice, s, cast);
  else target = node.next;
  // 8. terminal toplu ölüm (E09/E12); final yeniden çözülmez
  let terminal = false;
  if (STORY.terminalDeathEndings[target]) {
    terminal = true;
    deaths.push(...killAll(s, cast, STORY.terminalDeathEndings[target]));
  }
  return { caseIndex, state: s, deaths, target, terminal };
}

// ---------- Metin yerleştirme ----------
const nameOf = (cast, pid) => cast.find((c) => c.playerId === pid)?.displayName ?? '?';
const list = (names, empty) => (names.length ? names.join(', ') : empty);

export function arrivalText(state) {
  const v = STORY.arrivalVariants.find((a) => !a.when || evalCond(a.when, state, null));
  return v.text;
}

/** Yer tutucuları doldurur; snapshot = metnin ait olduğu durum. */
export function fill(text, { cast, state, focus, actors = [], arrivalState }) {
  const living = livingIds(state, cast);
  const map = {
    N: String(cast.length),
    ALL_NAMES: cast.map((c) => c.displayName).join(', '),
    ALIVE_NAMES: list(living.map((p) => nameOf(cast, p)), 'Kimse'),
    DEAD_NAMES: list(deadIds(state, cast).map((p) => nameOf(cast, p)), 'Henüz kimse'),
    ALIVE_COUNT: String(living.length),
  };
  if (focus) map.FOCUS = nameOf(cast, focus);
  if (actors[0]) map.A = nameOf(cast, actors[0]);
  if (actors[1]) map.B = nameOf(cast, actors[1]);
  if (living.length) map.LAST_ALIVE = nameOf(cast, living[0]);
  if (arrivalState) map.ARRIVAL = arrivalText(arrivalState);
  return text.replace(/\{([A-Z_]+)\}/g, (m, k) => {
    if (!(k in map)) throw new Error('Doldurulmamış yer tutucu: ' + m);
    return map[k];
  });
}
export const paras = (t) => t.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

export function ghostPageFor(nodeId) {
  const k = nodeNum(nodeId);
  const i = STORY.ghostPages.findIndex((g) => k >= g.range[0] && k <= g.range[1]);
  return i < 0 ? null : { index: i, ...STORY.ghostPages[i] };
}

export const DEATH_CARD = {
  title: 'Suyun Altındaki Ses',
  text: 'Karakterin öldü. Fiziksel görevlere seçilemezsin. Hikâyeyi okumaya, oy vermeye ve arkadaşlarınla konuşmaya devam edeceksin. Göreceğin kısa parçalar onlara yardım edebilir. Ölüme yol açan karar geri alınamaz.',
};

/** Oyuncuya gösterilebilen ekipman (elde edilenler). Gizli ilerleme bayrakları gösterilmez. */
export const EQUIPMENT = [
  ['rope', 'Can halatı'], ['battery', 'Yedek akü'], ['chart', 'Gerçek kıyı rotası'],
  ['lifeRaft', 'Servis filikası'], ['power', 'Kuru enerji hattı'], ['logProof', 'Eski çağrının kanıtı'],
];
export const equipmentOf = (state) => EQUIPMENT.filter(([k]) => state.flags[k]).map(([, l]) => l);
