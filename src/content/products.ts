import type { L, Point } from "./types";

/**
 * Active customer-facing product registry.
 *
 * Brand House V1.6 defines one master brand and one active product: Dima. Historical Upcy
 * products remain available in the upstream organization repository/archive; they are not
 * active entries in this public Dima website model.
 */

/** A design-system brand. Rendered as `data-brand` on the product's block. */
export type BrandKey = "dima";

export interface Product {
  /** Stable key for React and tests. Never shown; survives a rename. */
  id: string;
  /** Display name. */
  name: string;
  /** In-page anchor on the portfolio page. */
  slug: string;
  brandKey: BrandKey;
  /** Whether the product has its own site. */
  hasOwnSite: boolean;
  /** Its canonical URL. */
  domain?: string;
  /** Current detail depth retained for the existing reusable ProductBlock contract. */
  depth: "handoff" | "standalone" | "landing";
  category: L;
  /** One line for the home page index (design-system corporate house, §3). */
  oneLiner: L;
  matrix: { problem: L; audience: L };
  title: L;
  problem: L<string[]>;
  capabilities: L<Point[]>;
  /** A paragraph after the capabilities: delivery model, or a roadmap line stated as roadmap. */
  note?: L;
  audience: L<string[]>;
  cta: L;
  /**
   * Interface screenshots for the home page's product wheel (public/products). A missing one
   * renders a visible [COPY NEEDED] inside the mockup: never a drawn stand-in. The analytics
   * product's pair is the real PoC in its dark theme, captured by `bun run capture:screens`
   * (D-041).
   */
  screens?: { desktop?: string; mobile?: string };
  /** Optional legacy-compatible detail shape; not used by the current Dima product route. */
  landing?: {
    workflow: { title: L; intro: L; steps: L<Point[]> };
    details: { title: L; items: L<Point[]> };
    questions: { title: L; items: L<{ q: string; a: string }[]> };
  };
}

