// Adın Kimde Kaldı? — istemci. Sunucu tek otoritedir; burada yalnız görüntü ve istek var.
// Bütün kullanıcı/hikâye metinleri textContent ile yazılır (HTML olarak yorumlanmaz).

import { preloadScares, playScare } from './scare.js';

const app = document.getElementById('app');
const layer = document.getElementById('layer');

// ---------- yardımcılar ----------
function h(tag, attrs = {}, ...kids) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v == null || v === false) continue;
    if (k === 'class') el.className = v;
    else if (k === 'text') el.textContent = v;
    else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
    else el.setAttribute(k, v === true ? '' : v);
  }
  for (const c of kids.flat()) if (c != null && c !== false) el.append(c instanceof Node ? c : document.createTextNode(String(c)));
  return el;
}
const seg = 'Segmenter' in Intl ? new Intl.Segmenter('tr', { granularity: 'grapheme' }) : null;
const graphemes = (s) => (seg ? [...seg.segment(s)].map((x) => x.segment) : Array.from(s));
const rid = () => (crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2) + Date.now());
const isSign = (p) => /\p{L}/u.test(p) && p === p.toLocaleUpperCase('tr') && p.length < 80;

// ---------- ayarlar ----------
const SPEEDS = [{ v: 15, t: 'Yavaş' }, { v: 28, t: 'Normal' }, { v: 45, t: 'Hızlı' }];
const settings = Object.assign(
  { speed: 28, reduceMotion: matchMedia('(prefers-reduced-motion: reduce)').matches, sound: false, vibrate: false, scare: true, scareSound: true, scareVolume: 0.45 },
  load('akk.settings'),
);
function load(k) { try { return JSON.parse(localStorage.getItem(k)) || null; } catch { return null; } }
function save(k, v) { try { v == null ? localStorage.removeItem(k) : localStorage.setItem(k, JSON.stringify(v)); } catch {} }
function saveSettings() { save('akk.settings', settings); document.documentElement.classList.toggle('reduce-motion', settings.reduceMotion); sound.sync(); }
document.documentElement.classList.toggle('reduce-motion', settings.reduceMotion);

// ---------- ses (isteğe bağlı, düşük seviye, dosyasız) ----------
const sound = {
  ctx: null, wind: null,
  ensure() {
    if (!this.ctx) { try { this.ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch { return null; } }
    if (this.ctx.state === 'suspended') this.ctx.resume();
    return this.ctx;
  },
  sync() {
    const inGame = snap && snap.phase !== 'LOBBY';
    if (settings.sound && inGame) this.startWind(); else this.stopWind();
  },
  startWind() {
    if (this.wind || !this.ensure()) return;
    const c = this.ctx;
    const buf = c.createBuffer(1, c.sampleRate * 4, c.sampleRate);
    const d = buf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < d.length; i++) { last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02; d[i] = last * 3.5; }
    const src = c.createBufferSource(); src.buffer = buf; src.loop = true;
    const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 380;
    const g = c.createGain(); g.gain.value = 0;
    const lfo = c.createOscillator(); lfo.frequency.value = 0.07;
    const lg = c.createGain(); lg.gain.value = 0.012;
    lfo.connect(lg).connect(g.gain);
    src.connect(lp).connect(g).connect(c.destination);
    g.gain.setTargetAtTime(0.025, c.currentTime, 2);
    src.start(); lfo.start();
    this.wind = { src, lfo, g };
  },
  stopWind() {
    if (!this.wind) return;
    const { src, lfo, g } = this.wind; this.wind = null;
    g.gain.setTargetAtTime(0, this.ctx.currentTime, 0.4);
    setTimeout(() => { try { src.stop(); lfo.stop(); } catch {} }, 1500);
  },
  tick() {
    if (!settings.sound || !this.ctx || this.ctx.state !== 'running') return;
    const c = this.ctx, t = c.currentTime;
    const o = c.createOscillator(); o.type = 'square'; o.frequency.value = 1800 + Math.random() * 600;
    const g = c.createGain(); g.gain.setValueAtTime(0.008, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.025);
    o.connect(g).connect(c.destination); o.start(t); o.stop(t + 0.03);
  },
};
const buzz = (ms = 30) => { if (settings.vibrate && navigator.vibrate) navigator.vibrate(ms); };
const isSS = () => snap?.storyId === 'son_sefer';
// Tarayıcılar sesi ancak bir dokunuştan sonra açar: her dokunuşta ses bağlamı hazırlanır.
document.addEventListener('pointerdown', () => { if (isSS() && settings.scareSound) preloadScares(sound.ensure()); }, { passive: true });

// ---------- kişisel ölüm efekti ----------
const liveDeaths = new Set(); // bu oturumda sunucudan canlı gelen olaylar
const scared = new Set(load('akk.scared') || []);
function markScared(id) { scared.add(id); save('akk.scared', [...scared].slice(-50)); }
function runScare(p) {
  markScared(p.eventId);
  const done = () => { req('ackDeath', { eventId: p.eventId }); view?.afterScare?.(); };
  if (!settings.scare) return done();
  playScare(p.key, { ctx: settings.scareSound ? sound.ensure() : null, sound: settings.scareSound, volume: settings.scareVolume, vibrate: settings.vibrate, reduceMotion: settings.reduceMotion }, done);
}
function maybeScare() {
  const p = snap?.page?.personal;
  if (!p || !liveDeaths.has(p.eventId) || scared.has(p.eventId)) return;
  runScare(p);
}

// ---------- bağlantı ----------
let ws = null, snap = null, session = load('akk.session'), connected = false, retry = 0, everConnected = false;
const pending = new Map();
let homeError = '';

