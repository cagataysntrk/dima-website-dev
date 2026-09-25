import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Button } from "@upcytech/ui";
import { getPathname, Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { frameworks, industries } from "@/content/industries";
import { products } from "@/content/products";
import { industriesPage as copy } from "@/content/pages/industries";
import { PageHero } from "@/components/sections/page-hero";
import { IndustryBlock } from "@/components/sections/industry-block";
import { RegulationCalendar } from "@/components/sections/regulation-calendar";
import { FrameworkTable } from "@/components/sections/framework-table";
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

  return (
    <>
      {/* No primary button in the hero: each sector carries its own enquiry, and the page
          keeps one primary action per view. The hero offers the way to your sector instead. */}
      <PageHero
        title={copy.hero.title[locale]}
        lede={copy.hero.lede[locale]}
        action={
          <nav aria-label={copy.hero.jumpLabel[locale]}>
            <ul className="flex flex-wrap gap-2">
              {industries.map((industry) => (
                <li key={industry.id}>
                  <Button variant="secondary" asChild>
                    <a href={`#${industry.anchor[locale]}`}>{industry.name[locale]}</a>
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        }
      />

      {industries.map((industry) => (
        <IndustryBlock
          key={industry.id}
          industry={industry}
          products={products}
          locale={locale}
          labels={copy.sector}
        />
      ))}

      <RegulationCalendar
        industries={industries}
        locale={locale}
        copy={{ title: copy.calendar.title, intro: copy.calendar.intro, source: copy.sector.source }}
        baseHref={getPathname({ href: "/industries", locale })}
      />

      <FrameworkTable locale={locale} frameworks={frameworks} copy={copy.compliance} />

      <CtaBand
        id="enquiry"
        title={copy.cta.title[locale]}
        body={copy.cta.body[locale]}
        action={
          <RainbowButton as={Link} href="/contact">{copy.cta.action[locale]}</RainbowButton>
        }
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
