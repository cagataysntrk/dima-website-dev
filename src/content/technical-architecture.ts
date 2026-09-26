export type TechnicalLayerId = "sources" | "model" | "analytics" | "watch" | "investigation" | "decision" | "memory";

export const technicalArchitecture = {
  eyebrow: { tr: "Teknik olarak nasıl çalışır?", en: "How does it work technically?" },
  title: { tr: "Dil modeli tek başına karar vermez. Dima katmanlı bir sistemdir.", en: "A language model does not decide alone. Dima is a layered system." },
  intro: {
    tr: "Dima'nın görünen yüzü tek bir uygulama olsa da arkasında veri bağlantısı, şirket modeli, güvenilir analitik yürütme, sürekli denetim, kanıtlı araştırma ve kontrollü eylem katmanları bulunur. Amaç, ikna edici bir cevap üretmek değil; tekrar kontrol edilebilir bir karar süreci oluşturmaktır.",
    en: "Dima appears as one product, but underneath it are data connection, company modeling, trusted analytical execution, continuous monitoring, evidence-backed investigation and governed action layers. The goal is not to produce a persuasive answer, but a decision process that can be checked again.",
  },
  labels: {
    input: { tr: "Girdi", en: "Input" },
    output: { tr: "Çıktı", en: "Output" },
    principle: { tr: "Temel ilke", en: "Core principle" },
    sample: { tr: "Temsili teknik akış", en: "Representative technical flow" },
  },
  layers: [
    {
      id: "sources",
      short: { tr: "Veri", en: "Data" },
      title: { tr: "Veri kaynakları ve bağlantılar", en: "Data sources and connections" },
      body: { tr: "ERP, CRM, muhasebe, banka, MES, veritabanı, Excel ve API gibi kaynaklar mevcut yerlerinde kalabilir. Dima gerekli veriyi ortak şirket bağlamına taşır.", en: "ERP, CRM, accounting, banking, MES, databases, spreadsheets and APIs can remain in place. Dima brings the needed data into a shared company context." },
      input: { tr: "Tablolar, dosyalar, olay kayıtları", en: "Tables, files, event records" },
      output: { tr: "Bağlı kaynaklar ve veri kapsamı", en: "Connected sources and coverage" },
    },
    {
      id: "model",
      short: { tr: "Şirket modeli", en: "Company model" },
      title: { tr: "Varlıklar, ilişkiler ve zaman", en: "Entities, relationships and time" },
      body: { tr: "Müşteri, sipariş, fatura, makine, ürün, tedarikçi gibi varlıklar ile aralarındaki ilişkiler tek şirket modeli içinde tutulur. Sektör bağlamı bu modele işin gerçek kavramlarını ekler.", en: "Customers, orders, invoices, machines, products and suppliers are modeled together with their relationships. Sector context adds the business's real concepts to this model." },
      input: { tr: "Kaynak şemaları ve iş kavramları", en: "Source schemas and business concepts" },
      output: { tr: "Şirket haritası ve ortak bağlam", en: "Company map and shared context" },
    },
    {
      id: "analytics",
      short: { tr: "Analitik", en: "Analytics" },
      title: { tr: "Sayısal otorite ve ölçü tanımları", en: "Numeric authority and metric definitions" },
      body: { tr: "Marj, OEE, tahsilat süresi veya maliyet gibi rakamlar dil modelinin tahmini olarak üretilmez. Tanımlı ölçüler ve analitik sorgular gerçek veri üzerinde çalışır.", en: "Numbers such as margin, OEE, collection time or cost are not guessed by the language model. Defined metrics and analytical queries run against real data." },
      input: { tr: "Tanımlı ölçüler ve doğrulanmış sorgular", en: "Defined metrics and validated queries" },
      output: { tr: "Tekrar üretilebilir sayısal sonuç", en: "Reproducible numeric result" },
    },
    {
      id: "watch",
      short: { tr: "Denetim", en: "Monitoring" },
      title: { tr: "Sürekli izleme ve sinyal üretimi", en: "Continuous monitoring and signal generation" },
      body: { tr: "Normal davranış, plan, eşik ve ilişkiler belirli kontrollerle tekrar tekrar karşılaştırılır. Her değişim alarm olmaz; iş etkisi taşıyan sapma, risk ve fırsatlar ayrılır.", en: "Normal behavior, plans, thresholds and relationships are repeatedly compared through defined checks. Not every change becomes an alert; only business-relevant deviations, risks and opportunities surface." },
      input: { tr: "Yeni kayıtlar, planlar ve geçmiş örüntü", en: "New records, plans and historical patterns" },
      output: { tr: "Önceliklendirilmiş sinyaller", en: "Prioritized signals" },
    },
    {
      id: "investigation",
      short: { tr: "Araştırma", en: "Investigation" },
      title: { tr: "Kanıt, neden adayları ve geçmiş karşılaştırması", en: "Evidence, cause candidates and historical comparison" },
      body: { tr: "Bulgu seçildiğinde kaynak kayıt, dönem, ilişkili varlıklar ve geçmiş örüntüler birlikte incelenir. Dil modeli açıklama ve araştırma akışına yardım eder; kanıtı ve rakamı uydurmaz.", en: "When a finding is selected, source records, period, related entities and historical patterns are investigated together. The language model helps with explanation and investigation flow; it does not invent evidence or numbers." },
      input: { tr: "Sinyal ve bağlı şirket bağlamı", en: "Signal and connected company context" },
      output: { tr: "Kanıtlı neden adayları", en: "Evidence-backed cause candidates" },
    },
    {
      id: "decision",
      short: { tr: "Karar ve eylem", en: "Decision and action" },
      title: { tr: "Senaryo, onay ve kontrollü uygulama", en: "Scenario, approval and governed execution" },
      body: { tr: "Seçenekler kısıt, maliyet, termin ve diğer iş etkileriyle karşılaştırılır. Kritik eylemler Taslak → Doğrula → Önizle → Onayla → Uygula → Kayıt zinciriyle sınırlandırılabilir.", en: "Options are compared through constraints, cost, delivery and other business effects. Critical actions can be governed through Draft → Validate → Preview → Approve → Execute → Receipt." },
      input: { tr: "Neden, seçenekler ve yetki kuralları", en: "Cause, options and permission rules" },
      output: { tr: "Karar kaydı veya kontrollü eylem", en: "Decision record or governed action" },
    },
    {
      id: "memory",
      short: { tr: "Hafıza", en: "Memory" },
      title: { tr: "Sonuç ve karar hafızası", en: "Outcome and decision memory" },
      body: { tr: "Hangi kararın neden verildiği, kim uyguladı, ne oldu ve hangi varsayım doğru çıktı aynı olayla ilişkilendirilir. Sonraki benzer araştırma bu geçmişten beslenebilir.", en: "Why a decision was made, who acted, what happened and which assumption proved correct stay linked to the case. Future investigations can reuse that history." },
      input: { tr: "Karar, eylem ve gerçekleşen sonuç", en: "Decision, action and actual outcome" },
      output: { tr: "Kurumsal karar hafızası", en: "Institutional decision memory" },
    },
  ] as const,
  assurances: {
    eyebrow: { tr: "Güven ve yönetişim", en: "Trust and governance" },
    title: { tr: "Sonuç yalnız doğru görünmemeli, yeniden kontrol edilebilir olmalı.", en: "A result should not only look right. It should be checkable again." },
    items: [
      {
        title: { tr: "Kaynak izi", en: "Source lineage" },
        body: { tr: "Önemli sayı ve bulgu; kaynak, dönem, filtre, tazelik ve ilgili kayıt bağlamıyla birlikte tutulur.", en: "Important numbers and findings keep source, period, filter, freshness and related-record context attached." },
      },
      {
        title: { tr: "Tanımlı sayısal otorite", en: "Defined numeric authority" },
        body: { tr: "Marj, OEE, nakit veya maliyet gibi rakamlar dil modelinin tahmini değildir; tanımlı ölçü ve analitik hesaplardan gelir.", en: "Numbers such as margin, OEE, cash or cost are not language-model guesses; they come from defined measures and analytical calculations." },
      },
      {
        title: { tr: "Yetki sınırı", en: "Permission boundary" },
        body: { tr: "Kritik eylemler için taslak, doğrulama, önizleme, insan onayı ve işlem kaydı sınırı korunur.", en: "Critical actions preserve draft, validation, preview, human approval and execution-receipt boundaries." },
      },
      {
        title: { tr: "Karar izi ve hafıza", en: "Decision trace and memory" },
        body: { tr: "Bir kararın hangi kanıta ve varsayıma dayandığı, ne uygulandığı ve sonucun ne olduğu aynı olay üzerinde saklanır.", en: "The evidence and assumptions behind a decision, what was executed and what happened stay linked to the same case." },
      },
    ] as const,
  },
  principles: [
    { title: { tr: "Rakamı model uydurmaz", en: "The model does not invent the number" }, body: { tr: "Sayısal sonuç tanımlı analitik katmandan gelir; dil modeli açıklama ve araştırmada kullanılır.", en: "Numeric results come from the defined analytical layer; the language model supports explanation and investigation." } },
    { title: { tr: "Kanıt bulgudan kopmaz", en: "Evidence stays with the finding" }, body: { tr: "Kaynak, dönem, hesap ve ilişkili kayıtlar sonucun yanında denetlenebilir kalır.", en: "Source, period, calculation and related records remain inspectable next to the result." } },
    { title: { tr: "Kritik eylem yetkiyle sınırlıdır", en: "Critical action is permission-bound" }, body: { tr: "Yüksek etkili işlemler önizleme, insan onayı ve kayıt izi olmadan yürütülmez.", en: "High-impact operations are not executed without preview, human approval and an audit trail." } },
  ] as const,
} as const;
