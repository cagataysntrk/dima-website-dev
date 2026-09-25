export const solutionsPage = {
  meta: {
    title: {
      tr: "Dima nasıl çalışır? Company Brain, araştırma ve karar akışı",
      en: "How Dima works: Company Brain, investigation and decision flow",
    },
    description: {
      tr: "Dima'nın şirket verisini nasıl bağladığını, Company Brain ile nasıl izlediğini, finding'leri nasıl kanıtlarıyla araştırıp karar ve aksiyona taşıdığını görün.",
      en: "See how Dima connects company data, monitors it through Company Brain, investigates findings with evidence, and moves them toward decisions and actions.",
    },
  },
  breadcrumb: {
    home: { tr: "Ana sayfa", en: "Home" },
    self: { tr: "Ürün", en: "Product" },
  },
  hero: {
    title: {
      tr: "Dima şirketi nasıl izler ve karara taşır?",
      en: "How does Dima monitor a company and move work toward decisions?",
    },
    lede: {
      tr: "Dima bir soru kutusu veya rapor ekranı olarak başlamaz. Şirketin finans, muhasebe, üretim ve diğer veri kaynaklarını ortak bir bağlamda anlamlandırır; güncel veri akışına göre izler, önemli değişimleri bulur, nedenini araştırır ve karar için gereken kanıtı aynı akışta tutar.",
      en: "Dima does not begin as a question box or reporting screen. It connects finance, accounting, manufacturing and other company data into one context, monitors changes as data updates, surfaces what matters, investigates why it happened, and keeps the evidence needed for a decision in the same flow.",
    },
    trial: { tr: "Dima'yı deneyin", en: "Try Dima" },
    demo: { tr: "Canlı demo isteyin", en: "Request a live demo" },
  },
  section: {
    problem: { tr: "Neden gerekli", en: "Why it is needed" },
    capabilities: { tr: "Nasıl çalışır", en: "How it works" },
    audience: { tr: "Kimler için", en: "Who it is for" },
    ownSiteNote: {
      tr: "Dima'nın ana ürün sitesi usedima.com'dur.",
      en: "Dima's primary product site is usedima.com.",
    },
    domainNeeded: {
      tr: "[COPY NEEDED: product domain URL]",
      en: "[COPY NEEDED: product domain URL]",
    },
  },
  loop: {
    title: {
      tr: "Bir finding nasıl karara dönüşür?",
      en: "How does a finding become a decision?",
    },
    intro: {
      tr: "Dima'nın farkı yalnız bir sinyal üretmesi değildir. Aynı şirket, entity ve ilişki bağlamı araştırma boyunca korunur; böylece kullanıcı her adımda yeniden veri toplamak veya hikâyeyi baştan kurmak zorunda kalmaz.",
      en: "Dima's difference is not simply producing a signal. The same company, entity and relationship context stays intact through the investigation, so the user does not have to rebuild the data or the story at every step.",
    },
    steps: {
      tr: [
        {
          title: "Bağla ve şirket haritasını kur",
          body: "Veritabanı, ERP, Excel/CSV ve diğer kaynaklardan gelen tabloları yalnız aynı yerde toplamaz; müşteri, fatura, sipariş, makine, ürün ve metrik gibi entity'leri ve aralarındaki ilişkileri Company Brain bağlamına yerleştirir.",
        },
        {
          title: "Normal davranışı ve değişimi izle",
          body: "Bugünkü değeri tek başına okumaz. Geçmiş örüntüleri, planları, ilişkileri ve veri tazeliğini birlikte izleyerek şirketin hangi noktalarının normal, hangilerinin dikkat gerektirdiğini belirler.",
        },
        {
          title: "Önemli sinyali finding'e dönüştür",
          body: "Her değişim alarm değildir. Dima iş etkisi taşıyan sapma, risk veya fırsatı ilgili lob, entity ve ilişkilere bağlayarak incelenebilir bir finding olarak öne çıkarır.",
        },
        {
          title: "Nedeni kanıtlarıyla araştır",
          body: "Finding'in arkasındaki entity ve zaman ilişkilerini inceler; kök neden adaylarını karşılaştırır, elenen ihtimalleri ayırır ve sonucun dayandığı veri kaynaklarını görünür tutar.",
        },
        {
          title: "Karar seçeneklerini karşılaştır",
          body: "Tek bir öneriyi mutlak doğru gibi sunmak yerine uygulanabilir seçenekleri, maliyet, nakit, kapasite, termin veya diğer ilgili etkileriyle birlikte değerlendirmeye hazırlar.",
        },
        {
          title: "Aksiyonu kontrollü yürüt, sonucu hafızaya bağla",
          body: "Uygun aksiyonlar Draft → Validate → Preview → Approve → Execute → Receipt zinciriyle ilerler; yüksek etkili finans/ERP işlemlerinde insan onayı ve audit izi korunur. Sonuç daha sonra aynı entity, finding ve karar varsayımına bağlanarak Outcome/Memory katmanını besler.",
        },
      ],
      en: [
        {
          title: "Connect data and build the company map",
          body: "Databases, ERP, Excel/CSV and other sources are not merely collected in one place. Entities such as customers, invoices, orders, machines, products and metrics, together with their relationships, are placed into the Company Brain context.",
        },
        {
          title: "Monitor normal behavior and change",
          body: "A current value is not read in isolation. Historical patterns, plans, relationships and data freshness are monitored together to distinguish what is normal from what needs attention.",
        },
        {
          title: "Turn an important signal into a finding",
          body: "Not every change is an alert. Dima ties a deviation, risk or opportunity with business impact to the relevant lobe, entities and relationships and surfaces it as an investigable finding.",
        },
        {
          title: "Investigate the cause with evidence",
          body: "It examines entity and time relationships behind the finding, compares root-cause candidates, separates eliminated explanations and keeps the supporting data sources visible.",
        },
        {
          title: "Compare decision options",
          body: "Rather than presenting one recommendation as absolute truth, Dima prepares viable options for comparison with their relevant cost, cash, capacity, delivery or other business effects.",
        },
        {
          title: "Run action through controls and connect the outcome to memory",
          body: "Eligible actions move through Draft → Validate → Preview → Approve → Execute → Receipt; high-impact finance/ERP operations keep human approval and an audit trail. The outcome then links back to the same entity, finding and decision assumption to feed Outcome/Memory.",
        },
      ],
    },
  },
  trust: {
    title: {
      tr: "Bir bulgunun güvenilir olması ne demek?",
      en: "What makes a finding trustworthy?",
    },
    intro: {
      tr: "Dima'nın amacı yalnız hızlı cevap vermek değil; karar veren kişinin sonucun nereden geldiğini, hangi bağlamda üretildiğini ve hangi sınırlar içinde kullanılabileceğini anlayabilmesidir.",
      en: "Dima's goal is not merely to answer quickly. The decision-maker should be able to understand where a result came from, the context in which it was produced, and the boundaries within which it can be used.",
    },
    points: {
      tr: [
        {
          title: "Rakamın otoritesi analitik katmandır",
          body: "Sayısal sonuç modelin tahmininden gelmemelidir. Tanımlı semantik ve analitik katman sorguyu planlar, çalıştırır ve hesaplanan değerin kaynağını korur.",
        },
        {
          title: "Evidence finding'in parçasıdır",
          body: "Kaynak, dönem, entity, ilişki ve kullanılan hesaplar araştırmadan kopuk ayrı bir dipnot değildir; finding'in neden dikkate alınması gerektiğinin parçasıdır.",
        },
        {
          title: "Bağlam konuşma boyunca kaybolmaz",
          body: "Chat kullanıldığında kullanıcı sıfırdan soru sormaz. Konuşma seçili finding, entity ve investigation bağlamının üzerinde devam eder; bu yüzden takip soruları aynı araştırmanın devamıdır.",
        },
        {
          title: "Aksiyon yetki, önizleme ve onayla sınırlıdır",
          body: "Dima'nın gelecekte daha fazla işi yürütmesi hedeflense de bugünkü marka vaadi sınırsız otonomi değildir. Kritik aksiyon tasarımı Draft → Validate → Preview → Approve → Execute → Receipt zincirini, yüksek etkili işlemlerde insan onayını ve denetlenebilir audit izini korur.",
        },
      ],
      en: [
        {
          title: "The analytical layer is the authority for numbers",
          body: "Numeric results should not come from model guesswork. The defined semantic and analytical layer plans and executes the query and preserves the source of the calculated value.",
        },
        {
          title: "Evidence is part of the finding",
          body: "Source, period, entity, relationship and calculations are not a detached footnote. They are part of why the finding deserves attention.",
        },
        {
          title: "Context survives the conversation",
          body: "When chat is used, the user does not start from zero. The conversation continues on the selected finding, entity and investigation context, so follow-up questions remain part of the same investigation.",
        },
        {
          title: "Actions are bounded by permission, preview and approval",
          body: "Dima is intended to carry more work over time, but today's brand promise is not unlimited autonomy. Critical action design follows Draft → Validate → Preview → Approve → Execute → Receipt, retaining human approval for high-impact operations and an auditable trail.",
        },
      ],
    },
  },
  consult: {
    title: {
      tr: "Önce gerçek bir karar problemini seçin.",
      en: "Start with one real decision problem.",
    },
    body: {
      tr: "Pilot için bütün şirketi bir günde bağlamak gerekmez. Finans, muhasebe veya üretimde bugün geç fark edilen, farklı ekranlardan takip edilen ya da nedenini bulmak zaman alan bir problemi seçin; gerekli veriyi bağlayıp Dima'nın aynı döngüyü gerçek şirket bağlamında nasıl çalıştırdığını gösterelim.",
      en: "A pilot does not require connecting the whole company on day one. Choose one finance, accounting or manufacturing problem that is detected late, tracked across several screens or takes too long to explain; connect the data it needs and see the same Dima loop operate in your real company context.",
    },
    action: { tr: "Canlı demo isteyin", en: "Request a live demo" },
  },
} as const;
