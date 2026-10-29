# Adın Kimde Kaldı?

Telefonlardan ortak karar verilen, dallanan Türkçe korku oyunu. 4–10 kişi. 20 karar yeri, 80 seçenek, 20 final.
Hikâye önceden yazılmış içerikten çalışır; dış yapay zekâ servisi, API anahtarı veya ücretli bir hizmet gerekmez.

## Botlar

Ev sahibi lobide **+ Bot ekle** ile istediği kadar bot ekleyebilir (toplam karakter sınırı 10, botlar dahil). Tek kişi + 3 botla bile oynanır.
Botlar hikâyede normal karakter olur: isimleri metne yerleşir, okumayı beklemezler ve her turda uygun seçenekler arasından rastgele oy verirler.
Eşitlikte yeniden oylamaya da katılırlar. Ev sahibi lobide botu **çıkar** ile silebilir.

## Çalıştırma

Gerekli: **Node.js 22.13 veya üstü** (yerleşik `node:sqlite` kullanılır).

```bash
npm install
npm start            # http://localhost:3000
```

Aynı Wi-Fi'deki telefonlardan katılmak için bilgisayarın yerel IP adresini açın, örn. `http://192.168.1.20:3000`.
Lobideki QR kod ve “Bağlantıyı paylaş” bu adresi kullanır; bu yüzden ev sahibi de oyunu `localhost` yerine IP adresinden açmalı.

### Ortam değişkenleri

| Değişken | Varsayılan | Açıklama |
|---|---|---|
| `PORT` | `3000` | Dinlenecek port |
| `HOST` | `0.0.0.0` | Dinlenecek adres |
| `DB_FILE` | `data/oyun.db` | SQLite kayıt dosyası (odalar, oylar, kararlar) |

Sır gerektiren bir ayar yoktur.

## İnternette yayınlama

### Tek tıkla Render (ücretsiz)

[![Render'a kur](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/hakkisunar-sys/adin-kimde-kaldi)

Düğmeye bas, GitHub ile giriş yap, **Apply / Deploy**'a bas. Birkaç dakika sonra `https://adin-kimde-kaldi-xxxx.onrender.com` gibi bir adres verir; herkes telefonundan bu adrese girer.

Ücretsiz planda: 15 dakika kimse girmezse sunucu uyur, ilk açılış yaklaşık bir dakika sürer. Oyun sürerken uyumaz. Kalıcı disk olmadığı için sunucu yeniden başlarsa açık odalar silinir (yeni oda kurmak yeterli).

### Başka bir yer

Tek bir Node süreci olarak çalışan herhangi bir yerde barınabilir (Render, Railway, Fly.io, kendi VPS'iniz…). Koşullar:

- WebSocket desteği (`/ws` yolu) ve HTTPS (istemci otomatik `wss://` kullanır).
- `DB_FILE` kalıcı bir diske işaret etmeli; aksi hâlde yeniden başlatmada odalar kaybolur.
- **Tek örnek** çalıştırın. Birden çok sunucu örneği için ortak PostgreSQL ve paylaşımlı pub/sub gerekir (bu sürümde yok).

## Testler

```bash
npm test
```

- `test/story.test.js` — içerik sayıları, ileri yönlü grafik, belgedeki (Ek B) 20 örnek yolun her birinin doğru finale çıkması, final öncelikleri (Ek C), stain sınırları, N19A çözümleyici, 4–10 kişide yer tutucu yerleşimi, katkı satırları, hatırlatmalar.
- `test/multiplayer.test.js` — gerçek WebSocket istemcileriyle: 3 kişiyle başlamama, 11. kişi engeli, tam oyun, 2–2 / 1–1–1–1 / 2–2–2–0 / 4–4–1–1 eşitlikleri, elenen seçeneğin reddi, 20 tur üst üste eşitlik, iki sekmeden çift oy, aynı isteğin tekrarı, eski tur oyu, kopma beklemesi, VOTING ve RESULT ortasında sunucu yeniden başlatma, ev sahibi devri ve duraklatma.

## Yapı

```
content/kaynak.md     Oyun tasarım belgesi (tek doğruluk kaynağı)
content/story.json    Belgeden birebir çıkarılan oyun içeriği
tools/extract.mjs     kaynak.md → story.json  (npm run extract)
src/engine.js         Saf hikâye motoru: efektler, final çözümleyici, isim yerleştirme
src/room.js           Oda yaşam döngüsü, okuma kapısı, oylama ve eşitlik kuralları
src/names.js          Görünen ad doğrulama (2–20 grafem, Türkçe büyük/küçük harf)
src/store.js          SQLite kalıcı kayıt
src/server.js         HTTP + WebSocket sunucusu, QR üretimi
public/               Telefon arayüzü (bağımlılıksız, tek sayfa)
```

Metinde değişiklik yapılacaksa `content/kaynak.md` düzenlenir, ardından `npm run extract` ve `npm test` çalıştırılır.

## Notlar

- Sunucu tek otoritedir. Oy dağılımı tur kapanana kadar gizlidir; kimin neye oy verdiği hiçbir zaman başkalarına gösterilmez.
- İstemci yalnız mevcut sayfayı alır; gelecek sahneler, efektler ve final haritası tarayıcıya gönderilmez.
- Yazı tipleri Google Fonts'tan yüklenir; erişim yoksa sistem yazı tiplerine düşer.
- Ses ve titreşim varsayılan olarak kapalıdır (Ayarlar'dan açılır). Ses dosyası yoktur; düşük seviyeli rüzgâr ve daktilo tıkırtısı tarayıcıda üretilir.
