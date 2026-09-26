"use client";

import * as React from "react";
import { BriefcaseBusiness, Calculator, Factory, Pause, Play, type LucideIcon } from "lucide-react";
import { Heading, Section, Stack, Text } from "@upcytech/ui";
import type { Locale } from "@/i18n/routing";
import {
  capabilityDepths,
  capabilityDepthsCopy,
  type CapabilityDepthId,
} from "@/content/capability-depths";

const ICONS: Record<CapabilityDepthId, LucideIcon> = {
  management: BriefcaseBusiness,
  finance: Calculator,
  manufacturing: Factory,
};

export function CapabilityDepths({ locale }: { locale: Locale }) {
  const [activeId, setActiveId] = React.useState<CapabilityDepthId>("management");
  const [paused, setPaused] = React.useState(false);
  const [reduced, setReduced] = React.useState(false);
  const active = capabilityDepths.find((item) => item.id === activeId) ?? capabilityDepths[0];

  React.useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  React.useEffect(() => {
    if (paused || reduced) return;
    const timer = window.setInterval(() => {
      setActiveId((current) => {
        const index = capabilityDepths.findIndex((item) => item.id === current);
        return capabilityDepths[(index + 1) % capabilityDepths.length]!.id;
      });
    }, 5200);
    return () => window.clearInterval(timer);
  }, [paused, reduced]);

  const select = (id: CapabilityDepthId) => {
    setActiveId(id);
    setPaused(true);
  };

  return (
    <Section divided aria-labelledby="capability-depths-title">
      <Stack gap="loose">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <Stack gap="tight" className="lg:col-span-8">
            <Text variant="eyebrow">{capabilityDepthsCopy.eyebrow[locale]}</Text>
            <Heading level={2} variant="title" id="capability-depths-title">
              {capabilityDepthsCopy.title[locale]}
            </Heading>
            <Text variant="lede" tone="muted" className="max-w-3xl">
              {capabilityDepthsCopy.intro[locale]}
            </Text>
          </Stack>
          <div className="lg:col-span-4 lg:justify-self-end">
            <button
              type="button"
              onClick={() => setPaused((value) => !value)}
              aria-label={(paused ? capabilityDepthsCopy.auto.resume : capabilityDepthsCopy.auto.pause)[locale]}
              className="inline-flex min-h-11 items-center gap-2 rounded-control border border-hairline bg-raised px-3 text-ui text-muted transition hoverable:hover:text-ink"
            >
              {paused ? <Play aria-hidden="true" className="size-4" /> : <Pause aria-hidden="true" className="size-4" />}
              {(paused ? capabilityDepthsCopy.auto.resume : capabilityDepthsCopy.auto.pause)[locale]}
            </button>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[17rem_minmax(0,1fr)]">
          <div
            role="tablist"
            aria-label={capabilityDepthsCopy.selectLabel[locale]}
            className="grid gap-2 sm:grid-cols-3 xl:grid-cols-1"
          >
            {capabilityDepths.map((item) => {
              const Icon = ICONS[item.id];
              const selected = item.id === active.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => select(item.id)}
                  className={[
                    "min-h-14 rounded-card border p-4 text-left transition duration-160",
                    selected
                      ? "border-brand-text/40 bg-[color-mix(in_oklab,var(--color-text-brand)_8%,var(--color-bg-surface))] shadow-sm"
                      : "border-hairline bg-surface hoverable:hover:border-outline",
                  ].join(" ")}
                >
                  <span className="flex items-center gap-2">
                    <span className="flex size-8 items-center justify-center rounded-control bg-raised text-brand-text">
                      <Icon aria-hidden="true" className="size-4" />
                    </span>
                    <span className="text-ui font-semibold text-ink">{item.eyebrow[locale]}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div role="tabpanel" className="overflow-hidden rounded-card border border-outline bg-surface">
            <div className="border-b border-hairline p-5 sm:p-7">
              <Text variant="eyebrow" tone="muted">{active.question[locale]}</Text>
              <Heading level={3} variant="subheading" className="mt-2">{active.title[locale]}</Heading>
              <Text tone="muted" className="mt-2 max-w-3xl">{active.intro[locale]}</Text>
            </div>
            <div className="grid sm:grid-cols-2">
              {active.items.map((item, index) => (
                <article
                  key={item.title.en}
                  className={[
                    "p-5 sm:p-6",
                    index % 2 === 0 ? "sm:border-r sm:border-hairline" : "",
                    index < active.items.length - 2 ? "border-b border-hairline" : "",
                  ].join(" ")}
                >
                  <span className="font-mono text-micro text-brand-text">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 text-base font-semibold text-ink">{item.title[locale]}</h3>
                  <p className="mt-2 text-ui leading-relaxed text-muted">{item.body[locale]}</p>
                  <div className="mt-4 rounded-control border border-hairline bg-raised p-3">
                    <p className="font-mono text-micro uppercase tracking-[0.12em] text-muted">
                      {capabilityDepthsCopy.exampleLabel[locale]}
                    </p>
                    <p className="mt-1 text-ui leading-relaxed text-ink">{item.example[locale]}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Stack>
    </Section>
  );
}
