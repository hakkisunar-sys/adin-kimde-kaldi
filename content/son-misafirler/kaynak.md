# SON MİSAFİRLER
## Hikâye 3 — Claude için tam senaryo ve uygulama dosyası

**Türkçe · 4–10 kişi · 24 ana karar · 96 eylem · 20 farklı son · 8 ayrı ölüm görseli ve 8 ses**

## Claude'a verilecek görev

Mevcut ortak oylamalı korku oyununa bağımsız üçüncü hikâye olarak SON MİSAFİRLER'i ekle. İlk iki hikâyeyi, kayıtları ve kurallarını koru. Bu belge ve story.json hazır yazılmış içeriktir: çalışma sırasında LLM ile yeni olay üretme, sahne metinlerini özetleme. Her düğümde dört seçenek göster. Gerekirse ikinci aşamada yaşayanlar arasından görevli seç. Ölümler kalıcıdır. Ölüm görseli ve sesini yalnız ölen oyuncunun cihazında aç. Hikâyeyi, durum motorunu, oylamayı ve kişisel olayları sunucu otoritesiyle uygula. Paket içindeki JSON ile bu belge arasında içerik uyuşmazlığı varsa geliştirmeyi durdurup farkı raporla; kafana göre birleştirme. Ücretli Emergent veya ek hikâye üretimi servisi gerektirme. Mevcut projenin dilini, oda altyapısını ve dağıtım biçimini önce incele; yeni yığın varsayma.

## Oyuncuya gösterilecek lobi

Bir hafta sonu için havuzlu bir villa kiraladınız. Anahtar saksının altında, mangal hazır, odalar paylaşılıyor. İlk fotoğrafta pencerenin arkasında bir kadın görüyorsunuz. Üst kattaki oda kilitli.

**Amaç:** Villanın gerçek çıkışını bulmak ve mümkünse bu gecenin bir daha yaşanmasını engellemek. Hepiniz kurtulabilirsiniz. Birini feda etmek zorunlu değildir.

Her tur dört seçenekten birini birlikte seçin. Gerekiyorsa o işi kimin yapacağını da oylayın. Ölüm kalıcıdır; ölenler oy vermeyi ve hikâyeyi izlemeyi sürdürür, fiziksel görevlere gidemez. Okuma hızının cezası yoktur. Kişisel ölüm anında ani korku görseli ve kısa ses vardır. Ses ve görsel ayrı ayrı kapatılabilir; kapatmak oyun sonucunu değiştirmez. Bu hikâyede çocuk hayaleti vardır, çocuğa yönelik grafik şiddet yoktur.

## Yazar ve geliştirici için gerçek geçmiş

Kurgu Ege'de adı verilmeyen bir orman kıyısı villasında geçer; gerçek işletme, aile veya olaya dayanmaz. 1996'da Deniz'in doğum gününde, fotoğraf makinesinin eski negatifinden bir varlık çıkmıştır. Gerçek anne Selin ile onun yüzünü takan varlık kasette aynı anda görünür. Baba Murat kamerayı çevirirken olayı kaydeder. Gerçek bakıcı Kemal yardım etmeye çalışır; daha sonra onun yüzü de kopyalanır. Bunlar sabit geçmiş karakterleridir, oyuncuların yerini almaz.

Deniz annesinin yaptığı koruyucu çerçevenin içindeki odanın dolap arkasında saklanır. Aile o gece ölür; Deniz de beden olarak yaşamaz. Odada yaşayan bir çocuk değil, saklandığı anı sürdüren bir çocuk hayaleti vardır. “Kurtarmak”, ona gerçek anıyı hatırlatıp saklandığı bölümden çıkarmak ve uygun finalde annesinin hatırasına ulaşmasını sağlamaktır. Bu bir diriltme değildir. N14/N19'daki childFreed yalnız saklanma döngüsünden çıkarılmayı gösterir; tam huzur bazı finallerde olur. Çocuğa ilişkin açık kimlik bilgisi N14'e kadar oyuncudan saklanır.

Varlığın kendi yüzü yoktur. Ses, davet, uzun bakış ve tekrar eden görevlerden yüz öğrenir. Gerçek arşiv görüntüsünü değiştiremez; anlık telefon ve ayna görüntülerini çarpıtabilir. N01'deki fotoğraf imkânsız açıdan ve kadın eklenerek değiştirilmiştir. İlanı, görünür çevreyi ve tekrar eden yolları değiştirir; eski fiziksel negatif, sabit beyaz taşlar, gerçek kaset ve koruyucu kesintisiz çizgi güvenilir referanslardır. Jumpscare'lerde görülen yüzler ayrı yaratık türleri değil, bu varlığın yetişkin biçimleridir.

Ev sahibi mesajlarının bir kısmı eski otomatik yanıtlardır, bir kısmını varlık taklit eder. Başta görünen ilan fotoğraflarında oyuncular seçilemez; eski karelerde yüzlerinin sonradan belirmesi evin onlara yer hazırlamasıdır. Oyuncuların baştan ölü olduğu şeklinde zorunlu bir son yoktur.

Öykü beş kısımdır: N01–N04 tatil ve ilk yanlışlıklar; N05–N09 kayıtlar ve koruma; N10–N14 kayıp gecenin gerçeği; N15–N19 çıkış, taklit ve Deniz; N20–N24 son hazırlık ve final. Yaklaşık 55–90 dakika; eşit oylar ve sohbet uzatabilir. Normal eylemler bir sonraki ana düğüme birleşir. Kalıcı bayraklar, kişisel ölümler ve farklı sonuç paragrafları sonraki olayları ve finali değiştirir. Bu sürüm 96 bağımsız eylem sonucu ve koşullu alt sonuçlar içerir; 96 ayrı uzun rota iddiasında bulunma.

## Ortak oyun kuralları

1. Kadro 4–10 oyuncudur; hepsi gerçek oynayanların girdiği görünen adlarla arkadaş grubudur. Başta kadro sırası bir kez karıştırılıp kaydedilir. İsimler oyun ortasında değişmez. Cinsiyet, meslek veya aile ilişkisi varsayılmaz.
2. Adlar 2–20 Unicode grafem; baştaki/sondaki boşluklar kırpılır, Türkçe uyumlu büyük/küçük harfsiz tekillik korunur, HTML olarak çalıştırılmaz. Oyuncu kimliği addan değil değişmeyen playerId'den gelir. Gerçek telefon rehberi, fotoğraf, mikrofon veya kamera erişimi istenmez. Hikâyedeki telefonlar kurgudur.
3. Her ana kararda dört eylem vardır. En çok oy alan kazanır; yüzde 50 koşulu yoktur. Eşit en yüksek oylarda yalnız eşit adaylar yeniden oylanır. Çözülene kadar tekrarlanır. Kura, ev sahibi üstünlüğü ve sessiz varsayılan seçim yoktur.
4. taskCount 0 ise görevli yoktur; 1 ise yaşayanlardan bir kişi; 2 ise önce birinci, sonra ondan farklı ikinci kişi oylanır. Ölüler eylem ve görevli seçiminde oy kullanır; fiziksel aday olamaz.
5. Tek yaşayan varsa tek görev otomatik atanır, iki kişilik iş sabit mandal/tutucuyla soloBrief'e dönüşür. Gerekli ekipman yokken hayalî yardımcı üretilmez. Sıfır yaşayan varsa yeni düğüm başlamaz.
6. Bütün bağlı başlangıç oyuncuları oyunu tamamlayınca tur çözülür. Ayrılan kişide oyun beklemeye alınır; ev sahibi beklemeyi sürdürür veya o oyuncuyu o oturum için etkin seçmen listesinden çıkartabilir. Bu işlem karakteri öldürmez, adaylıktan da bağlantı dönene kadar çıkarır. En az bir bağlı etkin seçmen gerekir; yoksa duraklat. Çıkarılan kişi aynı kimlikle döndüğünde bir sonraki turda seçmen olur. Tur başladıktan sonra seçmen snapshot'ı değişirse mevcut oylar korunur, çıkarılanın oyu iptal edilir, eşitlik yeniden hesaplanır. Tamamı tek adaya inerse otomatik görev ataması çalışır. Görev çözülürken bağlantı kopması sonucu geri aldırmaz.
7. Gecikmeli istemci, eski tur kimliği ve ikinci tıklama yeni oy/ikinci ölüm üretmez. Eylemler yalnız sunucuda bir kez çözülür. Kalıcı oda snapshot'ı her karardan sonra tutulur. Yeniden bağlanan aynı playerId ve güvenli oturumla geri döner.

## Oyuncu durumları, yorgunluk ve taklit

Başlangıçta her oyuncuda alive=true, fatigue=0, exposure=0, completedTasks=0 bulunur. Fatigue 0/1/2 görünür: Dinç/Yorulmuş/Tükenmiş. Exposure 0/1/2/3 görünür: Yabancı/Görülmüş/Tanınmış/Öğrenilmiş. Aday kartlarında ikisi ve o işin açık tehlike notu gösterilir.

Her fiziksel görevin bütün hayatta kalan görevlileri +1 fatigue (en çok 2), +1 exposure (en çok 3), +1 completedTasks alır. Değerlendirme görevden ÖNCEKİ değerle yapılır. Görev başarısız ama ölüm yoksa da yorgunluk ve öğrenilme artar: kişi oraya gitmiştir. Kill'de ölen kişiye artış yapılmaz. İkinci görevli de hayattaysa artış alır. taskCount=0 için artış yoktur.

effects.restAll bütün yaşayanların fatigue değerini verilen miktar azaltır, alt sınır 0. effects.resetExposure bütün yaşayanların exposure değerini 0 yapar. İşlem sırası: case koşulu -> ölüm -> normal görev artışı -> effects. Böylece N18A gibi başarılı arınma görevi kendi artışını da temizler. Başka düğümde normal artış geri başlayabilir. Fatigue yalnız N15C'de, exposure yalnız N15C/N16B'de ölüm koşuluna girer. Diğer görevler yüksek değer yüzünden kendiliğinden ölümcül olmaz. completedTasks final özeti içindir; gizli ceza değildir.

contaminated türetilen durumdur: flags.tagged OR flags.invited. Exposure tek başına bu bayrağı açmaz; yüksek exposure bazı açık tehlike case'lerini etkiler. İz N18A, N21D veya N23D ile yazılı koşullarda temizlenir. N23D son kontroldür: temiz çıkıştan sonra görev artışı gelmez.

## Şablonlar ve metin görünürlüğü

{FOCUS}: düğüme giriş snapshot'ında yaşayanların sabit kadro sırasından (nodeNumber-1) modulo livingCount kişisi. {A}: seçilmiş birinci görevli; {B}: ikinci görevli. Sonuçtaki adlar görev snapshot'ından gelir, ölümden sonra değiştirilmez. {ALIVE_NAMES}, {DEAD_NAMES}: sonuç snapshot'ının yaşayan/ölü adları; yoksa “Kimse”. {FINAL_VICTIMS}: final ölümünden hemen önce yaşayanların kaydedilmiş adları. {CHILD_EPILOGUE}: childFreed ise “Deniz saklandığı anın dışına çıktı, fakat annenin hatırasına ulaşması için gecenin tamamlanması hâlâ gerekiyor.”; değilse “Deniz koruyucu odanın arkasındaki saklanma anında kaldı.” Finalin childOutcome alanı free ise özel final metni bu ara durumu nihai olarak çözer.

Adlara Türkçe ekleri otomatik yapıştırma; metinler buna göre yazılmıştır. Ölü oyuncunun ortak sayfasına “Bu sahne hayatta kalanları anlatıyor” etiketi koy. FOCUS yalnız yaşayan olabilir. Her sahnenin başlığında odak, görev sonucunda görevliler gösterilsin; ilk dört isim sabit kahraman yapılmasın. Bir odak kişinin fiziksel ölümü sonraki odak sırasını yaşayan havuzuyla yeniden kurar.

N19 metni childFreed durumuna göre tek paragraf gösterir: true ise Deniz küçük sandalyede; false ise dolabın arkasındadır. N24'te true ise merdivende gerçek annesinin silüetini görür; false ise kapalı odadan iki vuruş gelir. Diğer metinlerde yazılmış “varsa/yoksa” teknik anlatımının oyuncuya görünmemesi için aynı cümlelerdeki alternatifleri durumuna göre seç: N10 sesi deadCount>0 ise en son ölen kişi, değilse FOCUS; N11 içeride/dışarıda adımlar invited durumuyla; N12 fotoğrafta dead/alive görüntüler mevcut kadroyla; N14A daha önce childFreed ise saklanma bölümünü yeniden açmak yerine hatırayı teyit et. Ortak ana metnin geri kalanı aynıdır. Bu alternatifler yeni karar veya rastgele olay değildir.

## JSON motor sözleşmesi

story.json tek içerik kaynağıdır. Başlangıç bayrakları initialFlags'ten alınır; bilinmeyen bir bayrak yazım hatasıdır. Her seçimde cases sırayla değerlendirilir, ilk eşleşen tek case çalışır. Her listenin son öğesi always=true varsayılanıdır. when DSL: flag; not; all; any; actorFatigueAtLeast; actorExposureAtLeast; deadCountEquals; contaminated:true; always:true. all/any kısa devreyle veya eşdeğer saf boolean değerlendirmeyle çalışır. Eşikler primary aktöre bakar. contaminated:true ilgili türetilen boolean'ın doğru olmasını sınar. false biçimi bu sürümde yoktur; tersini not ile ifade ettik.

effects içindeki initialFlags anahtarları bayrağı açıkça true/false atar; restAll/resetExposure yukarıdaki özel işlemlerdir. Bunların dışındaki effect geçersizdir. Başarılı bir case önceki eşyayı kendiliğinden silmez. Yanlış eylemde açık false yazılmadıkça önceki kazanım korunur. Görevli seçilmeden actor koşulu çözülmez. taskBrief oyuncuya gösterilebilir; when/effects/ending teknik alanları gösterilmez. N24'te gerekli hazırlıklar açık kontrol listesi olarak gösterilir, final ID'si gösterilmez.

kill=primary yalnız birinci görevliyi; kill=all o anda yaşayanların tamamını öldürür. İkinci görevlinin ölümünü gerektiren yazılı case yoktur. Ölüm sırası kadro sırasıdır. Her yeni ölen için aynı atomik kararda benzersiz ölüm olayı üretilir. Daha önce ölmüş birine olay gönderilmez.

Öncelik: case.ending varsa onu sabitle; yoksa bu case sonrası yaşayan sıfırsa E20; değilse node.next. N24 case'lerinin hepsinde ending vardır. Final 15/16/17/18'in kill=all alanı zaten yazılıdır, tekrar terminal ölüm uygulanmaz. E20 yeni bir ölüm üretmez; son ölümü anlatan genel finaldir. Diğer finaller, ürkütücü olsa da yaşayanları öldürmez. Final başladıktan sonra durum değiştiren yeni oylama açılmaz. Son ekranda yaşayanlar/ölenler, Deniz'in durumu, varlığın durumu ve seçilen yol yazılır. Yeniden oyna yeni runId ve sıfır durumla başlar; eski ölümü diriltme sayılmaz.

## Kişisel ölüm efekti

