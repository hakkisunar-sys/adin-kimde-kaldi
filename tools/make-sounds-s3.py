"""SON MİSAFİRLER — 8 jumpscare sesi (sıfırdan sentez, dış kayıt yok). ÇOK YÜKSEK ve gür.

Zaman çizelgesi Son Sefer ile aynı (istemci SCARE_HIT = 3.6 sn):
  0.0 – 2.6 sn : karıncalanma — TV hışırtısı, Son Sefer'dekinden daha yüksek başlar
  2.6 – 3.6 sn : sahneye özgü sesler (kapı tıkırtısı, havuz, nefes, duvar tırmalama, damla, cama vurma, kamera, tavan)
  3.6 sn – son : vuruş + çığlık/bağırış; yoğun sıkıştırma ile sürekli tepe seviyede

Çalıştır:  python3 tools/make-sounds-s3.py   →  public/media/son-misafirler/js01.mp3 … js08.mp3
Ortak yardımcılar tools/make-sounds.py içinden alınır.
"""
import importlib.util, os, sys
import numpy as np

spec = importlib.util.spec_from_file_location('ms', os.path.join(os.path.dirname(__file__), 'make-sounds.py'))
ms = importlib.util.module_from_spec(spec); spec.loader.exec_module(ms)
from importlib import reload  # noqa
SR, HIT, STATIC_D, TOTAL = ms.SR, ms.HIT, ms.STATIC_D, ms.TOTAL
noise, lp, hp, bp, env, saw, sine, seg, place, norm, softclip, rev, crush, stutter = (
    ms.noise, ms.lp, ms.hp, ms.bp, ms.env, ms.saw, ms.sine, ms.seg, ms.place, ms.norm, ms.softclip, ms.rev, ms.crush, ms.stutter)
scream, VOWEL_A, VOWEL_E, VOWEL_O = ms.scream, ms.VOWEL_A, ms.VOWEL_E, ms.VOWEL_O
rng = np.random.default_rng(2026)
ms.OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'media', 'son-misafirler')


def knock(d=0.09, f=140, bright=1800):
    n = int(SR * d); s = np.arange(n) / SR
    return sine(np.full(n, f)) * env(n, 0.001, d * 0.5) + 0.6 * lp(noise(n), bright) * env(n, 0.0005, 0.03)


# ---------------------------------------------------------------- sahneye özgü girişler (1 sn)
def i_door(n):      # kilitli kapı: kol sarsılıyor, tırnak, üç vuruş
    x = np.zeros(n)
    for k in range(10):
        place(x, hp(noise(int(SR * 0.03)), 1500) * 0.6, 0.05 + k * 0.05)          # kol tıkırtısı
    for k, at in enumerate([0.62, 0.76, 0.9]):
        place(x, knock(0.1, 110, 1200) * (1 + 0.4 * k), at)
    return x + 0.2 * bp(noise(n), 2500, 5000) * np.linspace(0.2, 1, n)


def i_pool(n):      # havuz: su altı uğultusu, kabarcık
    return ms.intro_underwater(n) + 0.6 * lp(noise(n), 160) * np.linspace(0.3, 1, n)


def i_breath(n):    # yatak gıcırtısı ve çok yakın nefes
    t = np.arange(n) / SR
    breath = bp(noise(n), 300, 2400) * np.clip(np.sin(2 * np.pi * 1.6 * t), 0, None) ** 2
    f = 220 + 80 * np.sin(2 * np.pi * 0.9 * t)
    creak = bp(saw(f) * (rng.random(n) > 0.45), 400, 2200) * (t > 0.4) * 0.5
    return breath + creak


def i_wall(n):      # duvarın içinde tırmalama, kâğıt hışırtısı
    x = np.zeros(n); at = 0.02
    while at < n / SR - 0.05:
        d = rng.uniform(0.05, 0.12)
        place(x, ms.sweep_bp(noise(int(SR * d)), 4500, 1500, 5) * 1.2, at); at += d * rng.uniform(0.6, 1.1)
    return x + 0.3 * hp(noise(n), 6000) * (rng.random(n) > 0.6)


def i_drip(n):      # musluk, damlalar, camın inlemesi
    t = np.arange(n) / SR
    x = 0.35 * bp(noise(n), 1500, 6000)
    for k in range(7):
        s = seg(0.05); place(x, sine(1800 * np.exp(-s * 25) + 700) * env(len(s), 0.001, 0.04), 0.08 + k * 0.13)
    whine = 0.4 * (np.sin(2 * np.pi * 3100 * t) + np.sin(2 * np.pi * 3117 * t)) * np.linspace(0, 1, n) ** 2
    return x + whine


