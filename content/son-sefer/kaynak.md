# SON SEFER
## Hikâye 2 — Claude için tam senaryo ve uygulama dosyası

**Sürüm 1.0 • Dil Türkçe • Kadro 4–10 kişi • 20 ana karar • 80 eylem • 20 final • 8 özel ölüm jumpscare'i**

Bu, aynı telefonla ortak oylama oyununun ikinci, bağımsız hikâyesidir. İlk hikâye “Adın Kimde Kaldı?” korunur. Menüde iki ayrı hikâye kartı bulunur. Birinci hikâyenin ölüm içermeyen mekanikleri bu hikâyeye zorla taşınmaz; ikinci hikâyenin ölüm sistemi de birinciyi değiştirmez. Ortak oda, isim, daktilo, kayıt ve oylama altyapısı yeniden kullanılabilir. Hikâye kimliği `son_sefer`, içerik sürümü `1.0`, düğümler `S2_N01..S2_N20`, finaller `S2_E01..S2_E20`.

Bu belge oyuncuya gösterilecek sahne, eylem ve sonuç metinlerini; teknik efektleri, görev seçimlerini, kalıcı ölümleri ve kesin final kurallarını birlikte verir. Pakette ayrıca aynı içeriğin makinece okunabilir `story.json` dosyası, sekiz görsel ve sekiz özgün sentetik ses efekti vardır. Metinler geliştirme sırasında özetlenmemeli ve rastgele yeni kurallarla değiştirilmemelidir.

## 1. Claude'a verilecek görev

> Mevcut ortak oylamalı korku oyununa SON SEFER isimli ikinci hikâyeyi ekle. İlk hikâyeyi ve kayıtlarını koru. Menüden hikâye seçimi olsun. Bu dosyadaki bütün sahneleri, 80 eylemi, görevli seçimini ve 20 finali uygula. `story.json` hazır içeriktir; çalışma sırasında LLM çağrısıyla yeni hikâye üretme. Her ana düğümde dört eylem vardır. Grup önce eylemi, gerekiyorsa sonra bu eylemi yapacak yaşayan kişiyi veya iki ayrı kişiyi oylar. En yüksek oy eşitliğinde yalnız en yüksek eşit adaylarla, çözülene kadar yeniden oylama yapılır. Ölümler kalıcıdır. Ölen oyuncu fiziksel görevlere aday olamaz ama oylamalara ve ölüye özel anlatıma devam eder. Sekiz görsel ve ses yalnız ölen kişinin cihazındaki ölüm olayıyla gösterilir; diğerlerine jumpscare veya korku sesi gönderilmez. Bütün anlatı ve karar durumu sunucu otoritesinde, kayıtlı ve yeniden bağlanabilir olsun. Önce içerik/durum motorunu, sonra oda/oylama/özel olayları, ardından mobil ekranları yap. Bu dosyanın kabul testlerini uygula. Yeni ücretli Emergent veya hikâye üretimi bağımlılığı ekleme. Kurulum, yerel çalıştırma ve dağıtım adımlarını teslim et.

## 2. Lobi — oyuncuya gösterilecek tanıtım

Bir kıyı gezisinden dönen arkadaş grubusunuz. Sizin için ayrılmış, grubunuza yetecek büyüklükte küçük bir yolcu teknesindesiniz. Gece motor duruyor. Kaptan kayıp. Telsizden gelen ses, içinizden birini aşağı çağırıyor.

Kıyıda bir deniz feneri var. Işığı arada yanıp sönüyor. Oraya ulaşıp gerçek yardım hattını açabilirseniz çıkabilirsiniz. Ama sizi yardım etmek için çağıran her ses insan değil.

**Amaç:** Gün doğmadan gerçek kıyıya ulaşın. En az bir kişiyi kurtarabilirsiniz. Herkesi kurtarmak en büyük başarıdır.

Bir eyleme birlikte karar verin. Gerektiğinde onu kimin yapacağını da birlikte seçin. Yorgunluğu, ekipmanı ve gördüğünüz uyarıları dikkate alın. Yanlış kararlar karakterleri öldürebilir. Ölen oyuncu bu gecenin seslerinden birine dönüşerek oy vermeye ve bilgi paylaşmaya devam eder.

**Başlamadan:** Bu hikâyede ölüm anlarında aniden açılan korku görselleri ve kısa sesler vardır. Bunlar yalnız ölen kişinin kendi telefonunda gösterilir. Ses düzeyi ayarlanabilir; ses ve jumpscare kişisel ayarlardan kapatılabilir. Kapalıysa ölüm ve oyun kuralları değişmez, onun yerine sade ölüm kartı görünür. Görselleri kapatmak bir avantaj sağlamaz.

### Kısa oyun kuralları — oyuncuya göster

1. Ana hikâye kararında dört eylemden birine oy verirsiniz. En çok oy alan uygulanır; yüzde 50'yi aşması gerekmez.
2. Görev gerekiyorsa yaşayan kişiler arasından görevli seçersiniz. Bazı işlerde iki farklı görevli seçilir.
3. Eşitlikte yalnız eşit kalan en yüksek seçenek veya kişiler tekrar oylanır. Kura ve ev sahibi ayrıcalığı yoktur.
4. Ölüm geri alınmaz. Ölenler oy verir, bilgi aktarır; fiziksel görevlere gidemez.
5. Bir kişi sağ kaldığında hikâye devam eder. Herkes öldüğünde son gösterilir.
6. Gerçek zaman sınırlaması yoktur. Yavaş okumak karakteri öldürmez. Gün doğumu hikâyenin içinde ilerler.

## 3. Yazara ve geliştiriciye özel ana kurgu

### Geçmiş ve tehdit

Kıyı ve fener kurgusaldır; Ege kıyısının taş servis iskelesi, sert rüzgâr, küçük yolcu teknesi ve eski bakım yapıları temel alınır. Gerçek bir deniz kazası, kurum veya yerleşim suçlanmaz. 1967'de fener önünde batan tekneden gelen yardım çağrısı alınmış, fakat kurtarma gönderilmemiş ve rapora “Çağrı alınmadı” yazılmıştır. Kayıt silinmediği için hat tamamen kapanmamıştır.

Denizdeki varlık boğulan kişiler değildir. Yıllarca açık kalan, duyulduğu inkâr edilen hattı bir geçit gibi kullanır. Acı çeken gerçek sesleri kopyalar veya onların son kelimelerine kendi talimatını ekler. Kendi sesi yoktur. İnsan bedenini de tam bilmez. İlk başta iki elini teknenin iki ucuna koyar; sonra parmakları, ayakları, kapı kolunu ve sonunda insanlar gibi yürümeyi öğrenir.

Çalışma adı **Dipteki**. Oyun içinde ansiklopedi açıklaması veya canavar monoloğu yoktur. İnsanların beden, basınç, ışık, cam ve ses tutarsızlıklarından onu anlaması beklenir. Görseller sekiz ayrı yaratık ırkı değildir; aynı tehdidin farklı yaklaşma biçimleridir.

### Kurallar ve önceden verilen ipuçları

| Kural | Önce nerede görülür | Sonra neyi etkiler |
|---|---|---|
| Tanıdık ses kimlik kanıtı değildir | N01 kaptanın iki çelişik sesi | Telsiz, kapı, son kurtarma |
| Güvenli kapatma, ana motoru körlemesine çalıştırmaktan önce gelir | N01 kayıt, N03 sarı etiket | Tekneyle final |
| Suya eğilmek ile kuru taraftan ekipman almak farklıdır | N02 plan, N05 vinç etiketi | Kişisel ölüm riskleri |
| Ses taklit edilebilir, basınç ve sabit kayalar aynı şekilde değişmez | N04 yazı, N06 üç taş | Pompa, rota, gerçek kıyı |
| Gerçek yanıt son iki vuruşu değiştirir | N07 çizelge, N09 yeniden öğrenme | N18 doğrulama |
| Yardım çağrısının alınmış olduğuna tanıklık etmek gerekir | N08 kayıt, N10 karbon nüsha | Gerçek kurtuluş |
| Yaşayan bedenle araya sızan su izi kuru sınırda ayrılabilir | N11 izler, N14 bakım talimatı | Bulaşmanın temizlenmesi |
| Çıplak merceğe bakılmaz; koruma ve referans kullanılır | N16 talimat, N17 not | Işık ve optik ölüm |
| Birini bedel olarak bırakmak gerekmez | N19 mekanik fren | Gereksiz ölüm ve final özeti |

Önemli ölümcül seçenekler, karar öncesi sahnede anlaşılabilecek uyarılar taşır. Kimi göndereceğiniz ölümcül bir zarla belirlenmez. Aynı durum + aynı eylem + aynı görevli = aynı sonuç. Güvenli yollar, önceki küçük hataları telafi edebilir. N17A enerji ve mercek hizasını geç tamamlamak için bilinçli bir kurtarma fırsatıdır. N14C teknenin başından taşınmış bulaşmayı temizleyebilir.

### Bölümler

- N01–N05: Durmuş tekne, ilk sesler, ekipman, motor ve filika.
- N06–N10: Gerçek rota, cevap örüntüsü ve 1967'deki inkârın kanıtı.
- N11–N15: Fener, öğrenilen insan hareketleri ve kuru geçiş sınırı.
- N16–N20: Mercek, gerçek çağrı, son iniş ve 20 finalden biri.

Yaklaşık süre 40–70 dakika; görevli oylamaları, okuma ve sınırsız eşitlikler süreyi uzatabilir. İçerik 20 ana karar noktasıdır; görevli alt oylamaları ve eşitlik tekrarları yeni hikâye düğümü sayılmaz. Bu sürümde bütün normal devamlar sıradaki düğüme gider; özgün sonuç paragrafları, kişisel kayıplar ve kalıcı durumlar o ortak noktada birleşir. Erken sonlar vardır. Her oynayışta 20 karar görmek zorunlu değildir.

## 4. Karakterler ve dinamik isimler

### Oyuncu kadrosu

4–10 oyuncu aynı arkadaş grubunun üyeleridir. Cinsiyet, meslek, aile bağı, sevgili ilişkisi veya yaşa özgü rol gerekmez. İsimler yalnız görünen addır; gerçek ad istenmez. Oyun hiçbir rehber, fotoğraf, kamera, mikrofon veya konum verisine erişmez. İsimler 2–20 Unicode grafem olacak biçimde normalize edilir, oda içinde Türkçe uyumlu büyük/küçük harfe duyarsız tekillik sağlanır ve HTML kaçırılır.

Başlangıçta sunucu kadroyu bir kez karıştırarak sabit `cast` sırasını kaydeder. Oyun sırasında sıra veya ad değişmez. Ölüm, kadrodan çıkarma değildir: `alive=false` yapılır. Oyuncu aynı ID ve oturumla odaya bağlı kalır. Yeniden oyunda bütün bu durumlar sıfırlanır. Yeni oyuncu oyun ortasında katılamaz.

### İsim şablonları

| Değişken | Kesin anlam |
|---|---|
| `{FOCUS}` | Düğüme girişte hayatta olanlar arasından `cast` sırasıyla, `(nodeNumber-1) % livingCount` konumundaki kişi. Fiziksel sahnede ölü bir kişi seçilmez. |
| `{A}` | O eylemin seçilmiş birinci görevlisi. Görev olmayan eylemde kullanılmaz. |
| `{B}` | İki görevli varsa ikinci görevli. Bu sürümün sonuç metinleri B'ye mecbur değildir; rol ekranında iki ad görünür. |
| `{N}` | Başlangıç kadrosu sayısı. Asla sağ kalan sayısıyla değiştirilmez. |
| `{ALL_NAMES}` | Başlangıç kadrosundaki bütün isimler. |
| `{ALIVE_NAMES}` | İçerik sayfasının snapshot'ındaki yaşayanların isimleri; yoksa “Kimse”. |
| `{DEAD_NAMES}` | Aynı snapshot'taki ölenlerin isimleri; yoksa “Henüz kimse”. |
| `{ALIVE_COUNT}` | Aynı snapshot'ta hayatta kalan sayısı. |
| `{LAST_ALIVE}` | Finalde hayatta kalan ilk kişi; tek sağ kalan varsa o kişi. Canlı kimse gerektirmeyen finallerde bu değişken kullanılmaz. |
| `{ARRIVAL}` | N11'e özel, aşağıda tanımlanan ulaşım paragrafı. |

Türkçe ekleri adlara yapıştırma. Görev ve odak adları karar kaydında snapshot olarak saklansın; görevli ölünce sonuç paragrafındaki `{A}` başka birine dönüşmesin. Bir sonraki sahnede yeni FOCUS yalnız yaşayanlardan seçilsin. Ölü oyuncunun ortak sayfalarında üstte küçük “Bu sahne hayatta kalanları anlatıyor” etiketi bulunsun. Anlatıcının “siz” sözcüğü her zaman fiziksel olarak yaşayan gruba hitap eder; ölü oyuncu bu sahneyi okuyan katılımcıdır.

**Ek görünürlük:** Dört kişiden fazla kadroda, her normal sahnenin başlığının altında `Bu bölümün odağı: {FOCUS}` ve görev sonucu kartında görevli adları görünür. Böylece ilk dört kişi sabit kahraman olmaz; 4–10 kişinin tamamı ana yolda odak veya görevli olabilir. Bir oyuncunun erken ölmesi hâlinde sonraki fiziksel odak hakkı korunmaz, ölü anlatısı başlar.

### N11 ulaşım varyantı — yalnız biri gösterilir

1. `lifeRaft && chart`: “Kontrollü indirdiğiniz servis filikasıyla üç sabit kayanın arasından geçiyorsunuz. Yakıt yetiyor. Kıyı, haritada olduğu yerde kalıyor. Fenerin iskelesi artık hemen önünüzde.”
2. Değilse `engineSafe && chart`: “Güvenli bakım hattından motoru kısa ve kontrollü çalıştırarak tekneyi servis iskelesine yaklaştırıyorsunuz. Fenerin altındaki kılavuz zinciri tekneyi tutuyor. Gerçek kıyıya ulaştınız.”
3. Diğer durumlar: “Tekne ya da hazırladığınız filika, akıntıyla fener kayalığına sürükleniyor. Bu, güvenli bir rota bulduğunuz anlamına gelmiyor. Kıyıya sizin gitmenizden çok, aşağıdaki şeyin sizi oraya istemesine benziyor. Servis iskelesinin üstüne çıkıyorsunuz.”

Üçüncü varyantta normal teknenin üstündeyseniz, kayalığa yaslanan gövdeden servis basamağına çıkılır. Filika varsa ama rota yoksa akıntı onu aynı yere getirir. Filika hiç hazırlanmamışken kendiliğinden envantere eklenmez. Tekne sonraki finalde tekrar ulaşılabilecek şekilde dış iskeleye bağlı kalır. Harita ve motorun güvenli oluşu, son kaçışın sonucunu yine etkiler.

## 5. Görev, yorgunluk ve ölüm motoru

### Görevli seçme

Her eylem `taskCount:0,1,2` taşır. 0 ise eylem oylaması sonuçlanınca hemen çözülür. 1 ise herkes yaşayan adaylardan bir birinci görevli seçer. 2 ise önce birinci, sonra ondan farklı ikinci görevli seçilir. İkinci turda birinci aday listeden çıkarılır. Yaşayanların hepsi adaydır; ev sahibi veya son görevli özel yetki taşımaz.

**Seçmenler:** Başlangıç kadrosundaki bütün oyuncular, ölüler dâhil, hem eylem hem görevli oylamalarına katılır. Böylece ölen oyuncu birlikte oynamayı sürdürür. Aday havuzu yalnız yaşayanlardır. Seçim bir karakterin yaşamını riske sokabilir; lobi bunu açıklar. Göreve gönderilen kişi ayrıca veto hakkı almaz. Bütün katılımcılar aynı oyun kurallarına tabidir.

**Bir kişi sağ kalmışsa:** `taskCount:1` otomatik o kişiye atanır. `taskCount:2` tek görevlili sürüme dönüşür; her iki kişilik eylemde `soloBrief` hazırdır. Mekanik mandal, depolamalı dinamo veya kilitli tutamakla aynı işi yapar. Ölü karakter fiziksel yardımcı olarak yazılmaz. Aday tek ise gereksiz isim oylaması açılmaz. Eylemin kendisindeki tehlike ve yorgunluk koşulları yine geçerlidir. Sıfır yaşayan varsa yeni görev açılmaz; uygun final çalışır.

**Görev ekranı:** İş tanımı, ekipman durumu ve adayların yorgunluğu açık gösterilir. `taskBrief` oyuncuya gösterilebilir; teknik case JSON'u ve final ID'leri gösterilmez. Bazı brief'lerde ölüm riskinin açık yazılması bilinçlidir: yorgunluktan kaynaklanan teknik riski oyuncudan saklamayacağız. Diğer anormal tehlikeler sahne ipuçlarından anlaşılır.

### Yorgunluk

Her oyuncu 0/1/2 yorgunlukla başlar; başlangıç 0. Görünen etiketler “Dinç / Yorulmuş / Tükenmiş”. Başarılı veya ölüm içermeyen bir fiziksel görevin ardından hayatta kalan görevli(ler) +1 alır, 2'de durur. Değerlendirme **görevden önceki** yorgunlukla yapılır. Ölüm sonrası artış yoktur. `restAll:1`, hayatta olan herkesin yorgunluğunu bir azaltır; 0'ın altına inmez. Ölülerin yorgunluğu geçmiş bilgi olarak kalır ama kullanılmaz.

Yorgunluk bütün eylemleri otomatik ölümcül yapmaz. Yalnız açıkça yazılı N03B, N07B, N12B ve N15A koşullarında ölüm dalını seçer. Kuru anahtar, korumalı kol ve güvenli grup eylemleri 2/2 yorgunlukta da çalışır. Ekipman eksikliği yalnız ilgili eylemde sonuç doğurur. Görev dağıtmak anlamlıdır; fakat belli bir isimde doğuştan gizli ceza yoktur.

### Ölümler

- Ölümler yalnız seçilmiş case'in `kill` alanıyla veya açıkça tanımlanmış terminal ölüm çözümleyicisiyle oluşur.
- `kill:["primary"]`: o eylemin birinci görevlisi ölür. Bu sürümde ikinci görevliyi ayrı öldüren case yoktur.
- `kill:"all"`: o anda yaşayanların tamamı ölür. Daha önce ölmüşlere ikinci ölüm olayı üretilmez.
- Geri getirme, ikinci can, sahte ölüm veya oyuncu değiştirerek diriltme yoktur.
- Ölenin cihazına yalnız kendine ait olay gider: `deathEventId, playerId, nodeId, imageKey, audioKey`. Başka oyuncuların cihazına bu olay yayınlanmaz.
- Bütün oyunculara ise sade ortak sonuç metni ve “Ölen: adlar / Yaşayan: adlar” kartı gösterilir. Bu kartta korku görseli, ani ses veya ekran saldırısı yoktur.
- Normal bir eylem son yaşayanı öldürürse kalan düğümler atlanır, S2_E20 çalışır. Özel toplu sonlarda case'in yazılı `ending` alanı önceliklidir; S2_E15/E17/E18/E19 kendi başlıklarıyla biter.
- N20B'nin S2_E09 sonucu ve N20C'nin S2_E12 sonucu terminal fiziksel kayıp içerir: final seçildikten sonra o an yaşayanların hepsi ölür; sırasıyla JS02 ve JS07 ölüm tabanı kullanılır. Bu sonlar ölümden sonra E20'ye çevrilmez. Bir kez seçilen final sabittir.
- S2_E05/E06/E11/E16 gibi bazı sonlarda yaşayanların mahsur kalması anlatılır; bunlar sırf korkutucu diye ölüme çevrilmez ve jumpscare tetiklemez.

