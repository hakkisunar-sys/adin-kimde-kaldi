"""SON SEFER — 8 jumpscare sesini sıfırdan sentezler (dış kayıt yok, telifsiz).

Her ses iki bölümden oluşur:
  0.00 – HIT   : "virüs" girişi — kendine özgü hışırtı / karınca / bozulma
  HIT  – son   : yüzün belirdiği an — darbe + çığlık/kükreme dokusu + kuyruk
İstemci görseli tam HIT anında açar (public/app.js → SCARE_HIT).

Çalıştır:  python3 tools/make-sounds.py   (numpy + scipy + ffmpeg gerekir)
Çıktı:     public/media/son-sefer/js01.mp3 … js08.mp3
"""
import os, subprocess, sys, tempfile, wave
import numpy as np
from scipy.signal import lfilter

SR = 44100
HIT = 1.30          # saniye — istemcideki SCARE_HIT ile aynı olmalı
TOTAL = 3.2
OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'media', 'son-sefer')
rng = np.random.default_rng(1967)

t_all = np.arange(int(SR * TOTAL)) / SR


def seg(dur):
    return np.arange(int(SR * dur)) / SR


def noise(n):
    return rng.standard_normal(n)


def onepole_lp(x, fc):
    a = np.exp(-2 * np.pi * fc / SR)
    return lfilter([1 - a], [1, -a], x)


def lp(x, fc, order=2):
    for _ in range(order):
        x = onepole_lp(x, fc)
    return x


def hp(x, fc):
    return x - lp(x, fc, 1)


def bp(x, lo, hi):
    return hp(lp(x, hi), lo)


def sweep_bp(x, f0, f1, q=6.0):
    """Zamanla kayan dar bant (state-variable filtre)."""
    n = len(x)
    f = np.geomspace(f0, f1, n)
    low = band = 0.0
    y = np.empty(n)
    for i in range(n):
        g = 2 * np.sin(np.pi * min(f[i], SR / 6) / SR)
        high = x[i] - low - band / q
        band += g * high
        low += g * band
        y[i] = band
    return y


def env(n, a, d, curve=3.0):
    t = np.arange(n) / SR
    att = np.clip(t / max(a, 1e-4), 0, 1)
    dec = np.exp(-curve * np.clip(t - a, 0, None) / max(d, 1e-4))
    return att * dec


def saw(freq):
    ph = np.cumsum(freq) / SR
    return 2 * (ph % 1) - 1


def sine(freq):
    return np.sin(2 * np.pi * np.cumsum(freq) / SR)


def crush(x, bits=5, hold=6):
    q = np.round(x * 2 ** bits) / 2 ** bits
    return np.repeat(q[::hold], hold)[: len(x)]


def stutter(x, rate, duty=0.55, jitter=0.0):
    t = np.arange(len(x)) / SR
    ph = (t * rate + jitter * np.sin(t * 13.1)) % 1
    return x * (ph < duty)


def rev(x, decay=1.2, mix=0.35):
    """Kısa, basit yankı (birkaç gecikme hattı)."""
    y = x.copy()
    for d, g in [(0.029, 0.55), (0.037, 0.5), (0.053, 0.42), (0.071, 0.36), (0.097, 0.3), (0.131, 0.22)]:
        k = int(d * SR)
        g = g * np.exp(-d / decay)
        z = np.zeros_like(x)
        z[k:] = x[:-k] * g
        y += z
    return (1 - mix) * x + mix * lp(y, 3500, 1)


def softclip(x, drive=1.0):
    return np.tanh(x * drive) / np.tanh(drive)


def place(buf, x, at):
    i = int(at * SR)
    j = min(len(buf), i + len(x))
    buf[i:j] += x[: j - i]


def norm(x, db):
    p = np.max(np.abs(x)) + 1e-9
    return x / p * 10 ** (db / 20)


def fade_in(n, dur):
    return np.clip(np.arange(n) / (SR * dur), 0, 1)


# ---------------------------------------------------------------- girişler
def intro_underwater(n):            # JS01 — boğuk su altı paraziti, kabarcıklar
    x = lp(noise(n), 500) * (0.6 + 0.4 * np.sin(2 * np.pi * 0.9 * np.arange(n) / SR))
    for _ in range(26):                                  # kabarcık "blup"ları
        at = rng.uniform(0.05, HIT - 0.1); d = rng.uniform(0.03, 0.08)
        s = seg(d); f = rng.uniform(280, 700) * (1 + 3 * s / d)
        place(x, 0.5 * sine(f) * env(len(s), 0.003, d * 0.6), at)
    return x


