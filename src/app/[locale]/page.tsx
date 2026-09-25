import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Button } from "@upcytech/ui";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { products } from "@/content/products";
import { industries } from "@/content/industries";
import { services } from "@/content/services";
import { teamForDisplay } from "@/content/team";
import { getPosts } from "@/lib/blog";
import { PostList } from "@/components/sections/blog";
import { homePage as copy } from "@/content/pages/home";
import { HomeHero } from "@/components/home/home-hero";
import { RainbowButton } from "@/components/vendor/magicui/rainbow-button";
import {
  LoopBand, ProductWheel, ReferenceStrip, SectorsSection, WhatWeDo,
} from "@/components/sections/home";
import { TeamRow } from "@/components/sections/team-row";
import { CtaBand } from "@/components/sections/cta-band";
import { pageMetadata } from "@/lib/seo";

import { ChatDemo } from "@/components/sections/chat-demo/chat-demo";
import { chatDemoCopy, chatDemoFor } from "@/content/dima-demo";
import { Heading, Section, Stack, Text } from "@upcytech/ui";

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
  // The chat demo is the analytics product's screen, found by id — never by list position.
  const analytics = products.find((p) => p.id === "analytics")!;

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
        products={products}
        title={copy.productIndex.title[locale]}
        labels={{
          wheel: copy.productIndex.wheel[locale],
          link: copy.productIndex.link[locale],
          missingDesktop: copy.productIndex.missingDesktop[locale],
          missingMobile: copy.productIndex.missingMobile[locale],
        }}
      />

      {/* The product's chat screen, working, on sample data (D-040) — under the products. */}
      <Section divided aria-labelledby="chat-demo-heading">
        <Stack gap="loose">
          <div className="flex flex-col items-center gap-3 text-center">
            <Heading level={2} variant="title" id="chat-demo-heading">
              {chatDemoCopy.title[locale]}
            </Heading>
            <Text variant="lede" tone="muted" className="max-w-2xl">
              {chatDemoCopy.subtitle[locale]}
            </Text>
          </div>
          <div className="mx-auto w-full max-w-6xl">
            <ChatDemo copy={chatDemoFor(locale)} locale={locale} product={analytics} />
          </div>
        </Stack>
      </Section>

      <WhatWeDo
        locale={locale}
        title={copy.whatWeDo.title[locale]}
        products={pick(copy.whatWeDo.products, locale)}
        services={pick(copy.whatWeDo.services, locale)}
        lines={services.map((s) => ({ anchor: s.anchor[locale], name: s.name[locale], claim: s.title[locale] }))}
        lineLink={copy.whatWeDo.lineLink[locale]}
      />

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

function pick(block: { title: { tr: string; en: string }; body: { tr: string; en: string }; link: { tr: string; en: string } }, locale: Locale) {
  return { title: block.title[locale], body: block.body[locale], link: block.link[locale] };
}