## 6. Ölen oyuncunun devamı

Ölüm efekti biter bitmez kişisel kart:

> **Suyun Altındaki Ses**
> Karakterin öldü. Fiziksel görevlere seçilemezsin. Hikâyeyi okumaya, oy vermeye ve arkadaşlarınla konuşmaya devam edeceksin. Göreceğin kısa parçalar onlara yardım edebilir. Ölüme yol açan karar geri alınamaz.

Ölü oyuncular aşağıdaki özel parçalardan, içinde bulunulan düğüm aralığına uygun olanını okur. Bir parça bir ölü oyuncuya aynı aralık içinde yalnız bir kez gösterilir; ölüm o aralığın ortasında olduysa ilk kez o anda gösterilir. Sonraki aralığa geçince yenisi gelir. Ortak sahne metni de okunabilir. Canlılar bu sayfaların içeriğini sunucudan alamaz. Ölüler bilgiyi sesli veya oyunun grup sohbetiyle paylaşabilir. Zorunlu fısıltı, gerçek mikrofon dinleme veya ekstra bulmaca yoktur.

Ölü sayısı sıfırsa hiçbir özel parça açılmaz. Bunların hiçbirinde yaşayanların asla erişemediği zorunlu bir kurtuluş anahtarı yoktur. Aynı ipuçları normal sahnelerde de bulunur. Tam kadro kurtuluş yolu bu yüzden mümkündür. Ölü oyuncunun bağlantısı koparsa, oylamada hâlâ seçmen olduğu için normal bağlantı bekleme kuralı uygulanır.

### Ölüye özel sekiz kısa parça

**N01–N03: Suya İlk Bakış**

Öldüğünü biliyorsun. Buna rağmen karanlıkta bakabileceğin bir yön var. Teknenin üstündeki adımlar birer gölge. Arkadaşlarının isimlerini duyuyorsun; onların yanında fiziksel olarak durmuyorsun. Aşağıdaki şey, ışığa yaklaşmadan önce hep aynı hareketi deniyor: Bir kapının nasıl açıldığını öğrenmek. Sonraki kararlar onların bedenlerini anlatacak. Sen oylamada kalacaksın. Yaşayan birinin yerine göreve gidemezsin.

**N04–N05: Basıncı Taklit Edemez**

Gövdenin dışından bakınca vuruşların geldiği yerde bir insan yok. Ses, kuru metali içeriden bulmaya çalışıyor. Gerçek suyun pompaya verdiği basıncı taklit edemiyor. Arkadaşlarınla konuşabiliyorsan bu ayrıntıyı aktarabilirsin. Bu bir yeni seçim değildir; asıl dört seçenekli oylama aynı kalır.

**N06–N07: Işık Yürür, Taş Kalır**

Suyun içinde görünen kıyı, siz yürüdükçe yer değiştiriyor. Gerçek kayalar oynamıyor. Üçü yan yana. Birinde beyaz çizgi var. Dar tüneldeki nefes ise içeri giren bir insanın nefesi değil; metalin içindeki boşluğun taklidi. Bu bilgiyi yaşayanlara anlatabilirsin. Kararı tek başına değiştiremezsin.

**N08–N10: Duyuldular**

Eski kaydın sustuğu yerde de sesleri duyuyorsun. Çağrı gerçekten alındı. Bunu inkâr etmek onları yok etmiyor. Sana göre çok yakındalar, fakat aralarında dolaşan daha büyük karanlık onlardan biri değil. Bir sesin acı çekmesi, ağzından çıkan her sözün ona ait olduğunu kanıtlamıyor.

**N11–N13: Yürümeyi Öğreniyor**

Kıyıdan çıkan şeyin ayakları önce yanlış yöne basıyor. Her kapıyı, her merdiveni birini izleyerek öğreniyor. İçeri giren suyun her damlası deniz değil; bazılarının arası bir beden kadar boş. Yaşayanların kuru yoldan geçmesi bir alışkanlık değil, aradaki boşluğu ayıracak bir sınır.

**N14–N16: Camın Öte Yanı**

Camdaki yüzlerin hepsi arkadaşların değil. Ölüleri geri getirecek güvenli bir geçit yok. Çıplak mercek, bakana yer açıyor. Kalkan inince içerideki yüzün ışığa tutunamadığını görüyorsun. Sadece sen görüyorsun diye bu ipucu zorunlu hâle gelmez; yaşayanların bakım talimatı aynı şeyi zaten söylüyor.

**N17–N18: Tekrar Bir Yanıt Değil**

Sana ait olmayan sesin çalışma biçimini şimdi anlıyorsun. Söyleneni kusursuz tekrar ediyor, anlaması gereken yerde duruyor. Gerçek yanıt son iki vuruşu değiştirir. Gerçek yardım, bir kapıyı açmanı istemeden kıyıdaki yerini sınar. Arkadaşlarının bütün gece öğrendiği ayrım buydu.

**N19–N20: Birini Daha İstemeyin**

Kimsenin kolu tutmak için içeride kalması gerekmiyor. Mekanik fren çalışıyor. Sen geri dönemeyeceksin; bunun yerine bir başka arkadaşının gelmesi seni kurtarmayacak. Yaşayanlar çıkabilir. Gerçeği yanlarına almaları, burada kalanların yeniden bir yem olarak kullanılmasını engelleyebilir. Son kararda da bir oyun var.

## 7. Ana senaryo — bütün kararlar ve sonuçları

Sahne → okuma → eylem oyu → gerekiyorsa görevli seçimi → ilk eşleşen sonuç → kişisel ölüm ve ortak sonuç → sonraki düğüm. Teknik satırlar oyuncuya anlatı metni olarak gösterilmez. Aşağıdaki her eylem için en az bir sonuç yazılmıştır; koşullu olanlarda iki ayrı sonuç vardır.

### S2_N01 — Motor Sustuktan Sonra

**Sahne metni:**

Gece 01.43. Kıyı gezisinden döndüğünüz küçük yolcu teknesi, açık suda bir kere silkeleniyor. Motor duruyor. Birkaç saniye boyunca yalnızca teknenin altına çarpan dalgaları duyuyorsunuz.

Sonra bir şey omurgaya sürtünüyor. Teknenin boyu kadar uzun bir şey.

Acil durum lambası yanınca kaptan köşkünü boş buluyorsunuz. Kaptanın yağmurluğu sandalyede. İçinden hâlâ su damlıyor. Az önce üzerinde kuruydu.

Telsizin düğmesi basılı kalmış.

“İçinizden biri aşağı insin. Pervaneye dolandı.”

Ses kaptanın sesi. Ardından daha eski, cızırtılı bir kayıt duyuluyor:

“Benim sesimi duyuyorsanız motoru çalıştırmayın. Önce hattı kesin.”

{FOCUS}, iskele tarafındaki korkuluğa yaklaşıyor. Bir el bordaya tutunuyor. Sonra teknenin öbür ucundan ikinci bir el çıkıyor. İki elin arasındaki mesafe, bir insana ait olamayacak kadar fazla.

Güverte dolabında bir can halatı, yalıtımlı pense ve solmuş bir kıyı krokisi görülüyor. Işığın tekrar kesilmesine birkaç saniye varmış gibi titriyor.

**Soru:** İlk olarak neyi güvenceye alıyorsunuz?

#### A. Telsizden kaptana nerede olduğunu soruyoruz.

**Görevli sayısı:** 0

**İş tanımı:** Ortak karar; ayrıca görevli seçilmez.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

Hoparlörden sizin sayınız kadar nefes geliyor. “Buradayım,” diyor bir ses. Hemen yanınızdaki boşluğa dönüyorsunuz. Görünmeyen bir şey yağmurun yönünü kesiyor.

**Efektler:** `{"falseReply": true}`. **Hedef:** `S2_N02` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

#### B. Can halatını ve yalıtımlı penseyi alıp sesin hattını kesiyoruz.

**Görevli sayısı:** 1

**İş tanımı:** Güverte dolabını açacak ve telsizin dış hoparlör hattını ayıracak kişi.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

{A}, kabloyu penseyle ayırıyor. Ses kesilmiyor; bir süre teknenin altından devam ediyor. Can halatını yanınıza alıyorsunuz. Bir makaranın üzerinde küçük bir uyarı var: “Islak suda tek başına eğilme.”

**Efektler:** `{"rope": true}`. **Hedef:** `S2_N02` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

#### C. Kıyı ışığına doğru bağırıp hep birlikte korkuluğa vuruyoruz.

**Görevli sayısı:** 0

**İş tanımı:** Ortak karar; ayrıca görevli seçilmez.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

Kıyıdan karşılık gelmiyor. Teknenin altından aynı ritimle vuruluyor. Vuruşlarınız durduğu hâlde aşağıdaki devam ediyor. Telsiz kendiliğinden “Çağrı kabul edildi” diyor.

**Efektler:** `{"falseReply": true, "contamination": true}`. **Hedef:** `S2_N02` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

#### D. Lambaları söndürüp bir süre sessizce bekliyoruz.

**Görevli sayısı:** 0

**İş tanımı:** Ortak karar; ayrıca görevli seçilmez.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

Karanlıkta birinin çok yakından soluduğunu duyuyorsunuz. Işıklar geri geldiğinde herkes yerinde; ama birinizin omzunda yukarıdan aşağı değil, aşağıdan yukarı akan bir su izi var.

**Efektler:** `{"contamination": true, "restAll": 1}`. **Hedef:** `S2_N02` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

### S2_N02 — Su Seviyesinin Altındaki Cam

**Sahne metni:**

Yolcu salonuna inen kapı açık. Alt basamaklara kadar su gelmiş. Masa üzerindeki tekne planında su geçirmez kapının yanında bir akü dolabı işaretli.

{FOCUS}, dolabın kırmızı kolunu görüyor. Kolu almak için suya girmek gerekmiyor; üst sahanlıktan erişilebilir. Buna karşılık kaptan kamarasındaki bir anahtar, yarısı suya gömülmüş masanın üzerinde.

Lombozlardan biri içeriden buğulanıyor. Dışarısı deniz. Buğunun üzerinde bir parmak izi beliriyor.

Ardından göz.

Göz, suyun arkasından değil, sanki camın bu tarafına yapışmış gibi duruyor. Her dalgada yer değiştirmiyor. Tekne sallandıkça o da tekneyle birlikte sallanıyor.

Bir sandalye suyun içinde yavaşça size dönüyor. Üzerinde kimse yok.

Planın kenarında okunabilir bir not var: “Akü yukarıda. Anahtar için dalma. Cam dışarıdan açılmaz.”

**Soru:** Alt salonda hangi işe girişiyorsunuz?

#### A. Üst sahanlıktan yedek aküyü çıkarıyoruz.

**Görevli sayısı:** 1

**İş tanımı:** Üst basamaktan aküyü kaldıracak kişi; suya girilmeyecek.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

{A}, kuru kulpu kavrayıp aküyü yukarı çekiyor. Altında insan biçiminde koyu bir su izi kalıyor. Aküyü kapalı kutusuyla güverteye çıkarıyorsunuz.

**Efektler:** `{"battery": true}`. **Hedef:** `S2_N03` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

#### B. Salon kapısını kapatıp kamaralara dokunmadan geri dönüyoruz.

**Görevli sayısı:** 0

**İş tanımı:** Ortak karar; ayrıca görevli seçilmez.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

Kapı kapanınca camdaki yüz kayboluyor. İçeriden kapıya üç kere vuruluyor. Her vuruş daha yüksekte: yüz, suyla birlikte yükseliyor. Aküyü alamadan çıkıyorsunuz.

**Efektler:** `{}`. **Hedef:** `S2_N03` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

#### C. Halata bağlı olarak kamaradaki anahtarı almaya çalışıyoruz.

**Görevli sayısı:** 1

**İş tanımı:** Suya girecek kişi. Can halatı yoksa bu eylem ölümcüldür; oyun bu ekipman eksikliğini seçimden önce gösterir.

**Sonuç 1 — geliştirici koşulu:** `{"not": {"flag": "rope"}}`

Halat yok. {A}, masaya uzandığında su yüzeyi başının üstünde kapanıyor. Korkuluğa uzanan eli, sanki başka bir elmiş gibi öte tarafa çekiliyor.

**Efektler:** `{}`. **Ölüm:** `["primary"]`; özel görsel/ses tabanı `JS01`. **Hedef:** `S2_N03` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

**Sonuç 2 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

{A}, halatla geri çekiliyor. Anahtar motoru açmıyor; üstünde FENER SERVİSİ yazıyor. Kamarada kalmış kıyı krokisini de alıyorsunuz.

**Efektler:** `{"chart": true}`. **Hedef:** `S2_N03` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

#### D. Lombozdaki yüzü yakından kontrol ediyoruz.

**Görevli sayısı:** 1

**İş tanımı:** Lomboza yaklaşacak kişi. Plandaki uyarı ve içeride oluşan buğu tehlikenin ipucudur.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

{A}, cama yaklaştığında başını öte yandakiyle aynı açıya eğiyor. Cam açılmıyor; yüz dar delikten içeri doğru uzuyor. Geri çekildiğinizde o basamakta artık yalnız su var.

**Efektler:** `{}`. **Ölüm:** `["primary"]`; özel görsel/ses tabanı `JS04`. **Hedef:** `S2_N03` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

### S2_N03 — Pervaneye Dolanan

**Sahne metni:**

Makine dairesinin kapısında sarı bir etiket var: “Uzaktan marş vermeden bakım şalterini ayır.” Camlı göstergede ana hat hâlâ açık görünüyor.

Motor dönmüyor. Pervane mili ise ara sıra kendi kendine çeyrek tur hareket ediyor. Milin etrafına sarılı şey bir ağ gibi görünüyor. Ağın düğümleri, siz bakarken parmak eklemlerine benziyor.

{FOCUS}, kuru servis sahanlığında ikinci bir şalter buluyor. Üzerinde manuel kilit var. Yanındaki çubuk, dönen mile yaklaşmadan bakım konumunu sabitlemeye yarıyor.

Tavanda ağır bir nefes duyuluyor.

Başınızı kaldırınca yalnız borular görüyorsunuz. Sonra tavandaki borulardan biri, su damlası bırakmadan, bir eklem gibi bükülüyor.

Kaptanın eski kaydı bir yerlerden yeniden duyuluyor: “Önce hattı kesin.”

**Soru:** Motor çevresinde ne yapıyorsunuz?

#### A. Kaptanın sesine güvenip köşkten marş veriyoruz.

**Görevli sayısı:** 0

**İş tanımı:** Ortak karar; ayrıca görevli seçilmez.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

Motor bir an çalışıyor. Teknenin altındaki şey pervaneye değil, sesin kendisine tutunuyor. Sonra bütün lambalar sönüyor. Ana hattı daha da bozuyorsunuz.

**Efektler:** `{"contamination": true, "engineSafe": false}`. **Hedef:** `S2_N04` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

#### B. Mili servis çubuğuyla elle çeviriyoruz.

**Görevli sayısı:** 1

**İş tanımı:** Elle kuvvet uygulayacak kişi. Yorgunluk 2/2 ise çubuğu tutamama riski ölümcüldür.

**Sonuç 1 — geliştirici koşulu:** `{"actorFatigueAtLeast": 2}`

{A}, yorgunluktan çubuğu yarım bırakıyor. Mil geri dönerken yukarıdan bir yüz iniyor. Sahanlıkta açılan boşluk suyla doluyor.

**Efektler:** `{}`. **Ölüm:** `["primary"]`; özel görsel/ses tabanı `JS02`. **Hedef:** `S2_N04` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

**Sonuç 2 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

{A}, kuru sahanlıktan mili küçük bir açıyla çeviriyor. Ağa benzeyen şey çözülmek yerine içeri çekiliyor. Güvenli bakım kilidi kapalı kalıyor.

**Efektler:** `{"engineSafe": true}`. **Hedef:** `S2_N04` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

#### C. Ağa benzeyen şeyi elimizle çekip çıkarıyoruz.

**Görevli sayısı:** 1

**İş tanımı:** Dönen parçaya yaklaşacak kişi; şalter açık ve ağ hareket ediyor.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

{A} ilk düğüme dokunuyor. Parmaklar yukarıdaki parmaklara benziyor. Ardından tavandan ters bir yüz sarkıyor. Arkadaşınızın el feneri kuru sahanlığa düşüyor; kendisi görünmüyor.

**Efektler:** `{}`. **Ölüm:** `["primary"]`; özel görsel/ses tabanı `JS02`. **Hedef:** `S2_N04` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

#### D. Kuru sahanlıktaki bakım şalterini ayırıp mili kilitliyoruz.

**Görevli sayısı:** 1

**İş tanımı:** Yalıtımlı servis kolunu çevirecek kişi; bütün işlem kuru sahanlıktan yapılır.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

{A}, önce hattı ayırıyor, sonra kolu kilitliyor. Ağ birden cansızlaşıyor. Motoru yeniden çalıştırmadınız; ama artık teknenin hareketini dışarıdaki ses yönetemiyor.

**Efektler:** `{"engineSafe": true}`. **Hedef:** `S2_N04` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

### S2_N04 — Gövdedeki Vuruşlar

**Sahne metni:**

Su alt salonda yükselirken gövdenin içinden tokmak sesleri geliyor. Bir, iki, üç. Sonra kısa bir ara. Sonra yine bir, iki, üç.

Sintine pompasının elektrik hattı ayrı. Kuru panelde bir el pompası ve üstünde geri tepme kilidi var. İki kişiyle kolay kullanılabilir. Tek kişi kalmışsa paneldeki kilit kolu, pompayı her basışta sabit tutabiliyor.

{FOCUS}, duvardaki çekiç izlerine bakıyor. Eski izlerin altında küçük bir yazı var: “Sesi taklit eder. Basıncı değil.”

Pompanın basınç göstergesi sıfırda. Gövdedeki vurulan yerde ise su sızmıyor. Yardım isteyen birinin bulunduğu yerden çok, sizin yanlış yeri açmanızı bekleyen bir işarete benziyor.

Telsizin kesik kablosundan fısıltı geliyor: “Bizi çıkarın.”

**Soru:** Suyu ve gövde seslerini nasıl ele alıyorsunuz?

#### A. Vuruş gelen metal kapağı açıyoruz.

**Görevli sayısı:** 1

**İş tanımı:** Metal servis kapağını aralayacak kişi. Su basıncı ile sesin yeri örtüşmüyor.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

{A}, kapağı aralayınca içeride bir boşluk değil, teknenin dış denizi görünüyor. Kapağı tekrar kapatıyorsunuz. İçeri sızan birkaç damla zeminde size doğru ilerliyor.

