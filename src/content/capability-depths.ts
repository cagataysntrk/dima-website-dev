import type { L } from "./types";

export type CapabilityDepthId = "management" | "finance" | "manufacturing";

export interface CapabilityItem {
  title: L;
  body: L;
  example: L;
}

export interface CapabilityDepth {
  id: CapabilityDepthId;
  eyebrow: L;
  title: L;
  intro: L;
  question: L;
  items: readonly CapabilityItem[];
}

export const capabilityDepths = [
  {
    id: "management",
    eyebrow: { tr: "Yönetim ve günlük işletim", en: "Management and daily operations" },
    title: { tr: "Yönetici neye bakacağını aramak zorunda kalmaz.", en: "Management does not have to hunt for what deserves attention." },
    intro: {
      tr: "Dima şirketin gündemini veriden çıkarır. Günün önemli değişimlerini öne getirir, araştırılması gerekenleri ayırır, karar bekleyen işleri toplar ve sonucu aynı şirket hafızasına bağlar.",
      en: "Dima derives the company agenda from data. It surfaces important changes, separates what needs investigation, gathers decisions that need attention and connects outcomes back to company memory.",
    },
    question: { tr: "Yönetici Dima'da ne görür?", en: "What does management see in Dima?" },
    items: [
      {
        title: { tr: "Günün özeti ve dikkat listesi", en: "Daily brief and attention list" },
        body: {
          tr: "Dağınık raporları tek tek açmak yerine önemli riskler, fırsatlar, gecikmeler ve karar bekleyen işler öncelik sırasıyla görünür.",
          en: "Instead of opening scattered reports one by one, important risks, opportunities, delays and pending decisions are ranked by priority.",
        },
        example: { tr: "Örnek: Nakit baskısı, teslim riski ve üretim kaybı aynı sabah özetinde.", en: "Example: Cash pressure, delivery risk and production loss in one morning brief." },
      },
      {
        title: { tr: "Şirket radarı", en: "Company radar" },
        body: {
          tr: "Dima normal davranışı izler. Anlamlı bir sapma oluştuğunda yalnız alarm üretmez, hangi iş alanı ve varlıkların etkilendiğini de gösterir.",
          en: "Dima monitors normal behavior. When a meaningful deviation appears, it shows which business domains and entities are affected rather than producing an isolated alert.",
        },
        example: { tr: "Örnek: Satış aynı görünürken sipariş karmasının marjı bozması.", en: "Example: Sales look stable while order mix erodes margin." },
      },
      {
        title: { tr: "Araştırma ve neden bulma", en: "Investigation and cause finding" },
        body: {
          tr: "Bir bulgu seçildiğinde dönem, kaynak, ilişkili kayıtlar, geçmiş örüntü ve olası nedenler aynı çalışma alanında incelenir.",
          en: "When a finding is selected, period, sources, related records, historical pattern and candidate causes are investigated in one workspace.",
        },
        example: { tr: "Örnek: Geciken teslimin kapasite, bakım ve malzeme etkisini ayırmak.", en: "Example: Separate capacity, maintenance and material effects behind a late delivery." },
      },
      {
        title: { tr: "Karar seçenekleri ve senaryolar", en: "Decision options and scenarios" },
        body: {
          tr: "Tek bir öneriyi mutlak doğru gibi sunmak yerine seçenekleri, kısıtları, varsayımları ve beklenen etkileri karşılaştırmaya hazırlar.",
          en: "Instead of presenting one recommendation as absolute truth, Dima prepares options with constraints, assumptions and expected impact for comparison.",
        },
        example: { tr: "Örnek: Üretim sırasını değiştirmenin termin ve maliyet etkisini karşılaştırmak.", en: "Example: Compare delivery and cost impact of changing production sequence." },
      },
      {
        title: { tr: "Varlık 360", en: "Entity 360" },
        body: {
          tr: "Müşteri, tedarikçi, makine, ürün veya sipariş tek kayıt olarak değil, sinyalleri, araştırmaları, kararları, görevleri ve geçmişiyle birlikte görülür.",
          en: "A customer, supplier, machine, product or order is viewed together with its signals, investigations, decisions, tasks and history.",
        },
        example: { tr: "Örnek: Bir müşteride sipariş, marj, tahsilat ve açık kararların tek bağlamda görülmesi.", en: "Example: Orders, margin, collections and open decisions for one customer in a single context." },
      },
      {
        title: { tr: "Sonuç ve karar hafızası", en: "Outcome and decision memory" },
        body: {
          tr: "Karar verildiğinde neden verildiği, kim uyguladı, ne oldu ve hangi varsayımın doğru çıktığı kaybolmaz. Bir sonraki benzer olay bu geçmişten beslenir.",
          en: "Once a decision is made, its rationale, owner, outcome and validated assumptions remain available and inform the next similar case.",
        },
        example: { tr: "Örnek: Geçen ay işe yarayan tahsilat müdahalesinin yeni riskli müşteride hatırlanması.", en: "Example: Reuse the collection intervention that worked last month for a newly risky account." },
      },
    ],
  },
  {
    id: "finance",
    eyebrow: { tr: "Muhasebe ve finans", en: "Accounting and finance" },
    title: { tr: "Raporu değil, paranın neden değiştiğini açıklar.", en: "It explains why the money changed, not just what the report says." },
    intro: {
      tr: "Nakit, tahsilat, cari hesap, ödeme, fatura, mutabakat, maliyet, bütçe, kapanış ve stok etkileri aynı ilişkiler ağı içinde okunur.",
      en: "Cash, collections, receivables, payments, invoices, reconciliation, cost, budget, close and inventory effects are read in one relationship network.",
    },
    question: { tr: "Finans ekibi Dima'da ne yapar?", en: "What does the finance team do in Dima?" },
    items: [
      {
        title: { tr: "Nakit ve tahsilat önceliği", en: "Cash and collection priority" },
        body: {
          tr: "Açık faturayı tek başına sıralamaz. Ödeme geçmişi, sipariş davranışı, vade, banka hareketi ve müşteri ilişkisini birlikte okuyarak gerçekten riskli tahsilatları ayırır.",
          en: "It does not rank open invoices alone. Payment history, order behavior, due dates, bank movements and customer relationships are read together to separate real collection risk.",
        },
        example: { tr: "Örnek: Bu hafta hangi üç müşteriye önce müdahale edilmeli?", en: "Example: Which three customers should be addressed first this week?" },
      },
      {
        title: { tr: "Marj değişiminin nedenleri", en: "Drivers of margin change" },
        body: {
          tr: "Fiyat, hacim, ürün karması, hammadde, fire, indirim ve müşteri yapısının marja etkisini ayrıştırır.",
          en: "It separates the effects of price, volume, mix, raw material, scrap, discount and customer composition on margin.",
        },
        example: { tr: "Örnek: Brüt kâr düştü. Fiyat mı, ürün karması mı, fire mi etkili?", en: "Example: Gross profit fell. Was the driver price, product mix or scrap?" },
      },
      {
        title: { tr: "Mutabakat ve kapanış araştırması", en: "Reconciliation and close investigation" },
        body: {
          tr: "Banka, muhasebe ve işletme kayıtları arasındaki farkı listelemekle kalmaz. Farkı ilgili fatura, müşteri, ödeme ve döneme bağlayarak neden araştırmasına dönüştürür.",
          en: "It does more than list differences across bank, accounting and operational records. It connects them to the relevant invoice, customer, payment and period for investigation.",
        },
        example: { tr: "Örnek: Banka ile cari hesap arasındaki fark hangi işlemlerden oluşuyor?", en: "Example: Which transactions explain the difference between bank and receivables?" },
      },
      {
        title: { tr: "Bütçe, kur ve maliyet senaryoları", en: "Budget, FX and cost scenarios" },
        body: {
          tr: "Bütçe sapmasını dönem ve hesap kırılımında gösterir, ardından kur veya maliyet şokunun nakit ve kârlılık etkisini karşılaştırmaya hazırlar.",
          en: "It shows budget variance by period and account, then prepares comparison of cash and profitability impact under FX or cost shocks.",
        },
        example: { tr: "Örnek: Kur yüzde 8 daha yükselirse hangi ürün ve ödemeler etkilenir?", en: "Example: Which products and payments are affected if FX rises another 8 percent?" },
      },
      {
        title: { tr: "İşletme sermayesi ve stok etkisi", en: "Working capital and inventory impact" },
        body: {
          tr: "Stok fazlası, yavaş dönen ürün, tedarikçi vadesi ve tahsilat süresini birlikte okuyarak nakdin nerede bağlı kaldığını gösterir.",
          en: "It reads excess inventory, slow movers, supplier terms and collection time together to show where cash is tied up.",
        },
        example: { tr: "Örnek: Hangi stok kalemleri nakdi gereksiz yere bağlıyor?", en: "Example: Which inventory items are unnecessarily tying up cash?" },
      },
      {
        title: { tr: "Anomali ve ödeme denetimi", en: "Anomaly and payment control" },
        body: {
          tr: "Mükerrer ödeme, sıra dışı tutar, beklenmeyen tedarikçi davranışı veya dönem dışı hareketleri kanıtlarıyla incelemeye hazırlar.",
          en: "It prepares duplicate payments, unusual amounts, unexpected supplier behavior or out-of-period movements for evidence-based investigation.",
        },
        example: { tr: "Örnek: Aynı faturaya bağlı iki ödeme gerçekten mükerrer mi?", en: "Example: Are two payments tied to the same invoice actually duplicates?" },
      },
    ],
  },
  {
    id: "manufacturing",
    eyebrow: { tr: "Üretim ve operasyon", en: "Manufacturing and operations" },
    title: { tr: "OEE göstermekle kalmaz, kaybın nereden geldiğini araştırır.", en: "It does not stop at OEE. It investigates where the loss comes from." },
    intro: {
      tr: "Makine, hat, ürün, sipariş, vardiya, bakım, kalite, malzeme, kapasite, enerji ve maliyet aynı üretim bağlamında izlenir.",
      en: "Machines, lines, products, orders, shifts, maintenance, quality, materials, capacity, energy and cost are monitored in one manufacturing context.",
    },
    question: { tr: "Üretim ekibi Dima'da ne görür?", en: "What does the production team see in Dima?" },
    items: [
      {
        title: { tr: "Tesisin bugünkü durumu", en: "Plant today" },
        body: {
          tr: "Hatları yalnız renkli durum kartlarıyla göstermez. Teslim, kapasite, kalite, bakım ve maliyet etkisi olan değişimleri önceliklendirir.",
          en: "It does not reduce lines to status cards. Changes with delivery, capacity, quality, maintenance or cost impact are prioritized.",
        },
        example: { tr: "Örnek: Bugün hangi hat yönetici müdahalesi gerektiriyor ve neden?", en: "Example: Which line needs management attention today and why?" },
      },
      {
        title: { tr: "OEE ve kayıp ayrıştırma", en: "OEE and loss decomposition" },
        body: {
          tr: "Kullanılabilirlik, performans ve kalite kaybını ürün, vardiya, sipariş ve makine bağlamında kırarak hangi kaybın baskın olduğunu gösterir.",
          en: "Availability, performance and quality loss are broken down by product, shift, order and machine to show the dominant loss.",
        },
        example: { tr: "Örnek: Hat 3 neden hedefin altında? Hız mı, duruş mu, kalite mi?", en: "Example: Why is Line 3 below target? Speed, downtime or quality?" },
      },
      {
        title: { tr: "Fire ve yeniden işleme araştırması", en: "Scrap and rework investigation" },
        body: {
          tr: "Fire artışını ürün, reçete, lot, makine, malzeme ve proses değişimleriyle karşılaştırır. Üretim kaybını maliyet etkisine bağlar.",
          en: "Scrap increase is compared with product, recipe, lot, machine, material and process changes and connected to cost impact.",
        },
        example: { tr: "Örnek: Son üç vardiyadaki fire artışı hangi ortak koşulda oluştu?", en: "Example: What common condition explains the scrap increase across the last three shifts?" },
      },
      {
        title: { tr: "Duruş ve bakım kanıtı", en: "Downtime and maintenance evidence" },
        body: {
          tr: "Duruş kaydı ile bakım geçmişini, arıza türünü, operatör ve ürün bağlamını birlikte okuyarak kök neden adaylarını sıralar.",
          en: "Downtime records are read with maintenance history, failure type, operator and product context to rank cause candidates.",
        },
        example: { tr: "Örnek: M3 makinesindeki beklenmeyen duruşlar aynı arıza örüntüsüne mi bağlı?", en: "Example: Do unexpected stops on machine M3 share the same failure pattern?" },
      },
      {
        title: { tr: "Plan, kapasite ve sıralama", en: "Plan, capacity and sequencing" },
        body: {
          tr: "Sipariş önceliği, makine uygunluğu, malzeme, değişim süresi ve teslim tarihini birlikte değerlendirerek sıralama seçeneklerini karşılaştırır.",
          en: "Order priority, machine eligibility, material, changeover time and delivery date are evaluated together to compare sequencing options.",
        },
        example: { tr: "Örnek: Hangi sıra değişikliği gecikme riskini en çok azaltır?", en: "Example: Which sequence change reduces delivery risk the most?" },
      },
      {
        title: { tr: "Vardiya devri ve kurumsal hafıza", en: "Shift handover and operational memory" },
        body: {
          tr: "Açık sorun, uygulanan müdahale, beklenen kontrol ve sorumlu kişi vardiya değişiminde kaybolmaz. Sonuç daha sonra aynı makine ve olaya bağlanır.",
          en: "Open issues, interventions, expected checks and owners survive shift changes. Outcomes are later linked back to the same machine and event.",
        },
        example: { tr: "Örnek: Gece vardiyasına hangi üç konu ve hangi kontrol adımı devredilmeli?", en: "Example: Which three issues and checks should be handed to the night shift?" },
      },
    ],
  },
] as const satisfies readonly CapabilityDepth[];

export const capabilityDepthsCopy = {
  eyebrow: { tr: "Dima işin içine nasıl girer?", en: "How Dima enters the work" },
  title: { tr: "Aynı Şirket Beyni, farklı işlerde daha derine iner.", en: "One Company Brain, deeper in different kinds of work." },
  intro: {
    tr: "Aşağıdaki yüzeyler ayrı ürünler değildir. Aynı şirket haritası, sinyal, araştırma, karar ve sonuç zinciri; yöneticinin, finans ekibinin ve üretim ekibinin günlük işine göre farklı ayrıntılar gösterir.",
    en: "These surfaces are not separate products. The same company map, signal, investigation, decision and outcome chain exposes different detail for management, finance and manufacturing work.",
  },
  selectLabel: { tr: "İş alanı seçin", en: "Choose a work area" },
  exampleLabel: { tr: "Somut örnek", en: "Concrete example" },
} as const;
