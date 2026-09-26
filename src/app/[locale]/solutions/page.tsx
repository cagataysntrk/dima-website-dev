import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Button, Heading, Section, Stack, Text } from "@upcytech/ui";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { solutionsPage as copy } from "@/content/pages/solutions";
import { PageHero } from "@/components/sections/page-hero";
import { ContinuousIntelligence } from "@/components/sections/continuous-intelligence";
import { ProductExperienceSuite } from "@/components/sections/product-experience-suite";
import { CompanyBrainExperience } from "@/components/sections/company-brain";
import { ContextualChatShowcase } from "@/components/sections/contextual-chat-showcase";
import { UseCaseLab } from "@/components/sections/use-case-lab";
import { CapabilityDepths } from "@/components/sections/capability-depths";
import { TechnicalArchitecture } from "@/components/sections/technical-architecture";
import { ProductVisualGallery } from "@/components/sections/product-visual-gallery";
import { WorkflowFlow } from "@/components/sections/workflow-flow";
import { PointList } from "@/components/sections/parts";
import { CtaBand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { RainbowButton } from "@/components/vendor/magicui/rainbow-button";

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
  const tryUrl = process.env.NEXT_PUBLIC_TRY_URL?.trim();

  return (
    <>
      <PageHero
        title={copy.hero.title[locale]}
        lede={copy.hero.lede[locale]}
        action={
          <div className="flex flex-wrap gap-2">
            {tryUrl ? <RainbowButton as="a" href={tryUrl}>{copy.hero.trial[locale]}</RainbowButton> : null}
            {tryUrl ? (
              <Button variant="secondary" asChild>
                <Link href="/contact">{copy.hero.demo[locale]}</Link>
              </Button>
            ) : (
              <RainbowButton as={Link} href="/contact">{copy.hero.demo[locale]}</RainbowButton>
            )}
          </div>
        }
      />

      <ContinuousIntelligence locale={locale} />
      <ProductExperienceSuite locale={locale} />
      <CompanyBrainExperience locale={locale} />
      <ContextualChatShowcase locale={locale} />
      <UseCaseLab locale={locale} />
      <CapabilityDepths locale={locale} />
      <TechnicalArchitecture locale={locale} />
      <ProductVisualGallery locale={locale} />

      <Section divided id="decision-loop" aria-labelledby="decision-loop-title">
        <Stack gap="loose">
          <Stack gap="tight" className="max-w-3xl">
            <Heading level={2} variant="title" id="decision-loop-title">{copy.loop.title[locale]}</Heading>
            <Text variant="lede" tone="muted">{copy.loop.intro[locale]}</Text>
          </Stack>
          <WorkflowFlow steps={[...copy.loop.steps[locale]]} />
        </Stack>
      </Section>

      <Section divided id="trust" aria-labelledby="trust-title">
        <div className="grid gap-10 lg:grid-cols-12">
          <Stack gap="tight" className="lg:col-span-5">
            <Heading level={2} variant="title" id="trust-title">{copy.trust.title[locale]}</Heading>
            <Text tone="muted">{copy.trust.intro[locale]}</Text>
          </Stack>
          <div className="lg:col-span-7">
            <PointList points={[...copy.trust.points[locale]]} />
          </div>
        </div>
      </Section>

      <CtaBand
        id="consult"
        title={copy.consult.title[locale]}
        body={copy.consult.body[locale]}
        action={<RainbowButton as={Link} href="/contact">{copy.consult.action[locale]}</RainbowButton>}
      />

      <JsonLd data={breadcrumbJsonLd(locale, [
        { name: copy.breadcrumb.home[locale], href: "/" },
        { name: copy.breadcrumb.self[locale], href: "/solutions" },
      ])} />
    </>
  );
}
