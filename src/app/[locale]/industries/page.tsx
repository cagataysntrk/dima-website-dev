import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Button, Heading, Section, Stack, Text } from "@upcytech/ui";

import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { industriesPage as copy } from "@/content/pages/industries";
import { PageHero } from "@/components/sections/page-hero";
import { UseCaseLab } from "@/components/sections/use-case-lab";
import { CapabilityDirectory } from "@/components/sections/capability-catalog";
import { PointList } from "@/components/sections/parts";
import { CtaBand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { RainbowButton } from "@/components/vendor/magicui/rainbow-button";

export async function generateMetadata({ params }: PageProps<"/[locale]/industries">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  return pageMetadata({
    href: "/industries",
    locale,
    title: copy.meta.title[locale],
    description: copy.meta.description[locale],
  });
}

export default async function IndustriesPage({ params }: PageProps<"/[locale]/industries">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const items = [...copy.domains, ...copy.sectorPacks];

  return (
    <>
      <PageHero
        title={copy.hero.title[locale]}
        lede={copy.hero.lede[locale]}
        action={
          <nav aria-label={copy.hero.jumpLabel[locale]}>
            <ul className="flex flex-wrap gap-2">
              {items.map((item) => (
                <li key={item.id}>
                  <Button variant="secondary" asChild>
                    <a href={`#${item.anchor[locale]}`}>{item.title[locale]}</a>
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        }
      />

      <Section divided aria-labelledby="use-case-principle">
        <div className="grid gap-8 lg:grid-cols-12">
          <Heading level={2} variant="title" id="use-case-principle" className="lg:col-span-5">
            {copy.principle.title[locale]}
          </Heading>
          <Text variant="lede" tone="muted" className="lg:col-span-7">
            {copy.principle.body[locale]}
          </Text>
        </div>
      </Section>

      <CapabilityDirectory locale={locale} />
      <UseCaseLab locale={locale} />

      {copy.domains.map((item) => (
        <UseCaseSection key={item.id} item={item} locale={locale} />
      ))}

      {copy.sectorPacks.map((item) => (
        <UseCaseSection key={item.id} item={item} locale={locale} />
      ))}

      <CtaBand
        id="enquiry"
        title={copy.cta.title[locale]}
        body={copy.cta.body[locale]}
        action={<RainbowButton as={Link} href="/contact">{copy.cta.action[locale]}</RainbowButton>}
      />

      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: copy.breadcrumb.home[locale], href: "/" },
          { name: copy.breadcrumb.self[locale], href: "/industries" },
        ])}
      />
    </>
  );
}

function UseCaseSection({ item, locale }: {
  item: (typeof copy.domains)[number] | (typeof copy.sectorPacks)[number];
  locale: Locale;
}) {
  return (
    <Section divided id={item.anchor[locale]} aria-labelledby={`${item.id}-title`} className="scroll-mt-[calc(var(--nav-offset)+4rem)]">
      <div className="grid gap-10 lg:grid-cols-12">
        <Stack gap="tight" className="lg:col-span-5 lg:sticky lg:top-[calc(var(--nav-offset)+4rem)] lg:self-start">
          <Text variant="eyebrow" tone="muted">{item.eyebrow[locale]}</Text>
          <Heading level={2} variant="title" id={`${item.id}-title`}>{item.title[locale]}</Heading>
          <Text tone="muted">{item.intro[locale]}</Text>
          <ul className="flex flex-wrap gap-2 pt-2">
            {item.clusters[locale].map((cluster) => (
              <li key={cluster} className="rounded-chip border border-hairline bg-raised px-2.5 py-1.5 text-micro font-medium text-muted">
                {cluster}
              </li>
            ))}
          </ul>
        </Stack>
        <div className="lg:col-span-7">
          <PointList points={[...item.behaviors[locale]]} />
        </div>
      </div>
    </Section>
  );
}
