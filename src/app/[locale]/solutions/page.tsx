import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Button } from "@upcytech/ui";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { solutionsPage as copy } from "@/content/pages/solutions";
import { PageHero } from "@/components/sections/page-hero";
import { UseCaseLab } from "@/components/sections/use-case-lab";
import { VisualProductTour } from "@/components/sections/visual-product-tour";
import { TechnicalArchitecture } from "@/components/sections/technical-architecture";
import { ProductVisualGallery } from "@/components/sections/product-visual-gallery";
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

      <VisualProductTour locale={locale} />
      <UseCaseLab locale={locale} />
      <TechnicalArchitecture locale={locale} />
      <ProductVisualGallery locale={locale} />

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