**Efektler:** `{"contamination": true}`. **Hedef:** `S2_N05` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

#### B. Pompayı geri tepme kilidiyle çalıştırıp akü hattını güvenceye alıyoruz.

**Görevli sayısı:** 2

**İş tanımı:** Bir kişi pompayı, diğeri kuru panel kilidini kontrol eder; roller ayrı seçilir.

**Tek yaşayan sürümü:** Tek kişi, pompanın geri tepme kilidini her vuruşta sabitleyerek aynı işlemi yapar.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

Pompa her basışta gerçek suyu dışarı atıyor. Basınç göstergesi yükseliyor. Kuru enerji hattı yeniden besleniyor; ana motor devreye alınmıyor.

**Efektler:** `{"power": true}`. **Hedef:** `S2_N05` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

#### C. Sahanlıkta dinlenip sesin yer değiştirmesini izliyoruz.

**Görevli sayısı:** 0

**İş tanımı:** Ortak karar; ayrıca görevli seçilmez.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

Vuruşlar siz dururken duvar boyunca ilerliyor. Dışarıdaki şey yardım istemiyor, hangi kapağa yöneleceğinizi deniyor. Soluğunuz toparlanıyor.

**Efektler:** `{"restAll": 1}`. **Hedef:** `S2_N05` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

#### D. Sesin kaynağını bulmak için pompa boşluğuna başımızı uzatıyoruz.

**Görevli sayısı:** 1

**İş tanımı:** Kapalı pompa boşluğunu kontrol edecek kişi; görüş yok ve ses tavanda hareket ediyor.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

{A}, boruların arasına eğiliyor. Başının üstünde bir el beliriyor. El tavana basıyor; ona bağlı yüz ters dönerek arkadaşınıza yaklaşıyor. Pompa boşluğu bir an insan nefesiyle doluyor.

**Efektler:** `{}`. **Ölüm:** `["primary"]`; özel görsel/ses tabanı `JS02`. **Hedef:** `S2_N05` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

### S2_N05 — Filikadaki Ağırlık

**Sahne metni:**

Teknenin kıçında şişme servis filikası var. Üzerinde güvenli taşıma kapasitesi sizin grubunuza yetiyor. Yakıt bidonu bağlı, kıyıya ulaşmak için kürekler de hazır.

Filikanın altına bakınca suyun yüzeyinde bir çukur görüyorsunuz. Bir ağırlık teknenin altında değil, suyu aşağıdan bastırıyor gibi.

Kaldırma vincindeki etiket açık: “Halatları sökmeden yükü boşalt. Suya uzanma. Sabitleme kolu yukarıdan kullanılır.”

{FOCUS}, filikanın içinde el izi görüyor. İz kuru. Bir parmak, teknenin kenarından içeri doğru hareket ediyor. Görünmeyen biri filikaya çıkmayı deniyor ama ellerini nereye koyacağını bilmiyor.

Kıyıdaki fener uzaktan bir kere parlıyor. Ardından karanlık. Yine de sisin içinde alçak bir iskele seçiliyor.

**Soru:** Filikayı nasıl hazırlıyorsunuz?

#### A. Hiç kontrol etmeden filikaya atlayıp halatları kesiyoruz.

**Görevli sayısı:** 1

**İş tanımı:** Filikaya ilk inecek kişi; kaldırma yükü henüz boşaltılmamış.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

{A} filikaya iner inmez tabandaki kuru el izi suyla doluyor. Filikayı yeniden bordaya bağlıyorsunuz. Kullanılabilir durumda değil; dışarıdaki ağırlık yerini öğrenmiş.

**Efektler:** `{"contamination": true}`. **Hedef:** `S2_N06` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

#### B. Filikayı bırakıp kıyıyı yüzerek bulmaya hazırlanıyoruz.

**Görevli sayısı:** 0

**İş tanımı:** Ortak karar; ayrıca görevli seçilmez.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

Korkuluğun ötesine baktığınızda kıyı ışığı suyun altında görünüyor. Dalga başları, uzaktaki taşlar gibi dizilmiş. Bunun gerçek bir yüzme yolu olmadığını fark edip geri çekiliyorsunuz.

**Efektler:** `{"falseReply": true}`. **Hedef:** `S2_N06` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

#### C. Üstten sabitleme kolunu kullanıp filikayı kontrollü indiriyoruz.

**Görevli sayısı:** 2

**İş tanımı:** Bir kişi vinci, diğeri bordadaki kılavuz ipi kontrol eder.

**Tek yaşayan sürümü:** Tek kişi kendinden kilitlenen vinci kullanır; filikaya inmeden kontrol tamamlanır.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

Kaldırma yükü boşalıyor. Filikanın altındaki çukur uzaklaşıyor. Sabitlenmiş, yakıtı ve kürekleri yerinde bir servis filikanız var.

**Efektler:** `{"lifeRaft": true}`. **Hedef:** `S2_N06` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

#### D. Altına takılan şeyi elle itip filikayı kurtarıyoruz.

**Görevli sayısı:** 1

**İş tanımı:** Suya uzanacak kişi. Sabitleme kolu yukarıda olduğu hâlde alt tarafa yaklaşılacak.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

{A} eğildiğinde su yarılıyor. Altındaki yüz önce elinize, sonra yüzünüze bakıyor. Filika bir kere yukarı sıçrıyor. Bordadan sarkan el geri gelmiyor.

**Efektler:** `{}`. **Ölüm:** `["primary"]`; özel görsel/ses tabanı `JS05`. **Hedef:** `S2_N06` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

### S2_N06 — Kıyı Yer Değiştiriyor

**Sahne metni:**

Köşkün harita masasında iki farklı yol çizilmiş. Basılı kıyı haritası fenerin güneyindeki servis iskelesini gösteriyor. Elektronik gösterge ise sizi kayalıkların arasına, haritada deniz görünmeyen bir noktaya çağırıyor.

İki yön de çıplak gözle kıyı gibi.

{FOCUS}, basılı haritanın üzerindeki fener çiziminin yanına düşülmüş eski bir not görüyor: “Sabit üç taş. Dönen ışık değil.” Altında üç kaya işareti var.

Pencerenin arkasında bir yüz beliriyor. Dışarıdaki deniz seviyesi bu pencereye ulaşmıyor. Yüz, duvardan yukarı tırmanmayı yeni öğrenmiş gibi yavaş yükseliyor.

Ekrandaki varış bilgisi değişiyor: EVE VARILDI.

Tekne hâlâ açık denizde. Eviniz burada değil.

**Soru:** Gerçek kıyı yönünü nasıl belirliyorsunuz?

#### A. Basılı haritayı üç sabit kayayla karşılaştırıp rotayı işaretliyoruz.

**Görevli sayısı:** 1

**İş tanımı:** Pencereye yaklaşmadan dürbünle kara işaretlerini kontrol edecek kişi.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

{A}, kayanın birinin beyaz çizgisini seçiyor. Elektronik ekrandaki kıyı bir an titreşiyor. Gerçek servis iskelesini haritaya işaretliyorsunuz.

**Efektler:** `{"chart": true}`. **Hedef:** `S2_N07` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

#### B. Pencerenin arkasındaki kişinin gösterdiği yöne bakıyoruz.

**Görevli sayısı:** 1

**İş tanımı:** Dışarıdaki yüzle göz hizasına gelecek kişi; pencere su seviyesinin üstündedir.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

{A} cama yaklaşınca yüz pencereden değil, pencerenin bıraktığı boşluktan içeri giriyor. Gözler olması gerekenden önce ulaşıyor. Kamarada yalnız yere düşen dürbün kalıyor.

**Efektler:** `{}`. **Ölüm:** `["primary"]`; özel görsel/ses tabanı `JS04`. **Hedef:** `S2_N07` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

#### C. Elektronik göstergenin ev işaretini rota olarak kaydediyoruz.

**Görevli sayısı:** 0

**İş tanımı:** Ortak karar; ayrıca görevli seçilmez.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

Rota ekranınıza işleniyor. Basılı haritadaki üç kayayı artık aynı yerde seçemiyorsunuz. Kolay yolun size ait olmayan bir varışa gittiğini henüz kabul etmiyorsunuz.

**Efektler:** `{"chart": false, "falseReply": true}`. **Hedef:** `S2_N07` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

#### D. Kıyı görünüyorken güverteden suya eğilip derinliği ölçüyoruz.

**Görevli sayısı:** 1

**İş tanımı:** Korkuluğun dışına eğilecek kişi. Derinlik aleti değil, sıradan ip kullanılacak.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

{A}, ölçü ipini suya bırakıyor. İp dik durmuyor; bir parmağın etrafında dolanıyor. Suyun yüzeyine çıkan yüz, arkadaşınızın bileğini tekneye yanlış yönden çekiyor.

**Efektler:** `{}`. **Ölüm:** `["primary"]`; özel görsel/ses tabanı `JS05`. **Hedef:** `S2_N07` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

### S2_N07 — Havalandırmadaki Nefes

**Sahne metni:**

Fener servisinden gelen eski bir kayıt, köşkün altındaki telsiz sigortasında kalmış. O sigortaya dar havalandırma tünelinden erişiliyor. Aynı kaydın basılı çağrı çizelgesi, girişteki kapağın iç yüzüne yapıştırılmış.

Çizelgede üç kısa, bir uzun, iki kısa işaret var. Altında bir cümle: “Çağrıya gelen yanıt aynı vuruşu tekrar etmez. Son iki vuruşu tersler.”

İlk kez sesle gerçek cevap arasında sınanabilir bir fark görüyorsunuz.

Havalandırmanın içinde su sesi yok. Fakat {FOCUS} kapağı aydınlatınca, metal zeminde geriye doğru kayan ıslak parmaklar seçiliyor.

Sigortaya daha uzaktan erişmek için kullanılabilecek kuru servis kolu kapağın hemen yanında. Eğilip kapağın içine başınızı sokmadan uzatılabilir.

Tünelden biri nefes alıyor. Sonra nefes, metali çizerek size doğru ilerliyor.

**Soru:** Çağrı kodunu nasıl alıyorsunuz?

#### A. Kaydı bırakıp havalandırma kapağını kapatıyoruz.

**Görevli sayısı:** 0

**İş tanımı:** Ortak karar; ayrıca görevli seçilmez.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

Nefes metalin öte yanında kalıyor. Kapağın iç yüzündeki çizelge de kapanıyor. Kodu öğrenmeden uzaklaşıyorsunuz.

**Efektler:** `{}`. **Hedef:** `S2_N08` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

#### B. Sigortayı tünelin içine uzanarak çıkarıyoruz.

**Görevli sayısı:** 1

**İş tanımı:** Dar yere girecek kişi. Yorgunluk 2/2 ise dönüşte tutunamama tehlikesi vardır.

**Sonuç 1 — geliştirici koşulu:** `{"actorFatigueAtLeast": 2}`

{A}, yorgun kollarıyla tünelin içinden geri dönemiyor. İçerideki yüz, karanlığın bittiği yerde beliriyor. Kapak kendi ağırlığıyla kapanıyor.

**Efektler:** `{}`. **Ölüm:** `["primary"]`; özel görsel/ses tabanı `JS06`. **Hedef:** `S2_N08` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

**Sonuç 2 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

{A}, sigortayı çıkarıp tünelden geri çekiliyor. Kaydı okuyabiliyorsunuz. Gerçek cevabın ritmini öğreniyorsunuz.

**Efektler:** `{"signalCode": true}`. **Hedef:** `S2_N08` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

#### C. İçeride nefes alan kişiyi çekip çıkarmaya çalışıyoruz.

**Görevli sayısı:** 1

**İş tanımı:** Görünmeyen kişiye el uzatacak kişi. Islak izler dışarı değil içeri gidiyor.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

{A} elini uzatıyor. İçerideki yüz gülümsemiyor; ağzını gülümsemeyi taklit eder gibi yanlara doğru uzatıyor. Arkadaşınızın omuzları kapağın içine çekiliyor.

**Efektler:** `{}`. **Ölüm:** `["primary"]`; özel görsel/ses tabanı `JS06`. **Hedef:** `S2_N08` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

#### D. Kapağın içindeki çizelgeyi dışarıdan okuyup servis koluyla kaydı alıyoruz.

**Görevli sayısı:** 1

**İş tanımı:** Kuru servis kolunu kullanacak kişi; baş ve gövde kapağın dışında kalır.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

{A}, kapağın içine girmeden kolu uzatıyor. Kayıt dışarı geliyor. İşaretleri ve gerçek yanıttaki küçük değişikliği not ediyorsunuz.

**Efektler:** `{"signalCode": true}`. **Hedef:** `S2_N08` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

### S2_N08 — Çağrı Alınmadı

**Sahne metni:**

Eski telsiz kaydı 17 Kasım 1967 tarihini taşıyor. Bir tekne alçak suda değil, fenerin hemen önünde batıyor. İstasyonda birisi çağrıyı duyuyor. Hava kötü. Kimse gönderilmiyor.

Kaydın sonundaki resmî cümle farklı: “Çağrı alınmadı.”

Sonra bir kalemin masaya bırakılışı, sandalyenin geri çekilişi duyuluyor. Kaydın bittiği sanılan sessizlikte, boğulanların sesi sürüyor.

{FOCUS}, teybin sayacına bakıyor. Sayılar bugüne kadar ilerliyor. Bu bir kayıt değil; hiç kapatılmamış bir hat.

Telsizin yanındaki zarf üzerinde “Ham çağrı ve imzalı rapor birlikte saklanır” yazıyor. Zarfı uzaktan açan küçük çekmece kolu duruyor.

Hoparlörden kaptanın sesi geliyor: “Orada kimse yoktu. Bunu tekrar edin, geçelim.”

**Soru:** Eski çağrının ortaya çıkardığı gerçeğe nasıl karşılık veriyorsunuz?

#### A. Kaydı durdurup kimsenin duymadığına karar veriyoruz.

**Görevli sayısı:** 0

**İş tanımı:** Ortak karar; ayrıca görevli seçilmez.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

Düğmeye bastığınızda ses kesilmiyor; odadaki her kablonun içinden geliyor. Gerçeği söylemeyen kayda siz de bir cümle eklemiş oluyorsunuz.

**Efektler:** `{"falseReply": true}`. **Hedef:** `S2_N09` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

#### B. Çekmeceyi açıp ham kaydı ve imzalı raporu birlikte koruyoruz.

**Görevli sayısı:** 1

**İş tanımı:** Uzaktan çekmece kolunu kullanacak kişi; telsiz mikrofonuna dokunulmayacak.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

{A}, zarfı açıyor. İmza ile ham çağrının saati birbiriyle çelişiyor. İlk yardım talebinin gerçekten alındığını kanıtlayan belgeler elinizde.

**Efektler:** `{"logProof": true}`. **Hedef:** `S2_N09` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

#### C. Hoparlördeki sese yüzünü göstermesini söylüyoruz.

**Görevli sayısı:** 1

**İş tanımı:** Mikrofona yaklaşacak kişi. Sesin kimliği doğrulanmış değil.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

{A}, mikrofonu eline alıyor. Kablodan sanki başka bir el de tutuyor. Yağmurluklu bir yüz konsoldan yükseliyor. Arkadaşınızın sesi, odada kalan tek şey oluyor.

**Efektler:** `{}`. **Ölüm:** `["primary"]`; özel görsel/ses tabanı `JS07`. **Hedef:** `S2_N09` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

#### D. Hep birlikte rapordaki çağrı alınmadı cümlesini tekrar ediyoruz.

**Görevli sayısı:** 0

**İş tanımı:** Ortak karar; ayrıca görevli seçilmez.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

Son kelimede teknenin içi bir istasyon odasına dönüşüyor. Dışarıdan gelen yardım çağrısını duyuyorsunuz. Masadaki rapor, bu kez sizin isimlerinizle imzalanmış.

**Efektler:** `{}`. **Ölüm:** `"all"`; özel görsel/ses tabanı `JS07`. **Hedef:** `S2_E15` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

### S2_N09 — Sizin Sesinizle Gelen Cevap

**Sahne metni:**

Yalnızca kıyı istasyonunun bakım frekansında iletişim kurulabiliyor. Acil kanal, daha siz düğmeye dokunmadan konuşmaya başlıyor.

“Sizi görüyoruz. Biriniz aşağı insin.”

Bu kez konuşan ses {FOCUS} sesi. {FOCUS}, mikrofonun yanında değil. Cümlenin sonunda kendi nefesini duyuyor.

Çağrı çizelgesindeki kuralı hatırlayabiliyorsanız, bir yanıtın aynen tekrar etmesinin kanıt olmadığını biliyorsunuz. Sesi taklit eden şey, bir sonraki vuruşun niçin farklı olması gerektiğini bilmiyor.

Telsizde ritim tuşu, harita masasında kayıt için boş bir kâğıt var. Kesin kararınızı kıyıdaki asıl konsolda vereceksiniz; burada henüz gerçek yardım çağrısına ulaşamıyorsunuz.

Bir süre dinlenebilirsiniz. Gövdenin altındaki sürtünme durdu. Bu sessizlik rahatlatmıyor. Sanki bir şey, yürümeyi öğrenmek için önce ellerini boşa çıkarmış.

**Soru:** Doğrulanmamış yanıta ne yapıyorsunuz?

#### A. Yanıtı kabul etmiyor, gerçek sınamayı kıyı konsoluna bırakıyoruz.

**Görevli sayısı:** 0

**İş tanımı:** Ortak karar; ayrıca görevli seçilmez.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

Mikrofonu kapatıyorsunuz. Ses bir süre daha devam edip kendi cümlesinin ortasında susuyor. Önceki yanlış kabullerin de geçersiz olduğunu açıkça belirtiyorsunuz.

**Efektler:** `{"falseReply": false}`. **Hedef:** `S2_N10` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

#### B. Tanıdık sese güvenip bizi gördüklerini onaylıyoruz.

**Görevli sayısı:** 0

**İş tanımı:** Ortak karar; ayrıca görevli seçilmez.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

“Onaylandı,” diyor ses. Kıyıdaki ışık, insan gözünün kırpması gibi bir kere kapanıyor. Sizi bulması için ona yerinizi söylemiş oluyorsunuz.

**Efektler:** `{"falseReply": true}`. **Hedef:** `S2_N10` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

#### C. Ritim tuşuyla gerçek cevap örüntüsünü yeniden çıkarıyoruz.

**Görevli sayısı:** 1

**İş tanımı:** Çizelge ve ritim tuşunu birlikte kontrol edecek kişi.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

{A}, çizelgedeki vuruşları kâğıda geçiriyor. Gerçek cevabın son iki vuruşu değiştirmesi gerektiğini tekrar belirliyorsunuz. Bu, henüz kimseyi hatta kabul etmek değildir.

**Efektler:** `{"signalCode": true}`. **Hedef:** `S2_N10` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

#### D. Mikrofon kapalıyken kısa süre dinlenip kayıtları sıralıyoruz.

**Görevli sayısı:** 0

**İş tanımı:** Ortak karar; ayrıca görevli seçilmez.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

Kimse konuşmuyor. İlk kez, aranızdaki gerçek nefeslerin birbirine uymayan ritimlerini duyuyorsunuz. Dinlenirken kâğıtları sıraya koyuyorsunuz; dışarıdaki sesi yanıtlamıyorsunuz.

