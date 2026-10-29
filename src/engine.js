// Saf hikâye motoru: durum, efektler, final çözümleyici, metin yerleştirme.
// Ağ, zaman veya rastgelelik içermez (kadro karıştırma hariç; o da dışarıdan verilir).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
export const STORY = JSON.parse(fs.readFileSync(path.join(here, '../content/story.json'), 'utf8'));
export const NODES = Object.fromEntries(STORY.nodes.map((n) => [n.id, n]));
export const ENDINGS = Object.fromEntries(STORY.endings.map((e) => [e.id, e]));

export const BOOL_FLAGS = [
  'rule', 'forgeryKnown', 'proof', 'anchor', 'namesCounted', 'seal', 'exitPrepared',
  'namesRestored', 'guest', 'voiceTaken', 'borrowedName', 'memoryLost', 'mirrored', 'bargain',
];
// Hatırlatma eşitlik sırası (belgedeki tablo sırası)
export const REMINDER_ORDER = ['voiceTaken', 'guest', 'borrowedName', 'mirrored', 'memoryLost', 'bargain'];

export function initialState() {
  const s = { stain: 0 };
  for (const f of BOOL_FLAGS) s[f] = false;
  return s;
}

const clamp = (v) => Math.max(0, Math.min(12, v));

/** Efekti uygular. Yeni durum + değişen alan listesi döndürür. Girdiyi değiştirmez. */
export function applyEffects(state, effects) {
  const next = { ...state };
  for (const [k, v] of Object.entries(effects || {})) {
    if (k === 'stain') next.stain = clamp(state.stain + v);
    else if (k === 'resolveNames') {
      const ok = state.proof && state.anchor && state.namesCounted && state.exitPrepared;
      next.namesRestored = ok;
      if (ok) next.borrowedName = false;
    } else if (k === 'routeEnding') {
      /* yalnız açıklama; durumda tutulmaz */
    } else if (BOOL_FLAGS.includes(k)) next[k] = v;
    else throw new Error('Bilinmeyen efekt alanı: ' + k);
  }
  const changed = Object.keys(next).filter((k) => next[k] !== state[k]);
  return { state: next, changed };
}

export function resolveCross(s) {
  if (!s.namesRestored) return 'E06';
  if (s.memoryLost) return 'E02';
  if (s.voiceTaken) return 'E03';
  if (s.guest || s.mirrored || s.bargain || s.borrowedName) return 'E08';
  if (!s.seal || s.stain > 1) return 'E04';
  return 'E01';
}

/** Seçeneğin hedefini (düğüm veya final) çözer. */
export function resolveTarget(next, postState) {
  if (next === 'ROUTE_CROSS') return resolveCross(postState);
  if (next === 'ROUTE_CAR') return postState.guest ? 'E09' : 'E12';
  if (next === 'ROUTE_COPY') return postState.mirrored ? 'E10' : 'E08';
  return next;
}

// ---------- Kadro ve yerleştirme ----------
export function castRoles(cast) {
  const name = (i) => cast[i].displayName;
  return { P1: name(0), P2: name(1), P3: name(2), P4: name(3), LOST: name(1), N: cast.length };
}

export function fill(text, cast, extra = {}) {
  const r = castRoles(cast);
  const map = {
    ...r,
    N_PLUS_1: String(r.N + 1),
    N: String(r.N),
    ROSTER_LINES: '\n' + cast.map((c) => c.displayName).join('\n'),
    ...extra,
  };
  return text.replace(/\{([A-Z0-9_]+)\}/g, (m, key) => {
    if (!(key in map)) throw new Error('Doldurulmamış yer tutucu: ' + m);
    return map[key];
  });
}

const nodeNum = (id) => Number(id.slice(1));

export function contributionFor(nodeId, cast) {
  const k = nodeNum(nodeId);
  const band = k <= 5 ? 'N01-N05' : k <= 10 ? 'N06-N10' : k <= 15 ? 'N11-N15' : 'N16-N20';
  const N = cast.length;
  const focus = cast[(k - 1) % N].displayName;
  const partner = cast[k % N].displayName;
  return fill(STORY.contributions[band], cast, { FOCUS: focus, PARTNER: partner });
}

