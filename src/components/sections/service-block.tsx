import { Heading, Section, Stack, Text } from "@upcytech/ui";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { Service } from "@/content/services";
import type { L } from "@/content/types";
import { Part, PointList } from "./parts";
import { Reveal } from "../motion/reveal";
import { RainbowButton } from "@/components/vendor/magicui/rainbow-button";

interface Labels {
  scope: L;
  typical: L;
  offers: L;
  offersCaption: L;
  offerColumns: { name: L; scope: L; keep: L };
  keep: L;
  why: L;
  action: L;
}

/**
 * One service line. No `data-brand`: services are sold as UpcyTech and carry no accent of
 * their own (D-026). Every block shares one action label, because every block has one intent.
 */
export function ServiceBlock({ service, locale, labels }: {
  service: Service;
  locale: Locale;
  labels: Labels;
}) {
  const anchor = service.anchor[locale];
  const titleId = `${anchor}-title`;
  // Jump links to the parts below, in their order — only the ones this service renders.
  const contents: { id: string; label: string }[] = [
    { id: `${anchor}-scope`, label: labels.scope[locale] },
    ...(service.offers ? [{ id: `${anchor}-offers`, label: labels.offers[locale] }] : []),
    { id: `${anchor}-keep`, label: labels.keep[locale] },
    ...(service.why ? [{ id: `${anchor}-why`, label: labels.why[locale] }] : []),
  ];

  return (
    <Section divided id={anchor} aria-labelledby={titleId}>
      <Reveal className="grid gap-10 lg:grid-cols-12">
        <Stack className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start">
          <Text variant="eyebrow">{service.name[locale]}</Text>
          <Heading level={2} variant="title" id={titleId}>{service.title[locale]}</Heading>
          <Text tone="muted">{service.summary[locale]}</Text>
          <div>
            <RainbowButton as={Link} href={{ pathname: "/contact", query: { service: service.enquiry } }}>{labels.action[locale]}</RainbowButton>
          </div>
          <nav aria-label={service.name[locale]} className="mt-2 hidden lg:block">
            <ul className="flex flex-col gap-1 border-l border-hairline pl-4">
              {contents.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="text-ui text-muted no-underline transition-colors duration-160 ease-out-expo hoverable:hover:text-ink">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Stack>

        <Stack gap="loose" className="lg:col-span-7">
          <Part id={`${anchor}-scope`} title={labels.scope[locale]}>
            <PointList points={service.scope[locale]} />
            {service.note && <Text variant="small" tone="muted">{service.note[locale]}</Text>}
          </Part>

          {service.offers && (
            <Part id={`${anchor}-offers`} title={labels.offers[locale]}>
              <Text tone="muted">{labels.offersCaption[locale]}</Text>
              {/* One card per package: the table's three columns become labelled rows,
                  so no information is lost in the card form. */}
              <ul className="grid gap-3 sm:grid-cols-2">
                {service.offers[locale].map((offer) => (
                  <li
                    key={offer.name}
                    className="flex flex-col gap-3 rounded-card border border-hairline bg-raised p-card"
                  >
                    <p className="font-title text-subtitle font-semibold text-ink">{offer.name}</p>
                    <div className="flex flex-col gap-1">
                      <p className="font-mono text-micro uppercase text-muted">{labels.offerColumns.scope[locale]}</p>
                      <p className="leading-relaxed text-muted">{offer.scope}</p>
                    </div>
                    <div className="mt-auto flex flex-col gap-1 border-t border-hairline pt-3">
                      <p className="font-mono text-micro uppercase text-muted">{labels.offerColumns.keep[locale]}</p>
                      <p className="font-medium leading-relaxed text-ink">{offer.keep}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Part>
          )}

          {service.typical && (
            <Part title={labels.typical[locale]}>
              <ul className="flex flex-col">
                {service.typical[locale].map((item, i) => (
                  <li key={i} className="border-t border-hairline py-3 text-ink">{item}</li>
                ))}
              </ul>
            </Part>
          )}

          <Part id={`${anchor}-keep`} title={labels.keep[locale]}>
            <ul className="flex flex-col">
              {service.keep[locale].map((item, i) => (
                <li key={i} className="border-t border-hairline py-3 leading-relaxed text-ink">{item}</li>
              ))}
            </ul>
            {service.proof && <Text variant="small" tone="muted">{service.proof[locale]}</Text>}
          </Part>

          {service.why && (
            <Part id={`${anchor}-why`} title={labels.why[locale]}>
              <PointList points={service.why[locale]} />
            </Part>
          )}
        </Stack>
      </Reveal>
    </Section>
  );
}
