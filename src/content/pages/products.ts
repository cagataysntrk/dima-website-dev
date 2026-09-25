import type { L } from "../types";

/** Every string on /products that is not about one product. Product copy is in ../products.ts. */
export const productsPage = {
  meta: {
    title: {
      tr: "Ürünler: modüler ERP, karbon raporlaması, veri analizi ve dış ticaret",
      en: "Products: modular ERP, carbon reporting, analytics and trade operations",
    },
    description: {
      tr: "Dört ürünün hangi sorunu kimin için çözdüğü: saha ile muhasebeyi tek kayıtta tutan ERP, tekrar üretilebilir karbon hesabı, verinize Türkçe soru sorma ve ithalat-ihracat operasyonları.",
      en: "Which of four products answers which problem, and for whom: an ERP that keeps operations and accounts in one record, reproducible carbon reporting, plain-language analytics, and import-export operations.",
    },
  },
  breadcrumb: { home: { tr: "Ana sayfa", en: "Home" }, self: { tr: "Ürünler", en: "Products" } },
  hero: {
    // Held until UpcyOps was confirmed to keep every figure tied to its source;
    // released once the UpcyOps copy landed: four products, one rule.
    title: {
      tr: "Dört ürün, tek kural: sayı kaynağından ayrılmaz.",
      en: "Four products, one rule: a number stays attached to its source.",
    },
    lede: {
      tr: "Hangi ürünün hangi sorunu kimin için çözdüğü aşağıdaki tabloda. Emin değilseniz birlikte bakalım.",
      en: "The table below shows which product answers which problem, and for whom, or we can work it out with you.",
    },
    action: { tr: "Görüşme planlayın", en: "Book a consultation" },
  },
  matrix: {
    title: { tr: "Hangi ürün, hangi sorun, kimin için", en: "Which product, which problem, for whom" },
    caption: {
      tr: "Her ürünün çözdüğü sorun ve kimin için olduğu. Ürün adı ilgili bölüme götürür.",
      en: "The problem each product answers and who it is for. Each product name links to its section.",
    },
    columns: {
      product: { tr: "Ürün", en: "Product" },
      problem: { tr: "Çözdüğü sorun", en: "The problem it answers" },
      audience: { tr: "Kimin için", en: "Who it is for" },
    },
  },
  section: {
    problem: { tr: "Sorun", en: "The problem" },
    capabilities: { tr: "Ne yapar", en: "What it does" },
    audience: { tr: "Kimin için", en: "Who it is for" },
    ownSiteNote: { tr: "Ayrıntılar ürünün kendi sitesinde.", en: "The full story is on the product's own site." },
    domainNeeded: {
      tr: "[COPY NEEDED: product domain URL]",
      en: "[COPY NEEDED: product domain URL]",
    },
  },
  consult: {
    title: { tr: "Hangisinin size uyduğundan emin değil misiniz?", en: "Not sure which one fits?" },
    body: {
      tr: "Bugün nasıl çalıştığınızı anlatın: hangi kayıt nerede tutuluyor, hangi rapor kimden isteniyor. Hangi ürünün ihtiyaçlarınıza uyduğunu birlikte belirleyelim.",
      en: "Tell us how you work today: which records live where, and who asks for which report. We will tell you which product fits, or that none of them does.",
    },
    action: { tr: "Görüşme planlayın", en: "Book a consultation" },
  },
} satisfies Record<string, Record<string, L | Record<string, L>>>;