export const products: readonly Product[] = [
  {
    id: "analytics",
    name: "Dima",
    screens: { desktop: "/products/dima-desktop.webp", mobile: "/products/dima-mobile.webp" },
    slug: "dima",
    brandKey: "dima",
    hasOwnSite: true,
    domain: "https://usedima.com",
    depth: "standalone",
    category: { tr: "Kurumsal Karar Zekâsı ve Optimizasyon Platformu", en: "Decision Intelligence & Optimization Platform" },
    oneLiner: {
      tr: "Şirket verisini bir araya getirir; olan biteni sürekli izler, önemli sapma ve fırsatları fark eder, nedenini kanıtlarıyla araştırır ve karara hazırlar.",
      en: "Connects company data, continuously monitors what is happening, detects important deviations and opportunities, investigates why with evidence, and prepares decisions.",
    },
    matrix: {
      problem: {
        tr: "Finans, muhasebe, üretim ve diğer kaynaklardaki veriler hem birbirinden kopuk hem zaman içinde derin. Kritik ilişkileri ve değişimleri elle izlemek zor.",
        en: "Data across finance, accounting, manufacturing and other systems is both disconnected and deep over time. Critical relationships and changes are hard to monitor manually.",
      },
      audience: {
        tr: "Şirkette ne olduğunu, neden olduğunu ve ne yapılabileceğini güvenilir verilerle daha erken görmek isteyen yöneticiler",
        en: "Leaders who need to see what is happening, why it is happening and what can be done earlier, with evidence they can verify",
      },
    },
    title: { tr: "Şirketinizin denetim, optimizasyon ve karar merkezi.", en: "Your company's monitoring, optimization and decision center." },
    problem: {
      tr: [
        "Şirket verisi yalnız dağınık değildir. Finans, muhasebe, üretim, satış ve diğer sistemlerde aynı şirketin farklı parçaları yaşar; aralarındaki ilişkileri kurmak zordur. Aynı zamanda yıllar boyunca biriken geçmiş veri, bugünkü değişimi anlamak ve geleceğe yönelik projeksiyon yapmak için ayrı bir derinlik oluşturur.",
        "Dima bu yatay ilişkileri ve zamansal örüntüleri aynı şirket bağlamında birlikte okumayı hedefler. Kullanıcının bir dashboard açmasını veya soru sormasını beklemeden önemli sapma, risk ve fırsatları izler; bir bulgu gördüğünde nedenini araştırır, kanıtlarını gösterir ve ne yapılabileceğini karara hazırlar.",
      ],
      en: [
        "Company data is not only scattered. Finance, accounting, manufacturing, sales and other systems hold different parts of the same business, and the relationships between them are difficult to reconstruct. Years of historical data add another dimension needed to understand change and make projections.",
        "Dima is designed to read those cross-system relationships and time-based patterns in one company context. It does not wait for someone to open a dashboard or ask a question: it monitors for important deviations, risks and opportunities, investigates why a finding matters, shows the evidence, and prepares the next decision.",
      ],
    },
    capabilities: {
      tr: [
        { title: "Bağlar ve anlar", body: "Veritabanı, ERP, Excel/CSV ve diğer kaynakları yalnız aynı yerde toplamaz; müşteri, fatura, sipariş, makine, ürün ve metrik gibi entity'leri ve aralarındaki ilişkileri ortak bir Company Brain bağlamında anlamlandırır." },
        { title: "İzler ve denetler", body: "Normal davranışı, geçmiş örüntüleri, planları ve ilişkileri sürekli takip eder. Kullanıcının sormasını beklemeden önemli sapma, risk ve fırsatları canlı sinyaller olarak öne çıkarır." },
        { title: "Araştırır ve kanıtlar", body: "Bir sinyali yalnız alarm olarak bırakmaz. Etkilenen entity ve ilişkileri inceler, kök neden adaylarını araştırır ve bulgunun hangi veri ve hesaplara dayandığını görünür kılar." },
        { title: "Karara ve aksiyona taşır", body: "Bulguyu karar seçeneklerine, senaryolara ve önerilere dönüştürür. Chat bu noktada seçili bağlamla konuşma arayüzüdür; karar daha sonra görev, e-posta, ERP taslağı veya başka bir aksiyona taşınabilir." },
      ],
      en: [
        { title: "Connects and understands", body: "It does more than collect databases, ERP, Excel/CSV and other sources in one place. It models entities such as customers, invoices, orders, machines, products and metrics, and the relationships between them, inside one Company Brain context." },
        { title: "Monitors and checks", body: "It continuously watches normal behavior, historical patterns, plans and relationships. Important deviations, risks and opportunities can surface as live signals without waiting for a prompt." },
        { title: "Investigates and evidences", body: "A signal does not stop at an alert. Dima examines the affected entities and relationships, investigates candidate root causes, and makes the underlying data and calculations visible." },
        { title: "Moves work to decision and action", body: "Findings become decision options, scenarios and recommendations. Chat is the conversational interface to the selected context; the result can then become a task, email, ERP draft or another governed action." },
      ],
    },
    note: {
      tr: "Dima'nın ana deneyimi yaşayan Company Brain'dir; Dima Today, Radar, Investigation, Evidence ve karar yüzeyleri bu beynin farklı derinlikleridir. Chat ürünün merkezi değil, zaten çalışan şirket zekâsıyla konuşmanın yollarından biridir.",
      en: "Dima's primary experience is a living Company Brain. Dima Today, Radar, Investigation, Evidence and decision surfaces are different depths of that same brain. Chat is not the product center; it is one way to talk to intelligence that is already running.",
    },
    audience: {
      tr: ["CEO, CFO, finans/muhasebe ve operasyon/üretim ekipleri: dağınık veriler arasındaki ilişkileri daha erken görmek, kritik değişimlerin nedenini kanıtlarıyla anlamak ve karar döngüsünü hızlandırmak isteyen şirketler."],
      en: ["CEOs, CFOs, finance/accounting and operations/manufacturing teams that need to connect fragmented data, understand important changes with evidence, and shorten the decision loop."],
    },
    cta: { tr: "Dima'yı deneyin", en: "Try Dima" },
  },
];