function connect() {
  ws = new WebSocket(`${location.protocol === 'https:' ? 'wss' : 'ws'}://${location.host}/ws`);
  ws.onopen = () => {
    connected = true; retry = 0; everConnected = true; banner(null);
    if (session) req('resume', session).then((r) => {
      if (!r.ok) { session = null; save('akk.session', null); snap = null; homeError = r.error; viewKey = null; render(); }
    });
    else render();
  };
  ws.onmessage = (e) => {
    const m = JSON.parse(e.data);
    if (m.type === 'snapshot') {
      if (snap && m.snapshot.gameId === snap.gameId && m.snapshot.rev < snap.rev) return; // eski olay yeniyi ezemez
      snap = m.snapshot; render();
    } else if (m.type === 'session') {
      if (m.key) { session = { roomCode: m.roomCode, playerId: m.playerId, key: m.key }; save('akk.session', session); }
    } else if (m.type === 'response') {
      const p = pending.get(m.requestId); if (p) { pending.delete(m.requestId); p(m); }
    } else if (m.type === 'death') {
      liveDeaths.add(m.event.eventId);
      maybeScare();
    } else if (m.type === 'left') {
      session = null; snap = null; save('akk.session', null); render();
    }
  };
  ws.onclose = () => {
    connected = false;
    for (const p of pending.values()) p({ ok: false, error: 'Bağlantı koptu.' });
    pending.clear();
    if (everConnected) banner('Bağlantı yeniden kuruluyor…');
    setTimeout(connect, Math.min(8000, 500 * 2 ** retry++));
  };
}
function req(type, body = {}) {
  return new Promise((res) => {
    if (!ws || ws.readyState !== 1) return res({ ok: false, error: 'Bağlantı yok.' });
    const requestId = rid();
    pending.set(requestId, res);
    ws.send(JSON.stringify({ type, requestId, gameId: snap?.gameId, ...body }));
  });
}
async function act(type, body) {
  const r = await req(type, body);
  if (!r.ok && r.error !== 'STALE') toast(r.error);
  return r;
}

function banner(text) {
  document.querySelector('.banner')?.remove();
  if (text) document.body.append(h('div', { class: 'banner', role: 'status', text }));
}
let toastT;
function toast(text) {
  document.querySelector('.toast')?.remove();
  const t = h('div', { class: 'toast', role: 'alert', text });
  document.body.append(t);
  clearTimeout(toastT); toastT = setTimeout(() => t.remove(), 3500);
}

// ---------- görünüm yönetimi ----------
let view = null, viewKey = null;
const typedProgress = new Map(); // pageId → yazılmış grafem sayısı (sayfa yenilenince baştan başlamaz)

function render() {
  sound.sync();
  document.body.classList.toggle('story-son_sefer', isSS());
  if (isSS() && snap.phase !== 'LOBBY' && settings.scare) preloadScares(settings.scareSound ? sound.ctx : null);
  let key;
  if (!snap) key = 'home';
  else if (snap.phase === 'LOBBY') key = 'lobby:' + snap.gameId + ':' + snap.storyId;
  else key = `${snap.phase}:${snap.pageId}:${snap.voting?.round || 0}`;
  if (key !== viewKey) {
    view?.destroy?.();
    viewKey = key;
    app.replaceChildren();
    window.scrollTo(0, 0);
    if (!snap) view = HomeView();
    else if (snap.phase === 'LOBBY') view = LobbyView();
    else if (snap.phase === 'VOTING') view = VotingView();
    else if (snap.phase === 'FINISHED') view = FinishedView();
    else view = PageView();
  }
  view.update?.(snap);
  renderPause();
  maybeScare();
}

function topbar(where) {
  const bar = h('div', { class: 'topbar' }, h('div', { class: 'where', text: where }));
  if (snap && snap.phase !== 'LOBBY') bar.append(h('button', { class: 'iconbtn', onclick: openNotes, 'aria-label': 'Gecenin notları', text: 'Notlar' }));
  bar.append(h('button', { class: 'iconbtn', onclick: openSettings, 'aria-label': 'Ayarlar', text: 'Ayarlar' }));
  return bar;
}

// ---------- Ana ekran ----------
function HomeView() {
  const params = new URLSearchParams(location.search);
  const preset = (params.get('oda') || '').toUpperCase().slice(0, 5);
  const name = h('input', { id: 'name', maxlength: 40, autocomplete: 'nickname', placeholder: 'Görünen adın', enterkeyhint: 'go' });
  name.value = load('akk.lastName') || '';
  const code = h('input', { id: 'code', class: 'code', maxlength: 5, autocapitalize: 'characters', autocomplete: 'off', placeholder: 'KOD', inputmode: 'text' });
  code.value = preset;
  const err = h('p', { class: 'error', role: 'alert', text: homeError });
  homeError = '';
  const heroTitles = h('h1', { class: 'titles' }, h('span', {}, 'ADIN KİMDE KALDI', h('span', { class: 'q', text: '?', style: 'display:inline' })));
  fetch('/api/stories').then((r) => r.json()).then((list) => {
    heroTitles.replaceChildren(...list.flatMap((st, i) => [i ? h('span', { class: 'amp', text: 'YA DA' }) : null, h('span', { text: st.title.toLocaleUpperCase('tr') })]));
  }).catch(() => {});
  const go = async (type) => {
    save('akk.lastName', name.value.trim());
    sound.ensure();
    if (!connected) { err.textContent = 'Sunucuya bağlanılıyor, bir saniye…'; return; }
    const body = type === 'create' ? { name: name.value } : { name: name.value, roomCode: code.value.trim() };
    if (type === 'join' && body.roomCode.length < 5) { err.textContent = 'Oda kodu 5 karakter.'; return; }
    const r = await req(type, body);
    err.textContent = r.ok ? '' : r.error;
    if (r.ok && preset) history.replaceState(null, '', '/');
  };
  const joinBtn = h('button', { class: 'btn' + (preset ? ' primary' : ''), onclick: () => go('join'), text: 'Odaya katıl' });
  const createBtn = h('button', { class: 'btn' + (preset ? '' : ' primary'), onclick: () => go('create'), text: 'Oda kur' });
  app.append(
    topbar(''),
    h('section', { class: 'hero' },
      h('p', { class: 'eyebrow', text: '4–10 kişi · telefonlardan ortak karar' }),
      heroTitles,
      h('p', { text: 'Odayı kuran kişi hikâyeyi seçer. Herkes kendi telefonundan okur, birlikte karar verirsiniz.' }),
    ),
    h('div', { class: 'card' },
      h('label', { class: 'field' }, h('span', { text: 'Adın' }), name),
      preset
        ? [h('label', { class: 'field' }, h('span', { text: 'Oda kodu' }), code), joinBtn, h('div', { class: 'or', text: 'YA DA' }), createBtn]
        : [createBtn, h('div', { class: 'or', text: 'YA DA' }), h('label', { class: 'field' }, h('span', { text: 'Oda kodu' }), code), joinBtn],
      err,
    ),
    h('p', { class: 'note', text: 'Gerçek adın şart değil. Oyun telefonunun rehberine, fotoğraflarına, konumuna veya mikrofonuna erişmez.' }),
  );
  code.addEventListener('input', () => { code.value = code.value.toUpperCase().replace(/[^A-Z0-9]/g, ''); });
  return {};
}

