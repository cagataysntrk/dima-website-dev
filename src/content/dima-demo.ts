import type { Locale } from "@/i18n/routing";
import type { L } from "./types";

/**
 * The scripted chat demo under "Our products" (D-040): a simplified copy of the product's chat
 * screen (dima/frontend/apps/metabase-poc, ChatView), answering four prepared questions on a
 * sample dye house's data. Nothing here is a customer or a measurement: every company name is
 * a D-023 fixture (Örnek…, Deneme…, Numune…) and the whole panel is labelled sample data.
 *
 * Answers are paragraphs; a line that starts with "- " is a list item, and **…** is bold. The
 * step texts mirror the product's own events (server/chat/agent.ts). SQL writes `<>`, never an
 * exclamation mark (tests/content.test.ts).
 */

export type ScenarioId = "customers" | "production" | "downtime" | "oee";

export interface ChatScenario {
  id: ScenarioId;
  /** The chat's name in the sidebar, as the product titles a conversation. */
  title: L;
  question: L;
  /**
   * Normalised (lower case, no diacritics) words that route a typed question here. Both
   * languages. Topic words only — a generic "neden"/"why" would outvote the topic.
   */
  keywords: string[];
  /** Tables the schema step reports reading. */
  tables: number;
  answer: L<string[]>;
  sql: string;
  result: {
    kind: "bar" | "line";
    caption: L;
    columns: L<[string, string]>;
    /** How a value reads, `{v}` standing for the number. */
    unit: L;
    rows: { label: L; value: number }[];
  };
  source: { cube: string; took: L };
  followUps: ScenarioId[];
}

