# ADIN KİMDE KALDI?
## Claude için eksiksiz hikâye, oyun tasarımı ve uygulama sözleşmesi

**Sürüm:** 1.0 • **Dil:** Türkçe • **Oyuncu:** 4–10 • **Biçim:** telefonlardan ortak karar verilen dallanan korku oyunu.

Bu belge oyunu geliştirecek kişiye verilecek ana kaynaktır. Düğüm metinleri ve sonuç paragrafları doğrudan oyunda kullanılmak üzere yazılmıştır. Teknik açıklamalar oyuncuya gösterilmez. Burada “senaryo” bir kararın ardından gösterilen özgün sonuç metnini; “düğüm” dört seçeneği olan karar yerini ifade eder. Toplam 20 düğüm, 80 seçenek, 80 sonuç metni ve 20 ayrı final vardır. Her oturum bütün düğümleri görmek zorunda değildir. Erken sonlar ve kestirmeler vardır. Yeni karar düğümü eklenmez.

## 1. Claude'a doğrudan verilecek görev

> Bu belgedeki Türkçe metinleri, düğüm kimliklerini, dört seçenekli karar yapısını, durum değişimlerini ve final önceliklerini koruyarak çalışan bir çok oyunculu web oyunu yap. Oyunu oyuncular kendi telefonlarından oynayacak. Bir kişi oda kuracak, diğerleri kod veya QR ile katılacak. Hikâye herkeste daktilo etkisiyle görünecek. Kararlar gizli oylarla, en çok oy alan seçenek üzerinden ilerleyecek. Eşitlik tekrar oylamayla çözülene kadar hikâye ilerlemeyecek. Sunucu tek otorite olacak. Haricî üretken yapay zekâ API'si, Emergent servisi veya ücretli hikâye üretimi gerektirme. Hikâye önceden yazılmış içerik verisinden çalışsın. Önce hikâye motorunu ve testlerini, ardından oda/oylama/senkronizasyonu, sonra görsel tasarımı tamamla. Belgede olmayan başarı şartı, gizli zar, karakter elemesi veya otomatik eşitlik çözümü ekleme. Benden yeni hikâye yazmamı bekleme; bütün oyun içeriği aşağıdadır. Dağıtım için sır gerektiren bir adım kalırsa çalışan yerel sürümü, kurulum talimatını ve gereken ortam değişkenlerini teslim et.

## 2. Oyuncuya anlatılacak oyun

### Lobi tanıtımı — oyuncuya göster

Gece yolunu kaybeden bir arkadaş grubusunuz. Birlikte kiraladığınız geniş minibüs, haritada adı görünmeyen bir köyde duruyor. Telefonlarınıza, sizin yapmadığınız bir konaklama kaydı geliyor. Köy isimlerinizi biliyor. İçeride bir şey, o isimlerin size ait olduğuna sizi bile şüphe ettirmek istiyor.

**Amacınız:** Gün doğmadan köyden hep birlikte çıkın. Gerçek isimlerinizi yanınızda götürün. Birinizi geride bırakmak, kurtulmak sayılmaz.

Hikâyeyi okuyun, aranızda konuşun ve dört seçenekten birine oy verin. En çok oy alan karar hepiniz için uygulanır. Eşit kalan seçenekler yeniden oylanır; eşitlik çözülene kadar devam edemezsiniz. Yanlış bir karar hemen her zaman son değildir. Gördüğünüz yazılara, tarihlerin tutarsızlığına ve birbirinizi nasıl hatırladığınıza dikkat edin.

Bu bir grup hikâyesidir. Karakterinizin başına gelenler oy hakkınızı almaz. Finali birlikte göreceksiniz.

### İlk sahneden önce tek ekranlık kurallar

1. Aynı hikâyenin içindesiniz; bireysel kazanma veya gizli hain rolü yok.
2. Her karar için bir kişi bir oy verir. Seçiminiz oylama kapanana kadar diğerlerinden gizlidir.
3. En çok oyu alan seçenek seçilir; yüzde 50'yi aşması gerekmez.
4. Eşitlikte yalnız eşit kalan seçenekler arasında yeniden oy verilir.
5. Metni hızlı açmanız yalnız sizin ekranınızı etkiler. Herkes okumadan karar başlamaz.
6. Ekranınızdaki tuhaflıklar hikâyeye aittir. Oyun telefonunuzun rehberine, fotoğraflarına, konumuna veya mikrofonuna erişmez.

**İçerik notu:** Yoğun psikolojik korku, kimlik kaybı, tehdit ve çocuk biçimindeki doğaüstü varlık tasvirleri. Önerilen anlatı kitlesi 16 yaş ve üzeridir; bu mağaza yaş derecelendirmesi değildir. Ses ve titreşim kapatılabilir.

## 3. Yazar dosyası — oyuncudan gizli ana kurgu

### Mekân ve geçmiş

Kurgusal Karadut köyü, Batı Anadolu'nun dağlık iç kesimlerinde, eski bir yol güzergâhındadır. Gerçek bir köy veya yaşanmış olay iddiası yoktur. Türk korku atmosferi; yolcu evi, avlu, kuru çeşme, eski mektep, defter, soba, eşik, tanıdık ses ve misafirlik üzerinden kurulur. Gerçek ibadetler, dinî metinler veya kültürler kötücül gösterilmez. Halka işareti bu kurguya ait bir eşik işaretidir.

1967 kışında köylüler bir yolcu grubunu uğursuzluk getirdiklerine inanarak misafirhaneye kapattı. Yardım isteyenlere cevap vermediler. Sabah yolcular yoktu. Olayın izini silmek için kayıtlar kazındığında, köyde başkaları da hem bedenen hem insanların belleğinden kaybolmaya başladı. İnkâr, içeride oluşan varlığı besledi.

Bekçi Salih suça katılmadı. Kaybolanları kayıt altında tutarak ve kopyalarını saklayarak köyün tamamının silinmesini geciktirdi. Şimdi bedensel bir kurtarıcı olarak görünmez. Geriye bıraktığı yazılar gerçek ipuçlarıdır. Adı, gelen grubun listesine eklendiği için ilk bakışta tehdit sanılır. Salih'in dışarıda duyulan sesi ise güvenilir değildir.

### Varlık: Adsız Misafir

Köydeki oluşuma yazar dosyasında “Adsız Misafir” denir. Oyunda kimse onu açıklayıcı bir canavar konuşmasıyla tanıtmaz. Köyün içinde aynı anda birden fazla yerde ses, yüz, yazı ve geçmiş taklidi yapabilir. Defterdeki kayıt var oldukça bir insanı bütünüyle yok edemez. Bu yüzden grubu kendi adını silmeye, kayıtları yakmaya, birini bedel diye bırakmaya veya yerine bir kopyayı kabul etmeye yönlendirir.

**Sınırlar:** Gerçek karşılıklı hatırayı tek başına kuramaz; iki kişinin ayrı ayrıntılarla doğrulamasına ihtiyaç duyduğu yerde aynı ezber cümleye düşer. Doğru tamamlanmış eşik işaretini izinsiz geçemez. Kapıyı açma, kaydı kabul etme, bedeli verme ve “yerimi al” deme gibi kararlarla alanını genişletir. Bir sahnede görülen korkutucu görüntü her zaman bütün grubun zaten değiştiği anlamına gelmez. Durum bayrakları hangi tehdidin kalıcılaştığını belirler.

**Defter paradoksu:** Defter düşmanın sıradan lanetli eşyası değildir. Kaybolan insanların son şahitliğidir. Onu yok etmek kurtuluşu yok eder. Finalde isimlerinizi doğruladıktan sonra defter köyde bırakılır: kaydı korumakla eşyayı dışarı taşımak farklı işlerdir.

### Dramaturji

- N01–N05: Kaydın açılması, kişisel ses ve yüz tehditleri; eve girişin bedeli.
- N06–N10: Köyün suçu, kayıt/hatıra/sayı kuralları ve ilk belirgin karşı kanıtlar.
- N11–N15: Sahte yardım, araç tuzağı, fedakârlık oyunu ve geri kazanma fırsatları.
- N16–N20: Geçmişe saldırı, gerçek grubun doğrulanması, isimleri geri alma ve çıkış.

**Süre:** Okuma ve tartışmaya göre yaklaşık 35–60 dakika; erken sonlarda daha kısa. Daktilo hızına ve sınırsız eşitlik tekrarlarına bağlı olarak süre uzayabilir. Her oynayışta tam 20 karar sorulmaz; içerik havuzunda tam 20 farklı karar noktası vardır.

## 4. Karakterler ve isim yerleştirme

### Oyuncular

Her oyuncu kendi seçtiği görünen adla gruba katılır. Gerçek ad şart değildir. 2–20 Unicode grafem, boşluklar kırpılır; boş, yalnız işaretlerden oluşan ve görünmez karakterli adlar reddedilir. Karşılaştırma Türkçe harfleri destekleyen normalize edilmiş, büyük-küçük harfe duyarsız bir anahtarla yapılır. Aynı odada aynı anahtar iki kez kullanılamaz. HTML her yerde düz metin olarak kaçırılır. Oyuncu ID'si adından bağımsız ve sabittir. Oyun başladıktan sonra ad ve anlatı kadrosu kilitlenir.

Sunucu başlangıçta oyuncu ID'lerini bir kez karıştırıp `cast` dizisi olarak kalıcı kaydeder. Üstteki ilk dört farklı kişi `P1`, `P2`, `P3`, `P4` olur. `LOST = P2`. Bu etiketler ölüm veya oy hakkı anlamına gelmez; sahne odağıdır. Her yeni oyunda odaklar farklı kişilere gelebilir. Anlatıcı hiçbir oyuncuyu kadın/erkek, anne/baba, sevgili, eş, kardeş, sürücü veya belirli bir meslek olarak tanımlamaz. “Arkadaş grubu” yeterlidir.

**5–10 kişi görünürlüğü:** İlk dört odak dışında kalanlar da dekor olmaz. Her sahnede aşağıdaki katkı cümlelerinden biri eklenir. Odak kişi `cast[(nodeNumber-1) % N]`; ikinci kişi `cast[nodeNumber % N]` olarak belirlenir. Aynı oyuncu kendisiyle eşleştirilmez. Üçüncü şahıs anlatım kullanılır. Bu satırlar yeni seçenek veya gizli bilgi oluşturmaz. İlk dört kişinin yoğun sahneleriyle birlikte her oyuncu en az bir kez, ana yolda genellikle birden fazla kez görünür. Erken finalde herkesin tek tek sahne alması garanti edilmez.

| Düğümler | Sahne sonuna, sorudan önce eklenecek katkı |
|---|---|
| N01–N05 | `{FOCUS}, yanındaki {PARTNER} ile göz göze geliyor. Aynı sesi ikisi de duymuş; biri ötekine işaret ediyor. Kimseyi yalnız bırakmadan hareket etmeniz gerektiği artık daha açık.` |
| N06–N10 | `{FOCUS}, gördüğünüz ayrıntıyı bir kâğıda not ediyor. {PARTNER}, daha önceki yazıyla karşılaştırıyor. Yanlış hatırlarsanız köyün bunu sizin yerinize tamamlayabileceğini hissediyorsunuz.` |
| N11–N15 | `{FOCUS}, grubun arka tarafını kontrol ediyor. {PARTNER}, önünüzdeki geçide bakıyor. Bir an için hepinizin aynı anda aynı yöne bakmamasının sizi koruduğunu düşünüyorsunuz.` |
| N16–N20 | `{FOCUS}, kendi elini yanındaki {PARTNER} eline bastırıyor. İki ayrı nabız hissediliyor. Görüntüler aynı şeyi söylemese de hâlâ gerçek insanlarla yürüyorsunuz.` |

N01 içindeki `{ROSTER_LINES}`, kadronun tamamını her satıra bir ad gelecek biçimde gösterir. `{N}` sayı, `{N_PLUS_1}` sayı+1'dir. Türkçe ekler adlara yapıştırılmaz; “{P1} sesi”, “{P2} adı” gibi yapılar korunur. Adlar uzunsa metin sarılır. İsimleri gerçek telefon verilerinden çıkarma.

### Sabit figürler

| Figür | İşlev | Gösterim |
|---|---|---|
| Salih | Geçmişte kayıtları koruyan bekçi; geride kalan yazılı tanık | Not, karbon izi ve ayrı kayıt satırı. Canlı kurtarıcı olarak gelmez. |
| Kapıdaki çocuk | İçeri alınma isteğiyle davet üreten biçim | Geriye giden ayak izleri, yanlış yerden gelen ses. Gerçek bir çocuğa zarar vermek seçenek değildir. |
| Bezli kişi | Adından vazgeçmiş eski misafir görüntüsü | Su, bardak ve unutma vaadi. Tam bir açıklama yapmaz. |
| Karşılıklar | Oyuncuların taklitleri | Geciken hareket, aynı cümlelerle anlatılan hatıra, bedensel tutarsızlık. |
| Adsız Misafir | Köyün inkârından oluşan tehdit | Birden çok biçim; tam bir canavar tasarımı veya savaş sahnesi gerekmez. |

### Ortak hatıra sistemi

Oyunculardan gerçek özel anı istenmez. N09'daki otobüs durağı, kırık sarı şemsiye ve sonradan gelmiş otobüs bu hikâyenin kurmaca ortak anısıdır. N09A veya N11C `anchor=true` yapar. N14A ikinci bir kurtarma fırsatıdır. N17A'daki sınama ayrı bir mini sınav açmaz; seçeneğin sonuç metni sınamayı anlatır. Önceden `anchor=false` olsa bile grup o sahnede kurmaca anıyı hatırlayıp taklitleri ayırabilir; `anchor` bayrağı değişmez. Fiziksel kişi tanıma ile defterin istediği sağlam tanıklık aynı işlem değildir.

## 5. İçerik ve durum motoru

### Başlangıç durumu

```json
{
  "stain": 0,
  "rule": false,
  "forgeryKnown": false,
  "proof": false,
  "anchor": false,
  "namesCounted": false,
  "seal": false,
  "exitPrepared": false,
  "namesRestored": false,
  "guest": false,
  "voiceTaken": false,
  "borrowedName": false,
  "memoryLost": false,
  "mirrored": false,
  "bargain": false
}
```

`stain` dışındaki alanlar booleandır. `stain`, görünmeyen bulaşma yoğunluğudur; 0–12 aralığında tutulur. Puanı oyuncuya gösterme, seçeneklerin yanına “doğru/yanlış” etiketi koyma. Kararın sonucu, ses ve sonradan görülen ayrıntı anlatı karşılığıdır. Gerçek başarı için `stain<=1` gerekir. Bayraklar seçildiği sonuç gösterilirken sunucuda yalnız bir kez işlenir.