**Efektler:** `{"restAll": 1}`. **Hedef:** `S2_N10` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

### S2_N10 — Sudaki Seyir Defteri

**Sahne metni:**

Kaptan köşkünün taban kapağı açılıyor. Su karanlık bir cam gibi duruyor. İçinde, su geçirmez sayfaları olan seyir defteri yüzüyor. Şeffaf kapağın altında aynı tarih ve eksik bir imza görülüyor.

Defter yalnız aşağıda değil. Kapağın üst tarafına, kaza raporunun karbon nüshası sıkıştırılmış. Kuru yerden alınabilir. Asıl defteri almak şart değil; inkâr edilen çağrının iki kaydını birlikte göstermek yeterli.

{FOCUS}, suyun içinden bir elin defteri yukarı kaldırdığını görüyor. Elin tırnakları insan tırnağına benziyor. Ancak bir bacağı andıran uzunluğun ucunda.

Yukarıdaki karbon nüsha titremiyor. Suyun içindeki kâğıt sizin nefesinizle aynı ritimde sallanıyor.

Filikaya ya da teknenin serbest sürüklenişine çıkmadan önce son kanıt fırsatı burada.

**Soru:** Hangi kaydı alıyorsunuz?

#### A. Suyun içindeki eli tutarak defteri birlikte çıkarıyoruz.

**Görevli sayısı:** 1

**İş tanımı:** Suyun içindeki ele dokunacak kişi. Bedenin geri kalanı görünmüyor.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

{A}, elin parmaklarını kavrıyor. Suya uzanan kolu bir an başkasının kolu gibi görünüyor. Aşağıdaki yüz ağzını açınca yüzey kapanıyor.

**Efektler:** `{}`. **Ölüm:** `["primary"]`; özel görsel/ses tabanı `JS01`. **Hedef:** `S2_N11` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

#### B. Can halatına bağlı inip gerçek defteri alıyoruz.

**Görevli sayısı:** 1

**İş tanımı:** Suya inecek kişi. Can halatı varsa bağlı çıkış mümkün; yokluğu seçim kartında açık gösterilir.

**Sonuç 1 — geliştirici koşulu:** `{"not": {"flag": "rope"}}`

Can halatı bulunmadığı için {A} suya yalnız giriyor. Yukarıdaki basamak bir anda çok uzakta kalıyor. Fener ışığı suyun altına doğru çekiliyor.

**Efektler:** `{}`. **Ölüm:** `["primary"]`; özel görsel/ses tabanı `JS01`. **Hedef:** `S2_N11` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

**Sonuç 2 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

{A}, defteri halatla bağlı olarak çıkarıyor. Su geçirmez sayfalarda çağrının alındığına ilişkin ikinci kayıt bulunuyor.

**Efektler:** `{"logProof": true}`. **Hedef:** `S2_N11` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

#### C. Kuru kapak kenarındaki karbon nüshayı alıyoruz.

**Görevli sayısı:** 1

**İş tanımı:** Üstteki kuru karbon nüshayı alacak kişi.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

{A}, kuru nüshayı kaptığı anda sudaki el defteri aşağı çekiyor. Gereken bilgi zaten elinizde: çağrının saati ve onu duyan kişinin imzası. Bedeninizi suya vermeniz gerekmiyor.

**Efektler:** `{"logProof": true}`. **Hedef:** `S2_N11` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

#### D. Kanıtları bırakıp çıkışa odaklanıyoruz.

**Görevli sayısı:** 0

**İş tanımı:** Ortak karar; ayrıca görevli seçilmez.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

Kapağı kapatıyorsunuz. Alttan tek bir vuruş geliyor. Elinizde daha önce alınmış kanıt varsa korunuyor; yoksa denizin inkâr edilmiş hikâyesini hâlâ belgeleyemiyorsunuz.

**Efektler:** `{}`. **Hedef:** `S2_N11` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

### S2_N11 — İskelenin Öğrendiği Adım

**Sahne metni:**

{ARRIVAL}

Fenerin servis iskelesi iki yanında deniz olan uzun bir taş dil. Binaya çıkan merdivene ulaşmak için önce iskele halkasını sabitlemeniz gerekiyor. Geri çekilen dalga, dönüş yolunuzu suyun altına alabilir.

{FOCUS}, taşların üzerinde yeni oluşmuş el izleri görüyor. İzler basamak basamak ilerliyor. Önce avuç. Sonra diz. Sonunda ayakkabısız bir ayağın biçimi.

Teknenin altında sürtünen şey kıyıda yürümeye çalışıyor.

İskele halkasının yanında üstten çalışan bir mandal var. Halatınız bulunmasa bile oradaki sabit kıyı zinciri kullanılabilir. Bu, denize sarkmadan yapılacak bir iş.

Merdivenin altında başka bir giriş var: insanın ancak sürünerek geçebileceği servis tüneli. İçinden kuru bir öksürük geliyor. Sonra tünel, nefesini sizinle aynı anda tutuyor.

**Soru:** Fenerin girişine nasıl hazırlanıyorsunuz?

#### A. Dalga çekilmişken sabitlemeden merdivene koşuyoruz.

**Görevli sayısı:** 0

**İş tanımı:** Ortak karar; ayrıca görevli seçilmez.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

İskele gerinizde suya gömülüyor. Şimdi dönüş için güvenli bir bağlantı yok. Fenerin önüne ulaşıyorsunuz, fakat geri yolunuzu dalganın zamanına bırakmış oldunuz.

**Efektler:** `{"dockLine": false}`. **Hedef:** `S2_N12` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

#### B. Üst mandalı ve kıyı zincirini kullanarak iskeleyi sabitliyoruz.

**Görevli sayısı:** 2

**İş tanımı:** Bir kişi zinciri taş halkaya oturtur, diğeri üst mandalı tutar.

**Tek yaşayan sürümü:** Tek kişi, zincirin kendinden kilitlenen üst mandalını kullanır; denize sarkılmaz.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

Taş halka ile zincir birbirine kilitleniyor. Dalga çekildiğinde yürüyüş yolu yerinde kalıyor. Merdivenin altındaki nefes, metalin kilitlenişinden sonra uzaklaşıyor.

**Efektler:** `{"dockLine": true}`. **Hedef:** `S2_N12` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

#### C. Nefes gelen dar servis tünelinden içeri giriyoruz.

**Görevli sayısı:** 1

**İş tanımı:** Dar servis tüneline girecek kişi. Tünelde su ve karşıdan yaklaşan bir nefes var.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

{A}, tünelde önünde insan yüzüne benzeyen bir şey görüyor. Şey geri gitmiyor; yüzünün biçimi geçide uymak için daralıyor. Arkadaşınızın sesi birkaç basamak ileride kesiliyor.

**Efektler:** `{}`. **Ölüm:** `["primary"]`; özel görsel/ses tabanı `JS06`. **Hedef:** `S2_N12` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

#### D. Kapının önünde toplanıp birbirimizi kontrol ederek soluklanıyoruz.

**Görevli sayısı:** 0

**İş tanımı:** Ortak karar; ayrıca görevli seçilmez.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

Fenerin kapısına kadar geri çekiliyorsunuz. Islak izler iskelede kalıyor. Birbirinizi kontrol ederken soluklanıyorsunuz; sabitleme işi yapılmışsa korunuyor.

**Efektler:** `{"restAll": 1}`. **Hedef:** `S2_N12` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

### S2_N12 — Kapıyı Açan El

**Sahne metni:**

Fenerin dış kapısı ağır demirden. İçeride, kapı kolunun aşağı indiğini görüyorsunuz. Bir el kolu önce yukarı, sonra yana zorluyor. Nasıl çalıştığını öğrenmeye uğraşıyor.

{FOCUS}, yan duvardaki bakım merdivenini fark ediyor. Üst sahanlıkta servis kapağı var. Merdivenin tabanındaki kancaya, iskeledeki sabit hattın bağlanması gerekiyor. Kanca boşsa ıslak ilk basamak yana kayabilir.

Duvar yazısında “Kapı kolu dışarıdan aşağı, içeriden yukarı çevrilir” denmiş. İçerideki el, az önce bunu tam tersinden denedi.

Demir kapının altından su giriyor. Su yalnız içeri doğru akıyor; dışarıda dalga kapıya ulaşmıyor.

Bakım kapağı, kapıyı içeriden biri açmadan binaya girmenize izin veriyor. Yeter ki merdiveni doğru sabitleyin.

**Soru:** Binaya hangi yoldan giriyorsunuz?

#### A. Kapıyı içerideki ele açtırıp içeri giriyoruz.

**Görevli sayısı:** 0

**İş tanımı:** Ortak karar; ayrıca görevli seçilmez.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

El, kolu doğru çevirmeyi öğreniyor. Kapı açılıyor. Siz geçerken dar bir boşluk aranıza giriyor; içerideki su, ayaklarınızın yanında bir insanın adımları gibi ilerliyor.

**Efektler:** `{"contamination": true}`. **Hedef:** `S2_N13` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

#### B. Bakım merdivenine sabitlemeden tırmanıyoruz.

**Görevli sayısı:** 1

**İş tanımı:** Sabitleme yapılmadan tırmanacak kişi. Yorgunluk 2/2 ve sabit kıyı hattı yoksa ölüm riski vardır.

**Sonuç 1 — geliştirici koşulu:** `{"all": [{"not": {"flag": "dockLine"}}, {"actorFatigueAtLeast": 2}]}`

{A}, yorgun kollarıyla kaymış basamağa tutunamıyor. Duvarın öbür yanında bir yüz açılıyor. Alttaki su arkadaşınızın düştüğü yeri örtüyor.

**Efektler:** `{}`. **Ölüm:** `["primary"]`; özel görsel/ses tabanı `JS03`. **Hedef:** `S2_N13` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

**Sonuç 2 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

{A}, merdiveni aşarak üst kapağı açıyor. İçeri alçak bir servis yolundan geçiyorsunuz. Sabitlenmeyen merdiven arkanızda denize doğru kayıyor.

**Efektler:** `{}`. **Hedef:** `S2_N13` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

#### C. Kapının aralığından içerideki kişiyi çekip dışarı çıkarıyoruz.

**Görevli sayısı:** 1

**İş tanımı:** Kapı aralığındaki ele yaklaşacak kişi. Elin kapıyı kullanma biçimi insanla uyuşmuyor.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

{A}, demir aralığından uzanan elin parmaklarını tutuyor. Elin arkasında bir kol yok; bütün kapı boşluğu size doğru eğilen bir yüze dönüşüyor. Arkadaşınız karanlığın içine çekiliyor.

**Efektler:** `{}`. **Ölüm:** `["primary"]`; özel görsel/ses tabanı `JS03`. **Hedef:** `S2_N13` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

#### D. Merdivenin tabanını üst kilitle sabitleyip bakım kapağından giriyoruz.

**Görevli sayısı:** 2

**İş tanımı:** Bir kişi taban kilidini kurar, diğeri kapağı açar. Kıyı zinciri daha önce sabitlenmediyse burada mekanik taban kilidi yeterlidir.

**Tek yaşayan sürümü:** Tek kişi, merdivenin taban kilidini üstten sabitleyip emniyetli kapağa tırmanır.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

Merdiven taş duvara oturuyor. Servis kapağını açıp içerideki demir kapıyı hiç kullanmadan geçiyorsunuz. Aşağıdaki el bir süre kolu çevirmeyi sürdürüyor.

**Efektler:** `{}`. **Hedef:** `S2_N13` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

### S2_N13 — Bir Işığı Ayakta Tutmak

**Sahne metni:**

Fenerin alt katında sessiz bir jeneratör var. Bakım panosu, ana deniz motoruna bağlı değil. Güvenli düşük voltaj hattı ya yedek aküyle ya da kol çevirmeli dinamoyla beslenebilir.

{FOCUS}, zemine dizilmiş eski yağmurlukları saymıyor. Hepsi boş. Fakat her birinin altında bir çift ıslak ayak izi var.

Duvar kâğıdı, jeneratörün solundaki kapıyı gösteriyor: “Dış servis koridorunu kapatmadan lens katını açmayın.”

İlerideki karanlık odanın içinden sizden önce atılmış adımlar duyuluyor. Aynı sayıda değiller. Bazıları tek ayakla atılıyor; sanki yürümek için ne kadar ayak gerektiği henüz kararlaştırılmamış.

Pano üzerindeki güvenli akü yuvası kuru. Dinamo kolu da insanın bel hizasında. Feneri şimdi besleyebilir ya da üst katta eksik enerjiyi tamamlamayı deneyebilirsiniz.

**Soru:** Fenerin enerjisi için ne yapıyorsunuz?

#### A. Yedek aküyü düşük voltaj yuvasına bağlıyoruz.

**Görevli sayısı:** 1

**İş tanımı:** Akü yuvasına bağlayacak kişi. Akü yoksa kart bunu gösterir; eylem zarar vermez ama enerji sağlamaz.

**Sonuç 1 — geliştirici koşulu:** `{"flag": "battery"}`

{A}, kapalı akü kutusunu yuvaya oturtuyor. Enerji hattı açılıyor. Kule lambası henüz yanmıyor; mercek hizalanmalı ve ışık üstten devreye alınmalı.

**Efektler:** `{"power": true}`. **Hedef:** `S2_N14` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

**Sonuç 2 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

Yanınızda akü yok. {A}, boş yuvayı kapatıyor. İşlem enerji üretemiyor. Üst katın acil servis yolunda bir fırsat daha olabilir.

**Efektler:** `{}`. **Hedef:** `S2_N14` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

#### B. Kuru dinamo koluyla hattı elle besliyoruz.

**Görevli sayısı:** 2

**İş tanımı:** Bir kişi dinamo kolunu, diğeri sabitleme mandalını tutar.

**Tek yaşayan sürümü:** Tek kişi, depolama mandallı dinamoyu kısa vuruşlarla çevirir; depolanan enerji sahne geçişlerinde kendiliğinden tükenmez.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

Dinamo çevriliyor. Gösterge güvenli aralıkta kalıyor. Kule mekanizmasının çalışmasına yetecek enerji kuruluyor; doğrudan ana deniz motorunu kullanmıyorsunuz.

**Efektler:** `{"power": true}`. **Hedef:** `S2_N14` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

#### C. Enerjiyi bırakıp servis merdiveninden yukarı çıkıyoruz.

**Görevli sayısı:** 0

**İş tanımı:** Ortak karar; ayrıca görevli seçilmez.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

Yağmurlukların yanından geçiyorsunuz. Arkada boş bir çizme yere düşüyor. Enerji hattı daha önce kurulmuşsa korunuyor; kurulmamışsa kule şimdilik karanlık.

**Efektler:** `{}`. **Hedef:** `S2_N14` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

#### D. Bütün ışıkları kapatıp karanlık odada sessizce saklanıyoruz.

**Görevli sayısı:** 0

**İş tanımı:** Ortak karar; ayrıca görevli seçilmez.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

Kapı arkanızdan kapanıyor. Işık olmadan kıyıyla denizin ayrıldığı yeri seçemiyorsunuz. Dışarıdaki şey basamakları buluyor. Sizin ışığa geri dönme kararınızdan önce, kapı kolunu bu kez doğru çeviriyor.

**Efektler:** `{}`. **Hedef:** `S2_E16` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

### S2_N14 — Davet Edilmemiş Olan

**Sahne metni:**

Alt servis koridorunun sonunda teknenin bütün gecedir altınızda kalan denizi görünüyor. Oysa fener kayalığın üstünde. Koridorun zemini, başka bir yerdeki suya açılmış gibi.

Bakım kapısının sürgüsü dışarıdan kapatılabilir. Yanında şeffaf bir kurutma perdesi ve temiz bir geçiş ızgarası var. Eski bakım talimatı sade:

“Servis hattı kapanır. Perde aşağı iner. İnsanlar kuru taraftan geçer.”

{FOCUS}, ızgaranın kenarında size ait olmayan bir el izini seçiyor. El, parmaklarını zemine basmak yerine topuk gibi sürüklemiş. Bedenleri öğrenen şey hâlâ bir yeri yanlış yapıyor.

Kapının arkasından sizin sesleriniz geliyor. Biri panik içinde “Beni dışarıda bıraktınız” diyor. Fakat o ismi taşıyan kişi hayattaysa yanınızda; öldüyse artık hiçbir canlı görevde bulunmadığını biliyorsunuz.

Sesi tanımak, kapının arkasında bir insan olduğunu kanıtlamıyor.

**Soru:** Servis koridorunu nasıl kapatıyorsunuz?

#### A. İçeride biri kalmasın diye kapıyı açık bırakıyoruz.

**Görevli sayısı:** 0

**İş tanımı:** Ortak karar; ayrıca görevli seçilmez.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

Su koridor boyunca sessizce yükseliyor. İnsanlarınızın hepsinin hesabını bildiğiniz hâlde, tanıdık ses için açık bir yol bırakmış oluyorsunuz.

**Efektler:** `{"doorSealed": false, "contamination": true}`. **Hedef:** `S2_N15` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

#### B. Sürgüyü kapatıp kurutma perdesini indirmeden geçiyoruz.

**Görevli sayısı:** 1

**İş tanımı:** Dışarıdan sürgüyü kapatacak kişi.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

{A}, servis yolunu kilitliyor. Kapı tutuluyor; ancak ayakkabılarınıza yapışmış su izleri ızgarada ayrılmıyor. Daha önce aranıza sızmış olan temizlenmedi.

**Efektler:** `{"doorSealed": true}`. **Hedef:** `S2_N15` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

#### C. Sürgüyü kapatıyor, perdeyi indirip kuru ızgaradan birlikte geçiyoruz.

**Görevli sayısı:** 2

**İş tanımı:** Bir kişi sürgüyü kapatır, diğeri perdeyi sabitler. Kuru tarafa geçiş, yaşayanların tamamını kapsar.

**Tek yaşayan sürümü:** Tek kişi, mandallı perdeyi kapatıp kuru ızgaradan geçer; kendisi için görünmez bir yardımcı yazılmaz.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

Servis hattı kapanıyor. Perde aşağı inerken aranızdaki bir boşlukta su patlıyor. Izgarada kalan izler bir beden kuramadan dağılıyor. Yalnız hayatta kalan gerçek kişiler kuru tarafta toplanıyor.

**Efektler:** `{"doorSealed": true, "contamination": false}`. **Hedef:** `S2_N15` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

#### D. Sesi son kez kontrol etmek için kapı aralığına bakıyoruz.

**Görevli sayısı:** 1

**İş tanımı:** Hesabı bilinen grubun dışında, doğrulanmamış sese yaklaşacak kişi.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

{A}, içeri bakmak için eğiliyor. Kapının karanlığı bir yüzün ağzı gibi açılıyor. Koridordan geriye su sıçramıyor; yalnız arkadaşınızın tuttuğu kapı kolu kuru tarafta kalıyor.

**Efektler:** `{}`. **Ölüm:** `["primary"]`; özel görsel/ses tabanı `JS03`. **Hedef:** `S2_N15` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

### S2_N15 — Denizin İçindeki Merdiven