// ---------- Lobi ----------
function LobbyView() {
  const joinUrl = `${location.origin}/?oda=${snap.roomCode}`;
  const list = h('ul', { class: 'players' });
  const count = h('p', { class: 'small' });
  const startBtn = h('button', { class: 'btn primary', onclick: () => act('start'), text: 'Oyunu başlat' });
  const waitNote = h('p', { class: 'status' });
  const intro = snap.intro;
  const storyBox = h('div', { class: 'stories' });
  const effects = isSS() ? h('div', { class: 'card' },
    h('p', { class: 'eyebrow', text: 'Ölüm efektleri · bu telefon' }),
    h('p', { class: 'small', style: 'margin:0 0 8px', text: 'Korku görseli ve sesi yalnız ölen kişinin telefonunda açılır. Kapatırsan sade ölüm kartı görürsün; oyun değişmez.' }),
    toggle('Jumpscare görseli', 'scare'),
    toggle('Jumpscare sesi', 'scareSound', () => { if (settings.scareSound) preloadScares(sound.ensure()); }),
    volumeRow(),
    h('button', { class: 'btn', style: 'margin-top:12px', onclick: () => { const c = sound.ensure(); preloadScares(c); toast(c ? 'Ses açık. Telefonun sessiz modda değilse efektleri duyacaksın.' : 'Bu tarayıcı sesi açmadı; sade ölüm kartı gösterilecek.'); }, text: 'Sesi etkinleştir' }),
  ) : null;
  const botName = h('input', { maxlength: 40, placeholder: 'Bot adı (boş bırakılabilir)', 'aria-label': 'Bot adı' });
  let adding = false;
  const addBot = async (times = 1) => {
    if (adding) return;
    adding = true; botBtn.disabled = fillBtn.disabled = true;
    for (let i = 0; i < times; i++) {
      const r = await act('addBot', { name: i === 0 ? botName.value : '' });
      if (!r.ok) break;
      if (i === 0) botName.value = '';
    }
    adding = false;
    view?.update?.(snap);
  };
  const botBtn = h('button', { class: 'btn', onclick: () => addBot(1), text: '+ Bot ekle' });
  const fillBtn = h('button', { class: 'btn ghost' });
  const botBox = h('div', { class: 'botbox' },
    h('p', { class: 'eyebrow', style: 'margin-top:16px', text: 'Botlar' }),
    h('p', { class: 'small', style: 'margin:0 0 10px', text: 'Botlar hikâyede karakter olur, okumayı beklemez ve rastgele oy verir.' }),
    h('label', { class: 'field' }, botName), botBtn, fillBtn);
  const share = async () => {
    try {
      if (navigator.share) await navigator.share({ title: snap.storyTitle, text: `Oda kodu: ${snap.roomCode}`, url: joinUrl });
      else { await navigator.clipboard.writeText(joinUrl); toast('Bağlantı kopyalandı.'); }
    } catch {}
  };
  app.append(
    topbar('Lobi'),
    h('div', { class: 'card' },
      h('div', { class: 'roomcode' },
        h('img', { src: `/api/qr?text=${encodeURIComponent(joinUrl)}`, alt: 'Odaya katılmak için QR kodu' }),
        h('div', { class: 'meta' },
          h('p', { class: 'eyebrow', text: 'Oda kodu' }),
          h('div', { class: 'code', text: snap.roomCode }),
          h('button', { class: 'linkbtn', onclick: share, text: 'Bağlantıyı paylaş' }),
        ),
      ),
    ),
    h('div', { class: 'card' }, h('p', { class: 'eyebrow', text: 'Hikâye' }), storyBox),
    h('div', { class: 'card' }, h('p', { class: 'eyebrow', text: 'Oyuncular' }), list, count, botBox),
    h('div', { class: 'card' },
      intro.paragraphs.slice(0, 1).map((p) => h('p', { text: p })),
      h('div', { class: 'goal' }, h('b', { text: 'Amacınız' }), intro.goal),
      intro.paragraphs.slice(1).map((p) => h('p', { class: 'small', text: p })),
    ),
    h('div', { class: 'card' },
      h('p', { class: 'eyebrow', text: 'Kurallar' }),
      h('ol', { class: 'rules' }, intro.rules.map((r) => h('li', { text: r }))),
      h('p', { class: 'note' }, h('b', { text: isSS() ? 'Başlamadan: ' : 'İçerik notu: ' }), intro.contentNote),
    ),
    effects,
    h('button', { class: 'btn ghost', onclick: () => { if (confirm('Odadan ayrılmak istiyor musun?')) act('leave'); }, text: 'Odadan ayrıl' }),
  );
  const dock = h('div', { class: 'dock' }, h('div', { class: 'dock-inner' }, waitNote, startBtn));
  app.append(dock);
  return {
    update(s) {
      storyBox.replaceChildren(...s.stories.map((st) => h('button', {
        class: 'storycard', 'aria-pressed': String(st.id === s.storyId), disabled: !s.me.isHost,
        onclick: () => act('setStory', { storyId: st.id }),
      }, h('h4', { text: st.title }), h('p', { text: st.tagline }), h('div', { class: 'tags' }, st.tags.map((t) => h('span', { class: 'tag', text: t }))))));
      if (!s.me.isHost) storyBox.append(h('p', { class: 'small', style: 'margin:4px 0 0', text: 'Hikâyeyi ev sahibi seçer.' }));
      list.replaceChildren(...s.players.map((p) => h('li', {},
        h('span', { class: 'dot' + (p.connected ? '' : ' off'), title: p.connected ? 'Bağlı' : 'Bağlantı bekleniyor' }),
        h('span', { class: 'name', text: p.name }),
        p.isBot ? h('span', { class: 'tag', text: 'bot' }) : null,
        p.id === s.me.id ? h('span', { class: 'tag', text: 'sen' }) : null,
        p.isHost ? h('span', { class: 'tag', text: 'ev sahibi' }) : null,
        s.me.isHost && (!p.connected || p.isBot) && p.id !== s.me.id ? h('button', { class: 'linkbtn', onclick: () => act('leave', { targetId: p.id }), text: 'çıkar' }) : null,
      )));
      const n = s.players.length;
      const bots = s.players.filter((p) => p.isBot).length;
      count.textContent = `${n}/${s.limits.max} karakter` + (bots ? ` (${bots} bot)` : '') + ` · en az ${s.limits.min} ile başlar`;
      botBox.hidden = !s.me.isHost;
      const room = s.limits.max - n;
      botBtn.disabled = adding || room <= 0;
      botBtn.textContent = room <= 0 ? 'Oda dolu' : '+ Bot ekle';
      const need = n < s.limits.min ? s.limits.min - n : room;
      fillBtn.hidden = room <= 0;
      fillBtn.disabled = adding;
      fillBtn.textContent = n < s.limits.min ? `${need} bot ekleyip ${s.limits.min}'e tamamla` : `Odayı botlarla doldur (+${need})`;
      fillBtn.onclick = () => addBot(need);
      startBtn.hidden = !s.me.isHost;
      startBtn.disabled = n < s.limits.min || n > s.limits.max;
      waitNote.textContent = s.me.isHost
        ? (n < s.limits.min ? `Başlamak için ${s.limits.min - n} kişi daha gerekiyor (bot da olur).` : 'Herkes geldiyse başlatabilirsin.')
        : 'Ev sahibinin oyunu başlatması bekleniyor.';
    },
  };
}

