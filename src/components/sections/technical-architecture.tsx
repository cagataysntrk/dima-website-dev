"use client";

import * as React from "react";
import {
  Activity,
  BrainCircuit,
  Database,
  FileSearch,
  GitBranch,
  ListChecks,
  MemoryStick,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { Heading, Section, Stack, Text } from "@upcytech/ui";

import type { Locale } from "@/i18n/routing";
import { technicalArchitecture, type TechnicalLayerId } from "@/content/technical-architecture";
import { AnimatedBackground } from "@/components/vendor/motion-primitives/animated-background";

const ICONS: Record<TechnicalLayerId, LucideIcon> = {
  sources: Database,
  model: GitBranch,
  analytics: BrainCircuit,
  watch: Activity,
  investigation: FileSearch,
  decision: ListChecks,
  memory: MemoryStick,
};

export function TechnicalArchitecture({ locale }: { locale: Locale }) {
  const c = technicalArchitecture;
  const [activeId, setActiveId] = React.useState<TechnicalLayerId>("sources");
  const activeIndex = c.layers.findIndex((item) => item.id === activeId);
  const active = c.layers[activeIndex] ?? c.layers[0];
  const ActiveIcon = ICONS[active.id];

  return (
    <Section
      width="wide"
      responsive
      aria-labelledby="technical-architecture-title"
      className="bg-[var(--upcytech-neutral-1000)] py-20! text-white sm:py-24! lg:py-28!"
    >
      <Stack gap="loose">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <Stack gap="tight" className="lg:col-span-8">
            <Text variant="eyebrow" className="text-white/50">{c.eyebrow[locale]}</Text>
            <Heading level={2} variant="title" id="technical-architecture-title" className="max-w-4xl text-white">
              {c.title[locale]}
            </Heading>
            <p className="max-w-3xl text-ui leading-relaxed text-white/60">{c.intro[locale]}</p>
          </Stack>
          <div className="space-y-2 lg:col-span-4 lg:justify-self-end">
            {c.principles.map((principle) => (
              <div key={principle.title.en} className="flex items-center gap-2 text-micro text-white/55">
                <ShieldCheck aria-hidden="true" className="size-3.5 text-brand-text" />
                <span>{principle.title[locale]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid overflow-hidden rounded-[1.35rem] border border-white/12 bg-white/[0.035] lg:grid-cols-[18rem_minmax(0,1fr)]">
          <nav aria-label={c.title[locale]} className="border-b border-white/10 p-3 lg:border-b-0 lg:border-r lg:p-4">
            <div className="flex snap-x snap-mandatory gap-1 overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:flex-col lg:overflow-visible">
              <AnimatedBackground
                defaultValue={active.id}
                onValueChange={(id) => {
                  if (id) setActiveId(id as TechnicalLayerId);
                }}
                className="rounded-[0.9rem] bg-white/10"
                transition={{ type: "spring", stiffness: 380, damping: 36 }}
              >
                {c.layers.map((layer, index) => {
                  const Icon = ICONS[layer.id];
                  return (
                    <button
                      key={layer.id}
                      data-id={layer.id}
                      type="button"
                      aria-pressed={layer.id === active.id}
                      className="min-w-[10.75rem] snap-start rounded-[0.9rem] px-3 py-3 text-left text-white/55 transition-colors data-[checked=true]:text-white sm:min-w-[12rem] lg:min-w-0"
                    >
                      <span className="flex items-center gap-3">
                        <span className="font-mono text-[0.62rem] tabular-nums opacity-45">{String(index + 1).padStart(2, "0")}</span>
                        <Icon aria-hidden="true" className="size-4 shrink-0" />
                        <span className="text-ui font-semibold">{layer.short[locale]}</span>
                      </span>
                    </button>
                  );
                })}
              </AnimatedBackground>
            </div>
          </nav>

          <div className="min-w-0">
            <div className="grid gap-6 border-b border-white/10 p-4 sm:gap-8 sm:p-7 lg:grid-cols-[minmax(0,1fr)_18rem] lg:p-8">
              <div>
                <span className="grid size-11 place-items-center rounded-control border border-white/12 bg-white/5 text-brand-text">
                  <ActiveIcon aria-hidden="true" className="size-5" />
                </span>
                <p className="mt-5 font-mono text-micro uppercase tracking-[0.12em] text-white/40">
                  {String(activeIndex + 1).padStart(2, "0")} / {String(c.layers.length).padStart(2, "0")}
                </p>
                <h3 className="mt-2 max-w-2xl text-xl font-semibold tracking-tight text-white sm:text-2xl">{active.title[locale]}</h3>
                <p className="mt-3 max-w-3xl text-ui leading-relaxed text-white/60">{active.body[locale]}</p>
              </div>

              <dl className="divide-y divide-white/10 border-y border-white/10 lg:border-y-0">
                <div className="py-4 lg:pt-0">
                  <dt className="font-mono text-micro uppercase tracking-[0.12em] text-white/35">{c.labels.input[locale]}</dt>
                  <dd className="mt-2 text-ui font-medium leading-relaxed text-white">{active.input[locale]}</dd>
                </div>
                <div className="py-4">
                  <dt className="font-mono text-micro uppercase tracking-[0.12em] text-white/35">{c.labels.output[locale]}</dt>
                  <dd className="mt-2 text-ui font-medium leading-relaxed text-white">{active.output[locale]}</dd>
                </div>
              </dl>
            </div>

            <div className="p-4 sm:p-7 lg:p-8">
              <div className="grid gap-5 lg:grid-cols-[0.6fr_1.4fr]">
                <div>
                  <p className="font-mono text-micro uppercase tracking-[0.12em] text-white/40">{c.assurances.eyebrow[locale]}</p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-white">{c.assurances.title[locale]}</h3>
                </div>
                <div className="grid gap-x-7 gap-y-6 sm:grid-cols-2">
                  {c.assurances.items.map((item) => (
                    <article key={item.title.en} className="border-t border-white/12 pt-4">
                      <div className="flex items-center gap-2">
                        <ShieldCheck aria-hidden="true" className="size-4 text-brand-text" />
                        <h4 className="text-ui font-semibold text-white">{item.title[locale]}</h4>
                      </div>
                      <p className="mt-2 text-micro leading-relaxed text-white/55">{item.body[locale]}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Stack>
    </Section>
  );
}