**Sahne metni:**

Üst kata çıkan ana merdivenin birkaç basamağı çökmüş. Sol tarafta sığ suyla örtülü eski bir geçit var. Sağda, duvar boyunca bakım çıkıntıları ilerliyor.

{FOCUS}, korkuluğun iç tarafındaki çizgileri fark ediyor. Yeşil boya kuru bakım yolunu, kırmızı boya suya açık eski merdiveni işaretliyor. Deniz ışığı iki rengi de gri gösteriyor. El fenerini doğrudan tuttuğunuzda ayrılıyorlar.

Su tarafındaki basamaklarda kendi adımlarınızın sesini duyuyorsunuz. Henüz oraya basmadınız.

Duvar çıkıntılarının üstünde ayakkabı sığacak yer var. Her geçişte kilitlenen küçük tutamaklar, tek kişinin de güvenle kullanabileceği aralıkta.

Yukarıdaki mercek odasına çıkan gerçek rotayı işaretlemek, dönerken karanlıkta aynı yolu bulmanız için gerekli.

**Soru:** Kırık merdiveni hangi yoldan aşıyorsunuz?

#### A. Su içindeki basamaklardan hızlıca geçiyoruz.

**Görevli sayısı:** 1

**İş tanımı:** Önce su merdivenini geçecek kişi. Yorgunluk 2/2 olduğunda tutunamama ölümcüldür.

**Sonuç 1 — geliştirici koşulu:** `{"actorFatigueAtLeast": 2}`

{A}, yorgunluktan bir basamağı kaçırıyor. Su duvarın üzerinde yükseliyor. Arkadaşınızın yüzüne daha alttan bir yüz yaklaşıyor. Merdivenin geri kalanı kararıyor.

**Efektler:** `{}`. **Ölüm:** `["primary"]`; özel görsel/ses tabanı `JS01`. **Hedef:** `S2_N16` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

**Sonuç 2 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

{A}, ıslak basamakları aşarak üst kapıyı açıyor. Ötekiler kuru kenardan geçiyor. Eski su yolu size doğru bir adım daha ilerlemiş gibi görünüyor.

**Efektler:** `{"contamination": true}`. **Hedef:** `S2_N16` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

#### B. Doğrudan ışıkla yeşil yolu bulup bakım tutamaklarından geçiyoruz.

**Görevli sayısı:** 2

**İş tanımı:** Bir kişi öndeki tutamağı dener, öteki duvar işaretini kaydeder.

**Tek yaşayan sürümü:** Tek kişi, aralıklı kendinden kilitlenen tutamakları kullanarak bakım yolunu geçer ve rotayı işaretler.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

Boyanın gerçek rengi ortaya çıkıyor. Bakım tutamakları her adımda kilitleniyor. Güvenli dönüş yolunu tebeşirle işaretliyorsunuz.

**Efektler:** `{"routeMarked": true}`. **Hedef:** `S2_N16` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

#### C. Kırmızı işaretin acil çıkış olduğunu varsayarak izliyoruz.

**Görevli sayısı:** 0

**İş tanımı:** Ortak karar; ayrıca görevli seçilmez.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

Kırmızı çizgi bir duvarın içine girip suyun altında devam ediyor. Yanlışlığını fark edip üst sahanlığa geri dönüyorsunuz. Kuru dönüş yolu işaretlenmemiş kalıyor.

**Efektler:** `{"falseReply": true}`. **Hedef:** `S2_N16` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

#### D. Merdiven başında dinlenip dinlediğimiz adımları karşılaştırıyoruz.

**Görevli sayısı:** 0

**İş tanımı:** Ortak karar; ayrıca görevli seçilmez.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

Siz durunca sudaki adımlar bir basamak daha atıyor. Dışarıdaki yürüyüşün size ait olmadığını anlıyorsunuz. Kısa bir yan sahanlıktan üst kata ulaşıyorsunuz; dönüş için işaret bırakmamış oldunuz.

**Efektler:** `{"restAll": 1}`. **Hedef:** `S2_N16` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

### S2_N16 — Mercekteki Göz

**Sahne metni:**

Fenerin mercek odası yuvarlak. Büyük cam dilimler ışığı denize taşıyor. Şimdilik yalnız bakım fenerlerinizin ışığını çoğaltıyorlar.

{FOCUS}, karşı camda bir yüz görüyor. Başını çevirdiğinde orada kimse yok. Aynı yüz öteki camda beliriyor. Sonra iki ayrı dilimde aynı anda.

Bir varlığın iki görüntüsü mü, iki varlığın tek yüzü mü olduğunu anlayamıyorsunuz.

Bakım kolunun yanında bir kalkan var. Üzerindeki talimat okunuyor: “Prizmaya çıplak gözle yaklaşma. Kalkanı indir. Beyaz referansı sabit üç taşla hizala.”

Üç taşın yönü basılı haritada bulunuyorsa hizalama doğrudan yapılabilir. Harita yoksa kolun üzerindeki mekanik yuva merceği servis referansına oturtuyor. İki yöntem de mümkün; gözünüzü cama dayamak gerekmiyor.

Camın içinden tırnak sesi geliyor. Ses, merceğin döndüğü yönden bağımsız hareket ediyor.

**Soru:** Merceği nasıl ayarlıyorsunuz?

#### A. Hep birlikte çıplak cama yaklaşıp görüntüyü içeriden izliyoruz.

**Görevli sayısı:** 0

**İş tanımı:** Ortak karar; ayrıca görevli seçilmez.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

Hepinizin yüzü ayrı cam diliminde beliriyor. Bir göz kırpışında mercek dönüyor. Dışarıdan görünen son şey, ışığın içinden ellerini cama bastıran yüzleriniz oluyor.

**Efektler:** `{}`. **Ölüm:** `"all"`; özel görsel/ses tabanı `JS08`. **Hedef:** `S2_E17` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

#### B. Merceğe dokunmadan üstteki acil ışık düğmesine çıkıyoruz.

**Görevli sayısı:** 0

**İş tanımı:** Ortak karar; ayrıca görevli seçilmez.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

Camın içindeki yüz sizi izliyor. Mekanik ayarı tamamlamadan üst düğmeye ulaşıyorsunuz. Işık yanarsa bile doğru yöne dönmeyebilir.

**Efektler:** `{}`. **Hedef:** `S2_N17` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

#### C. Camın arkasındaki gözü yakından inceliyoruz.

**Görevli sayısı:** 1

**İş tanımı:** Prizma yüzeyine yaklaşacak kişi. Bakım talimatı çıplak gözle yaklaşmayı açıkça yasaklıyor.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

{A}, yüzünü parlak dilime yaklaştırıyor. Camdaki göz büyüyor. Bir el, camın iki yüzünden aynı anda uzanıyor. Sonra arkadaşınız yalnız kırılmış ışığın içinde seçiliyor.

**Efektler:** `{}`. **Ölüm:** `["primary"]`; özel görsel/ses tabanı `JS08`. **Hedef:** `S2_N17` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

#### D. Koruyucu kalkanı indirip beyaz referansı mekanik yuvaya oturtuyoruz.

**Görevli sayısı:** 1

**İş tanımı:** Koruyucu kalkan ve servis referans kolunu kullanacak kişi.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

{A}, önce kalkanı indiriyor. Camdaki yüz karanlıkta kalıyor. Beyaz işaret yuvasına oturunca ışık yolu denize açılıyor. Mercek hizası tamam.

**Efektler:** `{"lensAligned": true}`. **Hedef:** `S2_N17` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

### S2_N17 — Işık Yandığında

**Sahne metni:**

Üst konsolda üç anahtar var. İlki enerji, ikincisi dönme, üçüncüsü bakım bypassı. Bypass kolunun yanında uyarı duruyor: “Açık mercekle bypass kullanılmaz.”

Denizin karanlığında yüzlerce küçük ışık beliriyor. Yakından bakınca ışık olmadıklarını fark ediyorsunuz. Suyun üstünde kalan gözler.

{FOCUS}, aşağıdaki servis kapısından bir ses duyuyor. Kapı doğru kapatılmışsa ses uzakta kalıyor. Açık bırakıldıysa alt basamaklarda su sürünüyor.

Fenerin normal ışığı, kıyıyla su arasındaki çizgiyi yeniden görünür kılabilir. Karanlıkta yapılan hareketleri ışıkta tamamlayamayan şey, kendine bir insan bedeni kurmakta zorlanıyor.

Konsolun üzerinde ikinci bir not: “Enerji yoksa kuru el jeneratörü. Hiza yoksa önce referans kolu. Kısa yol, açık kapıdır.”

**Soru:** Feneri nasıl yakıyorsunuz?

#### A. Kuru el jeneratörünü ve servis referansını tamamlayıp normal devreyi açıyoruz.

**Görevli sayısı:** 2

**İş tanımı:** Bir kişi kuru el jeneratörünü kurar, diğeri kalkan kapalıyken referansı kontrol eder. Önceki eksikleri daha uzun ama güvenli yöntemle tamamlama fırsatı.

**Tek yaşayan sürümü:** Tek kişi, depolamalı el jeneratörünü kurar; ardından korumalı servis koluna geçer. Aynı anda iki kolu tutması gerekmez.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

Yedek el jeneratörü ve korumalı referans kolu sırayla kuruluyor. Normal ışık devreye giriyor. Işığın denize değdiği çizgide, suyun üstündeki yüzler aşağı çekiliyor.

**Efektler:** `{"power": true, "lensAligned": true, "beacon": true}`. **Hedef:** `S2_N18` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

#### B. Hazırlanmış enerji ve mercekle normal ışık devresini açıyoruz.

**Görevli sayısı:** 1

**İş tanımı:** Normal ışık düğmesini kullanacak kişi. Eksik enerji/hiza durumu kartta görünür.

**Sonuç 1 — geliştirici koşulu:** `{"all": [{"flag": "power"}, {"flag": "lensAligned"}]}`

{A}, normal devreyi açıyor. Güç ve hiza birlikte. Işık denizin üzerinde gerçek kıyıyı çiziyor. Hiçbir yansımaya yeni bir kapı açmadınız.

**Efektler:** `{"beacon": true}`. **Hedef:** `S2_N18` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

**Sonuç 2 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

{A}, düğmeyi açıyor. Güç veya mercek hizası eksik. Konsol uyarı lambası yakıyor ama gerçek fener ışığı oluşmuyor. Çıplak karanlık, denizin üstünde kalıyor.

**Efektler:** `{"beacon": false}`. **Hedef:** `S2_N18` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

#### C. Bakım bypassını indirip gücü doğrudan merceğe veriyoruz.

**Görevli sayısı:** 1

**İş tanımı:** Uyarıya rağmen açık mercek bypassını kullanacak kişi.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

{A}, bypassı açınca ışık bir an aşağıya, sizin durduğunuz yere dönüyor. Bedenlerinizin arasındaki boşluklar da gölge veriyor. Işık çalışıyor, fakat içerideki yolu da açmış oldunuz.

**Efektler:** `{"beacon": true, "contamination": true}`. **Hedef:** `S2_N18` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

#### D. Yanan camın içine bakıp dışarıdaki şeyin kaybolduğunu doğruluyoruz.

**Görevli sayısı:** 1

**İş tanımı:** Korumasız merceğe doğrudan bakacak kişi; ışık kaynağı güvenli gözlem noktası değildir.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

{A}, ışığın kaynağına bakıyor. Merceğin içindeki yüz, bu kez cama dokunmadan yaklaşıyor. Arkadaşınızın gölgesi birkaç saniye yerinde kalıyor; sonra o da ışığa karışıyor.

**Efektler:** `{}`. **Ölüm:** `["primary"]`; özel görsel/ses tabanı `JS08`. **Hedef:** `S2_N18` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

### S2_N18 — Son İki Vuruş

**Sahne metni:**

Kıyı konsolu çalışıyor. Fenerin içindeki bakım hattı, hem açık kalmış eski yardım çağrısını hem bugünün servis istasyonunu taşıyor.

İlk ses ağlıyor. “Bizi duyduğunuzu söyleyin.”

İkinci ses yardım teklif ediyor. “Kapıyı açın, sizi alalım.”

İlk çağrıya gerçeği söylemek gerekiyor: Duyuldular. Rapor yanlıştı. İkinci sesin ise yalnız tanıdık olması yeterli değil. Gerçek istasyon ritim sınamasının son iki vuruşunu değiştirmeli. Doğru cevap verirken sizden hiçbir kapıyı açmanızı istememeli.

{FOCUS}, konsoldaki göndere basmadan önce kâğıtlara bakıyor. Gerçeği belgeleyen kayıt elinizdeyse, inkârı bir cümleyle düzeltebilirsiniz.

Dışarıdan bir tekne motoru duyuluyor. Görünmüyor. Suya yakın bir yerden sizin isimlerinizden biri söyleniyor. O adın bir insana ait olması, sesin de ona ait olduğu anlamına gelmiyor.

**Soru:** İki çağrıya hangi karşılığı veriyorsunuz?

#### A. İlk yardım teklifini kabul edip kapıyı açacağımızı söylüyoruz.

**Görevli sayısı:** 0

**İş tanımı:** Ortak karar; ayrıca görevli seçilmez.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

Ses sınama istemiyor. Konum sormuyor. “Açın,” diyor. Kurtarılmayı, kimliğini doğrulamadığınız bir çağrıya bağlamış oldunuz.

**Efektler:** `{"falseReply": true, "rescueVerified": false}`. **Hedef:** `S2_N19` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

#### B. Eski çağrının duyulduğunu kabul ediyor ama kurtarma hattını kapatıyoruz.

**Görevli sayısı:** 1

**İş tanımı:** Konsolda tanıklık cümlesini söyleyecek kişi.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

{A}, inkârı düzeltiyor: “Çağrınız alındı.” Aşağıdaki ağlama susuyor. Fakat bugünün yardım istasyonunu sınamadan kapatıyorsunuz. Gerçek kurtarma bağlantısı kurulmuyor.

**Efektler:** `{"sosAnswered": true, "rescueVerified": false}`. **Hedef:** `S2_N19` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

#### C. Kaydı esas alıp eski çağrıyı kabul ediyor, bugünün istasyonunu ritimle sınıyoruz.

**Görevli sayısı:** 1

**İş tanımı:** Doğrulama konuşmasını yapacak kişi. Gerçek kanıt ve ritim bilgisi eksikse kart bunu gösterir; başarılı doğrulama uydurulmaz.

**Sonuç 1 — geliştirici koşulu:** `{"all": [{"flag": "logProof"}, {"flag": "signalCode"}]}`

{A}, çağrının alındığı saati söylüyor. Sonra sınama vuruşlarını gönderiyor. Yanıt son iki vuruşu değiştiriyor; kapıyı değil, servis iskelesindeki beyaz işareti soruyor. Geçerli kurtarma bağlantısı kuruluyor.

**Efektler:** `{"sosAnswered": true, "rescueVerified": true, "falseReply": false}`. **Hedef:** `S2_N19` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

**Sonuç 2 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

{A}, sınamayı tamamlamak istiyor. Fakat doğru kayıt veya vuruş bilgisi eksik. Gelen ses boşluğu sizin adınızla dolduruyor. Onay sandığınız şey bir tekrar.

**Efektler:** `{"falseReply": true, "rescueVerified": false}`. **Hedef:** `S2_N19` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

#### D. Kapıyı açıp bizi almaya gelenlere sesleniyoruz.

**Görevli sayısı:** 0

**İş tanımı:** Ortak karar; ayrıca görevli seçilmez.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

Dışarıda bir tekne yok. Aşağıdaki karanlık, kapının boyuna kadar yükseliyor. Fenerin içindeki sesler birer birer aynı cümleyi söylüyor: “Çağrınızı aldık. İçeri gelin.”

**Efektler:** `{}`. **Ölüm:** `"all"`; özel görsel/ses tabanı `JS07`. **Hedef:** `S2_E18` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

### S2_N19 — Kimseyi Suda Bırakmadan

**Sahne metni:**

Gün doğmadan önce son iniş başlıyor. Üst kapıdan aşağı baktığınızda birkaç ayrı yol görüyorsunuz. Deniz, ışığın vurmadığı basamakları kıyı gibi gösteriyor.

Bakım geçişi daha önce işaretlendiyse yeşil tebeşir izleri duruyor. İşaret yoksa duvara bağlı emniyet kablosu kuru kenarı bulmanızı sağlıyor. Kabloyu duvardan sökmeden izlemek mümkün.

{FOCUS}, iniş kolunun yanında küçük bir fren görüyor. Onu kilitlemek geçidi sabit tutar. Kimsenin sırf kolu tutmak için içeride kalması gerekmez.

Aşağıdaki ses artık yardım istemiyor.

“İçinizden biri kalsın,” diyor. “Ötekileri bırakırım.”

O sesi hayatınızda hiç duymamışsınız gibi geliyor. Birkaç saat önce kaptan gibi konuştuğuna inanmak zor.

Yaşayanların isimleri bir kez daha sayılıyor: {ALIVE_NAMES}. Suyun altında kalanlar: {DEAD_NAMES}. Hiç kimse iki listede birden değil.

**Soru:** Son inişi nasıl güvenceye alıyorsunuz?

#### A. Duvar emniyet kablosunu izleyip kol frenini kilitleyerek iniyoruz.

**Görevli sayısı:** 2

**İş tanımı:** Bir kişi geçiş kolunu, diğeri duvar emniyet kablosunu kontrol eder; işaret eksikse de güvenli ve daha uzun yol.

**Tek yaşayan sürümü:** Tek kişi kol frenini sabitleyip duvar kablosunu izler. Geçiş kendinden kilitlenir.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

Kablo kuru kenarı gösteriyor. Kol freni yerine oturuyor. Hayatta kalanlar birlikte geçiyor; birinin içeride tutulmasına gerek kalmıyor. Kıyı geçidi açık.

**Efektler:** `{"gateOpen": true}`. **Hedef:** `S2_N20` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

#### B. Önceden işaretlediğimiz bakım yolunu kullanıp alt mandalı açıyoruz.

**Görevli sayısı:** 1

**İş tanımı:** Yeşil işaretli bakım yolundan alt mandala ulaşacak kişi. İşaretlenmemişse kart bunun eksik olduğunu gösterir.

**Sonuç 1 — geliştirici koşulu:** `{"flag": "routeMarked"}`

{A}, yeşil çizgiyi takip edip alt mandalı açıyor. Yol sabitleniyor. Hayatta kalan gerçek grup iskele çizgisine ulaşıyor.

**Efektler:** `{"gateOpen": true}`. **Hedef:** `S2_N20` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

**Sonuç 2 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

{A}, doğru işareti bulamıyor. Birkaç adımın ardından kolu yeniden üst sahanlıkta görüyor. Geçiş sabitlenemiyor; ışığın çizdiği kıyıya yine de ulaşmayı deniyorsunuz.

**Efektler:** `{"gateOpen": false}`. **Hedef:** `S2_N20` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

#### C. Birini içeride bırakıp kalanların geçmesini sağlıyoruz.

**Görevli sayısı:** 1

**İş tanımı:** İçeride bırakılacak yaşayan kişi seçilir. Bu bir gönüllü görevi gibi anlatılmaz: grup kimi bırakacağına karar verir. Mekanik frenin varlığı nedeniyle bedel gereksizdir.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

