import type { Metadata } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing, type Locale, type StaticPathname } from "@/i18n/routing";
import { site } from "@/content/site";

/** Production origin. [CONFIRM] — set NEXT_PUBLIC_SITE_URL per environment. */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://upcytech.com";

export const absoluteUrl = (href: StaticPathname, locale: Locale): string =>
  new URL(getPathname({ href, locale }), SITE_URL).toString();

/** The share image's file key: "/" → "home", "/legal/kvkk" → "legal-kvkk". */
export const ogKey = (href: StaticPathname): string =>
  href === "/" ? "home" : href.slice(1).replaceAll("/", "-");

/** A page's share image, rendered at build time by app/og/[locale]/[file]. */
const ogImage = (key: string, locale: Locale, alt: string) => ({
  url: new URL(`/og/${locale}/${key}.png`, SITE_URL).toString(),
  width: 1200,
  height: 630,
  alt,
});

/**
 * Title, description, canonical, hreflang and share image for one page. Every page passes its
 * own copy; nothing here is templated, so no two pages can share a title or description by
 * accident.
 */
export function pageMetadata({ href, locale, title, description }: {
  href: StaticPathname;
  locale: Locale;
  title: string;
  description: string;
}): Metadata {
  const url = absoluteUrl(href, locale);
  const image = ogImage(ogKey(href), locale, title);
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(routing.locales.map((l) => [l, absoluteUrl(href, l)])),
        "x-default": absoluteUrl(href, routing.defaultLocale),
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "UpcyTech",
      locale: locale === "tr" ? "tr_TR" : "en_GB",
      type: "website",
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

/** A post's URL. Blog paths have a dynamic segment, so they cannot use `absoluteUrl`. */
export const postUrl = (slug: string, locale: Locale): string =>
  new URL(getPathname({ href: { pathname: "/blog/[slug]", params: { slug } }, locale }), SITE_URL).toString();

/** Metadata for one post. hreflang lists only the locales the post actually exists in. */
export function postMetadata({ slug, locale, locales, title, description, date, updated }: {
  slug: string;
  locale: Locale;
  locales: Locale[];
  title: string;
  description: string;
  date: string;
  updated?: string;
}): Metadata {
  const url = postUrl(slug, locale);
  const image = ogImage(`post-${slug}`, locale, title);
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(locales.map((l) => [l, postUrl(slug, l)])),
    },
    openGraph: {
      title, description, url, siteName: "UpcyTech", type: "article",
      locale: locale === "tr" ? "tr_TR" : "en_GB",
      publishedTime: date, ...(updated ? { modifiedTime: updated } : {}),
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export const articleJsonLd = (post: {
  slug: string; locale: Locale; title: string; description: string; date: string; updated?: string; authorName: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: post.title,
  description: post.description,
  datePublished: post.date,
  dateModified: post.updated ?? post.date,
  inLanguage: post.locale,
  author: { "@type": "Person", name: post.authorName },
  publisher: { "@type": "Organization", name: "UpcyTech", url: SITE_URL },
  mainEntityOfPage: postUrl(post.slug, post.locale),
});

export const organizationJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "UpcyTech",
  legalName: site.company.legalName.tr,
  url: SITE_URL,
  address: { "@type": "PostalAddress", ...site.company.postalAddress },
  // MERSİS: the Turkish central registry number.
  identifier: { "@type": "PropertyValue", propertyID: "MERSİS", value: site.company.mersis.tr },
});

/** One JobPosting per open role (brief §9). Written from the role's own fields, never padded. */
export const jobPostingJsonLd = (locale: Locale, role: {
  title: Record<Locale, string>;
  summary: Record<Locale, string>;
  location: Record<Locale, string>;
  employmentType: string;
  datePosted: string;
  validThrough?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "JobPosting",
  title: role.title[locale],
  description: role.summary[locale],
  datePosted: role.datePosted,
  ...(role.validThrough ? { validThrough: role.validThrough } : {}),
  employmentType: role.employmentType,
  hiringOrganization: { "@type": "Organization", name: "UpcyTech", sameAs: SITE_URL },
  jobLocation: { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: role.location[locale], addressCountry: "TR" } },
});

export const breadcrumbJsonLd =(locale: Locale, items: { name: string; href: StaticPathname }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: absoluteUrl(item.href, locale),
  })),
});