Sunucu olayı: {eventId,runId,playerId,nodeId,choiceId,imageKey,audioKey,createdAt}. eventId=(runId,decisionId,playerId,'death') tekildir. Olay yalnız yetkili o oyuncunun kanalına gider. Ortak oda yayınına görsel/ses/event payload konmaz; yalnız sade ölüm sonucu ve ad listesi gider. İstemcide recipient kontrolü tek başına yeterli değildir; sunucu abonelik yetkisi gerekir. Statik assetlerin URL'sinin bilinmesi oyun gizliliği sayılmaz; önemli olan kime/ne zaman tetiklendiğinin korunmasıdır.

Görsel tam ekran 1100 ms, ses en çok 900 ms; ardından sade ölüm kartı. Beyaz flaş, strobe ve tekrar eden yanıp sönme yok. Zorunlu yüksek ses yok; kullanıcı ses sürgüsü 0–1, başlangıç 0.35. Lobi “Sesi dene” dokunuşuyla AudioContext/audio kilidi açılır. Tarayıcı ses engellerse sessiz görsel ve kart çalışır, oyun kilitlenmez. Görsel yüklenmezse sade kart; ölüm durumu zaten sunucuda kesindir. Ölen istemci onay vermese de ortak karar 2 saniye sonra devam edebilir.

Her eventId yerelde ve sunucuda consumed olarak kaydedilir. Yeniden bağlanmada ölüm durumu ve kart gösterilir; ani jumpscare otomatik yeniden oynatılmaz. İstekli tekrar oynat düğmesi olabilir. Arka plandaki sekmede ölüm varsa dönüşte sade ölüm kartı göster; beklenmedik ses başlatma. Efektleri kapalı oyuncu aynı ölüm sonucunu alır. Diğer oyunculara ani ses, ekran saldırısı veya ölüm görseli gönderilmez. Toplu ölümde yalnız o anda yeni ölen herkes kendi cihazında kendi olayını alır.

Ölüm kartı: “Karakterin öldü. Fiziksel görevlere seçilemezsin. Hikâyeyi okumaya, oy vermeye ve arkadaşlarınla konuşmaya devam edebilirsin.”

## Ölü oyuncuya özel kısa anlatılar

Ölüler yaşayanların ulaşamadığı zorunlu bir anahtar edinmez; tam kadro kurtuluş mümkündür. Özel parçalar yalnız bilgiyi başka açıdan pekiştirir. Her aralıkta bir kez gösterilir, o aralıkta yeni ölen ilk kez hemen alır. Yaşayan sunucu API'sinden bu parçaları çekemez; ölü oyuncu arkadaşına anlatabilir. Her parça aralığa giren bütün ölüler içindir; rastgele ayrı gizli görev yoktur.

- N01–N04: “Fotoğrafın arkasındasın. Odalar kâğıt kadar ince, ama arkadaşlarının sesleri gerçek. Havuzdaki beden onların bedenleri değil. Taklitler sizin susmanızdan sonra da konuşuyor.”
- N05–N08: “Duvarın içinden odaların sınırlarını görüyorsun. Yırtık duvar kâğıdı bir geçit. Gümüşü kesilmemiş cam ve eski negatif ise karanlığı bir yüzeyde tutuyor.”
- N09–N12: “Kadının odanın dışından vurduğunu görüyorsun. Çizgi çocuğu içeride tutmak için yapılmamış. Gerçek anne, başka bir yüzün içeri girmesini önlemeye çalışmış.”
- N13–N16: “Fotoğrafın ön yüzü dışarıdakini alıyor; arka şerit içeri gireni tutabiliyor. Arkadaşlarının daha önce kaybedilmiş bedenleri geri gelmeyecek. Çocuğun hatırası hâlâ çözülebilir.”
- N17–N20: “Kamera, yaşanmış gerçeği sakladığı için yüzünü takan şey görüntüye karışamıyor. Açık kapının kimse tarafından tutulması gerekmiyor. Sabit mandal yeterli.”
- N21–N24: “Beyaz taşların bittiği yerde evin duvarı görünmüyor. Ama evin size bıraktığı iz de geçebilir. Son ışık altında yapılan kontrol, eve kadar giden ikinci gölgeyi ayırabilir.”

## Önceden verilen ölüm ipuçları

Havuz kopyası gerçek arkadaşın yanındayken görülür; ona dalmak tehlikelidir. Duvar aralığındaki gölge bedensizdir. Aynada fiziksel karşılık yoktur. Tavan izleri ve ıslak kablo tehlikeye işaret eder. Kapı dışarıdan saldırı izleri taşır; çizgi koruyucudur. Masaya oturmanın kadraja girmek olduğu yazılıdır. Fotoğraf ön yüzünün kişiyi tuttuğu gösterilir. Bakıclıktaki anahtarın dişleri ve nefes eksikliği kimlik sorununu gösterir. Hiçbir genel “yanlış cevap seçtin” zarı yoktur. N15C/N16B'de kişisel eşik riski görev kartında açıkça görünür. Hikâyedeki kayıt/çizgi mekaniği bu kurguya özgüdür; gerçek doğaüstü uygulama iddiası taşımaz.

## Paket içeriği

Bu .md dosyası bütün sahne ve sonuçları aşağıda içerir. story.json aynı içeriğin motor girdisidir. assets/images/JS01.png–JS08.png sekiz ayrı görseldir; kolaj değildir. assets/audio/JS01.wav–JS08.wav sekiz özgün sentetik efekt, insan konuşması içermez. Sesler bu paket için programla üretilmiştir; gerçek ses kaydı veya lisans gerektiren sample kullanılmamıştır. ASSET_PROMPTS.md görsel üretim promptlarını ve eşleşmelerini içerir. README.txt hızlı aktarım talimatıdır. VALIDATION.json yapısal ve erişilebilirlik doğrulamasıdır; mevcut uygulamanın uçtan uca test edildiği anlamına gelmez.

Tek başına .md metni görsel baytlarını içermez. Görsel ve seslerin Claude'a aktarımı için ZIP kullanılır; ZIP açılamıyorsa klasörün içerikleri ayrı yüklenebilir. Dosya adlarını koru.

## Başlangıç bayrakları

```json
{
  "cameraClue": false,
  "childClue": false,
  "map": false,
  "pole": false,
  "proof": false,
  "routeClue": false,
  "invited": false,
  "poolKey": false,
  "identityRule": false,
  "tagged": false,
  "negative": false,
  "mirrorCovered": false,
  "power": false,
  "lamp": false,
  "wardKnown": false,
  "roomKey": false,
  "sealKnown": false,
  "childFreed": false,
  "gate": false,
  "route": false,
  "camera": false,
  "cleanKnown": false,
  "wardIntact": true
}
```

## Tam oynanabilir sahneler

### S3_N01 — Fotoğrafı Kim Çekti?

Villa, ilandaki fotoğraflardan daha büyük görünüyor. Bahçede havuz, salonun önünde uzun bir masa, üst katta boyası biraz solmuş ahşap kepenkler var. Anahtarı söylendiği gibi saksının altında buluyorsunuz. {FOCUS}, valizleri kapıya bırakırken ilk kez gerçekten tatile çıktığını hissediyor.

Mangal hazırlanıyor. Biri müziği açıyor; odalar paylaşılırken yatakların rahatlığı hakkında gereksiz uzun bir tartışma dönüyor. Sonra telefonları salondaki zamanlayıcıya bırakıp hep birlikte havuz kenarında fotoğraf çektiriyorsunuz.

Fotoğrafta hepiniz varsınız. Ama görüntü, telefonu bıraktığınız masadan değil, havuzun karşı kıyısından çekilmiş. Üst katın kilitli penceresinde bir kadın duruyor. Perdeler şimdi kapalı. Ev sahibinin mesajı hâlâ ekranda: “Üst kattaki oda tadilatta.”

**Soru:** İlk garipliği nasıl araştırıyorsunuz?

#### A. Orijinal fotoğrafı ve ilanı karşılaştırıp kaydediyoruz.

Görevli: 1. Fotoğrafın ayrıntılarını inceleyecek kişi.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

{A}, görüntünün saatini ve bakış açısını not ediyor. İlanın eski sürümünde aynı masanın üstünde makaralı bir fotoğraf makinesi var. Telefon görüntüsünü silmeden saklıyorsunuz.

Efekt: `{"cameraClue": true}`. Hedef: `S3_N02`; ayrıca genel son yaşayan önceliğini uygula.

#### B. Kadına seslenmek için kilitli odanın kapısını zorluyoruz.

Görevli: 1. Kapının altındaki çizgiyi geçmeden kilide bakılabilir; zorlamak korumayı bozar.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

{A} kapıyı zorladığında pervazdaki kesintisiz beyaz çizgi çatlıyor. İçeriden bir çocuk “O benim annem değil,” diye fısıldıyor. Kapı açılmıyor.

Efekt: `{"wardIntact": false, "childClue": true}`. Hedef: `S3_N02`; ayrıca genel son yaşayan önceliğini uygula.

#### C. Bahçeyi, çıkışları ve havuz ekipmanını kontrol ediyoruz.

Görevli: 2. Biri bahçe planını, diğeri havuzun kuru servis dolabını kontrol eder.

Tek yaşayan: Tek yaşayan kişi sabit tutucu veya kendinden kilitlenen mandalı kullanarak aynı işi tek başına yapar; ölü bir yardımcı anlatılmaz.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

Servis kapısının havuzun arkasında kaldığını, uzun bir kurtarma çubuğunun dolapta durduğunu görüyorsunuz. Çubuğu alıp plana çıkışı işaretliyorsunuz.

Efekt: `{"map": true, "pole": true}`. Hedef: `S3_N02`; ayrıca genel son yaşayan önceliğini uygula.

#### D. Yol yorgunluğudur deyip birlikte yemek yiyoruz.

Görevli: 0. Ortak karar.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

Sofra kuruluyor. Tabakları saydığınızda bir tane fazla olduğunu görüyorsunuz. Fazla tabağı kaldırıp birbirinizin yanında dinleniyorsunuz.

Efekt: `{"restAll": 1}`. Hedef: `S3_N02`; ayrıca genel son yaşayan önceliğini uygula.

### S3_N02 — 00.17

Mutfak saati 00.17 olduğunda televizyon açılıyor. Eski bir doğum günü kaydı: aynı salon, aynı masa, başında boş bir sandalye. Kadın kameraya dönüyor. “Misafirler de geldiğine göre başlayabiliriz.”

Kayıtta kapı çalıyor. Sizin kapınız da çalıyor.

Dışarıdaki adam bakıcı olduğunu söylüyor. Elindeki poşetlerde yolda konuştuğunuz ama sipariş vermediğiniz yiyecekler var. Kapı kamerasında yüzü seçiliyor; fakat yağmur başlamasına rağmen ne saçında ne omzunda bir damla var. Kapının yanında, ev sahibinin bıraktığı zarfın üstünde eski bakıcının fotoğrafı duruyor. Fotoğraftaki yüz aynı; tarih 1996.

**Soru:** Kapıdaki kişiye ne yapıyorsunuz?

#### A. Bakıcıyı içeri davet ediyoruz.

Görevli: 0. Davetin geri alınabileceğine ilişkin henüz bir kanıt yok.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

“Nihayet,” diyor adam. Eşiği geçtiği anda salondaki bütün sandalyeler masaya doğru sürtünüyor. Adam mutfağa yürürken camda yansıması görünmüyor.

Efekt: `{"invited": true}`. Hedef: `S3_N03`; ayrıca genel son yaşayan önceliğini uygula.

#### B. Kapıyı açmadan ev sahibini arıyor, mesajları saklıyoruz.

Görevli: 1. Telefonu kullanacak kişi.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

{A}, aramanın bağlanmadığını görüyor. Eski mesajların altında yeni bir satır beliriyor: “Yüzüne bakma. Camdan konuş.” Ekran görüntüsünü saklıyorsunuz.

Efekt: `{"proof": true}`. Hedef: `S3_N03`; ayrıca genel son yaşayan önceliğini uygula.

#### C. Üst sahanlıktan geliş yolunu kontrol ediyoruz.

Görevli: 1. Kuru iç merdivenden camın gerisinde gözlem yapacak kişi.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

{A}, evin çevresinde ayak izi olmadığını fark ediyor. Bahçe kapısının motoruna giden kuru servis hattı da yukarıdan görünüyor.

Efekt: `{"map": true}`. Hedef: `S3_N03`; ayrıca genel son yaşayan önceliğini uygula.

#### D. Hep birlikte arabalara binip ayrılıyoruz.

Görevli: 0. Bütün grup birlikte gider; oyuncu ayrı bırakılmaz.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

Yol tek yönde gidiyor. Yine de aynı villanın önüne dönüyorsunuz. Balkonda kendi silüetleriniz var. Yol kenarında kırmızı taş yerine bir kez beyaz taş gördüğünüzü hatırlıyorsunuz.

Efekt: `{"routeClue": true}`. Hedef: `S3_N03`; ayrıca genel son yaşayan önceliğini uygula.

### S3_N03 — Havuzun Dibindeki Arkadaş

Havuz lambası yanıyor. Dipte {FOCUS} yüzüne benzeyen biri yatıyor. Gerçek {FOCUS} grubun yanında; fotoğraftaki giysilerinin aynısı suyun içinde dalgalanıyor.

Suyun kenarında bir pirinç anahtar var. Dibe oturmuş gibi görünse de havuzun kuru servis ızgarasına takılı. Yan duvardaki kabartmada “Havuz kapağı” yazıyor. Kurtarma çubuğuyla almak mümkün. Suyun içindeki yüz gözlerini açıyor. Siz konuşmayı kestiğiniz hâlde ağzı konuşur gibi hareket etmeyi sürdürüyor.

**Soru:** Anahtarı ve sudaki kişiyi ne yapıyorsunuz?

#### A. Anahtarı kurtarma çubuğuyla alıyoruz.

Görevli: 1. Kuru kenardan çalışılacak. Çubuk yoksa dolabı güvenle açıp önce çubuk alınır.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

{A}, kuru kenardan uzanıp anahtarı ızgaradan çıkarıyor. Sudaki yüz çubuğun ucuna değil, elinize bakıyor.

Efekt: `{"pole": true, "poolKey": true}`. Hedef: `S3_N04`; ayrıca genel son yaşayan önceliğini uygula.

#### B. Sudaki arkadaşımızı kurtarmak için dalıyoruz.

Görevli: 1. Yanınızdaki gerçek kişi ile sudaki beden aynı anda görülüyor.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

{A} suya girince alttaki yüz yukarı dönüyor. Bir bedenin olması gereken yerde saçlar ve karanlık açılıyor. Suyun üstü yeniden düzleşiyor.

Efekt: `{}`. Ölüm: `primary`; kişisel görsel/ses: `JS02`. Hedef: `S3_N04`; ayrıca genel son yaşayan önceliğini uygula.

#### C. Izgaradaki yazıyı fotoğraflayıp sudan uzaklaşıyoruz.

Görevli: 1. Güvenli kuru taraftan inceleme.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

{A}, anahtarın yerini ve servis dolabının çizimini kaydediyor. Sonra havuz lambasını kuru düğmeden kapatıyorsunuz.

Efekt: `{"map": true}`. Hedef: `S3_N04`; ayrıca genel son yaşayan önceliğini uygula.

#### D. Havuzdaki sese adımızı söyleyip yanıt bekliyoruz.

