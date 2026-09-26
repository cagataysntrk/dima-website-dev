import { Heading, Link as UiLink, Section, Stack, Text } from "@upcytech/ui";
import { getPathname, Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { Industry } from "@/content/industries";
import type { Product } from "@/content/products";
import type { L, Point } from "@/content/types";
import type { Partner } from "@/content/pages/home";
import { PointList } from "./parts";
import { Reveal, RevealItem } from "../motion/reveal";
import { TextAnimate } from "../vendor/magicui/text-animate";
import { BentoCard, BentoGrid } from "../vendor/magicui/bento-grid";
import { Boxes, Code2, Compass, Layers, Leaf } from "lucide-react";
import { HyperText } from "../vendor/magicui/hyper-text";
import { ProductShowcase } from "./product-showcase";
import { SectorGallery } from "./sector-gallery";
import { LoopBandCanvas } from "./loop-band-client";

/**
 * gsap (TextLoop) is the heaviest client dep in these sections. It lives behind a client
 * boundary (loop-band-client) with `dynamic ssr:false`, so it enters neither the server bundle
 * nor the initial JS.
 */

/**
 * A home section title: the design system's `title` heading, its words blurring in once as it
 * scrolls into view (Magic UI TextAnimate). Titles already on screen at load stay still.
 */
function SectionTitle({ id, children, className }: { id: string; children: string; className?: string }) {
  return (
    <TextAnimate as="h2" id={id} by="word" animation="blurInUp" duration={0.4}
                 className={["font-title font-semibold text-title text-balance text-ink", className].filter(Boolean).join(" ")}>
      {children}
    </TextAnimate>
  );
}

/** One logo. `decorative` for the marquee's duplicate copy, which screen readers skip. */
function PartnerLogo({ partner, decorative }: { partner: Partner; decorative: boolean }) {
  const alt = decorative ? "" : partner.name;
  const img = "h-10 w-auto max-w-none object-contain";
  if (partner.dark === "swap" && partner.darkSrc) {
    return (
      <>
        <img src={partner.src} alt={alt} width={partner.width} height={partner.height} loading="lazy" decoding="async" className={`logo-on-light ${img}`} />
        <img src={partner.darkSrc} alt="" width={partner.width} height={partner.height} loading="lazy" decoding="async" className={`logo-on-dark ${img}`} />
      </>
    );
  }
  return (
    <img
      src={partner.src} alt={alt} width={partner.width} height={partner.height} loading="lazy" decoding="async"
      className={`${partner.dark === "white" ? "partner-white-on-dark" : "partner-invert-on-light"} ${img}`}
    />
  );
}

/**
 * The partner strip, after upcyman.com's LogoCloud: a slow marquee of logos, dimmed until
 * hovered, paused on hover, faded at both edges. Pure CSS (globals.css),
 * so it runs off the main thread. Screen readers get each name once; reduced motion gets a
 * still, wrapped row instead of the scroll.
 */
export function ReferenceStrip({ label, partners }: { label: string; partners: readonly Partner[] }) {
  return (
    // No visible title: the logos speak for themselves. The label stays as the section's
    // accessible name, so a screen reader still hears what the row is. Full bleed: the row
    // runs edge to edge of the screen, not inside the content column.
    <section aria-label={label} className="border-t border-hairline py-10 sm:py-12">
      <div className="marquee relative w-full overflow-hidden" style={{ "--marquee-gap": "3rem", "--marquee-duration": "40s" } as React.CSSProperties}>
        <div className="marquee-rail flex gap-(--marquee-gap)">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              aria-hidden={copy === 1 || undefined}
              className="marquee-track flex min-w-full shrink-0 items-center justify-around gap-(--marquee-gap)"
            >
              {partners.map((partner) => (
                <li
                  key={partner.name}
                  className="flex h-16 shrink-0 items-center px-2 opacity-60 transition-opacity duration-200 ease-out-expo hoverable:hover:opacity-100"
                >
                  <PartnerLogo partner={partner} decorative={copy === 1} />
                </li>
              ))}
            </ul>
          ))}
        </div>
        <div aria-hidden="true" className="marquee-fade pointer-events-none absolute inset-y-0 left-0 w-8 bg-linear-to-r from-canvas to-transparent sm:w-16 lg:w-24" />
        <div aria-hidden="true" className="marquee-fade pointer-events-none absolute inset-y-0 right-0 w-8 bg-linear-to-l from-canvas to-transparent sm:w-16 lg:w-24" />
      </div>
    </section>
  );
}

/** A card's backdrop: a dot field in the brand tint, strongest in its top-right corner. */
const DOT_FIELD =
  "absolute inset-0 bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-text-brand)_22%,transparent)_1px,transparent_1.5px)] " +
  "bg-[length:14px_14px] [mask-image:radial-gradient(75%_65%_at_100%_0%,black,transparent)]";