// ---------- Daktilo ----------
function Typer(container, blocks, pageId, onProgress) {
  // blocks: [{text, cls}] veya [{node}] — node'lar ulaşıldığında bir anda eklenir
  const items = blocks.map((b) => (b.node ? { node: b.node, len: 1 } : { ...b, g: graphemes(b.text), len: 0 }));
  for (const it of items) if (it.g) it.len = it.g.length;
  const total = items.reduce((a, it) => a + it.len, 0);
  let shown = Math.min(typedProgress.get(pageId) || 0, total);
  if (settings.reduceMotion) shown = total;
  const els = items.map((it) => it.node || h('p', { class: it.cls || '' }));
  const caret = h('span', { class: 'caret', 'aria-hidden': 'true' });
  let raf = null, last = performance.now(), acc = 0, pauseUntil = 0, ticks = 0, done = false;

  function paint() {
    let left = shown;
    container.replaceChildren();
    for (let i = 0; i < items.length; i++) {
      if (left <= 0) break;
      const it = items[i];
      container.append(els[i]);
      if (it.node) { left -= 1; continue; }
      const k = Math.min(left, it.len);
      els[i].textContent = k === it.len ? it.text : it.g.slice(0, k).join('');
      left -= k;
      if (k < it.len) els[i].append(caret);
    }
    typedProgress.set(pageId, shown);
  }
  // Paragraflar art arda eklendikçe yalnız son paragrafı güncelle
  function step(now) {
    const dt = now - last; last = now;
    if (now >= pauseUntil) {
      acc += (dt / 1000) * settings.speed;
      const add = Math.floor(acc);
      if (add > 0) {
        acc -= add;
        const before = boundaryIndex(shown);
        shown = Math.min(total, shown + add);
        const after = boundaryIndex(shown);
        if (after !== before) pauseUntil = now + 420; // paragraf sonunda kısa nefes
        if (++ticks % 2 === 0) sound.tick();
        paint();
        follow();
      }
    }
    if (shown >= total) return finish();
    raf = requestAnimationFrame(step);
  }
  function boundaryIndex(n) { let i = 0, s = 0; for (; i < items.length; i++) { s += items[i].len; if (n < s) return i; } return i; }
  function follow() {
    const r = container.getBoundingClientRect();
    const nearBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 260;
    if (nearBottom && r.bottom > window.innerHeight - 170) window.scrollBy({ top: r.bottom - (window.innerHeight - 170), behavior: 'auto' });
  }
  function finish() {
    if (done) return; done = true;
    cancelAnimationFrame(raf);
    shown = total; paint();
    onProgress?.(true);
  }
  paint();
  if (shown >= total) { done = true; queueMicrotask(() => onProgress?.(true)); } else raf = requestAnimationFrame((t) => { last = t; step(t); });
  return { finish, get done() { return done; }, destroy() { cancelAnimationFrame(raf); } };
}

