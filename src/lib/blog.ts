import fs from "node:fs/promises";
import path from "node:path";
import type { MDXContent } from "mdx/types";
import type { Locale } from "@/i18n/routing";
import type { CategoryId } from "@/content/blog/categories";

/**
 * Posts are MDX files in src/content/blog, one per locale: `<slug>.tr.mdx`, `<slug>.en.mdx`.
 * Each exports a typed `metadata` object — no frontmatter parser, and a missing field is a
 * type error in the file itself. Drafts appear only in builds run with SHOW_DRAFTS=1.
 */
export interface PostMeta {
  title: string;
  description: string;
  /** ISO dates. */
  date: string;
  updated?: string;
  /** A team member id from content/team.ts. */
  author: string;
  category: CategoryId;
  /** Where the post's CTA points: a product id or a service id. */
  related?: { kind: "product" | "service"; id: string };
  featured?: boolean;
  draft?: boolean;
}

export interface Post extends PostMeta {
  slug: string;
  locale: Locale;
}

const DIR = path.join(process.cwd(), "src/content/blog");
const SHOW_DRAFTS = process.env.SHOW_DRAFTS === "1";

async function load(slug: string, locale: Locale) {
  return (await import(`../content/blog/${slug}.${locale}.mdx`)) as { default: MDXContent; metadata: PostMeta };
}

/** Every visible post in one locale, newest first. */
export async function getPosts(locale: Locale): Promise<Post[]> {
  const suffix = `.${locale}.mdx`;
  const files = (await fs.readdir(DIR)).filter((file) => file.endsWith(suffix));
  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = file.slice(0, -suffix.length);
      const { metadata } = await load(slug, locale);
      return { ...metadata, slug, locale };
    }),
  );
  return posts.filter((post) => SHOW_DRAFTS || !post.draft).sort((a, b) => b.date.localeCompare(a.date));
}

/** One post and its body, or null if it does not exist (or is a draft) in this locale. */
export async function getPost(slug: string, locale: Locale) {
  try {
    const mod = await load(slug, locale);
    if (mod.metadata.draft && !SHOW_DRAFTS) return null;
    return { Content: mod.default, post: { ...mod.metadata, slug, locale } satisfies Post };
  } catch {
    return null;
  }
}

/** The locales a post exists in — hreflang lists only these. */
export async function postLocales(slug: string, locales: readonly Locale[]): Promise<Locale[]> {
  const found = await Promise.all(locales.map(async (locale) => ((await getPost(slug, locale)) ? locale : null)));
  return found.filter((locale): locale is Locale => locale !== null);
}
