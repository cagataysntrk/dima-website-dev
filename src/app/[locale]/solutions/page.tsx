import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { products } from "@/content/products";
import { services } from "@/content/services";
import { solutionsPage as copy } from "@/content/pages/solutions";
import { chatDemoFor } from "@/content/dima-demo";
import { PageHero } from "@/components/sections/page-hero";
import { PositioningMatrix } from "@/components/sections/positioning-matrix";
import { ProductBlock } from "@/components/sections/product-block";
import { ServiceBlock } from "@/components/sections/service-block";
import { ChatDemo } from "@/components/sections/chat-demo/chat-demo";
import { CtaBand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { RainbowButton } from "@/components/vendor/magicui/rainbow-button";
import { Heading, Section, Stack, Text } from "@upcytech/ui";
import { ProblemMatcher } from "@/components/sections/problem-matcher";
import { problemMatcherCopy } from "@/content/problem-matcher";

export async function generateMetadata({ params }: PageProps<"/[locale]/solutions">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  return pageMetadata({
    href: "/solutions",
    locale,
    title: copy.meta.title[locale],
    description: copy.meta.description[locale],
  });
}

export default async function SolutionsPage({ params }: PageProps<"/[locale]/solutions">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);

  const manufacturingProducts = products.filter((p) => p.id !== "carbon");
  const manufacturingServices = services.filter((s) => s.id !== "sustainability");

  const sustainabilityProducts = products.filter((p) => p.id === "carbon");
  const sustainabilityServices = services.filter((s) => s.id === "sustainability");

  return (
    <>
      <PageHero
        title={copy.hero.title[locale]}
        lede={copy.hero.lede[locale]}
        action={
          <RainbowButton as="a" href="#consult">{copy.hero.action[locale]}</RainbowButton>
        }
      />

      {/* Category & Product Jumper Bar */}
      <nav aria-label={copy.breadcrumb.self[locale]} className="border-y border-hairline bg-canvas/90 backdrop-blur-md lg:sticky lg:top-(--nav-offset) lg:z-20">
        <div className="mx-auto flex w-full max-w-content flex-wrap items-center justify-between gap-3 px-6 py-2.5">
          <ul className="flex flex-wrap items-center gap-2 sm:gap-3">
            <li>
              <span className="sr-only">{copy.categories.sectionsLabel[locale]}</span>
              <a
                href="#manufacturing"
                className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-raised px-3 py-1 pointer-coarse:min-h-11 text-ui font-medium text-ink transition-colors hover:bg-surface no-underline"
              >
                <span aria-hidden="true" data-brand={manufacturingProducts[0]?.brandKey} className="size-2 rounded-full bg-brand" />
                <span>{copy.categories.manufacturing[locale]}</span>
              </a>
            </li>
            <li>
              <a
                href="#sustainability"
                className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-raised px-3 py-1 pointer-coarse:min-h-11 text-ui font-medium text-ink transition-colors hover:bg-surface no-underline"
              >
                <span aria-hidden="true" data-brand={sustainabilityProducts[0]?.brandKey} className="size-2 rounded-full bg-brand" />
                <span>{copy.categories.sustainability[locale]}</span>
              </a>
            </li>
          </ul>

          <ul className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <li className="hidden md:inline-flex">
              <span className="text-micro font-mono uppercase text-muted">
                {copy.categories.productsLabel[locale]}:
              </span>
            </li>
            {products.map((p) => (
              <li key={p.id}>
                <a
                  href={`#${p.slug}`}
                  data-brand={p.brandKey}
                  className="inline-flex items-center gap-1.5 rounded-full border border-hairline/60 bg-surface/70 px-2.5 py-0.5 pointer-coarse:min-h-11 pointer-coarse:px-3 text-ui font-medium text-muted transition-colors hover:text-ink hover:border-hairline no-underline"
                >
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-brand" />
                  <span translate="no">{p.name}</span>
                </a>
              </li>
            ))}
            <li>
              <a
                href="#matrix"
                className="inline-flex items-center gap-1 rounded-full border border-hairline/60 bg-surface/70 px-2.5 py-0.5 pointer-coarse:min-h-11 pointer-coarse:px-3 text-ui font-medium text-muted transition-colors hover:text-ink hover:border-hairline no-underline"
              >
                <span>{copy.matrix.title[locale]}</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Problem Matcher Wizard */}
      <ProblemMatcher locale={locale} copy={problemMatcherCopy} products={products} />

      {/* Manufacturing, Data & Efficiency Section */}
      <section id="manufacturing" aria-labelledby="manufacturing-heading" className="scroll-mt-[calc(var(--nav-offset)+4rem)]">
        <div className="mx-auto w-full max-w-content px-6 pt-16">
          <Stack gap="tight" className="border-b border-hairline pb-8">
            <Text variant="eyebrow" tone="muted">{copy.categories.manufacturing[locale]}</Text>
            <Heading level={2} variant="title" id="manufacturing-heading">
              {copy.categories.manufacturingIntro.title[locale]}
            </Heading>
            <Text variant="lede" tone="muted" className="max-w-3xl">
              {copy.categories.manufacturingIntro.lede[locale]}
            </Text>
          </Stack>
        </div>

        {manufacturingProducts.map((product) => (
          <ProductBlock key={product.id} product={product} locale={locale} labels={copy.section}>
            {product.id === "analytics" && (
              <ChatDemo copy={chatDemoFor(locale)} locale={locale} product={{ name: product.name, brandKey: product.brandKey }} />
            )}
          </ProductBlock>
        ))}

        {manufacturingServices.map((service) => (
          <ServiceBlock key={service.id} service={service} locale={locale} labels={copy.serviceSection} />
        ))}
      </section>

      {/* Sustainability Section */}
      <section id="sustainability" aria-labelledby="sustainability-heading" className="scroll-mt-[calc(var(--nav-offset)+4rem)]">
        <div className="mx-auto w-full max-w-content px-6 pt-16">
          <Stack gap="tight" className="border-b border-hairline pb-8">
            <Text variant="eyebrow" tone="muted">{copy.categories.sustainability[locale]}</Text>
            <Heading level={2} variant="title" id="sustainability-heading">
              {copy.categories.sustainabilityIntro.title[locale]}
            </Heading>
            <Text variant="lede" tone="muted" className="max-w-3xl">
              {copy.categories.sustainabilityIntro.lede[locale]}
            </Text>
          </Stack>
        </div>

        {sustainabilityProducts.map((product) => (
          <ProductBlock key={product.id} product={product} locale={locale} labels={copy.section} />
        ))}

        {sustainabilityServices.map((service) => (
          <ServiceBlock key={service.id} service={service} locale={locale} labels={copy.serviceSection} />
        ))}
      </section>

      {/* Positioning Matrix */}
      <div id="matrix" className="scroll-mt-[calc(var(--nav-offset)+4rem)]">
        <PositioningMatrix locale={locale} products={products} copy={copy.matrix} />
      </div>

      <CtaBand
        id="consult"
        title={copy.consult.title[locale]}
        body={copy.consult.body[locale]}
        action={
          <RainbowButton as={Link} href="/contact">{copy.consult.action[locale]}</RainbowButton>
        }
      />

      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: copy.breadcrumb.home[locale], href: "/" },
          { name: copy.breadcrumb.self[locale], href: "/solutions" },
        ])}
      />
    </>
  );
}
