const l = (tr: string, en: string) => ({ tr, en }) as const;

export type BusinessLensId = "executive" | "finance" | "operations" | "teams";

export const businessValue = {
  eyebrow: l("İşletme düzeyinde değer", "Business-level value"),
  title: l("Tek Şirket Beyni, farklı yönetici görünümleri.", "One Company Brain, different management views."),
  intro: l(
    "Aynı olay CEO için öncelik, finans için parasal etki, üretim için kayıp nedeni, ekip için yapılacak iş olarak görünür. Dima bağlamı bölüm sınırında kesmez.",
    "The same event appears as priority to the CEO, financial impact to finance, a loss driver to operations and concrete work to teams. Dima does not break context at department boundaries."
  ),
  roles: [
    {
      id: "executive",
      label: l("Yönetim", "Executive"),
      title: l("Ne şimdi dikkat istiyor?", "What needs attention now?"),
      body: l("Şirket genelindeki risk, fırsat, açık araştırma ve kararları iş etkisine göre tek gündemde sıralar.", "Ranks risks, opportunities, open investigations and decisions across the company by business impact."),
      output: l("Önceliklendirilmiş yönetim gündemi", "Prioritized executive agenda"),
    },
    {
      id: "finance",
      label: l("Finans", "Finance"),
      title: l("Bunun para etkisi ne?", "What is the financial impact?"),
      body: l("Nakit, marj, çalışma sermayesi, bütçe ve müşteri etkisini aynı olayla ilişkilendirir.", "Connects cash, margin, working capital, budget and customer impact to the same event."),
      output: l("Finansal etki, seçenek ve varsayımlar", "Financial impact, options and assumptions"),
    },
    {
      id: "operations",
      label: l("Operasyon", "Operations"),
      title: l("Nerede kaybediyoruz ve neden?", "Where are we losing and why?"),
      body: l("Makine, sipariş, vardiya, bakım, kalite ve malzeme ilişkilerini araştırarak kaybın nedenini ortaya çıkarır.", "Investigates machine, order, shift, maintenance, quality and material relationships to explain the loss."),
      output: l("Kanıtlı neden ve operasyon seçeneği", "Evidence-backed cause and operating option"),
    },
    {
      id: "teams",
      label: l("Ekipler", "Teams"),
      title: l("Şimdi ne yapılacak?", "What happens next?"),
      body: l("Kararı görev, e-posta, teklif isteği, iş emri veya onay akışına dönüştürür; sonucu yeniden izlemeye alır.", "Turns the decision into a task, message, quote request, work order or approval flow and watches the outcome."),
      output: l("Sorumlu, eylem ve sonuç takibi", "Owner, action and outcome tracking"),
    },
  ] as const,
  example: {
    label: l("Aynı olay, dört görünüm", "One event, four views"),
    signal: l("Hat 3 performansı hedefin %11 altında", "Line 3 performance is 11% below target"),
    nodes: [
      { label: l("Üretim", "Manufacturing"), value: l("OEE ve bakım nedeni", "OEE and maintenance cause") },
      { label: l("Satış", "Sales"), value: l("2 sipariş termin riski", "2 orders at delivery risk") },
      { label: l("Finans", "Finance"), value: l("184 bin TL tahmini etki", "TRY 184k estimated impact") },
      { label: l("Yönetim", "Executive"), value: l("3 karar seçeneği", "3 decision options") },
    ],
  },
} as const;