export const chatDemoCopy = {
  title: { tr: "Dima'ya bir soru sorun", en: "Ask Dima a question" },
  subtitle: {
    tr: "Dima'nın sohbet ekranının sade bir kopyası, örnek bir boyahanenin verisiyle. Yanıtlar önceden hazırlandı; gerçek kurulumda aynı akış sizin tablolarınız üzerinde çalışır.",
    en: "A simplified copy of Dima's chat screen, running on a sample dye house's data. The answers are prepared in advance; in a real installation the same flow runs on your own tables.",
  },
  sampleData: { tr: "Örnek veri", en: "Sample data" },
  /** The product's app chrome, as in the PoC's AppSidebar and top bar. Fixture names per D-023. */
  shell: {
    newChat: { tr: "Yeni sohbet", en: "New chat" },
    attachments: { tr: "Ekler", en: "Attachments" },
    data: { tr: "Veri", en: "Data" },
    chats: { tr: "Sohbetler", en: "Chats" },
    search: { tr: "Ara", en: "Search" },
    toggleSidebar: { tr: "Kenar çubuğu", en: "Sidebar" },
    closeSidebar: { tr: "Kenar çubuğunu kapat", en: "Close sidebar" },
    start: { tr: "Başlangıç", en: "Getting started" },
    user: { tr: "Örnek Kullanıcı", en: "Sample User" },
    company: { tr: "Örnek Boyahane", en: "Sample Dye House" },
  },
  emptyTitle: { tr: "Verinize sorun", en: "Ask your data" },
  emptyBody: {
    tr: "{company} verisi üzerinde doğal dilde soru sorun; yanıt, grafik ve kullanılan sorguyla gelsin.",
    en: "Ask {company}'s data a question in plain language; the answer comes with a chart and the query behind it.",
  },
  startersLabel: { tr: "Örnek sorular", en: "Sample questions" },
  composerLabel: { tr: "Sorunuz", en: "Your question" },
  placeholder: { tr: "Verinize bir soru sorun…", en: "Ask your data a question…" },
  send: { tr: "Gönder", en: "Send" },
  stop: { tr: "Durdur", en: "Stop" },
  depthNormal: { tr: "Normal analiz", en: "Standard analysis" },
  attach: { tr: "Dosyaları sohbete ekle", en: "Add files to the chat" },
  dictation: { tr: "Sesle yaz", en: "Dictate" },
  you: { tr: "Siz", en: "You" },
  thinking: { tr: "Veriye bakılıyor…", en: "Looking at the data…" },
  thought: { tr: "{seconds} sn düşündü", en: "Thought for {seconds} s" },
  stopped: { tr: "Durduruldu.", en: "Stopped." },
  nextUp: { tr: "Şunu da sorabilirsiniz", en: "You could also ask" },
  chart: { tr: "grafik", en: "chart" },
  table: { tr: "tablo", en: "table" },
  chartType: { tr: "Grafik türü", en: "Chart type" },
  chartTypes: {
    bar: { tr: "Sütun", en: "Column" },
    hbar: { tr: "Yatay sütun", en: "Horizontal bar" },
    line: { tr: "Çizgi", en: "Line" },
  },
  addToDashboard: { tr: "Panoya ekle", en: "Add to dashboard" },
  saveAnalysis: { tr: "Analiz olarak kaydet", en: "Save as analysis" },
  saved: { tr: "Kaydedildi", en: "Saved" },
  showSql: { tr: "Sorguyu göster", en: "Show query" },
  working: { tr: "Yanıt hazırlanıyor", en: "Preparing the answer" },
  ready: { tr: "Yanıt hazır", en: "Answer ready" },
  rows: { tr: "{n} satır", en: "{n} rows" },
  steps: {
    schema: { tr: "Veri şeması okunuyor", en: "Reading the data schema" },
    schemaDone: { tr: "Veri şeması okundu · {n} tablo", en: "Data schema read · {n} tables" },
    write: { tr: "Sorgu yazılıyor", en: "Writing the query" },
    writeDone: { tr: "Sorgu yazıldı", en: "Query written" },
    run: { tr: "Sorgu çalıştırılıyor", en: "Running the query" },
    runDone: { tr: "Sorgu çalıştı · {n} satır", en: "Query ran · {n} rows" },
  },
  /** A typed question none of the scenarios matches. */
  fallback: {
    tables: 14,
    answer: {
      tr: [
        "Bu demo, örnek veri setinde yalnızca aşağıdaki dört soruyu yanıtlıyor. Birini seçin ya da benzer bir soru yazın.",
        "Gerçek kurulumda Dima, tablolarınızdaki her soruyu aynı akışla yanıtlar: şemayı okur, sorguyu yazar, çalıştırır ve sonucu kaynağıyla gösterir.",
      ],
      en: [
        "This demo answers only the four questions below on its sample data. Pick one, or type a similar question.",
        "In a real installation Dima answers any question about your tables the same way: it reads the schema, writes the query, runs it and shows the result with its source.",
      ],
    },
  } satisfies { tables: number; answer: L<string[]> },
  scenarios: [
    {
      id: "customers",
      title: { tr: "En yüksek cirolu müşteriler", en: "Top customers by revenue" },
      question: { tr: "Geçen yıl en yüksek cirolu 5 müşteri kim?", en: "Who were our top 5 customers by revenue last year?" },
      keywords: ["musteri", "customer", "client", "ciro", "revenue", "sales", "satis", "top 5", "ilk 5"],
      tables: 14,
      answer: {
        tr: [
          "2025'te en yüksek ciroyu **Örnek Tekstil A.Ş.** getirdi: **48,6 mn ₺**, yıllık cironun %15,6'sı.",
          "- İlk beş müşteri birlikte **180,9 mn ₺** ile toplam cironun **%57,9**'unu oluşturuyor.",
          "- Beşinci sıradaki Deneme Ev Tekstili, birinci müşterinin yaklaşık yarısı kadar ciro getiriyor.",
        ],
        en: [
          "In 2025 the highest revenue came from **Örnek Tekstil A.Ş.**: **₺48.6m**, 15.6% of the year's revenue.",
          "- Together the top five customers brought in **₺180.9m**, **57.9%** of total revenue.",
          "- Deneme Ev Tekstili, in fifth place, brings in about half as much as the first customer.",
        ],
      },
      sql: [
        "SELECT m.musteri_adi, ROUND(SUM(f.tutar) / 1e6, 1) AS ciro_mn_tl",
        "FROM faturalar f",
        "JOIN musteriler m ON m.id = f.musteri_id",
        "WHERE f.fatura_tarihi >= DATE '2025-01-01'",
        "  AND f.fatura_tarihi < DATE '2026-01-01'",
        "  AND f.durum <> 'iptal'",
        "GROUP BY m.musteri_adi",
        "ORDER BY ciro_mn_tl DESC",
        "LIMIT 5;",
      ].join("\n"),
      result: {
        kind: "bar",
        caption: { tr: "2025 cirosu, ilk 5 müşteri", en: "2025 revenue, top 5 customers" },
        columns: { tr: ["Müşteri", "Ciro (mn ₺)"], en: ["Customer", "Revenue (₺m)"] },
        unit: { tr: "{v} mn ₺", en: "₺{v}m" },
        rows: [
          { label: { tr: "Örnek Tekstil A.Ş.", en: "Örnek Tekstil A.Ş." }, value: 48.6 },
          { label: { tr: "Deneme Konfeksiyon Ltd.", en: "Deneme Konfeksiyon Ltd." }, value: 41.2 },
          { label: { tr: "Numune Örme San.", en: "Numune Örme San." }, value: 36.9 },
          { label: { tr: "Örnek Boya Kimya A.Ş.", en: "Örnek Boya Kimya A.Ş." }, value: 29.4 },
          { label: { tr: "Deneme Ev Tekstili", en: "Deneme Ev Tekstili" }, value: 24.8 },
        ],
      },
      source: { cube: "satis.faturalar", took: { tr: "0,6 sn", en: "0.6 s" } },
      followUps: ["production", "oee"],
    },
    {
      id: "production",
      title: { tr: "Aylık üretim trendi", en: "Monthly production trend" },
      question: { tr: "Aylık üretim nasıl bir trend izliyor?", en: "How is monthly production trending?" },
      keywords: ["uretim", "production", "output", "aylik", "monthly", "trend", "ton"],
      tables: 14,
      answer: {
        tr: [
          "Aylık üretim **Mart–Haziran 2026** arasında zirve yaptı; en yüksek ay **Mayıs: 468 ton**.",
          "- Son 12 ayın ortalaması **427 ton**.",
          "- Ağustos'taki 389 ton, Mayıs'a göre **%16,9 düşük**. Benzer bir düşüş Aralık'ta da var; iki dönem de bakım ve izin dönemleriyle örtüşüyor olabilir.",
        ],
        en: [
          "Monthly production peaked between **March and June 2026**; the highest month was **May: 468 t**.",
          "- The average over the last 12 months is **427 t**.",
          "- August's 389 t is **16.9% below** May. December shows a similar dip; both may coincide with maintenance and holiday periods.",
        ],
      },
      sql: [
        "SELECT DATE_TRUNC('month', u.uretim_tarihi) AS ay,",
        "       ROUND(SUM(u.net_kg) / 1000) AS ton",
        "FROM uretim_kayitlari u",
        "WHERE u.uretim_tarihi >= DATE '2025-09-01'",
        "  AND u.uretim_tarihi < DATE '2026-09-01'",
        "GROUP BY ay",
        "ORDER BY ay;",
      ].join("\n"),
      result: {
        kind: "line",
        caption: { tr: "Aylık net üretim, Eylül 2025 – Ağustos 2026", en: "Monthly net production, September 2025 – August 2026" },
        columns: { tr: ["Ay", "Üretim (ton)"], en: ["Month", "Production (t)"] },
        unit: { tr: "{v} ton", en: "{v} t" },
        rows: [
          { label: { tr: "Eyl 25", en: "Sep 25" }, value: 412 },
          { label: { tr: "Eki 25", en: "Oct 25" }, value: 431 },
          { label: { tr: "Kas 25", en: "Nov 25" }, value: 426 },
          { label: { tr: "Ara 25", en: "Dec 25" }, value: 398 },
          { label: { tr: "Oca 26", en: "Jan 26" }, value: 405 },
          { label: { tr: "Şub 26", en: "Feb 26" }, value: 418 },
          { label: { tr: "Mar 26", en: "Mar 26" }, value: 447 },
          { label: { tr: "Nis 26", en: "Apr 26" }, value: 452 },
          { label: { tr: "May 26", en: "May 26" }, value: 468 },
          { label: { tr: "Haz 26", en: "Jun 26" }, value: 459 },
          { label: { tr: "Tem 26", en: "Jul 26" }, value: 421 },
          { label: { tr: "Ağu 26", en: "Aug 26" }, value: 389 },
        ],
      },
      source: { cube: "uretim.kayitlar", took: { tr: "0,8 sn", en: "0.8 s" } },
      followUps: ["downtime", "customers"],
    },
    {
      id: "downtime",
      title: { tr: "Makine duruşları ve nedenleri", en: "Machine downtime and causes" },
      question: { tr: "Hangi makinede en çok duruş var ve neden?", en: "Which machine stops the most, and why?" },
      keywords: ["durus", "downtime", "ariza", "breakdown", "stoppage", "stops", "stop"],
      tables: 14,
      answer: {
        tr: [
          "Son 90 günde en çok plansız duruş **Ram 2**'de: **64,5 saat**, tüm duruşların %33,0'ı.",
          "- Ram 2'deki duruşun en büyük nedeni **zincir ve iğne arızası: 27 saat** (%41,9).",
          "- İkinci sıradaki Jet Boya 3'te duruşun çoğu **reçete bekleme** kaynaklı; bu bir makine değil, planlama sorunu.",
        ],
        en: [
          "Over the last 90 days the most unplanned downtime was on **Stenter 2**: **64.5 hours**, 33.0% of all stoppages.",
          "- The largest cause on Stenter 2 is **chain and pin failure: 27 hours** (41.9%).",
          "- On Jet Dyeing 3, second on the list, most of the downtime is **waiting for recipes**: a planning problem, not a machine one.",
        ],
      },
      sql: [
        "SELECT m.makine_adi, ROUND(SUM(d.sure_dk) / 60.0, 1) AS durus_saat",
        "FROM durus_kayitlari d",
        "JOIN makineler m ON m.id = d.makine_id",
        "WHERE d.baslangic >= CURRENT_DATE - INTERVAL '90 days'",
        "  AND d.planli = false",
        "GROUP BY m.makine_adi",
        "ORDER BY durus_saat DESC;",
      ].join("\n"),
      result: {
        kind: "bar",
        caption: { tr: "Plansız duruş, son 90 gün", en: "Unplanned downtime, last 90 days" },
        columns: { tr: ["Makine", "Duruş (saat)"], en: ["Machine", "Downtime (h)"] },
        unit: { tr: "{v} sa", en: "{v} h" },
        rows: [
          { label: { tr: "Ram 2", en: "Stenter 2" }, value: 64.5 },
          { label: { tr: "Jet Boya 3", en: "Jet Dyeing 3" }, value: 48 },
          { label: { tr: "Ram 1", en: "Stenter 1" }, value: 31.5 },
          { label: { tr: "Jet Boya 1", en: "Jet Dyeing 1" }, value: 22 },
          { label: { tr: "Kurutma 1", en: "Dryer 1" }, value: 17.5 },
          { label: { tr: "Şardon", en: "Raising machine" }, value: 12 },
        ],
      },
      source: { cube: "uretim.duruslar", took: { tr: "0,5 sn", en: "0.5 s" } },
      followUps: ["oee", "production"],
    },
    {
      id: "oee",
      title: { tr: "Makine bazında ortalama OEE", en: "Average OEE per machine" },
      question: { tr: "Makine bazında ortalama OEE nedir?", en: "What is the average OEE per machine?" },
      keywords: ["oee", "verimlilik", "efficiency", "kullanilabilirlik", "availability", "performans", "performance"],
      tables: 14,
      answer: {
        tr: [
          "Son 90 günün ortalama OEE'si **%69,2**. En yüksek **Ram 1 (%78,4)**, en düşük **Ram 2 (%58,7)**.",
          "- Ram 2'nin düşük OEE'si büyük ölçüde **kullanılabilirlik** kaybından geliyor; en çok plansız duruş da bu makinede.",
          "- Ram 1 ile Ram 2 arasındaki **19,7 puanlık** fark, aynı tip iki makine arasında.",
        ],
        en: [
          "The average OEE over the last 90 days is **69.2%**. Highest is **Stenter 1 (78.4%)**, lowest **Stenter 2 (58.7%)**.",
          "- Stenter 2's low OEE comes largely from lost **availability**; it is also the machine with the most unplanned downtime.",
          "- The **19.7-point** gap between Stenter 1 and Stenter 2 is between two machines of the same type.",
        ],
      },
      sql: [
        "SELECT m.makine_adi,",
        "       ROUND(AVG(o.kullanilabilirlik * o.performans * o.kalite) * 100, 1) AS oee_yuzde",
        "FROM oee_gunluk o",
        "JOIN makineler m ON m.id = o.makine_id",
        "WHERE o.tarih >= CURRENT_DATE - INTERVAL '90 days'",
        "GROUP BY m.makine_adi",
        "ORDER BY oee_yuzde DESC;",
      ].join("\n"),
      result: {
        kind: "bar",
        caption: { tr: "Ortalama OEE, son 90 gün", en: "Average OEE, last 90 days" },
        columns: { tr: ["Makine", "OEE (%)"], en: ["Machine", "OEE (%)"] },
        unit: { tr: "%{v}", en: "{v}%" },
        rows: [
          { label: { tr: "Ram 1", en: "Stenter 1" }, value: 78.4 },
          { label: { tr: "Jet Boya 1", en: "Jet Dyeing 1" }, value: 74.1 },
          { label: { tr: "Kurutma 1", en: "Dryer 1" }, value: 71.6 },
          { label: { tr: "Şardon", en: "Raising machine" }, value: 69.8 },
          { label: { tr: "Jet Boya 3", en: "Jet Dyeing 3" }, value: 62.3 },
          { label: { tr: "Ram 2", en: "Stenter 2" }, value: 58.7 },
        ],
      },
      source: { cube: "uretim.oee_gunluk", took: { tr: "0,4 sn", en: "0.4 s" } },
      followUps: ["downtime", "customers"],
    },
  ] satisfies ChatScenario[],
};

type Localize<T> = T extends L<infer U> ? U : T extends readonly (infer I)[] ? Localize<I>[] : T extends object ? { [K in keyof T]: Localize<T[K]> } : T;

const isL = (v: unknown): v is L<unknown> =>
  !!v && typeof v === "object" && !Array.isArray(v) && Object.keys(v).sort().join(",") === "en,tr";

function localize<T>(node: T, locale: Locale): Localize<T> {
  if (isL(node)) return node[locale] as Localize<T>;
  if (Array.isArray(node)) return node.map((n) => localize(n, locale)) as Localize<T>;
  if (node && typeof node === "object") {
    return Object.fromEntries(Object.entries(node).map(([k, v]) => [k, localize(v, locale)])) as Localize<T>;
  }
  return node as Localize<T>;
}

/** The demo's copy in one language — what the client component receives. */
export const chatDemoFor = (locale: Locale) => localize(chatDemoCopy, locale);
export type ChatDemoCopy = ReturnType<typeof chatDemoFor>;
export type LocalScenario = ChatDemoCopy["scenarios"][number];
