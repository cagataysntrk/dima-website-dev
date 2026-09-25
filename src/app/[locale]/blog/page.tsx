import { Suspense } from "react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Heading, Section, Stack, Text } from "@upcytech/ui";
import type { Locale } from "@/i18n/routing";
import { getPosts } from "@/lib/blog";
import { blogPage as copy } from "@/content/pages/blog";
import { PageHero } from "@/components/sections/page-hero";
import { FeaturedPost } from "@/components/sections/blog";
import { PostGrid, PostGridFromParams } from "@/components/blog/post-grid";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/blog">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  return pageMetadata({ href: "/blog", locale, title: copy.meta.title[locale], description: copy.meta.description[locale] });
}

/** Brief §5: featured post, the list with category filters, and a follow CTA. */
export default async function BlogIndex({ params }: PageProps<"/[locale]/blog">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);

  const posts = await getPosts(locale);
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p !== featured);
  const labels = {
    filter: copy.filter.label[locale],
    all: copy.filter.all[locale],
    empty: copy.empty[locale],
    emptyCategory: copy.emptyCategory[locale],
  };

  return (
    <>
      <PageHero title={copy.hero.title[locale]} lede={copy.hero.lede[locale]} />

      {featured && <FeaturedPost post={featured} locale={locale} label={copy.featured[locale]} read={copy.read[locale]} />}

      {(rest.length > 0 || posts.length === 0) && (
        <Section divided aria-labelledby="all-title">
          <Stack gap="loose">
            <Heading level={2} variant="title" id="all-title">{copy.all[locale]}</Heading>
            <Suspense fallback={<PostGrid posts={rest} locale={locale} labels={labels} />}>
              <PostGridFromParams posts={rest} locale={locale} labels={labels} />
            </Suspense>
          </Stack>
        </Section>
      )}

      <Section divided aria-labelledby="follow-title">
        <Reveal className="grid gap-10 lg:grid-cols-12">
          <Heading level={2} variant="title" id="follow-title" className="lg:col-span-5">{copy.follow.title[locale]}</Heading>
          <Text className="lg:col-span-7">{copy.follow.body[locale]}</Text>
        </Reveal>
      </Section>

      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: copy.breadcrumb.home[locale], href: "/" },
          { name: copy.breadcrumb.self[locale], href: "/blog" },
        ])}
      />
    </>
  );
}