| Alan | Anlam / düzeltme |
|---|---|
| `rule` | Bazı gerçek kuralları öğrenmek; açıklama ve tekrar bağlamı. Tek başına final kilidi değil. |
| `forgeryKnown` | Sahte yazı tekniğini fark etmek; bağlam. Tek başına final kilidi değil. |
| `proof` | Kayıtların aslına ilişkin kanıt; N03D, N06A/B, N11A. |
| `anchor` | İsim sahibini tutan ortak tanıklık; N09A, N11C, N14A. |
| `namesCounted` | Gerçek kadroyu sayıyla doğrulamak; N10A veya N14B. |
| `seal` | Arkadan takip yolunu kapatan işaret; N05B veya N15A; N15D bozar. |
| `exitPrepared` | Son geçişin açılması; N18A veya N19B. Ancak N19B seçilirse aynı turda isim mühürleme fırsatı kaçırılır. |
| `namesRestored` | Yalnız N19A'nın çözümleyicisiyle true olabilir. |
| `guest` | Fazladan bir varlığın araya girmesi; N17A temizler. |
| `voiceTaken` | P4'ün anlatıdaki sesi alınmıştır; N14A geri verir. İlk etki başka kişide anlatılsa da kalıcı belirtinin odağı P4 olur. Oy hakkı kaybolmaz. |
| `borrowedName` | Kayıt sahibine yabancı imza/ad karışmış; N14A veya başarılı N19A düzeltir. |
| `memoryLost` | Gecenin hatırasında kalıcı boşluk; bu sürümde geri alınamaz. |
| `mirrored` | Yansıma izi; N15A temizler. |
| `bargain` | Sesle yapılmış bağlayıcı söz; N17A açıkça reddederek temizler. |

### İşlem sözleşmesi

Her seçenek `id, label, result, effects, next` içerir. `label` ve `result` oyuncuya gösterilir; `effects` ve `next` gizlidir. Efektlerde belirtilmeyen değer korunur. Boolean değer atamadır. `stain:+2/-2` mevcut değere eklenir ve 0–12 aralığına sıkıştırılır. Diğer hiçbir alan sayısal artırma kullanmaz.

`resolveNames:true` saklanan ayrı bir bayrak değildir. N19A'da o andaki `proof && anchor && namesCounted && exitPrepared` değeri `namesRestored` alanına yazılır. True ise ayrıca `borrowedName=false` olur. False ise diğer bayraklar değişmez. `{RESTORE_RESULT}` şu iki metinden biridir:

- **Başarılı:** “Karbon izi asıl harfleri gösteriyor. Her ismi bir hatıra ve canlı bir el doğruluyor. Mühür bastığınızda kâğıttan çıkan soğuk kesiliyor. Harfler yerlerine oturuyor. İlk kez defter sizi değil, siz defteri tutuyorsunuz.”
- **Başarısız:** “Mühür kâğıda basılıyor, fakat izinin bir yanı boş kalıyor. Kanıt, tanıklık, gerçek sayı veya hazırlanmış geçişten biri eksik. Hangi harfin kime ait olduğunu kesinleştiremiyorsunuz. İsimler hâlâ okunuyor; ama artık yalnız size ait değiller.”

`routeEnding` yalnız bir işlem açıklamasıdır; durum alanı olarak tutulması gerekmez. `ROUTE_*` hedefleri son bölümdeki kesin öncelikli yönlendirme kurallarıdır. Sahneler rastgele final seçmez. İçerikte zar atılmaz. Yalnız başlangıçtaki kadro dağılımı rastgele olabilir; o da kayıtlıdır.

### Birleşen yolların bağlamını koruma

N02B'de N03, N04C'de N05, N07C'de N08 atlanır. Atlanan sahne yaşanmış sayılmaz; bayrak verilmez. N02B/N04C'nin sonuçları defterin gruba geçtiğini açıklar. N05 sonuçları N06'ya, N08 sonuçları N09'a mekânsal geçiş verir. Diğer bütün devamlar sıradaki düğüme gider. Ortak sahneye girerken önceki seçeneğin sonuç paragrafı gösterilir; asla doğrudan atlanmaz.

Her N04 ve sonrası sahnenin başına, `voiceTaken`, `guest`, `borrowedName`, `mirrored`, `memoryLost`, `bargain` alanlarından true olan en son değişenin kısa hatırlatması eklenebilir. En fazla bir cümle, oyuncuya yeni bilgi veya yeni ceza vermeden. Sıralama için işlem günlüğündeki son değişim zamanı kullanılır; eşitse aşağıdaki sıra esas alınır. Yanlış bir durumu icat etmektense hatırlatma göstermemek tercih edilir.

| Bayrak | Hatırlatma |
|---|---|
| voiceTaken | `{P4}, konuşmaya çalışınca dudaklarından yalnız hava çıkıyor.` |
| guest | `Aranızdaki adımlara bazen küçük bir çift ayak sesi daha karışıyor.` |
| borrowedName | `{P2}, defterde kendi adının yanına ilişmiş yabancı harflere bakıyor.` |
| mirrored | `{P3}, gölgesinin hareketini bir nefes gecikmeyle takip ettiğini fark ediyor.` |
| memoryLost | `Biriniz, yolculuğun ilk saatini hatırlamaya çalışırken cümlesini yarım bırakıyor.` |
| bargain | `Verdiğiniz söz, biri kulağınıza tekrar ediyormuş gibi zihninizde dönüyor.` |

**Tutarlılık düzeltmesi:** N02C ilk kez P4 sesini çaldığı için birebir metin uygundur. N06D veya N16D'de ses kaybı ilk kez oluşursa sonuçtan sonra “Bu ses bir an odada dolaşıp {P4} boğazında susuyor” cümlesi eklenir. Böylece nihai ses kaybı P4'e bağlanır. Ses kaybı zaten varsa bu ek tekrar edilmez. N01C'nin anlık öksürüğü kalıcı ses kaybı değildir.

## 6. Sahne senaryoları

**Sunum sırası:** Varsa bağlam hatırlatması → sahne metni → o sahnenin katkı cümlesi → oyuncu hazır onayı → soru ve seçenekler → oylama sonucu → seçilen özgün sonuç metni → sonraki sahne veya final. İlerideki düğüm numaraları ve teknik efektler oyuncuya gösterilmez.

### N01 — Kaydı Olmayan Köy

**Oyuncuya gösterilecek metin:**

Saat 23.17. Yağmur, aracın tavanına içeriden vuruluyormuş gibi sert yağıyor. Navigasyon ana yolu griye boyayıp sizi dar bir köy yoluna sokalı on yedi dakika oldu. Hiçbiriniz son kavşakta bir tabela gördüğünü hatırlamıyor.

Motor, kuru bir öksürükle duruyor.

{P1}, telefonunu cama yaklaştırıyor. Şebeke yok. Yine de bütün ekranlar aynı anda aydınlanıyor.

KONAKLAMA KAYDINIZ TAMAMLANDI.

Altında isimleriniz var. {ROSTER_LINES}

Listenin en altında bir isim daha duruyor: SALİH.

{P2}, bu adın üzerine dokunuyor. Ekranda bir fotoğraf açılıyor: Aracınız arkadan çekilmiş. Fotoğrafta bagaj kapağı aralık. Karanlığın içinde beyaz bir el seçiliyor.

Çekim saati: 23.18.

Telefonların saati henüz 23.17. Köyün yukarısında tek bir pencere yanıyor. Bagajdan, tırnağın sac üzerinde gezdirilmesine benzeyen bir ses geliyor.

**Soru:** Araçtan gelen sesi duyunca ne yapıyorsunuz?

**A — Kimseyi ayırmadan ışığı yanan binaya yürüyoruz.**

**Sonuç:** Aracı kilitliyorsunuz. Bagajdaki ses, uzaklaştıkça hızlanıyor. Binanın kapısına vardığınızda birden kesiliyor; bu kez kapının öte yanından geliyor.

*Geliştirici:* Etkiler `{}` → Hedef `N02`.

**B — Bagajı açıp ne olduğunu birlikte kontrol ediyoruz.**

**Sonuç:** Bagaj bomboş. {P1}, kapağı kapatırken içeriden bir nefes yüzüne çarpıyor. Binaya yürüdüğünüzde çamurda sizin ayakkabılarınıza ait olmayan bir iz daha var.

*Geliştirici:* Etkiler `{"guest": true, "stain": 1}` → Hedef `N02`.

**C — Telefonlardaki Salih kaydını siliyoruz.**

**Sonuç:** İsim siliniyor. Yerinde {P2} yazıyor. {P2}, kendi adını yüksek sesle söyleyince boğazından tanımadığınız birinin öksürüğü çıkıyor.

*Geliştirici:* Etkiler `{"borrowedName": true, "stain": 1}` → Hedef `N02`.

**D — Kornaya basıp yardım çağırıyoruz.**

**Sonuç:** Korna çalmıyor. Köydeki bütün evlerden birer kere sizin kornanızın sesi geliyor. Son evin ardından, çamurun içinden ağır adımlar yaklaşmaya başlıyor.

*Geliştirici:* Etkiler `{"stain": 2}` → Hedef `N02`.

### N02 — Bir Bardak Fazla

**Oyuncuya gösterilecek metin:**

Kapının üzerindeki solmuş levhada YOLCU EVİ yazıyor. {P3}, tokmağa uzanmadan kapı açılıyor.

İçeride soba yanıyor. Masada {N} bardak çay var. Henüz dokunmadığınız sandalyelerin minderleri, birileri az önce kalkmış gibi çökük. Duvar saatinin akrebi yok.

Tezgâhtaki konaklama defteri bugünün tarihine açık. İsimleriniz, sizin el yazılarınıza benzeyen yazılarla alt alta dizilmiş. Son satırdaki Salih adı ıslak görünüyor.

Üst katta bir sandalye sürükleniyor.

Ardından {P4} sesleniyor: “Ben aşağı iniyorum. Sakın benimle konuşmayın.”

{P4} yanınızda. Dudakları kıpırdamıyor.

Tezgâhın altına kazınmış ince bir yazı fark ediyorsunuz: “İçeride yüzünü gördüğünün dışarıdaki sesine cevap verme.”

Merdivende ilk basamak gıcırdıyor. Masaya baktığınızda bardak sayısı {N_PLUS_1} olmuş.

**Soru:** Merdivenden inen sese karşı ne yapıyorsunuz?

**A — Birlikte tezgâhın arkasına geçip defteri ve yazıyı inceliyoruz.**

**Sonuç:** Merdivenden inen şey tezgâhın önünde duruyor. Çıplak ayaklarını görüyorsunuz; ayak bileklerinin üstünde hiçbir şey yok. Bir süre sonra tavana doğru geri çekiliyor.

*Geliştirici:* Etkiler `{"rule": true}` → Hedef `N03`.

**B — Hepimiz arka kapıdan avluya çıkıyoruz.**

**Sonuç:** Arka kapı açılıyor. İçeriden gelen adımlar kapıya kadar geliyor, fakat eşiği geçemiyor. Avlunun duvarındaki eski gazete, yağmurdan korunmuş duruyor.

*Geliştirici:* Etkiler `{}` → Hedef `N04`.

**C — {P4}, kendi sesine kim olduğunu soruyor.**

**Sonuç:** “Benim,” diyor yukarıdaki ses. {P4} cevap vermek istiyor; ağzı açık kalıyor. Bundan sonra kendi sesi yalnızca üst kattan duyuluyor.

*Geliştirici:* Etkiler `{"voiceTaken": true, "stain": 1}` → Hedef `N03`.

**D — Fazladan bardağı kırıp kapıya tuz döküyoruz.**

**Sonuç:** Bardak yere değmeden çatlıyor. Tuz sobanın altına doğru sürünüyor. Üst kattaki ses gülüyor: “Bunu size kim öğretti?” Tezgâhın ardına sığınıyorsunuz.

*Geliştirici:* Etkiler `{"stain": 1}` → Hedef `N03`.

### N03 — Defterin Altındaki El

**Oyuncuya gösterilecek metin:**

Tezgâhın arkasında yere çömeliyorsunuz. Defterin arkasına yapışmış bir sayfa var. Kâğıdı kaldırınca altındaki tahta yüzeyde bir avuç izi görüyorsunuz. Sanki biri tezgâhın içinden yukarı doğru bastırmış.

Sayfada yarım bırakılmış bir not:

“Ben bekçi Salih. Bu deftere yazılan isimler kaybolmasın diye buradayım. Yukarıdan benim sesim gelirse…”

Cümlenin devamı koparılmış.

{P1}, defterdeki adının altında beliren ince çizgiye bakıyor. Çizgi yavaşça imzaya dönüşüyor. {P1} elini masaya bastırınca çizgi duruyor.

Duvarın içinden bir parmak çıkıyor. Önce yalnız tırnak, ardından ilk boğum. Tezgâhın tahtasını yırtmadan, suyun yüzeyinden geçer gibi uzanıyor. Deftere doğru ilerliyor.

Arka kapının sürgüsü kendi kendine açılıyor.

**Soru:** Defterle ne yapıyorsunuz?

**A — El yazılarını inceleyip defteri kapatarak yanımıza alıyoruz.**

**Sonuç:** {P1}, kendi yazısını hatırladığı bir cümleyle karşılaştırıyor. Harfler aynı; imzalar değil. Defteri alınca duvardaki parmak içeri çekiliyor. Sahte imzaları tanımayı öğreniyorsunuz.

*Geliştirici:* Etkiler `{"forgeryKnown": true}` → Hedef `N04`.

**B — Adların yanına tek tek imza atıyoruz.**

**Sonuç:** Kalem son imzada elinize yapışıyor. Satırların altına siz yazmadan bir kelime ekleniyor: KABUL. Defter bir anlığına nefes alır gibi kabarıyor.

*Geliştirici:* Etkiler `{"borrowedName": true, "stain": 1}` → Hedef `N04`.

**C — Islak Salih satırını çizip defteri alıyoruz.**

**Sonuç:** Çizginin altından kan değil, siyah soba isi sızıyor. Arka kapıda duran bir gölge başını eğiyor. Defterin köşesi, sayfa kopmuş gibi eksiliyor.

*Geliştirici:* Etkiler `{"stain": 2}` → Hedef `N04`.

**D — Sayfaları telefonla fotoğraflayıp defteri yanımıza alıyoruz.**

**Sonuç:** Fotoğrafta adlarınızın altında başka tarihler görünüyor: 1967, 1988, 2004. Kâğıtta görünmeyen bu katmanları kaydediyorsunuz. Son fotoğrafta bir el kameraya doğru uzanıyor.

*Geliştirici:* Etkiler `{"proof": true, "stain": 1}` → Hedef `N04`.

### N04 — Kapıdaki Çocuk

**Oyuncuya gösterilecek metin:**

Avlu, binanın arkasında dar bir dikdörtgen. Kuyu taşla kapatılmış. Duvarda yağmur yemeyen bir gazete kupürü var: “Kar yüzünden yolu kapanan yolculardan haber alınamıyor.” Tarih: 17 Kasım 1967.

Fotoğraftaki misafirhane aynı. Pencerede bir çocuk duruyor. Yüzünün bulunduğu yer, kâğıt yıpranmadığı hâlde bembeyaz.

Avlu kapısının dışında bir çocuk öksürüyor.

“İçeride kaç kişisiniz?”

Kapının dibinden iki küçük ayakkabı görünüyor. İkisi de size dönük. Topuk izleri ise kapıdan uzaklaşıyor.

{P2}, taşın üzerindeki ikinci yazıyı eliyle temizliyor:

“Sayını söyleme. Sayını kendin bil.”

Çocuk bu kez {P3} sesini kullanıyor: “Bir kişiyim. Üşüdüm.”

{P3}, sizin aranızda duruyor. Çocuğun gölgesi kapının altından avluya uzanıyor; incecik parmakları defteri tutan elinize doğru ilerliyor.

**Soru:** Kapıdaki çocuğa nasıl karşılık veriyorsunuz?

**A — Bir kişi olduğumuzu söyleyip gitmesini istiyoruz.**

