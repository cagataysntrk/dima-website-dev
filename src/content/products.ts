import type { L, Point } from "./types";

/**
 * The product portfolio: the ONE place a product name, slug, colour or domain is written.
 *
 * The Upcy-prefixed products may be consolidated into one platform under a new name. When
 * that happens, this file changes and nothing else does: components render whatever is
 * here, and tests/guards.test.ts fails if a product name appears in a component or route.
 *
 * Copy traces to the design system's public message houses (brand/public/messaging-*.md).
 * It is rewritten for this page, not copied from the product domains, which would split
 * search ranking between two URLs competing for the same words.
 */

/** A design-system brand. Rendered as `data-brand` on the product's block. */
export type BrandKey = "upcytech" | "dima" | "upcyman" | "upcycarbon" | "upcyops";

export interface Product {
  /** Stable key for React and tests. Never shown; survives a rename. */
  id: string;
  /** Display name. */
  name: string;
  /** In-page anchor on the portfolio page. */
  slug: string;
  brandKey: BrandKey;
  /** Whether the product has its own site. UpcyOps does not: this page is its only home. */
  hasOwnSite: boolean;
  /** Its URL. Missing while `hasOwnSite` is true renders a visible [COPY NEEDED], not a link. */
  domain?: string;
  /** handoff ≈250 words, then out to the domain · standalone ≈400 · landing ≈600, the only page. */
  depth: "handoff" | "standalone" | "landing";
  category: L;
  /** One line for the home page index (design-system corporate house, §3). */
  oneLiner: L;
  matrix: { problem: L; audience: L };
  title: L;
  problem: L<string[]>;
  capabilities: L<Point[]>;
  /** A paragraph after the capabilities: delivery model, or a roadmap line stated as roadmap. */
  note?: L;
  audience: L<string[]>;
  cta: L;
  /**
   * Interface screenshots for the home page's product wheel (public/products). A missing one
   * renders a visible [COPY NEEDED] inside the mockup: never a drawn stand-in. The analytics
   * product's pair is the real PoC in its dark theme, captured by `bun run capture:screens`
   * (D-041).
   */
  screens?: { desktop?: string; mobile?: string };
  /** Only for `depth: "landing"`: the sections a standalone landing page needs. */
  landing?: {
    workflow: { title: L; intro: L; steps: L<Point[]> };
    details: { title: L; items: L<Point[]> };
    questions: { title: L; items: L<{ q: string; a: string }[]> };
  };
}