Görevli: 1. Suyun karşısındaki kişiye doğrudan seslenecek kişi.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

{A} kendi adını söylediğinde dipteki ağız ilk kez düzgün kapanıyor. Artık bir kelimeyi doğru söyleyebiliyor. Evin size ait sesleri topladığını anlıyorsunuz.

Efekt: `{"tagged": true}`. Hedef: `S3_N04`; ayrıca genel son yaşayan önceliğini uygula.

### S3_N04 — Fazladan Yatak

Odaları yeniden sayıyorsunuz. Başta boş olan küçük odada şimdi yapılmış bir yatak var. Üstünde {FOCUS} çantasının aynısı, yastıkta yeni bir baş izi. Gerçek çanta aşağıdaki salonda.

Yatağın kenarında bir yetişkin oturuyor. Yüzünü çevirdiğinde içinizden birine benziyor; hareketi biraz geç tamamlıyor. Kapı eşiğinin altına sıkışmış küçük bir etiket var: “Eşyayı değil, geldiğin yolu kontrol et.” Aynanın önüne çekilmiş örtü, koridorun gerçek kapısını görünür bırakıyor.

**Soru:** Odadaki benzerle nasıl karşılaşıyorsunuz?

#### A. Kapıya girmeden kendi eşyalarımızı ve geliş yolumuzu karşılaştırıyoruz.

Görevli: 2. İki kişi birbirinin çantasını ve odanın sabit işaretlerini kontrol eder.

Tek yaşayan: Tek yaşayan kişi sabit tutucu veya kendinden kilitlenen mandalı kullanarak aynı işi tek başına yapar; ölü bir yardımcı anlatılmaz.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

Çantadaki fermuar ters tarafta. Gerçek odaların kapı eşiklerinde bahçedeki taş tozu var; bu eşik tertemiz. Yanlış odayı işaretleyip kapatıyorsunuz.

Efekt: `{"identityRule": true}`. Hedef: `S3_N05`; ayrıca genel son yaşayan önceliğini uygula.

#### B. Yatağın kenarındaki kişiye dokunuyoruz.

Görevli: 1. Benzerin hareketleri insan hareketleriyle uyuşmuyor.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

{A}, omza dokununca oturan beden geriye dönmeden yüzünü çeviriyor. Yatakta açılan çöküntü iki kişilik oluyor. Sonra yalnız biri kalkıyor; o da kapının dışında duramıyor.

Efekt: `{}`. Ölüm: `primary`; kişisel görsel/ses: `JS03`. Hedef: `S3_N05`; ayrıca genel son yaşayan önceliğini uygula.

#### C. Örtülü aynayı açıp kendi yüzümüzü yakından kontrol ediyoruz.

Görevli: 1. Aynanın altından odanın tersini gösteren bir ışık sızıyor.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

{A}, yüzünün aynada kendisinden önce gülümsediğini görüyor. Geri çekiliyor ama yansıma elini cama bırakıyor.

Efekt: `{"tagged": true}`. Hedef: `S3_N05`; ayrıca genel son yaşayan önceliğini uygula.

#### D. Kapıyı kapatıp topluca salona dönüyoruz.

Görevli: 0. Hiç kimse odada tek başına bırakılmaz.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

Koridorda herkes birbirinin adını ve geldiği yönü kontrol ediyor. Yatak gıcırtısı kapının arkasında kalıyor. Kısa bir süre soluklanıyorsunuz.

Efekt: `{"restAll": 1}`. Hedef: `S3_N05`; ayrıca genel son yaşayan önceliğini uygula.

### S3_N05 — Duvarın İçindeki Telefon

Salon duvarının içinden telefon çalıyor. Ekranınızdaki numara size ait. {FOCUS}, duvar kâğıdında dikdörtgen bir kabarıklık görüyor. Kâğıdın bir köşesi kalkmış; arkasındaki dar kapının iç tarafında telefon ışığı var.

Kapı aralığından uzanan gölge, arayanın omzuna benziyor ama yerde devam etmiyor. Süpürgelikteki vida, eski servis planının kopyasını tutuyor. Planı almak için aralığa el sokmak gerekmiyor. Telefon sesi bir anda kesiliyor. İçeriden sizin sesinizle “Açsana,” deniyor.

**Soru:** Duvarın ardına nasıl yaklaşıyorsunuz?

#### A. Süpürgelikteki servis planını dışarıdan alıyoruz.

Görevli: 1. Kâğıda kuru dış kenardan ulaşılır.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

{A}, planın alt kenarını çıkarıyor. Eski servis kapısı, avlu ve odanın koruyucu çizgisi işaretli. İçerideki telefon kapalı olmasına rağmen titreşiyor.

Efekt: `{"map": true}`. Hedef: `S3_N06`; ayrıca genel son yaşayan önceliğini uygula.

#### B. Telefonu almak için aralıktan uzanıyoruz.

Görevli: 1. Gölgede beden devamı yok; eli uzatmak tehlikeli.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

{A} elini aralığa sokuyor. Duvar kâğıdı bir nefes gibi genişliyor. Arkasındaki yüz, kapının tamamını dolduruyor. Telefon yeniden çaldığında arkadaşınız cevap vermiyor.

Efekt: `{}`. Ölüm: `primary`; kişisel görsel/ses: `JS04`. Hedef: `S3_N06`; ayrıca genel son yaşayan önceliğini uygula.

#### C. Dar kapıdan sırayla geçerek dışarı çıkmayı deniyoruz.

Görevli: 0. Planda burası çıkış değil, kapatılmış oda boşluğu olarak gösteriliyor.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

İlk adımda salon arkanızda bir fotoğraf kadar küçülüyor. Duvarın öte tarafında hepinizin omuzları birbirine değiyor. Dışarıdaki yeni misafirler, telefonlarının neden çaldığını anlamıyor.

Efekt: `{}`. Ölüm: `all`; kişisel görsel/ses: `JS04`. Hedef: `S3_E18`; ayrıca genel son yaşayan önceliğini uygula.

#### D. Aramayı reddedip kapı aralığını kapatıyoruz.

Görevli: 0. Ortak karar.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

Telefonu açmıyorsunuz. Kapının dış kolunu indirip kâğıdı yerine bastırıyorsunuz. Duvarın içinde bir el uzun süre kolu yokluyor. Sonunda ses uzaklaşıyor.

Efekt: `{}`. Hedef: `S3_N06`; ayrıca genel son yaşayan önceliğini uygula.

### S3_N06 — Banyo Aynası

Banyoda musluk kendi kendine açılıyor. Buhar, kapı aralığından koridora taşıyor. Aynada bir yetişkin kadın, kameraya bakar gibi size dönük duruyor. Arkanızdaki boş banyoda kimse yok.

Lavabonun altında bir fotoğraf zarfı var. Zarfın köşesi eşikten görülüyor. Askıdaki kalın havlu aynanın üstüne atılabilir. Aynanın çerçevesinde küçük bir bakım etiketi: “Camı sökmeyin. Gümüş yüzeyi kesintisiz bırakın.” Kadın ağzını oynatıyor; sesi giderden geliyor.

**Soru:** Banyoda ne yapıyorsunuz?

#### A. Aynayı örtüp fotoğraf zarfını alıyoruz.

Görevli: 1. Önce havlu atılır; ardından göz teması kurmadan zarf alınır.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

{A}, aynayı örttüğünde su kesiliyor. Zarftaki eski negatifte kadın yüzünün bulunduğu yerde bir insan silüeti yok; yalnız karanlık bir boşluk var.

Efekt: `{"negative": true, "mirrorCovered": true}`. Hedef: `S3_N07`; ayrıca genel son yaşayan önceliğini uygula.

#### B. Aynadaki eli tutup kadını dışarı çıkarıyoruz.

Görevli: 1. Görüntünün odada fiziksel karşılığı yok.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

{A} cama dokunuyor. Parmaklarınızın olduğu yer çukurlaşıyor. Öteki el bileği kapatınca ayna tekrar sertleşiyor. Banyoda yalnız musluk sesi kalıyor.

Efekt: `{}`. Ölüm: `primary`; kişisel görsel/ses: `JS05`. Hedef: `S3_N07`; ayrıca genel son yaşayan önceliğini uygula.

#### C. Aynayı kırarak geçidi kapatıyoruz.

Görevli: 1. Etiket gümüş yüzeyin kesilmemesini söylüyor.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

{A}, aynayı kırıyor. Her parça farklı bir koridoru yansıtıyor. Kadının yüzü kayboluyor ama artık bütün kırıkların içinden bakabiliyor.

Efekt: `{"tagged": true, "mirrorCovered": false}`. Hedef: `S3_N07`; ayrıca genel son yaşayan önceliğini uygula.

#### D. Kapıyı kapatıp havluyu dışarıdan koluna asıyoruz.

Görevli: 0. Birlikte geri çekilme.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

Banyonun kapısını kapatıyor, yanlışlıkla açılmaması için havluyla işaretliyorsunuz. Musluğun altında biri ellerini yıkamayı sürdürüyor. Kısa bir dinlenme fırsatı buluyorsunuz.

Efekt: `{"restAll": 1}`. Hedef: `S3_N07`; ayrıca genel son yaşayan önceliğini uygula.

### S3_N07 — Tavandaki Ayak İzleri

Elektrikler sönüyor. Bodrum merdiveninin başında akülü bir el feneri var. Işığı aşağı tuttuğunuzda tavanda çıplak ayak izleri görünüyor.

Sigorta kutusunun önündeki zemin kuru. Etikette önce giriş kesicisinin indirilmesi, sonra yan devrenin çalıştırılması istenmiş. Tavandaki izlerin altında su ve gevşemiş kablo var. Duvara sabit mandal, ışığı ve kutu kapağını aynı anda tutabiliyor. {FOCUS}, ışığın yetişmediği yerde bir saç tutamının aşağı sallandığını görüyor.

**Soru:** Elektriği nasıl geri getiriyorsunuz?

#### A. Kuru yan devreyi talimata göre iki kişiyle açıyoruz.

Görevli: 2. Biri feneri, diğeri kuru kesiciyi kullanır; tek kişide sabit mandal vardır.

Tek yaşayan: Tek yaşayan kişi sabit tutucu veya kendinden kilitlenen mandalı kullanarak aynı işi tek başına yapar; ölü bir yardımcı anlatılmaz.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

Giriş kesiliyor, yan hat açılıyor. Havuz değil koridor lambaları yanıyor. Tavandaki ayak izleri karanlıkta kalıyor.

Efekt: `{"power": true}`. Hedef: `S3_N08`; ayrıca genel son yaşayan önceliğini uygula.

#### B. Islak kabloyu çekerek kutuya ulaşmaya çalışıyoruz.

Görevli: 1. Islak alan ve tavandaki izler açıkça tehlike gösteriyor.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

{A} kabloyu çekince üstteki saçlar hareket ediyor. Tavanda tutunan yüz bir anda göz hizasına iniyor. Fener yerde kendi etrafında dönüyor.

Efekt: `{}`. Ölüm: `primary`; kişisel görsel/ses: `JS08`. Hedef: `S3_N08`; ayrıca genel son yaşayan önceliğini uygula.

#### C. Feneri alıp bodrumdan çıkıyoruz.

Görevli: 1. Kapı yanındaki kuru fener alınacak.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

{A}, feneri alıyor. Şimdilik elektrik gelmiyor; ama ellerinizde sabit ve güvenilir bir ışık var.

Efekt: `{"lamp": true}`. Hedef: `S3_N08`; ayrıca genel son yaşayan önceliğini uygula.

#### D. Bütün kesicileri birlikte kaldırıyoruz.

Görevli: 1. Kutudaki sıra talimatı bunun tersini söylüyor.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

{A} bütün kolları kaldırıyor. Ev kısa bir an gündüz kadar aydınlanıyor. O an her camda bir yüz beliriyor. Kesiciler tekrar atıyor.

Efekt: `{"power": false, "tagged": true}`. Hedef: `S3_N08`; ayrıca genel son yaşayan önceliğini uygula.

### S3_N08 — Kasetin Başlangıcı

Yan sehpanın çekmecesinde 1996 yazan bir kaset var. Üzerindeki el yazısı, kilitli odadan gelen nottaki yazıyla aynı. Televizyonun altında küçük bir oynatıcı hâlâ aküyle çalışıyor.

Kayıtta gerçek anne, çocuğun doğum günü pastasını getiriyor. Bir sonraki kesitte mutfaktan annesinin aynısı çıkıyor. İlki görüntünün kenarında hâlâ duruyor. Çocuk masanın altına saklanıyor. Babanın eli kamerayı çevirirken bir cümle duyuluyor: “Kamera gördüğünü saklıyor. O, saklananı değiştiremiyor.”

Kasetin kapağında asıl negatifin saklandığı çekmece işaretli. Televizyondaki boş sandalye, şimdi odanın içinde gıcırdıyor.

**Soru:** Kayda ne yapıyorsunuz?

#### A. İki annenin aynı anda göründüğü bölümü koruyoruz.

Görevli: 1. Kaset ve tarih birlikte kaydedilir.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

{A}, iki yüzün aynı anda bulunduğu kareyi saklıyor. Annenin kaçmadığını, çocuğu yukarı götürmeye çalıştığını görüyorsunuz.

Efekt: `{"proof": true, "childClue": true}`. Hedef: `S3_N09`; ayrıca genel son yaşayan önceliğini uygula.

#### B. Kaseti yakarak hayaletleri yok etmeye çalışıyoruz.

Görevli: 1. Kamera kaydının koruyucu niteliği az önce gösterildi.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

{A} kaseti şöminede yakıyor. Plastik kokusu geliyor. Yedek negatif daha önce alınmışsa elinizde kalıyor; bu kasetin kanıtı ise kayboluyor.

Efekt: `{"proof": false}`. Hedef: `S3_N09`; ayrıca genel son yaşayan önceliğini uygula.

#### C. Kasetteki çekmeceyi bulup negatifi alıyoruz.

Görevli: 1. Salonun kuru alt çekmecesi; banyo gerektirmez.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

{A}, ince negatif şeridini ışığa tutmadan zarfına koyuyor. Şeridin sonunda çocuk odasının kapısı ve kesintisiz çizgisi görünüyor.

Efekt: `{"negative": true}`. Hedef: `S3_N09`; ayrıca genel son yaşayan önceliğini uygula.

#### D. Televizyonu kapatıp birbirimizi sakinleştiriyoruz.

Görevli: 0. Ortak dinlenme.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

Ekran kapanıyor ama masadaki boş sandalye bir süre daha sallanıyor. Hiç kimse oturmuyor. Birbirinize olanları anlatarak nefesinizi topluyorsunuz.

Efekt: `{"restAll": 1}`. Hedef: `S3_N09`; ayrıca genel son yaşayan önceliğini uygula.

### S3_N09 — Kapının İki Tarafı

Üst kattaki odanın kapısının altında yeni bir kâğıt var: “Ben Deniz. Annem kapıyı dışarıdan kapattı. Sonra onun sesi içeriden gelmeye başladı.”

Kapının dışında otuz yıllık çizikler var; kilidin iç tarafında kırılma izi yok. Birinin dışarıdan içeri girmeye çalıştığı belli. Kenardaki eski not: “Yüzüne inanma. Yazıyı eşiğin dışından oku. Çizgi kesilirse beyaz macunla onar.” Küçük bir tamir kutusu hâlâ sahanlıkta.

