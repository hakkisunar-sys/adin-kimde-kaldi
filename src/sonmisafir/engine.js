// SON MİSAFİRLER — saf hikâye motoru. Ağ, zaman veya rastgelelik yok.
// İçerik: content/son-misafirler/story.json (sade metin; mantık story.orig.json ile aynı — tools/build-son-misafirler.mjs)
// Son Sefer motoruyla aynı arayüzü sunar; oda akışı src/sonsefer/game.js içinde ortaktır.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const RAW = JSON.parse(fs.readFileSync(path.join(here, '../../content/son-misafirler/story.json'), 'utf8'));

export const PREFIX = 'S3_N';
export const FIRST_NODE = 'S3_N01';
export const FLAGS = Object.keys(RAW.initialFlags);
export const FATIGUE_LABELS = ['Dinç', 'Yorulmuş', 'Tükenmiş'];
export const EXPOSURE_LABELS = ['Yabancı', 'Görülmüş', 'Tanınmış', 'Öğrenilmiş'];
export const JS_KEYS = Object.keys(RAW.assetManifest);

const CLASS_LABELS = {
  all_survive: 'Herkes kurtuldu',
  survivors_escape: 'Kayıplarla kurtuluş',
  survivors_escape_contaminated: 'Kurtuluş, ama iz sizinle geldi',
  survivors_escape_with_containment: 'Kurtuluş, o şey negatifte',
  alive_trapped: 'Hayattasınız, ama kapana kısıldınız',
  alive_lost_in_house: 'Evin içinde kayboldunuz',
  alive_trapped_in_courtyard: 'Avluda kapana kısıldınız',
  alive_loop: 'Gece yeniden başladı',
  alive_road_loop: 'Bitmeyen yol',
  alive_displaced: 'Yüzünüzü kaybettiniz',
  alive_time_frozen: 'Zaman durdu',
  alive_bound_as_hosts: 'Evin yeni sahipleri',
  all_dead: 'Kimse kurtulamadı',
};

// Son Sefer biçimine dönüştür: options dizisi, text alanı
export const STORY = {
  storyId: RAW.storyId,
  contentVersion: RAW.version,
  title: RAW.title,
  ghostPages: RAW.ghostPages,
  intro: RAW.intro,
  initialFlags: RAW.initialFlags,
};
export const NODES = Object.fromEntries(RAW.nodes.map((n) => [n.id, {
  id: n.id, title: n.title, text: n.scene, question: n.question, next: n.next,
  options: Object.entries(n.choices).map(([id, o]) => ({ id, ...o })),
}]));
export const ENDINGS = Object.fromEntries(RAW.endings.map((e) => [e.id, { ...e, class: CLASS_LABELS[e.status] || e.status }]));
export const DEATH_CARD = RAW.deathCard;

export const nodeNum = (id) => Number(id.replace(PREFIX, ''));
export const clone = (s) => JSON.parse(JSON.stringify(s));

export function initialState(cast) {
  const ids = cast.map((c) => c.playerId);
  return {
    flags: { ...RAW.initialFlags },
    alive: Object.fromEntries(ids.map((p) => [p, true])),
    fatigue: Object.fromEntries(ids.map((p) => [p, 0])),
    exposure: Object.fromEntries(ids.map((p) => [p, 0])),
    completedTasks: Object.fromEntries(ids.map((p) => [p, 0])),
    deathOrder: [],
  };
}

export const livingIds = (s, cast) => cast.filter((c) => s.alive[c.playerId]).map((c) => c.playerId);
export const deadIds = (s, cast) => cast.filter((c) => !s.alive[c.playerId]).map((c) => c.playerId);
export const contaminated = (s) => !!(s.flags.tagged || s.flags.invited);

export function focusId(nodeId, s, cast) {
  const living = livingIds(s, cast);
  return living.length ? living[(nodeNum(nodeId) - 1) % living.length] : null;
}