// ---------- Okuma sayfaları: sahne, sonuç, eşitlik, final ----------
function tallyBars(tally, winner) {
  // tally: {A: 2, ...} veya [{id, short, count}]
  const rows = Array.isArray(tally) ? tally.map((t) => [t.id, t.count, t.short]) : Object.entries(tally).map(([id, n]) => [id, n, id]);
  const wide = rows.some((r) => r[2].length > 2);
  const max = Math.max(1, ...rows.map((r) => r[1]));
  return h('div', { class: 'tally', role: 'list', 'aria-label': 'Oy dağılımı' },
    rows.map(([id, n, short]) => h('div', { class: 'bar' + (winner && winner.includes(id) ? ' win' : ''), role: 'listitem', 'aria-label': `${short}: ${n} oy`, style: wide ? 'grid-template-columns: minmax(0,7em) 1fr 2em' : null },
      h('span', { text: short, style: wide ? 'overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-family:var(--serif)' : null }),
      h('span', { class: 'track' }, h('span', { class: 'fill', style: `width:${(n / max) * 100}%` })),
      h('span', { class: 'n', text: n }),
    )));
}

function PageView() {
  const s0 = snap;
  const page = s0.page;
  const story = h('div', { class: 'story' });
  const blocks = [];
  let title = page.title;
  buzz();

  if (page.kind === 'scene') {
    app.append(topbar(`${s0.roomCode} · ${page.title}`), h('div', { class: 'scene-title' + (settings.reduceMotion ? '' : ' flicker'), text: page.title }));
    if (page.viewerDead) app.append(h('div', { class: 'dead-tag', text: 'Bu sahne hayatta kalanları anlatıyor' }));
    if (page.focusName) app.append(h('p', { class: 'focusline', text: `Bu bölümün odağı: ${page.focusName}` }));
    if (page.reminder) blocks.push({ text: page.reminder, cls: 'reminder' });
    for (const p of page.paragraphs) blocks.push({ text: p, cls: isSign(p) ? 'sign' : '' });
    if (page.contribution) blocks.push({ text: page.contribution, cls: 'contrib' });
    if (page.dead?.length) blocks.push({ node: rosterCard(page) });
    if (page.ghost) blocks.push({ node: ghostCard(page.ghost) });
  } else if (page.kind === 'result') {
    const winner = [page.optionId];
    app.append(topbar(`${s0.roomCode} · ${page.title}`));
    if (page.personal) app.append(deathCard(page.personal));
    else if (page.viewerDead) app.append(h('div', { class: 'dead-tag', text: 'Bu sahne hayatta kalanları anlatıyor' }));
    app.append(
      h('div', { class: 'scene-title', text: page.rounds > 1 ? `Karar · ${page.rounds}. turda çıktı` : 'Karar' }),
      h('div', { class: 'chosen' }, h('small', { text: `Seçilen: ${page.optionId}` }), page.label,
        page.actors?.length ? h('small', { style: 'margin:8px 0 0', text: (page.actors.length > 1 ? 'Görevliler: ' : 'Görevli: ') + page.actors.join(', ') }) : null),
      tallyBars(page.tally, winner),
    );
    for (const p of page.paragraphs) blocks.push({ text: p, cls: isSign(p) ? 'sign' : '' });
    if (page.deathsNow) blocks.push({ node: rosterCard(page, page.deathsNow) });
  } else if (page.kind === 'tie') {
    app.append(
      topbar(`${s0.roomCode} · ${page.title}`),
      h('div', { class: 'scene-title', text: `${page.round}. tur · eşitlik` + (page.voteKind === 'PRIMARY' ? ' · görevli' : page.voteKind === 'HELPER' ? ' · ikinci görevli' : '') }),
      h('p', { class: 'tie-head', text: 'Karar çıkmadı. Şu seçenekler yeniden oylanıyor.' }),
      tallyBars(page.tally, page.remaining.map((o) => o.id)),
      h('ul', { class: 'remaining' }, page.remaining.map((o) => h('li', {}, h('b', { text: o.id }), h('span', { text: o.label })))),
      h('p', { class: 'small', text: page.voteKind && page.voteKind !== 'ACTION'
        ? 'Görevli seçilemedi. Herkes hazır olunca yalnız bu kişiler arasında yeniden oy vereceksiniz. Eşitlik bozulana kadar kimse göreve gitmez.'
        : 'Aranızda konuşun. Herkes hazır olunca yalnız bu seçenekler arasında yeniden oy vereceksiniz. Eşitlik bozulana kadar hikâye ilerlemez.' }),
    );
  } else if (page.kind === 'ending') {
    title = page.title;
    const good = page.endingId === 'E01' || page.endingId === 'S2_E01';
    app.append(
      topbar(`${s0.roomCode} · Final`),
      h('div', { class: 'ending-head ' + (good ? 'good' : 'bad') },
        h('div', { class: 'cls', text: page.classification }),
        h('h2', { text: page.title })),
    );
    for (const p of page.paragraphs) {
      blocks.push({ text: p, cls: isSign(p) ? 'sign' : '' });
      if (page.endingId === 'E20' && p.startsWith('Dört isim görünüyor')) blocks.push({ node: FakeVote(s0) });
    }
    if (page.alive) blocks.push({ node: rosterCard(page) });
  }
  app.append(story);

  // alt çubuk
  const status = h('p', { class: 'status', role: 'status' });
  const chips = h('div', { class: 'chips' });
  const skipBtn = h('button', { class: 'btn ghost', text: 'Tam metni göster' });
  const readyBtn = h('button', { class: 'btn primary', text: page.kind === 'tie' ? 'Yeniden oylamaya hazırım' : page.kind === 'ending' ? 'Finali okudum' : 'Okudum' });
  const row = h('div', { class: 'row' }, skipBtn, readyBtn);
  app.append(h('div', { class: 'dock' }, h('div', { class: 'dock-inner' }, status, chips, row)));

  let sending = false;
  const typer = blocks.length ? Typer(story, blocks, s0.pageId, () => { skipBtn.hidden = true; }) : null;
  if (!typer) skipBtn.hidden = true;
  skipBtn.onclick = () => typer?.finish();
  readyBtn.onclick = async () => {
    typer?.finish();
    sending = true; readyBtn.disabled = true;
    const r = await act('ready', { pageId: snap.pageId, phaseVersion: snap.phaseVersion });
    sending = false;
    if (!r.ok) readyBtn.disabled = false;
  };
  void title;

  return {
    destroy() { typer?.destroy(); },
    afterScare() { app.querySelector('.watchfx')?.remove(); },
    update(s) {
      const me = s.players.find((p) => p.id === s.me.id);
      const ready = !!me?.ready;
      readyBtn.disabled = ready || sending || s.paused;
      if (ready) { readyBtn.textContent = 'Okudun · diğerleri bekleniyor'; skipBtn.hidden = true; }
      const off = s.players.filter((p) => !p.connected).length;
      status.textContent = `Şu an ${s.readyCount}/${s.castCount} kişi okudu` + (off ? ` · ${off} kişinin bağlantısı bekleniyor` : '');
      chips.replaceChildren(...s.players.map((p) => h('span', {
        class: 'chip' + (p.ready ? ' on' : '') + (p.connected ? '' : ' off') + (s.survival?.players[p.id]?.alive === false ? ' dead' : ''),
        title: p.connected ? (p.ready ? 'Okudu' : 'Okuyor') : 'Bağlantı bekleniyor',
        text: (p.ready ? '✓ ' : '') + p.name,
      })));
    },
  };
}

