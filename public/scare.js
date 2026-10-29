// SON SEFER — jumpscare katmanı. Yalnız ölen oyuncunun cihazında, sunucudan gelen kişisel olayla çalışır.
// Akış: ekran kararır → "virüs" girişi (karınca, yırtılma, bozuk yazı) → HIT anında yüz + vuruş → kararma → ölüm kartı.
// Hızlı beyaz flaş yoktur; parazit koyu tonlarda tutulur.

export const SCARE_HIT = 1.3; // saniye — tools/make-sounds.py içindeki HIT ile aynı
const FACE_MS = 950;
const OUT_MS = 260;

const VARIANTS = {
  JS01: { tint: [40, 115, 135], mode: 'wave', text: ['SU SEVİYESİ', '▒▒▒▒▒▒▒', 'NEFES YOK'] },
  JS02: { tint: [150, 55, 30], mode: 'stutter', text: ['MOTOR ARIZASI', 'ERR 0x02', 'PERVANE ▓▓▓'] },
  JS03: { tint: [120, 95, 60], mode: 'slide', text: ['KAPI AÇIK', 'KAPI AÇIK', 'K█PI ███K'] },
  JS04: { tint: [150, 190, 210], mode: 'shatter', text: ['CAM ÇATLADI', 'DIŞARIDAN AÇILMAZ', '░░░░░'] },
  JS05: { tint: [25, 80, 90], mode: 'roll', text: ['FİLİKA DOLU', 'BİR KİŞİ FAZLA', '▒▒▒'] },
  JS06: { tint: [160, 115, 40], mode: 'tunnel', text: ['HAVA YOK', 'İÇERİDE BİRİ VAR', '▓▓▓▓'] },
  JS07: { tint: [60, 170, 85], mode: 'scan', text: ['ÇAĞRI ALINDI', 'ÇAĞRI ALINMADI', 'KANAL 16 ▒▒'] },
  JS08: { tint: [205, 170, 90], mode: 'flare', text: ['IŞIĞA BAKMA', 'MERCEK AÇIK', '◯◯◯'] },
};

const media = { images: {}, buffers: {}, loading: {} };
const urlFor = (key, ext) => `/media/son-sefer/${key.toLowerCase()}.${ext}`;

/** Görselleri ve sesleri önceden yükler (ölüm olmadan hiçbir şey gösterilmez/çalınmaz). */
export function preloadScares(ctx) {
  for (const key of Object.keys(VARIANTS)) {
    if (!media.images[key]) { const im = new Image(); im.decoding = 'async'; im.src = urlFor(key, 'webp'); media.images[key] = im; }
    if (ctx && !media.buffers[key] && !media.loading[key]) {
      media.loading[key] = fetch(urlFor(key, 'mp3'))
        .then((r) => r.arrayBuffer())
        .then((b) => new Promise((res, rej) => ctx.decodeAudioData(b, res, rej)))
        .then((buf) => { media.buffers[key] = buf; })
        .catch(() => { media.loading[key] = null; });
    }
  }
}

/**
 * Jumpscare'i oynatır. opts: { ctx, sound:boolean, volume:0..1, vibrate:boolean, reduceMotion:boolean }
 * Bittiğinde (veya dokunarak geçildiğinde) onDone çağrılır.
 */
export function playScare(key, opts, onDone) {
  const v = VARIANTS[key] || VARIANTS.JS01;
  const [tr, tg, tb] = v.tint;
  let finished = false, raf = 0, src = null;
  const timers = [];

  const root = document.createElement('div');
  root.className = `scare scare-${v.mode}`;
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
  const im = media.images[key] || Object.assign(new Image(), { src: urlFor(key, 'webp') });
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
  if (opts.sound && opts.ctx && media.buffers[key]) {
    try {
      const c = opts.ctx;
      src = c.createBufferSource();
      src.buffer = media.buffers[key];
      const gain = c.createGain();
      gain.gain.value = Math.max(0, Math.min(1, opts.volume ?? 0.45));
      src.connect(gain).connect(c.destination);
      src.start();
    } catch { src = null; }
  }

  let lastNoise = 0, lastBars = 0;
  function frame(now) {
    if (finished) return;
    const e = (now - t0) / 1000;
    const pre = now < hitAt;
    // karınca: koyu, renklendirilmiş parazit (~24 fps)
    if (now - lastNoise > 42) {
      lastNoise = now;
      const d = img.data;
      const amp = pre ? 40 + 70 * Math.min(1, e / SCARE_HIT) : 55;
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
        if (moveBars && Math.random() < (pre ? 0.5 : 0.25)) {
          bar.style.top = `${Math.random() * 100}%`;
          bar.style.height = `${2 + Math.random() * (v.mode === 'stutter' ? 14 : 6)}%`;
          const dx = (Math.random() - 0.5) * (v.mode === 'shatter' ? 60 : 30);
          bar.style.transform = `translateX(${dx}px)`;
          bar.style.opacity = String(0.12 + Math.random() * 0.25);
        }
      }
      // bozuk yazı
      if (pre && Math.random() < 0.35) {
        const line = v.text[Math.floor(Math.random() * v.text.length)];
        txt.textContent = corrupt(line, Math.min(0.6, e / SCARE_HIT));
        txt.style.transform = `translate(${(Math.random() - 0.5) * 14}px, ${(Math.random() - 0.5) * 10}px)`;
      }
    }
    if (!pre && !root.classList.contains('hit')) {
      root.classList.add('hit');
      txt.textContent = '';
      if (opts.vibrate && navigator.vibrate) navigator.vibrate([90, 40, 180]);
    }
    if (!pre) {
      const k = (now - hitAt) / FACE_MS;
      if (!opts.reduceMotion) {
        const shake = Math.max(0, 1 - k) * 9;
        face.style.transform = `translate(${(Math.random() - 0.5) * shake}px, ${(Math.random() - 0.5) * shake}px) scale(${1.14 - 0.12 * Math.min(1, k * 1.6)})`;
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
    if (finished) return;
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
