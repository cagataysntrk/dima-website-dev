import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Button, Section } from "@upcytech/ui";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { teamForDisplay } from "@/content/team";
import { aboutPage as copy } from "@/content/pages/about";
import { contactPage as contactCopy } from "@/content/pages/contact";
import { site } from "@/content/site";
import { PageHero } from "@/components/sections/page-hero";
import { Beliefs, FactList, Story } from "@/components/sections/about";
import { OfficeMap } from "@/components/contact/office-map";
import { TeamGrid } from "@/components/sections/home";
import { CtaBand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { RainbowButton } from "@/components/vendor/magicui/rainbow-button";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  return pageMetadata({
    href: "/about",
    locale,
    title: copy.meta.title[locale],
    description: copy.meta.description[locale],
  });
}

/** Brief §5: why we exist, story, beliefs, team (load-bearing), where, partners, CTA. */
export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);

  return (
    <>
      <PageHero title={copy.hero.title[locale]} lede={copy.hero.lede[locale]} />

      <Story title={copy.story.title[locale]} paragraphs={copy.story.paragraphs[locale]} />

      <Beliefs title={copy.beliefs.title[locale]} items={copy.beliefs.items[locale]} />

      <TeamGrid
        title={copy.team.title[locale]}
        intro={copy.team.intro[locale]}
        photoLabel={copy.team.photo[locale]}
        members={teamForDisplay.map((m) => ({ name: m.name[locale], role: m.role[locale], background: m.background[locale], photo: m.photo }))}
      />

      <FactList
        id="where"
        title={copy.where.title[locale]}
        intro={copy.where.intro[locale]}
        facts={copy.where.facts[locale]}
      />

      {/* The registered address as a place, not a line: the contact page's map. */}
      <OfficeMapSection locale={locale} />

      <CtaBand
        id="contact"
        title={copy.cta.title[locale]}
        body={copy.cta.body[locale]}
        action={
          <>
            <RainbowButton as={Link} href="/contact">{copy.cta.primary[locale]}</RainbowButton>
            {/* Important: the DS cn does not know the site-only rounded-button, so it keeps rounded-control. */}
            <Button variant="secondary" asChild className="rounded-button!">
              <Link href="/careers">{copy.cta.secondary[locale]}</Link>
            </Button>
          </>
        }
      />

      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: copy.breadcrumb.home[locale], href: "/" },
          { name: copy.breadcrumb.self[locale], href: "/about" },
        ])}
      />
    </>
  );
}

function OfficeMapSection({ locale }: { locale: Locale }) {
  const map = contactCopy.office.map;
  return (
    <Section divided aria-label={map.label[locale]}>
      <OfficeMap
        coordinates={site.company.officeCoordinates}
        labels={{
          label: map.label[locale],
          openExternal: map.openExternal[locale],
          missing: map.missing[locale],
          controls: {
            zoomIn: map.controls.zoomIn[locale],
            zoomOut: map.controls.zoomOut[locale],
            locate: map.controls.locate[locale],
            fullscreen: map.controls.fullscreen[locale],
            resetBearing: map.controls.resetBearing[locale],
          },
        }}
      />
    </Section>
  );
}
