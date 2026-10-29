// SON MİSAFİRLER — sadeleştirilmiş metinleri (content/son-misafirler/simple/*.json) asıl paketle birleştirir.
// Oyun mantığı (koşullar, etkiler, ölümler, finaller, görevli sayıları) asıl story.orig.json'dan aynen alınır;
// yalnız oyuncuya görünen metinler değişir. Çalıştır: node tools/build-son-misafirler.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dir = path.join(root, 'content/son-misafirler');
const orig = JSON.parse(fs.readFileSync(path.join(dir, 'story.orig.json'), 'utf8'));
const simple = {};
for (const f of fs.readdirSync(path.join(dir, 'simple')).sort()) Object.assign(simple, JSON.parse(fs.readFileSync(path.join(dir, 'simple', f), 'utf8')));

const ALLOWED = new Set(['FOCUS', 'A', 'B', 'ALIVE_NAMES', 'DEAD_NAMES', 'FINAL_VICTIMS', 'CHILD_EPILOGUE', 'LAST_DEAD', 'N']);
const COND = /^(flag:[A-Za-z]+|dead)$/;
const errors = [];
function check(where, text, { actor = false } = {}) {
  if (typeof text !== 'string' || !text.trim()) return errors.push(`${where}: boş metin`);
  for (const m of text.matchAll(/\{([A-Z_]+)\}/g)) {
    if (!ALLOWED.has(m[1])) errors.push(`${where}: bilinmeyen yer tutucu {${m[1]}}`);
    if ((m[1] === 'A' || m[1] === 'B') && !actor) errors.push(`${where}: görevsiz seçenekte {${m[1]}}`);
  }
  for (const m of text.matchAll(/\[\[([^|\]]+)\|/g)) {
    if (!COND.test(m[1])) errors.push(`${where}: geçersiz koşul [[${m[1]}`);
    if (m[1].startsWith('flag:') && !(m[1].slice(5) in orig.initialFlags)) errors.push(`${where}: bilinmeyen bayrak ${m[1]}`);
  }
  const opens = (text.match(/\[\[/g) || []).length, closes = (text.match(/\]\]/g) || []).length;
  if (opens !== closes) errors.push(`${where}: [[ ]] dengesiz`);
  if (/\*\*|`/.test(text)) errors.push(`${where}: biçim kalıntısı`);
}

const nodes = orig.nodes.map((n) => {
  const s = simple[n.id];
  if (!s) { errors.push(`${n.id}: sade metin yok`); return n; }
  check(`${n.id}.scene`, s.scene);
  check(`${n.id}.question`, s.question);
  const choices = {};
  for (const [oid, o] of Object.entries(n.choices)) {
    const so = s.choices?.[oid];
    if (!so) { errors.push(`${n.id}${oid}: sade seçenek yok`); continue; }
    if (so.cases.length !== o.cases.length) errors.push(`${n.id}${oid}: sonuç sayısı ${so.cases.length} ≠ ${o.cases.length}`);
    check(`${n.id}${oid}.label`, so.label);
    check(`${n.id}${oid}.brief`, so.taskBrief);
    if (o.soloBrief && !so.soloBrief) errors.push(`${n.id}${oid}: soloBrief eksik`);
    if (!o.soloBrief && so.soloBrief) errors.push(`${n.id}${oid}: fazladan soloBrief`);
    so.cases.forEach((t, i) => check(`${n.id}${oid}.case${i}`, t, { actor: o.taskCount > 0 }));
    choices[oid] = {
      ...o,
      label: so.label,
      taskBrief: so.taskBrief,
      soloBrief: o.soloBrief ? so.soloBrief : null,
      cases: o.cases.map((c, i) => ({ ...c, text: so.cases[i] })),
    };
  }
  return { ...n, title: s.title, scene: s.scene, question: s.question, choices };
});

const endings = orig.endings.map((e) => {
  const s = simple._endings?.[e.id];
  if (!s) { errors.push(`${e.id}: sade final yok`); return e; }
  check(`${e.id}`, s.text);
  return { ...e, title: s.title, text: s.text };
});

const extras = simple._extras;
for (const g of extras.ghostPages) check(`ghost ${g.title}`, g.text);

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
const out = { ...orig, nodes, endings, ...extras, simplified: true };
fs.writeFileSync(path.join(dir, 'story.json'), JSON.stringify(out, null, 2));
console.log(`tamam: ${nodes.length} sahne, ${nodes.reduce((a, n) => a + Object.keys(n.choices).length, 0)} seçenek, ${nodes.reduce((a, n) => a + Object.values(n.choices).reduce((b, o) => b + o.cases.length, 0), 0)} sonuç, ${endings.length} final, ${extras.ghostPages.length} ölü sayfası`);
