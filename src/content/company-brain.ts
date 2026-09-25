import type { L } from "./types";

export type BrainLobeId = "finance" | "operations" | "sales" | "procurement" | "quality";
export type BrainStatus = "attention" | "investigating" | "opportunity" | "normal";

export interface BrainLobe {
  id: BrainLobeId;
  label: L;
  shortLabel: L;
  status: BrainStatus;
  statusLabel: L;
  summary: L;
  entities: L<string[]>;
  finding: {
    title: L;
    body: L;
    evidence: L<string[]>;
    next: L;
  };
}

export const companyBrain = {
  eyebrow: { tr: "Company Brain", en: "Company Brain" },
  title: {
    tr: "Dashboard değil, şirketin yaşayan haritası.",
    en: "Not a dashboard. A living map of the company.",
  },
  intro: {
    tr: "Her lob gerçek bir iş alanını; her node müşteri, fatura, makine, sipariş veya başka bir şirket varlığını temsil eder. Dima ilişkileri ve zaman içindeki değişimleri birlikte izler; önemli bir sinyal oluştuğunda ilgili noktayı öne çıkarır ve araştırmayı aynı bağlamda derinleştirir.",
    en: "Each lobe represents a real business domain, and each node represents a company entity such as a customer, invoice, machine or order. Dima watches relationships and change over time together; when an important signal appears, it surfaces the relevant point and deepens the investigation in the same context.",
  },
  sample: {
    tr: "Temsili şirket görünümü · örnek veri",
    en: "Representative company view · sample data",
  },
  heroAria: {
    tr: "Finans, üretim, satış, satın alma ve kalite loblarından oluşan Company Brain önizlemesi",
    en: "Company Brain preview with finance, manufacturing, sales, procurement and quality lobes",
  },
  lensLabel: { tr: "Company Brain görünümü", en: "Company Brain view" },
  lenses: {
    brain: { tr: "Tam Beyin Formu", en: "Full Brain Form" },
    map: { tr: "Company Brain Map", en: "Company Brain Map" },
  },
  coreLabel: { tr: "Şirket", en: "Company" },
  detail: {
    domain: { tr: "Seçili alan", en: "Selected domain" },
    entities: { tr: "Bağlı entity'ler", en: "Connected entities" },
    finding: { tr: "Canlı finding", en: "Live finding" },
    evidence: { tr: "Dima neye baktı?", en: "What did Dima inspect?" },
    next: { tr: "Karara giden sonraki adım", en: "Next step toward a decision" },
  },
  flowLabel: { tr: "Tek UX kanunu", en: "One UX law" },
  flow: {
    tr: ["Şirket", "Lob", "Alt alan", "Entity", "İlişki", "Canlı sinyal", "Finding", "Evidence / Investigation", "Dima ile konuş", "Karar", "Aksiyon", "Outcome / Memory"],
    en: ["Company", "Lobe", "Subdomain", "Entity", "Relationship", "Live signal", "Finding", "Evidence / Investigation", "Talk to Dima", "Decision", "Action", "Outcome / Memory"],
  },
  relations: [
    { from: "sales" as BrainLobeId, to: "operations" as BrainLobeId, label: { tr: "Sipariş → üretim", en: "Order → production" } },
    { from: "operations" as BrainLobeId, to: "procurement" as BrainLobeId, label: { tr: "Malzeme → kapasite", en: "Material → capacity" } },
    { from: "operations" as BrainLobeId, to: "quality" as BrainLobeId, label: { tr: "Üretim → kalite", en: "Production → quality" } },
    { from: "sales" as BrainLobeId, to: "finance" as BrainLobeId, label: { tr: "Satış → tahsilat", en: "Sales → collection" } },
    { from: "procurement" as BrainLobeId, to: "finance" as BrainLobeId, label: { tr: "Satın alma → nakit", en: "Procurement → cash" } },
  ],
  lobes: [
    {
      id: "finance",
      label: { tr: "Muhasebe & Finans", en: "Accounting & Finance" },
      shortLabel: { tr: "Finans", en: "Finance" },
      status: "opportunity",
      statusLabel: { tr: "Fırsat bulundu", en: "Opportunity found" },
      summary: {
        tr: "Nakit, tahsilat, cari, ödeme, fatura, mutabakat, maliyet ve bütçe ilişkilerini aynı finansal bağlamda izler.",
        en: "Monitors cash, collections, receivables, payments, invoices, reconciliation, cost and budget relationships in one financial context.",
      },
      entities: {
        tr: ["Müşteri", "Fatura", "Banka hareketi", "Cari hesap", "Ödeme planı"],
        en: ["Customer", "Invoice", "Bank transaction", "Account", "Payment plan"],
      },
      finding: {
        title: { tr: "Tahsilat davranışındaki değişim nakit planını etkiliyor.", en: "A change in collection behavior is affecting the cash plan." },
        body: {
          tr: "Dima yalnız açık faturaya bakmıyor; müşterinin geçmiş ödeme davranışını, sipariş akışını ve banka tahsilatlarını birlikte okuyarak değişimin hangi ilişkiden geldiğini araştırıyor.",
          en: "Dima is not looking only at open invoices; it reads historical payment behavior, order flow and bank collections together to investigate which relationship is driving the change.",
        },
        evidence: {
          tr: ["Fatura vadeleri ve gerçekleşen ödeme tarihleri", "Son dönem sipariş sıklığı", "Banka tahsilat eşleşmeleri"],
          en: ["Invoice due dates and actual payment dates", "Recent order frequency", "Matched bank collections"],
        },
        next: { tr: "Tahsilat senaryolarını nakit etkisiyle karşılaştır.", en: "Compare collection scenarios with their cash impact." },
      },
    },
    {
      id: "operations",
      label: { tr: "Üretim", en: "Manufacturing" },
      shortLabel: { tr: "Üretim", en: "Production" },
      status: "attention",
      statusLabel: { tr: "Dikkat gerekiyor", en: "Needs attention" },
      summary: {
        tr: "Makine, hat, sipariş, ürün, vardiya, bakım, kalite ve malzeme ilişkilerini üretim kaybının finansal etkisiyle birlikte izler.",
        en: "Monitors machines, lines, orders, products, shifts, maintenance, quality and materials together with the financial impact of production loss.",
      },
      entities: {
        tr: ["Makine", "Üretim emri", "Ürün", "Vardiya", "Bakım kaydı"],
        en: ["Machine", "Production order", "Product", "Shift", "Maintenance record"],
      },
      finding: {
        title: { tr: "Bir üretim hattındaki kayıp belirli sipariş ve vardiyalarla birlikte kümeleniyor.", en: "Loss on one production line clusters around specific orders and shifts." },
        body: {
          tr: "Dima hattı tek KPI olarak değerlendirmek yerine makine, sipariş, ürün, vardiya ve bakım kayıtları arasındaki bağlantıları inceliyor; aynı örüntünün geçmişte ne zaman oluştuğunu da karşılaştırıyor.",
          en: "Rather than treating the line as a single KPI, Dima examines links among machine, order, product, shift and maintenance records and compares when the same pattern appeared historically.",
        },
        evidence: {
          tr: ["Hat ve makine çalışma kayıtları", "Sipariş ve ürün karması", "Vardiya ve bakım geçmişi"],
          en: ["Line and machine run records", "Order and product mix", "Shift and maintenance history"],
        },
        next: { tr: "Kök neden adaylarını termin ve maliyet etkisiyle sırala.", en: "Rank root-cause candidates by delivery and cost impact." },
      },
    },
    {
      id: "sales",
      label: { tr: "Satış", en: "Sales" },
      shortLabel: { tr: "Satış", en: "Sales" },
      status: "investigating",
      statusLabel: { tr: "Araştırılıyor", en: "Investigating" },
      summary: {
        tr: "Müşteri, teklif, sipariş, ürün karması, marj ve tahsilat ilişkilerini müşteri davranışının zaman içindeki değişimiyle birlikte okur.",
        en: "Reads customer, quote, order, product-mix, margin and collection relationships together with how customer behavior changes over time.",
      },
      entities: {
        tr: ["Müşteri", "Teklif", "Sipariş", "Ürün", "Marj"],
        en: ["Customer", "Quote", "Order", "Product", "Margin"],
      },
      finding: {
        title: { tr: "Satış hacmi korunurken sipariş yapısı değişiyor.", en: "Sales volume is holding while the order mix is changing." },
        body: {
          tr: "Toplam satış tek başına normal görünüyor; Dima ürün karması, sipariş sıklığı, marj ve ödeme davranışını birlikte inceleyerek alttaki değişimi görünür hale getiriyor.",
          en: "Total sales looks normal in isolation; Dima reads product mix, order frequency, margin and payment behavior together to make the underlying change visible.",
        },
        evidence: {
          tr: ["Sipariş sıklığı ve ürün karması", "Müşteri bazlı marj", "Tahsilat davranışı"],
          en: ["Order frequency and product mix", "Customer-level margin", "Collection behavior"],
        },
        next: { tr: "Müşteri etkisini marj ve nakit senaryolarıyla değerlendir.", en: "Evaluate customer impact through margin and cash scenarios." },
      },
    },
    {
      id: "procurement",
      label: { tr: "Satın Alma", en: "Procurement" },
      shortLabel: { tr: "Satın alma", en: "Procurement" },
      status: "opportunity",
      statusLabel: { tr: "Fırsat bulundu", en: "Opportunity found" },
      summary: {
        tr: "Tedarikçi, malzeme, fiyat, teslim süresi, stok ve üretim ihtiyacını aynı karar bağlamında birleştirir.",
        en: "Combines supplier, material, price, lead time, inventory and production demand in one decision context.",
      },
      entities: {
        tr: ["Tedarikçi", "Malzeme", "Satın alma emri", "Stok", "Termin"],
        en: ["Supplier", "Material", "Purchase order", "Inventory", "Lead time"],
      },
      finding: {
        title: { tr: "Fiyat avantajı görünen bir tedarik seçeneği stok ve nakit etkisiyle birlikte değerlendiriliyor.", en: "A supplier option with a price advantage is being evaluated together with inventory and cash impact." },
        body: {
          tr: "Birim fiyatı tek başına optimize etmek yerine Dima termin, mevcut stok, üretim ihtiyacı, ödeme koşulu ve nakit etkisini aynı ilişkiler ağı içinde karşılaştırıyor.",
          en: "Instead of optimizing unit price alone, Dima compares lead time, current inventory, production demand, payment terms and cash impact in the same relationship network.",
        },
        evidence: {
          tr: ["Tedarikçi fiyat geçmişi", "Stok ve planlanan tüketim", "Ödeme koşulları ve termin"],
          en: ["Supplier price history", "Inventory and planned consumption", "Payment terms and lead time"],
        },
        next: { tr: "Toplam maliyet ve nakit etkisine göre alternatifleri karşılaştır.", en: "Compare alternatives by total cost and cash impact." },
      },
    },
    {
      id: "quality",
      label: { tr: "Kalite", en: "Quality" },
      shortLabel: { tr: "Kalite", en: "Quality" },
      status: "normal",
      statusLabel: { tr: "Normal", en: "Normal" },
      summary: {
        tr: "Kalite sonucu, lot, makine, reçete, proses koşulu, rework ve müşteri geri bildirimini üretim bağlamına bağlar.",
        en: "Connects quality results, lots, machines, recipes, process conditions, rework and customer feedback to manufacturing context.",
      },
      entities: {
        tr: ["Kalite kontrolü", "Lot", "Makine", "Rework", "Müşteri geri bildirimi"],
        en: ["Quality check", "Lot", "Machine", "Rework", "Customer feedback"],
      },
      finding: {
        title: { tr: "Aktif kritik kalite sinyali yok; ilişkiler izlenmeye devam ediyor.", en: "No active critical quality signal; relationships remain under observation." },
        body: {
          tr: "Normal durum da boş ekran değildir. Dima kalite sonuçlarını üretim koşulları ve geçmiş örüntülerle karşılaştırmaya devam eder; anlamlı bir değişim oluştuğunda ilgili entity ve bağlantıyı öne çıkarır.",
          en: "A normal state is not an empty screen. Dima keeps comparing quality results with production conditions and historical patterns; when a meaningful change appears, it surfaces the relevant entity and connection.",
        },
        evidence: {
          tr: ["Son kalite kontrolleri", "Lot ve makine ilişkileri", "Rework ve geri bildirim kayıtları"],
          en: ["Recent quality checks", "Lot and machine relationships", "Rework and feedback records"],
        },
        next: { tr: "İzlemeyi sürdür; eşik aşılırsa investigation başlat.", en: "Keep monitoring; start an investigation if the threshold is crossed." },
      },
    },
  ] satisfies readonly BrainLobe[],
} as const;