İçeriden yetişkin bir kadın “Açın artık, çocuğu alın,” diyor. Ardından çok daha uzaktan bir çocuk “Beni ona vermeyin,” diye fısıldıyor.

**Soru:** Kilitli odaya nasıl yaklaşıyorsunuz?

#### A. Yazıyı okuyup tamir kutusuyla çizgiyi onarıyoruz.

Görevli: 1. Eşiğin dışından koruyucu çerçeveyi kesintisiz tamamlayacak kişi.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

{A}, çatlakları dolduruyor. Kadın sesi uzaklaşıyor. Kâğıdın arkasında çocukla konuşmanın güvenli yöntemi var: kapıyı açmadan yazıyla anlaşmak.

Efekt: `{"wardIntact": true, "wardKnown": true, "childClue": true}`. Hedef: `S3_N10`; ayrıca genel son yaşayan önceliğini uygula.

#### B. Kadın sesine güvenip kapıyı söküyoruz.

Görevli: 1. Kapının koruyucu olduğu dış çiziklerle gösteriliyor.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

{A}, menteşeyi çekince kapının karanlığından yetişkin bir yüz uzanıyor. Ağzındaki ses hâlâ sakin. Elini bıraktığınızda kapı kanadı artık sizi ayırmıyor.

Efekt: `{"wardIntact": false}`. Ölüm: `primary`; kişisel görsel/ses: `JS01`. Hedef: `S3_N10`; ayrıca genel son yaşayan önceliğini uygula.

#### C. Çocuğa kâğıtla gerçek adını ve o geceyi soruyoruz.

Görevli: 1. Kapı açılmaz; notlar eşikten geçirilir.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

{A}, dönen kâğıtta Deniz adını ve bir anahtar çizimini görüyor. Çocuk duvarın içindeki dar saklanma bölümünde kaldığını anlatıyor. Kapalı odanın içinde başka bir kapı daha var.

Efekt: `{"childClue": true, "wardKnown": true}`. Hedef: `S3_N10`; ayrıca genel son yaşayan önceliğini uygula.

#### D. Şimdilik kapıyı kapalı bırakıp diğer kanıtları arıyoruz.

Görevli: 0. Geri çekilme.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

Kapıyı zorlamıyorsunuz. Çocuk iki kere hafifçe vuruyor. Koridorun öteki ucundan daha sert, üçüncü bir vuruş geliyor.

Efekt: `{}`. Hedef: `S3_N10`; ayrıca genel son yaşayan önceliğini uygula.

### S3_N10 — Havuzun Kuru Haznesi

Havuzun servis kapağının altında su dolu bir kuyu değil, kuru bir bakım haznesi bulunuyor. Kapağın üst kilidi pirinç anahtara uyuyor. Cam gözlem penceresinden küçük metal bir kutu görünüyor.

Planın kenarında “Üst çekmece kuru hattan açılır; alt kapağı açmayın” yazıyor. Alt kapaktan, biraz önce kaybetmiş olabileceğiniz birinin sesi geliyor. Kimse ölmediyse kendi sesiniz geliyor. {FOCUS}, sesin durduğu anlarda aşağıdan tırnak sesleri duyuyor.

**Soru:** Haznedeki kutuyu nasıl alıyorsunuz?

#### A. Üst kilidi anahtarla açıp kuru çekmeceyi çekiyoruz.

Görevli: 1. Pirinç anahtar gerekir; yoksa zorlamak yerine kapak kapatılır.

**Sonuç 1 — geliştirici koşulu:** `{"flag": "poolKey"}`

{A}, kuru çekmeceyi açıyor. Kutuda oda anahtarının yedeği ve gerçek annenin bıraktığı son not var: “Onu sabaha değil, geldiği yere teslim edin.”

Efekt: `{"roomKey": true, "proof": true}`. Hedef: `S3_N11`; ayrıca genel son yaşayan önceliğini uygula.

**Sonuç 2 — geliştirici koşulu:** `{"always": true}`

Anahtar elinizde yok. {A}, kilidi zorlamadan geri dönüyor. Kapağın dışındaki çizim korunuyor.

Efekt: `{}`. Hedef: `S3_N11`; ayrıca genel son yaşayan önceliğini uygula.

#### B. Alt kapağı açıp seslenen kişiye iniyoruz.

Görevli: 1. Üstte alt kapağın açılmaması uyarısı var.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

{A} alt kapağı kaldırıyor. Su düz bir yüzey olarak yükseliyor; içindeki ağız önce nefes almayı deniyor. Kapak yeniden kapandığında arkadaşınız aşağıda kalmış oluyor.

Efekt: `{}`. Ölüm: `primary`; kişisel görsel/ses: `JS02`. Hedef: `S3_N11`; ayrıca genel son yaşayan önceliğini uygula.

#### C. Kuru servis koluyla kutuyu üst kanala taşıyoruz.

Görevli: 2. Çubuk varsa biri kolu uzatır diğeri üst mandalı sabitler.

Tek yaşayan: Tek yaşayan kişi sabit tutucu veya kendinden kilitlenen mandalı kullanarak aynı işi tek başına yapar; ölü bir yardımcı anlatılmaz.

**Sonuç 1 — geliştirici koşulu:** `{"flag": "pole"}`

Çubuğu üst kanala sokup kutuyu kuru tarafa çekiyorsunuz. Oda anahtarını ve annenin notunu alıyorsunuz.

Efekt: `{"roomKey": true, "proof": true}`. Hedef: `S3_N11`; ayrıca genel son yaşayan önceliğini uygula.

**Sonuç 2 — geliştirici koşulu:** `{"always": true}`

Servis koluna ulaşacak çubuk yok. İkiniz kapağı açık bırakmadan geri çekiliyorsunuz. Başka bir anahtar yolu aramanız gerekecek.

Efekt: `{}`. Hedef: `S3_N11`; ayrıca genel son yaşayan önceliğini uygula.

#### D. Kutuyu bırakıp servis kapısının mekanizmasını inceliyoruz.

Görevli: 1. Bahçe tarafındaki kuru mekanizma.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

{A}, motorun elektriksiz kaldığını, ama kolun elle de sabitlenebildiğini görüyor. Kapı henüz açılmıyor; güzergâhı kaydediyorsunuz.

Efekt: `{"map": true}`. Hedef: `S3_N11`; ayrıca genel son yaşayan önceliğini uygula.

### S3_N11 — Mutfak Camındaki Bakıcı

Mutfak camında bir yüz beliriyor. Kapıdan içeri almış olsanız bile bakıcı şimdi dışarıda. Aynı anda koridordan adımlarını duyuyorsunuz.

Camın içine buğu tutmuyor; nefesi dış tarafta da görünmüyor. Dışarıdaki adam avucunu gösteriyor: “Anahtarı unuttunuz. Açın, vereyim.” Tezgâhın yanındaki eski bakıcı dolabında “oda yedeği” yazan bir göz var. Göz kuru taraftan açılıyor. Adamın ceket cebinde görünen anahtarın dişleri ise anahtar deliğine uymuyor.

**Soru:** Bakıcıyla ne yapıyorsunuz?

#### A. Camı kapalı tutup içerideki yedek anahtarı alıyoruz.

Görevli: 1. Kuru dolabın küçük gözü açılacak.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

{A}, gerçek yedek anahtarı buluyor. Camdaki adam gülümsemeyi bırakıyor. Cebindeki anahtarın görüntüsü camda bir an gecikiyor.

Efekt: `{"roomKey": true, "identityRule": true}`. Hedef: `S3_N12`; ayrıca genel son yaşayan önceliğini uygula.

#### B. Camı açıp uzattığı anahtarı alıyoruz.

Görevli: 1. Anahtarın dişleri ve nefes eksikliği önce gösterildi.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

{A} camı açtığında yüz çerçeveyi dolduruyor. Dışarıdaki elin kolu yok; karanlık tezgâhın içine uzanıyor. Anahtar yere düşmüyor.

Efekt: `{}`. Ölüm: `primary`; kişisel görsel/ses: `JS06`. Hedef: `S3_N12`; ayrıca genel son yaşayan önceliğini uygula.

#### C. Bakıcının davetini geri aldığımızı söyleyip kapıları kapatıyoruz.

Görevli: 0. Bu hareket tek başına önceki daveti silmez.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

Bütün kapıları kapatıyorsunuz. Davet edilmişse ayak sesleri içeride kalıyor; edilmemişse dışarıda. Sözün tek başına yetmediğini anlıyorsunuz.

Efekt: `{"identityRule": true}`. Hedef: `S3_N12`; ayrıca genel son yaşayan önceliğini uygula.

#### D. Bakıcının teklif ettiği yeni konaklama formunu onaylıyoruz.

Görevli: 0. Formun alt satırı misafirliğin yeni kiracı bulunana dek süreceğini söylüyor.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

Ekranda “Ev sahibi oldunuz” yazıyor. Sabah kapı çalıyor. Yeni gelenlere anahtarı nereye bıraktığınızı söylemek istiyorsunuz; ağzınızdan yalnız hazır ilan metni çıkıyor.

Efekt: `{}`. Hedef: `S3_E19`; ayrıca genel son yaşayan önceliğini uygula.

### S3_N12 — Masada Bir Yer Daha

Salona döndüğünüzde sofra yeniden kurulmuş. Tabaklarda sıcak yemek var. Masanın başındaki kadın, kasetteki anneye benziyor; fakat fotoğrafta karanlık çıkan yüz de bu.

Sandalyelerin arkasında isimleriniz yazıyor. En son sandalye Deniz için ayrılmış. Masanın altında, aile fotoğrafına bağlanan ince siyah bir şerit duruyor. Şeridin üstünde küçük bir uyarı: “Oturmak, kadraja girmektir.” Yemek kokusu çok tanıdık. Kadın tek tek isimlerinizi sayıyor.

**Soru:** Sofrayla ne yapıyorsunuz?

#### A. Şeridi yerinden sökmeden bağlantısını fotoğraflıyoruz.

Görevli: 1. Masanın dışında kalınacak.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

{A}, şeridin sandalyeleri aile fotoğrafına bağladığını kaydediyor. Evin sizi neden masaya oturtmak istediği anlaşılıyor.

Efekt: `{"proof": true, "cameraClue": true}`. Hedef: `S3_N13`; ayrıca genel son yaşayan önceliğini uygula.

#### B. Hep birlikte yerlerimize oturup doğum gününü tamamlıyoruz.

Görevli: 0. Oturmanın aile kadrajına katılmak olduğu açıkça gösterildi.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

Sandalyeler masaya kilitleniyor. Kadının yüzü fotoğrafta yerine oturuyor. Artık sofrada hiç boş yer yok. Sabah temizlikçi masayı silerken çerçevenizdeki tozu da alıyor.

Efekt: `{}`. Ölüm: `all`; kişisel görsel/ses: `JS07`. Hedef: `S3_E17`; ayrıca genel son yaşayan önceliğini uygula.

#### C. Kadının verdiği kadehi alıp adımızı doğruluyoruz.

Görevli: 1. Yüzünüze ve adınıza yönelik teklif.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

{A} kadehi aldığında yüzeydeki yansıma bir an bağımsız hareket ediyor. Masadan kalkabiliyorsunuz ama ev artık sesinizle aynı anda konuşabiliyor.

Efekt: `{"tagged": true}`. Hedef: `S3_N13`; ayrıca genel son yaşayan önceliğini uygula.

#### D. Kimse oturmadan su içip birlikte dinleniyoruz.

Görevli: 0. Masadaki yiyecekler kullanılmaz; kendi kapalı su şişeleriniz alınır.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

Kendi suyunuzu içiyor, sandalyelerden uzak duruyorsunuz. Kadın isimleri saymayı bitirince baştan başlıyor.

Efekt: `{"restAll": 1}`. Hedef: `S3_N13`; ayrıca genel son yaşayan önceliğini uygula.

### S3_N13 — Fotoğraftaki Boşluk

Merdivendeki aile fotoğrafında yüzleriniz belirmeye başlamış. Bu, öldüğünüz anlamına gelmiyor; fotoğraf size yer hazırlıyor. Ölenler varsa onların görüntüsü sabit, yaşayanlarınki bulanık.

Çerçevenin arkasındaki kâğıtta annenin el yazısı var: “Ön yüz aldığı kişiyi bırakmaz. Ters taraftaki negatif ise içeri gireni tutar.” Fotoğrafta yetişkin kadının eli çerçevenin kenarını kavramış gibi duruyor. Çerçeveyi çevirmek için duvardaki kuru yan mandal kullanılabilir; yüzeye dokunmak gerekmez.

**Soru:** Aile fotoğrafına ne yapıyorsunuz?

#### A. Yan mandalı kullanıp arka yazıyı ve negatifi inceliyoruz.

Görevli: 1. Fotoğrafın ön yüzüne dokunulmaz.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

{A}, arka kapağın çizimini çıkarıyor. Kaynağı kapatmak için gerçek kayıt, çocuğun saklandığı yerin açılması ve kesintisiz çerçeve gerektiği yazıyor. Küçük bir negatif kopyası da elinizde.

Efekt: `{"sealKnown": true, "negative": true}`. Hedef: `S3_N14`; ayrıca genel son yaşayan önceliğini uygula.

#### B. Fotoğrafın önündeki eli tutup arkadaşımızı çekiyoruz.

Görevli: 1. Fotoğrafın alanı tuttuğu notta yazılı.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

{A} eli tuttuğunda parmaklar çerçevenin dışına çıkıyor. Duvardaki cam arkadaşınızın silüetini düzleştiriyor. Yeni yüz, diğerlerinden daha net.

Efekt: `{}`. Ölüm: `primary`; kişisel görsel/ses: `JS07`. Hedef: `S3_N14`; ayrıca genel son yaşayan önceliğini uygula.

#### C. Fotoğrafı duvardan indirip yüzünü kapatıyoruz.

Görevli: 2. İki kişi arka mandallardan tutar, ön yüz örtülür.

Tek yaşayan: Tek yaşayan kişi sabit tutucu veya kendinden kilitlenen mandalı kullanarak aynı işi tek başına yapar; ölü bir yardımcı anlatılmaz.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

Çerçeveyi yere değil, sabit duvar dayanağına ters çeviriyorsunuz. Arkadaki tarifi birlikte okuyorsunuz.

Efekt: `{"sealKnown": true}`. Hedef: `S3_N14`; ayrıca genel son yaşayan önceliğini uygula.

#### D. Fotoğrafın görüntüsüne bakmadan koridoru geçiyoruz.

Görevli: 0. Güvenli geri çekilme.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

Çerçeveyi arkanızda bırakıyorsunuz. Camın içinden gelen tıkırtı, adımlarınızla aynı ritimde sürüyor.

Efekt: `{}`. Hedef: `S3_N14`; ayrıca genel son yaşayan önceliğini uygula.

### S3_N14 — Saklanan Çocuk

Odanın kapısı yeniden karşınızda. Önceki kararlarınızın bıraktığı çizik ve onarımlar aynı yerde. Kâğıtta yeni bir cümle var: “Ben kapının arkasında değilim. Dolabın arkasındayım.”

