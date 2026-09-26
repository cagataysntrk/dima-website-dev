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

const ICONS: Record<TechnicalLayerId, LucideIcon> = {
  sources: Database,
  model: GitBranch,
  analytics: BrainCircuit,
  watch: Activity,
  investigation: FileSearch,
  decision: ListChecks,
  memory: MemoryStick,
};

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

export function TechnicalArchitecture({ locale }: { locale: Locale }) {
  const c = technicalArchitecture;
  const reduced = useReducedMotion();
  const [activeId, setActiveId] = React.useState<TechnicalLayerId>("sources");
  const [manual, setManual] = React.useState(false);
  const active = c.layers.find((item) => item.id === activeId) ?? c.layers[0];

  React.useEffect(() => {
    if (manual || reduced) return;
    const timer = window.setInterval(() => {
      setActiveId((current) => {
        const index = c.layers.findIndex((item) => item.id === current);
        return c.layers[(index + 1) % c.layers.length]!.id;
      });
    }, 3000);
    return () => window.clearInterval(timer);
  }, [manual, reduced, c.layers]);

  return (
    <Section divided aria-labelledby="technical-architecture-title">
      <Stack gap="loose">
        <Stack gap="tight" className="max-w-4xl">
          <Text variant="eyebrow">{c.eyebrow[locale]}</Text>
          <Heading level={2} variant="title" id="technical-architecture-title">{c.title[locale]}</Heading>
          <Text variant="lede" tone="muted">{c.intro[locale]}</Text>
        </Stack>

        <div className="overflow-hidden rounded-card border border-outline bg-surface shadow-sm">
          <div className="border-b border-hairline p-4">
            <p className="font-mono text-micro uppercase tracking-[0.12em] text-muted">{c.labels.sample[locale]}</p>
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {c.layers.map((layer, index) => {
                const Icon = ICONS[layer.id];
                const selected = layer.id === active.id;
                return (
                  <React.Fragment key={layer.id}>
                    <button
                      type="button"
                      aria-pressed={selected}
                      onClick={() => { setActiveId(layer.id); setManual(true); }}
                      className={[
                        "min-w-[7.75rem] rounded-control border p-3 text-left transition",
                        selected ? "border-brand-text/40 bg-[color-mix(in_oklab,var(--color-text-brand)_7%,var(--color-bg-surface))]" : "border-hairline bg-raised",
                      ].join(" ")}
                    >
                      <Icon aria-hidden="true" className="size-4 text-brand-text" />
                      <span className="mt-2 block text-micro font-semibold text-ink">{layer.short[locale]}</span>
                    </button>
                    {index < c.layers.length - 1 && (
                      <span aria-hidden="true" className="self-center text-muted">›</span>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          <div className="grid lg:grid-cols-[minmax(0,1fr)_20rem]">
            <div className="p-5 sm:p-7">
              <div className="flex items-start gap-3">
                {(() => {
                  const Icon = ICONS[active.id];
                  return (
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-control bg-raised text-brand-text">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                  );
                })()}
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-ink">{active.title[locale]}</h3>
                  <p className="mt-2 max-w-3xl text-ui leading-relaxed text-muted">{active.body[locale]}</p>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-control border border-hairline bg-raised p-4">
                  <p className="text-micro font-medium text-muted">{c.labels.input[locale]}</p>
                  <p className="mt-1 text-ui font-medium text-ink">{active.input[locale]}</p>
                </div>
                <div className="rounded-control border border-hairline bg-raised p-4">
                  <p className="text-micro font-medium text-muted">{c.labels.output[locale]}</p>
                  <p className="mt-1 text-ui font-medium text-ink">{active.output[locale]}</p>
                </div>
              </div>
            </div>

            <aside className="border-t border-hairline bg-raised/45 p-5 lg:border-l lg:border-t-0">
              <div className="flex items-center gap-2">
                <ShieldCheck aria-hidden="true" className="size-4 text-brand-text" />
                <p className="text-ui font-semibold text-ink">{c.labels.principle[locale]}</p>
              </div>
              <div className="mt-4 space-y-4">
                {c.principles.map((principle) => (
                  <article key={principle.title.en}>
                    <p className="text-ui font-semibold text-ink">{principle.title[locale]}</p>
                    <p className="mt-1 text-micro leading-relaxed text-muted">{principle.body[locale]}</p>
                  </article>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </Stack>
    </Section>
  );
}
