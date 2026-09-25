import type { StaticPathname } from "@/i18n/routing";
import type { L } from "./types";

export interface SiteLink {
  href: StaticPathname;
  label: L;
}

/** Site chrome: navigation, footer, legal entity, and the few strings every page shares. */
export const site = {
  name: "Dima",
  nav: [
    { href: "/solutions", label: { tr: "Ürün", en: "Product" } },
    { href: "/industries", label: { tr: "Kullanım alanları", en: "Use cases" } },
    { href: "/about", label: { tr: "Hakkımızda", en: "About" } },
    { href: "/blog", label: { tr: "Kaynaklar", en: "Resources" } },
  ] satisfies SiteLink[],
  /** Sales-assisted path until the self-serve OAuth/demo onboarding is wired in the next phase. */
  navAction: { href: "/contact", label: { tr: "Canlı demo isteyin", en: "Request a live demo" } } satisfies SiteLink,
  footer: {
    groups: [
      {
        title: { tr: "Dima", en: "Dima" },
        links: [
          { href: "/solutions", label: { tr: "Ürün", en: "Product" } },
          { href: "/industries", label: { tr: "Kullanım alanları", en: "Use cases" } },
          { href: "/blog", label: { tr: "Kaynaklar", en: "Resources" } },
        ] satisfies SiteLink[],
      },
      {
        title: { tr: "Şirket", en: "Company" },
        links: [
          { href: "/about", label: { tr: "Hakkımızda", en: "About" } },
          { href: "/careers", label: { tr: "Kariyer", en: "Careers" } },
          { href: "/contact", label: { tr: "İletişim", en: "Contact" } },
        ] satisfies SiteLink[],
      },
      {
        title: { tr: "Yasal", en: "Legal" },
        links: [
          { href: "/legal/kvkk", label: { tr: "KVKK aydınlatma metni", en: "Privacy notice (KVKK)" } },
          { href: "/legal/cerez-politikasi", label: { tr: "Çerez politikası", en: "Cookie policy" } },
          { href: "/legal/kullanim-kosullari", label: { tr: "Kullanım koşulları", en: "Terms of use" } },
        ] satisfies SiteLink[],
      },
    ],
    /** Turkish law expects the registered entity on the corporate site (TTK 1524). */
    entity: {
      tr: "UpcyTech Teknoloji A.Ş. · Reşitpaşa Mah. Katar Cad. İTÜ Tasarım ve Prototip Merkezi Binası No: 2/41 İç Kapı No: 19, 34467 Sarıyer / İstanbul · MERSİS: 0893064578500001",
      en: "UpcyTech Teknoloji A.Ş. · Reşitpaşa Mah. Katar Cad. İTÜ Tasarım ve Prototip Merkezi Binası No: 2/41 İç Kapı No: 19, 34467 Sarıyer / İstanbul, Türkiye · MERSİS: 0893064578500001",
    },
  },
  /**
   * The company's own facts. Every one is the company's to supply (brief §14); until then each
   * renders as a visible [COPY NEEDED] and never as a working link.
   */
  company: {
    // Supplied by the company, 2026-09-15.
    legalName: { tr: "UpcyTech Teknoloji A.Ş.", en: "UpcyTech Teknoloji A.Ş." },
    registeredAddress: {
      tr: "Reşitpaşa Mah. Katar Cad. İTÜ Tasarım ve Prototip Merkezi Binası No: 2/41 İç Kapı No: 19, 34467 Sarıyer / İstanbul",
      en: "Reşitpaşa Mah. Katar Cad. İTÜ Tasarım ve Prototip Merkezi Binası No: 2/41 İç Kapı No: 19, 34467 Sarıyer / İstanbul, Türkiye",
    },
    /** The same address, split for structured data (schema.org PostalAddress). */
    postalAddress: {
      streetAddress: "Reşitpaşa Mah. Katar Cad. İTÜ Tasarım ve Prototip Merkezi Binası No: 2/41 İç Kapı No: 19",
      addressLocality: "Sarıyer",
      addressRegion: "İstanbul",
      postalCode: "34467",
      addressCountry: "TR",
    },
    mersis: { tr: "0893064578500001", en: "0893064578500001" },
    // The address the old site published in its footer and contact form.
    email: { tr: "contact@upcytech.com", en: "contact@upcytech.com" },
    phone: { tr: "+90 536 015 81 60", en: "+90 536 015 81 60" },
    // Same URL the footer already links; confirm the page is live under this name.
    linkedin: { tr: "https://www.linkedin.com/company/upcytech/", en: "https://www.linkedin.com/company/upcytech/" },
    // No separate office supplied: repeats the registered address until one is.
    officeAddress: {
      tr: "Reşitpaşa Mah. Katar Cad. İTÜ Tasarım ve Prototip Merkezi Binası No: 2/41 İç Kapı No: 19, 34467 Sarıyer / İstanbul",
      en: "Reşitpaşa Mah. Katar Cad. İTÜ Tasarım ve Prototip Merkezi Binası No: 2/41 İç Kapı No: 19, 34467 Sarıyer / İstanbul, Türkiye",
    },
    visiting: {
      tr: "Ziyaret öncesi haber verin; işi yapacak kişinin orada olmasını sağlıyoruz.",
      en: "Let us know before visiting so the person who would do the work is there.",
    },
    /** [latitude, longitude] of the office, from the previous site (424G+59 Sarıyer). */
    officeCoordinates: [41.1056, 29.0258] as readonly [number, number],
    responseTime: { tr: "Bir iş günü içinde", en: "Within one business day" },
  },
  chrome: {
    skipLink: { tr: "İçeriğe geç", en: "Skip to content" },
    /** Unknown addresses and failed renders. Plain sentences, no apology, a way forward. */
    notFound: {
      title: { tr: "Böyle bir sayfa yok", en: "There is no such page" },
      body: {
        tr: "Adresi yanlış yazmış olabilirsiniz ya da sayfa taşınmış olabilir. Ana sayfaya dönün ya da bize ulaşın.",
        en: "The address may be mistyped, or the page may have moved. Go back home, or talk to us.",
      },
      home: { tr: "Ana sayfa", en: "Home" },
      contact: { tr: "Bize ulaşın", en: "Talk to us" },
    },
    failure: {
      title: { tr: "Sayfa açılamadı", en: "This page could not be opened" },
      body: {
        tr: "Birkaç dakika sonra tekrar deneyin. Sorun sürerse bize ulaşın.",
        en: "Try again in a few minutes. If it still does not open, talk to us.",
      },
      retry: { tr: "Tekrar deneyin", en: "Try again" },
      contact: { tr: "Bize ulaşın", en: "Talk to us" },
    },
    /** The locale switch names the language it switches TO, in that language. */
    switchTo: {
      tr: { locale: "en", short: "EN", name: "English" },
      en: { locale: "tr", short: "TR", name: "Türkçe" },
    },
    scrollToTop: { tr: "Yukarı çık", en: "Scroll to top" },
    readingProgress: { tr: "Sayfa konumu", en: "Reading progress" },
  },
} as const;
