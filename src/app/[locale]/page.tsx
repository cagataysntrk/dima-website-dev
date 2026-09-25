import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Button } from "@upcytech/ui";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { industries } from "@/content/industries";
import { teamForDisplay } from "@/content/team";
import { getPosts } from "@/lib/blog";
import { PostList } from "@/components/sections/blog";
import { homePage as copy } from "@/content/pages/home";
import { HomeHero } from "@/components/home/home-hero";
import { RainbowButton } from "@/components/vendor/magicui/rainbow-button";
import {
  LoopBand, ReferenceStrip, SectorsSection,
} from "@/components/sections/home";
import { CompanyBrainExperience, CompanyBrainHero } from "@/components/sections/company-brain";
import { TeamRow } from "@/components/sections/team-row";
import { CtaBand } from "@/components/sections/cta-band";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  return {
    ...pageMetadata({ href: "/", locale, title: copy.meta.title[locale], description: copy.meta.description[locale] }),
    // The home title is the brand line itself; skip the global title template.
    title: { absolute: copy.meta.title[locale] },
  };
}

/** Brief §5, in order. */
export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const latest = (await getPosts(locale)).slice(0, 3);
  const tryUrl = process.env.NEXT_PUBLIC_TRY_URL?.trim();
  return (
    <>
      <HomeHero
        descriptor={copy.hero.descriptor[locale]}
        title={copy.hero.title[locale]}
        accents={copy.hero.accents[locale]}
        lede={copy.hero.lede[locale]}
        actions={
          <>
            {tryUrl ? (
              <RainbowButton as="a" href={tryUrl}>{copy.hero.primary[locale]}</RainbowButton>
            ) : (
              <RainbowButton as={Link} href="/solutions">{copy.hero.primaryFallback[locale]}</RainbowButton>
            )}
            {/* Important: the DS cn does not know the site-only rounded-button, so it keeps rounded-control. */}
            <Button variant="secondary" asChild className="rounded-button!">
              <Link href="/contact">{copy.hero.secondary[locale]}</Link>
            </Button>
          </>
        }
        visual={<CompanyBrainHero locale={locale} />}
      />

      <ReferenceStrip
        label={copy.references.label[locale]}
        partners={copy.references.partners}
      />

      <CompanyBrainExperience locale={locale} />

      <SectorsSection locale={locale} industries={industries} copy={copy.industries} />

      <LoopBand text={copy.loop[locale]} lang={locale} />

      <TeamRow
        title={copy.team.title[locale]}
        intro={copy.team.intro[locale]}
        photoLabel={copy.team.photo[locale]}
        members={teamForDisplay.map((m) => ({ id: m.id, name: m.name[locale], role: m.role[locale], photo: m.photo }))}
      />

      {/* A second ribbon under the team, in a violet product colour, running the other way. */}
      <LoopBand text={copy.loop[locale]} lang={locale} brand="dima" direction="reverse" />

      {/* The three latest posts. With no published post the section stays out —
          it never renders invented stand-ins. */}
      {latest.length > 0 && (
        <PostList id="writing" title={copy.blog.title[locale]} posts={latest} locale={locale}
                  link={{ label: copy.blog.link[locale] }} />
      )}

      <CtaBand
        id="talk"
        title={copy.cta.title[locale]}
        body={copy.cta.body[locale]}
        action={
          <RainbowButton as={Link} href="/contact">{copy.cta.action[locale]}</RainbowButton>
        }
      />
    </>
  );
}