def intro_engine(n):                # JS02 — tekleyen motor, kırık dijital hışırtı
    x = crush(bp(noise(n), 200, 3000), bits=4, hold=9)
    x = stutter(x, 7.5, 0.5, jitter=0.4)
    t = np.arange(n) / SR
    x += 0.5 * saw(np.full(n, 46.0) * (1 + 0.08 * np.sin(2 * np.pi * 3 * t))) * stutter(np.ones(n), 7.5, 0.5, 0.4)
    return x


def intro_door(n):                  # JS03 — gıcırdayan kapı + kuru hışırtı
    t = np.arange(n) / SR
    f = 170 + 60 * np.sin(2 * np.pi * 0.7 * t) + 25 * noise(n).cumsum() / np.sqrt(n)
    creak = saw(f) * (0.5 + 0.5 * (rng.random(n) > 0.35))  # sürtünme kesikleri
    creak = bp(creak, 300, 2500)
    return 0.7 * creak + 0.35 * hp(noise(n), 3000)


def intro_glass(n):                 # JS04 — ince cam çınlaması, soğuk tiz parazit
    t = np.arange(n) / SR
    ring = 0.35 * (np.sin(2 * np.pi * 2793 * t) + np.sin(2 * np.pi * 2801 * t)) * (0.4 + 0.6 * t / HIT)
    return ring + 0.6 * hp(noise(n), 5000) * (0.5 + 0.5 * np.sin(2 * np.pi * 5.2 * t) ** 2)


def intro_waves(n):                 # JS05 — kabaran dalgalar, bordaya vuran su
    t = np.arange(n) / SR
    sw = 0.35 + 0.65 * np.clip(np.sin(2 * np.pi * 0.55 * t - 1.2), 0, None) ** 2
    x = lp(noise(n), 900) * sw
    x += 0.5 * lp(noise(n), 120) * (0.5 + 0.5 * t / HIT)
    return x


def intro_vent(n):                  # JS06 — dar tünelde hızlanan tıkırtılar
    x = 0.25 * bp(noise(n), 1800, 2600)
    at = 0.05
    gap = 0.22
    while at < HIT - 0.02:
        place(x, hp(noise(int(SR * 0.006)), 2000) * 1.4, at)
        at += gap
        gap = max(0.035, gap * 0.86)
    return x


def intro_radio(n):                 # JS07 — telsiz paraziti, kesik mors bipleri
    t = np.arange(n) / SR
    x = bp(noise(n), 400, 3200) * (0.7 + 0.3 * (rng.random(n) > 0.02))
    x = crush(x, bits=6, hold=3)
    beeps = np.zeros(n)
    for i, (a, d) in enumerate([(0.15, 0.06), (0.25, 0.06), (0.35, 0.18), (0.62, 0.06), (0.72, 0.18), (0.98, 0.05)]):
        s = seg(d)
        place(beeps, 0.6 * np.sign(np.sin(2 * np.pi * 1020 * s)) * env(len(s), 0.002, d), a)
    squelch = stutter(np.ones(n), 3.1, 0.82)
    return (0.6 * x + bp(beeps, 300, 3000)) * squelch


def intro_lens(n):                  # JS08 — elektrik uğultusu, titreyen lamba çıtırtısı
    t = np.arange(n) / SR
    hum = 0.5 * np.sin(2 * np.pi * 50 * t) + 0.3 * np.sin(2 * np.pi * 100 * t) + 0.2 * np.sign(np.sin(2 * np.pi * 150 * t))
    crackle = (rng.random(n) > 0.9985) * noise(n) * 3
    buzz = bp(noise(n), 900, 4000) * (rng.random(n) > 0.5)
    flick = 0.5 + 0.5 * (np.sin(2 * np.pi * 11 * t) > 0.3)
    return (0.45 * hum + 0.25 * buzz) * flick + hp(crackle, 1500)


# ---------------------------------------------------------------- vuruşlar
def hit_js01(d):   # ıslak düşük darbe + yükselen metalik çığlık + su altı kuyruğu
    n = int(SR * d); s = np.arange(n) / SR
    thud = sine(55 * np.exp(-s * 3) + 30) * env(n, 0.002, 0.25)
    splash = lp(noise(n), 1500) * env(n, 0.002, 0.18)
    f = 520 * (1 + 2.6 * np.clip(s / 0.55, 0, 1))
    scr = saw(f * (1 + 0.012 * np.sin(2 * np.pi * 7 * s))) + 0.6 * saw(f * 1.5)
    scr = bp(scr, 700, 4200) * env(n, 0.03, 0.55, 2.5)
    tail = lp(scr + splash, 600) * env(n, 0.2, 1.4, 2)
    return 1.3 * thud + 0.7 * splash + 0.55 * scr + 0.5 * tail


