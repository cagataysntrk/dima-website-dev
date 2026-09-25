import { Heading, Section, Stack, Text } from "@upcytech/ui";
import type { Locale } from "@/i18n/routing";

import { productVisuals as copy } from "@/content/product-visuals";

export function ProductVisualGallery({ locale }: { locale: Locale }) {
  return (
    <Section divided aria-labelledby="product-visuals-title">
      <Stack gap="loose">
        <Stack gap="tight" className="max-w-4xl">
          <Text variant="eyebrow">{copy.eyebrow[locale]}</Text>
          <Heading level={2} variant="title" id="product-visuals-title">{copy.title[locale]}</Heading>
          <Text variant="lede" tone="muted">{copy.intro[locale]}</Text>
        </Stack>
        <div className="grid gap-5">
          {copy.items.map((visual, index) => (
            <figure
              key={visual.src}
              className={[
                "overflow-hidden rounded-card border border-outline bg-surface shadow-sm",
                index % 2 === 1 ? "lg:ml-[8%]" : "lg:mr-[8%]",
              ].join(" ")}
            >
              <div className="relative overflow-hidden border-b border-hairline bg-raised">
                <img
                  src={visual.src}
                  alt=""
                  width={960}
                  height={640}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[3/2] w-full object-cover object-top"
                />
                <span className="absolute left-3 top-3 rounded-chip border border-hairline bg-surface/90 px-2.5 py-1 font-mono text-micro text-muted backdrop-blur-sm">
                  {copy.badge[locale]}
                </span>
              </div>
              <figcaption className="grid gap-2 p-5 sm:p-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                <h3 className="text-lg font-semibold text-ink">{visual.title[locale]}</h3>
                <p className="text-ui leading-relaxed text-muted">{visual.body[locale]}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Stack>
    </Section>
  );
}
