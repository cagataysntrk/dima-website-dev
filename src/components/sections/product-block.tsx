import { Heading, Section, Stack, Text } from "@upcytech/ui";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { Product } from "@/content/products";
import type { L } from "@/content/types";
import { Part, PointList } from "./parts";
import { Reveal } from "../motion/reveal";
import { WorkflowFlow } from "./workflow-flow";
import { FaqAccordion } from "./faq-accordion";
import { Safari } from "@/components/vendor/magicui/safari";
import { Iphone } from "@/components/vendor/magicui/iphone";
import { RainbowButton } from "@/components/vendor/magicui/rainbow-button";

interface Labels {
  problem: L;
  capabilities: L;
  audience: L;
  ownSiteNote: L;
  domainNeeded: L;
}

/**
 * One product, rendered entirely from content/products.ts. Nothing here knows a product's
 * name. `data-brand` scopes the accent to this block, where it appears as the brand dot and
 * the block's single primary action — never as a fill or a surface (D-029).
 */
export function ProductBlock({ product, locale, labels, children }: {
  product: Product;
  locale: Locale;
  labels: Labels;
  children?: React.ReactNode;
}) {
  const titleId = `${product.slug}-title`;

  return (
    <Section divided id={product.slug} aria-labelledby={titleId} data-brand={product.brandKey} className="scroll-mt-[calc(var(--nav-offset)+4rem)]">
      <Reveal className="grid gap-10 lg:grid-cols-12">
        <Stack className="lg:col-span-5 lg:sticky lg:top-[calc(var(--nav-offset)+4rem)] lg:self-start">
          <Text variant="eyebrow" className="flex items-center gap-2">
            <span aria-hidden="true" className="size-2 shrink-0 rounded-chip bg-brand" />
            {/* The name never shrinks (the site's flex children are min-width:0, which broke it
                mid-word on phones); the category wraps instead. */}
            <span className="shrink-0 text-ink" translate="no">{product.name}</span>
            <span aria-hidden="true" className="shrink-0">·</span>
            <span>{product.category[locale]}</span>
          </Text>
          <Heading level={2} variant="title" id={titleId}>{product.title[locale]}</Heading>
          <ProductAction product={product} locale={locale} labels={labels} />
        </Stack>

        <Stack gap="loose" className="lg:col-span-7">
          {(product.screens?.desktop || product.screens?.mobile) && (
            // The product's real interface, static and lazy: the surrounding copy says
            // everything, so assistive technology skips the mockups.
            <div aria-hidden="true" data-brand={product.brandKey} className="relative mx-auto w-full max-w-[22rem] sm:max-w-md lg:max-w-none pb-[9%] pr-[16%]">
                <Safari
                  url={product.domain ? new URL(product.domain).host : ""}
                  imageSrc={product.screens?.desktop}
                  mode="simple"
                  className="drop-shadow-[0_24px_48px_color-mix(in_oklab,var(--color-text-primary)_18%,transparent)]"
                />
                {product.screens?.mobile && (
                  // Positioned by a wrapper, as in the home showcase: Iphone's root carries its own
                  // `relative w-full`, which beat a passed `absolute w-[27%]` — the phone rendered
                  // full width under the browser, one to two screens tall.
                  <div className="absolute bottom-0 right-0 w-[27%]">
                    <Iphone
                      src={product.screens.mobile}
                      className="drop-shadow-[0_18px_36px_color-mix(in_oklab,var(--color-text-primary)_22%,transparent)]"
                    />
                  </div>
                )}
              </div>
            )}
          <Part title={labels.problem[locale]}>
            {product.problem[locale].map((p) => <Text key={p}>{p}</Text>)}
          </Part>

          <Part title={labels.capabilities[locale]}>
            <PointList points={product.capabilities[locale]} />
            {product.note && <Text variant="small" tone="muted">{product.note[locale]}</Text>}
          </Part>

          {product.landing && (
            <>
              <Part title={product.landing.workflow.title[locale]}>
                <Text>{product.landing.workflow.intro[locale]}</Text>
                <WorkflowFlow steps={product.landing.workflow.steps[locale]} />
              </Part>
              <Part title={product.landing.details.title[locale]}>
                <PointList points={product.landing.details.items[locale]} />
              </Part>
              <Part title={product.landing.questions.title[locale]}>
                <FaqAccordion items={product.landing.questions.items[locale]} idPrefix={`${product.slug}-faq`} />
              </Part>
            </>
          )}

          <Part title={labels.audience[locale]}>
            {product.audience[locale].map((p) => <Text key={p}>{p}</Text>)}
          </Part>

          {children && <div className="pt-2">{children}</div>}
        </Stack>
      </Reveal>
    </Section>
  );
}

function ProductAction({ product, locale, labels }: { product: Product; locale: Locale; labels: Labels }) {
  if (!product.hasOwnSite) {
    return (
      <div>
        <RainbowButton as={Link} href="/contact">{product.cta[locale]}</RainbowButton>
      </div>
    );
  }
  if (!product.domain) {
    return <Text variant="small" className="text-negative">{labels.domainNeeded[locale]}</Text>;
  }
  return (
    <Stack gap="tight">
      <div>
        <RainbowButton as="a" href={product.domain}>{product.cta[locale]}</RainbowButton>
      </div>
      <Text variant="small" tone="muted">{labels.ownSiteNote[locale]}</Text>
    </Stack>
  );
}
