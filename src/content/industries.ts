import { copyNeeded, needed, type L, type Point } from "./types";

/**
 * The three verticals. Sustainability is a capability, not a vertical — it lives in what
 * each sector gets, never beside textile and plastics.
 *
 * Every pressure is dated and sourced, the way every figure in this system carries its
 * source. Regulation was checked against the primary texts in September 2026; re-check
 * before each release. What UpcyTech provides traces to the design system's public message
 * houses; anything they do not evidence is a visible [COPY NEEDED].
 */

export interface Pressure {
  /** ISO date an obligation started or starts. `null` for a standing buyer requirement. */
  date: string | null;
  text: L;
  /** Written in each locale's own words: the source line is set in uppercase mono. */
  source: L;
}

export interface Industry {
  id: string;
  /** In-page anchor, per locale. */
  anchor: L;
  name: L;
  summary: L;
  pressures: Pressure[];
  provides: L<Point[]>;
  /** A capability stated as roadmap, never as delivery. */
  note?: L;
  /** Product ids from products.ts — never names, so a rename cannot break this list. */
  products: string[];
  /** A visible note under the product list, for a mapping nobody has confirmed yet. */
  productsNote?: L;
  enquiry: { label: L; sector: string };
  /**
   * A photograph for the home page's sector gallery (public/industries): a freely licensed
   * stock photo of the sector, credited — illustration, never a claim about a client or plant.
   */
  image?: { src: string; alt: L; credit: string };
}