function rosterCard(page, lostNow) {
  return h('div', { class: 'roster' },
    lostNow?.length ? h('div', { class: 'lost' }, h('b', { text: 'Ölen' }), lostNow.join(', ')) : null,
    h('div', {}, h('b', { text: 'Yaşayan' }), page.alive.length ? page.alive.join(', ') : 'Kimse'),
    page.dead.length ? h('div', {}, h('b', { text: 'Suyun altındaki sesler' }), page.dead.join(', ')) : null,
  );
}
function ghostCard(g) {
  return h('div', { class: 'ghost' }, h('p', { class: 'eyebrow', text: 'Yalnız sana · ölülerin gördüğü' }), h('h4', { text: g.title }), g.paragraphs.map((p) => h('p', { text: p })));
}
function deathCard(p) {
  const box = h('div', { class: 'deathcard', role: 'status' }, h('h3', { text: p.card.title }), h('p', { text: p.card.text }));
  if (settings.scare && !scared.has(p.eventId) && !liveDeaths.has(p.eventId)) {
    box.append(h('button', { class: 'btn ghost watchfx', onclick: (e) => { e.currentTarget.remove(); runScare(p); }, text: 'Efekti izle' }));
  }
  if (p.ghost) box.append(ghostCard(p.ghost));
  return box;
}

function FakeVote(s) {
  const names = s.page.kind === 'ending' && s.ending?.fakeVoteNames ? s.ending.fakeVoteNames : (s.ending?.fakeVoteNames || []);
  const counts = names.map(() => 0);
  const box = h('div', { class: 'fakevote', 'aria-label': 'Final sahnesine ait kurmaca oylama; gerçek oyları etkilemez' },
    h('div', { class: 'label', text: 'Final sahnesi · gerçek oylama değil' }));
  const bars = h('div', { class: 'tally' });
  box.append(bars);
  const draw = () => {
    const max = Math.max(1, ...counts);
    bars.replaceChildren(...names.map((n, i) => h('div', { class: 'bar', style: 'grid-template-columns: minmax(0,7em) 1fr 2em' },
      h('span', { text: n, style: 'overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-family:var(--serif)' }),
      h('span', { class: 'track' }, h('span', { class: 'fill', style: `width:${(counts[i] / max) * 100}%` })),
      h('span', { class: 'n', text: counts[i] }))));
  };
  draw();
  if (!settings.reduceMotion) {
    let t = 0;
    const limit = (s.castCount || 4) * 3;
    const iv = setInterval(() => {
      counts[Math.floor(Math.random() * counts.length)] += 1;
      draw();
      if (++t >= limit || !box.isConnected && t > 2) clearInterval(iv);
    }, 450);
  } else { counts.forEach((_, i) => (counts[i] = s.castCount + i)); draw(); }
  return box;
}