// ---------- Koşul dili (kapalı yorumlayıcı) ----------
export function evalCond(cond, s, actorId, cast) {
  const keys = Object.keys(cond || {});
  if (keys.length !== 1) throw new Error('Koşulda tek anahtar olmalı: ' + JSON.stringify(cond));
  const [k] = keys;
  const v = cond[k];
  switch (k) {
    case 'always': return v === true;
    case 'flag':
      if (!FLAGS.includes(v)) throw new Error('Bilinmeyen bayrak: ' + v);
      return s.flags[v] === true;
    case 'not': return !evalCond(v, s, actorId, cast);
    case 'all': return v.every((c) => evalCond(c, s, actorId, cast));
    case 'any': return v.some((c) => evalCond(c, s, actorId, cast));
    case 'actorFatigueAtLeast':
      if (!actorId) throw new Error('Görevlisi olmayan eylemde yorgunluk koşulu');
      return (s.fatigue[actorId] ?? 0) >= v;
    case 'actorExposureAtLeast':
      if (!actorId) throw new Error('Görevlisi olmayan eylemde tanınma koşulu');
      return (s.exposure[actorId] ?? 0) >= v;
    case 'deadCountEquals': return deadIds(s, cast).length === v;
    case 'contaminated':
      if (v !== true) throw new Error('contaminated yalnız true alır');
      return contaminated(s);
    default: throw new Error('Bilinmeyen koşul: ' + k);
  }
}

export function taskNeed(option, livingCount) {
  if (option.taskCount === 0 || livingCount === 0) return 0;
  if (livingCount === 1) return 1;
  return option.taskCount;
}
export function briefFor(option, livingCount) {
  return option.taskCount === 2 && livingCount === 1 && option.soloBrief ? option.soloBrief : option.taskBrief;
}

export function variantKey(baseKey, index) {
  const base = JS_KEYS.indexOf(baseKey);
  if (base < 0) throw new Error('Bilinmeyen jumpscare: ' + baseKey);
  return JS_KEYS[(base + index) % JS_KEYS.length];
}

/** İşlem sırası (belge): koşul → ölüm → görev artışı → etkiler → hedef */
export function resolve(nodeId, optionId, entry, actors, cast) {
  const node = NODES[nodeId];
  const opt = node.options.find((o) => o.id === optionId);
  if (!opt) throw new Error('Geçersiz seçenek');
  const living = livingIds(entry, cast);
  const need = taskNeed(opt, living.length);
  if (actors.length !== need) throw new Error(`Görevli sayısı ${need} olmalı`);
  if (new Set(actors).size !== actors.length) throw new Error('Aynı kişi iki görevde olamaz');
  for (const a of actors) if (!entry.alive[a]) throw new Error('Ölü oyuncu görevli olamaz');

  const caseIndex = opt.cases.findIndex((c) => evalCond(c.when, entry, actors[0], cast));
  if (caseIndex < 0) throw new Error('Varsayılan sonuç yok');
  const c = opt.cases[caseIndex];
  const s = clone(entry);
  const deaths = [];
  // ölüm
  if (c.kill === 'all') {
    livingIds(s, cast).forEach((pid, i) => { s.alive[pid] = false; s.deathOrder.push(pid); deaths.push({ playerId: pid, key: variantKey(c.jumpscare, i) }); });
  } else if (c.kill === 'primary') {
    const pid = actors[0];
    if (pid && s.alive[pid]) { s.alive[pid] = false; s.deathOrder.push(pid); deaths.push({ playerId: pid, key: c.jumpscare }); }
  } else if (c.kill) throw new Error('Bilinmeyen ölüm: ' + c.kill);
  // görev artışı (başarısız ama ölümsüz görevde de)
  for (const a of actors) {
    if (!s.alive[a]) continue;
    s.fatigue[a] = Math.min(2, s.fatigue[a] + 1);
    s.exposure[a] = Math.min(3, s.exposure[a] + 1);
    s.completedTasks[a] += 1;
  }
  // etkiler
  for (const [k, v] of Object.entries(c.effects || {})) {
    if (k === 'restAll') for (const p of livingIds(s, cast)) s.fatigue[p] = Math.max(0, s.fatigue[p] - v);
    else if (k === 'resetExposure') { if (v) for (const p of livingIds(s, cast)) s.exposure[p] = 0; }
    else if (FLAGS.includes(k)) s.flags[k] = !!v;
    else throw new Error('Bilinmeyen etki: ' + k);
  }
  let target;
  if (c.ending) target = c.ending;
  else if (!livingIds(s, cast).length) target = 'S3_E20';
  else target = node.next;
  return { caseIndex, state: s, deaths, target, terminal: false };
}