Gerçek Deniz, oda içindeki dar saklanma bölümünde. Otuz yıldır bedeni yaş almayan bir hayalet; hâlâ o gecede. Onu kurtarmak bir çocuğu arabaya bindirmek değil, saklandığı gecenin dışına çıkmasına yardım etmek. Annesinin iki farklı görüntüsünü gösteren kayıt ona gerçeği hatırlatabilir.

Kilit anahtarla, koruyucu çizgi bozulmadan açılabiliyor. Kapının altından gelen yetişkin kadın sesi ise “Önce çizgiyi kazıyın,” diyor.

**Soru:** Deniz için ne yapıyorsunuz?

#### A. Anahtar ve kayıtla korumayı bozmadan saklanma bölümünü açıyoruz.

Görevli: 1. Oda anahtarı, kanıt ve sağlam çizgi gerekir; eksikse kapı zorlanmaz.

**Sonuç 1 — geliştirici koşulu:** `{"all": [{"flag": "roomKey"}, {"flag": "proof"}, {"flag": "wardIntact"}]}`

{A}, anahtarı çevirip kaydı açık eşikten gösteriyor. Deniz, annesinin karanlık yansıma olmadığını anlıyor. Saklandığı bölümden çıkıp odadaki küçük sandalyeye oturuyor. Sizi tanıyor; ilk kez o geceyi anlatabiliyor.

Efekt: `{"childFreed": true}`. Hedef: `S3_N15`; ayrıca genel son yaşayan önceliğini uygula.

**Sonuç 2 — geliştirici koşulu:** `{"always": true}`

Gereken anahtar, kayıt veya kesintisiz çizgi eksik. {A}, kapıyı zorlamadan bırakıyor. Deniz içeride kalıyor.

Efekt: `{}`. Hedef: `S3_N15`; ayrıca genel son yaşayan önceliğini uygula.

#### B. Kadının dediğini yapıp çizgiyi kazıyoruz.

Görevli: 1. Çizginin koruma olduğu daha önce gösterildi.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

{A}, çizginin son parçasını kazıyınca ses kapının dışına geçiyor. Kadının yüzü pervazın içinden uzanıyor. Çocuk saklandığı yerde sessizleşiyor.

Efekt: `{"wardIntact": false}`. Ölüm: `primary`; kişisel görsel/ses: `JS01`. Hedef: `S3_N15`; ayrıca genel son yaşayan önceliğini uygula.

#### C. Önce eksikleri tamamlayıp çocuğa ne yapacağımızı yazıyoruz.

Görevli: 1. Güvenli hazırlık: tamir kutusu ve odanın kuru belge gözü.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

{A}, eşiği onarıyor ve belge gözündeki gerçek aile kaydını alıyor. Deniz cevap veriyor: “Olanı hatırlatın, çıkabilirim.” Bir sonraki fırsata hazırlanıyorsunuz.

Efekt: `{"wardIntact": true, "wardKnown": true, "proof": true}`. Hedef: `S3_N15`; ayrıca genel son yaşayan önceliğini uygula.

#### D. Çocuğu bırakıp yalnız kendimizi kurtarmaya karar veriyoruz.

Görevli: 0. Bu karar çocuğu öldürmez; onu bu aşamada içeride bırakır.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

Deniz kapıya vurmayı bırakıyor. Kadının sesi ilk kez çok uzaktan geliyor: “Misafirler gidiyor.” Siz yine de başka bir çıkış arıyorsunuz.

Efekt: `{}`. Hedef: `S3_N15`; ayrıca genel son yaşayan önceliğini uygula.

### S3_N15 — Servis Kapısı

Havuzun arkasındaki servis kapısına ulaşıyorsunuz. Kapının öte yanında kısa bir avlu ve taş patika var. Elektrik gelmişse motorun ışığı yanıyor. Gelmemişse elle çalışan üst mandal görülebiliyor.

Mandalın altında ağır kapak var. Üzerinde “Askıya almadan altına girmeyin” yazıyor. Bahçedeki sabit destek, kapağı yukarıda tutabiliyor. Patikanın kavşağında beyaz taşlar görünürken ana yoldaki kırmızı lambalar tekrar aynı villaya dönüyor.

**Soru:** Servis çıkışını nasıl hazırlıyorsunuz?

#### A. Elektrikli motoru kuru panelden çalıştırıyoruz.

Görevli: 1. Elektrik varsa kapı açılır; yoksa panel zorlanmaz.

**Sonuç 1 — geliştirici koşulu:** `{"flag": "power"}`

{A}, kuru düğmeye basıyor. Kapı üst raya oturuyor. Gerçek avluya erişim artık açık.

Efekt: `{"gate": true}`. Hedef: `S3_N16`; ayrıca genel son yaşayan önceliğini uygula.

**Sonuç 2 — geliştirici koşulu:** `{"always": true}`

Panelin ışığı yok. {A}, kablolara dokunmadan geri çekiliyor. Kapı henüz açılmadı.

Efekt: `{}`. Hedef: `S3_N16`; ayrıca genel son yaşayan önceliğini uygula.

#### B. Sabit destekle kapağı askıya alıp elle açıyoruz.

Görevli: 2. Biri sabit desteği, diğeri üst mandalı kullanır; tek kişide kilitli destek yeterlidir.

Tek yaşayan: Tek yaşayan kişi sabit tutucu veya kendinden kilitlenen mandalı kullanarak aynı işi tek başına yapar; ölü bir yardımcı anlatılmaz.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

Kapak sabitleniyor. Üst mandal raydan ayrılınca servis kapısı açılıyor. Kimsenin geride tutması gerekmiyor.

Efekt: `{"gate": true}`. Hedef: `S3_N16`; ayrıca genel son yaşayan önceliğini uygula.

#### C. Kapağı sabitlemeden altına giriyoruz.

Görevli: 1. Yorgunluk 2 veya taklit düzeyi 3 ise geri çekilme başarısız; risk görev ekranında açık gösterilir.

**Sonuç 1 — geliştirici koşulu:** `{"any": [{"actorFatigueAtLeast": 2}, {"actorExposureAtLeast": 3}]}`

{A}, kapağı kaldırdığı anda tavandaki yüz kendi sesinizle sesleniyor. Yorulmuş kol kapağı tutamıyor. Üstteki gölge arkadaşınızı karanlığa çekiyor.

Efekt: `{}`. Ölüm: `primary`; kişisel görsel/ses: `JS08`. Hedef: `S3_N16`; ayrıca genel son yaşayan önceliğini uygula.

**Sonuç 2 — geliştirici koşulu:** `{"always": true}`

{A}, kapağın kayacağını fark edip geri çekiliyor. Kapı açılmıyor; bu işi sabit destek olmadan sürdürmemeye karar veriyorsunuz.

Efekt: `{}`. Hedef: `S3_N16`; ayrıca genel son yaşayan önceliğini uygula.

#### D. Önce beyaz taşların güzergâhını kaydediyoruz.

Görevli: 1. Kapı içinden gözlem; henüz çıkış yapılmaz.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

{A}, beyaz taşların dışarıdaki eski servis patikasını işaretlediğini görüyor. Kırmızı ışıklar aynı noktaya dönüyor.

Efekt: `{"route": true, "map": true}`. Hedef: `S3_N16`; ayrıca genel son yaşayan önceliğini uygula.

### S3_N16 — Henüz Söylemediğiniz Cümle

Boş odanın içinde kendi seslerinizle tartışılıyor. Birinizin “Kapıyı ben açarım,” dediğini duyuyorsunuz. Henüz kimse bunu söylemedi.

Koridorda küçük bir ses kayıt cihazı duruyor. Üstünde “O tekrarlar. Siz susunca devam ediyorsa siz değildir” yazıyor. Dışarıdan gelen bütün sesler bir an aynı nefesi alıyor. Yanınızdaki gerçek insanların solukları birbirinden farklı.

{FOCUS}, aynı görevlere tekrar tekrar gidenlerin seslerinin içeride daha net duyulduğunu fark ediyor. Evin öğrendiği yüzler, kapıların karanlığında daha kolay beliriyor.

**Soru:** Seslerin arasından gerçeği nasıl ayırıyorsunuz?

#### A. Birlikte susup kayıttaki gecikmeyi karşılaştırıyoruz.

Görevli: 0. Ortak gözlem.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

Siz susunca içerideki tartışma sürüyor. Gerçek grubun yanınızda olduğunu, tek bir tanıdık sesin kimlik kanıtı olmadığını kesinleştiriyorsunuz.

Efekt: `{"identityRule": true, "restAll": 1}`. Hedef: `S3_N17`; ayrıca genel son yaşayan önceliğini uygula.

#### B. Kendi sesimize cevap verip odaya tek başımıza giriyoruz.

Görevli: 1. Taklit düzeyi 3 ise varlık kişiyi tam yüzüyle karşılar; bu risk aday kartında görünür.

**Sonuç 1 — geliştirici koşulu:** `{"actorExposureAtLeast": 3}`

{A} kapıdan girince karşısındaki benzer hiç gecikmeden gülümsüyor. Bu kez adınızı doğru söylüyor. Kapı kapandığında odadaki sesler bir kişi artıyor.

Efekt: `{}`. Ölüm: `primary`; kişisel görsel/ses: `JS03`. Hedef: `S3_N17`; ayrıca genel son yaşayan önceliğini uygula.

**Sonuç 2 — geliştirici koşulu:** `{"always": true}`

{A}, kendi cümlesinin yanlış yerde nefes aldığını fark edip geri çıkıyor. Yüzünüzü biraz daha öğrenmiş olsa da kapıdan geçemiyor.

Efekt: `{"tagged": true}`. Hedef: `S3_N17`; ayrıca genel son yaşayan önceliğini uygula.

#### C. Kayıt cihazının altındaki çıkış çizimini alıyoruz.

Görevli: 1. Cihazın dış gözü kuru ve açıktır.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

{A}, beyaz taşların bulunduğu gerçek yolun çizimini alıyor. Çizimde ana yoldan dönülmemesi gerektiği yazıyor.

Efekt: `{"route": true}`. Hedef: `S3_N17`; ayrıca genel son yaşayan önceliğini uygula.

#### D. Sesleri bastırmak için ismimizi hep birlikte tekrar ediyoruz.

Görevli: 0. Ev sesleri topluyor; tekrar etmek ona malzeme verebilir.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

Duvarın içindeki sesler kusursuzlaşıyor. Artık hepinizin söylediği tek bir kelimeyi aynı anda çıkarabiliyorlar.

Efekt: `{"tagged": true}`. Hedef: `S3_N17`; ayrıca genel son yaşayan önceliğini uygula.

### S3_N17 — Negatifteki Kadın

Salondaki eski fotoğraf makinesi, masanın altındaki güvenli gözden çıkarılıyor. Akülü lambası çalışıyor. Şarj bağlantısı da koridor hattına takılabiliyor.

Yanındaki kullanım notu: “Ön yüz yaşayanı alır. Negatif içeri gireni tutar. Kaydı kanıtla. Işığı kapatma.” Bir sonraki satırda gerçek annenin yazısı var: “Çocuğu sahnenin dışına çıkarın. Sonra geldiği çerçeveyi kapatın.”

Makinenin vizöründe odaya dönük bir yüz var. Vizöre göz dayamadan gövdenin arkasındaki çizimleri okumak mümkün. Tehdit, kameranın sakladığı gerçek görüntüyü değiştiremiyor.

**Soru:** Fotoğraf makinesini nasıl hazırlıyorsunuz?

#### A. Vizöre bakmadan negatif yuvasını ve kapanış tarifini hazırlıyoruz.

Görevli: 1. Kuru gövde kapağı ve akü kullanılır; eksik negatif makinenin yedek gözündedir.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

{A}, yedek negatif şeridini buluyor. Mekanizmanın nasıl kapanacağını okuyup kamerayı hazır ediyorsunuz.

Efekt: `{"negative": true, "sealKnown": true, "camera": true}`. Hedef: `S3_N18`; ayrıca genel son yaşayan önceliğini uygula.

#### B. Vizöre gözümüzü dayayıp içerideki kadını çağırıyoruz.

Görevli: 1. Vizörde fiziksel odada olmayan bir yüz önceden gösterildi.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

{A}, gözünü vizöre götürüyor. Çerçevedeki kadın birden yaklaşınca dışarıdaki beden hareketsiz kalıyor. Fotoğrafın içinde bir el cama vuruyor.

Efekt: `{}`. Ölüm: `primary`; kişisel görsel/ses: `JS07`. Hedef: `S3_N18`; ayrıca genel son yaşayan önceliğini uygula.

#### C. Makineyi ön yüzünü örtüp yanımızda taşıyoruz.

Görevli: 1. Makine hasarsız alınır; tarif henüz okunmaz.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

{A}, ön kapağı kapatıp makineyi alıyor. Aküsü dolu; son kullanım için sabit ev ışığı yine gerekebilir.

Efekt: `{"camera": true}`. Hedef: `S3_N18`; ayrıca genel son yaşayan önceliğini uygula.

#### D. Makineyi bırakıp akülü ışığı ve servis planını alıyoruz.

Görevli: 1. Kamera yerinde kalır.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

{A}, ışığı ve planın kopyasını alıyor. Karanlıkta yürünebilecek yolunuz var; fotoğrafla kapanış hazırlanmıyor.

Efekt: `{"lamp": true, "map": true}`. Hedef: `S3_N18`; ayrıca genel son yaşayan önceliğini uygula.

### S3_N18 — Yüzünüzde Kalan İz

Mutfak masasının üstünde gerçek annenin küçük el aynası duruyor. Bu ayna banyodaki geçit değil: arkası baştan sona kapalı, gümüş yüzeyi kırılmamış. Yanında “Ört, say, gerçek ışıkta tekrar bak” yazıyor.

Yüzlerinize baktığınızda bazılarının gözleri bir an geç kırpılıyor. Evin sizden aldığı izi görebiliyorsunuz. Kuru örtü, gerçek adları yazdığınız liste ve kesintisiz ışıkla iz ayrılabiliyor. Camın içindeki küçük yüzü parmakla çekmeye çalışmak ise aynayı bir kapıya dönüştürüyor.

**Soru:** Taklit izini ne yapıyorsunuz?

#### A. Örtü ve gerçek listeyle kontrolü ışık altında tamamlıyoruz.

Görevli: 2. Sabit ışık varsa iz ve davet temizlenir; yoksa güvenli biçimde yalnız tarif öğrenilir.

Tek yaşayan: Tek yaşayan kişi sabit tutucu veya kendinden kilitlenen mandalı kullanarak aynı işi tek başına yapar; ölü bir yardımcı anlatılmaz.

**Sonuç 1 — geliştirici koşulu:** `{"flag": "power"}`

Örtü kalktığında yansımalarınız yeniden aynı anda hareket ediyor. İçeri davet edilmiş bakıcının adımları da dışarı çekiliyor. Evin topladığı iz ayrıldı; bundan sonraki görevler yine yüzleri öğretebilir.

Efekt: `{"tagged": false, "invited": false, "resetExposure": true, "cleanKnown": true}`. Hedef: `S3_N19`; ayrıca genel son yaşayan önceliğini uygula.

**Sonuç 2 — geliştirici koşulu:** `{"always": true}`

Sabit ışık yok. Camı açmıyor, örtülü bırakıyorsunuz. Tarifi kaydediyorsunuz; iz henüz temizlenmedi.

