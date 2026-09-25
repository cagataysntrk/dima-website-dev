import type { MetadataRoute } from "next";
import { routing, type Locale, type StaticPathname } from "@/i18n/routing";
import { getPosts } from "@/lib/blog";
import { absoluteUrl, postUrl } from "@/lib/seo";

/** Every page in the site map (brief §4), in both locales, each with its hreflang alternates. */
const PAGES: StaticPathname[] = [
  "/", "/products", "/industries", "/services", "/about", "/contact", "/careers", "/blog",
  "/legal/kvkk", "/legal/cerez-politikasi", "/legal/kullanim-kosullari",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const languages = (href: StaticPathname) =>
    Object.fromEntries(routing.locales.map((l) => [l, absoluteUrl(href, l)]));

  const pages = PAGES.flatMap((href) =>
    routing.locales.map((locale) => ({ url: absoluteUrl(href, locale), alternates: { languages: languages(href) } })));

  // Published posts only: getPosts hides drafts unless the build sets SHOW_DRAFTS.
  const posts = (await Promise.all(routing.locales.map((locale: Locale) => getPosts(locale))))
    .flat()
    .map((post) => ({ url: postUrl(post.slug, post.locale), lastModified: post.updated ?? post.date }));

  return [...pages, ...posts];
}
