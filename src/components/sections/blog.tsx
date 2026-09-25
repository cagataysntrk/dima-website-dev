import { Heading, Link as UiLink, Section, Stack, Text } from "@upcytech/ui";
import { getPathname, Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { Post } from "@/lib/blog";
import { team } from "@/content/team";
import { categories } from "@/content/blog/categories";
import { Reveal, RevealItem } from "../motion/reveal";

export const formatPostDate = (date: string, locale: Locale) =>
  new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-GB", { dateStyle: "long", timeZone: "UTC" }).format(new Date(date));

export const categoryLabel = (id: string, locale: Locale) =>
  categories.find((c) => c.id === id)?.label[locale] ?? id;

/** The post's author with their portrait, shared by every byline on the site. */
export function AuthorLine({ authorId, locale, photo = true }: {
  authorId: string;
  locale: Locale;
  /** Portraits stay off the smallest screens, where the row is already dense. */
  photo?: boolean;
}) {
  const author = team.find((m) => m.id === authorId);
  if (!author) return null;
  return (
    <span className="inline-flex items-center gap-2">
      {photo && author.photo && (
        <img
          src={author.photo}
          alt=""
          width={96}
          height={96}
          loading="lazy"
          decoding="async"
          className="hidden size-6 rounded-full object-cover sm:block"
        />
      )}
      <span className="text-ink">{author.name[locale]}</span>
    </span>
  );
}

/**
 * One post as a row, not a card: date in tabular mono, the title and its one-line summary,
 * the category. Used on the index, the home page and under a post.
 */
export function PostRow({ post, locale }: { post: Post; locale: Locale }) {
  return (
    <article className="grid gap-x-8 gap-y-1 border-t border-hairline py-5 sm:grid-cols-12 sm:items-baseline">
      <p className="font-mono text-ui text-muted tabular sm:col-span-3">
        <time dateTime={post.date}>{formatPostDate(post.date, locale)}</time>
      </p>
      <div className="flex flex-col gap-1 sm:col-span-7">
        <Heading level={3} variant="subheading">
          <Link href={{ pathname: "/blog/[slug]", params: { slug: post.slug } }}
                className="text-ink no-underline hoverable:hover:text-brand-text">
            {post.title}
          </Link>
        </Heading>
        <Text variant="small" tone="muted">{post.description}</Text>
        <p className="mt-1 text-ui text-muted"><AuthorLine authorId={post.author} locale={locale} /></p>
      </div>
      <p className="text-ui text-muted sm:col-span-2 sm:text-right">{categoryLabel(post.category, locale)}</p>
    </article>
  );
}

/** The newest (or flagged) post, given room. */
export function FeaturedPost({ post, locale, label, read }: { post: Post; locale: Locale; label: string; read: string }) {
  return (
    <Section divided aria-labelledby="featured-title">
      <Reveal className="grid gap-10 lg:grid-cols-12">
        <Text variant="eyebrow" className="lg:col-span-4">{label}</Text>
        <Stack className="lg:col-span-8">
          <p className="font-mono text-micro uppercase text-muted">
            {categoryLabel(post.category, locale)} <span aria-hidden="true" className="opacity-40">·</span>{" "}
            <time dateTime={post.date}>{formatPostDate(post.date, locale)}</time>
          </p>
          <Heading level={2} variant="title" id="featured-title">{post.title}</Heading>
          <p className="text-ui text-muted"><AuthorLine authorId={post.author} locale={locale} /></p>
          <Text variant="lede" tone="muted">{post.description}</Text>
          {/* The design system's Link takes a string href; resolve the localized post path first. */}
          <UiLink href={getPathname({ href: { pathname: "/blog/[slug]", params: { slug: post.slug } }, locale })}
                  variant="standalone" className="self-start">
            {read} <span aria-hidden="true">→</span>
          </UiLink>
        </Stack>
      </Reveal>
    </Section>
  );
}

/** A short list of posts with a heading — the home teaser and "related posts". */
export function PostList({ id, title, posts, locale, link }: {
  id: string;
  title: string;
  posts: Post[];
  locale: Locale;
  link?: { label: string };
}) {
  return (
    <Section divided aria-labelledby={`${id}-title`}>
      <Stack gap="loose">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <Heading level={2} variant="title" id={`${id}-title`}>{title}</Heading>
          {link && (
            <UiLink as={Link} href="/blog" variant="standalone">{link.label} <span aria-hidden="true">→</span></UiLink>
          )}
        </div>
        <Reveal as="ul" stagger className="flex flex-col">
          {posts.map((post) => (
            <RevealItem as="li" key={post.slug}><PostRow post={post} locale={locale} /></RevealItem>
          ))}
        </Reveal>
      </Stack>
    </Section>
  );
}