**Sonuç:** “Bir kişi,” diye tekrarlıyor. Defterde {P2} adının yanına başka bir soyadı ekleniyor. Yalan, sayıdan çok birinizin adına tutunmuş gibi duruyor.

*Geliştirici:* Etkiler `{"borrowedName": true, "stain": 1}` → Hedef `N05`.

**B — Cevap vermeden birbirimizi sayıyor, eski kuyunun tarafına çekiliyoruz.**

**Sonuç:** Çocuğun ayakkabıları kıpırdamadan kapıdan uzaklaşıyor. Kupürün altındaki el yazısını okuyorsunuz: “İsmi olmayanı içeri alma.”

*Geliştirici:* Etkiler `{"rule": true}` → Hedef `N05`.

**C — Arka sokaktan köy meydanına kaçıyoruz.**

**Sonuç:** Sokak sizi çamaşırhane duvarına çıkarıyor. Avlu kapısındaki öksürük artık ağzınızın dibinde. Dönüp bakmıyorsunuz. Defter, siz fark etmeden {P1} kolunun altında belirmiş.

*Geliştirici:* Etkiler `{"stain": 1}` → Hedef `N06`.

**D — Kapıyı aralayıp çocuğu içeri alıyoruz.**

**Sonuç:** Kapının arkasında kimse yok. Buna rağmen aranızdan küçük, ıslak ayaklar geçiyor. Masum birini dışarıda bırakmamış olmanın rahatlığı, ayak sesleri tavana çıkınca kayboluyor.

*Geliştirici:* Etkiler `{"guest": true, "stain": 2}` → Hedef `N05`.

### N05 — Yukarıdaki Sofra

**Oyuncuya gösterilecek metin:**

Kuyunun yanındaki merdiven, misafirhanenin üst katına açılıyor. Aşağıdaki avluda yağmur şiddetlenirken üst sahanlık kupkuru.

Koridorun sonundaki oda aydınlık. Sofrada {N} kişi oturuyor. Yüzleri arkaya dönük. Kıyafetleri sizin kıyafetleriniz.

{P1}, masanın başında oturan kendi sırtına bakıyor. Sandalyedeki baş, gövdesi dönmeden yavaşça yana eğiliyor.

Kapının çerçevesindeki çentikler harf oluşturuyor: “Davet, açılan kapıyla tamamlanır. Oturan kalkmaz.”

Sofradakilerden biri sandalyesini geri çekiyor. Yerde sürünen iki ayak, koridora doğru dönüyor. Bilekleri ters tarafta.

Aşağıdan bir radyo cızırtısı geliyor. Arada, bir ses “Çamaşırhanedeki nüshayı bulun,” diyor.

Kapı kolu, dışarıdan tutulmuş gibi aşağı iniyor. Henüz odaya adım atmadınız.

**Soru:** Sofra odasının önünde ne yapıyorsunuz?

**A — Odaya girmeden geri çekilip radyonun sesini izliyoruz.**

**Sonuç:** Merdivenin ilk basamağına bastığınızda odadaki bütün sandalyeler birlikte geri itiliyor. Aşağı inene kadar nefesinizi tutuyorsunuz. Misafirhanenin yanındaki çamaşırhane kapısı açık.

*Geliştirici:* Etkiler `{}` → Hedef `N06`.

**B — Kapıyı kapatıp arkasına ortak bir işaret çiziyoruz.**

**Sonuç:** Çentiklerin arasındaki açık halkayı tamamlıyorsunuz. Kapının öte yanındaki tırnak sesleri bir anda kesiliyor. Aynı işaretin aşağıdaki çamaşırhane taşında da bulunduğunu görüyorsunuz.

*Geliştirici:* Etkiler `{"seal": true}` → Hedef `N06`.

**C — Sofradaki yerlerimize oturup ne istediklerini öğreniyoruz.**

**Sonuç:** Sandalyeler geriye gitmiyor. Aşağıdan kapı tokmağı duyuluyor. Ağzınız, siz istemeden “Hoş geldiniz” diyor. Önünüzdeki çayda, yeni gelen yolcuların yüzleri var.

*Geliştirici:* Etkiler `{}` → Hedef `E13`.

**D — Birimiz pencereden yardım isterken diğerleri koridorda bekliyor.**

**Sonuç:** {P3}, pencereye dokunuyor. Cam su gibi yumuşuyor. Hepinizin bedenleri camın içine çekilirken aşağıda far ışıkları beliriyor. Sesiniz dışarı ulaşmıyor.

*Geliştirici:* Etkiler `{}` → Hedef `E15`.

### N06 — İki Nüsha

**Oyuncuya gösterilecek metin:**

Eski çamaşırhanede beton yalaklar var. Muslukların ağzı telle bağlanmış. İçlerinden su yerine bazen nefes sesi geliyor.

{P2}, duvarın oyuk gözünde metal bir kutu buluyor. İçinde bekçi Salih imzalı tutanak ve misafir defterinden alınmış karbon nüsha duruyor.

Tutanak, 1967 kışında köylülerin yolcuları binaya kapattığını anlatıyor. Dışarıdakiler yardım çığlıklarına cevap vermemiş. Sabah içeride kimse bulunamamış. Sonra köylüler, olanları unutsunlar diye konaklama kayıtlarını silmiş.

Son satır daha yeni bir kalemle eklenmiş:

“Yanlışımız kapıyı açmak değildi. İçeridekilerin var olduğunu inkâr etmekti. Asıl defter kayıt değil, şahitliktir. Silerseniz sıra size gelir.”

Radyodan yumuşak bir ses geliyor: “Defteri yok edin. Ancak öyle özgür kalırsınız.”

Karbon nüshadaki isimler, radyodaki her kelimede biraz daha soluyor.

**Soru:** Kutudaki belgeleri nasıl kullanıyorsunuz?

**A — Tutanağı ve karbon nüshayı birlikte koruyup asıl defterle karşılaştırıyoruz.**

**Sonuç:** İki kâğıt üst üste gelince ıslak mürekkeple sonradan eklenen harfler ayrılıyor. Salih kaydı bir misafirin değil, bekçinin kaydı. Radyodaki ses bunu özellikle saklamış.

*Geliştirici:* Etkiler `{"proof": true, "rule": true}` → Hedef `N07`.

**B — Karbon nüshayı telefonla kaydedip katlayarak defterin arasına koyuyoruz.**

**Sonuç:** Fotoğraf kanıtı bozulmadan kalıyor. Hoparlörden bir süre kendi nefesiniz geliyor. Ardından radyo susuyor. Nüshayı yanınıza alıyorsunuz.

*Geliştirici:* Etkiler `{"proof": true}` → Hedef `N07`.

**C — Belgeleri bırakıp radyonun tarif ettiği kestirme yola çıkıyoruz.**

**Sonuç:** Radyo “Aferin” diyor. Siz sokağa çıktığınızda aynı kelimeyi bütün musluklar tekrarlıyor. Duvarın dışında kendinizi meydanda buluyorsunuz.

*Geliştirici:* Etkiler `{"stain": 1}` → Hedef `N07`.

**D — Kutuyu açmadan yüksek sesle yardım çağırıyoruz.**

**Sonuç:** Musluk telleri geriliyor. Yalakta beliren ağızlar sizin isimlerinizi sırayla deniyor. Kimseye yaklaşmadan dışarı çıkıyorsunuz. Son ağız, seslerden birini tutmayı başarıyor.

*Geliştirici:* Etkiler `{"voiceTaken": true, "stain": 2}` → Hedef `N07`.

### N07 — Kuru Çeşme

**Oyuncuya gösterilecek metin:**

Meydandaki çeşmenin suyu kesik. Çanağında kuru yaprak yerine tırnak büyüklüğünde kâğıtlar birikmiş. Her birinde bir isim var.

Çeşmenin taşına sırtını vermiş bir kişi görüyorsunuz. Yüzü bir bezle örtülü. Elinde boş bir bardak tutuyor.

“Adım bende değil,” diyor. “Sizinkini geri verirlerse benimkini de okuyun.”

Bezin altından sarkan çenesinde derin bir çukur var; sesi oradan değil, çeşmenin oluğundan geliyor.

Taşa kazınmış küçük yazıda şu cümle okunuyor: “Suyu adıyla isteyen, adını suda bırakır.”

{P4}, çeşmenin yalağında arkanızdaki sokağın yansımasını görüyor. Yansımanın içinde biriniz el sallıyor. Gerçek sokakta kimse yok.

Bezli kişi bardağı uzatıyor. “Bir yudum. Sonra hiçbir şeyden korkmayacaksınız.”

**Soru:** Çeşmenin başında ne yapıyorsunuz?

**A — Bardağı almadan taşın yazısını ve isim kâğıtlarını inceliyoruz.**

**Sonuç:** Çeşmenin arkasında kapalı bir mektebin anahtarı bulunuyor. {P4}, suyun içindeki elin kendisini değil, omzunun arkasında duran birini çağırdığını fark ediyor. Oradan uzaklaşıyorsunuz.

*Geliştirici:* Etkiler `{"rule": true}` → Hedef `N08`.

**B — Bir yudum içip kendimizi sakinleştiriyoruz.**

**Sonuç:** Korku bir anda kesiliyor. Yıllardır bildiğiniz bir anıyı düşünmeye çalışınca zihninizde boş bir mutfak beliriyor. Arkadaşlarınızın yüzünü biliyorsunuz; onları nasıl tanıdığınızı artık bilmiyorsunuz.

*Geliştirici:* Etkiler `{"memoryLost": true, "stain": 1}` → Hedef `N08`.

**C — Çeşmeye dokunmadan ses gelen eski mektebe ilerliyoruz.**

**Sonuç:** Arkanızdaki bardak taşta yuvarlanıyor. Hiç kırılmıyor. Mektebin arka kapısını açık buluyorsunuz; yanındaki cam odadan geçmeden içeri giriyorsunuz.

*Geliştirici:* Etkiler `{}` → Hedef `N09`.

**D — Yansımadaki arkadaşın uzattığı eli tutuyoruz.**

**Sonuç:** Su yüzeyi sertleşip parmaklarınıza kilitleniyor. Sokak yukarı doğru devriliyor. Kuru taşın içinden öteki tarafınıza geçerken bezli kişi yüzündeki örtüyü kaldırıyor: yüz sizin.

*Geliştirici:* Etkiler `{}` → Hedef `E10`.

### N08 — Cam Odası

**Oyuncuya gösterilecek metin:**

Mektebin yanındaki küçük oda, eski bir berber dükkânı. Aynanın üstüne beyaz kireçle şu yazılmış:

“Yanındakini camdan sayma.”

Kapı kapanmıyor ama arkanızdaki meydan artık görünmüyor. Dışarıda, dükkânın içini gösteren ikinci bir oda var. Orada da siz duruyorsunuz.

{P3}, elini kaldırıyor. Karşıdaki {P3}, elini bir nefes gecikmeyle kaldırıyor. Sonra gerçek {P3} elini indirmediği hâlde indiriyor.

Aynanın köşesinde bir anahtar asılı. Altında mektebin ismi var: KARADUT İLKMEKTEBİ. Yanında okulun kapısına uzanan gerçek bir geçit bulunuyor.

Aynadaki grup omuz omuza yaklaşıyor. Aralarında tam bir kişinin geçebileceği kadar boşluk açılıyor.

Karşıdaki {P1}, kendi camına parmağıyla yazıyor: “Sizdeki eksik.”

**Soru:** Aynanın karşısından nasıl ayrılıyorsunuz?

**A — Yüzlere bakmadan çerçevedeki anahtarı alıp gerçek geçitten çıkıyoruz.**

**Sonuç:** Anahtar soğuk değil, ılık. Mektebin kapısını açıyor. Arkanızdaki camda herkes bir an daha kalıyor; sonra görüntü hep birlikte kararıyor.

*Geliştirici:* Etkiler `{}` → Hedef `N09`.

**B — Gerçek bileklerimizi tutup aynadaki sayıyla karşılaştırıyoruz.**

**Sonuç:** Bilekleriniz aynı anda atıyor; camdakilerin göğsü hareket etmiyor. El ele dönüp gerçek geçitten çıkıyorsunuz. Sayıyı görüntüden doğrulamamayı öğreniyorsunuz.

*Geliştirici:* Etkiler `{"rule": true}` → Hedef `N09`.

**C — Aynadakilere hangimizin eksik olduğunu soruyoruz.**

**Sonuç:** İçlerinden biri {P3} adını söylüyor. Gerçek {P3} gözlerini kapatınca camdaki karşılığı yürümeye devam ediyor. Grup geri çekiliyor; fakat geçitten çıkan gölgelerden biri cama ait.

*Geliştirici:* Etkiler `{"mirrored": true, "stain": 1}` → Hedef `N09`.

**D — Aynayı kırıp arkasından geçiyoruz.**

**Sonuç:** Cam kırılıyor. Her parçada birinizin ağzı açık kalıyor. Kanamıyorsunuz, ama parçalar ayakkabılarınıza yapışıyor. Mektebe girdiğinizde yerdeki izlerden biri ters dönüyor.

*Geliştirici:* Etkiler `{"mirrored": true, "stain": 2}` → Hedef `N09`.

### N09 — Yoklama

**Oyuncuya gösterilecek metin:**

Mektebin sınıfında sıralar duvara çevrilmiş. Tahtada bugünün tarihi, altında “Misafirlerin yoklaması” yazıyor.

Öğretmen masasındaki çekmecede bir lastik mühür var: ŞAHİTTİR. Yanında Salih tarafından bırakılmış bir kart duruyor.

“Kaydı kâğıt tutar. İnsanı başka bir insanın hatırladığı doğru anı tutar. Aynı ayrıntıyı iki kişi tamamlayabiliyorsa ses tek başına onu alamaz. Burada adınızı yüksek sesle okumayın.”

{P1}, {P2} ile paylaştığı bir anıyı düşünmek istiyor. Aklına bir otobüs durağı geliyor. {P2}, o gün durağın önündeki kırık sarı şemsiyeyi hatırlıyor.

Tahtaya bir çizgi daha çekiliyor.

Koridordan görünmeyen bir öğretmenin adımları yaklaşıyor. Her sıranın yanında durup bir ismi fısıldıyor. Henüz hiçbirinizin ismini söylemedi.

**Soru:** Yoklama size ulaşmadan ne yapıyorsunuz?

**A — Konuşmadan kâğıda ortak bir anının ayrıntılarını yazıp birbirimize tamamlatıyoruz.**

**Sonuç:** Ayrıntılar birleşiyor. {P1} ile {P2} arasındaki anı, diğerlerinin kendi hatırladıklarıyla genişliyor. Mührü defterin arasına koyuyorsunuz. Koridordaki adımlar sınıfın önünden geçip gidiyor.

*Geliştirici:* Etkiler `{"anchor": true}` → Hedef `N10`.

**B — Sıralara oturup isimlerimiz söylenince burada diyoruz.**

**Sonuç:** Son “burada” kelimesinden sonra görünmeyen biri sıranızın arkasına oturuyor. Tahtaya grup sayınızdan bir fazla çizgi çekiliyor.

*Geliştirici:* Etkiler `{"guest": true, "stain": 2}` → Hedef `N10`.

**C — Mührü alıp sessizce arka merdivene yöneliyoruz.**

**Sonuç:** Mührün sapındaki yazıyı son anda okuyorsunuz: “Şahit yoksa mühür susar.” Adımlar arka kapıya varmadan sınıftan çıkıyorsunuz.

