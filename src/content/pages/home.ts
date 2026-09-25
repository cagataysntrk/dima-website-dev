/** A logo in the partner strip. Names are proper nouns, the same in both languages. */
export interface Partner {
  name: string;
  src: string;
  darkSrc?: string;
  /** The file's pixel size (2× the 40px strip), so the box is reserved before it loads. */
  width: number;
  height: number;
  dark: "white" | "swap" | "invert-light";
}

/**
 * Every string on the home page. The company is early-stage: no case study, reference,
 * or certification is written here until the company supplies it.
 */
export const homePage = {
  meta: {
    title: {
      tr: "Dima — Şirketinizin denetim, optimizasyon ve karar merkezi",
      en: "Dima — Your company's monitoring, optimization and decision center",
    },
    description: {
      tr: "Dima; finans, muhasebe, üretim ve diğer veri kaynaklarını birlikte anlamlandırır, şirketi sürekli izler, önemli sapma ve fırsatların nedenini kanıtlarıyla araştırıp karara hazırlar.",
      en: "Dima connects finance, accounting, manufacturing and other company data, continuously monitors what matters, investigates the causes of risks and opportunities with evidence, and prepares decisions.",
    },
  },
  hero: {
    title: {
      tr: "Şirketinizde ne oluyor, neden oluyor, ne yapılmalı?",
      en: "What is happening in your company, why, and what should happen next?",
    },
    /** Accent only meaningful words; the sentence still carries the message without the effect. */
    accents: {
      tr: ["neden", "yapılmalı"],
      en: ["why", "next"],
    },
    lede: {
      tr: "Dima şirketinizin denetim, optimizasyon ve karar merkezidir. Finans, muhasebe, üretim ve diğer veri kaynaklarını birlikte anlamlandırır; şirketi sürekli izler, önemli sapma, risk ve fırsatları sizin sormanızı beklemeden fark eder; nedenini araştırır ve kanıtlarıyla karara hazırlar.",
      en: "Dima is your company's monitoring, optimization and decision center. It connects finance, accounting, manufacturing and other data; continuously watches the business, detects important deviations, risks and opportunities without waiting for a prompt, investigates why they happened, and prepares the evidence for a decision.",
    },
    primary: { tr: "Dima'yı keşfedin", en: "Explore Dima" },
    secondary: { tr: "Canlı demo isteyin", en: "Request a live demo" },
  },
  /**
   * Institutions and programmes the company works with or is supported by — not customers,
   * so the strip is never described as customer references. Existing artwork is preserved
   * from the source site; publication permission must remain valid for this brand/domain.
   *
   * `dark`: how the artwork survives the dark theme — `white` turns it to a flat white mark,
   * `swap` shows a separate white file, `invert-light` inverts a white-only file on light.
   */
  references: {
    label: { tr: "Ortaklarımız ve destekçilerimiz", en: "Our partners and supporters" },
    partners: [
      { name: "İTÜ", src: "/partners/itu-ink.png", darkSrc: "/partners/itu-white.png", width: 136, height: 76, dark: "swap" },
      { name: "Gebze Teknik Üniversitesi", src: "/partners/gtu.png", width: 128, height: 80, dark: "white" },
      { name: "İstanbul Ticaret Odası", src: "/partners/ito.png", width: 178, height: 80, dark: "white" },
      { name: "MÜSİAD", src: "/partners/musiad.png", width: 394, height: 80, dark: "white" },
      { name: "T3 Girişim Merkezi", src: "/partners/t3.png", width: 261, height: 80, dark: "white" },
      { name: "İTÜ ARI 1773 Teknopark", src: "/partners/teknopark-white.png", width: 253, height: 80, dark: "invert-light" },
      { name: "Güçlü Geri Dönüşüm", src: "/partners/guclu.png", width: 240, height: 51, dark: "white" },
    ] satisfies readonly Partner[],
  },
  industries: {
    title: { tr: "Sektörler", en: "Industries" },
    intro: {
      tr: "Dima'nın ortak Company Brain modeli farklı sektörlerde aynı karar döngüsünü korur; sektör paketleri tekstil, plastik ve genel imalattaki gerçek entity, süreç ve ilişkilerle bu modeli derinleştirir.",
      en: "Dima keeps the same Company Brain decision loop across industries; sector packs deepen it with the real entities, processes and relationships of textile, plastics and general manufacturing.",
    },
    latest: { tr: "Son tarihli talep", en: "Latest dated requirement" },
    /** Inside a gallery panel with no photograph yet. */
    missingPhoto: { tr: "fotoğraf", en: "photo" },
    link: { tr: "Sektöre bakın", en: "See the sector" },
  },
  /** The full-width text loop between the sectors and the team: what the company does. */
  loop: {
    tr: "Bağla ✦ Anla ✦ İzle ✦ Denetle ✦ Fark et ✦ Araştır ✦ Kanıtla ✦ Karara taşı",
    en: "Connect ✦ Understand ✦ Monitor ✦ Check ✦ Detect ✦ Investigate ✦ Evidence ✦ Decide",
  },
  team: {
    title: { tr: "Ekip", en: "Team" },
    intro: {
      tr: "Beş kişiyiz. Sizinle konuşan kişi, işi yapan kişidir.",
      en: "We are five people. The person you talk to is the person who does the work.",
    },
    photo: { tr: "Fotoğraf", en: "Photo" },
  },
  blog: {
    title: { tr: "Kaynaklar", en: "Resources" },
    link: { tr: "Tüm kaynaklar", en: "All resources" },
  },
  cta: {
    title: { tr: "Dima'yı kendi şirketinizde görün.", en: "See Dima in your own company." },
    body: {
      tr: "Verinizin nerede yaşadığını ve bugün hangi kararları elle takip ettiğinizi anlatın. Canlı demoda Dima'nın veriyi nasıl bağladığını, neyi izlediğini ve bir bulguyu nasıl kanıtlarıyla karara taşıdığını gösterelim.",
      en: "Tell us where your data lives and which decisions your team still tracks manually. In a live demo, we will show how Dima connects that data, what it monitors, and how a finding is investigated with evidence and prepared for a decision.",
    },
    action: { tr: "Canlı demo isteyin", en: "Request a live demo" },
  },
};
