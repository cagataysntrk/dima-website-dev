export const industriesPage = {
  meta: {
    title: {
      tr: "Dima kullanım alanları: finans, üretim ve sektör intelligence pack'leri",
      en: "Dima use cases: finance, manufacturing and sector intelligence packs",
    },
    description: {
      tr: "Dima'nın aynı Company Brain modeli içinde muhasebe/finans ve üretimde nasıl derinleştiğini; tekstil, plastik ve genel imalat pack'lerinin hangi entity ve ilişkileri eklediğini görün.",
      en: "See how Dima deepens the same Company Brain model for accounting/finance and manufacturing, and how textile, plastics and general manufacturing packs add domain-specific entities and relationships.",
    },
  },
  breadcrumb: {
    home: { tr: "Ana sayfa", en: "Home" },
    self: { tr: "Kullanım alanları", en: "Use cases" },
  },
  hero: {
    title: {
      tr: "Aynı Company Brain, farklı iş alanlarında derinleşir.",
      en: "One Company Brain, deeper in each business domain.",
    },
    lede: {
      tr: "Dima'nın temel çalışma döngüsü değişmez: veriyi bağlar, şirketi izler, önemli sinyali finding'e dönüştürür, nedenini kanıtlarıyla araştırır ve karara taşır. Değişen şey, hangi entity, ilişki ve iş kurallarının o bağlamda önemli olduğudur.",
      en: "Dima's core loop does not change: connect the data, monitor the company, turn an important signal into a finding, investigate why with evidence, and move it toward a decision. What changes is which entities, relationships and business rules matter in that context.",
    },
    jumpLabel: { tr: "Kullanım alanları", en: "Use cases" },
  },
  principle: {
    title: {
      tr: "Bunlar ayrı modüller değil, aynı beynin derinlikleri.",
      en: "These are not separate modules. They are depths of the same brain.",
    },
    body: {
      tr: "Finans ekranı başka bir ürün, üretim ekranı başka bir ürün değildir. Aynı entity graph, signal, finding, investigation, decision, action ve outcome modeli çalışır. Bir satış finding'i tahsilata, üretim kaybı maliyete veya satın alma kararı nakde bağlandığında bağlam bölümler arasında kopmaz.",
      en: "Finance is not one product and manufacturing another. The same entity graph, signal, finding, investigation, decision, action and outcome model runs underneath both. When a sales finding connects to collections, a production loss to cost, or a procurement decision to cash, context does not break at departmental boundaries.",
    },
  },
  domains: [
    {
      id: "finance",
      anchor: { tr: "muhasebe-finans", en: "accounting-finance" },
      eyebrow: { tr: "Domain intelligence", en: "Domain intelligence" },
      title: { tr: "Muhasebe & Finans", en: "Accounting & Finance" },
      intro: {
        tr: "Finans lobu yalnız bakiye ve rapor göstermez. Nakit, tahsilat, cari, ödeme, fatura, mutabakat, maliyet, bütçe, risk ve kapanış gibi alanların aynı şirket içindeki neden-sonuç ilişkilerini izler.",
        en: "The finance lobe does more than display balances and reports. It watches causal relationships across cash, collections, receivables, payments, invoices, reconciliation, cost, budget, risk and close.",
      },
      clusters: {
        tr: ["Nakit", "Tahsilat & Cari", "Ödemeler", "Faturalar & Mutabakat", "Maliyet & Bütçe", "Risk & Kapanış"],
        en: ["Cash", "Collections & AR", "Payments", "Invoices & Reconciliation", "Cost & Budget", "Risk & Close"],
      },
      behaviors: {
        tr: [
          {
            title: "Nakit ve tahsilatı aynı müşteri bağlamında okur",
            body: "Açık faturayı tek başına değerlendirmek yerine ödeme geçmişi, sipariş sıklığı, banka tahsilatı ve vade davranışını birlikte inceler. Böylece cari risk veya nakit baskısı yalnız sonuç olarak değil, ilişkileriyle görülebilir.",
          },
          {
            title: "Mutabakatı yalnız fark listesi olmaktan çıkarır",
            body: "Banka, ERP, POS veya diğer finansal kayıtlar arasında eşleşmeyen hareketleri ilgili fatura, müşteri ve ödeme ilişkisine bağlayarak neden araştırmasına hazırlar.",
          },
          {
            title: "Working capital ve kâr kaçağını çapraz ilişkilerden arar",
            body: "Stok, tedarikçi koşulu, tahsilat süresi, ürün karması, maliyet ve marj değişimini birlikte okuyarak tek bir finans tablosunda görünmeyen optimizasyon alanlarını öne çıkarır.",
          },
          {
            title: "Kapanış ve bütçe sapmasını geçmiş örüntüyle karşılaştırır",
            body: "Dönem kapanışı, tahakkuk, bütçe-gerçekleşen farkı ve gerektiğinde muhasebe sınıflandırmalarını aynı dönem ve entity bağlamında izleyerek açıklama gerektiren değişimleri ayırır.",
          },
        ],
        en: [
          {
            title: "Reads cash and collections in the same customer context",
            body: "Instead of looking at an open invoice alone, it combines payment history, order frequency, bank collections and due-date behavior. Receivables risk or cash pressure can then be seen through its relationships, not only as an outcome.",
          },
          {
            title: "Turns reconciliation from a difference list into an investigation",
            body: "Unmatched movements across bank, ERP, POS or other financial records are tied back to the relevant invoice, customer and payment relationships so the cause can be investigated.",
          },
          {
            title: "Looks for working-capital and margin leakage across relationships",
            body: "Inventory, supplier terms, collection time, product mix, cost and margin change are read together to surface optimization opportunities that do not appear in a single finance table.",
          },
          {
            title: "Compares close and budget variance with historical patterns",
            body: "Period close, accruals, budget-versus-actual variance and, where configured, accounting classifications are monitored in the same period and entity context to isolate changes that need explanation.",
          },
        ],
      },
    },
    {
      id: "manufacturing",
      anchor: { tr: "uretim", en: "manufacturing" },
      eyebrow: { tr: "Domain intelligence", en: "Domain intelligence" },
      title: { tr: "Üretim", en: "Manufacturing" },
      intro: {
        tr: "Üretim lobu Plant Today görünümünden başlayıp makine, hat, sipariş, ürün, vardiya, bakım, kalite, malzeme, kapasite, enerji ve maliyet ilişkilerine iner. Amaç yalnız OEE göstermek değil, kaybın nereden geldiğini ve işletmeye neye mal olduğunu açıklamaktır.",
        en: "The manufacturing lobe starts at a Plant Today view and drills into relationships among machines, lines, orders, products, shifts, maintenance, quality, materials, capacity, energy and cost. The goal is not merely to show OEE, but to explain where loss comes from and what it costs the business.",
      },
      clusters: {
        tr: ["Plant Today", "OEE & Loss", "Plan & Termin", "Kapasite", "Fire & Rework", "Duruş & Bakım", "Kalite", "Enerji & Maliyet"],
        en: ["Plant Today", "OEE & Loss", "Plan & Delivery", "Capacity", "Scrap & Rework", "Downtime & Maintenance", "Quality", "Energy & Cost"],
      },
      behaviors: {
        tr: [
          {
            title: "Kayıp metriğini sipariş ve proses bağlamına bağlar",
            body: "Bir hattın performansı düştüğünde makine, ürün, reçete/proses, vardiya, sipariş ve bakım geçmişi birlikte incelenir. Böylece KPI değişimi kök neden araştırmasına dönüşür.",
          },
          {
            title: "Termin ve kapasite riskini aynı üretim ağı içinde görür",
            body: "Planlanan iş yükü, mevcut kapasite, makine durumu, malzeme erişimi ve kalite/rework etkisi birlikte değerlendirilerek hangi siparişin neden riskte olduğu görünür hale gelir.",
          },
          {
            title: "Fire ve kaliteyi finansal etkiden ayırmaz",
            body: "Fire, rework veya kalite sapması yalnız adet/yüzde olarak kalmaz; ürün, hammadde, enerji, işçilik ve termin etkisiyle birlikte karar bağlamına taşınır.",
          },
          {
            title: "Enerji ve proses değişimini ürün başına etkisiyle izler",
            body: "Enerji tüketimi toplam tesis sayısı olarak değil; mümkün olduğunda makine, proses, ürün ve üretim miktarı ilişkisi içinde okunarak anlamlı sapma ve optimizasyon alanları ayrıştırılır.",
          },
        ],
        en: [
          {
            title: "Connects a loss metric to order and process context",
            body: "When line performance falls, machine, product, recipe/process, shift, order and maintenance history are examined together, turning a KPI change into a root-cause investigation.",
          },
          {
            title: "Sees delivery and capacity risk inside the same production network",
            body: "Planned workload, available capacity, machine state, material availability and quality/rework effects are evaluated together to show which order is at risk and why.",
          },
          {
            title: "Does not separate scrap and quality from financial impact",
            body: "Scrap, rework or quality deviation does not stop at a count or percentage; product, material, energy, labor and delivery impact are brought into the same decision context.",
          },
          {
            title: "Reads energy and process change through product-level impact",
            body: "Energy is not treated only as a plant total. Where data allows, it is read through machine, process, product and output relationships to separate meaningful deviations and optimization opportunities.",
          },
        ],
      },
    },
  ],
  sectorPacks: [
    {
      id: "textile",
      anchor: { tr: "tekstil", en: "textile" },
      eyebrow: { tr: "Sector intelligence pack", en: "Sector intelligence pack" },
      title: { tr: "Tekstil", en: "Textile" },
      intro: {
        tr: "Tekstil pack'i ortak üretim beyninin üzerine reçete, renk, lot, makine, kumaş, kimyasal, su/enerji ve kalite ilişkilerini bindirir. Böylece aynı finding hem proses hem kalite hem de maliyet bağlamında incelenebilir.",
        en: "The textile pack overlays the common manufacturing brain with recipe, color, lot, machine, fabric, chemical, water/energy and quality relationships, so the same finding can be investigated through process, quality and cost context.",
      },
      clusters: {
        tr: ["Reçete", "Renk", "Lot", "Makine", "Kumaş", "Kimyasal", "Su / Enerji", "Kalite"],
        en: ["Recipe", "Color", "Lot", "Machine", "Fabric", "Chemical", "Water / Energy", "Quality"],
      },
      behaviors: {
        tr: [
          {
            title: "Batch ve renk stabilitesini ilişkiler ağıyla inceler",
            body: "RFT, batch preflight veya off-shade araştırması gibi davranışlar ayrı uygulamalar değil; ilgili lot, reçete, renk, makine ve proses koşullarında çalışan intelligence davranışlarıdır.",
          },
          {
            title: "Lab → bulk ve reçete değişimini geçmiş sonuçlarla karşılaştırır",
            body: "Laboratuvar sonucu ile bulk üretim arasındaki farkı, reçete geçmişini ve proses koşullarını aynı entity zincirinde tutarak tekrar eden örüntüleri görünür hale getirir.",
          },
          {
            title: "Kaynak tüketimini kalite ve maliyetle birlikte okur",
            body: "Su, enerji ve kimyasal kullanımı yalnız tüketim metriği değildir; batch, ürün, kalite sonucu ve maliyet ilişkileri üzerinden optimizasyon bağlamına alınır.",
          },
        ],
        en: [
          {
            title: "Investigates batch and color stability through relationships",
            body: "Behaviors such as RFT, batch preflight or off-shade investigation are not separate apps; they are intelligence behaviors operating on the relevant lot, recipe, color, machine and process conditions.",
          },
          {
            title: "Compares lab-to-bulk and recipe change with historical outcomes",
            body: "Differences between lab and bulk production, recipe history and process conditions stay in the same entity chain so recurring patterns become visible.",
          },
          {
            title: "Reads resource consumption together with quality and cost",
            body: "Water, energy and chemical use are not only consumption metrics; they are connected to batch, product, quality outcome and cost for optimization.",
          },
        ],
      },
    },
    {
      id: "plastics",
      anchor: { tr: "plastik", en: "plastics" },
      eyebrow: { tr: "Sector intelligence pack", en: "Sector intelligence pack" },
      title: { tr: "Plastik", en: "Plastics" },
      intro: {
        tr: "Plastik pack'i resin, masterbatch, regrind, makine, kalıp/die, cycle, drying, dosing, defect ve enerji ilişkilerini ortak üretim beynine ekler.",
        en: "The plastics pack adds resin, masterbatch, regrind, machine, mold/die, cycle, drying, dosing, defect and energy relationships to the common manufacturing brain.",
      },
      clusters: {
        tr: ["Resin", "Masterbatch", "Regrind", "Makine", "Kalıp / Die", "Cycle", "Drying & Dosing", "Defect & Energy"],
        en: ["Resin", "Masterbatch", "Regrind", "Machine", "Mold / Die", "Cycle", "Drying & Dosing", "Defect & Energy"],
      },
      behaviors: {
        tr: [
          {
            title: "Process stability ve cycle kaybını aynı bağlamda araştırır",
            body: "Cycle-time değişimi, proses parametreleri, makine/kalıp durumu ve defect sonuçları birlikte okunarak hız ile kalite arasındaki trade-off görünür hale gelir.",
          },
          {
            title: "Scrap RCA'yı malzeme hazırlığıyla ilişkilendirir",
            body: "Fire artışı yalnız makineye bağlanmaz; drying readiness, dosing, resin/masterbatch/regrind karışımı ve proses geçmişi aynı investigation içinde karşılaştırılabilir.",
          },
          {
            title: "Enerji/kg ve margin leak'i üretim entity'lerine bağlar",
            body: "Enerji tüketimi, cycle, hurda, malzeme karışımı ve üretim miktarı birlikte okunarak ürün veya proses bazında görünmeyen maliyet kaçağı araştırılabilir.",
          },
        ],
        en: [
          {
            title: "Investigates process stability and cycle loss in one context",
            body: "Cycle-time change, process parameters, machine/mold state and defect outcomes are read together so the trade-off between speed and quality becomes visible.",
          },
          {
            title: "Connects scrap root cause to material preparation",
            body: "A scrap increase is not assigned to the machine alone; drying readiness, dosing, resin/masterbatch/regrind mix and process history can be compared in the same investigation.",
          },
          {
            title: "Links energy per kilogram and margin leakage to production entities",
            body: "Energy, cycle, scrap, material mix and output are read together so hidden product- or process-level cost leakage can be investigated.",
          },
        ],
      },
    },
    {
      id: "general",
      anchor: { tr: "genel-imalat", en: "general-manufacturing" },
      eyebrow: { tr: "Sector intelligence pack", en: "Sector intelligence pack" },
      title: { tr: "Genel imalat", en: "General manufacturing" },
      intro: {
        tr: "Genel imalat pack'i sektörün özel terminolojisi tanımlanana kadar ortak üretim, kalite, bakım, planlama, stok, satın alma ve finans ilişkilerini kullanır; onboarding sırasında şirketin gerçek entity ve süreçlerine göre özelleşir.",
        en: "The general manufacturing pack uses the common manufacturing, quality, maintenance, planning, inventory, procurement and finance relationships until company-specific terminology is defined, then adapts to the real entities and processes discovered during onboarding.",
      },
      clusters: {
        tr: ["Sipariş", "Ürün", "Makine / Hat", "Vardiya", "Malzeme", "Kalite", "Bakım", "Maliyet"],
        en: ["Order", "Product", "Machine / Line", "Shift", "Material", "Quality", "Maintenance", "Cost"],
      },
      behaviors: {
        tr: [
          {
            title: "Şirketin kendi üretim modelini onboarding'de kurar",
            body: "Hazır bir sektör şemasını zorla dayatmak yerine mevcut veri kaynaklarından ürün, makine, hat, sipariş, malzeme ve diğer temel entity'leri çıkararak Company Map'i oluşturur.",
          },
          {
            title: "Ortak kayıp ağacını şirketin gerçek ilişkilerine bağlar",
            body: "Duruş, fire, kalite, kapasite ve termin gibi ortak üretim problemleri aynı kalsa da kök neden araştırması şirketin gerçek proses ve veri ilişkilerine göre çalışır.",
          },
          {
            title: "Üretim finding'ini finans ve satın alma etkisine taşır",
            body: "Bir üretim problemi gerektiğinde maliyet, stok, tedarik veya nakit etkisine bağlanır; karar tek departmanın ekranında kapanmaz.",
          },
        ],
        en: [
          {
            title: "Builds the company's own production model during onboarding",
            body: "Instead of forcing a fixed industry schema, it derives core entities such as product, machine, line, order and material from the available data sources to build the Company Map.",
          },
          {
            title: "Connects the common loss tree to the company's real relationships",
            body: "Downtime, scrap, quality, capacity and delivery remain common manufacturing problems, but root-cause investigation operates on the company's actual process and data relationships.",
          },
          {
            title: "Carries a production finding into finance and procurement impact",
            body: "When relevant, a production problem connects to cost, inventory, supply or cash impact, so the decision does not end inside one department's screen.",
          },
        ],
      },
    },
  ],
  cta: {
    title: { tr: "Kendi kullanım alanınızı gerçek veriyle görün.", en: "See your own use case with real data." },
    body: {
      tr: "Bir domain veya sektör pack'i seçmek son adım değildir. Asıl değer, Dima'nın sizin veri kaynaklarınızdan şirketin gerçek entity ve ilişkilerini çıkarmasıyla başlar. Pilot için tek bir karar problemini ve onu açıklayan veri setini seçmek yeterlidir.",
      en: "Choosing a domain or sector pack is not the final step. The value begins when Dima derives your company's actual entities and relationships from your data. For a pilot, one real decision problem and the data needed to explain it are enough.",
    },
    action: { tr: "Canlı demo isteyin", en: "Request a live demo" },
  },
} as const;