*Geliştirici:* Etkiler `{}` → Hedef `N10`.

**D — Yoklama defterine başka isimler yazarak izimizi kaybettiriyoruz.**

**Sonuç:** Tahtadaki isimler değişiyor. Bir an için birbirinizi bu yeni adlarla tanıyorsunuz. Asıl isimlerinizi defterde arayarak sınıftan çıkıyorsunuz.

*Geliştirici:* Etkiler `{"borrowedName": true, "stain": 1}` → Hedef `N10`.

### N10 — Küçük Soba

**Oyuncuya gösterilecek metin:**

Arka merdivenin altında sobası sönmemiş dar bir oda var. Duvarda isimlerin üstü kazınmış fotoğraflar asılı. Her boş yüzün altında aynı cümle:

“Hiç gelmedi.”

Masadaki kopya kâğıdı, çamaşırhanedeki tutanağın son bölümünü taşıyor. Bir köylü önce kendi kardeşinin adını silmiş. Ertesi sabah kardeşinin yatağının bulunduğu yerde, hiç oda yapılmamış gibi düz bir duvar varmış.

Soba kapağı açılıyor.

Radyodaki yumuşak ses bu kez içeriden geliyor: “Yoruldunuz. Kâğıdı bırakın. Sizi artık kimse tutamaz.”

{P4}, defteri sobaya yaklaştırdığınızda kendi parmaklarının ucunu sayfaların içinden gördüğünü söylüyor.

Masadaki sandalyenin arkasında başka bir yazı var: “Sayıyı yüzünden değil, canlı elinden doğrula.”

**Soru:** Defter ve isimlerle ilgili kararınız nedir?

**A — Defteri ateşten uzak tutup gerçek ellerimizi tek tek sayıyoruz.**

**Sonuç:** Bilekler, avuçlar, aynı anda verilen küçük karşılıklar. Herkesin hâlâ aranızda olduğunu doğruluyorsunuz. Defterdeki kişi sayısı ilk kez sizin sayınızla örtüşüyor.

*Geliştirici:* Etkiler `{"namesCounted": true}` → Hedef `N11`.

**B — İsimlerin üstünü kendi parmak izlerimizle kapatıyoruz.**

**Sonuç:** Mürekkep derinizin içine işliyor. Harfleri artık yalnız kâğıtta değil, tırnak diplerinizde de görüyorsunuz. Yumuşak ses teşekkür ediyor.

*Geliştirici:* Etkiler `{"borrowedName": true, "stain": 1}` → Hedef `N11`.

**C — Defteri sobada yakıyoruz.**

**Sonuç:** İlk sayfa tutuştuğunda {P1} nefes almayı unutuyor. İkinci sayfada {P2} yüzünü seçemiyorsunuz. Son sayfa kıvrılırken bedenleriniz sobadan çıkan duman gibi tavana yükseliyor.

*Geliştirici:* Etkiler `{}` → Hedef `E14`.

**D — İsim sayfalarını koparıp herkes kendi sayfasını taşıyor.**

**Sonuç:** Koparılan yerler bir süre sonra kanar gibi ıslanıyor. Birbirinizi hatırlamak zorlaşıyor. Sayfaları hemen yeniden defterin arasına yerleştiriyorsunuz. Kâğıtlar tamam, fakat zihninizde açılan boşluk kapanmıyor.

*Geliştirici:* Etkiler `{"memoryLost": true, "stain": 1}` → Hedef `N11`.

### N11 — Bekçinin Odası

**Oyuncuya gösterilecek metin:**

Merdivenin arkasındaki geçit, misafirhanenin kullanılmayan bekçi odasına çıkıyor. Buraya daha önce gelmediğinize eminsiniz. Buna rağmen yerdeki çamurlu izler sizin ayakkabılarınızın deseniyle aynı.

Duvardaki çatlak aynada yalnız eşya görünüyor. İnsanlar görünmüyor.

Masada iki not var. İlki eski: “Ben Salih. Adlarınızın aslı defterdedir. Benim sesimi duyarsanız yazımı sınayın.”

İkincisi yeni: “Ben {P1}. Salih yalan söylüyor. İsimlerinizi silin.”

İkinci notun kenarında henüz kurumamış parmak izleri var. {P1}, notu yazdığını hatırlamıyor.

Masanın çekmecesindeki karbon kâğıdında, eski notun bastırılmış devamı okunuyor: “Sesi taklit eder. Hatırlamadığı ayrıntıyı kâğıttan çalar.”

Kapının dışında {P1} sesiyle biri ağlıyor. İçerideki {P1}, kapıya sırtını dönüyor.

**Soru:** Hangi kanıta güveniyorsunuz?

**A — Karbon izi ve tarihleri karşılaştırıp eski notun devamını çıkarıyoruz.**

**Sonuç:** Salih, köy halkının kayıtları silmesini engellemeye çalışmış. Yeni nottaki harfler doğru, ama elin baskı yönü ters. Kâğıtta kalan gerçek tanıklığı buluyorsunuz.

*Geliştirici:* Etkiler `{"proof": true, "forgeryKnown": true}` → Hedef `N12`.

**B — Yeni not kendi adımızı taşıdığı için onu rehber kabul ediyoruz.**

**Sonuç:** Yazının sonuna kendi kendine bir kelime ekleniyor: SÖZ. Sonraki çıkışın sizi eve götüreceğine inanmak istiyorsunuz. Kapıdaki ağlama kesiliyor.

*Geliştirici:* Etkiler `{"bargain": true, "stain": 1}` → Hedef `N12`.

**C — Kapıyı açmadan dışarıdaki sesten ortak anının bir ayrıntısını istiyoruz.**

**Sonuç:** Ses duraksıyor. “Sen hatırlat,” diyor. Hatırlatmıyorsunuz. {P1}, kendi nefesini yeniden duyuyor; fakat sesi çalınmış biriniz varsa henüz geri gelmiyor.

*Geliştirici:* Etkiler `{"anchor": true}` → Hedef `N12`.

**D — İki notu da bırakıp koridorun sonundaki çıkışa yöneliyoruz.**

**Sonuç:** Koridor, binanın ön kapısına açılıyor. Paspasta dışarıdaki yağmurdan tek damla yok. Kapının arkasında çalışan bir motor duyuyorsunuz.

*Geliştirici:* Etkiler `{}` → Hedef `N12`.

### N12 — İçinde Siz Olan Araç

**Oyuncuya gösterilecek metin:**

Ön kapıdan yolun kenarına çıkıyorsunuz. Aracınız burada. Motor çalışıyor. Camları buğulanmış.

İçeride {N} kişi uyuyor.

Sizsiniz.

{P2}, camdaki buğuyu koluyla siliyor. İçerideki {P2} aynı anda gözlerini açıyor, ama başını kaldırmıyor. Gözleri, yüzünün geri kalanından bağımsız olarak sizi izliyor.

Arka koltuğun camında içeriden kazınmış bir cümle var: “İlk gelenin yeri dolu.”

Bagaj kapağının altından çamur akıyor. Çamurun içinde bir el, tırnağıyla metalin dışını yokluyor.

Aracın aynasına sıkıştırılmış eski yol krokisinde farklı bir geçit işaretli: kuru dere, kilit taşı, sabah eşiği.

İçerideki {P3}, gözlerini açmadan kilidi kaldırıyor. Boşta kalan bir emniyet kemeri yavaşça çözülüyor.

**Soru:** Aracın yanında ne yapıyorsunuz?

**A — Kapıları açmadan dışarıdaki krokideki kuru dere yolunu izliyoruz.**

**Sonuç:** Krokiyi aynanın dışından çekip alıyorsunuz. İçeridekiler aynı anda doğruluyor. Kuru dereye giden patikaya koşarken motor sesini arkanızda bırakıyorsunuz.

*Geliştirici:* Etkiler `{}` → Hedef `N13`.

**B — Bagajı açıp içeride kapalı kalan kişiyi kurtarıyoruz.**

**Sonuç:** Bagajdaki el bileğinizi kavrıyor. İçerisi aşağıya doğru uzayan bir merdiven. Arkanızdaki araç kapıları kapanırken hepiniz birer birer o karanlığa çekiliyorsunuz.

*Geliştirici:* Etkiler `{}` → Hedef `E11`.

**C — Uyuyan kopyalarımızı dışarı çıkarmaya çalışıyoruz.**

**Sonuç:** Kapı koluna dokunduğunuzda camdaki yüzler siliniyor. İçlerinden biri görünmeden aranıza geçiyor. Aracı terk edip kuru dereye yöneliyorsunuz.

*Geliştirici:* Etkiler `{"guest": true, "stain": 2}` → Hedef `N13`.

**D — Bizi daha önce buraya getiren navigasyonu yeniden açıyoruz.**

**Sonuç:** Navigasyon dere yolunu gösteriyor. Varış adı EV. Ekranın altında bir sözleşme onayı beliriyor; kapatsanız da işaretli kalıyor. Yol sizi kuru dereye çıkarıyor.

*Geliştirici:* Etkiler `{"bargain": true, "stain": 1}` → Hedef `N13`.

### N13 — Bir Kişilik Köprü

**Oyuncuya gösterilecek metin:**

Kuru derenin üzerinde alçak bir taş köprü var. Altından su sesi geliyor; yatağına baktığınızda yalnız toz görüyorsunuz.

Köprünün ortasına bir kantar yerleştirilmiş. Kantarın kefesinde boş bir çocuk ayakkabısı duruyor.

Karşı kıyıdaki levhada şu yazıyor: “Geçiş bedeli bir misafir.”

{P4}, levhanın arkasındaki daha eski kazımayı fark ediyor: “Yolcular birlikte geçtiğinde kantar işlemez.”

Köprünün altından {P2} sesleniyor. “Beni buraya bıraktınız.”

Yanınızdaki {P2} ellerini avuçlarına saklıyor. Kantarın ibresi yavaşça sizin sayınıza yaklaşırken, ayakkabının içinden yeni kesilmiş bir tırnak düşüyor.

Köprüden tek sıra hâlinde geçilebilir. Fakat önünüzdekinin omzunu ya da elini tutmak mümkün.

**Soru:** Köprüyü nasıl geçiyorsunuz?

**A — Birbirimizle fiziksel teması kesmeden hep birlikte geçiyoruz.**

**Sonuç:** İlk kişi adım attığında son kişi hâlâ toprakta. Zinciri koparmıyorsunuz. İbre bir türlü sabitlenemiyor. Son kişi de karşıya geçince köprünün altındaki ses, tek bir insan gibi ağlıyor.

*Geliştirici:* Etkiler `{}` → Hedef `N14`.

**B — Birimiz kalmayı kabul ediyor; diğerleri çıkıyor.**

**Sonuç:** {P2}, kefenin yanına geçiyor. Kalanlar karşıya ulaştığında levhada “Ödendi” yazıyor. {P2} el sallıyor; siz onun neden tanıdık geldiğini düşünüyorsunuz.

*Geliştirici:* Etkiler `{}` → Hedef `E07`.

**C — Bedel olarak birimizin adını kâğıda yazıp kefeye bırakıyoruz.**

**Sonuç:** {P2} adı kâğıtta kalıyor, bedeni yanınızda yürüyor. Bir süre sonra ona seslenirken doğru adı bulamıyorsunuz. Defterde asıl isim hâlâ duruyor; geri alınabilir.

*Geliştirici:* Etkiler `{"borrowedName": true, "stain": 2}` → Hedef `N14`.

**D — En geridekine haber vermeden koşup geçiyoruz.**

**Sonuç:** Köprü aranızda uzuyor. Son kişinin adımları duyulmaz oluyor. Karşıdaki yol birden araç yoluna çıkıyor. Kimse dönüp eksik kişiyi soramıyor.

*Geliştirici:* Etkiler `{}` → Hedef `E05`.

### N14 — El Değmemiş Hatıra

**Oyuncuya gösterilecek metin:**

Karşı kıyıda duvarsız bir oda var. Zeminde eski bir halı, ortasında okuldan aldığınız mühürle aynı açık halka işareti.

Halkanın içinde, sizin ortak anılarınızdan küçük eşyalar beliriyor: sarı bir şemsiye teli, bir bilet, kenarı kırık bir fincan. Bunları buraya kim getirmiş olabilir? Şemsiye telinin ucunda, yıllar önce durağın bankına sürtündüğünde bulaşan sarı boya bile duruyor.

{P1}, bir eşyaya uzandığında kendi adını hatırlamak zorlaşıyor. Elini geri çekiyor.

Halkanın kenarında bir cümle var: “Biri anlatır, öteki tamamlar. Üçüncü, kimden duyduğunu hatırlar.”

Odanın dışında, aynı anıyı anlattığını iddia eden sesler yükseliyor. Her biri doğru başlayıp aynı yanlış ayrıntıyla bitiriyor: “Sonra hepimiz suya girdik.”

Hiç suya girmediniz.

**Soru:** Hatıraları nasıl doğruluyorsunuz?

**A — Eşyalara dokunmadan gerçek arkadaşlarımızın tamamladığı anıyı izliyoruz.**

**Sonuç:** Biriniz anlatıyor, diğeri tamamlıyor, kalanlar kimin orada olduğunu doğruluyor. Sahte sesler birer birer susuyor. Çalınan ses geri geliyor; ödünç yazılan isim asıl sahibine bağlanıyor.

*Geliştirici:* Etkiler `{"anchor": true, "voiceTaken": false, "borrowedName": false}` → Hedef `N15`.

**B — Eşyaları bırakıp gerçek bileklerimizi yeniden sayıyoruz.**

**Sonuç:** Odanın dışında dolaşan seslerle içinizde duran bedenleri ayırıyorsunuz. Kaç kişi yola çıktığınızı ve kaç kişi olduğunuzu doğruluyorsunuz. Halkanın dışındaki ayak izleri size karışamıyor.

*Geliştirici:* Etkiler `{"namesCounted": true}` → Hedef `N15`.

**C — Hatıralardan birini yanımıza hatıra olarak alıyoruz.**

**Sonuç:** {P3}, bileti cebine koyuyor. O anın başlangıcını bir daha hatırlayamıyor. Odanın dışında biri aynı bileti elinde tutarak aranıza girmeye hazırlanıyor.

*Geliştirici:* Etkiler `{"memoryLost": true, "guest": true, "stain": 1}` → Hedef `N15`.

**D — Dışarıdaki seslerin anlattığı anıya uyarak hep birlikte tekrar ediyoruz.**

**Sonuç:** “Sonra hepimiz suya girdik.” Zeminde kuru ayaklarınızın çevresinde küçük halkalar açılıyor. Duvarı olmayan odadan sırılsıklam çıkıyorsunuz.

*Geliştirici:* Etkiler `{"mirrored": true, "stain": 2}` → Hedef `N15`.

### N15 — Kapıyı Tamamlamak

**Oyuncuya gösterilecek metin:**

Patika, terk edilmiş bir evin tek başına kalmış kapısına varıyor. Duvar yok. Kapının iki yanından yürümek mümkün görünüyor; fakat yan tarafa atılan her adım sizi yeniden kapının önüne getiriyor.

Çerçevede üç küçük çentik, altlarında tamamlanmamış bir halka var. Misafirhanedeki kapıda gördüğünüz işaretin aynısı.

Eşiğin dibinde Salih imzalı bir not:

“Bu bir dua değildir. İçerisiyle dışarısını ayıran eski bir işarettir. Halka kesikse gelen, gittiğini sanır. Halkayı tamamla; kendi yüzünü kapıya verme.”

Kapı açılmadan arkasında bir yüz beliriyor. Tahtanın damarları {P3} yüzüne dönüşüyor. Sonra gözleri birer kıymık gibi dışarı uzuyor.

Eşiğin altında beyaz bir bez ve bir parça kömür buluyorsunuz.

**Soru:** Kapıdaki işaretle ne yapıyorsunuz?

**A — Beyaz bezle yüzü kapatıp kömürle eksik halkayı tamamlıyoruz.**

**Sonuç:** Tahta yüz bir an kendi yüzünüzmüş gibi acıyor. Sonra çentikler birleşiyor. Camdan gelen izler ayaklarınızdan dökülüyor. Peşinizdeki bazı sesler kapının öte yanında kalıyor.

*Geliştirici:* Etkiler `{"seal": true, "mirrored": false, "stain": -2}` → Hedef `N16`.

**B — Kapıyı hiç açmadan çerçevenin altındaki eşikten geçiyoruz.**

**Sonuç:** Bir an tavana doğru yürüyormuşsunuz hissine kapılıyorsunuz. Öte tarafta patika devam ediyor. İşaret açık kalıyor. Kapının ardında biri nefes almaya devam ediyor.

*Geliştirici:* Etkiler `{}` → Hedef `N16`.

**C — Kendi yüzümüzü tahtadaki yüze dayayıp kapıdan izin istiyoruz.**

**Sonuç:** Dudaklarınız tahtaya yapışıyor. Kelimeleriniz bütün köye dağılıyor. Sonra sesiniz, kilometrelerce uzaktaki bir telefonun hoparlöründen çıkıyor.

*Geliştirici:* Etkiler `{}` → Hedef `E16`.

**D — Kapıyı kırıp yolu zorla açıyoruz.**

**Sonuç:** Kırık parçalar yere değil, karanlığa düşüyor. Çerçeveden geçince arkanızdaki kapı yeniden bütün. Üzerinde bu kez hepinizin yüzü var.

*Geliştirici:* Etkiler `{"seal": false, "mirrored": true, "stain": 2}` → Hedef `N16`.

### N16 — Çocukluk Fotoğrafı

**Oyuncuya gösterilecek metin:**

Kapının öte yanında bir fotoğrafçı vitrini duruyor. Arkasında dükkân yok. Camda asılı fotoğrafta {N} çocuk, misafirhanenin önünde yan yana.

Yüzler size benziyor. Çok küçük hâlleriniz.

Altındaki tarih, grubunuzdaki herkesin henüz doğmadığı kadar eski. Buna rağmen {P4}, fotoğraf çekilirken arkasındaki kişinin elinin omzunu nasıl sıktığını hatırlıyor.

Fotoğrafın kenarındaki yırtıktan, çocukların ayaklarının altında yetişkin ayakkabıları görünüyor. Başlar sonradan yerleştirilmiş olabilir.

Köy, yalnız kaydı değil, geçmişi de yeniden yazmaya çalışıyor.

Camın içinden annenize ya da babanıza ait olduğunu iddia eden bir ses gelmiyor. Yalnız size benzeyen o çocuk konuşuyor: “Sen hiç buradan çıkmadın. Büyüdüğünü biz anlattık.”

Vitrinin yanında dar bir yürüyüş yolu var.

**Soru:** Fotoğrafın iddiasına nasıl karşılık veriyorsunuz?

**A — Tarih ve ayakkabı tutarsızlığını esas alıp fotoğrafı almadan ilerliyoruz.**

**Sonuç:** {P4}, omzundaki hayalî elin gevşediğini hissediyor. Siz uzaklaşırken çocukların yüzleri birbirine karışıyor. Sahte geçmiş, doğrulanmadığı için tamamlanamıyor.

*Geliştirici:* Etkiler `{}` → Hedef `N17`.

**B — Çocukların biz olduğuna inanıp fotoğrafın arkasındaki kapıyı açıyoruz.**

**Sonuç:** Vitrin iki yana açılıyor. İçerideki çocuklar sizin boyunuza kadar uzuyor. Dışarıdaki hayatınız bir fotoğrafın arka yüzü gibi kapanıyor.

*Geliştirici:* Etkiler `{}` → Hedef `E19`.

**C — Fotoğrafı yanımıza alıp daha sonra incelemeye karar veriyoruz.**

**Sonuç:** Cam kolayca açılıyor. Fotoğrafa dokunduğunuzda yolculuğun ilk saatleri zihninizden siliniyor. Kimin ne zaman araca bindiğini artık bilmiyorsunuz.

*Geliştirici:* Etkiler `{"memoryLost": true, "stain": 1}` → Hedef `N17`.

**D — Fotoğrafı yırtıp çocuklara isimlerimizi bağırıyoruz.**

**Sonuç:** Kâğıt yırtılırken kendi sesleriniz camda kalıyor. Çocuklar isimlerinizi bir daha tekrarlamıyor. Yol açılıyor, fakat yanınızdaki birinin adını yabancı bir adla çağırmaya başlıyorsunuz.

*Geliştirici:* Etkiler `{"borrowedName": true, "voiceTaken": true, "stain": 2}` → Hedef `N17`.

### N17 — Aranızdaki Boşluk

**Oyuncuya gösterilecek metin:**

Yolun iki yanındaki taşlar sırayla yanıyor. Ateş yok; içlerinden soğuk bir ışık sızıyor. Işığa basan gölgeleriniz, bedeninizden bir adım önde ilerliyor.

Köyden ayrıldığınızı gösteren eski levha görünüyor. Arkasında iki sıra insan duruyor. Bir sıra sizsiniz. Diğer sıra, bütün gece size yetişmeye çalışan karşılıklarınız.

Gerçek grubunuz henüz dağılmadı. Ancak adımlarınızın arasında bazen bir çift küçük ayak sesi daha duyuluyor.

Yerdeki çentikler bir cümleye dönüşüyor:

“Yüzünü değil, senden habersiz değiştiremediğini sor.”

{P1}, sınıftaki hatırayı düşünüyor. Herkes olayı aynı cümlelerle anlatmıyordu; doğru ayrıntılar farklı ağızlarda birleşiyordu. Kopyalar ise aynı kelimeleri aynı sırayla söylüyordu.

Karşı sıradan biri, “Bir kişi yanlış,” diyor.

**Soru:** Gerçek grubunuzu nasıl belirliyorsunuz?

**A — Birbirimizi suçlamadan, ortak anının farklı ayrıntılarını soruyoruz.**

**Sonuç:** Şemsiyenin kırık telini biri, geç gelen otobüsü bir başkası hatırlıyor. Anı, ayrı ağızlarda tamamlanıyor. Aradaki boş yerden ıslak bir nefes yükseliyor; fazladan gelen geri çekiliyor. Eski sözleri de açıkça reddediyorsunuz.

*Geliştirici:* Etkiler `{"guest": false, "bargain": false, "stain": -1}` → Hedef `N18`.

**B — Herkesin yüzüne bakıp tanıdık gelen sırayla ilerliyoruz.**

**Sonuç:** Yüzler doğru. Ama yolun kıyısındaki küçük ayak izleri de sizinle yürüyor. Bir görüntünün içeri sızdığını fark etmeden levhayı geçiyorsunuz.

*Geliştirici:* Etkiler `{"mirrored": true, "stain": 1}` → Hedef `N18`.

**C — Defteri kapalı tutup kimseyi sınamadan el ele yürüyoruz.**

**Sonuç:** Sıralar iç içe geçiyor. Bir an elinizdeki elin kaç parmağı olduğunu kestiremiyorsunuz. Teması bırakmıyor, patikaya devam ediyorsunuz.

*Geliştirici:* Etkiler `{}` → Hedef `N18`.

**D — Karşı sıraya, gerçek olanın onlar olduğunu kabul ettiğimizi söylüyoruz.**

**Sonuç:** Karşıdakiler rahatlamış gibi nefes veriyor. Birinin elinde sizin telefonunuz var. Önünüzdeki dünyayı onlara bıraktığınız anda misafirhanenin kapısında yeni bir grup beliriyor: yine siz.

*Geliştirici:* Etkiler `{}` → Hedef `E18`.

### N18 — Sabahın Çizgisi

**Oyuncuya gösterilecek metin:**

Gökyüzünde ilk kez açık bir renk beliriyor. Kuş sesi yok. Uzakta bir horoz üç kere ötüyor; sesin son hecesi insan nefesine dönüşüyor.

Önünüzde dereyi kesen beyaz bir taş çizgi var. İlk ışık çizginin üstüne vuruyor, fakat gölgeleriniz hâlâ misafirhaneye doğru uzanıyor.

Taşın üzerinde aynı halka işareti ve okunabilen son talimat:

“Işık yetmez. Şahitli adlar kapıya gösterilir. Taş tamamlanır. Canlılar birlikte geçer. Defter içeride bırakılır.”

Defter, çizgiye yaklaştırıldığında ısınıyor. İçindeki bazı satırlar asıl nüshadan farklı görünüyor. Hâlâ düzeltmek için zamanınız var.

Yan tarafta, buraya gelişinizi gösteren bir telefon videosu kendiliğinden oynuyor. “Baştan dene,” diyor bir ses. “Bu kez hata yapmazsın.”

**Soru:** Son eşiği nasıl hazırlıyorsunuz?

**A — İşareti taşta tamamlayıp defteri açmadan önce grubun birlikte durmasını sağlıyoruz.**

**Sonuç:** Taş yerine oturuyor. Gölgeleriniz ilk kez ayaklarınıza yaklaşıyor. Defterin sayfaları rüzgâr olmadan tek bir yaprakta duruyor: bu gecenin kayıtları.

*Geliştirici:* Etkiler `{"exitPrepared": true}` → Hedef `N19`.

**B — Videodaki başlangıç anına dönmeyi kabul ediyoruz.**

**Sonuç:** Ekrandaki yola dokunuyorsunuz. Parmak iziniz yağmur izine dönüşüyor. Motor öksürüyor. Saat 23.17. Birinizin avucunda bu gece henüz almadığınız mührün izi var.

*Geliştirici:* Etkiler `{}` → Hedef `E17`.

**C — Horoz sesini sabahın kanıtı sayıp taşın ötesine hemen geçiyoruz.**

**Sonuç:** Işık gözlerinizi alıyor. Çizgiyi geçtiğinizi sanıyorsunuz; ayaklarınız aynı yerde kalmış. Ses bir daha ötüyor ve siz son kaydı okumaya mecbur bırakılıyorsunuz.

*Geliştirici:* Etkiler `{"stain": 1}` → Hedef `N19`.

**D — Radyodaki sesin bizi geçirmesi karşılığında bir söz daha veriyoruz.**

**Sonuç:** “Sonra kapıyı açacaksınız,” diyor. Neye, ne zaman olduğunu söylemiyor. Başınızı salladığınızda defter kendi kendine son sayfasını açıyor.

*Geliştirici:* Etkiler `{"bargain": true, "stain": 1}` → Hedef `N19`.

### N19 — İsimleri Geri Almak

**Oyuncuya gösterilecek metin:**

Son sayfada isimleriniz yeniden yazılı. Bazıları sizin bildiğiniz biçimde, bazıları yanlarına eklenmiş yabancı harflerle. Altta Salih satırı, üsttekilerden ayrı bir çerçevede duruyor.

{P1}, parmağını bir harfin üzerine koyuyor. Harfin altında kâğıt değil, derin bir oda hissediyor. Odanın içinde birisi nefes alıyor.

ŞAHİTTİR mührü avucunuzda. Sınıftaki kartta yazan cümleyi hatırlıyorsunuz: “Şahit yoksa mühür susar.”

Karbon nüsha, asıl yazıyı ayırabilir. Ortak hatıra, ismin sahibini tutabilir. Gerçek ellerin sayısı, bir satırın fazladan yazılmasını önleyebilir. Taştaki kapı ise geçişe hazırlanmış olmalı.

Ses artık rica etmiyor.

“Bir çizgi çekin,” diyor. “Bir çizgiyi bile çok mu görüyorsunuz?”

Mürekkep, sayfanın kenarından parmağınıza doğru yürümeye başlıyor.

**Soru:** Kayıtlara son müdahaleniz ne olacak?

**A — Asıl yazıyı kanıtla ayırıp anıyla doğruluyor, gerçek kişi sayısına göre mühürlüyoruz.**

**Sonuç:** {RESTORE_RESULT}

*Geliştirici:* Etkiler `{"resolveNames": true}` → Hedef `N20`.

**B — İsimlere dokunmadan önce eşiğin açık işaretini tamamlıyoruz.**

**Sonuç:** Eksik taş kapanıyor. Geçiş hazır, fakat isimler hâlâ neyse o. Defteri kapatırken parmaklarınızda siz yazmadan atılmış imzaların baskısını hissediyorsunuz.

*Geliştirici:* Etkiler `{"exitPrepared": true}` → Hedef `N20`.

**C — İsimlerimizin üstünü çizerek kaydı kapatıyoruz.**

**Sonuç:** Her çizgide içinizden birine bakmak zorlaşıyor. Defteri bırakmıyor, yeniden birbirinizi saymaya çalışıyorsunuz. Ancak isimlerle bedenleri eşleştiren bağ incelmiş.

*Geliştirici:* Etkiler `{"namesRestored": false, "stain": 2}` → Hedef `N20`.

**D — Sesin istediği son imzayı atıp borcu kabul ediyoruz.**

**Sonuç:** Son imza kuruyor. Altında çıkış izni yazmıyor. “Bir dahaki misafirleri kabul eder” yazıyor. Yine de önünüzdeki çizgi aydınlanmaya devam ediyor.

*Geliştirici:* Etkiler `{"bargain": true, "borrowedName": true, "namesRestored": false}` → Hedef `N20`.

### N20 — Kimin Eve Döndüğü

**Oyuncuya gösterilecek metin:**

Gün doğuyor. Ya da bir şey, gökyüzünü gün doğuyormuş gibi aydınlatıyor.

Köyün sesi bir anlığına tamamen kesiliyor. O sessizlikte kendi kalp atışlarınızı duyuyorsunuz. Herkesin aynı anda duyduğu, birbirine uymayan gerçek ritimler.

Beyaz çizginin öte yanında asfalt var. Daha ileride aracınız duruyor. Bu kez camlarında buğu yok. Arka kapısı aralık.

Defter köy tarafında açılmış bekliyor. Sayfalar artık uçuşmuyor.

{P4} telefonuna bakıyor. Yeni bir arama: EV. Rehberinizde böyle bir kayıt bulunmuyor. Aramanın arkasında hepinizin aynı odada güldüğü bir ses duyuluyor.

Sağınızda, cam odasındaki karşılıklarınız el ele tutuşmuş bekliyor. Aralarındaki {P1}, “Bu kadar uğraşmana gerek yoktu,” diyor. “Ben senin yerine dönebilirim.”

Artık bir yol seçmelisiniz.

**Soru:** Son adımınız hangisi?

**A — Defteri köy tarafında bırakıp birbirimizin elini tutarak taş eşikten yürüyoruz.**

**Sonuç:** {CROSSING_RESULT}

*Geliştirici:* Etkiler `{"routeEnding": "cross"}` → Hedef `ROUTE_CROSS`.

