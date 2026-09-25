import type { L } from "../types";

/** Every string on /industries that is not about one sector. Sector copy is in ../industries.ts. */
export const industriesPage = {
  meta: {
    title: {
      tr: "Sektörler: tekstil, plastik ve genel imalatta veri ve uyum talepleri",
      en: "Industries: data and compliance demands in textile, plastics and manufacturing",
    },
    description: {
      tr: "Tekstil, plastik ve genel imalatta alıcı denetimi ve AB düzenlemesi hangi veriyi hangi tarihte istiyor, ve UpcyTech bunun karşısında ne kuruyor.",
      en: "What buyer audits and EU regulation ask of textile, plastics and general manufacturers, by when, and what UpcyTech builds against each request.",
    },
  },
  breadcrumb: { home: { tr: "Ana sayfa", en: "Home" }, self: { tr: "Sektörler", en: "Industries" } },
  hero: {
    title: {
      tr: "Alıcı artık rakamı değil, rakamın nereden geldiğini soruyor.",
      en: "Buyers no longer ask for the figure. They ask where it came from.",
    },
    lede: {
      tr: "Tekstil, plastik ve genel imalatta baskı aynı yerden geliyor: alıcı denetimi, AB düzenlemesi ve tedarikçi veri talepleri. Sektörünüzü seçin; talebin nereden ve ne zaman geldiğini, karşısında ne kurduğumuzu görün.",
      en: "In textiles, plastics and general manufacturing the pressure comes from the same place: buyer audits, EU regulation and supplier data requests. Pick your sector to see where each request comes from, when it lands, and what we build against it.",
    },
    jumpLabel: { tr: "Sektörler", en: "Sectors" },
  },
  sector: {
    pressures: { tr: "Talep nereden geliyor", en: "Where the pressure comes from" },
    provides: { tr: "Karşısında ne kuruyoruz", en: "What we build against it" },
    products: { tr: "İlgili ürünler", en: "Products that apply" },
    ongoing: { tr: "Süregelen", en: "Ongoing" },
    source: { tr: "Kaynak", en: "Source" },
  },
  calendar: {
    title: { tr: "Düzenleme takvimi", en: "The regulation calendar" },
    intro: {
      tr: "Üç sektörün tarihli talepleri tek takvimde, eskiden yeniye. Tarihsiz alıcı şartları her sektörün kendi bölümünde duruyor.",
      en: "Every dated requirement across the three sectors on one calendar, oldest first. Undated buyer requirements stay in their sector's section.",
    },
  },
  compliance: {
    title: { tr: "Raporladığımız çerçeveler", en: "Frameworks we report against" },
    intro: {
      tr: "Bugün sunduğumuz ile hazırlandığımızı ayırıyoruz. Bir çerçeve bu listede yoksa, onu desteklediğimizi söylemiyoruz.",
      en: "We separate what we deliver today from what we are preparing for. If a framework is not on this list, we do not claim to support it.",
    },
    caption: {
      tr: "Çerçeve, neyi kapsadığı ve bugünkü durumumuz",
      en: "Each framework, what it covers, and where we stand today",
    },
    columns: {
      framework: { tr: "Çerçeve", en: "Framework" },
      covers: { tr: "Kapsadığı", en: "What it covers" },
      status: { tr: "Durumumuz", en: "Where we stand" },
    },
  },
  cta: {
    title: { tr: "Sektörünüzü anlatın", en: "Tell us about your sector" },
    body: {
      tr: "Hangi alıcının hangi veriyi ne zaman istediğini anlatın. Hangi talebin sizi ilk bulacağını ve nereden başlanacağını birlikte çıkaralım.",
      en: "Tell us which customer wants which data, and by when. We will work out with you which request reaches you first, and where to start.",
    },
    action: { tr: "Sektörel görüşme planlayın", en: "Book a sector consultation" },
  },
} satisfies Record<string, Record<string, L | Record<string, L>>>;
