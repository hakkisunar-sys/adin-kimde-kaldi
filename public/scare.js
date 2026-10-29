// SON SEFER — jumpscare katmanı. Yalnız ölen oyuncunun cihazında, sunucudan gelen kişisel olayla çalışır.
// Akış (≈6,5 sn):
//   0.0–2.6 sn  ekran kararır, karınca yavaşça belirir ve yükselir
//   2.6–3.6 sn  bozulma hızlanır: yırtılmalar, bozuk yazı, bir anlık silik yüz
//   3.6 sn      yüz tam ekran + vuruş + çığlık; yaklaşık 2,6 sn kalır, sonra kararır
// Hızlı beyaz flaş yoktur; parazit koyu tonlarda tutulur.

export const SCARE_HIT = 3.6;   // saniye — tools/make-sounds.py içindeki HIT ile aynı
const STATIC_D = 2.6;          // yavaş karıncalanma
const FACE_MS = 2600;
const OUT_MS = 420;

const VARIANTS_SON_SEFER = {
  JS01: { tint: [40, 115, 135], mode: 'wave', text: ['SU SEVİYESİ', '▒▒▒▒▒▒▒', 'NEFES YOK'] },
  JS02: { tint: [150, 55, 30], mode: 'stutter', text: ['MOTOR ARIZASI', 'ERR 0x02', 'PERVANE ▓▓▓'] },
  JS03: { tint: [120, 95, 60], mode: 'slide', text: ['KAPI AÇIK', 'KAPI AÇIK', 'K█PI ███K'] },
  JS04: { tint: [150, 190, 210], mode: 'shatter', text: ['CAM ÇATLADI', 'DIŞARIDAN AÇILMAZ', '░░░░░'] },
  JS05: { tint: [25, 80, 90], mode: 'roll', text: ['FİLİKA DOLU', 'BİR KİŞİ FAZLA', '▒▒▒'] },
  JS06: { tint: [160, 115, 40], mode: 'tunnel', text: ['HAVA YOK', 'İÇERİDE BİRİ VAR', '▓▓▓▓'] },
  JS07: { tint: [60, 170, 85], mode: 'scan', text: ['ÇAĞRI ALINDI', 'ÇAĞRI ALINMADI', 'KANAL 16 ▒▒'] },
  JS08: { tint: [205, 170, 90], mode: 'flare', text: ['IŞIĞA BAKMA', 'MERCEK AÇIK', '◯◯◯'] },
};

const VARIANTS_SON_MISAFIRLER = {
  JS01: { tint: [175, 150, 140], mode: 'slide', text: ['ÜST KAT TADİLATTA', 'O BENİM ANNEM DEĞİL', 'AÇIN ARTIK'] },
  JS02: { tint: [40, 115, 160], mode: 'wave', text: ['ADINI SÖYLE', 'SU ÇOK SAKİN', '▒▒▒▒'] },
  JS03: { tint: [150, 125, 90], mode: 'stutter', text: ['FAZLADAN YATAK', 'BİR KİŞİ DAHA', 'SEN DEĞİLSİN'] },
  JS04: { tint: [160, 120, 110], mode: 'shatter', text: ['AÇSANA', 'AÇSANA', 'A Ç S A N A'] },
  JS05: { tint: [165, 195, 205], mode: 'roll', text: ['CAMI KIRMAYIN', 'ARKANA BAKMA', '░░░░'] },
  JS06: { tint: [120, 145, 95], mode: 'scan', text: ['ANAHTARI UNUTTUNUZ', 'CAMI AÇIN', '▓▓▓'] },
  JS07: { tint: [195, 155, 95], mode: 'flare', text: ['GÜLÜMSEYİN', 'OTURMAK FOTOĞRAFA GİRMEKTİR', '◯'] },
  JS08: { tint: [115, 100, 140], mode: 'tunnel', text: ['YUKARI BAKMA', 'TAVANDA', '▒▒▒'] },
};
const STORY_MEDIA = {
  son_sefer: { dir: 'son-sefer', variants: VARIANTS_SON_SEFER, vibrate: [90, 40, 180] },
  son_misafirler: { dir: 'son-misafirler', variants: VARIANTS_SON_MISAFIRLER, vibrate: [250, 80, 400, 80, 700] },
};
const cfg = (story) => STORY_MEDIA[story] || STORY_MEDIA.son_sefer;

const media = { images: {}, buffers: {}, loading: {} };
const urlFor = (story, key, ext) => `/media/${cfg(story).dir}/${key.toLowerCase()}.${ext}`;
const mkey = (story, key) => `${story}:${key}`;

