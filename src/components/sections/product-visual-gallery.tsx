"use client";

import * as React from "react";
import { Pause, Play } from "lucide-react";
import { Heading, Section, Stack, Text } from "@upcytech/ui";

import type { Locale } from "@/i18n/routing";
import { productVisuals as copy } from "@/content/product-visuals";

function useReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return reduced;
}

export function ProductVisualGallery({ locale }: { locale: Locale }) {
  const reduced = useReducedMotion();
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const active = copy.items[index] ?? copy.items[0];

  React.useEffect(() => {
    if (paused || reduced) return;
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % copy.items.length), 5200);
    return () => window.clearInterval(timer);
  }, [paused, reduced]);

  return (
    <Section divided aria-labelledby="product-visuals-title">
      <Stack gap="loose">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <Stack gap="tight" className="max-w-4xl">
            <Text variant="eyebrow">{copy.eyebrow[locale]}</Text>
            <Heading level={2} variant="title" id="product-visuals-title">{copy.title[locale]}</Heading>
          </Stack>
          <button
            type="button"
            onClick={() => setPaused((value) => !value)}
            className="inline-flex min-h-11 w-fit items-center gap-2 rounded-button border border-hairline bg-surface px-3 text-ui text-muted shadow-sm lg:justify-self-end"
          >
            {paused ? <Play aria-hidden="true" className="size-4" /> : <Pause aria-hidden="true" className="size-4" />}
            {(paused ? copy.controls.resume : copy.controls.pause)[locale]}
          </button>
        </div>

        <div className="overflow-hidden rounded-[1.75rem] border border-outline bg-surface shadow-xl">
          <div className="flex gap-2 overflow-x-auto border-b border-hairline bg-canvas/70 p-2 sm:p-3">
            {copy.items.map((item, itemIndex) => (
              <button
                key={item.src}
                type="button"
                onClick={() => { setIndex(itemIndex); setPaused(true); }}
                aria-pressed={itemIndex === index}
                className={[
                  "min-w-max rounded-button border px-3 py-2 text-ui font-medium transition",
                  itemIndex === index ? "border-ink/10 bg-ink text-canvas" : "border-hairline bg-surface text-ink",
                ].join(" ")}
              >
                {item.title[locale]}
              </button>
            ))}
          </div>

          <figure key={active.src} className="dima-tour-scene">
            <div className="relative aspect-[16/10] overflow-hidden bg-raised">
              <img
                src={active.src}
                alt={active.title[locale]}
                width={1536}
                height={1024}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 size-full object-cover object-top"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-3 p-4 text-white sm:p-6">
                <div>
                  <span className="rounded-button border border-white/25 bg-black/35 px-2.5 py-1 font-mono text-micro uppercase tracking-[0.12em] backdrop-blur-sm">
                    {copy.badge[locale]}
                  </span>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">{active.title[locale]}</h3>
                </div>
                <p className="max-w-xl text-ui leading-relaxed text-white/80">{active.body[locale]}</p>
              </figcaption>
            </div>
          </figure>
        </div>
      </Stack>
    </Section>
  );
}
