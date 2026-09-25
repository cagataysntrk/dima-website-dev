import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Button } from "@upcytech/ui";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { products } from "@/content/products";
import { industries } from "@/content/industries";
import { teamForDisplay } from "@/content/team";
import { getPosts } from "@/lib/blog";
import { PostList } from "@/components/sections/blog";
import { homePage as copy } from "@/content/pages/home";
import { HomeHero } from "@/components/home/home-hero";
import { RainbowButton } from "@/components/vendor/magicui/rainbow-button";
import {
  LoopBand, ProductWheel, ReferenceStrip, SectorsSection,
} from "@/components/sections/home";
import { TeamRow } from "@/components/sections/team-row";
import { CtaBand } from "@/components/sections/cta-band";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  return {
    ...pageMetadata({ href: "/", locale, title: copy.meta.title[locale], description: copy.meta.description[locale] }),
    // The home title is the brand line itself; skip the "| UpcyTech" template.
    title: { absolute: copy.meta.title[locale] },
  };
}

/** Brief §5, in order. */
export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const latest = (await getPosts(locale)).slice(0, 3);
  // The master product is the only customer-facing product on the new site. Legacy portfolio
  // data stays in content until the route-by-route consolidation phase.
  const dima = products.find((p) => p.id === "analytics")!;

  return (
    <>
      <HomeHero
        title={copy.hero.title[locale]}
        accents={copy.hero.accents[locale]}
        lede={copy.hero.lede[locale]}
        actions={
          <>
            <RainbowButton as={Link} href="/solutions">{copy.hero.primary[locale]}</RainbowButton>
            {/* Important: the DS cn does not know the site-only rounded-button, so it keeps rounded-control. */}
            <Button variant="secondary" asChild className="rounded-button!">
              <Link href="/contact">{copy.hero.secondary[locale]}</Link>
            </Button>
          </>
        }
      />

      <ReferenceStrip
        label={copy.references.label[locale]}
        partners={copy.references.partners}
      />

      <ProductWheel
        locale={locale}
        products={[dima]}
        title={copy.productIndex.title[locale]}
        labels={{
          wheel: copy.productIndex.wheel[locale],
          link: copy.productIndex.link[locale],
          missingDesktop: copy.productIndex.missingDesktop[locale],
          missingMobile: copy.productIndex.missingMobile[locale],
        }}
      />

      {/* Chat-first and multi-product sections are removed in the brand-foundation pass.
          Company Brain becomes the primary product experience in the next coherent phase. */}

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
