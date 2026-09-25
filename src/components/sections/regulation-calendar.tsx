import { Heading, Section, Stack, Text } from "@upcytech/ui";
import type { Locale } from "@/i18n/routing";
import type { Industry } from "@/content/industries";
import type { L } from "@/content/types";
import { Reveal, RevealItem } from "../motion/reveal";

interface CalendarEntry {
  date: string;
  sectorId: string;
  sectorName: string;
  sectorHref: string;
  text: string;
  source: string;
}

/**
 * Every dated pressure from every sector on one calendar, oldest first — the demand
 * arriving with a date, exactly as the page promises. Undated buyer requirements stay
 * in their sector's section. Entries link back to their sector.
 */
export function RegulationCalendar({ industries, locale, copy, baseHref }: {
  industries: readonly Industry[];
  locale: Locale;
  copy: { title: L; intro: L; source: L };
  /** The industries page path, so sector tags link to their sections. */
  baseHref: string;
}) {
  const format = new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-GB", {
    dateStyle: "long",
    timeZone: "UTC",
  });
  const entries: CalendarEntry[] = industries
    .flatMap((industry) =>
      industry.pressures
        .filter((p) => p.date !== null)
        .map((pressure) => ({
          date: pressure.date as string,
          sectorId: industry.id,
          sectorName: industry.name[locale],
          sectorHref: `${baseHref}#${industry.anchor[locale]}`,
          text: pressure.text[locale],
          source: pressure.source[locale],
        })),
    )
    .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <Section divided aria-labelledby="calendar-title">
      <Stack gap="loose">
        <Stack gap="tight" className="max-w-prose">
          <Heading level={2} variant="title" id="calendar-title">{copy.title[locale]}</Heading>
          <Text tone="muted">{copy.intro[locale]}</Text>
        </Stack>
        <Reveal as="ol" stagger className="relative ml-1 flex max-w-prose flex-col border-l border-outline pl-6">
          {entries.map((entry, i) => (
            <RevealItem
              as="li"
              key={`${entry.sectorId}-${entry.date}`}
              className="relative flex flex-col gap-1.5 border-t border-hairline py-4 first:border-t-0 first:pt-0"
            >
              <span aria-hidden="true" className={`absolute -left-[29px] ${i === 0 ? "top-[10px]" : "top-[26px]"} size-2 rounded-full bg-ink`} />
              <p className="flex flex-wrap items-baseline gap-x-3">
                <time dateTime={entry.date} className="font-mono text-ui text-ink tabular">
                  {format.format(new Date(entry.date))}
                </time>
                <a href={entry.sectorHref} className="text-ui font-medium text-brand-text no-underline hoverable:hover:underline">
                  {entry.sectorName}
                </a>
              </p>
              <p className="leading-relaxed text-ink">{entry.text}</p>
              <p className="font-mono text-micro uppercase text-muted">
                {copy.source[locale]} <span aria-hidden="true" className="opacity-40">·</span> {entry.source}
              </p>
            </RevealItem>
          ))}
        </Reveal>
      </Stack>
    </Section>
  );
}