def hit_js02(d):   # zincir darbesi + geriye emilen nefes + kısa bas
    n = int(SR * d); s = np.arange(n) / SR
    clank = sum(np.sin(2 * np.pi * f * s) * env(n, 0.001, 0.12 + 0.05 * k) for k, f in enumerate([523, 1187, 1843, 2911, 4120]))
    rattle = hp(noise(n), 2500) * stutter(np.ones(n), 23, 0.3) * env(n, 0.001, 0.3)
    br = bp(noise(n), 500, 2500)
    breath = br * np.clip((0.75 - s) / 0.75, 0, 1) ** 0.5 * (s < 0.75)
    breath = breath[::-1] * 0 + br * np.clip(s / 0.7, 0, 1) ** 3 * (s < 0.7)   # içe çekilen nefes
    bass = sine(np.full(n, 41.0)) * env(n, 0.005, 0.6)
    return 0.8 * clank + 0.6 * rattle + 0.5 * breath + 1.1 * bass


def hit_js03(d):   # tahta-demir çarpması + iki katmanlı pürüzlü tiz stinger, ani kesiliş
    n = int(SR * d); s = np.arange(n) / SR
    slam = lp(noise(n), 2200) * env(n, 0.001, 0.12) + sine(np.full(n, 88.0)) * env(n, 0.001, 0.2)
    iron = sum(np.sin(2 * np.pi * f * s) * env(n, 0.001, 0.25) for f in [312, 741, 1320])
    st = saw(np.full(n, 1180.0)) + saw(np.full(n, 1253.0)) + 0.5 * saw(np.full(n, 1777.0))
    st = st * (0.6 + 0.4 * np.sign(np.sin(2 * np.pi * 31 * s)))
    st = bp(st, 900, 6000) * env(n, 0.01, 0.9, 1.2) * (s < 0.85)          # ani kesiliş
    return 1.1 * slam + 0.5 * iron + 0.5 * st


def hit_js04(d):   # cam çınlaması + su sıçraması + kısa yüksek rezonans
    n = int(SR * d); s = np.arange(n) / SR
    shards = np.zeros(n)
    for _ in range(40):
        at = rng.uniform(0, 0.35); f = rng.uniform(2500, 9000); dd = rng.uniform(0.03, 0.12)
        k = seg(dd); place(shards, np.sin(2 * np.pi * f * k) * env(len(k), 0.0005, dd), at)
    crack = hp(noise(n), 3000) * env(n, 0.0005, 0.08)
    splash = bp(noise(n), 400, 5000) * env(n, 0.01, 0.4)
    res = (np.sin(2 * np.pi * 3150 * s) + 0.5 * np.sin(2 * np.pi * 4730 * s)) * env(n, 0.002, 0.7, 2)
    return 0.6 * shards + 1.0 * crack + 0.6 * splash + 0.45 * res


def hit_js05(d):   # kuvvetli su vuruşu + alçaktan yükselen yaratık kükremesi
    n = int(SR * d); s = np.arange(n) / SR
    slap = lp(noise(n), 1200) * env(n, 0.001, 0.22) + sine(48 * np.exp(-s * 4) + 28) * env(n, 0.002, 0.4)
    f = 62 + 150 * np.clip(s / 0.9, 0, 1) ** 1.5
    roar = saw(f) + 0.7 * saw(f * 1.007) + 0.4 * saw(f * 2.01)
    roar = roar * (0.65 + 0.35 * np.sin(2 * np.pi * 29 * s))            # hırıltı
    roar = softclip(lp(roar, 1400), 3) * env(n, 0.12, 1.2, 1.8)
    return 1.2 * slap + 0.9 * roar + 0.3 * lp(noise(n), 400) * env(n, 0.1, 1.3)


def hit_js06(d):   # metal sürtünmesi + kuru tıkırtı + çok kısa boğuk feryat
    n = int(SR * d); s = np.arange(n) / SR
    scrape = sweep_bp(noise(n), 3500, 700, q=9) * env(n, 0.01, 0.8, 1.8)
    ticks = np.zeros(n)
    for k in range(9):
        place(ticks, hp(noise(int(SR * 0.004)), 2500) * 1.5, 0.02 + k * 0.045)
    f = 300 + 400 * np.sin(np.pi * np.clip(s / 0.5, 0, 1))
    wail = lp(saw(f) + 0.5 * saw(f * 2.02), 900) * env(n, 0.04, 0.45, 2) * (s < 0.6)
    return 0.9 * scrape + 0.7 * ticks + 0.6 * wail + 0.6 * sine(np.full(n, 60.0)) * env(n, 0.002, 0.3)