export const industries: readonly Industry[] = [
  {
    id: "textile",
    image: {
      src: "/industries/textile.webp",
      alt: { tr: "Bir dokuma tesisinde çalışan dokuma tezgâhları", en: "Weaving looms at work on a textile floor" },
      credit: "Bergstrand Consultancy / Unsplash",
    },
    anchor: { tr: "tekstil", en: "textile" },
    name: { tr: "Tekstil", en: "Textile" },
    summary: {
      tr: "Tekstil ihracatçısı iki yönden baskı altında: alıcı markanın tedarikçi denetimi ve markanın kendi pazarındaki AB düzenlemesi. İkisi de aynı şeyi istiyor: suyun, kimyasalın ve atığın kayıtlı olmasını.",
      en: "Textile exporters are pressed from two sides: the buying brand's supplier audit, and EU regulation in the brand's own market. Both want the same thing, water, chemicals and waste on the record.",
    },
    pressures: [
      {
        date: null,
        text: {
          tr: "Global markalar tedarikçiden çevresel kanıt istiyor. Inditex'in ıslak işlem tesisleri için Green to Wear standardı kimyasal yönetimini, su haritalamasını, su tüketimini ve atık su izlenebilirliğini denetliyor; ZDHC ve Higg çerçeveleriyle hizalı.",
          en: "Global brands want environmental evidence from their suppliers. Inditex's Green to Wear standard for wet-processing facilities audits chemical management, water mapping, water consumption and wastewater traceability, and aligns with the ZDHC and Higg frameworks.",
        },
        source: { tr: "Inditex, Green to Wear standart belgeleri", en: "Inditex, Green to Wear standard documents" },
      },
      {
        date: "2025-10-16",
        text: {
          tr: "AB üye devletleri tekstil için zorunlu genişletilmiş üretici sorumluluğu sistemleri kuruyor. Üretici, piyasaya sürdüğü ürünün atık aşamasından sorumlu tutuluyor.",
          en: "EU member states are setting up mandatory extended producer responsibility schemes for textiles, making producers answerable for the waste stage of what they sell.",
        },
        source: { tr: "2025/1892 sayılı AB Direktifi, Atık Çerçeve Direktifi değişikliği", en: "Directive (EU) 2025/1892, amending the Waste Framework Directive" },
      },
      {
        date: "2026-07-19",
        text: {
          tr: "AB'de satılmayan giyim, aksesuar ve ayakkabının imhası büyük işletmeler için yasaklandı; orta ölçekli işletmeler için yasak 2030'da başlıyor. İzin verilen her imha gerekçelendirilip belgelenmek zorunda.",
          en: "Destroying unsold apparel, clothing accessories and footwear is banned for large companies in the EU, and for medium-sized ones from 2030. Any destruction still allowed must be justified and documented.",
        },
        source: { tr: "2024/1781 sayılı AB Tüzüğü (ESPR), Madde 25", en: "Regulation (EU) 2024/1781 (ESPR), Article 25" },
      },
    ],
    provides: {
      tr: [
        { title: "Su ve atık, kayıt olarak", body: "Su kaynakları, su tüketimi ve atık akışları tesis modelinize bağlı kayıt olarak tutulur. Denetimde yeniden kurulmuş bir tablo değil, kayıt açılır." },
        { title: "Ürün ayak izi", body: "Ürün grubu bazında karbon ayak izi, EPD'ye hazır bir yapıda ve openLCA ile hizalı olarak hesaplanır." },
        { title: "Marka denetimleri", body: "Green to Wear, Higg FEM ve ZDHC kapsamlarından hangilerinin raporlandığı, denetim öncesinde birlikte netleştirilir; doğrulanmamış bir çerçeve rapora girmez." },
      ],
      en: [
        { title: "Water and waste, on the record", body: "Water sources, consumption and waste streams are held as records on your facility model. An audit opens the record, not a rebuilt spreadsheet." },
        { title: "Product footprints", body: "Carbon footprints per product family, calculated in an EPD-ready structure aligned with openLCA." },
        { title: "Brand audits", body: "Which of the Green to Wear, Higg FEM and ZDHC scopes we report against is settled with you before the audit; an unconfirmed framework never enters the report." },
      ],
    },
    products: ["carbon", "analytics", "erp"],
    enquiry: { label: { tr: "Tekstil görüşmesi planlayın", en: "Book a textile consultation" }, sector: "textile" },
  },
  {
    id: "plastics",
    image: {
      src: "/industries/plastics.webp",
      alt: { tr: "Enjeksiyon kalıplama ile üretilmiş iki siyah plastik parça", en: "Two black injection-moulded plastic parts" },
      credit: "Mastars / Unsplash",
    },
    anchor: { tr: "plastik", en: "plastics" },
    name: { tr: "Plastik", en: "Plastics" },
    summary: {
      tr: "Plastikte soru, ne kadar geri dönüştürülmüş malzeme kullandığınız ve bunu kanıtlayıp kanıtlayamadığınız. AB ambalaj kuralları bu sayıyı bir eşiğe bağlıyor; Türkiye'de Sıfır Atık Yönetmeliği atığın kaynağında ayrı toplanmasını istiyor.",
      en: "In plastics the question is how much recycled material you use, and whether you can prove it. EU packaging rules tie that number to a threshold; in Türkiye, the Zero Waste Regulation requires waste to be separated at source.",
    },
    pressures: [
      {
        date: "2019-07-12",
        text: {
          tr: "Sıfır Atık Yönetmeliği, atığın kaynağında ayrı toplanması ve yönetimi için yükümlülükler getirdi.",
          en: "Türkiye's Zero Waste Regulation introduced obligations to separate waste at source and manage it.",
        },
        source: { tr: "Resmî Gazete, Sıfır Atık Yönetmeliği", en: "Official Gazette of Türkiye, Zero Waste Regulation" },
      },
      {
        date: "2025-01-01",
        text: {
          tr: "AB, PET içecek şişelerinde ortalama en az 25 % geri dönüştürülmüş plastik şartı koydu; 2030'dan itibaren tüm içecek şişelerinde 30 %.",
          en: "The EU requires PET beverage bottles to contain at least 25% recycled plastic on average, rising to 30% for all beverage bottles from 2030.",
        },
        source: { tr: "2019/904 sayılı AB Direktifi (tek kullanımlık plastikler), Madde 6", en: "Directive (EU) 2019/904 (single-use plastics), Article 6" },
      },
      {
        date: "2026-08-12",
        text: {
          tr: "AB Ambalaj ve Ambalaj Atıkları Tüzüğü uygulanmaya başladı. 2030'dan itibaren her ambalajın geri dönüştürülebilir olması, plastik ambalajın da asgari geri dönüştürülmüş içeriği karşılaması gerekiyor.",
          en: "The EU Packaging and Packaging Waste Regulation applies. From 2030 all packaging must be recyclable, and plastic packaging must meet minimum recycled-content levels.",
        },
        source: { tr: "2025/40 sayılı AB Tüzüğü (PPWR)", en: "Regulation (EU) 2025/40 (PPWR)" },
      },
    ],
    provides: {
      tr: [
        { title: "Atık kabulünden stoğa", body: "Geri dönüşüm tesisinde atık kabulü, stok ve cari hesap aynı kayıtta tutulur; her stok hareketi geçmişini saklar." },
        { title: "Atık akışları ve döngüsellik", body: "Atık akışları, döngüsellik metrikleri ve atık eşleştirme aynı tesis modelinde hesaplanır." },
        { title: "Sıfır Atık ve geri dönüştürülmüş içerik", body: "Sıfır Atık belgelendirmesi için belge ve raporlama yapısı; plastik azaltımı ve geri dönüştürülmüş içerik için uygulama desteği." },
      ],
      en: [
        { title: "From intake to stock", body: "In a recycling facility, waste intake, stock and customer accounts share one record, and every stock movement keeps its history." },
        { title: "Waste streams and circularity", body: "Waste streams, circularity metrics and waste matching are calculated on the same facility model." },
        { title: "Zero Waste and recycled content", body: "The documentation and reporting structure for Zero Waste certification, and implementation support for plastics reduction and recycled content." },
      ],
    },
    products: ["erp", "carbon", "analytics"],
    enquiry: { label: { tr: "Plastik görüşmesi planlayın", en: "Book a plastics consultation" }, sector: "plastics" },
  },
  {
    id: "general",
    image: {
      src: "/industries/general.webp",
      alt: { tr: "Bir üretim hattında çalışan turuncu robot kollar", en: "Orange robot arms at work on a production line" },
      credit: "Unsplash (photo 8gr6bObQLOI)",
    },
    anchor: { tr: "genel-imalat", en: "general-manufacturing" },
    name: { tr: "Genel imalat", en: "General manufacturing" },
    summary: {
      tr: "Metal ürünlerden otomotiv yan sanayine, mobilyadan ambalaja kadar AB'ye satan imalatçı için talep aynı biçimde geliyor: alıcı bir hesap istiyor ve bir tarih veriyor.",
      en: "For manufacturers selling into the EU, from metal products and automotive parts to furniture and packaging, the request arrives the same way: a customer wants a calculation, with a date attached.",
    },
    pressures: [
      {
        date: "2025-07-09",
        text: {
          tr: "7552 sayılı İklim Kanunu yayımlandı ve Türkiye emisyon ticaret sisteminin yasal zeminini kurdu.",
          en: "Climate Law No. 7552 was published, laying the legal basis for a Turkish emissions trading system.",
        },
        source: { tr: "Resmî Gazete, 7552 sayılı İklim Kanunu", en: "Official Gazette of Türkiye, Climate Law No. 7552" },
      },
      {
        date: "2026-01-01",
        text: {
          tr: "CBAM kesin dönemi başladı. Demir-çelik, alüminyum, çimento, gübre, elektrik ve hidrojende AB'ye yılda 50 tonun üzerinde ithalat yapanlar yetkili beyan sahibi olmak ve sertifika teslim etmek zorunda.",
          en: "The CBAM definitive period began. Importers bringing more than 50 tonnes a year of iron and steel, aluminium, cement, fertilisers, electricity or hydrogen into the EU need authorised-declarant status and must surrender certificates.",
        },
        source: { tr: "Avrupa Komisyonu, Sınırda Karbon Düzenleme Mekanizması", en: "European Commission, Carbon Border Adjustment Mechanism" },
      },
    ],
    provides: {
      tr: [
        { title: "CBAM hazırlığı", body: "Bir ürün grubu için gömülü emisyon, tedarikçi verisinin toplanması ve alıcının istediği biçimde çıktı. Çalışma bittiğinde tesis UpcyCarbon'da modellenmiş olarak kalır." },
        { title: "Kurumsal karbon ayak izi", body: "Kapsam 1, 2 ve 3; bir raporlama yılı ve bir tüzel kişilik için, ertesi yıl tekrar üretilebilen bir hesap olarak." },
        { title: "Sahadan rapora veri", body: "Ölçüm noktası tasarımı, birim dönüşümleri ve ERP entegrasyonu. Tesis kendi sayısını üretir hale gelir." },
      ],
      en: [
        { title: "CBAM readiness", body: "Embedded emissions for one product group, supplier data collection, and output in the form your customer asks for. When the work ends, the facility stays modelled in UpcyCarbon." },
        { title: "Corporate carbon footprint", body: "Scopes 1, 2 and 3 for one reporting year and one legal entity, as a calculation you can reproduce the following year." },
        { title: "Data from the floor to the report", body: "Measurement design, unit conversion and ERP integration, so the facility produces its own numbers." },
      ],
    },
    note: {
      tr: "Türkiye emisyon ticaret sistemi için hazırlanıyoruz. Bugün bir hizmet olarak sunulmuyor.",
      en: "We are preparing for Türkiye's emissions trading system. It is not offered as a service today.",
    },
    products: ["carbon", "erp", "analytics"],
    enquiry: { label: { tr: "İmalat görüşmesi planlayın", en: "Book a manufacturing consultation" }, sector: "manufacturing" },
  },
];