{A}, frene dokunmadan kolun yanında kalıyor. Dışarıya koşanlar, kolun kendi kendine kilitlendiğini sonradan görüyor. Bırakılan kişinin arkasında kapı açılıyor.

**Efektler:** `{"griefDebt": true, "gateOpen": true}`. **Ölüm:** `["primary"]`; özel görsel/ses tabanı `JS03`. **Hedef:** `S2_N20` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

#### D. Sesin şartını reddedip hep birlikte aşağıdaki suya geri dönüyoruz.

**Görevli sayısı:** 0

**İş tanımı:** Ortak karar; ayrıca görevli seçilmez.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

Su, ışığın altındaki son basamağı örtüyor. Bir adım sonra kulenin altı değil, karanlık bir merdivensizlik var. Ayaklarınız yer arıyor; aşağıdaki eller her biriniz için ayrı açılıyor.

**Efektler:** `{}`. **Ölüm:** `"all"`; özel görsel/ses tabanı `JS01`. **Hedef:** `S2_E19` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

### S2_N20 — Karaya Çıkan Ne

**Sahne metni:**

Fenerin dibindeki beyaz çizgi ilk ışığı alıyor. Kurtarma çağrısı doğrulandıysa gerçek servis teknesi, tarif ettiği üç taşın arkasında bekliyor. Doğrulanmadıysa sisin içinden bir motor duyuluyor; nerede olduğu görünmüyor.

Kendi geldiğiniz tekne de kıyıya yakın duruyor. Motoru güvenli hâle getirdiyseniz çalıştırabilirsiniz. Gerçek kıyı haritanız yoksa denizin hangi tarafının kara olduğunu kesin bilmiyorsunuz.

Konsolun son kablosu, iskeleye kadar uzanmış. Onu koparmak bütün çağrıları susturabilir. Ya da yalnız sizi duyan son insanı.

{FOCUS}, elindeki su izine bakıyor. Denizden çıktınız. Fakat suyun sizden çıkıp çıkmadığını söylemek daha zor.

Hayatta kalanlar: {ALIVE_NAMES}.

Geride kalanlar: {DEAD_NAMES}.

Yukarıda, fenerin ışığıyla karanlık arasındaki çizgide, sizin gibi durmayı öğrenmiş bir şekil bekliyor.

**Soru:** Son kararınız nedir?

#### A. Tanıklığı yanımızda tutup doğruladığımız kurtarma yoluna yürüyoruz.

**Görevli sayısı:** 0

**İş tanımı:** Ortak karar; ayrıca görevli seçilmez.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

Yaşayanlar birbirini gözden çıkarmadan beyaz çizgiye ilerliyor. Bu kez bir sesin tanıdık olmasına değil, bütün gece topladığınız karşı kanıtlara güveniyorsunuz.

**Efektler:** `{"finalChoice": "A"}`. **Hedef:** `RESOLVE_FINAL` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

#### B. Kendi teknemize dönüp bildiğimiz kıyıya gitmeyi deniyoruz.

**Görevli sayısı:** 0

**İş tanımı:** Ortak karar; ayrıca görevli seçilmez.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

Geldiğiniz tekneye dönüyorsunuz. Boş yerler, yaşayanların oturduğu yerlerden daha ağır görünüyor. Kontak çevriliyor. Deniz, farların önünde bir yol gibi açılıyor.

**Efektler:** `{"finalChoice": "B"}`. **Hedef:** `RESOLVE_FINAL` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

#### C. Son kabloyu koparıp bütün çağrıları susturuyoruz.

**Görevli sayısı:** 1

**İş tanımı:** Son çağrı kablosunu koparacak yaşayan kişi. Bu eylem kurtarma kanalını da kapatır.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

{A}, kabloyu koparıyor. Yıllardır süren ses bir anda kesiliyor. O sessizlikte, şimdiye kadar dalga sandığınız başka bir nefesi duyuyorsunuz.

**Efektler:** `{"finalChoice": "C"}`. **Hedef:** `RESOLVE_FINAL` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

#### D. Kurtulmak yerine fenerde kalıp ışığı tutmayı kabul ediyoruz.

**Görevli sayısı:** 0

**İş tanımı:** Ortak karar; ayrıca görevli seçilmez.

**Sonuç 1 — geliştirici koşulu:** `Varsayılan: önceki koşullar eşleşmediyse`

Teknelerin sesleri uzaklaşıyor. Fenerin bakım masasında yeni bir vardiya çizelgesi beliriyor. İlk satıra kimse yazmadan yaşayanların isimleri düşüyor.

**Efektler:** `{"finalChoice": "D"}`. **Hedef:** `RESOLVE_FINAL` (son yaşayanın kaybında genel öncelik ayrıca uygulanır).

## 8. Yirmi final — tam metinler

Yalnız seçilmiş final gösterilir. İsimler o finalin ölüm işlemleri tamamlanmış snapshot'ına göre yerleşir. Finale varmadan kaybedilenler diriltilmez. Kurtarma teknesi varmış gibi anlatılan şartlı N20 sahnesi bir gerçek doğrulama sağlamaz; sonucun hangi tekneye çıktığı çözümleyiciye bağlıdır.

### S2_E01 — Sabahın Gerçek Kıyısı

**Sınıf:** Eksiksiz başarı

Kurtarma teknesi üç taşın arkasından çıkıyor. Görevli önce çağrı kodunu, sonra rapordaki saati soruyor. İkisinin de karşılığını biliyorsunuz. Kimse sizden yeni bir kapı açmanızı istemiyor.

Hepiniz karaya çıkıyorsunuz. {ALIVE_NAMES}. Bir kişi bile eksik değil.

Kayıt, yıllar önce kapatılmış dosyayı yeniden açıyor. Eski raporun yanına gerçek çağrı ekleniyor. Hiç kimse o gece denizde yardım isteyen olmadığını bir daha söyleyemeyecek.

Fenerin ışığı sabah sönerken, kıyıdaki su yalnız su gibi hareket ediyor. Eve döndüğünüzde kapınızda bekleyen kimse yok. Telefonlarınızda yeni çağrı yok.

Bir süre dalga sesinden ürküyorsunuz. Sonra o da geçiyor.

Bu kez deniz sizden hiçbir şey götüremedi.

### S2_E02 — Eksik Kişilerle Sabah

**Sınıf:** Kayıplarla gerçek kurtuluş

Gerçek servis teknesi sizi kıyıya çıkarıyor. Güvertede {ALIVE_COUNT} kişi varsınız. Yola çıktığınızda {N} kişiydiniz.

{DEAD_NAMES}. İsimlerini doğru hatırlıyorsunuz. Ne zaman, hangi kararda kaybolduklarını da.

Kayıt teslim ediliyor. Eski çağrı resmen kabul ediliyor. Kıyıdaki sessizlikte artık sizi izleyen başka bir nefes yok.

İlk kez güvendesiniz. Bu, daha iyi hissetmenizi sağlamıyor.

Aylar sonra buluştuğunuzda masaya fazladan sandalye koymuyorsunuz. Onları unuttuğunuz için değil. Bir boşluğu insanla karıştırmanın ne demek olduğunu bildiğiniz için.

Son fotoğrafta yalnız kurtulanlar var. Eksikler, başka bir şeye dönüşmeden, oldukları insanlar olarak hatırlanıyor.

### S2_E03 — Son Yaşayan

**Sınıf:** Tek kişiyle gerçek kurtuluş

Kurtarma teknesine yalnız {LAST_ALIVE} çıkıyor.

Görevli kaç kişi olduğunuzu sorduğunda doğru sayıyı söylüyor: {N}. Sonra bütün isimleri tek tek anlatıyor. Hangi iş için kimi seçtiğinizi, hangi kapıyı açtığınızı, hangi uyarıyı geç fark ettiğinizi.

Kimse denizden gelen seslere bakmasını istemiyor. Gerçek insanlar, anlattıkları bitene kadar bekliyor.

Rapor düzeltiliyor. Çağrı kapanıyor. Suya ait şey kıyıya çıkamıyor.

Yıllar sonra {LAST_ALIVE}, bir teknenin motoru durduğunda herkesin neden aynı anda konuştuğunu anlıyor: İnsan bazen sessizlikte duyacaklarından korkuyor.

O geceyi anlatırken tek bir yerde duraksıyor.

“Beni de onlar seçti,” diyor. “Son işi yapmam için.”

### S2_E04 — Siz Çıktınız, Çağrı Çıkmadı

**Sınıf:** Tehdit tam kapanmadan kurtuluş

Servis teknesi gerçek. Kıyı gerçek. Hayatta kalanların hepsi karaya çıkıyor: {ALIVE_NAMES}.

Fakat arkanızdaki geçişte tamamlanmamış bir şey var. Açık kalan bir kapı, taşınan su izi ya da kabul edilip yerine getirilmeyen bir tanıklık. Kayıtta, nerede olduğunu bulamadığınız bir boşluk kalıyor.

İlk ay hiçbir şey olmuyor. Sonra {LAST_ALIVE} banyodaki giderden bir telsiz cızırtısı duyuyor.

“Bizi duydunuz,” diyor bir ses. “Duyduğunuzu söylediniz.”

Ses gelmiyor artık. Su geliyor. Musluklar kapalıyken lavabonun dibinde birikiyor.

Bir süre sonra, gecenin en sessiz saatinde, bütün kurtulanların telefonlarında aynı uyarı beliriyor:

ÇAĞRI TAMAMLANMADI.

### S2_E05 — Kıyı Sandığınız

**Sınıf:** Sahte kurtarma

Sisin içindeki tekneye biniyorsunuz. Görevlinin yüzünü görmek için ışık tutunca başını çeviriyor. Konuşurken cümlelerinizin son kelimesini aynen tekrar ediyor.

Kıyıya vardığınızda evler yerinde. Yalnız pencereler suyun içinden bakılıyormuş gibi dalgalanıyor.

{LAST_ALIVE}, kapısını açmak için anahtarını çıkarıyor. Kapının altından değil, üstünden su damlıyor. Sokak lambalarının etrafında küçük kabarcıklar yükseliyor.

Biriniz nefesini tutuyor. Diğerleri nedenini o an anlıyor.

Siz karaya çıkmadınız.

Denizin altında, karaya benzeyen bir yere geldiniz. Kıyıda olduğunu sandığınız o kişi, sizi indirirken kapıyı arkanızdan kapatıyor.

### S2_E06 — Işıksız Beyaz Çizgi

**Sınıf:** Yön kaybıyla mahsur kalma

Beyaz çizgiye yürüyorsunuz. Fenerin ışığı doğru yanmadığı için kıyıyla suyu ayıran kenarı seçemiyorsunuz.

Bir adım, sonra bir adım daha.

{LAST_ALIVE}, arkasına bakınca fenerin hâlâ aynı uzaklıkta olduğunu görüyor. Önünüzdeki taş da. Ayaklarınız sırılsıklam, ama suya girdiğiniz bir anı hatırlamıyorsunuz.

Kurtarma teknesi varsa bile sizi göremiyor. Sesleniyorsunuz. Cevap kendi sesinizden geliyor; biraz daha aşağıdan.

Gün doğmuş olmalı. Telefonunuz öyle söylüyor.

Üzerinizdeki karanlıkta, fener ışığının ulaşmadığı yerde, bir şey iki ayağı üzerinde ilk kez dik duruyor. Artık yürümek için sizi izlemesine gerek kalmamış.

### S2_E07 — Kuru Güvertedeki Islak İz

**Sınıf:** Varlık tekneye taşındı

Geldiğiniz teknenin motoru dönüyor. İskele geride kalıyor. Hayatta kalanlar güvertede: {ALIVE_NAMES}.

Yükünüz azalmış olması gerekirken tekne ilk gelişinizden daha ağır. Su çizgisi bordada yavaş yavaş yükseliyor.

{LAST_ALIVE}, kuru güvertede beliren ayak izini görüyor. Sonra ikinci izi. İkisi de aynı ayağa ait.

İzler düzeliyor. Sağ ayak, sol ayak. Birkaç adım sonra sizin yürüyüşünüzden farkı kalmıyor.

Kaptan köşkünde kimse yokken dümen dönüyor. Ana karadaki ilk limanın ışıkları görünüyor.

İlk kez, içeri aldığınız şeyin sizi öldürmeye çalışmadığını anlıyorsunuz.

Yalnızca sizden önce karaya çıkmak istiyor.

### S2_E08 — Uzaklaşmayan Fener

**Sınıf:** Rota olmadan sonsuz sefer

Motor güvenli çalışıyor. Deniz sakinleşiyor. Bir süre gerçekten döndüğünüze inanıyorsunuz.

Fener sancak tarafında kalıyor. Bir saat sonra hâlâ orada. Dümeni ters yöne çeviriyorsunuz; bu kez iskele tarafında, yine aynı uzaklıkta.

Basılı harita yok. Elektronik ekranda tek bir yer görünüyor: EVE VARILDI.

Yakıt göstergesi düşmüyor. Saat ilerlemiyor. Güvertedeki su kurumuyor.

{LAST_ALIVE}, telsizi kapattığını hatırlıyor. Hoparlörden kendi sesi geliyor:

“İçinizden biri aşağı insin.”

Bu kez sesin teknenin altından gelmediğini biliyorsunuz. Kayıt, biraz önce sizin çıkardığınız nefesle başlıyor.

### S2_E09 — Son Marş

**Sınıf:** Güvenli olmayan motorla kayıp

Kontak dönüyor. Pervane, kendisine dolanan şeyi kesmiyor. Onun etrafında dönmeye başlıyor.

Tekne ilerlemek yerine baş aşağı doğru çekiliyor. Önce güverte, sonra ufuk eğiliyor. Eşyalar yere düşmüyor; sanki aşağı artık başka yerdeymiş gibi cama doğru kayıyor.

İçinizden biri kapı koluna tutunuyor. Denizin içinden gelen uzun bir kol, teknenin dışını aynı biçimde tutuyor.

Sonunda motor çalışıyor.

Su, camların üstünden kapanırken içerideki bütün ışıklar aynı anda yanıyor. Tekne denizin altında, normal bir yolculuk yapar gibi düzleşiyor.

Telsizden sakin bir anons duyuluyor:

“Sonraki durakta inecek var mı?”

### S2_E10 — Kayda Geçmeyen Kurtuluş

**Sınıf:** Tekneyle bedelli kaçış

Doğru harita, güvenli motor ve karaya çıkan gerçek yol. Hayatta kalanları ana kıyıya ulaştırıyorsunuz: {ALIVE_NAMES}.

Fakat fenerdeki beyaz geçidi kullanmadınız. Kapanması gereken son hattı arkanızda açık bıraktınız. Eski yardım çağrısı, sizden uzaklaştıkça da sürüyor.

O geceyle ilgili ifadeleriniz alınırken teknenin kayıt cihazı bulunamıyor. Yanınızda taşıdığınız belgelerin bazıları kupkuru, bazıları okunamayacak kadar ıslak.

Bir gün başka bir teknenin aynı sularda kaybolduğunu duyuyorsunuz. Haberde “Bölgede yardım çağrısı kaydı bulunamadı” diyor.

Telefonunuz çalıyor.

Bu kez isim yabancı değil. Kendi numaranız sizi arıyor. Açarsanız birilerine yardım edebilirsiniz.

Belki de bu yüzden arıyor.

### S2_E11 — Sessizlikte Kalanlar

**Sınıf:** Tanıklığı susturarak kapanma

Eski çağrının duyulduğunu kabul etmiştiniz. Şimdi son kabloyu da kestiniz.

Kurtarma teknesinin sesi uzaklaşıyor. Fenerin merdivenleri uzuyor. Aşağı inmeye çalıştığınızda hep aynı kata dönüyorsunuz.

Artık biri yardım isterse duyabilirsiniz. Ama dışarıya konuşamazsınız.

{LAST_ALIVE}, konsolun üstündeki yeni raporu okuyor. Yıllar önceki imzanın altında sizin isimleriniz var. Hepsinin yanında aynı açıklama: “Dinledi. Yanıt hattını kapattı.”

Dışarıdaki deniz kararmıyor. Sadece sizin gördüğünüz dünya, fenerin camlarının içinde kalıyor.

Bir gün yeni bir tekne duruyor. Yardım çağrısını duyuyorsunuz. Bu kez cevap vermek için hiçbir kablonuz yok.

### S2_E12 — Çağrı Sizsiniz

**Sınıf:** Sesin yeni kaynağı

Kablo koptuğunda eski çağrı sona ermiyor. Yalnız yer değiştiriyor.

Artık bir bedenin içinde değilsiniz. Hangi duvarın, hangi su borusunun, hangi hoparlörün içinden baktığınızı anlayamıyorsunuz.

Denizde bir tekne duruyor. Yolcuların korktuğunu duyuyorsunuz. Onlara karanlığa bakmamalarını söylemek istiyorsunuz.

Ağzınız yok. Yalnız kelimeleriniz var. Kelimeleriniz de istediğiniz sırayla gelmiyor.

“İçinizden biri aşağı insin,” diyorsunuz.

Birisi gerçekten geliyor.

Teknenin altındaki karanlık hareketleniyor. Şimdi ilk kez anlıyorsunuz: Bütün gece duyduğunuz sesler yardım istiyor olabilir. Bu, onların söylediğini yapmanın sizi kurtaracağı anlamına gelmiyordu.

### S2_E13 — İçeride Bıraktığınız Dışarı Çıktı

**Sınıf:** Bekçilikle varlığa geçit verme

Fenerde kalmayı kabul ediyorsunuz. Işık dönüyor. Yaşayanlar, artık başka bir geceyi burada karşılayacak: {ALIVE_NAMES}.

Sabah, taş iskelede tek bir ıslak iz görüyorsunuz. İz doğru adımlarla karaya gidiyor. Birkaç metre sonra kuruyor.

Aranıza sızmış olan, sizin bekçilik sözünüzü kendi çıkış izni sanmış. Belki de gerçekten öyleydi.

Bir hafta sonra kıyı kasabasındaki bir dükkân açılıyor. Kapıdaki kişi yürürken hiçbir hata yapmıyor. Birine sarılırken de.

Yalnız yağmur başladığında yüzünü gökyüzüne değil, kaldırıma çeviriyor.

Fenerden onu göremiyorsunuz. Ama artık ışığı neden karaya çeviremediğinizi biliyorsunuz.

### S2_E14 — Yeni Vardiya

**Sınıf:** Yaşayan bekçiler olarak mahsur kalma

Işığı tutmak için fenerde kalıyorsunuz. Son tekne de uzaklaşıyor. Yalnız yaşayanlar merdivenin başında: {ALIVE_NAMES}.

Vardiya çizelgesinde her birinize bir saat ayrılmış. Çizelgenin bittiği yerde yeni bir gün başlamıyor. Aynı gece, aynı saatin başka bir parçasıyla sürüyor.

Yemek acıkmadan önce hazır. Su içmek istediğinizde bardak dolu. Kapı dışarı açılıyor, fakat her patika sizi fenerin altına getiriyor.

Bir gece ufukta bir tekne duruyor.