**B — Araca binip kapıları kilitliyor, köye bakmadan uzaklaşıyoruz.**

**Sonuç:** Kontak çevriliyor. Motor ilk denemede çalışıyor. Arka koltuktaki kemerlerden biri, kimse dokunmadan çekilip yerine oturuyor.

*Geliştirici:* Etkiler `{"routeEnding": "car"}` → Hedef `ROUTE_CAR`.

**C — EV aramasını açıp kurtulduğumuzu söylüyoruz.**

**Sonuç:** Karşıdan kendi sesiniz geliyor: “Henüz karar vermedik.” Telefon ekranı kararıyor. Sonra yeni bir oylama açılıyor.

*Geliştirici:* Etkiler `{}` → Hedef `E20`.

**D — Karşılıklarımızın teklifini kabul edip onlarla yer değiştiriyoruz.**

**Sonuç:** Bir adım atıyorsunuz. Elinizdeki telefon, karşıdakinin elinde beliriyor. Karşı sıranın arkasında, köyün mü yoksa evinizin mi olduğu anlaşılmayan bir kapı açılıyor.

*Geliştirici:* Etkiler `{"routeEnding": "copy"}` → Hedef `ROUTE_COPY`.

## 7. Yirmi final — oyuncuya gösterilecek bitişler

Final kimlikleri ve sınıflar geliştirme içindir. Oyuncuya başlık ve metin gösterilir. Finalden önce seçeneğin sonuç paragrafı okunur. E05/E06/E07/E08 için LOST=P2 sabittir; gerçek oyuncu oyundan koparılmaz.

### E01 — Eksiksiz

**Sınıf:** Tam başarı

Son kişi de beyaz çizgiyi geçince defter kapanıyor. Köyün içinden ilk kez yalnız rüzgâr sesi geliyor. Aracınıza yürüyorsunuz; içeride kimse yok. Hepiniz birbirinizi, isimlerinizi ve aynı gecenin ayrı ayrıntılarını hatırlıyorsunuz.

{P1}, sabah bir benzinlikte çay söylüyor. Masaya tam {N} bardak geliyor. Kimse sayıyı söylemek zorunda kalmıyor.

Aylar geçiyor. Kapılarınız çalmıyor. Telefonlarda açıklanamayan fotoğraflar belirmiyor. Biriniz gecenin nasıl bittiğini sorduğunda aynı şeyi hatırlıyorsunuz: İçeride kalan defter bir yük değildi. Bir daha inkâr edilmeyecek insanların kaydıydı.

Bu kez gerçekten çıktınız.

### E02 — Unutulan Gece

**Sınıf:** Bedelli kurtuluş

Sabah yol kenarında uyanıyorsunuz. Hepiniz buradasınız. Araç sağlam. Son hatırladığınız şey, ana yoldaki bir kavşak. Telefonlarınızda köye ait hiçbir fotoğraf yok.

Bir hafta sonra {P3}, galerisinde yeni bir görüntü buluyor. Hepiniz kendi yataklarınızda uyuyorsunuz. Ayrı evler, ayrı odalar. Ama görüntü tek bir fotoğraf.

Çekim saati dün gece 03.17.

Köşesinde, üstü tozlanmış bir konaklama defteri duruyor. Kimse onu tanımıyor. {P3} fotoğrafı silmek için ekrana dokunuyor. Telefon, görüntünün zaten açık olduğunu ve canlı yayının sürdüğünü söylüyor.

### E03 — Konuşmayan

**Sınıf:** Bedelli kurtuluş

Hepiniz eve ulaşıyorsunuz. Fakat {P4} sesini geri getiremiyor. Boğazı sağlam; hekimlerin bulduğu bir neden yok. Konuşmaya çalışınca odadaki bütün ampuller hafifçe titriyor.

{P4}, deftere son bakışta okuduğu cümleyi kimseye yazmıyor. Kalem o kelimelere gelince kâğıdı yırtıyor.

Yıllar sonra aynı evde kaldığınız bir gece uykusunda konuşmaya başlıyor. Sesi eski sesi. Rahat, yorgun, neredeyse mutlu.

“Tamam,” diyor. “Artık gelebilirsin.”

Sabah {P4} yeniden konuşabiliyor. Evdeki bir odanın kapısı ise içeriden kilitli. O odanın dün bir duvar olduğundan hepiniz eminsiniz.

### E04 — Dışarıda Kalan

**Sınıf:** Takip altında kurtuluş

Köyden eksiksiz çıktınız. İsimleriniz yerinde. Hiçbirinizin yüzünde bir yabancılık yok. Fakat son işaret arkanızdaki yolu bütünüyle kapatmadı.

İlk gece {P1}, karşı sokaktaki lambanın altında birini görüyor. İkinci gece başka biriniz aynı kişiyi görüyor. Yüzü seçilmiyor; boyu her defasında bakan kişinin boyuyla aynı.

Evlerinize giremiyor. Henüz.

Bir ay boyunca yaklaşmıyor. Sonra {P2}, sabah kapı önüne bırakılmış tek bir çay bardağı buluyor. Bardak sıcak. İçindeki kâğıtta yalnız bir cümle var:

“Bir gece de sizde kalsam?”

### E05 — Boş Koltuk

**Sınıf:** Birlikte kurtuluş başarısız

Koşu bittiğinde kendinizi aracın yanında buluyorsunuz. Köprü uzakta kalmış. Arka koltuklardan biri boş; kemeri takılı.

Yola çıktığınızdan beri kaç kişi olduğunuzu soran olmuyor. Boş yere bakınca boğazınız düğümleniyor ama nedenini bilmiyorsunuz. {LOST}, belleğinizden bir ismin silinmesi gibi değil, o ismin hiç var olmaması gibi kayboluyor.

Eve vardığınızda telefonunuz grup fotoğrafı için anı bildirimi gösteriyor. Omuzlarınızın arasında insan biçiminde bir boşluk var. Altında otomatik bir başlık:

“Hep birlikte.”

Boş koltuğun kemeri, siz indikten sonra bir kere çözülüp tekrar takılıyor.

### E06 — Hatırlayan Tek Kişi

**Sınıf:** İsimler geri alınamadı

Yolu buluyorsunuz. Araca biniyorsunuz. Eve dönüyorsunuz. Fakat son defa dönüp saydığınızda {LOST} yok.

{P1} dışında hiç kimse o adı hatırlamıyor. Fotoğraflarda yerini bir ağaç, bir kapı, bazen bomboş bir sandalye doldurmuş. {P1}, aynı kişiyi anlattıkça diğerleri endişeyle birbirine bakıyor.

Üçüncü gece {P1} telefonuna bir mesaj geliyor.

“Beni sen de unutursan çıkabileceğim.”

Ardından ikinci mesaj:

“Bunu ben yazmadım.”

İki mesajın da göndericisi {P1}. İkisi de henüz gelmemiş bir tarihten gönderilmiş.

### E07 — Yer Değiştirme

**Sınıf:** Gönüllü kayıp

{LOST}, köprünün kefesinde kalıyor. Siz karşı kıyıya ulaştığınızda köprüde artık bir insan değil, küçük bir çocuk ayakkabısı var.

Yol hemen açılıyor. Aracınıza dönüyor, hiçbir engelle karşılaşmadan evlerinize gidiyorsunuz. Birinin sizi kurtarmak için kaldığını biliyorsunuz. İsmini çıkaramıyorsunuz.

{P3}, cebinde kendisine ait olmayan bir anahtar buluyor. Hangi kapıyı açtığını bilmediği için aylarca taşıyor.

Bir gece evinin kilidine anahtarı deniyor. Kapı açılıyor. İçerisi kendi evi değil. Masada sıcak çaylar, açık bir defter ve sizi bekleyen {LOST} var.

“Sıra kimde?” diye soruyor.

### E08 — Eve Dönen

**Sınıf:** Sahipliği bozulmuş dönüş

Köyün çıkışında {LOST} bir an görünmez oluyor. Bir ismi gerçek sahibinden ayıran o küçük yanlışlık, yolu onun altından çekip alıyor. Geri kalanlar asfalta ulaşıyor.

Ertesi sabah haber geliyor: {LOST} evinde. Evdekilere göre bütün gece oradaydı. Sizle yola hiç çıkmadı.

Telefonunuzdaki videoda araca bindiği görülüyor. Videoyu kendisine gösterdiğinizde gülümsüyor.

“Benzemiş,” diyor.

O sırada ekranın içindeki {LOST}, videonun geri kalanı oynamaya devam ederken başını çevirip size bakıyor. Dudakları sessizce iki kelime söylüyor:

“İçeri alma.”

### E09 — Fazladan Yolcu

**Sınıf:** Varlık gruba karıştı

Araçta herkesin yüzünü tanıyorsunuz. Herkes bir anı anlatabiliyor. Herkesin oturduğu yer, hep orasıymış gibi geliyor.

Yalnız kişi sayısı bir fazla.

Yol kenarında durup sayıyorsunuz. Bir daha sayıyorsunuz. İsimlerin her biri defterinizde var. Fazladan olan, kendine geçmişinizde de bir yer açmış.

Birini indirmek zorundasınız. Fakat hangi ismi söylediğinizde o kişi en eski, en gerçek anınızı anlatıyor.

Arka koltuktaki biri iç çekiyor.

“Hep böyle yapıyorsunuz,” diyor. “Geçen sefer de yanlış kişiyi indirmiştiniz.”

Hepiniz aynı anda, o yolun kenarında bırakılan birinin yüzünü hatırlıyorsunuz.

### E10 — Yanlış Beden

**Sınıf:** Yansıma yer değiştirdi

Eve dönüyorsunuz. Kimse eksik değil. Telefonunuz yüzünüzü tanıyor, kapınızın anahtarı çalışıyor. Günlük hayatınızın bütün küçük kanıtları yerli yerinde.

{P3}, elini yıkamak için aynanın önüne geçiyor. Aynada gördüğü kişi kendisi değil. Misafirhanenin eski fotoğrafındaki yüzü beyaz bırakılmış yolcu.

Gerçek yüzünü telefon kamerasında kontrol ediyor: normal. Yeniden aynaya bakıyor: yabancı.

Aynadaki kişi camın iç yüzüne tırnağıyla yazıyor:

“Ben senin bedeninde değilim.”

Bir süre bekliyor. Sonra ikinci satırı ekliyor:

“Sen benimkinde kaldın.”

### E11 — Bagaj

**Sınıf:** Aracın içindeki geçit

Bagajdaki merdivenin sonu gelmiyor. Yukarıda aracın açık kapağı, küçük bir ışık dikdörtgeni hâlinde kalıyor. Sonra o da kapanıyor.

Bir anda yeniden koltuklarınızdasınız. Eve dönmüş olmalısınız. Sokak tanıdık, araç duruyor. Fakat dışarıdaki evlerin hiçbirinin kapısı yok.

Bagajdan üç vuruş geliyor.

Bu kez açmıyorsunuz. Vuruş, arka koltuğun süngerine geçiyor. Sonra ön koltuğa. Sonra her birinizin oturduğu yerin tam altına.

{P1}, aracın camını indirmeye çalışıyor. Cam değil, boyanmış bir tahta parçası eline geliyor.

Aracın dışından bir çocuk soruyor: “İçeride kaç kişisiniz?”

### E12 — İlk Misafir

**Sınıf:** Davet eve taşındı

Araç sizi evlerinize götürüyor. Yol boyunca hiçbiriniz konuşmuyorsunuz. Kapıları kilitleyip kurtulduğunuza inanıyorsunuz.

İlk kapı {P2} evinde çalıyor. Dışarıda köyde gördüğünüz çocuk var. Ayakkabıları bu kez kuru.

“Bir kişiyim,” diyor. “Üşüdüm.”

{P2} kilide dokunmuyor. Telefonla diğerlerini aramak için geri çekiliyor. Evin içinden tanıdık bir ses yükseliyor:

“Açsana. Kaç saattir seni bekliyor.”

Antredeki aynada {P2} kendini görüyor. Arkasında, evin iç tarafında duran çocuğu da.

Kapı hâlâ kilitli. Dışarıdan bir kez daha çalınıyor.

### E13 — Yeni Ev Sahipleri

**Sınıf:** Misafirhane sizi tuttu

Sandalyelerden kalkamıyorsunuz. Sofradaki çayın buharı yüzlerinizi kapatıyor. İsimlerinizi hatırlıyorsunuz ama kime ait olduklarını bilmiyorsunuz.

Sabah oluyor. Merdivenlerden aşağı iniyorsunuz. Bedeniniz yürüyor, eliniz masaya bardak koyuyor. Sayı, kapıya yaklaşan yeni grubun sayısıyla aynı.

{P1}, kapı tokmağına daha dokunulmadan kapıyı açıyor. Karşıdaki yabancılara söylemek istediği tek cümle “Girmeyin.”

Ağzından çıkan ise başka:

“Üst kattan ses gelirse cevap vermeyin.”

Yeni gelenlerden biri adını söylemek için ağzını açıyor. Hepiniz, istemediğiniz hâlde, aynı anda gülümsüyorsunuz.

### E14 — Defterdeki İsimler

**Sınıf:** Bedenlerin kaybı

Ateş söndüğünde defter yanmamış. Yalnız sizin kayıtlarınız kâğıdın içine daha derin işlemiş.

Artık odaları göremiyorsunuz. Sadece sayfaları çeviren parmakları, arada yüzünüze vuran ışığı ve kapatıldığınızda gelen ağır karanlığı hissediyorsunuz.

Yıllar sonra biri defteri açıyor. Yeni isimler yazılacak. Bir kalemi hareket ettirebileceğinizi fark ediyorsunuz.

Bütün gücünüzle “Bizi çıkarın” yazmak istiyorsunuz.

Kâğıtta başka bir cümle beliriyor:

“Konaklama kaydınız tamamlandı.”

Sayfanın altındaki el yazısını tanıyorsunuz. Hepinizin yazısı birbirine karışmış. Yeni gelenler bunun bir karşılama notu olduğunu düşünüyor.

### E15 — Penceredekiler

**Sınıf:** Görüntüye hapsolma

Camın içinde nefes alabiliyorsunuz. Fakat başınızı çeviremiyor, pencerenin önünden ayrılamıyorsunuz.

Geceler birbirini izliyor. Her yağmurda yeni bir araç köy yoluna giriyor. Kurtulabilmeleri için bağırıyorsunuz. Sesiniz camı geçmiyor.

{P3}, elini dışarı doğru sallamayı öğreniyor. Diğerleri de yapıyor. Hepiniz aşağıdakilere geri dönmelerini anlatmaya çalışıyorsunuz.

Yoldaki insanlar, ışığı yanan bir evde kendilerini çağıran bir grup görüyor.

Birisi arkadaşına dönüyor: “Bak, orada insanlar var.”

Kapıya doğru yürümeye başlıyorlar. Camın içindeki kendi elinizi durduramıyorsunuz.

### E16 — Köyün Sesi

**Sınıf:** Seslere dönüşme

Kapıdan geçtiğinizde bedenleriniz arkada kalmıyor; hiç bedeniniz olmamış gibi kayboluyor. Dünyada yalnızca iletilebilen birer sessiniz.

Bir radyoya, bir su borusuna, açık bir telefonun hoparlörüne tutunabiliyorsunuz. Fakat her uyarınız başka kelimelere dönüşüyor.

