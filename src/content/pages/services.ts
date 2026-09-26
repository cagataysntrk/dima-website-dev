import type { L } from "../types";

/** LEGACY COMPATIBILITY COPY. The public /services route redirects permanently to /solutions. Do not use this file as Dima source-of-truth. */
/** Every string on /services that is not about one service. Service copy is in ../services.ts. */
export const servicesPage = {
  meta: {
    title: {
      tr: "Hizmetler: özel yazılım, mimari inceleme ve sürdürülebilirlik çözümleri",
      en: "Services: custom software, architecture review and sustainability solutions",
    },
    description: {
      tr: "Hazır ürün yetmediğinde: belge, test ve devirle yazılan özel yazılım; mimariye bağımsız bir göz; ve kendi sisteminizde çalışmaya devam eden sürdürülebilirlik hesabı.",
      en: "When no product fits: custom software delivered with documentation, tests and a handover; an independent view of your architecture; and sustainability calculations that keep working in your own system.",
    },
  },
  breadcrumb: { home: { tr: "Ana sayfa", en: "Home" }, self: { tr: "Hizmetler", en: "Services" } },
  hero: {
    title: {
      tr: "Ürünlerimiz ihtiyacınızı karşılamıyorsa, aynı ekip sizin için yazar.",
      en: "When none of our products fits, the team that built them builds for you.",
    },
    lede: {
      tr: "Üç yol var: ihtiyacınıza göre yazılan yazılım, kararınızdan önce mimarinize bağımsız bir göz, ve PDF olarak değil kendi sisteminizde çalışır halde kalan bir sürdürülebilirlik hesabı.",
      en: "Three ways in: software written to your requirement, an independent view of your architecture before you decide, and a sustainability calculation that stays working in your own system rather than in a PDF.",
    },
    jumpLabel: { tr: "Hizmetler", en: "Services" },
  },
  service: {
    scope: { tr: "Ne yapıyoruz", en: "What we do" },
    typical: { tr: "Tipik işler", en: "Typical projects" },
    offers: { tr: "Paketler", en: "Packages" },
    offersCaption: { tr: "Sabit kapsamlı paketler: kapsam ve elinizde kalan", en: "Fixed-scope packages: scope and what you keep" },
    offerColumns: {
      name: { tr: "Paket", en: "Package" },
      scope: { tr: "Kapsam", en: "Scope" },
      keep: { tr: "Elinizde kalan", en: "What you keep" },
    },
    keep: { tr: "Elinizde kalan", en: "What you keep" },
    why: { tr: "Neden bu ekip", en: "Why this team" },
    action: { tr: "Kapsam görüşmesi planlayın", en: "Book a scoping call" },
  },
  process: {
    title: { tr: "Bir çalışma nasıl ilerler", en: "How an engagement runs" },
    intro: {
      tr: "Hizmet hangisi olursa olsun sıra aynı. Süreler işin büyüklüğüne göre değişir; kapsam aşamasının sonunda yazılı hale gelir.",
      en: "Whichever service it is, the order is the same. Durations depend on the size of the work and are written down at the end of scoping.",
    },
    duration: { tr: "Süre", en: "Duration" },
  },
  needs: {
    title: { tr: "Sizden neye ihtiyacımız var", en: "What we need from you" },
    intro: {
      tr: "Bir çalışmanın sonucunu bizim kadar sizin hazırlığınız da belirler. Bunlardan biri eksikse, başlamadan önce konuşalım.",
      en: "Your readiness decides the outcome as much as ours does. If one of these is missing, let's talk about it before we start.",
    },
  },
  cta: {
    title: { tr: "Kapsamı birlikte çıkaralım", en: "Let's scope it together" },
    body: {
      tr: "Ne istediğinizi ve hangi tarihe ihtiyacınız olduğunu anlatın. Hangi hizmetin uyduğunu ve işin büyüklüğünü kısa bir görüşmede birlikte çıkaralım.",
      en: "Tell us what you need and by when. In a short call we will work out together which service fits and how large the work is.",
    },
    action: { tr: "Kapsam görüşmesi planlayın", en: "Book a scoping call" },
  },
} satisfies Record<string, Record<string, L | Record<string, L>>>;