const SERVICE_ICONS = [Code2, Compass, Leaf] as const;

/**
 * What we do, as a bento grid (Magic UI BentoGrid): products, wide; services beside it; then
 * one card per service line with its claim. Every card is a link. Content only from the typed
 * files — nothing invented.
 */
export function WhatWeDo({ locale, title, products: productsCell, services: servicesCell, lines, lineLink }: {
  locale: Locale;
  title: string;
  products: { title: string; body: string; link: string };
  services: { title: string; body: string; link: string };
  lines: readonly { anchor: string; name: string; claim: string }[];
  lineLink: string;
}) {
  const solutionsPath = getPathname({ href: "/solutions", locale });
  return (
    <Section divided aria-labelledby="what-title">
      <Stack gap="loose">
        <SectionTitle id="what-title">{title}</SectionTitle>
        <Reveal>
          <BentoGrid>
            <BentoCard
              className="md:col-span-2"
              Icon={Boxes}
              name={productsCell.title}
              description={productsCell.body}
              href={solutionsPath}
              cta={productsCell.link}
              background={<div className={DOT_FIELD} />}
            />
            <BentoCard
              Icon={Layers}
              name={servicesCell.title}
              description={servicesCell.body}
              href={solutionsPath}
              cta={servicesCell.link}
              background={<div className={DOT_FIELD} />}
            />
            {lines.map((line, i) => (
              <BentoCard
                key={line.anchor}
                Icon={SERVICE_ICONS[i % SERVICE_ICONS.length]!}
                name={line.name}
                description={line.claim}
                href={`${solutionsPath}#${line.anchor}`}
                cta={lineLink}
                background={<div className={DOT_FIELD} />}
              />
            ))}
          </BentoGrid>
        </Reveal>
      </Stack>
    </Section>
  );
}

/**
 * The four products on a wheel (React Bits OptionWheel) beside a browser and a phone (Magic UI
 * Safari and iPhone) showing the selected product's real interface — in place of the text
 * index — under a centred section title.
 */
export function ProductWheel({ locale, products, title, labels }: {
  locale: Locale;
  products: readonly Product[];
  title: string;
  labels: { wheel: string; link: string; missingDesktop: string; missingMobile: string };
}) {
  const base = getPathname({ href: "/solutions", locale });
  return (
    <Section divided aria-labelledby="index-title">
      <div className="mb-10 flex flex-col items-center gap-5 sm:mb-14">
        <SectionTitle id="index-title" className="text-center">{title}</SectionTitle>
        {/* A short rule under the centred title anchors the middle of the section. */}
        <span aria-hidden="true" className="h-0.5 w-24 rounded-full bg-linear-to-r from-transparent via-[var(--color-text-brand)] to-transparent" />
      </div>
      <ProductShowcase
        labels={labels}
        items={products.map((p) => ({
          id: p.id,
          name: p.name,
          brandKey: p.brandKey,
          oneLiner: p.oneLiner[locale],
          href: `${base}#${p.slug}`,
          host: p.domain ? new URL(p.domain).host : undefined,
          desktop: p.screens?.desktop,
          mobile: p.screens?.mobile,
        }))}
      />
    </Section>
  );
}

/**
 * The sectors: the title and a short intro, the link to the sectors page beside them; below,
 * the sectors as an accordion gallery of photographs, each opening to its summary and a link to
 * its section. (The globe that stood here now turns in the hero, D-038.)
 */
export function SectorsSection({ locale, industries, copy }: {
  locale: Locale;
  industries: readonly Industry[];
  copy: { title: L; intro: L; link: L; missingPhoto: L };
}) {
  const base = getPathname({ href: "/industries", locale });
  return (
    <Section width="wide" responsive divided aria-labelledby="industries-title">
      <div className="mb-10 grid gap-6 sm:mb-14 lg:grid-cols-12 lg:items-end">
        <Stack gap="tight" className="lg:col-span-8">
          <SectionTitle id="industries-title">{copy.title[locale]}</SectionTitle>
          <Text variant="lede" tone="muted" className="max-w-2xl">{copy.intro[locale]}</Text>
        </Stack>
        <UiLink as={Link} href="/industries" variant="standalone" className="self-start lg:col-span-4 lg:self-end lg:justify-self-end">
          {copy.link[locale]} <span aria-hidden="true">→</span>
        </UiLink>
      </div>
      <SectorGallery
        linkLabel={copy.link[locale]}
        missingLabel={copy.missingPhoto[locale]}
        items={industries.map((i) => ({
          id: i.id,
          name: i.name[locale],
          summary: i.summary[locale],
          href: `${base}#${i.anchor[locale]}`,
          image: i.image?.src,
          alt: i.image?.alt[locale] ?? "",
        }))}
      />
    </Section>
  );
}

