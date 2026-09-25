import { Heading, Section, Stack, Text } from "@upcytech/ui";
import { getPathname, Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { Industry, Pressure } from "@/content/industries";
import type { Product } from "@/content/products";
import type { L } from "@/content/types";
import { Part, PointList } from "./parts";
import { Reveal, RevealItem } from "../motion/reveal";
import { RainbowButton } from "@/components/vendor/magicui/rainbow-button";

interface Labels {
  pressures: L;
  provides: L;
  products: L;
  ongoing: L;
  source: L;
}

/**
 * One sector. Every sector renders the same structure in the same order — summary, dated
 * pressures, what we build, products that apply, enquiry — so a reader can locate their own
 * sector fast and compare it with the others (brief §5).
 */
export function IndustryBlock({ industry, products, locale, labels }: {
  industry: Industry;
  products: readonly Product[];
  locale: Locale;
  labels: Labels;
}) {
  const anchor = industry.anchor[locale];
  const titleId = `${anchor}-title`;
  const applies = industry.products
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));

  return (
    <Section divided id={anchor} aria-labelledby={titleId}>
      <Reveal className="grid gap-10 lg:grid-cols-12">
        <Stack className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start">
          <Heading level={2} variant="title" id={titleId}>{industry.name[locale]}</Heading>
          <Text tone="muted">{industry.summary[locale]}</Text>
          <div>
            <RainbowButton as={Link} href={{ pathname: "/contact", query: { sector: industry.enquiry.sector } }}>{industry.enquiry.label[locale]}</RainbowButton>
          </div>
          {industry.image && (
            <figure className="mt-2 hidden sm:block">
              <img
                src={industry.image.src}
                alt={industry.image.alt[locale]}
                width={1200}
                height={900}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full rounded-card border border-hairline object-cover"
              />
              <figcaption className="mt-2 font-mono text-micro uppercase text-muted">{industry.image.credit}</figcaption>
            </figure>
          )}
        </Stack>

        <Stack gap="loose" className="lg:col-span-7">
          <Part title={labels.pressures[locale]}>
            <Pressures pressures={industry.pressures} locale={locale} labels={labels} />
          </Part>

          <Part title={labels.provides[locale]}>
            <PointList points={industry.provides[locale]} />
            {industry.note && <Text variant="small" tone="muted">{industry.note[locale]}</Text>}
          </Part>

          <Part title={labels.products[locale]}>
            <ul className="flex flex-wrap gap-2">
              {applies.map((product) => (
                <li key={product.id} data-brand={product.brandKey}>
                  <a
                    href={`${getPathname({ href: "/products", locale })}#${product.slug}`}
                    translate="no"
                    className="inline-flex min-h-9 items-center gap-2 rounded-tag border border-hairline bg-surface px-3 text-ui text-ink no-underline transition-colors duration-160 ease-out-expo hoverable:hover:border-outline pointer-coarse:min-h-11"
                  >
                    <span aria-hidden="true" className="size-2 shrink-0 rounded-chip bg-brand" />
                    {product.name}
                  </a>
                </li>
              ))}
            </ul>
            {industry.productsNote && <Text variant="small" tone="muted">{industry.productsNote[locale]}</Text>}
          </Part>
        </Stack>
      </Reveal>
    </Section>
  );
}

/**
 * The page's signature: each pressure is a record, not a claim — a date in tabular mono,
 * the obligation in plain words, and a source line beneath it (DESIGN.md §8 applied to
 * regulation rather than to a figure). Oldest first, so the list reads as a calendar.
 */
function Pressures({ pressures, locale, labels }: { pressures: Pressure[]; locale: Locale; labels: Labels }) {
  const format = new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-GB", {
    dateStyle: "long",
    timeZone: "UTC",
  });

  return (
    // Staggered: the dates are a sequence, and revealing them in order reads as a calendar.
    // The rail makes the sequence visible: one line, one dot per dated pressure.
    <Reveal as="ol" stagger className="relative ml-1 flex flex-col border-l border-outline pl-6">
      {pressures.map((pressure, i) => (
        <RevealItem as="li" key={i} className="relative grid gap-x-6 gap-y-1.5 border-t border-hairline py-4 first:border-t-0 first:pt-0 sm:grid-cols-[10rem_minmax(0,1fr)]">
          <span aria-hidden="true" className={`absolute -left-[29px] ${i === 0 ? "top-[10px]" : "top-[26px]"} size-2 rounded-full bg-ink`} />
          {/* A fixed column the longest date fits on one line ("17 September 2026"): a 3/12 share
              of this narrow column wrapped some dates and not others. */}
          <p className="font-mono text-ui text-ink tabular sm:whitespace-nowrap">
            {pressure.date
              ? <time dateTime={pressure.date}>{format.format(new Date(pressure.date))}</time>
              : <span className="text-muted">{labels.ongoing[locale]}</span>}
          </p>
          <div className="flex flex-col gap-2">
            <p className="max-w-prose leading-relaxed text-ink">{pressure.text[locale]}</p>
            <p className="font-mono text-micro uppercase text-muted">
              {labels.source[locale]} <span aria-hidden="true" className="opacity-40">·</span> {pressure.source[locale]}
            </p>
          </div>
        </RevealItem>
      ))}
    </Reveal>
  );
}
