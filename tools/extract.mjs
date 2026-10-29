// Kaynak belgeden (content/kaynak.md) oyun içeriğini birebir çıkarır → content/story.json
// Çalıştır: node tools/extract.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const md = fs.readFileSync(path.join(root, 'content/kaynak.md'), 'utf8').replace(/\r\n/g, '\n');

function section(startHeading, endHeading) {
  const s = md.indexOf(startHeading);
  const e = endHeading ? md.indexOf(endHeading, s + 1) : md.length;
  if (s < 0 || e < 0) throw new Error('Bölüm bulunamadı: ' + startHeading);
  return md.slice(s, e);
}
const paras = (txt) => txt.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

// ---------- Düğümler ----------
const scenes = section('## 6. Sahne senaryoları', '## 7. Yirmi final');
const nodeChunks = scenes.split(/\n### (?=N\d\d — )/).slice(1);
const nodes = nodeChunks.map((chunk) => {
  const [head, ...rest] = chunk.split('\n');
  const m = head.match(/^(N\d\d) — (.+)$/);
  const body = rest.join('\n');
  const textStart = body.indexOf('**Oyuncuya gösterilecek metin:**');
  const qIdx = body.indexOf('**Soru:**');
  const text = paras(body.slice(textStart + '**Oyuncuya gösterilecek metin:**'.length, qIdx));
  const question = body.slice(qIdx).match(/^\*\*Soru:\*\* (.+)$/m)[1].trim();
  const optRe = /\*\*([ABCD]) — (.+?)\*\*\n\n\*\*Sonuç:\*\* ([\s\S]+?)\n\n\*Geliştirici:\* Etkiler `(\{.*?\})` → Hedef `([A-Z_0-9]+)`\./g;
  const options = [];
  let om;
  while ((om = optRe.exec(body))) {
    options.push({ id: om[1], label: om[2].trim(), result: paras(om[3]), effects: JSON.parse(om[4]), next: om[5] });
  }
  return { id: m[1], title: m[2].trim(), text, question, options };
});

// ---------- Finaller ----------
const endSec = section('## 7. Yirmi final', '## 8. Kesin final');
const endings = endSec.split(/\n### (?=E\d\d — )/).slice(1).map((chunk) => {
  const [head, ...rest] = chunk.split('\n');
  const m = head.match(/^(E\d\d) — (.+)$/);
  const body = rest.join('\n');
  const cls = body.match(/^\*\*Sınıf:\*\* (.+)$/m)[1].trim();
  const text = paras(body.replace(/^\*\*Sınıf:\*\* .+$/m, ''));
  return { id: m[1], title: m[2].trim(), classification: cls, text };
});

// ---------- Katkı cümleleri ----------
const contrib = {};
for (const m of md.matchAll(/^\| (N\d\d)–(N\d\d) \| `(.+?)` \|$/gm)) {
  contrib[`${m[1]}-${m[2]}`] = m[3];
}
// ---------- Bayrak hatırlatmaları ----------
const reminders = {};
for (const m of md.matchAll(/^\| (voiceTaken|guest|borrowedName|mirrored|memoryLost|bargain) \| `(.+?)` \|$/gm)) {
  reminders[m[1]] = m[2];
}
// ---------- Özel metinler ----------
const restoreOk = md.match(/- \*\*Başarılı:\*\* “(.+?)”\n/)[1];
const restoreFail = md.match(/- \*\*Başarısız:\*\* “(.+?)”\n/)[1];
const crossOk = md.match(/sonucu E01–E04 ise “(.+?)”;/)[1];
const crossBad = md.match(/E06\/E08 ise “(.+?)” gösterilir/)[1];
const voiceAddon = md.match(/sonuçtan sonra “(Bu ses bir an odada dolaşıp \{P4\} boğazında susuyor)” cümlesi/)[1] + '.';

// ---------- Lobi metinleri ----------
const lobbySec = section('### Lobi tanıtımı — oyuncuya göster', '### İlk sahneden önce');
const lobbyParas = paras(lobbySec.replace('### Lobi tanıtımı — oyuncuya göster', ''));
const rulesSec = section('### İlk sahneden önce tek ekranlık kurallar', '## 3. Yazar dosyası');
const rules = [...rulesSec.matchAll(/^\d\. (.+)$/gm)].map((m) => m[1]);
const contentNote = rulesSec.match(/\*\*İçerik notu:\*\* (.+)$/m)[1];

const story = {
  contentVersion: '1.0',
  title: 'ADIN KİMDE KALDI?',
  intro: {
    paragraphs: lobbyParas.filter((p) => !p.startsWith('**Amacınız:**')),
    goal: lobbyParas.find((p) => p.startsWith('**Amacınız:**')).replace('**Amacınız:** ', ''),
    rules,
    contentNote,
  },
  contributions: contrib,
  reminders,
  special: { restoreOk, restoreFail, crossOk, crossBad, voiceAddon },
  nodes,
  endings,
};

fs.writeFileSync(path.join(root, 'content/story.json'), JSON.stringify(story, null, 2));
console.log(`düğüm=${nodes.length} seçenek=${nodes.reduce((a, n) => a + n.options.length, 0)} final=${endings.length} katkı=${Object.keys(contrib).length} hatırlatma=${Object.keys(reminders).length} kural=${rules.length}`);