// ---------- Oylama ----------
function VotingView() {
  const s0 = snap;
  const v = s0.voting;
  let selected = v.myVote;
  let locking = false;
  const ss = !!v.kind;
  const actorVote = ss && v.kind !== 'ACTION';
  app.append(topbar(`${s0.roomCode} · ${actorVote ? 'Görevli seçimi' : 'Karar'}`));
  if (v.isRepeat) app.append(h('p', { class: 'repeat', text: `Yeniden oylama · ${ss ? v.kindRound : v.round}. tur` }));
  if (ss && s0.survival?.me.alive === false) app.append(h('div', { class: 'dead-tag', text: 'Suyun altındaki ses · oy verebilirsin, göreve seçilemezsin' }));
  if (actorVote) {
    app.append(h('div', { class: 'actionbox' }, h('small', { text: `Seçilen eylem: ${v.action.id}` }), v.action.label,
      h('span', { class: 'brief', text: v.action.brief }),
      v.primaryName ? h('span', { class: 'need', text: `Birinci görevli: ${v.primaryName}` }) : null));
  }
  if (s0.page?.kind === 'scene') {
    const d = h('details', { class: 'reread' }, h('summary', { text: 'Sahneyi yeniden oku' }));
    const st = h('div', { class: 'story' });
    if (s0.page.reminder) st.append(h('p', { class: 'reminder', text: s0.page.reminder }));
    for (const p of s0.page.paragraphs) st.append(h('p', { text: p }));
    st.append(h('p', { class: 'contrib', text: s0.page.contribution }));
    d.append(st);
    app.append(d);
  }
  app.append(h('h2', { class: 'question', id: 'q', text: v.question }));
  if (ss && !actorVote && v.equipment) app.append(h('p', { class: 'equip' }, h('b', { text: 'Ekipman: ' }), v.equipment.length ? v.equipment.join(', ') : 'henüz yok'));
  const labelOf = (id) => v.options.find((o) => o.id === id)?.label ?? id;
  const opts = v.options.map((o, i) => h('button', {
    class: 'opt', role: 'radio', 'aria-checked': 'false', 'aria-label': actorVote ? `${o.label}, ${o.fatigueLabel}` : `${o.id}: ${o.label}`,
    onclick: () => { if (snap.voting.myVote || locking) return; selected = o.id; paint(); },
  },
  h('span', { class: 'letter', text: actorVote ? String(i + 1) : o.id }),
  actorVote
    ? h('span', { class: 'body' }, o.label + (o.isMe ? ' (sen)' : ''),
      h('span', { class: 'fat', 'aria-hidden': 'true' }, [0, 1].map((k) => h('i', { class: k < o.fatigue ? 'on' : '' }))),
      h('span', { class: 'brief', text: o.fatigueLabel }))
    : h('span', { class: 'body' }, o.label,
      o.need != null ? h('span', { class: 'need', text: o.need === 0 ? 'Ortak karar' : o.need === 1 ? 'Görevli: 1 kişi' : 'Görevli: 2 kişi' }) : null,
      o.need ? h('span', { class: 'brief', text: o.brief }) : null)));
  app.append(h('div', { class: 'options', role: 'radiogroup', 'aria-labelledby': 'q' }, opts));
  if (ss && v.ghosts?.length) app.append(h('p', { class: 'small', style: 'margin-top:14px' }, h('b', { text: 'Suyun Altındaki Ses — oy kullanabilir: ' }), v.ghosts.join(', ')));

  const status = h('p', { class: 'status', role: 'status' });
  const lockBtn = h('button', { class: 'btn primary', text: 'Oyumu kilitle' });
  app.append(h('div', { class: 'dock' }, h('div', { class: 'dock-inner' }, status, lockBtn)));
  lockBtn.onclick = async () => {
    if (!selected) return;
    locking = true; paint();
    const r = await act('vote', { nodeId: v.nodeId, voteRound: v.round, optionId: selected, phaseVersion: snap.phaseVersion });
    locking = false;
    if (r.ok) buzz(20);
    paint();
  };
  function paint() {
    const mine = snap.voting?.myVote;
    for (const [i, el] of opts.entries()) {
      el.setAttribute('aria-checked', String((mine || selected) === v.options[i].id));
      el.classList.toggle('locked', !!mine);
      el.disabled = !!mine || snap.paused;
    }
    lockBtn.disabled = !selected || !!mine || locking || snap.paused;
    lockBtn.textContent = actorVote
      ? (mine ? `Oyun kilitlendi: ${labelOf(mine)}` : locking ? 'Gönderiliyor…' : selected ? `${labelOf(selected)} · oyumu kilitle` : 'Bir kişi seç')
      : (mine ? `Oyun kilitlendi: ${mine}` : locking ? 'Gönderiliyor…' : selected ? `${selected} seçeneğine oyumu kilitle` : 'Bir seçenek seç');
    const off = snap.players.filter((p) => !p.connected).length;
    status.textContent = `${snap.voting.votedCount}/${snap.castCount} kişi oy verdi` + (off ? ` · ${off} kişinin bağlantısı bekleniyor` : '') + (mine ? ' · oylar tur kapanınca açıklanır' : '');
  }
  return { update: paint };
}

// ---------- Bitiş ----------
function FinishedView() {
  const e = snap.ending;
  const good = e.endingId === 'E01' || e.endingId === 'S2_E01';
  const again = h('button', { class: 'btn primary', onclick: () => act('returnToLobby'), text: 'Yeniden oyna' });
  const waitNote = h('p', { class: 'status' });
  const finalText = h('details', { class: 'night' }, h('summary', { text: 'Finali yeniden oku' }),
    h('div', { class: 'story' }, e.paragraphs.map((p) => h('p', { text: p }))));
  const night = h('details', { class: 'night', open: true }, h('summary', { text: 'Bu gece ne oldu?' }));
  if (e.notes.length) night.append(h('p', { class: 'eyebrow', text: 'Finali belirleyenler' }), h('ul', { class: 'crit' }, e.notes.map((n) => h('li', { text: n }))));
  else if (!good) night.append(h('p', { class: 'small', text: 'Son kararınız geceyi burada bitirdi.' }));
  if (e.alive) {
    night.append(h('p', { class: 'eyebrow', text: 'Kurtulanlar ve kayıplar' }), rosterCard(e));
    if (e.losses.length) night.append(h('ul', { class: 'crit' }, e.losses.map((l) => h('li', { text: `${l.name} — ${l.where}: ${l.label}` }))));
  }
  night.append(h('p', { class: 'eyebrow', text: `Yolunuz · ${e.path.length} karar` }),
    h('ol', { class: 'path' }, e.path.map((p) => h('li', {},
      h('span', { class: 't', text: p.title }),
      h('span', { text: `${p.winner} — ${p.label}` }),
      p.actors?.length ? h('span', { class: 'mine', text: 'Görevli: ' + p.actors.join(', ') + (p.deaths.length ? ` · Ölen: ${p.deaths.join(', ')}` : '') }) : (p.deaths?.length ? h('span', { class: 'mine', text: `Ölen: ${p.deaths.join(', ')}` }) : null),
      h('span', { class: 'mine', text: (p.myVote ? `Senin oyun: ${p.myVote}` : '') + (p.repeats ? ` · ${p.repeats} kez yeniden oylandı` : '') }),
    ))));
  app.append(
    topbar(`${snap.roomCode} · Oyun bitti`),
    h('div', { class: 'ending-head ' + (good ? 'good' : 'bad') }, h('div', { class: 'cls', text: e.classification }), h('h2', { text: e.title })),
    good ? h('p', { text: 'Bu kez gerçekten çıktınız.' }) : h('p', { class: 'small', text: isSS() ? 'Yirmi sondan yalnız biri herkesin gerçek kıyıya ulaştığı sondur.' : 'Yirmi sondan yalnız biri herkesin, gerçek isimleriyle çıktığı sondur.' }),
    night, finalText,
  );
  app.append(h('div', { class: 'dock' }, h('div', { class: 'dock-inner' }, waitNote, again)));
  return {
    update(s) {
      again.hidden = !s.me.isHost;
      waitNote.textContent = s.me.isHost ? 'Yeni oyun lobiye döner; kadro yeniden onaylanır.' : 'Ev sahibi yeni bir oyun başlatabilir.';
    },
  };
}