Yardım etmek için ışığı çeviriyorsunuz. Telsize uzanıyorsunuz. Ağzınızı açmadan önce hepiniz aynı kuralı hatırlıyorsunuz:

Kimseyi içeri çağırmayın.

Ama dışarıdaki seslerden biri, kaybettiğiniz bir arkadaşınıza ait.

### S2_E15 — Çağrı Alınmadı

**Sınıf:** İnkârın yeni tanıkları

Son cümle ağzınızdan çıktığında yolcu teknesi yok oluyor. Önünüzde kuru bir masa, üstünde yazılmayı bekleyen bir rapor var.

Telsizden yardım isteyenleri duyuyorsunuz. Dışarıdaki fırtına pencereyi sarsıyor. Masada kaç kalem varsa her biri birinizin önüne geliyor.

Ellerinizi siz yönetmiyorsunuz. Aynı cümleyi tekrar tekrar yazıyorsunuz.

Çağrı alınmadı.

Su yavaşça masanın altına doluyor. Buna rağmen kâğıtlar ıslanmıyor. Dışarıdaki sesler, artık sizin de burada olduğunuzu öğreniyor.

Birileri yıllar sonra bu kaydı açtığında duydukları o cızırtının içinde, sizin son nefesiniz de olacak.

Rapor, bu kez hepinizin el yazısını taşıyor.

### S2_E16 — Karanlıkta Büyüyen

**Sınıf:** Kule içinde kapanma

Saklandığınız odanın kapısı açılmıyor. Karanlıkta ne kadar beklediğinizi bilmiyorsunuz. Yaşayanlar hâlâ birlikte, ama artık birbirinizi göremiyorsunuz.

Dışarıdaki ayaklar ilk gece yanlış basıyor. İkinci gece daha düzgün. Üçüncü gece birinizin yürüyüşüyle aynı.

Sonra sesinizle konuşmaya başlıyor. Bir cümleyi yanlış yerde kesiyor; ertesi gece onu da öğreniyor.

{LAST_ALIVE}, kapının altındaki ışık çizgisinde bir çift ayak görüyor. Parmaklar bu kez doğru yöne bakıyor.

Kapı kolu aşağı iniyor.

Artık içeri girmeye hazır. Sizin neden ışığı söndürdüğünüzü anlamasına gerek kalmadı.

### S2_E17 — Işıkta Kalanlar

**Sınıf:** Mercek içinde ölüm

Camın içinden dışarıyı görebiliyorsunuz. Dışarıdan bakanlar ise yüzlerinizi ışık kırılması sanıyor.

Fener her döndüğünde dünya bir kere gözünüzün önünden geçiyor. Deniz. Kayalıklar. Kıyı. Boş merdiven. Yeniden deniz.

Elinizi hareket ettirmeye çalıştığınızda ışığın içindeki bir çizgi titriyor. Sesiniz, camın ince çınlamasından ileri gitmiyor.

Yıllar sonra bakım görevlisi merceğin yüzeyindeki küçük izi temizlemek için yaklaşıyor. Siz bütün gücünüzle geri çekilmesini istiyorsunuz.

Camda bir yüz beliriyor. Sizinki.

Görevli irkiliyor. Merceğin içindeki diğer yüzler de ona dönüyor.

Artık neden gözlerinizi alamadığınızı biliyorsunuz. Birisi bakmadan yer değiştiremiyorsunuz.

### S2_E18 — İlk Cevap

**Sınıf:** Sahte kurtarmaya kapı açma

Dışarıdaki karanlık tek bir insan gibi içeri girmiyor. Önce bir el, sonra öteki. Dizleri nerede olması gerektiğini kapı eşiğinde öğreniyor.

Yaşayanların son görüntüsü, fenerin duvarında uzun ve yanlış gölgeler.

Sonra sesleriniz kıyı konsoluna yerleşiyor. Her yeni çağrıda sizden biri cevap veriyor. Sözlerinizin başı size, sonu başka bir şeye ait.

“Sizi duyuyoruz,” diyorsunuz. Gerçekten duyuyorsunuz.

“Kapıyı açın.” Bunu söylemek istemiyorsunuz.

Yeni bir teknenin yolcuları, tanıdık bir insan sesi duydukları için rahatlıyor. Fenerin altındaki şey, kapı kolunu bu kez tek denemede çeviriyor.

### S2_E19 — Fenerin Altında

**Sınıf:** Suya geri dönüşle ölüm

Fenerin altındaki su, bir kıyı gibi görünmekten vazgeçiyor. Aşağıya doğru merdiven de yok. Yalnız karanlık ve içinde bekleyen eller.

Önce kaybettiğiniz kişilerin yüzlerini görüyorsunuz. Size uzanmıyorlar. Başlarını iki yana sallıyorlar.

Sonra onların arkasında başka bir yüz açılıyor. Daha büyük. Ne kadar büyük olduğunu karanlık saklıyor.

Bütün isimleriniz bir an aynı anda söyleniyor. Bütün sesleriniz, son nefes alacak bir yer arıyor.

Yukarıdan bakıldığında deniz yeniden sakinleşiyor. Fenerin ışığı bir süre daha dönüyor.

Sabah kıyı görevlisi, iskelede yeni bir çift ayak izi buluyor. İzler sudan çıkmış. Henüz doğru yürümeyi bilmiyor.

### S2_E20 — Yolcu Kalmadı

**Sınıf:** Son yaşayanın da kaybı

Yaşayanlar listesinde artık isim yok.

Bu gece yola çıkanlar: {ALL_NAMES}.

Her biri bir kararın ardından başka bir yerde kaldı. Biri suyun altında, biri camın arkasında, biri sesiyle aynı odaya giremediği bir karanlıkta.

Artık birbirinizi yalnız ses olarak duyabiliyorsunuz. Aynı yerde olup olmadığınızı anlamak mümkün değil.

Sonra yeni bir motor sesi geliyor. Başka bir tekne. Başka insanlar.

Onları uyarmaya çalışıyorsunuz. Ağzınızdan çıkmasını istemediğiniz ilk cümle, hepinizin sesinden aynı anda duyuluyor:

“İçinizden biri aşağı insin.”

Yolcu teknesinin içindeki biri cevap veriyor.

## 9. Sekiz görsel ve sesin eşleştirmesi

| Anahtar | Görsel / kullanım | Paket görseli | Paket sesi | Ses karakteri |
|---|---|---|---|---|
| JS01 | Suyun altındaki yüz — Suya çekilme / boğulma | `assets/images/js01.png` | `assets/audio/js01.wav` | Islak düşük darbe, kısa yükselen metalik çığlık, su altı boğuk kuyruğu. |
| JS02 | Motor dairesindeki ters yüz — Motor / pompa boşluğu | `assets/images/js02.png` | `assets/audio/js02.wav` | Keskin zincir darbesi, geriye emilen nefes benzeri sentetik sürtünme, kısa bas. |
| JS03 | Karanlık kapıdan çıkan yüz — Kapı / merdiven boşluğu | `assets/images/js03.png` | `assets/audio/js03.wav` | Tahta-demir çarpması, iki katmanlı pürüzlü tiz stinger, ani kısa kesiliş. |
| JS04 | Lombozdaki yüz — Cam / lomboz yaklaşması | `assets/images/js04.png` | `assets/audio/js04.wav` | Cam çınlaması, su sıçraması hissi veren gürültü, kısa yüksek rezonans. |
| JS05 | Filikanın altından çıkan — Filika / borda | `assets/images/js05.png` | `assets/audio/js05.wav` | Kuvvetli su vuruşu, alçaktan yükselen yaratık benzeri sentetik kükreme. |
| JS06 | Havalandırmadaki yüz — Dar tünel | `assets/images/js06.png` | `assets/audio/js06.wav` | Metal sürtünmesi, kuru tıkırtı, çok kısa boğuk sentetik feryat. |
| JS07 | Telsizdeki yağmurluklu — Telsiz / sahte kurtarma | `assets/images/js07.png` | `assets/audio/js07.wav` | Radyo paraziti, kesik rezonanslı çığlık dokusu, röle klik sesi. |
| JS08 | Fener merceğindeki yüz — Mercek / ışık | `assets/images/js08.png` | `assets/audio/js08.wav` | Cam rezonansı, kısacık ters yükseliş, geniş metalik korku darbesi. |

## 10. İçerik motorunun kesin çalışma sırası

### Bir düğümün çözümü

1. Sunucu düğüme giriş snapshot'ını saklar. Yaşayanlar sırası ve FOCUS bu snapshot'tan belirlenir. Kişisel ölü parçaları gerekiyorsa açılır.
2. Herkes kendi sayfalarını okuyup “Okudum” der. Ana sahne ve dört eylem açılır.
3. Eylem oylaması tek kazanana ulaşır. Gerekli görevli oylamaları tamamlanır.
4. Seçilen eylemin `cases` listesi **yazılı sırayla** değerlendirilir. İlk koşulu doğru case seçilir; `when` alanı olmayan son case varsayılandır. Koşul değerlendirmesi giriş snapshot'ına ve seçilmiş görevlilere dayanır.
5. Case efektleri uygulanır. Booleanlar atamadır. Yazılmayan bayraklar korunur. `restAll` yorgunluk azaltma komutudur; bayrak değildir. `finalChoice` yalnız N20 son seçimini kaydeder.
6. Case'teki ölümler oluşturulur; sağ kalan görevlilerin yorgunluğu +1 yapılır.
7. Hedef: explicit `ending` varsa o; yoksa yaşayan kalmamışsa E20; yoksa N20 ise final çözümleyicisi; yoksa sıradaki düğüm.
8. N20 çözümleyicisi E09/E12 seçtiyse bu sona özgü toplu ölüm işlemi yapılır. Final tekrar çözülmez.
9. Tek atomik işlemde durum, görevli adları, case, hedef ve ölüm olayları kaydedilir. Ardından ölenlere kişisel efekt, herkese özgün ortak sonuç verilir. Ölüm efekti veya metin sunucuda ikinci kez etki işletmez.
10. Herkes sonucu ve varsa özel ölüm kartını okuyunca sonraki sahne/finale geçilir.

### Condition DSL

```json
{"flag":"rope"}
{"not":{"flag":"rope"}}
{"actorFatigueAtLeast":2}
{"all":[{"flag":"power"},{"flag":"lensAligned"}]}
{"any":[{"flag":"falseReply"},{"flag":"contamination"}]}
```

`actorFatigueAtLeast`, birinci görevlinin görevden önceki yorgunluğudur. Görevi olmayan bir case'te kullanılmaz. `any` bu sürümün mevcut metinlerinde gerekli olmayabilir; şeması belirlenmiştir. Bu DSL'i `eval()` ile JavaScript çalıştırarak yorumlama; alanları kapalı bir yorumlayıcıyla çöz. İstemcinin yolladığı efekt, ölüm veya final değeri kabul edilmez.

### Bayraklar

Başlangıçta hepsi false. Envanter veya ilerleme bayrağı True olunca tüketildiği yazılmadıkça korunur. Mevcut içerikte akü/halat tüketimi yoktur. `power`, teknede kurulmuş taşınabilir kuru enerji hattını da ifade eder; fenerde güvenli yuvaya aktarılabildiği varsayılır. Hikâye boyunca yakıt, enerji veya saat gizlice tükenmez.

| Bayrak | Anlamı | Başlıca kazanım / değişim |
|---|---|---|
| rope | Can halatı ve güvenli su bağlantısı | N01B |
| battery | Yedek akü kutusu | N02A |
| engineSafe | Deniz motoru güvenli bakım konumunda | N03B başarılı / N03D; N03A bozar |
| power | Kuru enerji hattı | N04B, N13A/B, N17A |
| lifeRaft | Kontrollü servis filikası | N05C |
| chart | Gerçek sabit kıyı rotası | N02C başarılı / N06A; N06C bozar |
| signalCode | Gerçek yanıt örüntüsü | N07B başarılı / N07D / N09C |
| logProof | Eski çağrının alındığına ilişkin kanıt | N08B / N10B başarılı / N10C |
| falseReply | Doğrulanmamış sesi kabul etme | Çeşitli tercihler; N09A ve başarılı N18C temizler |
| contamination | Araya sızmış su/beden geçidi | Riskli tercihler; N14C temizler. N15A/N17C sonradan yeniden bulaştırabilir |
| dockLine | İskele bağlantısı güvenli | N11B; N11A false |
| doorSealed | Dış servis hattı kapanmış | N14B/C; N14A false |
| routeMarked | Kuru merdiven dönüşü işaretli | N15B |
| lensAligned | Mercek güvenli referansta | N16D / N17A |
| beacon | Gerçek fener ışığı yanıyor | N17A, hazırlanmış N17B, N17C; hazırlıksız N17B false |
| sosAnswered | Eski çağrının duyulduğuna tanıklık edildi | N18B / başarılı N18C |
| rescueVerified | Bugünün gerçek yardım istasyonu doğrulandı | Yalnız başarılı N18C; N18A/B veya başarısız C false |
| gateOpen | Son kıyı geçidi mekanik olarak açıldı | N19A / işaretli N19B / N19C; işaretsiz N19B false |
| griefDebt | Gereksiz kurban bırakıldı | N19C; final dökümünde kullanılır, ayrı rastgele ceza vermez |

### Kesin final çözümleyicisi

Önce görev/ölüm işlemi yapılır. Case'teki açık final, genel sıfır yaşayan kontrolünden öncedir. Ana son karar N20'deyse aşağıdaki kurallar sırayla uygulanır:

```text
N20 A — doğrulanmış kurtarma yolu:
  beacon false ise E06
  rescueVerified false VEYA falseReply true ise E05
  sosAnswered / logProof / doorSealed / gateOpen içinden biri false ise E04
  contamination true ise E04
  yaşayan sayısı başlangıç sayısına eşitse E01
  yaşayan sayısı 1 ise E03
  diğer durumda E02

N20 B — kendi teknen:
  contamination true ise E07
  engineSafe false ise E09 [terminal ölüm]
  chart false ise E08
  diğer durumda E10

N20 C — hattı kes:
  sosAnswered true ise E11
  değilse E12 [terminal ölüm]

N20 D — fenerde kal:
  contamination true ise E13
  değilse E14
```

Hiçbiri rastgele değildir. 20 son olması başarı ihtimalini %5 veya %20 yapmaz. İnsanlarla denemede hedef, ipuçlarını okuyarak zor ama çözülebilir bir oyun olmasıdır. Eksiksiz başarı yalnız E01, gerçek ama kayıplı kurtuluş E02/E03'tür. E10 bedelli kaçıştır. Ölen arkadaş sayısı başarı sınıfını değiştirir; aynı sınıf içinde sağ kalan isimleri, ölüm sebepleri ve gerekli ayrıntılar ayrıca final dökümünde görünür. Bunlar 20 ana finalden ayrı, isim bazlı varyasyonlardır.

## 11. Oylama ve bağlantı sözleşmesi

### Tur türleri ve eşitlik

Her oylamanın `kind` alanı `ACTION`, `ACTOR_PRIMARY` veya `ACTOR_HELPER` olur. İlk eylem turu A/B/C/D içerir. Görevli turları o anki yaşayan aday ID'lerini içerir; dolayısıyla 4 seçenek kuralı görevli listesine uygulanmaz. Tüm başlangıç kadrosu, ölüler de dâhil, birer oy kullanır. Gönderimden önce seçim değişebilir; “Oyumu Kilitle” ve sunucu onayından sonra o tur değişmez.

Herkes oy verince en yüksek oy sayısı hesaplanır. Tek kazanan yeterlidir; salt çoğunluk aranmaz. En yüksek oyu paylaşan bütün seçenek/adaylar tekrar turuna alınır, oylar temizlenir. İlk turda elenen aday sonradan geri gelmez. İki, üç, dört veya daha fazla görevli adayı eşit olabilir. Tekrar eşitlikte yine yalnız en yüksek eşitler kalır. Kura, ev sahibinin belirlemesi, zaman aşımı ve sınırlı tekrar sayısı yoktur.

Eşitlik tekrarları görevliyi yoramaz, suyu yükseltemez, sahneyi değiştiremez. 100 tur sürse de hikâye aynı yerde durur. Tek aday kalmışsa doğrudan atanır. İki görevli eylemde ikinci seçime birinci görevli giremez. Görev çözülene kadar aday canlılıkları değişmez; sunucu ölüm olayını ancak rol seçimleri bittikten sonra işler.

Oy kimlikleri diğer oyunculara yayınlanmaz. Yalnız tur kapanınca anonim dağılım ve kazanan gösterilir. Kim kimi ölüme gönderdi diye gerçek oy sahibini ifşa eden panel yoktur. Grup isterse kendisi konuşabilir.

### Fazlar

`LOBBY → READING → ACTION_VOTE → (PRIMARY_VOTE) → (HELPER_VOTE) → RESOLVING → PERSONAL_DEATH/RESULT → READING ... → ENDING → FINISHED`.

PERSONAL_DEATH istemciye özel bir görünüm koludur; oda ortak RESULT aşamasındadır. Bu nedenle yaşayanların telefonuna ölüm görüntüsü yayılmaz. Sunucu bütün cihazların okuma/özel kart onayını bekler. Aynı anda birden fazla ölüm varsa her ölen kendi özel görünümünü açar; yaşayanlarda yalnız ortak sonuç vardır.

### Daktilo, hazır olma ve kayıt

- Türkçe Unicode grafemlerle yaklaşık 28 grafem/sn; 15/28/45 hız ve “Metni tamamla” seçeneği. Hızlandırma yalnız kişinin ekranını etkiler.
- Herkes metnini açıp “Okudum” demeden oylama başlamaz. Sonuçta ve ölü kişisel parçalarında da hazır olma takibi var. Okunmuş sahneler tekrar açılabilir; gelecek sahneler/final koşulları açılmaz.
- Oyun gerçek zaman sayacı kullanmaz. Fenerin doğumu gerçek sabah saatine bağlanmaz. Okuma hızıyla ölüm yoktur.
- Kayıt; oyun kimliği, hikâye/sürüm, sabit kadro, canlılık/yorgunluk, bayraklar, düğüm snapshot'ı, görevli snapshot'ları, tur türü/tur numarası/aday listesi/oylar, faz sürümü, ölüm olayları, efekt teslim/ack bilgisi ve final içerir.
- Her mutasyon `requestId + phaseVersion + voteId` ile yetkilendirilir. Aynı isteğin tekrarı ikinci oy, ikinci ölüm, ikinci yorgunluk veya ikinci sahne üretmez. Son iki oy eşzamanlı gelince yalnız bir çözümleme olur.
- Sunucu kalıcı kayıt ve işlem kilidi kullanır. Yeniden başlatıldığında yaşayanlar, ölenler ve yarım görevli oylaması doğru dönmelidir. Bir ölüm animasyonunun tekrar çizilmesi karakteri ikinci kez öldürmez.

### Kopma ve kimlik

4–10 kişilik başlangıç kadrosu kilitlidir. Yeni kişi oyunun ortasında katılamaz. Ölen bir oyuncu ayrılmış sayılmaz. Bağlantısı düşen seçmen varsa oyun bekler; onun yerine otomatik veya ev sahibi oyu verilmez. Kilitlediği o tur oyu korunur. Yeniden bağlanınca aynı tahmin edilemez katılımcı token'ı kendi karakterini getirir. Oda kodu başka kişinin kimliğine girmek için yeterli değildir.