Aylar sonra yağmurlu bir gecede bir grup yolcunun telefonlarına ulaşıyorsunuz. Henüz köye girmemişler. Bu kez hepinizi aynı anda duyurursanız belki doğru söyleyebilirsiniz.

“Geri dönün,” demeye çalışıyorsunuz.

Ekranlarda yazı beliriyor:

“Konaklama kaydınız tamamlandı.”

Listede onların isimleri var. Son satırda ise bu kez {P1} yazıyor.

### E17 — İkinci Deneme

**Sınıf:** Döngü sonu

Motor kuru bir öksürükle duruyor. Saat 23.17. Yağmur aracın tavanına vuruyor.

{P1}, olacakları hatırlıyor. Diğerleri onun ani korkusunu anlamıyor. Bildirim gelmeden telefonunu kapatıyor. Ekran kapalıyken de yazı beliriyor.

Bu kez ışığı yanan binaya girmek istemiyorsunuz. Fakat araçtan indiğinizde yol çoktan arkanızda kapanmış.

Misafirhanenin tezgâhında {P1} kendi el yazısını buluyor:

“Bu kez bana güvenmeyin.”

Notun altında çizilmiş on yedi küçük çizgi var. {P1}, bunları hangi denemede çizdiğini hatırlamıyor.

Üst katta sandalye sürükleniyor. Bu kez sesi duymadan önce hanginizin sesleneceğini biliyorsunuz.

### E18 — Sizden Öncekiler

**Sınıf:** Geçiş hakkını devretme

Kapının öte yanında sizin başka bir grubunuz var. Onların yüzleri daha dinç. Üzerlerinde henüz çamur yok. Aynı gecenin başındalar.

Köyün bütün sesleri susuyor. Bir kuralı, hiç kimse söylemeden biliyorsunuz: Onlar sabaha kadar içeride kalırsa siz çıkabilirsiniz.

{P4}, karşıdaki kendisine bakıyor. Yardım ister gibi duran o yüz, birkaç saat önce sizin yüzünüzdü.

Ağzınızı açıyorsunuz. Uyarmak için hâlâ zaman var. Ama karşıdaki kişi “Burada kalabilir miyiz?” diye soruyor.

Arkanızda asfalt yol beliriyor.

Eliniz, siz karar vermeden, kapıyı biraz daha açıyor.

### E19 — Çocukluğunuzdaki Köy

**Sınıf:** Geçmişin ele geçirilmesi

Vitrinin arkasında bir ev değil, çocukluğunuzun ortaklaşa yeniden yazıldığı bir oda var. Yataklarınız yan yana. Duvarlarda hiç gitmediğiniz okulların karneleri asılı.

Bütün fotoğraflarda aynı köy.

Şehirdeki hayatınız önce bir rüya gibi uzaklaşıyor. Sonra rüya olduğunuza inanıyorsunuz. Yıllarca burada yaşadığınızı, ara sıra dışarıda büyüdüğünüzü sandığınızı kabul ediyorsunuz.

{P2}, kapıdaki boya çizgilerinin boyunu ölçtüğünü görüyor. En üstte bugünün tarihi var. Çizgi insan boyunun çok üzerinde.

Arkanızdaki çocuklardan biri “Ne kadar büyümüşsün,” diyor.

Sonra ışığa yaklaşmasını istiyor. Yüzünü görmek için değil. Hangisinin içinde olduğunu anlamak için.

### E20 — Oylama Bitmedi

**Sınıf:** Anlatı içinde sahte oylama

Ekran “Kurtuldunuz” yazıyor. İsimleriniz sırayla beliriyor. Ardından yazı siliniyor.

Yeni soru:

“Hanginizin eve döndüğüne inanıyorsunuz?”

Dört isim görünüyor: {P1}, {P2}, {P3}, {P4}.

Kimse dokunmuyor. Yine de oy sayıları yükseliyor. Önce bir, sonra iki. Oyların toplamı, grubunuzdaki kişi sayısını geçiyor.

Ekranda bir bildirim daha:

“Önceki misafirler de oy kullanabilir.”

{P1}, kararan ekranın yansımasında arkasındaki kapıyı görüyor. Kendi odasının kapısı. Altından, yukarı doğru akan çamur giriyor.

Son bildirimdeki kelimeler tek tek değişiyor: “Ev sahibi artık siz değilsiniz.”

## 8. Kesin final çözümleyicisi

N20A için aşağıdaki sıra yukarıdan aşağı değerlendirilir. İlk eşleşen final seçilir. Sonraki şartlara bakılmaz. Bu sayede aynı oyun durumu iki finali birden açmaz.

```text
if namesRestored == false: E06
else if memoryLost == true: E02
else if voiceTaken == true: E03
else if guest or mirrored or bargain or borrowedName: E08
else if seal == false or stain > 1: E04
else: E01
```

N20B: `guest=true` ise E09, değilse E12.

N20C: Her durumda E20.

N20D: `mirrored=true` ise E10, değilse E08.

Diğer finaller kendi düğümlerindeki doğrudan hedeflerdir. E08 birden fazla yerde açılabilir. E10 hem çeşme hem son kopya tercihiyle açılabilir. Aynı finalin gövdesi korunur; girişte en son yaşanan seçeneğin sonuç metni zaten bağlamı verir. `{CROSSING_RESULT}` için N20A çözümleyicisi sonucu E01–E04 ise “Çizginin ötesinde zemin sertleşiyor. Son el de eşiği geçtiğinde köyden bir kapı kapanma sesi geliyor.”; E06/E08 ise “Çizgiye bastığınızda grubun arasındaki bir boşluk, gölge gibi uzuyor. Son adımın size ait olup olmadığını anlayamıyorsunuz.” gösterilir.

**Final önceliğinin anlatı karşılığı:** İsimlerini geri almamış grupta bellek/taşıyıcı etkileri tek tek sonlandırılmaz; ana kayıp E06'dır. İsimler alınmışsa kalıcı bellek kaybı E02'yi, o yoksa ses kaybı E03'ü öne çıkarır. Öncelik bir bayrağı temizlemez. Final ekranında yalnız o sona ait metin gösterilir; diğer olası bozukluklar yeni yan hikâye olarak eklenmez.

**Başarı oranı:** 20 sonun dördü “herkesin bedenen çıktığı” sınıftadır; yalnız E01 eksiksiz başarıdır. Bu, kazanma olasılığının otomatik olarak %20 olduğu anlamına gelmez. Gerçek oyuncu davranışları için hedef zor ama çözülebilir bir oyun, yaklaşık %20 tam başarıdır. Bu oran insanlarla deneme sonrasında, ipucu açıklığı ve seçeneğin cazibesi üzerinden dengelenir. Üretimde hikâyeyi sonradan rastgele kaybettirecek gizli %20 zarı kullanma. Aşağıdaki rastgele seçim denemesi yalnız erişim ve yönlendirme doğrulamasıdır, insan başarı tahmini değildir.

## 9. Oda, okuma ve oylama — uygulanacak kesin kurallar

### Oda yaşam döngüsü

- Akış: `LOBBY → READING → VOTING → RESULT → READING ... → ENDING → FINISHED`. Eşitlikte `VOTING → TIE_RESULT → VOTING`; yeni karar düğümü oluşturulmaz.
- Oda kısa kod ve bağlantı/QR ile açılır. 4'ten az veya 10'dan çok oyuncuyla başlatılamaz. Ev sahibi de normal bir oyuncudur; ek oy hakkı yoktur. Oda dışından izleyici yoktur.
- Lobi sırası anlatı kadrosu değildir; `cast` oyun başlangıcında bir kez belirlenir. Oyun başladıktan sonra yeni oyuncu eklenmez. Ayrılan oyuncunun karakteri silinmez, isimler yeniden atanmaz.
- Ev sahibi başlatma ve duraklatma yetkisine sahiptir. Seçenek seçme, eşitliği bozma, oyuncuyu oy dışı bırakma yetkisi yoktur. Ev sahibi bağlantısı düşerse yetki, bağlı oyuncular arasında sunucudaki en erken katılım sırasına devredilir.
- Her oyuncunun sunucunun ürettiği tahmin edilemez bir dönüş anahtarı olur; localStorage ile aynı karaktere döner. Oda kodu tek başına başka oyuncunun kimliğine bürünmeye yetmez. Hesap açmak gerekmez.
- Varsayılan süre sayacı yoktur. Bekleme veya gerçek saat, hikâyede gizli cezaya dönüştürülmez. Gün doğumu N18 sonrası kurgusal olaydır; oyuncular yavaş okuduğu için kaybetmez.

### Okuma ve daktilo

- Paragraflar art arda, varsayılan yaklaşık 28 Unicode grafem/sn hızla görünür. 15/28/45 hız, “tam metni göster” ve hareket azaltma seçenekleri vardır. Türkçe birleşik karakterler parçalanmaz.
- Her sahne/sonuç/final bir içerik sayfasıdır. Kullanıcı yalnız kendi sayfasını hızlandırabilir. “Okudum” butonu metni tam açar ve hazır bildirir. Diğerlerinin metnini atlatmaz.
- İlerlemeden önce kadrodaki bütün oyuncular o sayfaya hazır olmalıdır. Sunucu `pageId`, `startedAt`, içerik sürümü ve hazır oyuncu ID'lerini tutar. Yalnız istemci saatine güvenilmez. Bağlantısı kopanın hazır durumu eski sayfadan taşınmaz.
- Soru ve dört seçenek, sahne/katkı metni herkes için tamamlanınca açılır. Teknik “Şu an {x}/{N} kişi okudu” göstergesi gerçek veridir; korku efekti uğruna yanlış sayı gösterilmez.
- Önceki okunmuş sahneler “Gecenin notları” çekmecesinde yeniden okunabilir. Gelecek sahne, seçenek efekti, final haritası veya gizli durumlar bu çekmecede görünmez.
- Sesler opsiyonel, kısa ve düşük yoğunlukta; ani aşırı yüksek ses yok. En fazla atmosferik rüzgâr, tahta, kalem, uzak adım. Varlığı ses kapalıyken de anlamak mümkün olmalı. Titreşim ayrıca açılır.

### Oylama

1. Sunucu `nodeId`, `voteRound`, `eligibleOptionIds`, `phaseVersion` ve sabit kadro ID'leriyle tur açar. İlk turda A/B/C/D vardır.
2. Her oyuncu bir oy verir. Gönderimden önce seçim değişebilir; sunucu onayıyla oy kilitlenir. Tur kapanana kadar tek tek kim ne seçti veya canlı dağılım gösterilmez. Yalnız kaç kişinin oy verdiği gösterilir.
3. Kadrodaki N oyuncunun N geçerli oyu gelince tur atomik kapanır. En çok oy alan tek seçenek varsa o kazanır. Örnek: 4 kişide 2–1–1–0 dağılımında iki oy alan seçilir.
4. En yüksek sayıyı paylaşan seçeneklerin tamamı tekrar turuna kalır. Genellikle iki seçenek; 6 kişide 2–2–2–0 olursa üçü, 4 kişide 1–1–1–1 olursa dördü tekrar oylanır. Böylece kullanıcının iki seçenek eşitliği kuralı bütün kadro boylarına tutarlı uygulanır.
5. Oylar temizlenir, `voteRound += 1`; yalnız eşit kalan seçenekler aktiftir. Kadrodaki herkes yeniden oy verir. İlk turda elenen seçenek sonradan geri gelemez. Tekrar turunda yeniden eşitlik çıkarsa yine yalnız yeni en yüksek eşitler kalır.
6. Eşitlik kaç tur sürerse sürsün otomatik kura, ev sahibi oyu, zaman aşımı, alfabe sırası veya gizli ağırlık kullanılmaz. Sunucu bekler. Teknik tur üst sınırı konmaz; tur geçmişi sayfalı tutulabilir.
7. Karar bulunduğunda yalnız bir `decisionResolved` işlemi oluşur. Etkiler tam bir kere işlenir; özgün sonuç metni sunulur. Sonra herkes okudum deyince hedefe geçilir.

**Dört seçenek şartı:** Her karar düğümünün ilk turunda dört seçenek vardır. Eşitlik tekrarında yalnız kalan 2/3/4 seçenek gösterilir. Bu tekrarlar yeni hikâye kararı veya 21. düğüm sayılmaz.

### Kopma ve bekleme

4–10 kişilik anlatı kadrosu oyun boyunca sabittir. Bir kişi koparsa o sayfada/oylamada beklenir. Adı “Bağlantı bekleniyor” olarak görünür; karakteri ölmez. Önceden o tur için kilitlediği oy korunur. Eski turdan oy devralınmaz. Kalıcı ayrılmada ev sahibi yalnız odadan vazgeçebilir veya aynı kadroyla sonra devam edebilir; o kişinin yerine oy veremez. İleri sürümde kadro küçültme istenirse ayrı ürün kararı gerekir. Bu sürümde dört kişinin altına düşerek devam yoktur.

### Sahte oylama sınırı

E20'deki artan oylar yalnız işaretli final animasyonu katmanıdır. Gerçek oy motoruna, katılımcı listesine veya veritabanındaki oylara yazılmaz. Kartın üstünde küçük “Final sahnesi” etiketi kalır; bittiğinde normal bitiş ekranına dönülür. Cihaza izinsiz erişim, rehber fotoğrafı, gerçek arama veya bildirim izni kullanılmaz. Hikâyedeki EV araması uygulamanın içindeki bir görseldir.

## 10. Ekranlar ve görsel dil

1. **Ana ekran:** Oyun adı, iki cümle tanıtım, Oda Kur/Odaya Katıl, ses/hareket ayarları.
2. **Lobi:** Oda kodu, QR, oyuncu adları, 4–10 kişi koşulu, kısa amaç ve kurallar, ev sahibi Başlat.
3. **Hikâye:** Siyah-kömür zemin, kirli kırık beyaz metin, sınırlı koyu kırmızı vurgu. Ortalanmış değil, sola hizalı okunaklı metin. Metin alanı yaklaşık 60–70 karakter satır uzunluğu, mobilde ekran kenarında boşluk. En az 18 px metin ve yaklaşık 1.6 satır aralığı. Daktilo için monospace benzeri başlık olabilir, uzun metin gözü yormayan fontla okunabilir.
4. **Karar:** Soru üstte, dört büyük dikey kart; A/B/C/D ile erişilebilir etiket. Seçince belirgin çerçeve, ardından Oyumu Kilitle. İstemci sunucu onayını görmeden “oy verildi” saymaz.
5. **Eşitlik:** “Karar çıkmadı. Şu seçenekler yeniden oylanıyor.” Gerçek dağılım ve yeni tur. Hikâye metni veya ceza değişmez.
6. **Sonuç:** Kazanan seçenek ve toplam oy dağılımı, kimliksiz. Ardından seçilen sonuç paragrafı daktiloyla.
7. **Final:** Ad, final metni ve spoiler açılır paneli. “Bu gece ne oldu?” panelinde yalnız kendi seçtiğiniz yol ve finali etkileyen kritik hatalar gösterilir. Başkalarının oy kimliği açıklanmaz. Diğer 19 finalin tam metni otomatik açılmaz.
8. **Yeniden oyna:** Önce yeni lobiye döndürür, kadroyu yeniden onaylar, yeni oyun ID'si ve temiz durum oluşturur. E17 anlatısı kendi kendine yeni gerçek oturum başlatmaz.