def i_window(n):    # cama tırnakla vurma, hızlanıyor
    x = 0.15 * lp(noise(n), 400); at = 0.04; gap = 0.2
    while at < n / SR - 0.02:
        s = seg(0.04)
        tap = (np.sin(2 * np.pi * 2300 * s) + 0.6 * np.sin(2 * np.pi * 3700 * s)) * env(len(s), 0.0005, 0.03)
        place(x, tap, at); at += gap; gap = max(0.05, gap * 0.82)
    return x


def i_camera(n):    # eski makine kurma sesi + akort dışı kutu müziği (özgün ezgi)
    t = np.arange(n) / SR
    x = np.zeros(n)
    for k in range(14): place(x, hp(noise(int(SR * 0.006)), 2500), 0.03 + k * 0.035)
    notes = [880, 1046, 988, 784, 830]
    for k, f in enumerate(notes):
        s = seg(0.28); d = f * (1 + 0.03 * np.sin(2 * np.pi * 5 * s))
        place(x, 0.6 * (sine(d) + 0.3 * sine(d * 2.76)) * env(len(s), 0.002, 0.25), 0.5 + k * 0.1)
    return x


def i_ceiling(n):   # tavanda ağır adımlar, uğultu
    t = np.arange(n) / SR
    x = 0.3 * (np.sin(2 * np.pi * 50 * t) + 0.5 * np.sign(np.sin(2 * np.pi * 100 * t))) * 0.5
    for at in [0.1, 0.35, 0.55, 0.72, 0.85, 0.95]:
        place(x, knock(0.15, 70, 600) * 1.2, at)
    return x + 0.4 * bp(saw(np.full(n, 160.0)) * (rng.random(n) > 0.5), 300, 1500) * (t > 0.5)


# ---------------------------------------------------------------- vuruşlar (1.6 sn)
def h_slam(d):      # kapı çarpması
    n = int(SR * d); s = np.arange(n) / SR
    return 1.4 * sine(70 * np.exp(-s * 3) + 35) * env(n, 0.001, 0.35) + lp(noise(n), 2500) * env(n, 0.0005, 0.12)


def h_splash(d):
    n = int(SR * d); s = np.arange(n) / SR
    return lp(noise(n), 1800) * env(n, 0.002, 0.3) + 1.2 * sine(50 * np.exp(-s * 3) + 30) * env(n, 0.002, 0.4)


def h_cluster(d):   # uyumsuz akor saplaması
    n = int(SR * d); s = np.arange(n) / SR
    x = sum(saw(np.full(n, f)) for f in [233, 247, 349, 370, 523]) * env(n, 0.003, 0.9, 1.5)
    return lp(x, 3500) + 1.2 * sine(np.full(n, 55.0)) * env(n, 0.001, 0.4)


def h_rip(d):       # duvar kâğıdı yırtılması
    n = int(SR * d)
    x = hp(noise(n), 1200) * (rng.random(n) > 0.3) * env(n, 0.001, 0.45, 2)
    return x + sine(np.full(n, 60.0)) * env(n, 0.001, 0.3)


def h_crack(d):     # ayna çatlaması
    return ms.hit_js04(d)


def h_bang(d):      # cama yumruk
    n = int(SR * d); s = np.arange(n) / SR
    rattle = sum(np.sin(2 * np.pi * f * s) * env(n, 0.001, 0.25) for f in [1650, 2480, 3310])
    return 1.3 * sine(90 * np.exp(-s * 5) + 45) * env(n, 0.001, 0.3) + 0.5 * rattle + lp(noise(n), 3000) * env(n, 0.0005, 0.08)


def h_flash(d):     # flaş patlaması + deklanşör
    n = int(SR * d); s = np.arange(n) / SR
    x = np.zeros(n)
    place(x, hp(noise(int(SR * 0.012)), 2000) * 2, 0.0); place(x, hp(noise(int(SR * 0.01)), 2500) * 1.5, 0.07)
    whine = sine(np.geomspace(6000, 400, n)) * env(n, 0.001, 0.5)                # kondansatör iniltisi
    return x + 0.4 * whine + sine(np.full(n, 48.0)) * env(n, 0.001, 0.35)


def h_drop(d):      # tavandan inen uğultu, düşen frekans
    n = int(SR * d); s = np.arange(n) / SR
    f = np.geomspace(900, 60, n)
    return softclip(saw(f) + saw(f * 1.01), 2) * env(n, 0.002, 1.2, 1.4) * 0.8 + sine(np.full(n, 40.0)) * env(n, 0.001, 0.6)