/** Görselleri ve sesleri önceden yükler (ölüm olmadan hiçbir şey gösterilmez/çalınmaz). */
export function preloadScares(ctx, story = 'son_sefer') {
  for (const key of Object.keys(cfg(story).variants)) {
    const k = mkey(story, key);
    if (!media.images[k]) { const im = new Image(); im.decoding = 'async'; im.src = urlFor(story, key, 'webp'); media.images[k] = im; }
    if (ctx && !media.buffers[k] && !media.loading[k]) {
      media.loading[k] = fetch(urlFor(story, key, 'mp3'))
        .then((r) => r.arrayBuffer())
        .then((b) => new Promise((res, rej) => ctx.decodeAudioData(b, res, rej)))
        .then((buf) => { media.buffers[k] = buf; })
        .catch(() => { media.loading[k] = null; });
    }
  }
}

/** Lobideki "Sesi dene": kısa ve yüksek bir parazit patlaması — telefon sesini ayarlamak için. */
export function testBlast(ctx, volume = 0.85) {
  if (!ctx) return false;
  const len = Math.floor(ctx.sampleRate * 0.7);
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.min(1, i / 400) * Math.min(1, (len - i) / 4000);
  const src = ctx.createBufferSource(); src.buffer = buf;
  const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 2200; f.Q.value = 0.4;
  const g = ctx.createGain(); g.gain.value = Math.max(0, Math.min(1, volume));
  src.connect(f).connect(g).connect(ctx.destination); src.start();
  return true;
}

/**
 * Jumpscare'i oynatır. opts: { ctx, sound:boolean, volume:0..1, vibrate:boolean, reduceMotion:boolean }
 * Bittiğinde (veya dokunarak geçildiğinde) onDone çağrılır.
 */