Efekt: `{"cleanKnown": true}`. Hedef: `S3_N19`; ayrıca genel son yaşayan önceliğini uygula.

#### B. Yansımadaki gecikmiş yüzü elimizle çekiyoruz.

Görevli: 1. Camı kapıya dönüştürme tehlikesi metinde verildi.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

{A}, kendi yansımasının eline uzanıyor. Küçük ayna bir anda odanın tamamı kadar derinleşiyor. İçerideki yüz, kendi yüzünüz değil.

Efekt: `{}`. Ölüm: `primary`; kişisel görsel/ses: `JS05`. Hedef: `S3_N19`; ayrıca genel son yaşayan önceliğini uygula.

#### C. Örtüyü kapalı tutup dinleniyoruz.

Görevli: 0. Fiziksel temas yok.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

Aynayı örtülü bırakıyorsunuz. Kısa bir sessizlikte gerçek seslerinizi yeniden duyabiliyorsunuz. İz temizlenmiyor ama yorgunluğunuz azalıyor.

Efekt: `{"restAll": 1}`. Hedef: `S3_N19`; ayrıca genel son yaşayan önceliğini uygula.

#### D. Aynayı ters çevirip servis yolunu çiziyoruz.

Görevli: 1. Arkadan güvenli okuma.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

{A}, çerçevenin arkasında avlu çıkışını buluyor. Eski ev planında ana yolun sahte, beyaz taşların gerçek olduğu gösterilmiş.

Efekt: `{"route": true, "map": true}`. Hedef: `S3_N19`; ayrıca genel son yaşayan önceliğini uygula.

### S3_N19 — Deniz İçin İkinci Fırsat

Üst katta çocuk kapının arkasına son bir kâğıt itiyor. Daha önce onu saklandığı yerden çıkardıysanız kâğıdı odadaki küçük sandalyeden yazıyor; çıkarmadıysanız dolabın arkasından.

“Annemin yüzünü takan şey, annemin hatıralarını bilmiyor. Bana sarı uçurtmayı sorun.” Kapının dışındaki küçük kuru servis gözünde yedek anahtar, fotoğraf kopyası ve tamir macunu duruyor. Çocuk onları ilk misafirlerden beri biriktirmiş.

Kadın sesi koridorun ucundan geliyor: “Havuzdan çıkarırsanız ben götürürüm.” Havuzdaki bedenin hâlâ yetişkin olduğunu biliyorsunuz.

**Soru:** Çocuğun son isteğine ne yapıyorsunuz?

#### A. Servis gözündeki araçlarla korumayı onarıp kaydı gösteriyoruz.

Görevli: 1. Tamir, anahtar ve kayıt aynı kuru gözde; önce çerçeve onarılır, sonra güvenli açılış yapılır.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

{A}, çerçeveyi tamamlayıp gerçek aile kaydını gösteriyor. Deniz zaten çıktıysa son hatırasını anlatıyor; çıkmadıysa saklandığı bölümün kapısını kendi açıyor. Sarı uçurtmayı annesinin onardığını hatırlıyor. Kimliğini çalan şeyin annesi olmadığını artık biliyor.

Efekt: `{"wardIntact": true, "wardKnown": true, "proof": true, "roomKey": true, "childClue": true, "childFreed": true}`. Hedef: `S3_N20`; ayrıca genel son yaşayan önceliğini uygula.

#### B. Havuzdaki bedeni çocuk sanıp çıkarmaya gidiyoruz.

Görevli: 1. Bedeni yetişkin; taklidin yanlış olduğu önceden gösterildi.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

{A} suya eğiliyor. Aşağıdaki yüz çocuk gibi sesleniyor ama ağzının büyüklüğü değişmiyor. Havuz kapağı içeriden kapanıyor.

Efekt: `{}`. Ölüm: `primary`; kişisel görsel/ses: `JS02`. Hedef: `S3_N20`; ayrıca genel son yaşayan önceliğini uygula.

#### C. Çocuğu kapalı odada bırakıp çizgiyi onarıyoruz.

Görevli: 1. Daha önce çıkmışsa tekrar hapsedilmez; yalnız oda koruması tamamlanır.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

{A}, koruyucu çizgiyi onarıyor. Deniz nerede duruyorsa orada kalıyor. İçerideyse hâlâ saklı; dışarı çıktıysa geçmişini hatırlamayı sürdürüyor.

Efekt: `{"wardIntact": true, "wardKnown": true}`. Hedef: `S3_N20`; ayrıca genel son yaşayan önceliğini uygula.

#### D. Onunla vedalaşıp çıkışa dönüyoruz.

Görevli: 0. Bu seçim önceki kurtarmayı geri almaz.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

“Ona ismimi söylemeyin,” diyor Deniz. Gerçek adını değil, ondan çalınan sesi korumaya çalıştığını anlıyorsunuz. Merdivenleri birlikte iniyorsunuz.

Efekt: `{}`. Hedef: `S3_N20`; ayrıca genel son yaşayan önceliğini uygula.

### S3_N20 — Yeniden Çalışan Ev

Koridor lambaları titriyor. Evin bütün kapıları aynı anda kapanıp açılıyor. Bodrumdan yetişkin birinin tavan boyunca yürüdüğünü duyuyorsunuz.

Bu kez merdivene inmek zorunda değilsiniz. Salon duvarındaki kuru yedek panel, bodrumun yan devresine bağlı. İç kapağın arkasında kısa talimat var: “Önce giriş kapalı, sonra servis açık.” Yanındaki küçük metal kart, fotoğrafın ters mandalını da gösteriyor.

{FOCUS}, ışık kesildiğinde kadın yüzünün bütün camlarda daha belirgin olduğunu görüyor. Evde kalıcı bir ışık olmadan kapanışın sürdürülemeyeceğini anlıyorsunuz.

**Soru:** Son hazırlığa hangi işi ekliyorsunuz?

#### A. Kuru yedek panelden servis ışığını açıyoruz.

Görevli: 1. Bodruma inilmez; doğru sıra yazılıdır.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

{A}, sırayı uyguluyor. Koridor ışığı sabitleniyor. Fotoğraf makinesinin şarj bağlantısı ve servis motoru aynı anda yeniden çalışıyor.

Efekt: `{"power": true}`. Hedef: `S3_N21`; ayrıca genel son yaşayan önceliğini uygula.

#### B. Bodrumdaki yürüyen kişiyi bulmaya gidiyoruz.

Görevli: 1. Tavandaki izler insanın yerde yürümediğini gösteriyor.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

{A}, son basamağa geldiğinde ses kesiliyor. Tavandaki yüz, size doğru değil kendi kolunun içinden eğiliyor. Fener ışığı merdivenlere geri dönemiyor.

Efekt: `{}`. Ölüm: `primary`; kişisel görsel/ses: `JS08`. Hedef: `S3_N21`; ayrıca genel son yaşayan önceliğini uygula.

#### C. Panel yanındaki ters mandal tarifini alıyoruz.

Görevli: 1. Güvenli kuru okuma.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

{A}, çerçevenin kapanış tarifini alıyor. Tam kapanış için gerçek kanıt, sahneden çıkarılan çocuk ve sabit ışık birlikte gerekiyor.

Efekt: `{"sealKnown": true}`. Hedef: `S3_N21`; ayrıca genel son yaşayan önceliğini uygula.

#### D. Mutfakta bekleyip görevleri yeniden dağıtıyoruz.

Görevli: 0. Dinlenme bütün yaşayanları etkiler.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

Kimseyi karanlığa göndermiyorsunuz. Son işleri kimin yapacağını konuşurken kollarınızın titremesi biraz azalıyor.

Efekt: `{"restAll": 1}`. Hedef: `S3_N21`; ayrıca genel son yaşayan önceliğini uygula.

### S3_N21 — Gerçek Çıkışın Rengi

Bahçedeki patika üçe ayrılıyor. Kırmızı lambalar ana yola, beyaz taşlar eski servis çıkışına, mavi ışık havuzun arka duvarına gidiyor.

Telefonun ilan fotoğrafında beyaz taşlar yok. Eski bakım planında ise yalnız onlar dışarıya bağlanıyor. Aynı yerde duran ve kayıtlar arasında değişmeyen şey, villanın taklidi değil. Servis kapısının kolu hâlâ içeriden açılabilir.

Kapının dışında bir araba far yakıyor. Sürücü yüzünü göstermiyor. “Yol burası,” diye sizin sesinizle sesleniyor.

**Soru:** Kaçış yolunu nasıl hazırlıyorsunuz?

#### A. Beyaz taşlarla planı eşleştirip gerçek yolu belirliyoruz.

Görevli: 1. Kuru avludan gözlem; sahte sürücüye yaklaşılmaz.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

{A}, sabit taşları eski plandaki mesafelerle eşleştiriyor. Gerçek yol, ana yolun bir parça aşağısındaki servis patikası.

Efekt: `{"route": true, "map": true}`. Hedef: `S3_N22`; ayrıca genel son yaşayan önceliğini uygula.

#### B. Servis kapısını elle kilitli açık konuma getiriyoruz.

Görevli: 2. Sabit destek ve üst mandal; kimse kapıyı tutmak için geride kalmaz.

Tek yaşayan: Tek yaşayan kişi sabit tutucu veya kendinden kilitlenen mandalı kullanarak aynı işi tek başına yapar; ölü bir yardımcı anlatılmaz.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

Üst mandal açık konuma kilitleniyor. Servis kapısı artık enerji kesilse de kapanmayacak.

Efekt: `{"gate": true}`. Hedef: `S3_N22`; ayrıca genel son yaşayan önceliğini uygula.

#### C. Yüzünü göstermeyen sürücüye arabayla bizi götürmesini söylüyoruz.

Görevli: 1. Sürücü sizin sesinizle konuşuyor.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

{A}, camına yaklaştığında direksiyonun arkasındaki yüz bakıcının yüzüne dönüşüyor. Kapı açılmadan kolunuz içeride kalıyor.

Efekt: `{}`. Ölüm: `primary`; kişisel görsel/ses: `JS06`. Hedef: `S3_N22`; ayrıca genel son yaşayan önceliğini uygula.

#### D. Çıkışı erteleyip kimlik kontrolünü yeniliyoruz.

Görevli: 0. Sabit ışık varsa izler temizlenir. Işık yoksa yalnız yorgunluk azalır.

**Sonuç 1 — geliştirici koşulu:** `{"flag": "power"}`

Örtü, liste ve sabit ışıkla yüzlerinizi karşılaştırıyorsunuz. Taklit izi ve eski davet ayrılıyor. Bu kontrol ortak yapıldığı için yeni görev izi eklenmiyor.

Efekt: `{"tagged": false, "invited": false, "resetExposure": true, "restAll": 1}`. Hedef: `S3_N22`; ayrıca genel son yaşayan önceliğini uygula.

**Sonuç 2 — geliştirici koşulu:** `{"always": true}`

Sabit ışık olmadan aynayı açmıyorsunuz. Birlikte dinleniyorsunuz; evin aldığı iz hâlâ kalıyor.

Efekt: `{"restAll": 1}`. Hedef: `S3_N22`; ayrıca genel son yaşayan önceliğini uygula.

### S3_N22 — Gidenlerin Defteri

Kapının yanındaki konuk defteri açılıyor. İlk sayfalarda tatil yorumları var. Sonra aynı el yazısı farklı isimlerle tekrarlanıyor. Son sayfada sizin adlarınız yazılı; çıkış tarihi boş.

Defterin arasında eski bir servis kartı duruyor. Kartta üç beyaz taş, bir dış avlu ve koruyucu kapının çizimi var. Üstündeki not kısa: “İsmini çizmek seni silmez. Gerçek kaydı yanına al.” Duvarın arkasından bir telefon daha çalıyor.

{FOCUS}, kalemin kâğıda kendiliğinden yeni bir cümle yazdığını görüyor: “Konaklamadan çok memnun kaldık.” Mürekkep henüz kurumamış. Adlarınızı silmek yerine kartı almak için defterin kuru kenarını kullanabilirsiniz.

**Soru:** Deftere nasıl karşılık veriyorsunuz?

#### A. Gerçek servis kartını alıp çıkış çizimini kaydediyoruz.

Görevli: 1. Sayfaya imza atılmaz; kuru kart dış kenardan alınır.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

{A}, servis kartını alıyor. Beyaz taşlı yol ve açık kapıya giden avlu aynı planda. Defterdeki isminiz hâlâ orada, ama bu tek başına sizi içeride tutamıyor.

Efekt: `{"map": true, "route": true}`. Hedef: `S3_N23`; ayrıca genel son yaşayan önceliğini uygula.

#### B. Duvarın içindeki sese defterimizi bulduğumuzu söylüyoruz.

Görevli: 1. Telefon sesi duvarın arkasından geliyor; güvenilir kimlik kanıtı değil.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

{A} duvara sesleniyor. Cevap kendi sesinizle geliyor, bu kez bütün cümleyi aynı nefeste kurabiliyor. Ev bir yüz daha öğrendi.

Efekt: `{"tagged": true}`. Hedef: `S3_N23`; ayrıca genel son yaşayan önceliğini uygula.

#### C. Karttaki koruyucu oda tarifini okuyup çerçeveyi onarıyoruz.

Görevli: 1. Kuru tamir kutusuyla sadece dış çizgi tamamlanır.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

{A}, notun devamını okuyup koruyucu çizgiyi kesintisiz tamamlıyor. Gece kapanmazsa sığınabileceğiniz yerin kuralını artık biliyorsunuz.

Efekt: `{"wardIntact": true, "wardKnown": true}`. Hedef: `S3_N23`; ayrıca genel son yaşayan önceliğini uygula.

#### D. Defteri kapatıp son hazırlıktan önce dinleniyoruz.

Görevli: 0. Hiç kimse yeni sözleşme imzalamaz.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

Defter kapanıyor. Kalemin içeride yazmayı sürdürdüğünü duyuyorsunuz. Kendi isimlerinizi birbirinize sesli söyleyip kısa bir süre dinleniyorsunuz.

Efekt: `{"restAll": 1}`. Hedef: `S3_N23`; ayrıca genel son yaşayan önceliğini uygula.

### S3_N23 — Son Kadraj

Sabah yaklaşıyor gibi; fakat gökyüzündeki solukluk her birkaç dakikada bir geri sönüyor. Salondaki aile fotoğrafında boş yerleriniz artık belli. Henüz oturmadığınız için yerleşmemişler.

Fotoğraf makinesinin yanında yedek şerit ve gerçek doğum günü kaydının kâğıt dökümü var. Bütün kapanış parçaları burada tamamlanabilir; ama tek bir iş seçmek zorundasınız. Sonra ev, bu salonu yeniden kuracak.

Kadın, merdivenin başında duruyor. Ayakları hiçbir basamağa basmıyor. “Bir kişi kalsın, ötekiler gitsin,” diyor. Kapının sabit mandalıysa kimseyi geride bırakmadan çalışabiliyor.

**Soru:** Son hazırlık hakkınızı neye kullanıyorsunuz?

#### A. Kamerayı negatif, kanıt ve ters mandal tarifiyle hazırlıyoruz.

Görevli: 1. Masadaki kuru parçalar tamamlanır.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

{A}, yedek şeridi takıp kaydı sabitliyor. Kamera ve kapanış tarifi hazır. Çocuk ve ışıkla ilgili önceki kararlarınız değişmiyor.

