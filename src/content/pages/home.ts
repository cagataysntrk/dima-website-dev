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
      tr: "UpcyTech: üretimde verimlilik, süreç optimizasyonu ve yönetim sistemleri",
      en: "UpcyTech: manufacturing efficiency, process optimization and management systems",
    },
    description: {
      tr: "UpcyTech, üreticiler için üretim yönetim sistemleri, süreç optimizasyonu ve gelişmiş raporlama çözümleri geliştirir; fabrikalarda verimlilik ve operasyonel netlik sağlar.",
      en: "UpcyTech builds enterprise manufacturing management systems, process optimization, and advanced reporting solutions, delivering efficiency and operational clarity.",
    },
  },
  hero: {
    title: {
      tr: "Üretimde verimlilik, süreç optimizasyonu ve akıllı yönetim sistemleri.",
      en: "Manufacturing efficiency, process optimization, and intelligent management systems.",
    },
    /** Words of the title set in italic and faded brand blue — exactly as they appear in it. */
    accents: {
      tr: ["verimlilik", "optimizasyonu"],
      en: ["efficiency", "optimization"],
    },
    lede: {
      tr: "Üretim süreçlerinde verimlilik ve optimizasyon sağlayan kurumsal yönetim sistemleri ve gelişmiş raporlama çözümleri geliştiriyoruz. Standart yazılımların yetersiz kaldığı noktalarda süreçlerinize özel sistemler kurarak karar alma mekanizmalarınızı güçlendiriyoruz.",
      en: "We build enterprise management systems and advanced reporting solutions that drive manufacturing process efficiency and optimization. When standard software falls short, we build tailored systems to empower your operational decision-making.",
    },
    primary: { tr: "Çözümleri inceleyin", en: "Explore solutions" },
    secondary: { tr: "Bize ulaşın", en: "Talk to us" },
  },
  /**
   * The partner strip, as on upcyman.com: institutions and programmes the company works with
   * or is supported by — not customers, so it is not labelled "references", and UpcyMan's
   * subtitle ("chosen by the sector's leaders") is left out: these names cannot carry it.
   * Logos from the UpcyMan repo, trimmed and sized in public/partners. [CONFIRM] that the
   * permission to show them covers upcytech.com as well as upcyman.com.
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
  whatWeDo: {
    title: { tr: "Ne yapıyoruz", en: "What we do" },
    products: {
      title: { tr: "Ürünler", en: "Products" },
      body: {
        tr: "Üretim verimliliği, süreç optimizasyonu, kurumsal kaynak yönetimi ve sürdürülebilirlik için dört ürün.",
        en: "Four products for manufacturing efficiency, process optimization, enterprise resource planning, and sustainability.",
      },
      link: { tr: "Çözümlere bakın", en: "See solutions" },
    },
    services: {
      title: { tr: "Hizmetler", en: "Services" },
      body: {
        tr: "Hazır ürün yetmediğinde özel yazılım, karar öncesi mimari inceleme ve kendi sisteminizde kalan sürdürülebilirlik altyapısı.",
        en: "Custom software when no off-the-shelf product fits, architecture review before you decide, and sustainability infrastructure that stays in your own system.",
      },
      link: { tr: "Çözümlere bakın", en: "See solutions" },
    },
    /** The link on each service-line card in the bento grid. */
    lineLink: { tr: "Ayrıntılar", en: "Details" },
  },
  productIndex: {
    title: { tr: "Ürünlerimiz", en: "Our products" },
    /** The product wheel: its accessible name, the link under the mockups, missing screens. */
    wheel: { tr: "Ürün seçin", en: "Choose a product" },
    link: { tr: "Ürüne bakın", en: "See the product" },
    missingDesktop: { tr: "masaüstü ekran görüntüsü", en: "desktop screenshot" },
    missingMobile: { tr: "mobil ekran görüntüsü", en: "mobile screenshot" },
    intro: {
      tr: "Her biri kendi sorununu çözüyor. Hangisinin kimin için olduğu çözümler sayfasında.",
      en: "Each answers its own problem. Which one is for whom is on the solutions page.",
    },
  },
  industries: {
    title: { tr: "Sektörler", en: "Industries" },
    intro: {
      tr: "Tekstil, plastik ve genel imalat. Her birinde talep aynı biçimde geliyor: alıcıdan ve AB düzenlemesinden, bir tarihle.",
      en: "Textile, plastics and general manufacturing. In each, the demand arrives the same way: from buyers and from EU regulation, with a date.",
    },
    latest: { tr: "Son tarihli talep", en: "Latest dated requirement" },
    /** Inside a gallery panel with no photograph yet. */
    missingPhoto: { tr: "fotoğraf", en: "photo" },
    link: { tr: "Sektöre bakın", en: "See the sector" },
  },
  /** The full-width text loop between the sectors and the team: what the company does. */
  loop: {
    tr: "Üretim verimliliği ✦ Süreç optimizasyonu ✦ Veri analitiği ✦ Kurumsal yönetim sistemleri ✦ Sürdürülebilirlik ve karbon yönetimi ✦ Karar destek",
    en: "Manufacturing efficiency ✦ Process optimization ✦ Data analytics ✦ Enterprise management systems ✦ Sustainability and carbon management ✦ Decision support",
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
    title: { tr: "Yazılar", en: "Writing" },
    link: { tr: "Tüm yazılar", en: "All posts" },
  },
  cta: {
    title: { tr: "Ne üzerinde çalışıyorsunuz?", en: "What are you working on?" },
    body: {
      tr: "Hangi kaydın nerede tutulduğunu ve kimin hangi sayıyı istediğini anlatın. Ürün mü, hizmet mi, ikisi birden mi gerektiğini birlikte çıkaralım.",
      en: "Tell us which records live where, and who is asking for which number. We will work out together whether it needs a product, a service, or both.",
    },
    action: { tr: "Bize ulaşın", en: "Talk to us" },
  },
};
