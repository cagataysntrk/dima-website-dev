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
  const activeIndex = c.layers.findIndex((item) => item.id === activeId);
  const active = c.layers[activeIndex] ?? c.layers[0];

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
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <Stack gap="tight" className="max-w-4xl">
            <Text variant="eyebrow">{c.eyebrow[locale]}</Text>
            <Heading level={2} variant="title" id="technical-architecture-title">{c.title[locale]}</Heading>
          </Stack>
          <div className="flex flex-wrap gap-2 lg:justify-end">
            {c.principles.map((principle) => (
              <span key={principle.title.en} className="inline-flex items-center gap-1.5 rounded-button border border-hairline bg-surface px-3 py-2 text-micro font-medium text-ink">
                <ShieldCheck aria-hidden="true" className="size-3.5 text-brand-text" />
                {principle.title[locale]}
              </span>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-[1.75rem] border border-outline bg-surface shadow-sm">
          <div className="flex gap-2 overflow-x-auto border-b border-hairline bg-canvas/70 p-3">
            {c.layers.map((layer, index) => {
              const Icon = ICONS[layer.id];
              const selected = layer.id === active.id;
              return (
                <React.Fragment key={layer.id}>
                  <button
                    type="button"
                    onClick={() => { setActiveId(layer.id); setManual(true); }}
                    aria-pressed={selected}
                    className={[
                      "min-w-[8.5rem] rounded-control border px-3 py-3 text-left transition",
                      selected ? "border-ink/10 bg-ink text-canvas shadow-sm" : "border-hairline bg-surface text-ink",
                    ].join(" ")}
                  >
                    <Icon aria-hidden="true" className={["size-4", selected ? "text-white" : "text-brand-text"].join(" ")} />
                    <span className="mt-2 block text-micro font-semibold">{layer.short[locale]}</span>
                  </button>
                  {index < c.layers.length - 1 && <span aria-hidden="true" className="self-center text-muted">›</span>}
                </React.Fragment>
              );
            })}
          </div>

          <div className="grid min-h-[28rem] lg:grid-cols-[0.72fr_1.28fr]">
            <div className="border-b border-hairline p-5 sm:p-7 lg:border-b-0 lg:border-r">
              <p className="font-mono text-micro uppercase tracking-[0.12em] text-brand-text">
                {String(activeIndex + 1).padStart(2, "0")} / {String(c.layers.length).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight text-ink">{active.title[locale]}</h3>
              <p className="mt-3 line-clamp-4 text-ui leading-relaxed text-muted">{active.body[locale]}</p>
              <div className="mt-6 grid gap-3">
                <div className="rounded-control border border-hairline bg-raised p-3">
                  <p className="text-micro text-muted">{c.labels.input[locale]}</p>
                  <p className="mt-1 text-ui font-medium text-ink">{active.input[locale]}</p>
                </div>
                <div className="rounded-control border border-hairline bg-raised p-3">
                  <p className="text-micro text-muted">{c.labels.output[locale]}</p>
                  <p className="mt-1 text-ui font-medium text-ink">{active.output[locale]}</p>
                </div>
              </div>
            </div>

            <div className="relative min-h-[28rem] overflow-hidden p-5 sm:p-8">
              <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,color-mix(in_oklab,var(--color-text-brand)_9%,transparent),transparent_46%)]" />
              <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full text-brand-text/25">
                <path d="M 12 28 C 31 28, 31 45, 47 50" fill="none" stroke="currentColor" strokeWidth="0.45" strokeDasharray="2 2" vectorEffect="non-scaling-stroke" />
                <path d="M 12 50 C 31 50, 33 50, 47 50" fill="none" stroke="currentColor" strokeWidth="0.45" strokeDasharray="2 2" vectorEffect="non-scaling-stroke" />
                <path d="M 12 72 C 31 72, 31 55, 47 50" fill="none" stroke="currentColor" strokeWidth="0.45" strokeDasharray="2 2" vectorEffect="non-scaling-stroke" />
                <path d="M 53 50 C 68 50, 68 34, 88 34" fill="none" stroke="currentColor" strokeWidth="0.45" strokeDasharray="2 2" vectorEffect="non-scaling-stroke" />
                <path d="M 53 50 C 68 50, 68 66, 88 66" fill="none" stroke="currentColor" strokeWidth="0.45" strokeDasharray="2 2" vectorEffect="non-scaling-stroke" />
              </svg>

              <div className="absolute left-[8%] top-[19%] space-y-3">
                {["ERP", "DB", "Excel"].map((item, index) => (
                  <span key={item} className="flex min-w-24 items-center gap-2 rounded-control border border-hairline bg-surface/95 px-3 py-2 text-micro font-medium text-ink shadow-sm">
                    <span className="size-1.5 rounded-full bg-brand motion-safe:animate-pulse" style={{ animationDelay: `${index * 180}ms` }} />
                    {item}
                  </span>
                ))}
              </div>

              <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
                <div className="relative grid size-32 place-items-center rounded-[2rem] border border-brand-text/30 bg-surface shadow-xl">
                  <span aria-hidden="true" className="absolute inset-3 rounded-[1.5rem] border border-brand-text/15 motion-safe:animate-pulse" />
                  {(() => {
                    const Icon = ICONS[active.id];
                    return <Icon aria-hidden="true" className="relative size-8 text-brand-text" />;
                  })()}
                  <span className="absolute -bottom-7 whitespace-nowrap rounded-button border border-hairline bg-surface px-3 py-1.5 text-micro font-semibold text-ink shadow-sm">
                    {active.short[locale]}
                  </span>
                </div>
              </div>

              <div className="absolute right-[8%] top-[27%] space-y-3">
                {[locale === "tr" ? "Sinyal" : "Signal", locale === "tr" ? "Karar" : "Decision", locale === "tr" ? "Hafıza" : "Memory"].map((item, index) => (
                  <span key={item} className="flex min-w-24 items-center gap-2 rounded-control border border-hairline bg-surface/95 px-3 py-2 text-micro font-medium text-ink shadow-sm">
                    <span className="size-1.5 rounded-full bg-brand motion-safe:animate-pulse" style={{ animationDelay: `${index * 220}ms` }} />
                    {item}
                  </span>
                ))}
              </div>

              <span aria-hidden="true" className="dima-tech-pulse absolute left-[44%] top-1/2 size-3 -translate-y-1/2 rounded-full bg-brand shadow-[0_0_22px_color-mix(in_oklab,var(--color-bg-brand)_70%,transparent)]" />
            </div>
          </div>
        </div>

        <div className="grid gap-4 border-t border-hairline pt-8 lg:grid-cols-[0.62fr_1.38fr]">
          <Stack gap="tight" className="max-w-xl">
            <Text variant="eyebrow">{c.assurances.eyebrow[locale]}</Text>
            <h3 className="text-2xl font-semibold tracking-tight text-ink">{c.assurances.title[locale]}</h3>
          </Stack>
          <div className="grid gap-3 sm:grid-cols-2">
            {c.assurances.items.map((item) => (
              <article key={item.title.en} className="rounded-card border border-hairline bg-surface p-4 shadow-sm">
                <span className="grid size-8 place-items-center rounded-control bg-raised text-brand-text">
                  <ShieldCheck aria-hidden="true" className="size-4" />
                </span>
                <h4 className="mt-3 text-ui font-semibold text-ink">{item.title[locale]}</h4>
                <p className="mt-1.5 text-micro leading-relaxed text-muted">{item.body[locale]}</p>
              </article>
            ))}
          </div>
        </div>
      </Stack>
    </Section>
  );
}