Kalıcı ayrılmada oyun sonradan aynı kadroyla sürdürülmek üzere saklanabilir veya oda terk edilebilir; bu sürümde kadro küçültme yoktur. Ev sahibi bağlantısı koparsa bağlı en erken katılan kişiye yalnız yönetim yetkisi devredilir. Yönetim, oylamayı tek başına çözmez. Oyuncunun gerçekten ölmesi ile bağlantısının düşmesi ayrı alanlardır.

## 12. Jumpscare — yalnız ölenin cihazında

### Kesin görünüm akışı

1. Oyun başındaki “Sesi etkinleştir ve başla” dokunuşu ses bağlamını açar. Her cihaz kendi ses/jumpscare tercihini tutar. Tarayıcı ses izni engelliyse sessiz fallback uygulanır; görev veya oyun takılmaz.
2. Sunucu ölüm işlemini bitirince yalnız ölenin yetkili bağlantısına kişisel `deathEvent` yollar. Sunucu herkese broadcast edip istemcide ad kontrolüyle gizlemeye çalışmaz.
3. İlk kez teslim edilen geçerli olayda metin görünümü bir kez kararıp ilgili dikey görsel aniden açılır. Ses aynı başlangıç işaretinde tetiklenir. Görsel yaklaşık 900 ms kalır, ardından 250 ms kararmayla kişisel ölüm kartına geçer. Tekrarlı strobe veya peş peşe beyaz flaş yoktur.
4. Kullanıcı dokunarak efekti erken geçebilir. Ses kapalıysa ses çıkmaz; görsel kapalıysa sade ölüm kartı vardır. İkisi kapalı olsa da `alive=false` kalır.
5. Yaşayanlar bu sırada yalnız “Sonuç okunuyor” ve ortak metni görür. Onların cihazına korku sesi çalınmaz, resim açılmaz, tam ekran geçiş yapılmaz.
6. Efekt bittiğinde oyuncu “Devam et” der ve Suyun Altındaki Ses kartını okur. Oyun ortak sonuç hazır olmasını bekler.

Sesin sadece o telefona yönlendirilmesi teknik kuraldır; hoparlörle aynı odada oynayan biri doğal olarak başka telefondan gelen sesi duyabilir. Özel dinleme isteyen kulaklık kullanabilir. Uygulama diğer cihazlara ses akışı yapmaz.

### Tekrarlı ölüm veya eski efekti oynatmama

Her yeni ölüm için benzersiz `deathEventId` vardır. Sunucuda `pending/delivered/acknowledged/skipped` tutulur; istemci son gördüğü ID'leri yerelde saklar. Yeniden bağlanınca eski ölüm olayları otomatik jumpscare olarak oynatılmaz. Olay hiç görülmemişse reconnect kartı sade ölüm bilgisini ve isteğe bağlı “Efekti izle” butonunu gösterir. Bu, reconnect ile gecikmiş beklenmedik ses patlamasını önler. Sunucu restart'ı pending efekti yeniden zorlamaz.

### Sekiz varyantı dağıtma

Tek kişilik ölümde case'teki JS anahtarı kullanılır. Toplu ölümde aynı resim hepsine sırayla broadcast edilmez: yaşayan kurbanlar sabit cast sırasına dizilir, case'in taban JS numarasına kurban indeksi eklenir ve 8 üzerinden çevrilir. Örnek taban JS07: ilk kurban 07, ikinci 08, üçüncü 01. Her biri yalnız kendi görselini görür. 9–10 ölümde sekiz asset olduğu için bazı varyantlar farklı kişilerde tekrar eder; bir oyuncu bu oyunda ikinci kez ölmez.

Ses anahtarı görselle eşleşir. Gizli kamera açılmaz, kişinin gerçek yüzü fotoğrafa eklenmez. Görseller oyundaki varlığın yüzüdür. Ön yükleme yapılabilir; ölüm olayı olmadan hiçbir görsel/ses kendiliğinden sunulmaz.

### Ses dosyalarının durumu

Paketteki sekiz WAV, bu teslim için kodla sentezlenmiş özgün, kısa korku stinger'larıdır. Gerçek insan çığlığı veya dış kaynaktan alınmış kayıt içermez. Birer ses efekti taslağıdır; final ses tasarımında değiştirilebilir. Görselleri üretirken ses üretilmiş gibi varsayılmamıştır: WAV dosyaları bu paket hazırlanırken ayrıca oluşturulmuştur. Dosya seviyesinde tepe sınırı yaklaşık -3 dBFS, uçlarda yumuşak geçiş vardır. Uygulama varsayılan sesini %45 gibi ölçülü bir değerden başlatır; cihazın fiziksel sesini uygulama yükseltmez. Sırf korkutmak için ses seviyesini sonuna kadar açma. İki korku sesi aynı cihazda üst üste binmez.

## 13. Görsel düzen, entegrasyon ve kabul

### Ekranlar

- Hikâye seçimi: Hikâye 1 ve SON SEFER ayrı kartlar; oyuna katılanlar aynı hikâyeyi görür. Oda başladıktan sonra seçim değişmez.
- Lobi: Kod/QR, 4–10 kişi, görünen adlar, amaç, ölüm ve efekt tercihleri.
- Hikâye: Kömür-siyah zemin, kırık beyaz metin, çok az pas rengi/tuzlu mavi vurgu. En az yaklaşık 18 px metin, rahat satır aralığı. Oda ve gerçek bağlantı durumları korku efekti uğruna yanlış gösterilmez.
- Eylem: Dört dikey kart. Gerekli görev sayısı ve ilgili elde olan/olmayan ekipman görülür. Henüz kimse seçilmediği için gizli sonucu değil, görevin niteliğini anlatır.
- Görevli: Yaşayan adlar, dinç/yorulmuş/tükenmiş, iki rolde ayrı tanım. Ölüler “Suyun Altındaki Ses — oy kullanabilir” altında görünür ama aday değildir.
- Sonuç: Özgün sonuç metni, anonim oy dağılımı, yaşayan/ölen listesi. Ölenin telefonundaki kişisel kol yukarıda belirtilmiştir.
- Ölü ekranı: Ortak metinler ve sadece ölüye açık kısa sayfalar ayrı sekmede; yeni fiziksel görev düğmesi yok.
- Final: Başlık/metin, kurtulanlar, kayıplar, görev/ölüm zinciri ve isteğe bağlı “Neden bu son?” açıklaması. Başka finallerin gövdeleri otomatik açılmaz. Oy sahipleri ifşa edilmez.

### İçerik dosyaları

`story.json` alanları: `storyId, contentVersion, title, initialFlags, nodes, endings, ghostPages, jumpscares, arrivalVariants, terminalDeathEndings, finalRules, placeholderContract, validation`.

Her node `id,title,text,question,next,options` içerir. Her option `id,label,taskCount,taskBrief,soloBrief?,cases` içerir. Her case `when?,text,effects,kill?,jumpscare?,ending?` içerir. Sonraki düğüm bu sürümde node'un `next` alanıdır; case'in finali varsa onu geçersiz kılar. N20'nin next değeri `RESOLVE_FINAL`dir.

Oyuncuya gösterilecek metinler bu belge ile JSON'da aynı kaynak metinlerden üretilmiştir. JSON'un yanında verilen teknik `initial(n)`, `evaluate`, `step` davranışlarını uygulama dilinde saf fonksiyonlara çevir. Kapalı condition DSL kullan. İçeriği uygulamadan ayır; ilk hikâyenin ID alanını ikinciyle karıştırma. Güncel bir projeye ekleniyorsa yeni bir siteyi veya repoyu gereksiz yere sıfırdan yaratma. Bu teslim oyun uygulaması değil, içerik ve geliştirme paketidir.

### Paket içeriği

- `Son_Sefer_Claude_Oyun_Dosyasi.md`: bu tam belge.
- `story.json`: bütün sahne/eylem/case/final/özel metin ve asset eşleşmeleri.
- `assets/images/js01.png` … `js08.png`: daha önce onaylanan sekiz orijinal dikey görsel.
- `assets/audio/js01.wav` … `js08.wav`: sekiz yeni sentetik ses efekti.
- `validation.json`: içerik kontrolleri ve her finale örnek karar/görevli yolları.
- `README.txt`: dosyaların nasıl verileceği ve kullanıldığı.

ZIP'i açıp belgeyi, JSON'u ve assets klasörünü Claude'un geliştirdiği projeye ver. Yalnız Markdown yüklenmişse oyun metni eksiksizdir ama görsel/ses bytes'ları o dosyanın içinde gömülü değildir. ZIP dışındaki tek Markdown dosyası da ayrıca indirilebilir. Pakette bir web uygulaması veya kurulmuş sunucu olduğu iddia edilmez.

### Zorunlu testler

1. Tam 20 düğüm, her birinde A/B/C/D olmak üzere 80 eylem ve 20 final; bütün case'lerin metni, geçerli hedefleri ve en az bir varsayılanı var.
2. Her görevli iki ayrı canlı ID olabilir; son yaşayan için bütün iki kişilik görevlerin soloBrief'i var. Ölü ID aday kabul edilmez. Ölüm sonrası FOCUS ölüye dönmez.
3. Yorgunluk 0–2 aralığında, görev öncesi değerlendirilir. Dinlenme negatif değer üretmez. Yorgun birini güvenli korumalı işe göndermek otomatik ölüm değildir.
4. Ölüm aynı ID için yalnız bir kez; yeni oyun eski ölümü taşımaz. Reconnect yaşayanı diriltmez ve ölüye zorunlu jumpscare tekrarlatmaz.
5. Ölenin ses/görsel olayı yalnız doğru token'ın bağlantısına gider. Diğer istemcilerde görsel, korku sesi, tam ekran veya titreşim tetiklenmez. Ortak ölüm kartı normal metindir.
6. Efekt kapalı/izin reddedilmiş/ses yüklenmemiş hâlde aynı ölüm ve aynı sonraki düğüm oluşur; oyun kilitlenmez. Kişisel ayarlar global sonucu değiştirmez.
7. Bir ölümde görsel ve ses aynı animasyon başlangıcından açılır; iki kez çalınmaz. Eşzamanlı toplu ölümde olaylar oyuncu ID'sine özel kalır.
8. 4,5,6,7,8,9,10 başlangıç oyuncusuyla 1 sağ kalana ve 0 sağ kalana kadar motor çalışır. Herkes öldüğünde N+1 sahnesi/boş görev açılmaz.
9. E15/E17/E18/E19 açık sonları sıfır yaşayan nedeniyle E20'ye çevrilmez. E09/E12 terminal ölümleri sonrası final tekrar çözülmez.
10. 4 kişide 2–1–1–0 tek kazanan; 2–2–0–0 tekrar; 1–1–1–1 dört seçenekli tekrar. 6 kişide 2–2–2–0 üç seçenekli tekrar. Görevli adaylarında da aynı algoritma.
11. 25 kez eşitlik sürse de yeni ceza, ölüm veya otomatik kazanan çıkmaz. Bir oyuncu/sekme bir oy. Eski tur ve faz versiyonu reddedilir.
12. Kopan bütün seçmenler, ölüler de dâhil, beklenir. Oy vermişse o tur oyu korunur. Ev sahibi başkası adına oy veremez.
13. Eylem ve rol oylarını bitirmeden vaka çözülmez. Eşzamanlı son oylar tek sonuç üretir. Server restart RESULT/PRIMARY_VOTE/HELPER_VOTE içinde doğru devam eder.
14. Yerel daktilo hızlandırma başkalarını atlatmaz. Bütün sayfalar hazır olmadan ilerleme olmaz. Gelecek gizli bayraklar normal arayüzde görülmez.
15. Markdown/JSON şablonlarında açık placeholder kalmaz; HTML adları yazı olarak görünür. Türkçe İ/ı/ğ/ş/ç/ö/ü adları ve aynı cinsiyetli tam kadro sorunsuzdur.
16. Ölü özel ipuçları hiç kimse ölmeden de çözülebilen oyuna ekstra bağlam sağlar; kazanmak için önce birini öldürme şartı yoktur.

**Denge notu:** Aşağıdaki doğrulamalar içerik/durum motoru içindir. Gerçek WebSocket uygulaması henüz yazılmadığı için çok oyunculu istemci, gerçek cihaz sesi ve tarayıcı davranışı test edilmiş gibi sunulmaz. Tam başarı sıklığı gerçek oyuncularla denenmeden yüzde verilemez. Önce anlaşılabilirlik ve gerilim, sonra gerekirse seçenek dili dengelenir; gizli zarla oyuncu kaybettirilmez.

## 14. Doğrulanmış final yolları

Aşağıdaki 20 yol, aynı deterministik durum/ölüm çözümleyicisinde dört başlangıç oyuncusuyla oynatıldı; her biri yazılı finali verdi. Görevliler, yaşayanlar arasında yorgunluğu en az olandan başlayarak seçildi. Tam görevli ID'leri `validation.json` içinde var. `S2_N02D`, N02'nin D seçeneği demektir. Gerçek oyunda başka görevli seçimi yorgunluk koşullu sonuçları değiştirebilir. Bu örnekler seçimleri otomatik yapma talimatı değildir.

- **S2_E01 — Sabahın Gerçek Kıyısı:** N01B → N02A → N03D → N04B → N05C → N06A → N07D → N08B → N09A → N10C → N11B → N12D → N13A → N14C → N15B → N16D → N17B → N18C → N19B → N20A.
- **S2_E02 — Eksik Kişilerle Sabah:** N01B → N02D → N03D → N04B → N05C → N06A → N07D → N08B → N09A → N10C → N11B → N12D → N13A → N14C → N15B → N16D → N17B → N18C → N19B → N20A.
- **S2_E03 — Son Yaşayan:** N01B → N02D → N03D → N04B → N05C → N06A → N07C → N08B → N09C → N10C → N11B → N12D → N13A → N14C → N15B → N16C → N17A → N18C → N19B → N20A.
- **S2_E04 — Siz Çıktınız, Çağrı Çıkmadı:** N01B → N02A → N03D → N04B → N05C → N06A → N07D → N08B → N09A → N10C → N11B → N12D → N13A → N14A → N15B → N16D → N17B → N18C → N19B → N20A.
- **S2_E05 — Kıyı Sandığınız:** N01B → N02A → N03D → N04B → N05C → N06A → N07D → N08B → N09A → N10C → N11B → N12D → N13A → N14C → N15B → N16D → N17B → N18A → N19B → N20A.
- **S2_E06 — Işıksız Beyaz Çizgi:** N01B → N02A → N03D → N04B → N05C → N06A → N07D → N08B → N09A → N10C → N11B → N12D → N13A → N14C → N15B → N16D → N17D → N18C → N19B → N20A.
- **S2_E07 — Kuru Güvertedeki Islak İz:** N01B → N02A → N03D → N04B → N05C → N06A → N07D → N08B → N09A → N10C → N11B → N12D → N13A → N14C → N15B → N16D → N17C → N18C → N19B → N20B.
- **S2_E08 — Uzaklaşmayan Fener:** N01B → N02A → N03D → N04B → N05C → N06C → N07D → N08B → N09A → N10C → N11B → N12D → N13A → N14C → N15B → N16D → N17B → N18C → N19B → N20B.
- **S2_E09 — Son Marş:** N01B → N02A → N03A → N04B → N05C → N06A → N07D → N08B → N09A → N10C → N11B → N12D → N13A → N14C → N15B → N16D → N17B → N18C → N19B → N20B.
- **S2_E10 — Kayda Geçmeyen Kurtuluş:** N01B → N02A → N03D → N04B → N05C → N06A → N07D → N08B → N09A → N10C → N11B → N12D → N13A → N14C → N15B → N16D → N17B → N18C → N19B → N20B.
- **S2_E11 — Sessizlikte Kalanlar:** N01B → N02A → N03D → N04B → N05C → N06A → N07D → N08B → N09A → N10C → N11B → N12D → N13A → N14C → N15B → N16D → N17B → N18C → N19B → N20C.
- **S2_E12 — Çağrı Sizsiniz:** N01B → N02A → N03D → N04B → N05C → N06A → N07D → N08B → N09A → N10C → N11B → N12D → N13A → N14C → N15B → N16D → N17B → N18A → N19B → N20C.
- **S2_E13 — İçeride Bıraktığınız Dışarı Çıktı:** N01B → N02A → N03D → N04B → N05C → N06A → N07D → N08B → N09A → N10C → N11B → N12D → N13A → N14C → N15B → N16D → N17C → N18C → N19B → N20D.
- **S2_E14 — Yeni Vardiya:** N01B → N02A → N03D → N04B → N05C → N06A → N07D → N08B → N09A → N10C → N11B → N12D → N13A → N14C → N15B → N16D → N17B → N18C → N19B → N20D.
- **S2_E15 — Çağrı Alınmadı:** N01B → N02A → N03D → N04B → N05C → N06A → N07D → N08D.
- **S2_E16 — Karanlıkta Büyüyen:** N01B → N02A → N03D → N04B → N05C → N06A → N07D → N08B → N09A → N10C → N11B → N12D → N13D.
- **S2_E17 — Işıkta Kalanlar:** N01B → N02A → N03D → N04B → N05C → N06A → N07D → N08B → N09A → N10C → N11B → N12D → N13A → N14C → N15B → N16A.
- **S2_E18 — İlk Cevap:** N01B → N02A → N03D → N04B → N05C → N06A → N07D → N08B → N09A → N10C → N11B → N12D → N13A → N14C → N15B → N16D → N17B → N18D.
- **S2_E19 — Fenerin Altında:** N01B → N02A → N03D → N04B → N05C → N06A → N07D → N08B → N09A → N10C → N11B → N12D → N13A → N14C → N15B → N16D → N17B → N18C → N19D.
- **S2_E20 — Yolcu Kalmadı:** N01B → N02D → N03C → N04D → N05D.

**İçerik kontrolü:** 20 düğüm, 80 eylem, 90 tam yazılı case sonucu, 20 final, 8 görsel ve 8 WAV. 4–10 başlangıç kadrosunun her biriyle hem eksiksiz E01 hem tek kişi kalan E03 yolları doğrulandı. Yorgunluk eşiği olan dört eylem 0/1/2 seviyelerinde ayrı kontrol edildi. Sabit tohumla 36,000 rastgele yürüyüşte durum sınırları, kalıcı ölüm ve kayıt kimlikleri denetlendi. Bütün bunlar hikâye motoru doğrulamasıdır; henüz yazılmamış telefon uygulamasının gerçek cihaz testi değildir.

**Uygulamada korunacak ana duygu:** Oyuncu yalnız yanlış kapıdan korkmasın; kapıyı açmaya kimi gönderdiğini de hatırlasın. Kayıp, susturulmuş bir oyuncu değil, masadaki kararlara sesiyle katılmayı sürdüren bir arkadaş olsun. Korku resmi bütün ekranları basmasın. Bir telefonun aniden susması ve ötekilerde yalnız o ismin ölümünün yazması, grubun kendi tepkisiyle sahneyi tamamlasın.