Mekanik pencereler korku uğruna kaybolmasın. Duraklat, sesi kapat ve çıkış kontrolleri her zaman erişilebilir olsun. Sahte kamera veya dosya izni isteme. Görsel asset olmadan da bütün oyun tamamlanabilir. İsteğe bağlı görseller basit doku ve mekân silüetleridir; oyuncuların fotoğrafı gerekmez.

## 11. Teknik mimari ve veri sözleşmesi

Claude mevcut projeye uyarlayabilir. Sıfırdan yapılacaksa TypeScript, React tabanlı mobil uyumlu arayüz, Node.js sunucu, WebSocket ve kalıcı SQLite başlangıç için yeterlidir. Birden çok sunucu örneğine geçilecekse ortak PostgreSQL ve paylaşımlı pub/sub gerekir. Bellekte çalışan tek oda nesnesi üretimde tek kayıt kaynağı olamaz. Hikâye ve görseller uygulamayla paketlenir. Gerçek zamanlı dış LLM çağrısı yoktur; isimler deterministik şablondan yerleşir. Geliştirme ve barındırma Emergent'tan bağımsızdır. Barındırmanın ücretsiz olacağı taahhüt edilmez.

### İçerik şeması

```ts
type EndingId = `E${string}`;
type NodeId = `N${string}`;
type State = {
  stain: number; rule: boolean; forgeryKnown: boolean;
  proof: boolean; anchor: boolean; namesCounted: boolean;
  seal: boolean; exitPrepared: boolean; namesRestored: boolean;
  guest: boolean; voiceTaken: boolean; borrowedName: boolean;
  memoryLost: boolean; mirrored: boolean; bargain: boolean;
};
type Effect = Partial<State> & {
  resolveNames?: true; routeEnding?: 'cross'|'car'|'copy';
}; // stain bu nesnede delta; diğer State alanları atama.
type Option = {
  id:'A'|'B'|'C'|'D'; label:string; result:string;
  effects:Effect;
  next:NodeId|EndingId|'ROUTE_CROSS'|'ROUTE_CAR'|'ROUTE_COPY';
};
type StoryNode = {
  id:NodeId; title:string; text:string; question:string;
  options:[Option,Option,Option,Option];
};
type Ending = {id:EndingId; title:string; classification:string; text:string};
```

**Metin çıkarma:** Aşağıdaki sahnelerin “Oyuncuya gösterilecek metin”, “Soru”, “A/B/C/D seçeneği” ve “Sonuç” alanlarını birebir içerik dosyasına aktar. Efekt/sonraki hedef satırları oyuncuya gönderilen metin değildir. JSON efekti içindeki sayılar yukarıdaki delta kuralıyla işlenir. Boş `{}` değişiklik yok demektir.

### Oyun kaydı

`gameId, contentVersion, roomCode, cast[playerId,displayName], hostId, phase, phaseVersion, currentNodeId, currentPageId, nodeEntryState, state, readyPlayerIds, voteRound, eligibleOptionIds, votesByPlayerId, decisionLog, endingId, createdAt, updatedAt` kalıcı saklanır. `decisionLog` her kararın düğümünü, kazanan seçeneğini, tur sayılarını, anonim oy dağılımını, önceki/sonraki durumunu ve hedefini tutar. Oy tercihleri diğer oyunculara kimlikle yayınlanmaz. Tek bir oyun kaydına erişim oda katılımcı anahtarıyla yetkilendirilir. Bütün hikâye veri dosyasının istemcide olması teknik olarak spoiler incelemesine izin verir; normal arayüzde spoiler yoktur. Daha sıkı spoiler önleme istenirse yalnız mevcut sahne sunucudan gönderilir.

### Sunucu işlemleri

- `createRoom`, `joinRoom`, `startGame`, `resumeSession`, `markReady`, `castVote`, `pauseGame`, `requestSnapshot`, `returnToLobby` olayları için açık şema ve sunucu doğrulaması yaz.
- Her yazma isteği `gameId + phaseVersion + requestId` taşır. Aynı isteğin tekrarı aynı yanıtı döndürür. Geçersiz düğüm/tur/seçenek veya yabancı oyuncu reddedilir.
- Tur kapanması ve durum değişimi tek veritabanı işlemi/oda kilidi altında yapılır. Aynı anda gelen son iki oy iki kez sahne ilerletmez.
- Sunucu yeniden başladığında güncel sayfa ve kilitli oylar geri gelir. `nodeEntryState`, sonuç metni tekrar üretilirken efektif durumu yanlış zamanda uygulamayı önler. Yalnız RESULT aşamasında olmak efekti ikinci kez işleme nedeni değildir.
- Reconnect, sunucunun tam snapshot'ını getirir. Daha eski istemci olayı yeni snapshot'ı ezemez. Mesaj sıralaması `phaseVersion` ile korunur.
- Adlarda XSS kaçışını, oda denemelerine basit oran sınırını ve katılımcı token'larının loglara açık yazılmamasını uygula. Üçüncü taraf izleme gerekmiyor.

### Geliştirme sırası

1. Metinleri içerik dosyasına aktar; bütün ID'leri, placeholder'ları ve 20/80/20 sayılarını doğrula.
2. Saf fonksiyonlarla efekt ve final çözümleyicisini yaz. Belgedeki erişim yollarını test et.
3. 4–10 sahte istemciyle oda, hazır olma, oy, eşitlik ve kopma motorunu doğrula.
4. Mobil ekranları ve daktiloyu ekle. Okuma motorunu gerçek oy motorundan ayır.
5. Kayıt, yeniden bağlanma, sunucu restart ve idempotency testlerini bitir.
6. Türkçe son okuma ve gerçek cihaz denemesi yap; kurulum ve çalıştırma komutlarını README'ye yaz.

## 12. Kabul testleri

### Hikâye

- Tam 20 benzersiz N düğümü, her birinde dört benzersiz A–D seçeneği, tam 20 benzersiz E finali bulunur. Toplam 80 sonuç paragrafı boş değildir.
- Bütün doğrudan ve yönlendiricili hedefler mevcuttur. Karar grafiğinde anlatısal döngü yoktur; E17 terminaldir. Oylama döngüsü ayrı sistemdir.
- Her düğüm ve final en az bir yoldan erişilir. E01 yalnız belirtilen koşullarla açılır. N19B geçiş hazırlasa bile isimleri mühürlemez.
- 4/5/6/7/8/9/10 kadro boyunda yerleştirme hatasızdır. P1–P4 farklıdır; FOCUS ile PARTNER farklıdır. Hiçbir placeholder ekranda süslü parantezle kalmaz.
- Tümü aynı cinsiyet adlarıyla ve cinsiyetsiz takma adlarla bütün metinler anlamlıdır. Hiçbir sahne çift ilişkisi veya zorunlu aile bağı gerektirmez.
- Kestirmeler N03/N05/N08'deki kazanımları otomatik vermez. Bayrak temizleme ve stain alt/üst sınırı doğru çalışır.
- E20 kurmaca oyları gerçek `votesByPlayerId` alanını değiştirmez. E05/E07/E08/E06'da LOST P2 olur; P1 tek hatırlayanla çakışmaz.

### Çok oyunculu

- 3 oyuncuyla başlatma ve 11. katılımcı engellenir. 4 ve 10 kişiyle oyun tamamlanır.
- 4 kişide 2–1–1–0 tek kazanan, 2–2–0–0 tekrar, 1–1–1–1 dört seçenekli tekrar oluşturur.
- 6 kişide 2–2–2–0 üç seçenekli tekrar; 10 kişide 4–4–1–1 iki seçenekli tekrar olur.
- Önceki turda elenen seçenek tekrar oyunda kullanılamaz. 20 eşitlik turu üst üste sürse de hikâye ilerlemez ve otomatik kazanan seçilmez.
- Ev sahibi ve diğerleri eşit birer oya sahiptir. Aynı token ile iki sekmeden oy vermek iki oy oluşturmaz. Eski tur oyu yeni turda kabul edilmez.
- Oy vermeyen kopmuş oyuncu için oyun bekler. Verilmiş oy reconnect'te korunur. Aynı son oy iki kez gönderilse de karar, efekt ve sonraki düğüm yalnız bir kere oluşur.
- Oyuncu “tam metin” seçince başkalarının metni atlanmaz. Bütün oyuncular hazır olmadan seçenekler açılmaz. Sonuç sayfası da herkes okunmadan atlanmaz.
- Sunucu RESULT ve VOTING aşamalarında yeniden başlatılır; kayıtlı durumla doğru devam eder.

## 13. Son söz — uygulamada korunacak tasarım

Korku yalnız bir sıçrama efekti değildir. Önce tanıdık bir şeyin küçük bir ayrıntısı bozulur, ardından oyuncular o ayrıntıya güvenmek zorunda kalır. Her önemli kural, onu gerektiren karardan önce yazı, davranış veya fiziksel çelişkiyle gösterilir. Bedelli sonlar, rastgele ceza değil, yapılan işlemin devamıdır. “Birini bırakıp çoğunluğu kurtarmak” gerçek başarı değildir. Oynayan kişi kaybettiğinde kendisine hile yapıldığını değil, o an neden kandığını anlamalıdır.

## Ek A — Geçiş tablosu

Aşağıdaki tablo ayrıntılı sahne kayıtlarının özeti; farklı bir mekanik eklemez.

| Düğüm | A | B | C | D |
|---|---|---|---|---|
| N01 | N02 | N02 | N02 | N02 |
| N02 | N03 | N04 | N03 | N03 |
| N03 | N04 | N04 | N04 | N04 |
| N04 | N05 | N05 | N06 | N05 |
| N05 | N06 | N06 | E13 | E15 |
| N06 | N07 | N07 | N07 | N07 |
| N07 | N08 | N08 | N09 | E10 |
| N08 | N09 | N09 | N09 | N09 |
| N09 | N10 | N10 | N10 | N10 |
| N10 | N11 | N11 | E14 | N11 |
| N11 | N12 | N12 | N12 | N12 |
| N12 | N13 | E11 | N13 | N13 |
| N13 | N14 | E07 | N14 | E05 |
| N14 | N15 | N15 | N15 | N15 |
| N15 | N16 | N16 | E16 | N16 |
| N16 | N17 | E19 | N17 | N17 |
| N17 | N18 | N18 | N18 | E18 |
| N18 | N19 | E17 | N19 | N19 |
| N19 | N20 | N20 | N20 | N20 |
| N20 | ROUTE_CROSS | ROUTE_CAR | E20 | ROUTE_COPY |

## Ek B — Erişilebilirlik kanıtı ve örnek yollar

Bütün hedefler, dört seçenek şartı ve ileri yönlü bağlantılar içerik oluşturma aşamasında kontrol edildi. Sabit tohumla 250.000 rastgele seçim yürüyüşünde 20 düğüm ve 19 finale ulaşıldı. E01, ayrıca açıkça tanımlanan doğru karar yolu ile doğrulandı. Böylece 20 finalin tamamına giden birer yol bulundu ve aşağıdaki yollar aynı deterministik çözümleyicide yeniden oynatıldı. Rastgele denemelerde hiç E01 çıkmaması insanlarla ipuçlarını okuyarak oynanan oyunun başarı oranını ölçmez; buna rağmen hedef zorluğun gerçek oyuncularla mutlaka denenmesi gerektiğini gösterir. Bu kontrol çok oyunculu yazılımın test edildiği anlamına gelmez; henüz uygulama yoktur. `N01A`, N01 düğümünün A seçeneği demektir.

- **E01:** N01A → N02A → N03A → N04B → N05B → N06A → N07A → N08A → N09A → N10A → N11A → N12A → N13A → N14A → N15A → N16A → N17A → N18A → N19A → N20A.
- **E02:** N01C → N02B → N04C → N06B → N07C → N09A → N10D → N11C → N12D → N13A → N14B → N15B → N16A → N17B → N18A → N19A → N20A.
- **E03:** N01B → N02B → N04C → N06D → N07A → N08B → N09A → N10B → N11A → N12D → N13C → N14B → N15B → N16A → N17C → N18A → N19A → N20A.
- **E04:** N01D → N02B → N04C → N06A → N07C → N09C → N10A → N11C → N12A → N13A → N14D → N15A → N16A → N17C → N18A → N19A → N20A.
- **E05:** N01D → N02B → N04C → N06A → N07C → N09A → N10A → N11A → N12C → N13D.
- **E06:** N01C → N02B → N04C → N06D → N07C → N09C → N10B → N11B → N12C → N13A → N14B → N15A → N16A → N17C → N18A → N19B → N20A.
- **E07:** N01D → N02B → N04C → N06C → N07C → N09D → N10A → N11D → N12C → N13B.
- **E08:** N01A → N02B → N04C → N06B → N07C → N09C → N10D → N11B → N12A → N13A → N14A → N15B → N16A → N17A → N18C → N19C → N20D.
- **E09:** N01D → N02B → N04C → N06A → N07C → N09C → N10B → N11B → N12D → N13A → N14C → N15A → N16D → N17B → N18A → N19B → N20B.
- **E10:** N01C → N02B → N04C → N06B → N07D.
- **E11:** N01B → N02B → N04C → N06A → N07C → N09B → N10D → N11A → N12B.
- **E12:** N01C → N02B → N04C → N06C → N07C → N09D → N10B → N11B → N12D → N13A → N14A → N15D → N16A → N17B → N18C → N19B → N20B.
- **E13:** N01B → N02B → N04A → N05C.
- **E14:** N01D → N02B → N04C → N06D → N07C → N09A → N10C.
- **E15:** N01A → N02B → N04B → N05D.
- **E16:** N01A → N02B → N04C → N06C → N07C → N09C → N10A → N11C → N12C → N13A → N14B → N15C.
- **E17:** N01D → N02B → N04C → N06C → N07C → N09B → N10A → N11B → N12A → N13C → N14D → N15A → N16A → N17B → N18B.
- **E18:** N01D → N02B → N04C → N06C → N07C → N09D → N10A → N11C → N12C → N13A → N14A → N15A → N16A → N17D.
- **E19:** N01A → N02B → N04C → N06C → N07C → N09B → N10A → N11A → N12A → N13A → N14A → N15D → N16B.
- **E20:** N01B → N02B → N04C → N06B → N07C → N09B → N10D → N11C → N12C → N13A → N14C → N15B → N16C → N17B → N18C → N19C → N20C.

## Ek C — Final yönünü değiştiren durum örnekleri

- N20A: `namesRestored=false` ise diğer bayraklardan bağımsız E06.
- N20A: isimler geri alınmış, bellek kaybı var, ses kaybı da var → E02.
- N20A: isimler geri alınmış, bellek sağlam, yalnız ses kaybı var → E03.
- N20A: isimler geri alınmış, bellek/ses sağlam, arada misafir var → E08.
- N20A: isimler geri alınmış, taşıyıcı bayraklar temiz, mühür yok → E04.
- N20A: isimler geri alınmış, taşıyıcılar temiz, mühür var, stain=2 → E04.
- N20A: isimler geri alınmış, taşıyıcılar temiz, mühür var, stain=0 veya 1 → E01.
- N20B: aynı temiz durumda bile aracı seçmek E12; yürüyerek eşiği geçmekle aynı değildir.

**Tek dosyalık teslim:** Bu belgenin tamamını Claude'a ekle ve 1. bölümdeki görevi uygulat. Yalnız özeti veya final listesini verme; efektler, çözümleyici ve oylama kuralları da uygulamanın parçasıdır.