# ---------------------------------------------------------------- çığlıklar
def sc_mother(d):   # sahte anne: tiz, gülerek başlayan çığlık
    laugh = np.zeros(int(SR * d))
    for k in range(5):
        place(laugh, scream(0.09, 600, 700, 650, VOWEL_A, voices=1) * 0.8, k * 0.11)
    return laugh + np.concatenate([np.zeros(int(SR * 0.5)), scream(d - 0.5, 900, 1500, 1100, VOWEL_A, rough=0.35, voices=3)])[: len(laugh)]


def sc_drowned(d):
    return ms.scream_for('js01', d)


def sc_guest(d):    # erkek benzeri derin bağırış + tiz katman
    return scream(d, 170, 330, 160, VOWEL_A, rough=0.8, voices=2, vib=5) + 0.55 * scream(d, 640, 980, 600, VOWEL_E, voices=1)


def sc_wall(d):
    return scream(d, 820, 1350, 1000, VOWEL_E, rough=0.5, voices=3, detune=0.05)


def sc_mirror(d):
    return scream(d, 1050, 1700, 1250, VOWEL_E, rough=0.25, voices=2, vib=8)


def sc_caretaker(d):
    return scream(d, 210, 380, 190, VOWEL_O, rough=0.9, voices=2, vib=4.5, breath=0.3) + 0.4 * scream(d, 500, 760, 450, VOWEL_A, voices=1)


def sc_portrait(d):  # çok sesli aile korosu
    return scream(d, 700, 1200, 650, VOWEL_A, rough=0.3, voices=5, detune=0.06)


def sc_ceiling(d):   # tepeden aşağı kayan çığlık
    return scream(d, 1500, 1200, 300, VOWEL_A, rough=0.45, voices=2)


DESIGNS = {
    'js01': (i_door, h_slam, sc_mother),
    'js02': (i_pool, h_splash, sc_drowned),
    'js03': (i_breath, h_cluster, sc_guest),
    'js04': (i_wall, h_rip, sc_wall),
    'js05': (i_drip, h_crack, sc_mirror),
    'js06': (i_window, h_bang, sc_caretaker),
    'js07': (i_camera, h_flash, sc_portrait),
    'js08': (i_ceiling, h_drop, sc_ceiling),
}


def limiter(x, ceiling_db=-0.3, drive=3.2):
    """Gürlük için yoğun sıkıştırma: yumuşak doyum + tepe normalizasyonu."""
    y = softclip(x / (np.max(np.abs(x)) + 1e-9) * drive, 1.0)
    return norm(y, ceiling_db)


def build(key):
    intro_fn, hit_fn, scr_fn = DESIGNS[key]
    out = np.zeros(int(SR * TOTAL))
    nh = int(SR * HIT)
    st = 7.0 * ms.tv_static(nh)                                 # karınca
    t = np.arange(nh) / SR
    st *= np.where(t < STATIC_D, 1.0, np.interp(t, [STATIC_D, STATIC_D + 0.25, HIT], [1.0, 0.22, 0.3]))  # sahne sesleri duyulsun
    out[:nh] += st
    ni = int(SR * (HIT - STATIC_D))
    intro = intro_fn(ni)
    intro = norm(intro, 0) * 2.2 * np.clip(np.arange(ni) / (SR * 0.15), 0, 1)
    place(out, intro, STATIC_D)
    gap = int(SR * 0.12)
    out[nh - gap:nh] *= np.linspace(1, 0.0, gap)               # vuruştan önce bıçak gibi sessizlik
    hit = limiter(rev(hit_fn(1.6), 1.0, 0.3), -0.5, 2.5)
    place(out, hit, HIT)
    sc = limiter(rev(scr_fn(TOTAL - HIT - 0.1), 1.2, 0.25), -0.3, 3.5)
    place(out, sc, HIT + 0.04)
    pre, post = out[:nh], out[nh:]
    post = limiter(post, -0.1, 3.6)                              # vuruş sonrası neredeyse sürekli tepe seviye
    pre = softclip(pre, 1.3)
    pre = pre / (np.max(np.abs(pre)) + 1e-9)
    t = np.arange(nh) / SR
    pre = pre * 10 ** ((-6 + 3 * (t / HIT)) / 20)                 # karınca baştan duyulur, sonra yükselir
    out = np.concatenate([pre, post])
    out = out * np.clip((TOTAL - ms.t_all) / 0.25, 0, 1)
    return np.clip(out, -0.99, 0.99)


if __name__ == '__main__':
    keys = sys.argv[1:] or list(DESIGNS)
    for k in keys:
        print(ms.write(k, build(k)))