// ---------- Duraklatma ----------
function renderPause() {
  layer.querySelector('.overlay')?.remove();
  if (!snap?.paused) return;
  const box = h('div', { class: 'box' }, h('h3', { text: 'Oyun duraklatıldı' }), h('p', { class: 'small', text: 'Hikâye bekliyor. Kimse bir şey kaçırmıyor.' }));
  if (snap.me.isHost) box.append(h('button', { class: 'btn primary', onclick: () => act('pause', { paused: false }), text: 'Devam et' }));
  else box.append(h('p', { class: 'small', text: 'Ev sahibinin devam ettirmesi bekleniyor.' }));
  box.append(h('button', { class: 'btn ghost', onclick: openSettings, text: 'Ayarlar' }));
  layer.append(h('div', { class: 'overlay', role: 'dialog', 'aria-modal': 'true' }, box));
}

// ---------- Sayfalar: ayarlar, notlar ----------
function sheet(titleText, ...content) {
  const close = () => wrap.remove();
  const wrap = h('div', { class: 'sheet', role: 'dialog', 'aria-modal': 'true', onclick: (e) => { if (e.target === wrap) close(); } },
    h('div', { class: 'panel' }, h('h3', {}, titleText, h('button', { class: 'iconbtn', onclick: close, text: 'Kapat' })), ...content));
  document.body.append(wrap);
  return close;
}
function toggle(label, key, after) {
  const sw = h('button', { class: 'switch', role: 'switch', 'aria-checked': String(!!settings[key]), 'aria-label': label });
  sw.onclick = () => { settings[key] = !settings[key]; sw.setAttribute('aria-checked', String(settings[key])); if (key === 'sound' && settings.sound) sound.ensure(); saveSettings(); after?.(); };
  return h('div', { class: 'setting' }, h('span', { text: label }), sw);
}
function volumeRow() {
  const r = h('input', { type: 'range', class: 'range', min: 0, max: 100, step: 5, 'aria-label': 'Jumpscare ses düzeyi' });
  r.value = Math.round(settings.scareVolume * 100);
  r.oninput = () => { settings.scareVolume = r.value / 100; saveSettings(); };
  return h('div', { class: 'setting' }, h('span', { text: 'Jumpscare ses düzeyi' }), r);
}
function openSettings() {
  const segBtns = SPEEDS.map((sp) => h('button', { 'aria-pressed': String(settings.speed === sp.v), text: sp.t, onclick: () => {
    settings.speed = sp.v; saveSettings(); segBtns.forEach((b, i) => b.setAttribute('aria-pressed', String(SPEEDS[i].v === sp.v)));
  } }));
  const extra = [];
  if (snap && snap.phase !== 'LOBBY' && snap.me?.isHost) {
    extra.push(h('p', { class: 'eyebrow', style: 'margin-top:20px', text: 'Ev sahibi' }));
    if (snap.phase !== 'FINISHED') extra.push(h('button', { class: 'btn', onclick: () => { act('pause', { paused: !snap.paused }); close(); }, text: snap.paused ? 'Devam et' : 'Oyunu duraklat' }));
    extra.push(h('button', { class: 'btn ghost', onclick: () => { if (confirm('Bu oyunu bitirip herkesi lobiye döndürmek istiyor musun? İlerleme kaybolur.')) { act('returnToLobby'); close(); } }, text: 'Oyunu bitir, lobiye dön' }));
  }
  const close = sheet('Ayarlar',
    h('div', { class: 'setting' }, h('span', { text: 'Daktilo hızı' }), h('div', { class: 'seg' }, segBtns)),
    toggle('Hareketi azalt (metin bir anda görünür)', 'reduceMotion'),
    toggle('Ses (rüzgâr, daktilo)', 'sound'),
    toggle('Titreşim', 'vibrate'),
    isSS() ? [h('p', { class: 'eyebrow', style: 'margin-top:20px', text: 'Son Sefer · ölüm efektleri' }), toggle('Jumpscare görseli', 'scare'), toggle('Jumpscare sesi', 'scareSound'), volumeRow()] : null,
    ...extra,
    snap?.me ? h('p', { class: 'note', text: `Sen: ${snap.me.name}` }) : null,
  );
}
async function openNotes() {
  const body = h('div', {}, h('p', { class: 'small', text: 'Yükleniyor…' }));
  sheet('Gecenin notları', body);
  const r = await req('notes');
  if (!r.ok) { body.replaceChildren(h('p', { class: 'small', text: r.error })); return; }
  if (!r.notes.length) { body.replaceChildren(h('p', { class: 'small', text: 'Henüz geride bıraktığınız bir sayfa yok.' })); return; }
  body.replaceChildren(...r.notes.map((n) => h('div', { class: 'noteblock' },
    h('h4', { text: n.kind === 'scene' ? n.title : `${n.title} · karar` }),
    n.kind === 'result' ? h('div', { class: 'chosen' }, n.label) : null,
    n.reminder ? h('p', { text: n.reminder, style: 'font-style:italic' }) : null,
    n.paragraphs.map((p) => h('p', { text: p })),
    n.contribution ? h('p', { text: n.contribution }) : null,
  )));
}

document.addEventListener('visibilitychange', () => { if (!document.hidden && ws?.readyState === 1 && snap) ws.send(JSON.stringify({ type: 'snapshot' })); });
render();
connect();
