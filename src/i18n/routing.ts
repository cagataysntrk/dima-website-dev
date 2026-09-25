import { defineRouting } from "next-intl/routing";

/**
 * Turkish is primary. Both locales are always prefixed, and Turkish pages carry Turkish
 * slugs. Route folders use the internal (left-hand) names; next-intl maps them.
 *
 * `localeDetection: false` — no redirect by Accept-Language. `/` always goes to `/tr`, so a
 * crawler and a person see the same URL for the same page.
 *
 * `localeCookie: false` — with detection off, next-intl's NEXT_LOCALE cookie was set on every
 * response and read by nothing. The locale lives in the URL; a cookie nobody needs is one
 * more thing the cookie policy would have to disclose.
 */
export const routing = defineRouting({
  locales: ["tr", "en"],
  defaultLocale: "tr",
  localePrefix: "always",
  localeDetection: false,
  localeCookie: false,
  pathnames: {
    "/": "/",
    "/products": { tr: "/urunler", en: "/products" },
    "/solutions": { tr: "/cozumler", en: "/solutions" },
    "/industries": { tr: "/sektorler", en: "/industries" },
    "/services": { tr: "/hizmetler", en: "/services" },
    "/about": { tr: "/hakkimizda", en: "/about" },
    "/contact": { tr: "/iletisim", en: "/contact" },
    "/careers": { tr: "/kariyer", en: "/careers" },
    "/blog": "/blog",
    "/blog/[slug]": "/blog/[slug]",
    "/legal/kvkk": { tr: "/yasal/kvkk", en: "/legal/kvkk" },
    "/legal/cerez-politikasi": { tr: "/yasal/cerez-politikasi", en: "/legal/cookie-policy" },
    "/legal/kullanim-kosullari": { tr: "/yasal/kullanim-kosullari", en: "/legal/terms-of-use" },
  },
});

export type Locale = (typeof routing.locales)[number];
export type Pathname = keyof typeof routing.pathnames;
/** Pathnames without a dynamic segment — the ones a plain href can name. */
export type StaticPathname = Exclude<Pathname, `${string}[${string}`>;
