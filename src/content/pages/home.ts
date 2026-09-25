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

export const homePage = {
  meta: {
    title: {
      tr: "Dima | Şirketinizin denetim, optimizasyon ve karar merkezi",
      en: "Dima | Your company's monitoring, optimization and decision center",
    },
    description: {
      tr: "Dima finans, muhasebe, üretim ve diğer veri kaynaklarını birlikte anlamlandırır. Şirketi sürekli izler, önemli sapma ve fırsatların nedenini kanıtlarıyla araştırır ve karara hazırlar.",
      en: "Dima connects finance, accounting, manufacturing and other company data. It continuously monitors what matters, investigates the causes of risks and opportunities with evidence, and prepares decisions.",
    },
  },
  hero: {
    descriptor: {
      tr: "Şirketinizin denetim, optimizasyon ve karar merkezi.",
      en: "Your company's monitoring, optimization and decision center.",
    },
    title: {
      tr: "Şirketinizde ne oluyor, neden oluyor, ne yapılmalı?",
      en: "What is happening in your company, why, and what should happen next?",
    },
    accents: {
      tr: ["neden", "yapılmalı"],
      en: ["why", "next"],
    },
    lede: {
      tr: "Dima şirketinizin veri kaynaklarını birbirine bağlar ve sürekli izler. Önemli bir sapma, risk veya fırsat oluştuğunda sizin sormanızı beklemeden fark eder, nedenini kanıtlarıyla araştırır ve ne yapılabileceğini karar vermeye hazır biçimde sunar.",
      en: "Dima connects and continuously monitors your company's data sources. When an important deviation, risk or opportunity appears, it detects it without waiting for a prompt, investigates why with evidence, and presents what can be done in a decision-ready form.",
    },
    primary: { tr: "Dima'yı deneyin", en: "Try Dima" },
    primaryFallback: { tr: "Dima nasıl çalışır?", en: "See how Dima works" },
    secondary: { tr: "Canlı gösterim isteyin", en: "Request a live demo" },
  },
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
    title: { tr: "Sektör bağlamları", en: "Sector contexts" },
    intro: {
      tr: "Dima'nın ortak Şirket Beyni modeli her sektörde aynı karar döngüsünü korur. Sektör bağlamları o işin gerçek varlıklarını, süreçlerini ve ilişkilerini ekleyerek modeli derinleştirir.",
      en: "Dima keeps the same Company Brain decision loop across industries. Sector contexts deepen it with the real entities, processes and relationships of each business.",
    },
    missingPhoto: { tr: "sektör görseli", en: "sector visual" },
    link: { tr: "Kullanım alanlarını inceleyin", en: "Explore use cases" },
  },
  loop: {
    tr: "İzler ✦ Denetler ✦ Fark eder ✦ Karara taşır",
    en: "Monitors ✦ Checks ✦ Detects ✦ Moves to decision",
  },
  team: {
    title: { tr: "Ekip", en: "Team" },
    intro: {
      tr: "Beş kişilik çekirdek ekip, ürünü gerçek işletme problemleri ve teknik altyapıyla birlikte geliştiriyor.",
      en: "A five-person core team builds the product across real business problems and technical infrastructure.",
    },
    photo: { tr: "Fotoğraf", en: "Photo" },
  },
  blog: {
    title: { tr: "Kaynaklar", en: "Resources" },
    intro: {
      tr: "Şirket verisi, finans, üretim, denetim ve karar süreçlerini mekanizmasıyla anlatan uygulamalı içerikler.",
      en: "Practical resources that explain company data, finance, manufacturing, control and decision processes through their mechanisms.",
    },
    link: { tr: "Tüm kaynaklar", en: "All resources" },
  },
  cta: {
    title: { tr: "Dima şirketinizde neyi fark eder?", en: "What would Dima notice in your company?" },
    body: {
      tr: "Verinizin nerede yaşadığını ve bugün hangi kararları elle takip ettiğinizi anlatın. Canlı demoda Dima'nın veriyi nasıl bağladığını, neyi izlediğini ve bir bulguyu nasıl kanıtlarıyla karara taşıdığını gösterelim.",
      en: "Tell us where your data lives and which decisions your team still tracks manually. In a live demo, we will show how Dima connects that data, what it monitors, and how a finding is investigated with evidence and prepared for a decision.",
    },
    action: { tr: "Canlı gösterim isteyin", en: "Request a live demo" },
  },
} as const;