/**
 * A separator, not a section: a thin brand ribbon with the company's lines running along a
 * shallow wave (React Bits TextLoop), set on the seam between two sections — negative margins
 * pull it over their padding — and cropped to the ribbon's band. The SVG carries the text as
 * its accessible name. The ribbon is wide enough to give the text the same breathing room above
 * and below (measured: within a pixel of centred).
 */
export function LoopBand({ text, lang, brand, direction = "forward" }: {
  text: string;
  /** Language for the ribbon's uppercase (Turkish i → İ). */
  lang: string;
  /** A design-system brand for the ribbon's colour (its data-brand re-declares the brand roles). */
  brand?: Product["brandKey"];
  direction?: "forward" | "reverse";
}) {
  return (
    // Equal whitespace on both sides: the neighbouring sections' own padding frames it, plus
    // the same margin above and below — it separates, it never crowds.
    <div data-brand={brand} className="relative z-10 my-3 h-24 overflow-hidden sm:my-5 sm:h-28">
      <LoopBandCanvas
        text={text}
        lang={lang}
        separator="✦"
        shape="wave"
        curviness={10}
        fontSize={24}
        fontWeight={650}
        letterSpacing={2.2}
        speed={56}
        ribbonWidth={52}
        direction={direction}
        className="h-full"
      />
    </div>
  );
}

/** Principles: what can be promised without a case study (the careers page's "how we work"). */
export function Principles({ title, intro, principles }: { title: string; intro: string; principles: readonly Point[] }) {
  return (
    <Section divided aria-labelledby="how-title">
      <Reveal className="grid gap-10 lg:grid-cols-12">
        <Stack gap="tight" className="lg:col-span-5">
          <SectionTitle id="how-title">{title}</SectionTitle>
          <Text tone="muted">{intro}</Text>
        </Stack>
        <div className="lg:col-span-7">
          <PointList points={principles} />
        </div>
      </Reveal>
    </Section>
  );
}

/** Five people, with visible portrait placeholders until a member's own photo is supplied. */
export function TeamGrid({ title, intro, photoLabel, members }: {
  title: string;
  intro: string;
  photoLabel: string;
  /** `background` is shown where there is room for it — /about, not the home page. */
  members: { name: string; role: string; background?: string; photo?: string }[];
}) {
  return (
    <Section divided aria-labelledby="team-title">
      <Stack gap="loose">
        <Stack gap="tight" className="max-w-prose">
          <SectionTitle id="team-title">{title}</SectionTitle>
          <Text tone="muted">{intro}</Text>
        </Stack>
        {/* Wrapped rows, centred, as in TeamRow: no one left alone at a row's edge. */}
        <Reveal as="ul" stagger className="flex flex-wrap justify-center gap-x-6 gap-y-8">
          {members.map((member, i) => (
            <RevealItem as="li" key={i} className="flex w-full flex-col gap-3 min-[360px]:w-[calc((100%-1.5rem)/2)] md:w-[calc((100%-3rem)/3)] lg:w-[calc((100%-6rem)/5)]">
              {member.photo ? (
                <img
                  src={member.photo}
                  alt=""
                  width={600}
                  height={800}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full rounded-card object-cover"
                />
              ) : (
                <div
                  aria-hidden="true"
                  className="grid aspect-[4/5] place-items-center rounded-card border border-dashed border-outline bg-raised font-mono text-micro uppercase text-muted"
                >
                  {photoLabel}
                </div>
              )}
              <div className="flex flex-col gap-0.5">
                <p className="text-ui font-medium text-ink">{member.name}</p>
                <p className="text-ui text-muted">{member.role}</p>
                {member.background && <p className="pt-2 text-ui leading-relaxed text-muted">{member.background}</p>}
              </div>
            </RevealItem>
          ))}
        </Reveal>
      </Stack>
    </Section>
  );
}

/** A section whose content the company has not supplied: titled, and visibly empty. */
export function PlaceholderSection({ id, title, items, link }: {
  id: string;
  title: string;
  items: { title: string; body?: string }[];
  link?: { label: string; href: "/blog" };
}) {
  return (
    <Section divided aria-labelledby={`${id}-title`}>
      <Reveal className="grid gap-10 lg:grid-cols-12">
        <Stack gap="tight" className="lg:col-span-5">
          <SectionTitle id={`${id}-title`}>{title}</SectionTitle>
          {link && (
            <UiLink as={Link} href={link.href} variant="standalone" className="self-start">
              {link.label} <span aria-hidden="true">→</span>
            </UiLink>
          )}
        </Stack>
        <ul className="flex flex-col lg:col-span-7">
          {items.map((item, i) => (
            <li key={i} className="flex flex-col gap-1 border-t border-hairline py-4">
              <p className="font-medium text-ink">{item.title}</p>
              {item.body && <p className="text-muted">{item.body}</p>}
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