export function playScare(key, opts, onDone) {
  const story = opts.story || 'son_sefer';
  const C = cfg(story);
  const v = C.variants[key] || C.variants.JS01;
  const mk = mkey(story, key);
  const [tr, tg, tb] = v.tint;
  let finished = false, raf = 0, src = null;
  const timers = [];

  const root = document.createElement('div');
  root.className = `scare mode-${v.mode}`;
  root.setAttribute('role', 'alert');
  root.setAttribute('aria-label', 'Karakterin öldü');
  root.style.setProperty('--tint', `rgb(${tr},${tg},${tb})`);

  const canvas = document.createElement('canvas');
  canvas.className = 'scare-noise';
  canvas.width = 96; canvas.height = 170;
  const g = canvas.getContext('2d');
  const img = g.createImageData(canvas.width, canvas.height);

  const tears = document.createElement('div');
  tears.className = 'scare-tears';
  for (let i = 0; i < 7; i++) tears.append(document.createElement('i'));

  const txt = document.createElement('div');
  txt.className = 'scare-text';

  const face = document.createElement('div');
  face.className = 'scare-face';
  const im = media.images[mk] || Object.assign(new Image(), { src: urlFor(story, key, 'webp') });
  for (const cls of ['r', 'c', 'm']) {
    const layer = document.createElement('div');
    layer.className = 'scare-layer ' + cls;
    layer.style.backgroundImage = `url("${im.src}")`;
    face.append(layer);
  }
  const scan = document.createElement('div');
  scan.className = 'scare-scan';
  root.append(face, canvas, tears, txt, scan);
  document.body.append(root);

  const t0 = performance.now();
  const hitAt = t0 + SCARE_HIT * 1000;

  // ses: tek kaynak, HIT'e kadar giriş + vuruş aynı dosyada
  if (opts.sound && opts.ctx && media.buffers[mk]) {
    try {
      const c = opts.ctx;
      src = c.createBufferSource();
      src.buffer = media.buffers[mk];
      const gain = c.createGain();
      gain.gain.value = Math.max(0, Math.min(1, opts.volume ?? 0.85));
      src.connect(gain).connect(c.destination);
      src.start();
    } catch { src = null; }
  }

  let lastNoise = 0, lastBars = 0, ghosted = false;
  function frame(now) {
    if (finished) return;
    const e = (now - t0) / 1000;
    const pre = now < hitAt;
    const slow = e < STATIC_D;                             // yavaş karıncalanma evresi
    const rise = Math.min(1, e / STATIC_D);
    if (pre) canvas.style.opacity = String(slow ? 0.05 + 0.8 * rise ** 1.3 : 0.85);
    // bir anlık silik yüz (bozulma evresinin ortasında, düşük opaklık — flaş değil)
    if (!ghosted && e > STATIC_D + 0.45) { ghosted = true; face.classList.add('ghosting'); timers.push(setTimeout(() => face.classList.remove('ghosting'), 140)); }
    // karınca: koyu, renklendirilmiş parazit (~24 fps)
    if (now - lastNoise > 42) {
      lastNoise = now;
      const d = img.data;
      const amp = pre ? (slow ? 30 + 50 * rise : 80 + 40 * Math.min(1, (e - STATIC_D) / (SCARE_HIT - STATIC_D))) : 55;
      const band = v.mode === 'scan' ? Math.floor((e * 90) % canvas.height) : -1;
      for (let y = 0; y < canvas.height; y++) {
        const rowBoost = y === band || y === band + 1 ? 1.6 : 1;
        const rowShift = v.mode === 'roll' ? Math.sin((y + e * 60) * 0.12) * 0.4 + 0.8 : 1;
        for (let x = 0; x < canvas.width; x++) {
          const n = Math.random() * amp * rowBoost * rowShift;
          const i = (y * canvas.width + x) * 4;
          d[i] = (n * tr) / 160; d[i + 1] = (n * tg) / 160; d[i + 2] = (n * tb) / 160; d[i + 3] = 255;
        }
      }
      g.putImageData(img, 0, 0);
      // yırtılma çubukları — saniyede en fazla ~8 kez yer değiştirir (hızlı titreme yok)
      const moveBars = now - lastBars > 120;
      if (moveBars) lastBars = now;
      for (const bar of tears.children) {
        if (moveBars && Math.random() < (pre ? (slow ? 0.08 + 0.25 * rise : 0.6) : 0.25)) {
          bar.style.top = `${Math.random() * 100}%`;
          bar.style.height = `${2 + Math.random() * (v.mode === 'stutter' ? 14 : 6)}%`;
          const dx = (Math.random() - 0.5) * (v.mode === 'shatter' ? 60 : 30);
          bar.style.transform = `translateX(${dx}px)`;
          bar.style.opacity = String(0.12 + Math.random() * 0.25);
        }
      }
      // bozuk yazı — karıncalanmanın sonlarına doğru belirir
      if (pre && e > 1.4 && Math.random() < (slow ? 0.12 : 0.4)) {
        const line = v.text[Math.floor(Math.random() * v.text.length)];
        txt.style.opacity = String(slow ? 0.35 : 1);
        txt.textContent = corrupt(line, slow ? 0.15 : Math.min(0.65, (e - STATIC_D) * 0.8 + 0.2));
        txt.style.transform = `translate(${(Math.random() - 0.5) * 14}px, ${(Math.random() - 0.5) * 10}px)`;
      }
    }
    if (!pre && !root.classList.contains('hit')) {
      root.classList.add('hit');
      canvas.style.opacity = '';
      txt.textContent = '';
      if (opts.vibrate && navigator.vibrate) navigator.vibrate(C.vibrate);
    }
    if (!pre) {
      const k = (now - hitAt) / FACE_MS;
      if (!opts.reduceMotion) {
        // ilk an sert sarsıntı, sonra yüz yavaşça üstüne gelir
        const shake = Math.max(0, 1 - k * 3) * 11 + 1.2;
        const zoom = 1.16 - 0.1 * Math.min(1, k * 8) + 0.12 * k;
        face.style.transform = `translate(${(Math.random() - 0.5) * shake}px, ${(Math.random() - 0.5) * shake}px) scale(${zoom})`;
      }
      if (k >= 1) return end();
    }
    raf = requestAnimationFrame(frame);
  }

  function end() {
    if (finished) return;
    finished = true;
    cancelAnimationFrame(raf);
    root.classList.add('out');
    timers.push(setTimeout(() => { root.remove(); onDone?.(); }, OUT_MS));
  }
  function skip() {
    if (finished || performance.now() - t0 < 1000) return; // oy düğmesine son dokunuş yanlışlıkla geçirmesin
    try { src?.stop(); } catch {}
    end();
  }
  root.addEventListener('pointerdown', skip);
  requestAnimationFrame(() => root.classList.add('on'));
  raf = requestAnimationFrame(frame);
  return { skip };
}

function corrupt(s, amount) {
  const glyphs = '▓▒░█▌▐#%&§¤';
  return [...s].map((ch) => (ch !== ' ' && Math.random() < amount ? glyphs[Math.floor(Math.random() * glyphs.length)] : ch)).join('');
}
