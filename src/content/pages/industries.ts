export const industriesPage = {
  meta: {
    title: {
      tr: "Dima kullanım alanları: yönetim, finans, üretim ve sektör bağlamları",
      en: "Dima use cases: management, finance, manufacturing and sector contexts",
    },
    description: {
      tr: "Dima'nın yönetim, muhasebe ve finans, üretim çalışmalarında nasıl derinleştiğini ve farklı sektörlerde hangi varlık, ilişki ve karar problemlerini izlediğini görün.",
      en: "See how Dima deepens management, accounting and finance, and manufacturing work, and which entities, relationships and decision problems it follows across sectors.",
    },
  },
  breadcrumb: {
    home: { tr: "Ana sayfa", en: "Home" },
    self: { tr: "Kullanım alanları", en: "Use cases" },
  },
  hero: {
    title: {
      tr: "Aynı Şirket Beyni, farklı işlerde ve sektörlerde derinleşir.",
      en: "One Company Brain, deeper across work and industries.",
    },
    lede: {
      tr: "Dima'nın temel döngüsü değişmez. Veriyi bağlar, şirketi izler, önemli değişimi sinyale ve bulguya dönüştürür, nedenini kanıtlarıyla araştırır ve karara taşır. Değişen şey, o iş alanında hangi varlıkların, ilişkilerin ve kuralların önemli olduğudur.",
      en: "Dima's core loop stays the same. It connects data, monitors the company, turns important change into signals and findings, investigates causes with evidence and moves work toward a decision. What changes is which entities, relationships and rules matter in that context.",
    },
    jumpLabel: { tr: "Kullanım alanları", en: "Use cases" },
  },
  principle: {
    title: {
      tr: "Bunlar ayrı ürünler değil, aynı şirket modelinin derinlikleri.",
      en: "These are not separate products. They are depths of the same company model.",
    },
    body: {
      tr: "Yönetim, finans ve üretim birbirinden kopuk uygulamalar değildir. Aynı şirket haritası, sinyal, araştırma, karar, eylem ve sonuç modeli çalışır. Satıştaki bir değişim tahsilata, üretimdeki bir kayıp maliyete, satın alma kararı nakde bağlandığında bağlam bölüm sınırında kesilmez.",
      en: "Management, finance and manufacturing are not disconnected applications. The same company map, signal, investigation, decision, action and outcome model runs underneath them. Context does not break when a sales change connects to collections, production loss to cost or procurement to cash.",
    },
  },
  domains: [
    {
      id: "management",
      anchor: { tr: "yonetim", en: "management" },
      eyebrow: { tr: "Yönetim", en: "Management" },
      title: { tr: "Şirket gündemi ve karar akışı", en: "Company agenda and decision flow" },
      intro: {
        tr: "Yönetici ayrı ayrı raporları taramak yerine günün önemli değişimlerini, açık araştırmaları, karar bekleyen konuları ve sonuçları tek şirket bağlamında görür.",
        en: "Instead of scanning separate reports, management sees important changes, open investigations, pending decisions and outcomes in one company context.",
      },
      clusters: {
        tr: ["Günün özeti", "Şirket radarı", "Araştırmalar", "Karar kuyruğu", "Senaryolar", "Varlık 360", "Görevler", "Karar hafızası"],
        en: ["Daily brief", "Company radar", "Investigations", "Decision queue", "Scenarios", "Entity 360", "Tasks", "Decision memory"],
      },
      behaviors: {
        tr: [
          { title: "Önemli olanı gündeme taşır", body: "Risk, fırsat, gecikme ve sapmaları yalnız önem derecesiyle değil, iş etkisi ve ilgili varlıklarla birlikte sıralar." },
          { title: "Araştırmayı karar bağlamına bağlar", body: "Bir sinyal seçildiğinde neden adayları, kanıtlar ve etkilenen alanlar aynı çalışma alanında tutulur." },
          { title: "Kararın sonucunu unutmaz", body: "Verilen karar, sorumlu kişi, uygulanan eylem ve sonuç aynı olayla ilişkilendirilerek şirket hafızasına eklenir." },
        ],
        en: [
          { title: "Moves what matters onto the agenda", body: "Risks, opportunities, delays and deviations are ranked with business impact and related entities, not severity alone." },
          { title: "Connects investigation to decision context", body: "When a signal is selected, cause candidates, evidence and affected domains remain in one workspace." },
          { title: "Remembers the outcome of a decision", body: "The decision, owner, action and outcome are connected back to the same case and added to company memory." },
        ],
      },
    },
    {
      id: "finance",
      anchor: { tr: "muhasebe-finans", en: "accounting-finance" },
      eyebrow: { tr: "Muhasebe ve finans", en: "Accounting and finance" },
      title: { tr: "Nakit, marj, mutabakat ve bütçe", en: "Cash, margin, reconciliation and budget" },
      intro: {
        tr: "Finans alanı yalnız bakiye ve rapor göstermez. Nakit, tahsilat, cari hesap, ödeme, fatura, mutabakat, maliyet, bütçe, kapanış ve stok etkilerini nedenleriyle birlikte izler.",
        en: "Finance does more than display balances and reports. It monitors cash, collections, receivables, payments, invoices, reconciliation, cost, budget, close and inventory effects together with their causes.",
      },
      clusters: {
        tr: ["Nakit", "Tahsilat ve cari hesap", "Ödemeler", "Faturalar", "Mutabakat", "Kapanış", "Maliyet", "Bütçe ve risk"],
        en: ["Cash", "Collections and receivables", "Payments", "Invoices", "Reconciliation", "Close", "Cost", "Budget and risk"],
      },
      behaviors: {
        tr: [
          { title: "Tahsilat riskini müşteri davranışıyla birlikte okur", body: "Açık fatura, ödeme geçmişi, sipariş sıklığı ve banka tahsilatı birlikte değerlendirilir." },
          { title: "Marj değişimini bileşenlerine ayırır", body: "Fiyat, hacim, ürün karması, hammadde, fire ve indirim etkisi aynı kâr değişimi içinde ayrıştırılır." },
          { title: "Mutabakatı fark listesinden araştırmaya çevirir", body: "Banka ve muhasebe farkı ilgili müşteri, fatura, ödeme ve dönemle ilişkilendirilerek neden araştırmasına dönüşür." },
        ],
        en: [
          { title: "Reads collection risk with customer behavior", body: "Open invoices, payment history, order frequency and bank collections are evaluated together." },
          { title: "Decomposes margin change", body: "Price, volume, mix, raw material, scrap and discount effects are separated inside the same profit change." },
          { title: "Turns reconciliation into investigation", body: "Bank and accounting differences are connected to customer, invoice, payment and period context for cause analysis." },
        ],
      },
    },
    {
      id: "manufacturing",
      anchor: { tr: "uretim", en: "manufacturing" },
      eyebrow: { tr: "Üretim", en: "Manufacturing" },
      title: { tr: "Tesis durumu, kayıp, kapasite ve teslim", en: "Plant state, loss, capacity and delivery" },
      intro: {
        tr: "Makine, hat, sipariş, ürün, vardiya, bakım, kalite, malzeme, kapasite, enerji ve maliyet aynı üretim bağlamında izlenir. Amaç yalnız OEE göstermek değil, kaybın nereden geldiğini ve ne yapılabileceğini açıklamaktır.",
        en: "Machines, lines, orders, products, shifts, maintenance, quality, materials, capacity, energy and cost are monitored in one production context. The goal is not merely to show OEE, but to explain where loss comes from and what can be done.",
      },
      clusters: {
        tr: ["Tesis Bugün", "OEE ve kayıp", "Plan ve teslim", "Kapasite", "Fire ve yeniden işleme", "Duruş ve bakım", "Kalite", "Enerji ve maliyet"],
        en: ["Plant Today", "OEE and loss", "Plan and delivery", "Capacity", "Scrap and rework", "Downtime and maintenance", "Quality", "Energy and cost"],
      },
      behaviors: {
        tr: [
          { title: "Kayıp göstergesini sipariş ve süreç bağlamına bağlar", body: "Makine, ürün, vardiya, sipariş ve bakım geçmişi birlikte incelenerek performans değişimi kök neden araştırmasına dönüşür." },
          { title: "Teslim ve kapasite riskini birlikte görür", body: "İş yükü, makine durumu, malzeme erişimi ve kalite etkisi birlikte değerlendirilerek hangi siparişin neden riskte olduğu gösterilir." },
          { title: "Fire ve kaliteyi maliyet etkisine bağlar", body: "Fire ve yeniden işleme adet olarak kalmaz. Hammadde, enerji, işçilik ve teslim etkisiyle birlikte karar bağlamına taşınır." },
        ],
        en: [
          { title: "Connects loss metrics to order and process context", body: "Machine, product, shift, order and maintenance history are examined together so a performance change becomes a root-cause investigation." },
          { title: "Sees delivery and capacity risk together", body: "Workload, machine state, material availability and quality effects are evaluated together to show which order is at risk and why." },
          { title: "Connects scrap and quality to cost impact", body: "Scrap and rework do not stop at counts. Material, energy, labor and delivery effects are brought into the decision context." },
        ],
      },
    },
  ],
  sectorPacks: [
    {
      id: "textile",
      anchor: { tr: "tekstil", en: "textile" },
      eyebrow: { tr: "Sektör bağlamı", en: "Sector context" },
      title: { tr: "Tekstil ve boya", en: "Textile and dyeing" },
      intro: {
        tr: "Reçete, renk, lot, makine, kumaş, kimyasal, su, enerji ve kalite ilişkileri ortak üretim modeline eklenir.",
        en: "Recipe, color, lot, machine, fabric, chemical, water, energy and quality relationships are added to the common production model.",
      },
      clusters: { tr: ["Reçete", "Renk", "Lot", "Makine", "Kumaş", "Kimyasal", "Su ve enerji", "Kalite"], en: ["Recipe", "Color", "Lot", "Machine", "Fabric", "Chemical", "Water and energy", "Quality"] },
      behaviors: {
        tr: [
          { title: "Parti ve renk sapmasını ilişkileriyle araştırır", body: "Lot, reçete, makine ve süreç koşulları birlikte karşılaştırılarak tekrar eden kalite örüntüleri bulunur." },
          { title: "Laboratuvar ile seri üretim farkını izler", body: "Laboratuvar sonucu, reçete geçmişi ve seri üretim koşulları aynı ürün ve renk bağlamında karşılaştırılır." },
          { title: "Kaynak tüketimini kalite ve maliyetle bağlar", body: "Su, enerji ve kimyasal tüketimi ürün, parti ve kalite sonucu üzerinden maliyet etkisine bağlanır." },
        ],
        en: [
          { title: "Investigates batch and color deviation through relationships", body: "Lot, recipe, machine and process conditions are compared to find recurring quality patterns." },
          { title: "Tracks lab-to-bulk differences", body: "Lab result, recipe history and bulk production conditions are compared in the same product and color context." },
          { title: "Connects resource use to quality and cost", body: "Water, energy and chemical use are connected to product, batch and quality outcome for cost impact." },
        ],
      },
    },
    {
      id: "plastics",
      anchor: { tr: "plastik", en: "plastics" },
      eyebrow: { tr: "Sektör bağlamı", en: "Sector context" },
      title: { tr: "Plastik ve enjeksiyon", en: "Plastics and injection molding" },
      intro: {
        tr: "Hammadde, renklendirici katkı, yeniden kırılmış malzeme, makine, kalıp, çevrim süresi, kurutma, dozajlama, kusur ve enerji ilişkileri izlenir.",
        en: "Resin, masterbatch, regrind, machine, mold, cycle time, drying, dosing, defect and energy relationships are monitored.",
      },
      clusters: { tr: ["Hammadde", "Katkı", "Yeniden kırılmış malzeme", "Makine", "Kalıp", "Çevrim", "Kurutma ve dozajlama", "Kusur ve enerji"], en: ["Resin", "Masterbatch", "Regrind", "Machine", "Mold", "Cycle", "Drying and dosing", "Defect and energy"] },
      behaviors: {
        tr: [
          { title: "Çevrim kaybını kalite ile birlikte araştırır", body: "Çevrim süresi, süreç parametreleri, makine ve kalıp durumu ile kusur sonuçları aynı araştırmada karşılaştırılır." },
          { title: "Fire nedenini malzeme hazırlığına bağlar", body: "Kurutma, dozajlama ve malzeme karışımı geçmişi makine koşullarıyla birlikte incelenir." },
          { title: "Ürün başına enerji ve maliyet kaçağını gösterir", body: "Enerji, çevrim, fire, malzeme karışımı ve üretim miktarı birlikte okunur." },
        ],
        en: [
          { title: "Investigates cycle loss together with quality", body: "Cycle time, process parameters, machine and mold state are compared with defect outcomes." },
          { title: "Connects scrap cause to material preparation", body: "Drying, dosing and material mix history are examined with machine conditions." },
          { title: "Shows product-level energy and cost leakage", body: "Energy, cycle, scrap, material mix and output are read together." },
        ],
      },
    },
    {
      id: "machinery",
      anchor: { tr: "makine-metal", en: "machinery-metal" },
      eyebrow: { tr: "Sektör bağlamı", en: "Sector context" },
      title: { tr: "Makine ve metal", en: "Machinery and metal" },
      intro: {
        tr: "İş emri, tezgâh, takım, operasyon, hurda, bakım, kalite ve teslim ilişkileri aynı üretim rotasında izlenir.",
        en: "Work orders, machines, tooling, operations, scrap, maintenance, quality and delivery are monitored on the same production route.",
      },
      clusters: { tr: ["İş emri", "Tezgâh", "Takım", "Operasyon", "Hurda", "Bakım", "Kalite", "Teslim"], en: ["Work order", "Machine", "Tooling", "Operation", "Scrap", "Maintenance", "Quality", "Delivery"] },
      behaviors: {
        tr: [
          { title: "Darboğazı rota ve tezgâh bazında ayırır", body: "Bekleme ve çevrim süreleri iş emri rotasıyla birlikte incelenerek gerçek kapasite kaybı bulunur." },
          { title: "Takım ve bakım etkisini kaliteyle bağlar", body: "Takım ömrü, bakım geçmişi ve kalite sonucu aynı operasyon bağlamında karşılaştırılır." },
          { title: "Teslim riskini iş emrine kadar indirir", body: "Gecikme riski hangi operasyon, tezgâh veya malzeme kısıtından geldiğiyle birlikte gösterilir." },
        ],
        en: [
          { title: "Separates bottlenecks by route and machine", body: "Waiting and cycle times are examined with work-order routing to find real capacity loss." },
          { title: "Connects tooling and maintenance to quality", body: "Tool life, maintenance history and quality outcomes are compared in the same operation context." },
          { title: "Drills delivery risk down to the work order", body: "Delivery risk is shown together with the operation, machine or material constraint behind it." },
        ],
      },
    },
    {
      id: "automotive",
      anchor: { tr: "otomotiv-yan-sanayi", en: "automotive-supply" },
      eyebrow: { tr: "Sektör bağlamı", en: "Sector context" },
      title: { tr: "Otomotiv yan sanayi", en: "Automotive supply" },
      intro: {
        tr: "Müşteri programı, parça, kalıp, hat, kalite, teslim, tedarikçi ve kapasite ilişkileri yüksek teslim disiplini içinde birlikte izlenir.",
        en: "Customer schedules, parts, molds, lines, quality, delivery, suppliers and capacity are monitored together under strict delivery requirements.",
      },
      clusters: { tr: ["Müşteri programı", "Parça", "Kalıp", "Hat", "Kalite", "Teslim", "Tedarikçi", "Kapasite"], en: ["Customer schedule", "Part", "Mold", "Line", "Quality", "Delivery", "Supplier", "Capacity"] },
      behaviors: {
        tr: [
          { title: "Program sapmasını erken görünür kılar", body: "Müşteri talebi ile gerçek üretim ve malzeme durumu karşılaştırılarak teslim riski erkenden ayrılır." },
          { title: "Kalite sorununu parça ve proses geçmişine bağlar", body: "Tekrarlayan kusurlar parça, kalıp, hat ve vardiya ilişkileriyle araştırılır." },
          { title: "Tedarik kısıtını kapasite etkisiyle gösterir", body: "Kritik malzeme gecikmesinin hangi hat ve müşteri programını etkileyeceği hesaplanır." },
        ],
        en: [
          { title: "Surfaces schedule deviation early", body: "Customer demand is compared with actual production and material state to identify delivery risk early." },
          { title: "Connects quality issues to part and process history", body: "Recurring defects are investigated through part, mold, line and shift relationships." },
          { title: "Shows supply constraints through capacity impact", body: "A critical material delay is connected to the lines and customer schedules it affects." },
        ],
      },
    },
    {
      id: "food",
      anchor: { tr: "gida-icecek", en: "food-beverage" },
      eyebrow: { tr: "Sektör bağlamı", en: "Sector context" },
      title: { tr: "Gıda ve içecek", en: "Food and beverage" },
      intro: {
        tr: "Parti, reçete, hammadde, son kullanma tarihi, kalite, hat, verim, enerji ve sevkiyat ilişkileri birlikte izlenir.",
        en: "Batch, recipe, raw material, expiry, quality, line, yield, energy and shipment relationships are monitored together.",
      },
      clusters: { tr: ["Parti", "Reçete", "Hammadde", "Son kullanma tarihi", "Kalite", "Hat", "Verim", "Sevkiyat"], en: ["Batch", "Recipe", "Raw material", "Expiry", "Quality", "Line", "Yield", "Shipment"] },
      behaviors: {
        tr: [
          { title: "Verim kaybını parti ve reçeteyle araştırır", body: "Hammadde, reçete, hat koşulu ve çıkan ürün miktarı birlikte incelenir." },
          { title: "Raf ömrü ve stok riskini ilişkilendirir", body: "Son kullanma tarihi yaklaşan stok, satış hızı ve üretim planıyla birlikte değerlendirilir." },
          { title: "Kalite ve sevkiyat etkisini aynı olayda tutar", body: "Kalite sapmasının hangi partileri, siparişleri ve sevkiyatları etkilediği görünür." },
        ],
        en: [
          { title: "Investigates yield loss by batch and recipe", body: "Raw material, recipe, line conditions and output are examined together." },
          { title: "Connects shelf life and inventory risk", body: "Near-expiry inventory is evaluated with sales velocity and production plan." },
          { title: "Keeps quality and shipment impact in the same case", body: "A quality deviation is connected to the batches, orders and shipments it affects." },
        ],
      },
    },
    {
      id: "chemicals",
      anchor: { tr: "kimya", en: "chemicals" },
      eyebrow: { tr: "Sektör bağlamı", en: "Sector context" },
      title: { tr: "Kimya", en: "Chemicals" },
      intro: {
        tr: "Formül, parti, hammadde, proses koşulu, kalite, enerji, güvenlik ve maliyet ilişkileri üretim kaydıyla birlikte izlenir.",
        en: "Formula, batch, raw material, process condition, quality, energy, safety and cost relationships are monitored with production records.",
      },
      clusters: { tr: ["Formül", "Parti", "Hammadde", "Proses", "Kalite", "Enerji", "Güvenlik", "Maliyet"], en: ["Formula", "Batch", "Raw material", "Process", "Quality", "Energy", "Safety", "Cost"] },
      behaviors: {
        tr: [
          { title: "Formül değişimini kalite ve maliyetle bağlar", body: "Reçete veya hammadde değişiminin kalite, verim ve maliyet etkisi geçmiş partilerle karşılaştırılır." },
          { title: "Proses sapmasını parti geçmişinde araştırır", body: "Sıcaklık, süre ve benzeri proses koşulları parti sonucu ve kalite kaydıyla birlikte okunur." },
          { title: "Enerji ve hammadde kaybını görünür kılar", body: "Tüketim değişimleri üretim miktarı ve ürün karmasıyla normalize edilerek anlamlı sapmalar ayrılır." },
        ],
        en: [
          { title: "Connects formula change to quality and cost", body: "Recipe or raw-material changes are compared with historical batches for quality, yield and cost impact." },
          { title: "Investigates process deviation through batch history", body: "Temperature, duration and other process conditions are read with batch outcome and quality records." },
          { title: "Makes energy and material loss visible", body: "Consumption changes are normalized by output and product mix to separate meaningful deviation." },
        ],
      },
    },
    {
      id: "distribution",
      anchor: { tr: "toptan-dagitim", en: "wholesale-distribution" },
      eyebrow: { tr: "Sektör bağlamı", en: "Sector context" },
      title: { tr: "Toptan satış ve dağıtım", en: "Wholesale and distribution" },
      intro: {
        tr: "Müşteri, ürün, sipariş, fiyat, marj, stok, tahsilat ve sevkiyat ilişkileri aynı ticari akış içinde izlenir.",
        en: "Customer, product, order, price, margin, inventory, collection and shipment relationships are monitored in the same commercial flow.",
      },
      clusters: { tr: ["Müşteri", "Ürün", "Sipariş", "Fiyat", "Marj", "Stok", "Tahsilat", "Sevkiyat"], en: ["Customer", "Product", "Order", "Price", "Margin", "Inventory", "Collection", "Shipment"] },
      behaviors: {
        tr: [
          { title: "Müşteri davranışındaki değişimi erken bulur", body: "Sipariş sıklığı, ürün karması, marj ve tahsilat davranışı birlikte izlenir." },
          { title: "Stok ve satış hızını birlikte okur", body: "Stok fazlası ve stok tükenme riski gerçek satış hızı ve sipariş akışıyla değerlendirilir." },
          { title: "Fiyat ve marj kaçağını müşteriye kadar indirir", body: "İndirim, fiyat değişimi ve maliyet etkisi müşteri ve ürün düzeyinde ayrıştırılır." },
        ],
        en: [
          { title: "Finds customer behavior changes early", body: "Order frequency, product mix, margin and collection behavior are monitored together." },
          { title: "Reads inventory with sales velocity", body: "Excess and stockout risk are evaluated with real sales velocity and order flow." },
          { title: "Drills price and margin leakage down to customer", body: "Discount, price change and cost impact are decomposed by customer and product." },
        ],
      },
    },
    {
      id: "logistics",
      anchor: { tr: "lojistik", en: "logistics" },
      eyebrow: { tr: "Sektör bağlamı", en: "Sector context" },
      title: { tr: "Lojistik", en: "Logistics" },
      intro: {
        tr: "Sipariş, araç, rota, kapasite, yük, teslim, gecikme ve maliyet ilişkileri taşıma akışında birlikte izlenir.",
        en: "Order, vehicle, route, capacity, load, delivery, delay and cost relationships are monitored across transport flow.",
      },
      clusters: { tr: ["Sipariş", "Araç", "Rota", "Kapasite", "Yük", "Teslim", "Gecikme", "Maliyet"], en: ["Order", "Vehicle", "Route", "Capacity", "Load", "Delivery", "Delay", "Cost"] },
      behaviors: {
        tr: [
          { title: "Gecikmeyi rota ve kapasite bağlamında araştırır", body: "Teslim sapması araç, rota, yük ve planlanan kapasiteyle birlikte incelenir." },
          { title: "Boş kapasite ve maliyet fırsatını gösterir", body: "Araç doluluğu, rota maliyeti ve sipariş yoğunluğu birlikte okunarak iyileştirme alanları bulunur." },
          { title: "Müşteri etkisini teslim olayına bağlar", body: "Gecikmenin hangi müşteri ve siparişleri etkilediği aynı olay bağlamında görünür." },
        ],
        en: [
          { title: "Investigates delay in route and capacity context", body: "Delivery deviation is examined with vehicle, route, load and planned capacity." },
          { title: "Shows unused capacity and cost opportunity", body: "Vehicle utilization, route cost and order density are read together to find improvement areas." },
          { title: "Connects customer impact to the delivery event", body: "The customers and orders affected by a delay stay visible in the same case context." },
        ],
      },
    },
  ],
  cta: {
    title: { tr: "Kendi şirket bağlamınızı gerçek veriyle görün.", en: "See your own company context with real data." },
    body: {
      tr: "Sektör bağlamı başlangıç noktasıdır. Asıl değer, Dima'nın sizin veri kaynaklarınızdan gerçek varlıkları, ilişkileri ve karar problemlerini çıkarmasıyla oluşur. Pilot için tek bir önemli karar problemi ve onu açıklayan veri yeterlidir.",
      en: "A sector context is only the starting point. The value begins when Dima derives your actual entities, relationships and decision problems from your data. One important decision problem and the data needed to explain it are enough for a pilot.",
    },
    action: { tr: "Canlı demo isteyin", en: "Request a live demo" },
  },
} as const;