/** flagSetAt: {flag: kararSırası} — true'ya geçtiği son karar sırası. */
export function reminderFor(nodeId, state, flagSetAt, cast) {
  if (nodeNum(nodeId) < 4) return null;
  let best = null;
  for (const f of REMINDER_ORDER) {
    if (!state[f] || flagSetAt[f] == null) continue;
    if (best === null || flagSetAt[f] > flagSetAt[best]) best = f; // eşitlikte tablo sırası korunur
  }
  return best ? fill(STORY.reminders[best], cast) : null;
}

export function renderScene(nodeId, state, flagSetAt, cast) {
  const n = NODES[nodeId];
  return {
    kind: 'scene',
    nodeId,
    title: n.title,
    reminder: reminderFor(nodeId, state, flagSetAt, cast),
    paragraphs: n.text.map((p) => fill(p, cast)),
    contribution: contributionFor(nodeId, cast),
  };
}

export function renderResult(nodeId, optionId, preState, postState, cast) {
  const n = NODES[nodeId];
  const opt = n.options.find((o) => o.id === optionId);
  const crossEnding = resolveCross(postState);
  const extra = {
    RESTORE_RESULT: postState.namesRestored ? STORY.special.restoreOk : STORY.special.restoreFail,
    CROSSING_RESULT: ['E01', 'E02', 'E03', 'E04'].includes(crossEnding) ? STORY.special.crossOk : STORY.special.crossBad,
  };
  const paragraphs = opt.result.map((p) => fill(p, cast, extra));
  // Ses kaybı N06D/N16D'de ilk kez oluşursa P4'e bağlama cümlesi
  if ((nodeId === 'N06' || nodeId === 'N16') && optionId === 'D' && !preState.voiceTaken && postState.voiceTaken) {
    paragraphs.push(fill(STORY.special.voiceAddon, cast));
  }
  return { kind: 'result', nodeId, optionId, title: n.title, label: opt.label, paragraphs };
}

export function renderEnding(endingId, cast) {
  const e = ENDINGS[endingId];
  return { kind: 'ending', endingId, title: e.title, classification: e.classification, paragraphs: e.text.map((p) => fill(p, cast)) };
}

/** Bir kararı çözer: yeni durum, değişenler ve hedef. */
export function decide(nodeId, optionId, preState) {
  const opt = NODES[nodeId].options.find((o) => o.id === optionId);
  if (!opt) throw new Error('Geçersiz seçenek');
  const { state, changed } = applyEffects(preState, opt.effects);
  return { state, changed, target: resolveTarget(opt.next, state) };
}

/** "Bu gece ne oldu?" paneli için finali etkileyen eksikler/hatalar. */
// Yalnız N20'den çıkılan finallerde anlamlıdır; çağıran taraf karar verir.
export function criticalNotes(s) {
  const out = [];
  {
    if (!s.namesRestored) {
      const miss = [];
      if (!s.proof) miss.push('kayıtların aslına dair kanıt');
      if (!s.anchor) miss.push('ismi tutan ortak tanıklık');
      if (!s.namesCounted) miss.push('gerçek ellerle yapılmış sayım');
      if (!s.exitPrepared) miss.push('mühürden önce hazırlanmış geçiş');
      out.push(miss.length ? 'İsimler geri alınamadı. Eksik kalanlar: ' + miss.join(', ') + '.' : 'İsimler son sayfada mühürlenmedi.');
    }
    if (s.memoryLost) out.push('Gecenin bir kısmı belleğinizde kalıcı bir boşluk bıraktı.');
    if (s.voiceTaken) out.push('Çalınan ses geri alınmadı.');
    if (s.guest) out.push('Fazladan biri aranıza karıştı ve gönderilmedi.');
    if (s.mirrored) out.push('Yansımanın izi üzerinizden temizlenmedi.');
    if (s.bargain) out.push('Sesle yapılan bir söz geri alınmadı.');
    if (s.borrowedName) out.push('Bir isme yabancı harfler karışmış olarak kaldı.');
    if (!s.seal) out.push('Arkanızdaki yolu kapatan işaret tamamlanmadı.');
    if (s.stain > 1) out.push('Köyün size bulaşan izi tam silinmedi.');
  }
  return out;
}