/** Frameworks, and honestly what we do with each. Absent from this list means not claimed. */
export interface Framework {
  name: L;
  covers: L;
  status: L;
}

export const frameworks: readonly Framework[] = [
  {
    name: { tr: "CBAM", en: "CBAM" },
    covers: { tr: "AB'ye ithal edilen demir-çelik, alüminyum, çimento, gübre, elektrik ve hidrojende gömülü emisyon", en: "Embedded emissions in iron and steel, aluminium, cement, fertilisers, electricity and hydrogen imported into the EU" },
    status: { tr: "Yazılımda: UpcyCarbon ürün ve ithalat akışları, tedarikçi portalı", en: "In the software: UpcyCarbon product and import workflows, supplier portal" },
  },
  {
    name: { tr: "Kurumsal karbon ayak izi (Kapsam 1–3)", en: "Corporate carbon footprint (Scopes 1–3)" },
    covers: { tr: "Bir tüzel kişiliğin doğrudan, enerji kaynaklı ve değer zinciri emisyonları", en: "A legal entity's direct, energy-related and value-chain emissions" },
    status: { tr: "Danışmanlık, UpcyCarbon üzerinde", en: "Consulting, delivered on UpcyCarbon" },
  },
  {
    name: { tr: "Ürün ayak izi (LCA)", en: "Product footprint (LCA)" },
    covers: { tr: "Ürün bazlı karbon ayak izi, openLCA ile hizalı", en: "Product-level carbon footprint, aligned with openLCA" },
    status: { tr: "Hizmet ve yazılım, UpcyCarbon üzerinde", en: "Service and software, delivered on UpcyCarbon" },
  },
  {
    name: { tr: "CSRD / ESRS", en: "CSRD / ESRS" },
    covers: { tr: "Çifte önemlilik ve sürdürülebilirlik raporlaması", en: "Double materiality and sustainability reporting" },
    status: { tr: "Uyum hizmeti", en: "Compliance service" },
  },
  {
    name: { tr: "ESPR ve dijital ürün pasaportu", en: "ESPR and the digital product passport" },
    covers: { tr: "Ürün düzeyinde sürdürülebilirlik bilgisi; satılmayan ürünlerin imha yasağı", en: "Product-level sustainability information; the ban on destroying unsold goods" },
    status: { tr: "Hazırlık hizmeti", en: "Readiness service" },
  },
  {
    name: { tr: "Sıfır Atık Yönetmeliği", en: "Zero Waste Regulation (Türkiye)" },
    covers: { tr: "Atığın kaynağında ayrı toplanması ve yönetimi", en: "Separating waste at source and managing it" },
    status: { tr: "Belgelendirme desteği", en: "Certification support" },
  },
  {
    name: { tr: "Türkiye ETS (7552)", en: "Türkiye ETS (Law 7552)" },
    covers: { tr: "Türkiye emisyon ticaret sistemi", en: "Türkiye's emissions trading system" },
    status: { tr: "Hazırlanıyoruz; bugün sunulmuyor", en: "Preparing; not offered today" },
  },
];