def hit_js07(d):   # röle klik + kesik rezonanslı çığlık (telsiz filtresi) + parazit
    n = int(SR * d); s = np.arange(n) / SR
    click = np.zeros(n); place(click, np.array([1.0, -0.8, 0.6, -0.3]) * 1.5, 0.0)
    f = 900 + 500 * np.clip(s / 0.4, 0, 1)
    scream = saw(f * (1 + 0.02 * np.sin(2 * np.pi * 9 * s))) * np.sin(2 * np.pi * 137 * s)  # halka mod.
    scream = bp(scream, 350, 3000) * stutter(np.ones(n), 14, 0.7) * env(n, 0.01, 0.9, 1.6)
    burst = crush(bp(noise(n), 400, 3500), 4, 5) * env(n, 0.001, 0.5)
    return 1.0 * click + 0.8 * scream + 0.6 * burst + 0.8 * sine(np.full(n, 52.0)) * env(n, 0.002, 0.25)


def hit_js08(d):   # cam rezonansı, kısacık ters yükseliş, geniş metalik korku darbesi
    n = int(SR * d); s = np.arange(n) / SR
    pre = int(SR * 0.0)
    boom = sum(np.sin(2 * np.pi * f * s) * env(n, 0.002, 1.1 - 0.1 * k, 2) for k, f in enumerate([73, 118.5, 187, 241, 403]))
    metal = sum(np.sin(2 * np.pi * f * s) * env(n, 0.001, 0.5) for f in [1033, 1471, 2219, 3307])
    hiss = hp(noise(n), 4000) * env(n, 0.001, 0.25)
    return 1.1 * boom + 0.5 * metal + 0.6 * hiss


def rise(dur, f0, f1, kind='glass'):
    """Vuruştan hemen önce gelen ters/yükselen kısa giriş."""
    n = int(SR * dur); s = np.arange(n) / SR
    f = np.geomspace(f0, f1, n)
    x = sine(f) + 0.4 * sine(f * 1.5) if kind == 'glass' else bp(noise(n), 300, 4000)
    return x * (s / dur) ** 2.5


DESIGNS = {
    'js01': (intro_underwater, hit_js01, None),
    'js02': (intro_engine, hit_js02, ('noise', 0.35)),
    'js03': (intro_door, hit_js03, None),
    'js04': (intro_glass, hit_js04, ('glass', 0.25)),
    'js05': (intro_waves, hit_js05, ('noise', 0.45)),
    'js06': (intro_vent, hit_js06, None),
    'js07': (intro_radio, hit_js07, None),
    'js08': (intro_lens, hit_js08, ('glass', 0.3)),
}


def build(key):
    intro_fn, hit_fn, pre = DESIGNS[key]
    out = np.zeros(int(SR * TOTAL))
    ni = int(SR * HIT)
    intro = intro_fn(ni)
    intro = norm(intro, -15) * fade_in(ni, 0.25) * (0.6 + 0.4 * np.arange(ni) / ni)   # giderek artan
    out[:ni] += intro
    if pre:
        kind, d = pre
        r = rise(d, 400 if kind == 'glass' else 200, 3500 if kind == 'glass' else 4000, kind)
        place(out, norm(r, -10), HIT - d)
    h = hit_fn(TOTAL - HIT)
    h = rev(h, 1.0, 0.3)
    h = norm(softclip(norm(h, 0), 1.6), -3)
    place(out, h, HIT)
    out = out * np.clip((TOTAL - t_all) / 0.15, 0, 1)                      # uçta yumuşak bitiş
    peak = np.max(np.abs(out))
    if peak > 10 ** (-3 / 20):
        out = out / peak * 10 ** (-3 / 20)
    return out


def write(key, x):
    os.makedirs(OUT, exist_ok=True)
    with tempfile.NamedTemporaryFile(suffix='.wav', delete=False) as f:
        tmp = f.name
    with wave.open(tmp, 'wb') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((np.clip(x, -1, 1) * 32767).astype('<i2').tobytes())
    dst = os.path.join(OUT, key + '.mp3')
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', tmp, '-ac', '1', '-b:a', '128k', dst], check=True)
    os.unlink(tmp)
    return dst


if __name__ == '__main__':
    keys = sys.argv[1:] or list(DESIGNS)
    for k in keys:
        x = build(k)
        print(write(k, x), f'{len(x)/SR:.2f}s')
