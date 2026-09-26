import type { L } from "./types";

export type ExperienceStepId = "overview" | "signal" | "investigation" | "evidence" | "decision" | "action";

export const productExperience = {
  brand: { tr: "Dima", en: "Dima" },
  eyebrow: { tr: "Ürünü görün", en: "See the product" },
  title: {
    tr: "Bir sinyalden karara kadar aynı şirket bağlamında ilerleyin.",
    en: "Move from a signal to a decision without losing company context.",
  },
  intro: {
    tr: "Aşağıdaki temsili akış örnek şirket verisiyle çalışır. Dima bir sinyali fark ettikten sonra araştırma, kanıt, karar ve eylem adımlarının aynı bağlamda nasıl ilerlediğini gösterir. Gerçek müşteri verisi içermez.",
    en: "The experience below is a representative Dima flow using seeded sample-company data. It is designed to explain real product behavior and contains no customer data.",
  },
  sample: { tr: "Örnek şirket verisi", en: "Sample company data" },
  auto: {
    running: { tr: "Akış otomatik ilerliyor", en: "Flow is progressing automatically" },
    pause: { tr: "Akışı duraklat", en: "Pause flow" },
    resume: { tr: "Akışı sürdür", en: "Resume flow" },
  },
  search: { tr: "Şirketinizde neyi inceleyelim?", en: "What should we inspect in your company?" },
  steps: [
    {
      id: "overview",
      nav: { tr: "Şirket Beyni", en: "Company Brain" },
      title: { tr: "Şirketin canlı resmi", en: "The live picture of the company" },
      body: {
        tr: "Dima veri kaynaklarını ayrı ekranlar olarak değil, müşteri, sipariş, makine, fatura, stok ve tedarikçi gibi varlıkların ilişkileri olarak izler. Günün önemli değişimleri aynı haritanın üzerinde görünür.",
        en: "Dima monitors data sources as relationships among customers, orders, machines, invoices, inventory and suppliers rather than as isolated screens. Important changes appear on the same company map.",
      },
    },
    {
      id: "signal",
      nav: { tr: "Sinyal", en: "Signal" },
      title: { tr: "Önemli değişim öne çıkar", en: "An important change surfaces" },
      body: {
        tr: "Üretim hattı 3'te performans hedefin altına düştü. Dima bunu tek başına bir alarm olarak bırakmaz; etkilenen siparişleri, vardiyaları ve maliyet etkisini aynı bağlama bağlar.",
        en: "Performance on Line 3 fell below target. Dima does not leave it as an isolated alert; affected orders, shifts and cost impact stay in the same context.",
      },
    },
    {
      id: "investigation",
      nav: { tr: "Araştırma", en: "Investigation" },
      title: { tr: "Neden olduğu araştırılır", en: "The cause is investigated" },
      body: {
        tr: "Kayıp kullanılabilirlik, performans ve kalite bileşenlerine ayrılır. Son üç vardiya, ürün karması, bakım geçmişi ve makine durumu karşılaştırılır.",
        en: "The loss is decomposed into availability, performance and quality. The last three shifts, product mix, maintenance history and machine state are compared.",
      },
    },
    {
      id: "evidence",
      nav: { tr: "Kanıt", en: "Evidence" },
      title: { tr: "Rakamın ve nedenin dayanağı görünür", en: "The basis for the number and cause stays visible" },
      body: {
        tr: "Her bulgu veri kaynağı, dönem, ilgili kayıtlar ve kullanılan hesaplarla birlikte gösterilir. Yönetici yalnız sonuca değil, sonucun neden dikkate alınması gerektiğine de bakabilir.",
        en: "Each finding is shown with data source, period, related records and calculations. Management can inspect not just the result, but why it deserves attention.",
      },
    },
    {
      id: "decision",
      nav: { tr: "Karar", en: "Decision" },
      title: { tr: "Seçenekler iş etkisiyle karşılaştırılır", en: "Options are compared through business impact" },
      body: {
        tr: "Dima tek bir öneriyi kesin doğru diye sunmaz. Bakım planı, üretim sırası ve vardiya ayarı gibi seçenekleri teslim süresi, maliyet ve kapasite etkisiyle karşılaştırmaya hazırlar.",
        en: "Dima does not present one recommendation as absolute truth. Options such as maintenance planning, production sequence and shift adjustment are prepared for comparison by delivery, cost and capacity impact.",
      },
    },
    {
      id: "action",
      nav: { tr: "Eylem", en: "Action" },
      title: { tr: "Onaylanan karar işe dönüşür", en: "An approved decision becomes work" },
      body: {
        tr: "Onaylanan seçenek görev, bakım kaydı, bildirim veya sistem taslağına dönüşebilir. Yapılan iş ve sonucu daha sonra aynı makine, sinyal ve karara bağlanır.",
        en: "An approved option can become a task, maintenance record, notification or system draft. The work and outcome are later connected back to the same machine, signal and decision.",
      },
    },
  ] as const,
  overviewNodes: [
    { id: "finance", label: { tr: "Finans", en: "Finance" } },
    { id: "sales", label: { tr: "Satış", en: "Sales" } },
    { id: "manufacturing", label: { tr: "Üretim", en: "Manufacturing" } },
    { id: "procurement", label: { tr: "Satın alma", en: "Procurement" } },
    { id: "quality", label: { tr: "Kalite", en: "Quality" } },
  ] as const,
  sampleCase: {
    company: { tr: "Örnek Üretim A.Ş.", en: "Demo Manufacturing Co." },
    period: { tr: "Son 30 gün", en: "Last 30 days" },
    signal: {
      title: { tr: "Hat 3 performansı hedefin yüzde 11 altında", en: "Line 3 performance is 11 percent below target" },
      meta: { tr: "Üretim · 14 dakika önce", en: "Manufacturing · 14 minutes ago" },
      impact: { tr: "2 siparişte teslim riski, tahmini 184 bin TL maliyet etkisi", en: "Delivery risk on 2 orders, estimated TRY 184k cost impact" },
    },
    metrics: {
      tr: [
        { label: "OEE", value: "%68", context: "Hedef %79" },
        { label: "Kullanılabilirlik", value: "%82", context: "Duruş etkisi yüksek" },
        { label: "Performans", value: "%76", context: "Hız kaybı var" },
        { label: "Kalite", value: "%94", context: "Normal aralıkta" },
      ],
      en: [
        { label: "OEE", value: "68%", context: "Target 79%" },
        { label: "Availability", value: "82%", context: "Downtime impact is high" },
        { label: "Performance", value: "76%", context: "Speed loss present" },
        { label: "Quality", value: "94%", context: "Within normal range" },
      ],
    },
    sources: {
      tr: ["MES üretim kayıtları", "Bakım kayıtları", "Sipariş planı", "Vardiya çizelgesi"],
      en: ["MES production records", "Maintenance records", "Order plan", "Shift schedule"],
    },
    causes: {
      tr: [
        { label: "Plan dışı duruş", score: "%71", note: "M3 makinesi, son üç vardiyada tekrar ediyor" },
        { label: "Ürün değişim süresi", score: "%19", note: "İki siparişte normalin üzerinde" },
        { label: "Kalite kaybı", score: "%10", note: "Kritik eşik altında" },
      ],
      en: [
        { label: "Unplanned downtime", score: "71%", note: "Repeats on machine M3 across the last three shifts" },
        { label: "Changeover time", score: "19%", note: "Above normal on two orders" },
        { label: "Quality loss", score: "10%", note: "Below critical threshold" },
      ],
    },
    evidence: {
      tr: [
        "M3 makinesinde üç vardiyada toplam 47 dakika plan dışı duruş",
        "Bakım kaydında aynı sensör için iki tekrar",
        "Etkilenen iki siparişin aynı makine rotasını kullanması",
        "Kalite kaybının normal aralıkta kalması",
      ],
      en: [
        "47 minutes of unplanned downtime on machine M3 across three shifts",
        "Two repeated maintenance records for the same sensor",
        "Both affected orders use the same machine route",
        "Quality loss remains within the normal range",
      ],
    },
    decisions: {
      tr: [
        { title: "Bakımı öne al", effect: "Teslim riski azalır, 35 dakika planlı duruş gerekir" },
        { title: "Sipariş sırasını değiştir", effect: "M3 yükü azalır, değişim süresi 18 dakika artar" },
        { title: "Mevcut planı koru", effect: "Ek işlem yok, teslim riski devam eder" },
      ],
      en: [
        { title: "Bring maintenance forward", effect: "Delivery risk falls, requires 35 minutes planned downtime" },
        { title: "Change order sequence", effect: "M3 load falls, changeover time rises by 18 minutes" },
        { title: "Keep current plan", effect: "No extra work, delivery risk remains" },
      ],
    },
    action: {
      title: { tr: "Bakım planı taslağı hazır", en: "Maintenance plan draft is ready" },
      owner: { tr: "Sorumlu: Bakım ekibi", en: "Owner: Maintenance team" },
      approval: { tr: "Yönetici onayı bekleniyor", en: "Awaiting manager approval" },
    },
  },
  labels: {
    company: { tr: "Şirket", en: "Company" },
    attention: { tr: "Dikkat gerekiyor", en: "Needs attention" },
    currentStep: { tr: "Şu anki adım", en: "Current step" },
    secondarySignal: { tr: "Tahsilat davranışında değişim", en: "Collection behavior changed" },
    secondarySignalMeta: { tr: "Finans, 1 saat önce", en: "Finance, 1 hour ago" },
    source: { tr: "Kaynak", en: "Source" },
    period: { tr: "Dönem", en: "Period" },
    cause: { tr: "Neden adayları", en: "Cause candidates" },
    evidence: { tr: "Kanıtlar", en: "Evidence" },
    options: { tr: "Karar seçenekleri", en: "Decision options" },
    prepared: { tr: "Hazırlanan iş", en: "Prepared work" },
    inspect: { tr: "Kaynağı incele", en: "Inspect source" },
    sampleNotice: { tr: "Temsili ürün akışı, örnek şirket verisi", en: "Representative product flow, sample company data" },
  },
} as const;
