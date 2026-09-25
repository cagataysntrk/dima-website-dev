import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Heading, Section, Stack, Text } from "@upcytech/ui";
import { getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { getPost, getPosts, postLocales } from "@/lib/blog";
import { team } from "@/content/team";
import { products } from "@/content/products";
import { services } from "@/content/services";
import { blogPage as copy } from "@/content/pages/blog";
import { categoryLabel, formatPostDate, PostList } from "@/components/sections/blog";
import { CtaBand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/json-ld";
import { articleJsonLd, postMetadata } from "@/lib/seo";
import { RainbowButton } from "@/components/vendor/magicui/rainbow-button";

/** Only posts that exist are pages; anything else under /blog is a 404. */
export const dynamicParams = false;

export async function generateStaticParams({ params }: { params: { locale: string } }) {
  return (await getPosts(params.locale as Locale)).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/blog/[slug]">): Promise<Metadata> {
  const { locale, slug } = (await params) as { locale: Locale; slug: string };
  const found = await getPost(slug, locale);
  if (!found) return {};
  return postMetadata({
    slug, locale,
    locales: await postLocales(slug, routing.locales),
    title: found.post.title, description: found.post.description,
    date: found.post.date, updated: found.post.updated,
  });
}

const enterDelay = (ms: number) => ({ "--enter-delay": `${ms}ms` }) as CSSProperties;

/** Brief §5: title, date, author with photo, body, author bio, related posts, relevant CTA. */
export default async function PostPage({ params }: PageProps<"/[locale]/blog/[slug]">) {
  const { locale, slug } = (await params) as { locale: Locale; slug: string };
  setRequestLocale(locale);
  const found = await getPost(slug, locale);
  if (!found) notFound();
  const { Content, post } = found;

  const author = team.find((m) => m.id === post.author);
  const related = (await getPosts(locale)).filter((p) => p.slug !== slug && p.category === post.category).slice(0, 3);
  const cta = relatedCta(post.related, locale);

  return (
    <>
      <Section rhythm="hero" width="prose">
        <Stack gap="loose">
          <Stack>
            <p className="animate-enter font-mono text-micro uppercase text-muted">
              {categoryLabel(post.category, locale)} <span aria-hidden="true" className="opacity-40">·</span>{" "}
              <time dateTime={post.date}>{formatPostDate(post.date, locale)}</time>
              {post.updated && (
                <> <span aria-hidden="true" className="opacity-40">·</span> {copy.post.updated[locale]}{" "}
                  <time dateTime={post.updated}>{formatPostDate(post.updated, locale)}</time></>
              )}
            </p>
            <Heading level={1} variant="display" size="md" className="animate-enter" style={enterDelay(60)}>{post.title}</Heading>
            <Text variant="lede" tone="muted" className="animate-enter" style={enterDelay(120)}>{post.description}</Text>
          </Stack>
          {author && (
            <div className="animate-enter flex items-center gap-3" style={enterDelay(180)}>
              {author.photo ? (
                <img
                  src={author.photo}
                  alt=""
                  width={96}
                  height={96}
                  loading="lazy"
                  decoding="async"
                  className="size-11 shrink-0 rounded-full object-cover"
                />
              ) : (
                <div aria-hidden="true" className="grid size-11 shrink-0 place-items-center rounded-full border border-dashed border-outline bg-raised font-mono text-micro uppercase text-muted">
                </div>
              )}
              <p className="text-ui">
                <span className="text-muted">{copy.post.by[locale]} </span>
                <span className="font-medium text-ink">{author.name[locale]}</span>
                <span className="block text-muted">{author.role[locale]}</span>
              </p>
            </div>
          )}
        </Stack>
      </Section>

      <Section divided width="prose">
        <article className="pb-4">
          <Content />
        </article>
        {author && (
          <aside aria-labelledby="author-title" className="mt-12 flex flex-col gap-2 border-t border-outline pt-6">
            <Heading level={2} variant="subheading" id="author-title">{copy.post.about[locale]}</Heading>
            <p className="font-medium text-ink">{author.name[locale]} <span className="font-normal text-muted">· {author.role[locale]}</span></p>
            <Text variant="small" tone="muted">{author.background[locale]}</Text>
          </aside>
        )}
      </Section>

      {related.length > 0 && <PostList id="related" title={copy.post.related[locale]} posts={related} locale={locale} />}

      <CtaBand
        id="next"
        title={copy.post.ctaTitle[locale]}
        body={copy.post.ctaBody[locale]}
        action={
          <RainbowButton as="a" href={cta.href}>{cta.label}</RainbowButton>
        }
      />

      <JsonLd data={articleJsonLd({ ...post, authorName: author?.name[locale] ?? "UpcyTech" })} />
    </>
  );
}

/**
 * The CTA a post ends with: its related product, its related service, or a plain "talk to us".
 * Every href is resolved to its localized path here, so the page renders one plain link.
 */
function relatedCta(related: { kind: "product" | "service"; id: string } | undefined, locale: Locale) {
  if (related?.kind === "product") {
    const product = products.find((p) => p.id === related.id);
    if (product) return { label: product.cta[locale], href: `${getPathname({ href: "/products", locale })}#${product.slug}` };
  }
  if (related?.kind === "service") {
    const service = services.find((s) => s.id === related.id);
    if (service) return { label: copy.post.serviceAction[locale], href: `${getPathname({ href: "/contact", locale })}?service=${service.enquiry}` };
  }
  return { label: copy.post.contactAction[locale], href: getPathname({ href: "/contact", locale }) };
}
