import type { L } from "@/content/types";
import type { StaticPathname } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";
import { homePage } from "@/content/pages/home";
import { productsPage } from "@/content/pages/products";
import { industriesPage } from "@/content/pages/industries";
import { servicesPage } from "@/content/pages/services";
import { aboutPage } from "@/content/pages/about";
import { contactPage } from "@/content/pages/contact";
import { careersPage } from "@/content/pages/careers";
import { blogPage } from "@/content/pages/blog";
import { legalDocs } from "@/content/legal";
import { getPosts } from "@/lib/blog";
import { ogKey } from "@/lib/seo";

type Meta = { title: L<string>; description: L<string> };

/**
 * One share image per page, drawn from the same title and description the page's own
 * metadata uses — so an image can never say something the page does not.
 */
const pages: [StaticPathname, Meta][] = [
  ["/", homePage.meta],
  ["/products", productsPage.meta],
  ["/industries", industriesPage.meta],
  ["/services", servicesPage.meta],
  ["/about", aboutPage.meta],
  ["/contact", contactPage.meta],
  ["/careers", careersPage.meta],
  ["/blog", blogPage.meta],
  ...Object.values(legalDocs).map((doc): [StaticPathname, Meta] => [doc.href, doc]),
];

export type OgEntry = { key: string; title: string; description: string; href: StaticPathname | { pathname: "/blog/[slug]"; params: { slug: string } } };

export async function ogEntries(locale: Locale): Promise<OgEntry[]> {
  const posts = await getPosts(locale);
  return [
    ...pages.map(([href, meta]) => ({ key: ogKey(href), title: meta.title[locale], description: meta.description[locale], href })),
    ...posts.map((post) => ({
      key: `post-${post.slug}`,
      title: post.title,
      description: post.description,
      href: { pathname: "/blog/[slug]" as const, params: { slug: post.slug } },
    })),
  ];
}