// ---------- Metin ----------
const nameOf = (cast, pid) => cast.find((c) => c.playerId === pid)?.displayName ?? '?';
const list = (a, empty) => (a.length ? a.join(', ') : empty);

/** [[koşul|doğruysa|yanlışsa]] — oyuncu yalnız kendi durumuna uyan cümleyi görür. */
export function applyConditionals(text, s) {
  return text.replace(/\[\[([^|\]]+)\|([^|\]]*)\|([^\]]*)\]\]/g, (m, cond, yes, no) => {
    let ok;
    if (cond === 'dead') ok = s.deathOrder.length > 0;
    else if (cond.startsWith('flag:')) ok = s.flags[cond.slice(5)] === true;
    else throw new Error('Geçersiz metin koşulu: ' + cond);
    return ok ? yes : no;
  });
}

/**
 * opts: { cast, state (ad listeleri için), condState (koşullu cümleler için; yoksa state),
 *         focus, actors, victims (FINAL_VICTIMS için oyuncu kimlikleri) }
 */
export function fill(text, { cast, state, condState, focus, actors = [], victims = [] }) {
  const cs = condState || state;
  let t = applyConditionals(text, cs);
  const living = livingIds(state, cast);
  const lastDead = cs.deathOrder.at(-1);
  const map = {
    N: String(cast.length),
    ALIVE_NAMES: list(living.map((p) => nameOf(cast, p)), 'Kimse'),
    DEAD_NAMES: list(deadIds(state, cast).map((p) => nameOf(cast, p)), 'Kimse'),
    FINAL_VICTIMS: list(victims.map((p) => nameOf(cast, p)), 'Kimse'),
    CHILD_EPILOGUE: state.flags.childFreed ? RAW.childEpilogue.free : RAW.childEpilogue.hidden,
  };
  if (focus) map.FOCUS = nameOf(cast, focus);
  if (actors[0]) map.A = nameOf(cast, actors[0]);
  if (actors[1]) map.B = nameOf(cast, actors[1]);
  if (lastDead) map.LAST_DEAD = nameOf(cast, lastDead);
  return t.replace(/\{([A-Z_]+)\}/g, (m, k) => {
    if (!(k in map)) throw new Error('Doldurulmamış yer tutucu: ' + m);
    return map[k];
  });
}
export const paras = (t) => t.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

export function ghostPageFor(nodeId) {
  const k = nodeNum(nodeId);
  const i = RAW.ghostPages.findIndex((g) => k >= g.range[0] && k <= g.range[1]);
  return i < 0 ? null : { index: i, ...RAW.ghostPages[i] };
}

export const equipmentOf = (s) => RAW.equipment.filter(([k]) => s.flags[k]).map(([, l]) => l);

/** Son karar (N24) için açık hazırlık listesi. */
export function checklistFor(nodeId, optionId, s) {
  if (nodeId !== 'S3_N24') return null;
  const items = RAW.finalChecklist[optionId];
  if (!items) return null;
  return items.map(([k, label]) => ({ label, ok: k.startsWith('!') ? !contaminated(s) : s.flags[k] === true }));
}

/** Oyuncu kartı: yorgunluk ve evin onu ne kadar tanıdığı. */
export function statusOf(s, pid) {
  return {
    fatigue: s.fatigue[pid] ?? 0, fatigueLabel: FATIGUE_LABELS[s.fatigue[pid] ?? 0],
    exposure: s.exposure[pid] ?? 0, exposureLabel: EXPOSURE_LABELS[s.exposure[pid] ?? 0],
  };
}

export const MEDIA_DIR = 'son-misafirler';