Efekt: `{"camera": true, "negative": true, "proof": true, "sealKnown": true}`. Hedef: `S3_N24`; ayrıca genel son yaşayan önceliğini uygula.

#### B. Bir kişiyi kadınla bırakıp diğerlerini kurtarmayı deniyoruz.

Görevli: 1. Kimsenin geride kalması mekanik olarak gerekli değil; kadın doğrulanmamış bir pazarlık sunuyor.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

{A} merdivene yaklaşınca kadının yüzü tanıdığı birine benziyor. Arkasını döndüğünde basamaklar çoktan kapanmış. Diğerleri için hiçbir yeni kapı açılmıyor.

Efekt: `{}`. Ölüm: `primary`; kişisel görsel/ses: `JS01`. Hedef: `S3_N24`; ayrıca genel son yaşayan önceliğini uygula.

#### C. Dışarıdaki servis yolunu ve açık kapıyı son kez hazırlıyoruz.

Görevli: 2. Kilitli açık üst mandal ve sabit taşlar birlikte kontrol edilir.

Tek yaşayan: Tek yaşayan kişi sabit tutucu veya kendinden kilitlenen mandalı kullanarak aynı işi tek başına yapar; ölü bir yardımcı anlatılmaz.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

Kapıyı açık kilitliyor, gerçek patikayı planda işaretliyorsunuz. Kimse arkada kalmıyor.

Efekt: `{"gate": true, "map": true, "route": true}`. Hedef: `S3_N24`; ayrıca genel son yaşayan önceliğini uygula.

#### D. Işık ve kimlik kontrolünü birlikte son kez tamamlıyoruz.

Görevli: 0. Kuru duvar paneliyle ışık açılır; sonra ortak kontrol yapılır.

**Sonuç 1 — geliştirici koşulu:** `{"always": true}`

Kuru panel açılıyor. Örtülü ayna ve listeyle yüzlerinizin izini ayırıyorsunuz. Eski davet kapanıyor. Bu ortak kontrol yeni fiziksel görev izi eklemiyor.

Efekt: `{"power": true, "tagged": false, "invited": false, "resetExposure": true, "restAll": 1}`. Hedef: `S3_N24`; ayrıca genel son yaşayan önceliğini uygula.

### S3_N24 — Anahtarı Masaya Bırakın

Saat yine 00.17. Salon bir an için ilk geldiğiniz hâline dönüyor. Masada saksının altından aldığınız anahtar duruyor. Telefonda ev sahibinin son mesajı açılıyor: “Çıkarken anahtarı bırakmanız yeterli.”

Ama artık biliyorsunuz: Anahtarı bırakmak geceyi kapatmıyor. Çerçevenin ters mandalı, beyaz taşlı servis yolu ve fotoğraf makinesi ayrı çıkışlar sunuyor. Her birinin hazırlığı farklı.

Çocuk saklandığı yerden çıktıysa merdivenin başında gerçek annesinin silüetini görüyor; çıkmadıysa kapalı odadan iki hafif vuruş geliyor. Yetişkin kadın masadaki boş sandalyeyi çekiyor.

Kimseyi yeniden göreve göndermeyeceksiniz. Son kararı hep birlikte uygulayacaksınız. Elinizdeki hazırlıklar görev kartında açıkça gösteriliyor.

**Soru:** Geceyi nasıl bitiriyorsunuz?

#### A. Gerçek kaydı kullanıp geldiği çerçeveyi tersinden kapatıyoruz.

Görevli: 0. Gerekli: kanıt, serbest Deniz, kapanış tarifi, negatif ve sabit elektrik. Eksikse sağlam koruyucu odaya sığınma yalnız onun tarifi biliniyorsa mümkün.

**Sonuç 1 — geliştirici koşulu:** `{"all": [{"all": [{"flag": "proof"}, {"flag": "childFreed"}, {"flag": "sealKnown"}, {"flag": "power"}, {"flag": "negative"}]}, {"deadCountEquals": 0}]}`

Gerçek kayıt, Deniz ve sabit ışık aynı anda yerinde. Çerçevenin ters mandalını kapatıyorsunuz.

Efekt: `{}`. Hedef: `S3_E01`; ayrıca genel son yaşayan önceliğini uygula.

**Sonuç 2 — geliştirici koşulu:** `{"all": [{"flag": "proof"}, {"flag": "childFreed"}, {"flag": "sealKnown"}, {"flag": "power"}, {"flag": "negative"}]}`

Bütün kapanış parçaları yerinde. Sağ kalanlar çerçevenin ters mandalını kapatıyor.

Efekt: `{}`. Hedef: `S3_E02`; ayrıca genel son yaşayan önceliğini uygula.

**Sonuç 3 — geliştirici koşulu:** `{"all": [{"flag": "wardIntact"}, {"flag": "wardKnown"}]}`

Kapanış tamamlanamıyor. Bildiğiniz sağlam koruyucu odaya çekilip eşiği kapatıyorsunuz.

Efekt: `{}`. Hedef: `S3_E03`; ayrıca genel son yaşayan önceliğini uygula.

**Sonuç 4 — geliştirici koşulu:** `{"always": true}`

Eksik kapanışta çerçeve ters dönmüyor. Koruyucu odaya güvenli geçiş de yok. Salonun kapıları yer değiştiriyor.

Efekt: `{}`. Hedef: `S3_E04`; ayrıca genel son yaşayan önceliğini uygula.

#### B. Servis kapısından beyaz taşların dış avlusuna kaçıyoruz.

Görevli: 0. Gerekli: açık servis kapısı ve harita. Deniz serbestse size gerçek avluyu gösterir. Taklit izi veya davet varsa dışarıya sızabilir.

**Sonuç 1 — geliştirici koşulu:** `{"all": [{"flag": "gate"}, {"flag": "map"}, {"flag": "childFreed"}, {"not": {"contaminated": true}}]}`

Deniz açık kapıdan gerçek avluya doğru bakıyor. Evin izi sizden ayrılmış durumda.

Efekt: `{}`. Hedef: `S3_E05`; ayrıca genel son yaşayan önceliğini uygula.

**Sonuç 2 — geliştirici koşulu:** `{"all": [{"flag": "gate"}, {"flag": "map"}, {"flag": "childFreed"}]}`

Deniz gerçek avluyu gösteriyor; fakat sizden ayrılmamış bir iz de eşikten geçiyor.

Efekt: `{}`. Hedef: `S3_E06`; ayrıca genel son yaşayan önceliğini uygula.

**Sonuç 3 — geliştirici koşulu:** `{"all": [{"flag": "gate"}, {"flag": "map"}]}`

Açık kapı ve planla dış avluya geçiyorsunuz. Çocuk sizi yönlendiremiyor; taş kapı arkanızda kapanıyor.

Efekt: `{}`. Hedef: `S3_E07`; ayrıca genel son yaşayan önceliğini uygula.

**Sonuç 4 — geliştirici koşulu:** `{"always": true}`

Hazırlanmamış servis geçidi sizi dışarı vermiyor. Attığınız adımlar ana bahçeye dönüyor.

Efekt: `{}`. Hedef: `S3_E08`; ayrıca genel son yaşayan önceliğini uygula.

#### C. Gerçek servis yolundan ana yola çıkıp yardım çağırıyoruz.

Görevli: 0. Gerekli: yol bilgisi, açık kapı ve gerçek yol işaretini aydınlatan elektrik. Araba kendi aküsüyle çalışır; ev elektriği arabanın enerjisi değildir.

**Sonuç 1 — geliştirici koşulu:** `{"all": [{"flag": "route"}, {"flag": "gate"}, {"flag": "power"}, {"not": {"contaminated": true}}]}`

Kapı, yol işareti ve ışık hazır. Yüzlerinizde evin izi kalmamış.

Efekt: `{}`. Hedef: `S3_E09`; ayrıca genel son yaşayan önceliğini uygula.

**Sonuç 2 — geliştirici koşulu:** `{"all": [{"flag": "route"}, {"flag": "gate"}, {"flag": "power"}]}`

Gerçek yola çıkıyorsunuz. Evin sizden aldığı iz de araç camında beliriyor.

Efekt: `{}`. Hedef: `S3_E10`; ayrıca genel son yaşayan önceliğini uygula.

**Sonuç 3 — geliştirici koşulu:** `{"flag": "gate"}`

Kapı açık, ama gerçek kavşak işareti doğrulanamıyor. Araba sisin içinde yanlış yola giriyor.

Efekt: `{}`. Hedef: `S3_E11`; ayrıca genel son yaşayan önceliğini uygula.

**Sonuç 4 — geliştirici koşulu:** `{"always": true}`

Servis kapısı açılmıyor. Sabahı gösteren ana yol hâlâ villanın duvarında bitiyor.

Efekt: `{}`. Hedef: `S3_E12`; ayrıca genel son yaşayan önceliğini uygula.

#### D. Kadını negatifin içine alıp görüntüyü orada kilitliyoruz.

Görevli: 0. Tam sonuç için kamera, negatif, kanıt, serbest Deniz ve sabit ışık gerekir. Bu yöntem çerçeveyi yok etmez; varlığı taşınabilir bir görüntüye kapatır.

**Sonuç 1 — geliştirici koşulu:** `{"all": [{"flag": "camera"}, {"flag": "negative"}, {"flag": "proof"}, {"flag": "childFreed"}, {"flag": "power"}]}`

Gerçek kayıt ve Deniz karşısında kadın görüntüye dönüyor. Sabit ışık altında negatif kapanıyor.

Efekt: `{}`. Hedef: `S3_E13`; ayrıca genel son yaşayan önceliğini uygula.

**Sonuç 2 — geliştirici koşulu:** `{"all": [{"flag": "camera"}, {"flag": "negative"}, {"flag": "proof"}]}`

Kamera ve gerçek kayıt kadını yakalıyor, ama geceyi sahnesinden bütünüyle ayıramıyorsunuz.

Efekt: `{}`. Hedef: `S3_E14`; ayrıca genel son yaşayan önceliğini uygula.

**Sonuç 3 — geliştirici koşulu:** `{"flag": "camera"}`

Hazır makineyi ateşliyorsunuz. Gerçek kayıt olmadan objektif karşısındaki kimliği ayıramıyor.

Efekt: `{}`. Ölüm: `all`; kişisel görsel/ses: `JS07`. Hedef: `S3_E15`; ayrıca genel son yaşayan önceliğini uygula.

**Sonuç 4 — geliştirici koşulu:** `{"always": true}`

Hazır kamera olmadan çerçeveye bakıyorsunuz. Fotoğrafı çeken bu kez ev oluyor.

Efekt: `{}`. Ölüm: `all`; kişisel görsel/ses: `JS07`. Hedef: `S3_E16`; ayrıca genel son yaşayan önceliğini uygula.

## Yirmi final

### S3_E01 — Son Misafirler

Çerçevenin arkasındaki mandal kapandığında kadın ilk kez kendi sesiyle konuşmaya çalışıyor. Çıkan ses, boş bir odada çekilen sandalyenin sesi. Deniz merdivenden iniyor. Gerçek annesinin silüeti kapıda bekliyor; çocuğun elini tuttuğunda ikisi de sabah ışığında dağılıyor.

Bahçe kapısı artık düz bir yola açılıyor. Hepiniz dışarıdasınız: {ALIVE_NAMES}. Bir hafta sonra ilanı aradığınızda hiçbir sonuç çıkmıyor. Çektiğiniz fotoğrafta pencere boş. Bu kez fotoğrafı kimin çektiğini biliyorsunuz.

Teknik sonuç: `all_survive`; çocuk: `free`; varlık: `sealed`.

### S3_E02 — Boş Kalan Koltuklar

Çerçeve kapanıyor. Deniz, gerçek annesinin yanına gidiyor. Sabah yolu açılıyor ama arabada bazı koltuklar boş: {DEAD_NAMES}. Geri dönüp çağırmak kimseyi geri getirmiyor.

Sağ kalanlar {ALIVE_NAMES}. Villa artık yeni misafir alamıyor. Son fotoğrafı silmiyorsunuz; kaybettiklerinizin yüzleri, evin onları yerleştirdiği çerçevede kalmıyor. Onları hatırlayan son kayıt sizde.

Teknik sonuç: `survivors_escape`; çocuk: `free`; varlık: `sealed`.

### S3_E03 — Kapısı Açılmayan Sabah

Koruyucu odaya sığınıyorsunuz. Beyaz çizginin dışından biri bütün gece kapıyı yokluyor. Pencere sabahı gösteriyor ama saatiniz 00.17'yi geçmiyor.

İçeride yaşayanlar {ALIVE_NAMES}. Ne acıkıyor ne de yaşlanıyorsunuz. Dışarıdan yeni valizlerin sesi geldiğinde kapıya iki hafif vuruş yapıyorsunuz. Artık başkalarını uyaran odanın içindesiniz.

Teknik sonuç: `alive_trapped`; çocuk: `state_preserved`; varlık: `active`.

### S3_E04 — Her Kapı Aynı Salon

Çerçeve kapanmıyor. Salondan çıktığınız kapı sizi aynı salona getiriyor; bu kez pencere bir kapı, merdiven bir dolap. Evin planı elinizde kâğıt olmaktan öteye gidemiyor.

{ALIVE_NAMES} hayatta. Ama her dönüşte birbirinizin adını biraz daha zor hatırlıyorsunuz. Dışarıdaki ilanda artık “çok odalı” yazıyor. İlan fotoğraflarında görünmüyorsunuz; henüz.

Teknik sonuç: `alive_lost_in_house`; çocuk: `state_preserved`; varlık: `active`.

### S3_E05 — Avlunun Ötesi

Deniz size gerçek avluyu gösteriyor. Ardından annesinin sesini bu kez yüzüne bakmadan tanıyor; ikisi eski taşların arasında kayboluyor. Siz duvarın dışına geçiyorsunuz. {ALIVE_NAMES} için yol açık.

Arkanızdaki villa küçülmüyor. Kötülük kapatılmadı; yalnız sizi takip edecek iz bulamadı. Ertesi ay başka bir hesapta aynı evin ilanını görüyorsunuz. Yeni misafirleri uyarabilecek gerçek kayıtlar elinizde.

Teknik sonuç: `survivors_escape`; çocuk: `free`; varlık: `active_contained_in_villa`.

### S3_E06 — Avludaki İkinci Gölge

Deniz gerçek avluya ulaşıyor; annesinin hatırasıyla birlikte geceden ayrılıyor. Siz de duvarın dışına çıkıyorsunuz. Birinizin gölgesi ise taş eşiğin üzerinde bir an geride kalıyor.

Eve vardığınızda {ALIVE_NAMES} hâlâ birlikte. Mutfak camındaki yansıma, odada kimse yokken size dönüyor. Villa arkanızda kaldı. İçinden çıkan şey kalmadı.

Teknik sonuç: `survivors_escape_contaminated`; çocuk: `free`; varlık: `escaped_with_group`.

### S3_E07 — İki Duvar Arasında

Servis kapısından gerçek bir avluya geçiyorsunuz. Kapı arkanızda kapanıyor. Dış duvarın ardında trafik sesi var, fakat çıkış kapısı yıllardır örülmüş.