export const products: readonly Product[] = [
  {
    id: "analytics",
    name: "Dima",
    screens: { desktop: "/products/dima-desktop.webp", mobile: "/products/dima-mobile.webp" },
    slug: "dima",
    brandKey: "dima",
    hasOwnSite: true,
    domain: "https://usedima.com",
    depth: "standalone",
    category: { tr: "Kurumsal Karar Zekâsı ve Optimizasyon Platformu", en: "Enterprise Decision Intelligence and Optimization Platform" },
    oneLiner: {
      tr: "Şirket verisini bir araya getirir; olan biteni sürekli izler, önemli sapma ve fırsatları fark eder, nedenini kanıtlarıyla araştırır ve karara hazırlar.",
      en: "Connects company data, continuously monitors what is happening, detects important deviations and opportunities, investigates why with evidence, and prepares decisions.",
    },
    matrix: {
      problem: {
        tr: "Finans, muhasebe, üretim ve diğer kaynaklardaki veriler hem birbirinden kopuk hem zaman içinde derin. Kritik ilişkileri ve değişimleri elle izlemek zor.",
        en: "Data across finance, accounting, manufacturing and other systems is both disconnected and deep over time. Critical relationships and changes are hard to monitor manually.",
      },
      audience: {
        tr: "Şirkette ne olduğunu, neden olduğunu ve ne yapılabileceğini güvenilir verilerle daha erken görmek isteyen yöneticiler",
        en: "Leaders who need to see what is happening, why it is happening and what can be done earlier, with evidence they can verify",
      },
    },
    title: { tr: "Şirketinizin denetim, optimizasyon ve karar merkezi.", en: "Your company's monitoring, optimization and decision center." },
    problem: {
      tr: [
        "Şirket verisi yalnız dağınık değildir. Finans, muhasebe, üretim, satış ve diğer sistemlerde aynı şirketin farklı parçaları yaşar; aralarındaki ilişkileri kurmak zordur. Aynı zamanda yıllar boyunca biriken geçmiş veri, bugünkü değişimi anlamak ve geleceğe yönelik projeksiyon yapmak için ayrı bir derinlik oluşturur.",
        "Dima bu yatay ilişkileri ve zamansal örüntüleri aynı şirket bağlamında birlikte okumayı hedefler. Kullanıcının bir dashboard açmasını veya soru sormasını beklemeden önemli sapma, risk ve fırsatları izler; bir bulgu gördüğünde nedenini araştırır, kanıtlarını gösterir ve ne yapılabileceğini karara hazırlar.",
      ],
      en: [
        "Company data is not only scattered. Finance, accounting, manufacturing, sales and other systems hold different parts of the same business, and the relationships between them are difficult to reconstruct. Years of historical data add another dimension needed to understand change and make projections.",
        "Dima is designed to read those cross-system relationships and time-based patterns in one company context. It does not wait for someone to open a dashboard or ask a question: it monitors for important deviations, risks and opportunities, investigates why a finding matters, shows the evidence, and prepares the next decision.",
      ],
    },
    capabilities: {
      tr: [
        { title: "Bağlar ve anlar", body: "Veritabanı, ERP, Excel/CSV ve diğer kaynakları yalnız aynı yerde toplamaz; müşteri, fatura, sipariş, makine, ürün ve metrik gibi entity'leri ve aralarındaki ilişkileri ortak bir Company Brain bağlamında anlamlandırır." },
        { title: "İzler ve denetler", body: "Normal davranışı, geçmiş örüntüleri, planları ve ilişkileri sürekli takip eder. Kullanıcının sormasını beklemeden önemli sapma, risk ve fırsatları canlı sinyaller olarak öne çıkarır." },
        { title: "Araştırır ve kanıtlar", body: "Bir sinyali yalnız alarm olarak bırakmaz. Etkilenen entity ve ilişkileri inceler, kök neden adaylarını araştırır ve bulgunun hangi veri ve hesaplara dayandığını görünür kılar." },
        { title: "Karara ve aksiyona taşır", body: "Bulguyu karar seçeneklerine, senaryolara ve önerilere dönüştürür. Chat bu noktada seçili bağlamla konuşma arayüzüdür; karar daha sonra görev, e-posta, ERP taslağı veya başka bir aksiyona taşınabilir." },
      ],
      en: [
        { title: "Connects and understands", body: "It does more than collect databases, ERP, Excel/CSV and other sources in one place. It models entities such as customers, invoices, orders, machines, products and metrics, and the relationships between them, inside one Company Brain context." },
        { title: "Monitors and checks", body: "It continuously watches normal behavior, historical patterns, plans and relationships. Important deviations, risks and opportunities can surface as live signals without waiting for a prompt." },
        { title: "Investigates and evidences", body: "A signal does not stop at an alert. Dima examines the affected entities and relationships, investigates candidate root causes, and makes the underlying data and calculations visible." },
        { title: "Moves work to decision and action", body: "Findings become decision options, scenarios and recommendations. Chat is the conversational interface to the selected context; the result can then become a task, email, ERP draft or another governed action." },
      ],
    },
    note: {
      tr: "Dima'nın ana deneyimi yaşayan Company Brain'dir; Dima Today, Radar, Investigation, Evidence ve karar yüzeyleri bu beynin farklı derinlikleridir. Chat ürünün merkezi değil, zaten çalışan şirket zekâsıyla konuşmanın yollarından biridir.",
      en: "Dima's primary experience is a living Company Brain. Dima Today, Radar, Investigation, Evidence and decision surfaces are different depths of that same brain. Chat is not the product center; it is one way to talk to intelligence that is already running.",
    },
    audience: {
      tr: ["CEO, CFO, finans/muhasebe ve operasyon/üretim ekipleri: dağınık veriler arasındaki ilişkileri daha erken görmek, kritik değişimlerin nedenini kanıtlarıyla anlamak ve karar döngüsünü hızlandırmak isteyen şirketler."],
      en: ["CEOs, CFOs, finance/accounting and operations/manufacturing teams that need to connect fragmented data, understand important changes with evidence, and shorten the decision loop."],
    },
    cta: { tr: "Dima'yı keşfedin", en: "Explore Dima" },
  },
  {
    id: "carbon",
    name: "UpcyCarbon",
    // The dashboard, from the product repo's own marketing image.
    screens: { desktop: "/products/carbon-desktop.webp", mobile: "/products/carbon-mobile.webp" },
    slug: "upcycarbon",
    brandKey: "upcycarbon",
    hasOwnSite: true,
    domain: "https://upcycarbon.com",
    depth: "handoff",
    category: { tr: "Kurumsal Karbon ve Sürdürülebilirlik Platformu", en: "Enterprise Carbon & Sustainability Platform" },
    oneLiner: {
      tr: "Karbon hesabı bir sayı değil, bir kanıt zinciri.",
      en: "A carbon figure is not a number; it is a chain of evidence.",
    },
    matrix: {
      problem: {
        tr: "Karbon hesabı bir kez üretiliyor, ertesi yıl tekrar üretilemiyor.",
        en: "The carbon figure was produced once and cannot be reproduced a year later.",
      },
      audience: {
        tr: "Avrupalı alıcısı gömülü emisyon verisi isteyen ihracatçılar",
        en: "Exporters whose EU customers ask for embedded-emissions data",
      },
    },
    title: {
      tr: "Karbon hesabı bir sayı değil, bir kanıt zinciridir.",
      en: "A carbon figure is not a number. It is a chain of evidence.",
    },
    problem: {
      tr: [
        "Avrupalı alıcı gömülü emisyon verisi istiyor ve bir tarih veriyor: Avrupa Komisyonu'na göre CBAM kesin dönemi 1 Ocak 2026'da başladı. Dağınık Excel hesapları bir kez hazırlanıyor.",
        "Ertesi yıl aynı hesap yeniden üretilemiyor; hangi faktör sürümünün kullanıldığı, verinin kimden geldiği ve kimin değiştirdiği hiçbir yerde kayıtlı değil.",
      ],
      en: [
        "An EU customer asks for embedded-emissions data, with a date attached: the CBAM definitive period began on 1 January 2026, according to the European Commission. The spreadsheet is produced once.",
        "A year later nobody can reproduce it. Which factor version was used, whose data went in and who changed it were never recorded.",
      ],
    },
    capabilities: {
      tr: [
        { title: "Her sayı kanıtına bağlı", body: "Her emisyon bir faaliyet kaydına, bir emisyon faktörüne ve bir GWP setine bağlıdır. Düzenlemeler de dışa aktarmalar da kimin, ne zaman yaptığıyla kayda geçer." },
        { title: "CBAM için kurulu", body: "Ürün bazlı gömülü emisyon, ithalat kayıtları, doğrulama akışı ve tedarikçi portalı aynı sistemde. Kapsam 3 verisi e-posta ekinde dolaşmaz." },
        { title: "Karbonda bitmez", body: "Su, atık ve döngüsellik aynı tesis modelinde; ürün ayak izi, önemlilik değerlendirmesi ve senaryolar dahil. Bir sonraki talep yeni bir sistem demek değildir." },
      ],
      en: [
        { title: "Every figure tied to its evidence", body: "Each emission links to an activity record, an emission factor and a GWP set. Edits and exports are both recorded, with who made them and when." },
        { title: "Built for CBAM", body: "Product-level embedded emissions, import records, a verification workflow and a supplier portal in one system, so Scope 3 data stops travelling as email attachments." },
        { title: "It does not stop at carbon", body: "Water, waste and circularity on the same facility model, with product footprints, materiality assessment and scenarios. The next request is not a new platform." },
      ],
    },
    note: {
      tr: "Türkiye Emisyon Ticaret Sistemi (7552 sayılı İklim Kanunu) için hazırlanıyoruz. Bugün bir özellik olarak sunulmuyor.",
      en: "We are preparing for Turkey's emissions trading system under Climate Law 7552. It is not offered as a feature today.",
    },
    audience: {
      tr: ["Alıcısı Avrupa'da olan ihracatçı üreticiler, çevre mühendisleri ve sürdürülebilirlik sorumluları; denetime yeniden kurulmuş bir tabloyla değil, kayıtla girmek isteyen ekipler."],
      en: ["Exporting manufacturers with European customers, environmental engineers and sustainability leads who want to walk into verification with the verified record rather than a rebuilt spreadsheet."],
    },
    cta: { tr: "UpcyCarbon'u inceleyin", en: "Explore UpcyCarbon" },
  },
  {
    id: "erp",
    name: "UpcyMan",
    // The markets screen, cropped from the product's own screenshots to the app viewport.
    screens: { desktop: "/products/erp-desktop.webp", mobile: "/products/erp-mobile.webp" },
    slug: "upcyman",
    brandKey: "upcyman",
    hasOwnSite: true,
    domain: "https://upcyman.com",
    depth: "handoff",
    category: { tr: "Modüler Üretim ERP", en: "Modular Manufacturing ERP" },
    oneLiner: {
      tr: "Saha ile kasa tek kayıtta; her hareket iz bırakır.",
      en: "Operations and accounts in one record, where every movement leaves a trail.",
    },
    matrix: {
      problem: {
        tr: "Çek defteri, cari bakiye ve sahadaki stok birbirini tutmuyor.",
        en: "The cheque book, customer balances and stock on the floor disagree.",
      },
      audience: {
        tr: "Tabloları artık birbirini tutmayan tesisler",
        en: "Facilities whose spreadsheets have stopped reconciling",
      },
    },
    title: {
      tr: "Saha ile kasa aynı kayıtta. Her hareket iz bırakır.",
      en: "Operations and accounts in one record, where every movement leaves a trail.",
    },
    problem: {
      tr: [
        "Ay sonunda üç kayıt birbirini tutmuyor: çek defteri, cari bakiye ve sahadaki stok. Excel tabloları, defterler ve mesajlaşma gruplarıyla yürütülen iş mutabakatta tıkanıyor; hangi rakamın doğru olduğu belirlenemiyor.",
      ],
      en: [
        "At month-end three records disagree: the cheque book, the customer balances and the stock on the floor. Work that runs on spreadsheets, a notebook and a messaging group stalls at reconciliation, and nobody can say which figure is right.",
      ],
    },
    capabilities: {
      tr: [
        { title: "Saha ve kasa tek yerde", body: "Stok, makine, personel ve atık kabulü; cari hesap, kasa/banka ve çek ile aynı sistemde durur. İki sistem arasında mutabakat yapılmaz, çünkü ikinci sistem yoktur." },
        { title: "Her hareket iz bırakır", body: "Her finansal işlem tek parça tamamlanır, her stok hareketi nedenini saklar, her belgenin takip edilebilir bir numarası olur. Tartışmayı kayıt bitirir." },
        { title: "Tesisler ayrı kalır", body: "Birden fazla tesis tek kurulumda çalışır, verileri birbirine karışmaz. Grup yönetimi tek yerden bakar; tesis müdürü yalnız kendi tesisini görür." },
      ],
      en: [
        { title: "Operations and accounting together", body: "Stock, machines, personnel and waste intake sit in the same system as receivables, cash, bank and cheques. There is no second system to reconcile against." },
        { title: "Every movement leaves a trail", body: "Each financial operation completes as a whole, each stock movement keeps its reason, and each document carries a traceable number. The record settles the argument." },
        { title: "Facilities stay separate", body: "Several facilities run on one installation without their data mixing. Group management sees everything; a facility manager sees only their own site." },
      ],
    },
    audience: {
      tr: ["Muhasebesi ile sahası ayrı yerlerde tutulan, tabloları ay sonunda birbirini tutmayan üreticiler. Tek tesis için saha ve kasa bir arada; birden fazla tesis için veriler ayrı, yönetim tek yerde."],
      en: ["Manufacturers whose books and floor are kept in different places, and whose spreadsheets stop agreeing at month-end. For a single site, operations and accounts in one record; for several, separate data under one management view."],
    },
    cta: { tr: "UpcyMan'i inceleyin", en: "Explore UpcyMan" },
  },
  {
    id: "trade-ops",
    name: "UpcyOps",
    screens: { desktop: "/products/upcyops-desktop.webp", mobile: "/products/upcyops-mobile.webp" },
    slug: "upcyops",
    brandKey: "upcyops",
    hasOwnSite: false,
    depth: "landing",
    category: {
      tr: "İthalat ve ihracat iş akışları için B2B operasyon platformu",
      en: "A B2B operations platform for import and export workflows",
    },
    oneLiner: {
      tr: "Talepten ödemeye emtia ticareti tek kayıtta; belge, gemi ve ödeme aynı ekranda.",
      en: "A commodity trade from request to payment in one record: documents, vessel and money on the same screen.",
    },
    matrix: {
      problem: {
        tr: "Bir emtia ticareti e-posta, Excel ve mesaj grubunda yürüyor; gemi yoldayken hangi belgenin eksik olduğunu kimse söyleyemiyor.",
        en: "A commodity trade runs on email, spreadsheets and chat, and nobody can say which document is missing while the vessel is at sea.",
      },
      audience: {
        tr: "Emtia alıp satan, gemiyle taşıtan, akreditifle çalışan ticaret şirketleri",
        en: "Trading houses moving commodities by vessel and working with letters of credit",
      },
    },
    title: {
      tr: "Talepten ödemeye ticaret tek kayıtta. Her belge, her gemi, her ödeme iz bırakır.",
      en: "Trade from request to payment in one record, where every document, vessel and payment leaves a trail.",
    },
    problem: {
      tr: [
        "Bir ticaret talebi sözle başlıyor: fiyat, miktar ve teslim limanı telefonda konuşuluyor. Onay e-postayla isteniyor, kontrat dosyada duruyor, konşimento kuryede, ödeme dekontu başka bir mesaj grubunda.",
        "Excel ve mesaj grubuyla yürüyen iş ilk eksik belgede tıkanıyor: hangi belgenin hangi sürümünün geçerli olduğu, kimin onayladığı ve ödemenin hangi kilometre taşına bağlı olduğu hiçbir yerde kayıtlı değil.",
      ],
      en: [
        "A trade request starts informally: price, quantity and delivery port agreed over the phone. Approval lives in email, the contract in a folder, the bill of lading with the courier, the payment proof in another chat.",
        "Work that runs on spreadsheets and chats stalls at the first missing document: which version of which paper counts, who approved it, and which milestone the payment hangs on were never recorded.",
      ],
    },
    capabilities: {
      tr: [
        { title: "Talep ve onay kayıtta", body: "Ticaret talebi, revizyonları ve çok adımlı onayıyla aynı akışta yürür. Fiyat, miktar, liman ya da teslim şekli değiştiğinde fark kaydı açılır; her onay kimin, ne zaman verdiğiyle saklanır." },
        { title: "Yürüyen iş göz önünde", body: "Gemi, sefer, yükleme ve boşaltma limanları ile tahmini varış aynı ekranda izlenir; eksik belge ya da geciken ödeme işi beklemeye aldığında herkes aynı sebebi görür." },
        { title: "Belge ve para ticarete bağlı", body: "Konşimentodan menşe şahadetnamesine 18 belge türü, yüklemeden onaya uzanan bir doğrulama akışıyla izlenir; onaylanan belge Drive'a yedeklenir. Alacak ve borçlar ticaretin kilometre taşlarına bağlı, çok para birimli defterde tutulur." },
      ],
      en: [
        { title: "Request and approval on the record", body: "Trade requests, their amendments and multi-step approval run in one flow. When price, quantity, port or Incoterms change, an amendment records the diff; every approval keeps who gave it and when." },
        { title: "The execution in plain sight", body: "Vessel, voyage, load and discharge ports with ETA are tracked on the same screen; when a missing document or late payment holds the trade, everyone sees the same reason." },
        { title: "Documents and money tied to the trade", body: "Eighteen document types, from bill of lading to certificate of origin, tracked from upload to approval; approved documents back up to Drive. Receivables and payables hang off the trade's milestones in a multi-currency ledger." },
      ],
    },
    audience: {
      tr: ["Emtia alıp satan ticaret şirketleri: talebi telefonda alan, belgeyi kuryeyle kovalayan, ödemeyi dekont fotoğrafıyla takip eden ekipler. Gemiyle taşıma yapan, akreditifle çalışan, denetime kayıtla girmek isteyen herkes."],
      en: ["Commodity trading houses whose requests arrive by phone, whose documents travel by courier, and whose payments are chased through chat screenshots. Built for teams shipping by vessel and working with letters of credit that want to walk into an audit with the record."],
    },
    cta: { tr: "Demo isteyin", en: "Book a demo" },
    landing: {
      workflow: {
        title: { tr: "Bir işlem baştan sona", en: "One shipment, start to finish" },
        intro: {
          tr: "Onaylanan talep ticarete dönüşür; belge, sevkiyat ve ödeme aynı kaydın kilometre taşlarında yürür.",
          en: "An approved request becomes a trade; documents, shipment and payment move along the same record's milestones.",
        },
        steps: {
          tr: [
            { title: "Talep ve onay", body: "Tüccar talebi açar: ürün, miktar, fiyat, teslim limanı ve teslim şekli. Operatör onaya sunar, yönetici onaylar ya da iade eder. Şart değişirse fark kaydı açılır, asıl talep bozulmaz." },
            { title: "Sözleşme ve kurulum", body: "Onaylanan talep ticarete dönüşür: ticaret numarası, alıcı-satıcı-lojistikçi taraflar ve gerekli belge listesi otomatik oluşur. Gemi, liman ve vade bilgileri işlenir." },
            { title: "Yürütme: belge ve sevkiyat", body: "18 belge türü yüklemeden onaya izlenir; gemi adı, IMO numarası ve tahmini varış aynı ekranda. Eksik belge ya da geciken ödeme işi beklemeye alır, sebep herkesçe görünür." },
            { title: "Finans ve kapanış", body: "Alacak ve borçlar kilometre taşlarına bağlı oluşur; çok para birimli defter merkez bankası kurlarıyla raporlama para birimine çevrilir. Vadesi geçenler panoda işaretlenir. Teslim, belge ve ödeme tamamlanınca ticaret kapanır, son denetimden sonra arşivlenir." },
          ],
          en: [
            { title: "Request and approval", body: "The trader opens the request: product, tonnage, price, delivery port and Incoterms. Operations submits it, the manager approves or returns it. If terms change, an amendment records the diff and the original stays intact." },
            { title: "Contract and setup", body: "The approved request becomes a trade: trade number, buyer-seller-logistics parties and the required document checklist generate automatically. Vessel, ports and payment terms go in." },
            { title: "Execution: documents and shipment", body: "Eighteen document types tracked from upload to approval; vessel name, IMO number and ETA on the same screen. A missing document or late payment holds the trade, with the reason visible to everyone." },
            { title: "Finance and close", body: "Receivables and payables generate against milestones; the multi-currency ledger converts to the reporting currency at central-bank rates. Overdue items flag on the dashboard. When goods, documents and payments are all complete, the trade closes and archives after final audit." },
          ],
        },
      },
      details: {
        title: { tr: "Ayrıntılar", en: "The details" },
        items: {
          tr: [
            { title: "18 belge türü, uçtan uca doğrulama", body: "Konşimento, menşe şahadetnamesi ve akreditif kopyası dahil 18 tür; eksikten onaya 8 durum. Dosyalar tür, virüs ve sağlama denetiminden geçer; onaylanan belge hesabın Google Drive klasörüne yedeklenir, MinIO S3 ya da güvenli diskte saklanır." },
            { title: "Gemi ve yük aynı ekranda", body: "Gemi adı, IMO numarası, yükleme-boşaltma limanları, tahmini varış ve canlı konum; deniz, hava, kara ve demiryolunda." },
            { title: "Çok para birimli defter", body: "Dolar, avro, lira, sterlin ve frank merkez bankası kurlarıyla raporlama para birimine çevrilir. Alacak-borç beklemededen ödenmeye izlenir, vadesi geçenler panoda işaretlenir; banka hesapları IBAN ve SWIFT kodlarıyla tutulur." },
            { title: "Kimin ne yapacağı belli", body: "Tüccar talebi açar, operatör belgeyi yürütür, yönetici onaylar, finans para tarafını tutar; denetçi salt-okunur izler. Holding lisansı altında her masa yalnız kendi verisini görür; her onay kimin, ne zaman verdiğiyle kayda geçer." },
          ],
          en: [
            { title: "Eighteen document types, validated end to end", body: "Bill of lading, certificate of origin, letter-of-credit copy and fifteen more; eight states from missing to approved. Files pass mime, virus and checksum checks; approved documents replicate to the account's Google Drive folder, stored on MinIO S3 or secure disk." },
            { title: "Vessel and cargo on the same screen", body: "Vessel name, IMO number, load and discharge ports, ETA and live coordinates: by sea, air, road and rail." },
            { title: "A multi-currency ledger", body: "Dollars, euros, lira, sterling and francs converted to the reporting currency at central-bank rates. Receivables and payables tracked from pending to paid, overdue items flagged on the dashboard, bank accounts held with IBAN and SWIFT codes." },
            { title: "Everyone's remit is defined", body: "Traders open requests, operators run documents, managers approve, finance keeps the money side; auditors watch read-only. Each desk under the holding licence sees only its own data, and every approval records who gave it and when." },
          ],
        },
      },
      questions: {
        title: { tr: "Sık sorulanlar", en: "Common questions" },
        items: {
          tr: [
            { q: "Mevcut sistemlerimizle bütünleşiyor mu?", a: "Onaylanan belgeler Google Drive klasörünüze otomatik yedeklenir; kurlar merkez bankası verilerinden çekilir. Bunun ötesi, örneğin ERP veya muhasebe entegrasyonları, kapsamda netleşir: hangi kaydın nereden geleceğini söz vermeden önce yazıya döküyoruz." },
            { q: "Verilerimiz kimlere görünür?", a: "Holding lisansı altında her masa yalnız kendi verisini görür: tüccar kendi ticaretini, yönetici masasını, denetçi her şeyi salt-okunur izler. Giriş e-posta ve parolayla; her onay ve ret kimin, ne zaman verdiğiyle kayda geçer." },
            { q: "Devreye alma nasıl ilerler?", a: "Tek bir masayla başlarız: talepler, belge listesi ve para birimleri kurulur, ekibiniz gerçek bir ticareti üstünde yürütür. Kapsam ve süre, keşif adımının sonunda yazıya dökülür." },
          ],
          en: [
            { q: "Does it integrate with our current systems?", a: "Approved documents replicate automatically to your Google Drive folder, and FX rates come from central-bank feeds. Anything beyond that, such as ERP or accounting integration, is settled in scoping: we write down which records come from where before promising anything." },
            { q: "Who can see our data?", a: "Under the holding licence each desk sees only its own data: traders their own trades, managers their desk, auditors everything read-only. Sign-in is email and password, and every approval and rejection records who gave it and when." },
            { q: "How does rollout work?", a: "We start with one desk: requests, the document checklist and currencies go in, and your team runs a real trade on it. Scope and timeline are written down at the end of discovery." },
          ],
        },
      },
    },
  },
];
