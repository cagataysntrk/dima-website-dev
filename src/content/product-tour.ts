import type { L } from "./types";

export type ProductTourStageId = "auth" | "connect" | "model" | "dashboard" | "chat" | "watch";

export const productTour = {
  eyebrow: { tr: "Dima nasıl başlar?", en: "How Dima starts" },
  title: { tr: "İlk girişten sürekli denetime kadar ürünün tamamını görün.", en: "See the product from first sign-in to continuous monitoring." },
  note: { tr: "Temsili ürün turu, örnek şirket verisi", en: "Representative product tour, sample company data" },
  auto: {
    running: { tr: "Tur otomatik ilerliyor", en: "Tour is playing automatically" },
    pause: { tr: "Turu duraklat", en: "Pause tour" },
    resume: { tr: "Turu sürdür", en: "Resume tour" },
  },
  stages: [
    {
      id: "auth",
      step: "01",
      tab: { tr: "Kurulum", en: "Setup" },
      meta: { tr: "Google ile giriş", en: "Google sign-in" },
      title: { tr: "Girin ve nasıl başlayacağınızı seçin.", en: "Sign in and choose how to start." },
      caption: { tr: "Kendi verinizle devam edin veya örnek şirketi keşfedin.", en: "Continue with your own data or explore a sample company." },
    },
    {
      id: "connect",
      step: "02",
      tab: { tr: "Veriyi bağla", en: "Connect data" },
      meta: { tr: "Kaynaklar", en: "Sources" },
      title: { tr: "Dima mevcut sistemlerinize bağlanır.", en: "Dima connects to the systems you already use." },
      caption: { tr: "ERP, veritabanı, Excel/CSV, CRM, MES ve diğer kaynaklar.", en: "ERP, databases, Excel/CSV, CRM, MES and other sources." },
    },
    {
      id: "model",
      step: "03",
      tab: { tr: "Şirket oluşur", en: "Company forms" },
      meta: { tr: "Şirket Haritası", en: "Company Map" },
      title: { tr: "Veri, yaşayan bir şirket modeline dönüşür.", en: "Data becomes a living company model." },
      caption: { tr: "İş alanları, varlıklar ve ilişkiler aynı bağlamda oluşur.", en: "Business domains, entities and relationships form in one context." },
    },
    {
      id: "dashboard",
      step: "04",
      tab: { tr: "Ana ekran", en: "Home" },
      meta: { tr: "Şirket Beyni", en: "Company Brain" },
      title: { tr: "Şirketinizin canlı görünümü hazırdır.", en: "The live view of your company is ready." },
      caption: { tr: "Önemli sinyaller, fırsatlar, durumlar ve kararlar tek yüzeyde.", en: "Signals, opportunities, status and decisions on one surface." },
    },
    {
      id: "chat",
      step: "05",
      tab: { tr: "Dima'ya sor", en: "Ask Dima" },
      meta: { tr: "Bağlamsal sohbet", en: "Contextual conversation" },
      title: { tr: "İsterseniz aynı bağlamla konuşursunuz.", en: "When needed, talk to the same context." },
      caption: { tr: "Soru, grafik, kaynak sorgu ve takip adımları aynı çalışma içinde.", en: "Question, chart, source query and follow-ups stay in the same work." },
    },
    {
      id: "watch",
      step: "06",
      tab: { tr: "Sürekli denetim", en: "Continuous watch" },
      meta: { tr: "7/24 çalışma", en: "Always-on work" },
      title: { tr: "Siz sormadığınızda da Dima çalışmaya devam eder.", en: "Dima keeps working when nobody is asking a question." },
      caption: { tr: "İzler, sapma ve fırsatı fark eder, araştırır, optimize eder ve karara taşır.", en: "It monitors, detects deviations and opportunities, investigates, optimizes and prepares decisions." },
    },
  ] as const,
  auth: {
    title: { tr: "Dima'ya hoş geldiniz", en: "Welcome to Dima" },
    google: { tr: "Google ile devam et", en: "Continue with Google" },
    own: { tr: "Kendi verimle devam et", en: "Continue with my data" },
    sample: { tr: "Örnek şirketle keşfet", en: "Explore a sample company" },
    disclaimer: { tr: "Bu ekran temsili ürün turudur; canlı OAuth bağlantısı değildir.", en: "This is a representative product tour, not a live OAuth connection." },
  },
  connect: {
    setupLabel: { tr: "Veri kurulumu", en: "Data setup" },
    contextLabel: { tr: "Şirket bağlamı", en: "Company context" },
    sources: ["ERP", "CRM", "Excel / CSV", "Veritabanı", "MES", "API"] as const,
    entities: {
      tr: ["Müşteri", "Sipariş", "Makine", "Fatura", "Tedarikçi"],
      en: ["Customer", "Order", "Machine", "Invoice", "Supplier"],
    },
    checks: {
      tr: ["Kaynaklar bulundu", "Şema okundu", "Varlıklar eşlendi", "İlişkiler çıkarılıyor"],
      en: ["Sources found", "Schema read", "Entities matched", "Relationships forming"],
    },
  },
  model: {
    heading: { tr: "Şirketinizi şöyle anladım", en: "Here is how I understand your company" },
    company: { tr: "Örnek A.Ş.", en: "Sample Co." },
    domains: {
      tr: ["Finans", "Satış", "Üretim", "Satın Alma", "Kalite", "Müşteriler", "Stok", "Bakım"],
      en: ["Finance", "Sales", "Manufacturing", "Procurement", "Quality", "Customers", "Inventory", "Maintenance"],
    },
  },
  dashboard: {
    imageAlt: { tr: "Şirket Beyni ana ürün görünümü, örnek şirket verisi", en: "Company Brain main product view with sample company data" },
    ready: { tr: "Şirket Beyni hazır", en: "Company Brain ready" },
    summary: { tr: "Sinyaller · Fırsatlar · Kararlar", en: "Signals · Opportunities · Decisions" },
  },
  watch: {
    badge: { tr: "7/24 denetim aktif", en: "Always-on monitoring active" },
    monitoring: { tr: "denetliyor", en: "monitoring" },
    events: [
      { time: "02:14", tr: "Hat 3 performans sapması bulundu", en: "Line 3 performance deviation detected" },
      { time: "02:15", tr: "Son 90 gün ve bakım geçmişi karşılaştırıldı", en: "90-day history and maintenance records compared" },
      { time: "02:16", tr: "İki siparişte teslim riski doğrulandı", en: "Delivery risk confirmed on two orders" },
      { time: "02:17", tr: "Bakım ve sıralama seçenekleri hazırlandı", en: "Maintenance and sequencing options prepared" },
    ] as const,
    signal: { tr: "Yeni kritik bulgu", en: "New critical finding" },
    signalTitle: { tr: "Hat 3 performansı hedefin %11 altında", en: "Line 3 performance is 11% below target" },
    impact: { tr: "2 sipariş · 184 bin TL tahmini etki", en: "2 orders · TRY 184k estimated impact" },
  },
} as const;