{ALIVE_NAMES} burada hayatta kalıyor. Duvardan gelen iki hafif vuruş, içeride bıraktığınız çocuğun sesi. Ne villa sizi geri alıyor ne de avlu sizi dışarı veriyor. Gün ilerliyor; gölgeniz hiç uzamıyor.

Teknik sonuç: `alive_trapped_in_courtyard`; çocuk: `still_hidden`; varlık: `active`.

### S3_E08 — Yeniden Hoş Geldiniz

Patika havuzun başında bitiyor. Salonda müzik çalıyor. Masada taze mangal malzemesi, kapının yanında ilk gelişinizdeki valizler var.

{ALIVE_NAMES} yaptığınız her şeyi hatırlıyor. Ölenler geri gelmiyor. Telefonunuza aynı anahtar mesajı düşüyor. Bu bir yeniden başlama düğmesi değil; bitmiş gecenin içinde aynı başlangıca mahkûmsunuz.

Teknik sonuç: `alive_loop`; çocuk: `state_preserved`; varlık: `active`.

### S3_E09 — Gerçek Yoldan Çıkanlar

Beyaz taşlar sizi gerçek kavşağa götürüyor. Araba sonunda villayı arkasında bırakıyor. Bu kez yolun sonunda açık bir benzinlik var; görevli sizin görmediğiniz geceyi yaşamamış.

{ALIVE_NAMES} yardım çağırıyor. Çocuğun durumu son kartta anlatılıyor: {CHILD_EPILOGUE}. Evin kaynağı kapanmadı, ama sizden iz taşımıyor. Verdiğiniz ihbar üzerine aynı villaya giden ekip, boş bir arazi buluyor.

Teknik sonuç: `survivors_escape`; çocuk: `state_preserved`; varlık: `active_elsewhere`.

### S3_E10 — Eve Kadar

Gerçek yoldan çıkıyorsunuz. Telefonlar yeniden şebeke buluyor. {ALIVE_NAMES} ilk kez normal insan sesleri duyuyor. Çocuğun durumu: {CHILD_EPILOGUE}.

Bir hafta sonra konaklama bildirimi geliyor. Kapak fotoğrafında hepiniz havuz başındasınız; kaybettikleriniz de orada. Sizin hesabınızdan yazılmış yorum: “Çok güzel bir hafta sonuydu. Kesinlikle tekrar geleceğiz.” O gece yatak odanızın kapısında aynı beyaz çizgi beliriyor.

Teknik sonuç: `survivors_escape_contaminated`; çocuk: `state_preserved`; varlık: `escaped_with_group`.

### S3_E11 — Hiç Bitmeyen Çevre Yolu

Kapıdan çıkıp karanlık kavşağa giriyorsunuz. Şehir tabelası her beş kilometrede bir aynı mesafeyi gösteriyor. Arkadaki villa görünmüyor; önünüzdeki yol da hiçbir yere varmıyor.

{ALIVE_NAMES} arabada hayatta. Yakıt ibresi sabit. Radyoda kendi konuşmanız, siz söylemeden birkaç saniye önce duyuluyor. Çocuğun durumu: {CHILD_EPILOGUE}.

Teknik sonuç: `alive_road_loop`; çocuk: `state_preserved`; varlık: `active`.

### S3_E12 — Camın Öte Yanındaki Kurtarma

Kapalı servis kapısının arkasından siren duyuyorsunuz. Bir kurtarma görevlisi duvarın öte yanında durup size ışık tutuyor. Siz bağırdığınızda yüzü korkuyla değişiyor; onun gördüğü şey insan değil.

{ALIVE_NAMES}, villanın pencerelerinde yaşayan gölgeler olarak kalıyorsunuz. Dışarıdaki görevliler kapı numarasını not edip uzaklaşıyor. Henüz ölmediniz. Onlara kendinizi anlatacak bir yüzünüz kalmadı.

Teknik sonuç: `alive_displaced`; çocuk: `state_preserved`; varlık: `active`.

### S3_E13 — Sakın Banyo Etmeyin

Flaş patlıyor. Kadın negatifin içine doğru katlanıyor. Deniz, annesinin gerçek hatırasıyla geceden ayrılıyor. Kapılar açılıyor ve {ALIVE_NAMES} dışarı çıkıyor.

Ev sıradan bir binaya dönüşüyor ama şerit elinizde. Üzerindeki tek kare hâlâ sıcak. Zarfın üstüne tek cümle yazıyorsunuz: “Bu negatifi asla banyo etmeyin.” Kötülüğü yok etmediniz; taşınabilir bir hapishaneye kapattınız.

Teknik sonuç: `survivors_escape_with_containment`; çocuk: `free`; varlık: `trapped_in_negative`.

### S3_E14 — Donmuş Kare

Flaş yanıyor ve sönmüyor. Kadın size ulaşamıyor; sizin de kapıya uzanan eliniz tamamlanmıyor. Salonun dışında zaman akıyor.

{ALIVE_NAMES} bu ışıklı anda hayatta. Düşünebiliyor, konuşabiliyorsunuz; hareketleriniz aynı saniyenin içinde dönüyor. Yıllar sonra bir koleksiyoncu, boş bir evin içinde hâlâ yanmakta olan fotoğraf makinesini buluyor. Çocuğun durumu: {CHILD_EPILOGUE}.

Teknik sonuç: `alive_time_frozen`; çocuk: `state_preserved`; varlık: `frozen_with_group`.

### S3_E15 — Ailenin Yeni Yüzleri

Gerçek kayıtla ayrılmayan objektif kimi alacağını bilmiyor. Flaş patladığında {FINAL_VICTIMS} görüntünün içine çekiliyor. Önceden kaybettikleriniz geri dönmüyor.

Çerçevedeki aile artık yeni yüzler taşıyor. Sizi tanıyan biri ilanı açtığında kısa bir an gözlerinizin hareket ettiğini görüyor. Ekranı kapattığında fotoğraf yeniden sıradanlaşıyor.

Teknik sonuç: `all_dead`; çocuk: `state_preserved`; varlık: `active`.

### S3_E16 — Fotoğrafı Ev Çekti

Hazır olmayan makinenin düğmesine basıyorsunuz. Ses sizin elinizden değil, merdivendeki çerçeveden geliyor. {FINAL_VICTIMS} bir an için bütün odaları aynı anda görüyor.

Sonra hiçbir oda yok. İlan güncelleniyor: yeni yataklar, yeni havuz fotoğrafları, yeni bir aile. Kameranın olmadığı bir gecede fotoğrafı ev çekti.

Teknik sonuç: `all_dead`; çocuk: `state_preserved`; varlık: `active`.

### S3_E17 — Doğum Günü Tamamlandı

Sofradaki son sandalye doluyor. {FINAL_VICTIMS} nefes almayı bırakırken kayıttaki mumlar yeniden yanıyor. Daha önce ölenler, fotoğraftaki yerlerinden çıkmıyor.

Deniz için ayrılan sandalye yine boş. Kadın artık bir sonraki misafirleri bekleyebilir. Otuz yıl önce bitmeyen doğum günü, sizin yüzlerinizle bir kez daha tamamlanıyor.

Teknik sonuç: `all_dead`; çocuk: `state_preserved`; varlık: `active`.

### S3_E18 — Duvarın İçindeki Zil

{FINAL_VICTIMS} duvarın arkasında kalıyor. Dar boşlukta hiçbir kapı yok. Telefonlarınız hâlâ şarjlı, fakat arayabildiğiniz tek numara kendinizinki.

Bir gün duvarın dışından valiz sesi geliyor. Arama tuşuna basıyorsunuz. Yeni gelenler, kendi numaralarından arandıklarını görünce şaşırıyor. Sesiniz artık telefonun değil duvarın içinden geliyor.

Teknik sonuç: `all_dead`; çocuk: `state_preserved`; varlık: `active`.

### S3_E19 — Yeni Ev Sahipleri

Form onaylandığında {ALIVE_NAMES} misafir olmaktan çıkıyor. Yaşıyorsunuz; ama bahçe kapısı artık siz yaklaşınca açılmıyor. Sadece gelenleri karşılayabiliyorsunuz.

Ekranda yeni bir rezervasyon görünüyor. Bütün geceyi anlatmak istiyorsunuz. Yazdığınız cümle gönderilirken değişiyor: “İyi tatiller. Anahtar saksının altında.” Daha önce ölenler bu anlaşmayla dirilmiyor.

Teknik sonuç: `alive_bound_as_hosts`; çocuk: `state_preserved`; varlık: `active`.

### S3_E20 — Anahtar Saksının Altında

Son yaşayan kişinin sesi de kesiliyor. Ölenler: {DEAD_NAMES}. Villa kimsenin arkasından koşmuyor. Sandalyeleri yerine çekiyor, havuzun ışığını kapatıyor, anahtarı yeniden saksının altına bırakıyor.

Sabah ilan takvimi açılıyor. Bugünün karşısında tek bir kelime var: “Müsait.”

Teknik sonuç: `all_dead`; çocuk: `state_preserved`; varlık: `active`.

## Claude için uygulama sırası ve kabul testleri

Önce mevcut projeyi ve ortak odanın kodunu incele. JSON için şema doğrulaması ekle; oyuncu metinleri ile teknik durum alanlarını ayır. Saf transition(state,choice,actors) motorunu uygula. Ardından iki aşamalı görev seçimini, kişisel ölüm kanalını ve yeniden bağlanma akışını kur. En son menü kartını, daktilo anlatımını, telefon arayüzünü ve asset ön yüklemeyi bağla. Son ekranda teknik flag adları yerine Türkçe hazırlık ve sonuç özetleri göster. Dinamik isimleri metin olarak işle. Sayfa altı ve uygulama metadata'sında bu hikâyenin bağımsız sürümünü belirt.

1. 4, 7 ve 10 oyuncuyla başlangıç, dinamik FOCUS ve adlar çalışır. Aynı ada benzeyen Türkçe karakterli girişler tekillik kuralına uyar.
2. Her N01–N24 dört seçenek gösterir. Eşitlikte yalnız en yüksek eşit seçenekler tekrar gelir; tekrar eşitlik otomatik rastgele çözülmez.
3. İki görevde ikinci kişi birinciden farklıdır. Tek yaşayan sürümü çalışır. Ölü ve bağlantısız karakter fiziksel aday olamaz.
4. Aynı state/choice/actors aynı case ve sonucu verir. Ekipman yokluğu yazılı güvenli başarısızlık üretir; hayalî eşya verilmez.
5. N15C fatigue=2 veya exposure=3 iken birinci görevli ölür. Diğer durumda ölmez. N16B yalnız exposure=3'te ölümcül olur. Eşik değerlendirmesi görev artışından öncedir.
6. Arınma resetExposure işlemi görev artışından sonra çalışır; N23D'de hiçbir yeni exposure oluşmaz. contaminated yalnız tagged/invited kullanır.
7. N14A gereken üç önkoşul yoksa öldürmez, ilerler; N19A güvenli telafi yoludur. Çocuğun serbest kalması oyuncuları diriltmez. N19C önceki childFreed'i geri almaz.
8. JS01–JS08'in her birine en az bir yazılı ölüm case'inden erişilir. Toplu ölüm daha önce ölene ikinci olay göndermez. N24D/erken ölümler case finalinde kalır; otomatik E20'ye çevrilmez.
9. Ölen A'nın görsel/sesi yalnız A istemcisinde açılır; yaşayan B/C/D'nin ağ olaylarında ölüm efekt payload'ı yoktur. Ölü oyuncu ortak oylamaya devam eder.
10. Aynı ölüm olayı iki kez gelirse efekt bir kez oynar. Yeniden bağlanmada sade ölüm kartı gelir. Ses/görsel kapalı ve audio autoplay engelli cihazlar oyunu kilitlemez.
11. Son yaşayanın sıradan ölümü E20; erken E17/E18/E19 ve N24 finallerinde yazılı ending üstündür. Bir yaşayanla tüm düğümler uygulanabilir.
12. 20 finalin her biri için ulaşılabilir rota vardır. Tam kadro E01 ve en az bir kayıpla E02 mümkündür. N24 koşulları listelenen sırayla, ilk eşleşme ilkesiyle çalışır.
13. Telefon arka plandayken, yavaş bağlantıda ve bozuk asset durumunda oyun sonucu tutarlı kalır. Mobil Chrome/Safari'de sesin kullanıcı dokunuşuyla açılması doğrulanır.
14. Eski iki hikâyenin menüsü ve kayıtları korunur. Yeni run eski hikâyeyi, ölümü veya yerel efekt tercihlerini bozmaz. Efekt tercihi oturumlar arasında korunabilir, karakter durumu korunmaz.
15. story.json ile .md sonuçları karşılaştırılır; paket resimleri gerçekten açılır, WAV başlıkları okunur, ZIP bütünlüğü doğrulanır. Bu paketin doğrulaması gerçek uygulama testinin yerine geçmez.

Son teslimde değişen dosyaları, yerel çalıştırmayı ve dağıtımı anlat; yapılmamış tarayıcı/cihaz testini yapılmış gibi yazma. Oyuna çalışma anında yeni ücretli servis ekleme.

## Doğrulanmış final rotaları

Aşağıdaki harfler N01'den itibaren sırayla eylem seçimidir. Görevli kimlikleri, başlangıç kadrosu sayısı ve tekrar oynatılabilir tam adımlar VALIDATION.json endingWitnesses içinde bulunur. Bu tablodaki rotalar aynı görevlilerle tekrar yürütülmüştür. Tek başına harf dizisi kişisel eşik durumunda aynı sonucu garanti etmez.

| Final | Oyuncu | Seçim dizisi | Sağ kalan |
|---|---:|---|---:|
| S3_E01 | 4 | ACADADCAADACAAADACAAADDA | 4 |
| S3_E02 | 10 | AAACDACDCACADDBAAAABBADA | 9 |
| S3_E03 | 10 | CADCACCBDCCCDADDDCCCBDDA | 10 |
| S3_E04 | 10 | BBAAAAAACDCADADBDDBABBAA | 9 |
| S3_E05 | 7 | CBDCDACACDAADADCADAABDDB | 7 |
| S3_E06 | 10 | AAACDADDCAAAAABDCACDDCCB | 10 |
| S3_E07 | 7 | BDCDDDABCCCDACBCCADDADDB | 7 |
| S3_E08 | 10 | BACDBDDDCCACCADDCADDACDB | 9 |
| S3_E09 | 10 | CAADDCCCCACCCDBDDADDADDC | 10 |
| S3_E10 | 10 | CCCDAACADACDABDBADCABDAC | 9 |
| S3_E11 | 7 | ACCADDAADDACCCBDCADCDBDC | 7 |
| S3_E12 | 10 | BACDAAADDACCCDDCAAADDCAC | 10 |
| S3_E13 | 10 | DCCAADABDAADDDDACCADBDAD | 10 |
| S3_E14 | 7 | ACDCAAAADBACCDDDCDCDDAAD | 6 |
| S3_E15 | 10 | ADDADCAAACACCAADCCDCBDCD | 0 |
| S3_E16 | 10 | BCDAACCCADAADCBCDAACADDD | 0 |
| S3_E17 | 4 | BAADDADCBBAB | 0 |
| S3_E18 | 4 | CDAAC | 0 |
| S3_E19 | 7 | CADADDDBCDD | 7 |
| S3_E20 | 4 | DBDBDACDBBCAACDB | 0 |
