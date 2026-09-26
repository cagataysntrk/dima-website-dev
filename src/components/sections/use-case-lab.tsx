"use client";

import * as React from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  CircleDollarSign,
  Factory,
  FileSearch,
  PackageSearch,
  Radar,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Heading, Section, Stack, Text } from "@upcytech/ui";

import type { Locale } from "@/i18n/routing";
import { useCaseLab, type UseCaseId } from "@/content/use-case-lab";

const ICONS: Record<UseCaseId, LucideIcon> = {
  executive: BriefcaseBusiness,
  finance: CircleDollarSign,
  sales: ShoppingCart,
  manufacturing: Factory,
  procurement: PackageSearch,
  quality: ShieldCheck,
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

export function UseCaseLab({ locale }: { locale: Locale }) {
  const c = useCaseLab;
  const reduced = useReducedMotion();
  const [activeId, setActiveId] = React.useState<UseCaseId>("executive");
  const [manual, setManual] = React.useState(false);
  const activeIndex = c.cases.findIndex((item) => item.id === activeId);
  const active = c.cases[activeIndex] ?? c.cases[0];

  React.useEffect(() => {
    if (manual || reduced) return;
    const timer = window.setInterval(() => {
      setActiveId((current) => {
        const index = c.cases.findIndex((item) => item.id === current);
        return c.cases[(index + 1) % c.cases.length]!.id;
      });
    }, 4800);
    return () => window.clearInterval(timer);
  }, [manual, reduced, c.cases]);

  return (
    <Section divided aria-labelledby="use-case-lab-title">
      <Stack gap="loose">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <Stack gap="tight" className="max-w-4xl">
            <Text variant="eyebrow">{c.eyebrow[locale]}</Text>
            <Heading level={2} variant="title" id="use-case-lab-title">{c.title[locale]}</Heading>
          </Stack>
          <p className="max-w-xl text-ui text-muted lg:text-right">{c.visualNote[locale]}</p>
        </div>

        <div className="overflow-hidden rounded-[1.75rem] border border-outline bg-surface shadow-sm">
          <div className="flex gap-2 overflow-x-auto border-b border-hairline bg-canvas/70 p-2 sm:p-3">
            {c.cases.map((item) => {
              const Icon = ICONS[item.id];
              const selected = item.id === active.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => { setActiveId(item.id); setManual(true); }}
                  aria-pressed={selected}
                  className={[
                    "min-w-max rounded-button border px-3 py-2.5 transition",
                    selected ? "border-ink/10 bg-ink text-canvas shadow-sm" : "border-hairline bg-surface text-ink",
                  ].join(" ")}
                >
                  <span className="flex items-center gap-2">
                    <Icon aria-hidden="true" className={["size-4", selected ? "text-white" : "text-brand-text"].join(" ")} />
                    <span className="text-ui font-semibold">{item.layer[locale]}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="grid gap-0 lg:grid-cols-[0.72fr_1.28fr]">
            <div className="border-b border-hairline p-5 sm:p-7 lg:border-b-0 lg:border-r">
              <p className="font-mono text-micro uppercase tracking-[0.12em] text-brand-text">{active.layer[locale]}</p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight text-ink">{active.title[locale]}</h3>
              <div className="mt-5 rounded-card border border-hairline bg-raised p-4">
                <p className="text-micro font-medium text-muted">{c.labels.problem[locale]}</p>
                <p className="mt-2 line-clamp-3 text-ui leading-relaxed text-ink">{active.problem[locale]}</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {active.data[locale].map((item) => (
                  <span key={item} className="rounded-chip border border-hairline bg-surface px-2 py-1 text-micro text-muted">{item}</span>
                ))}
              </div>
            </div>

            <div className="relative min-h-[26rem] overflow-hidden p-5 sm:p-7">
              <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,color-mix(in_oklab,var(--color-text-brand)_8%,transparent),transparent_50%)]" />
              <svg aria-hidden="true" viewBox="0 0 100 42" preserveAspectRatio="none" className="absolute left-[10%] top-[32%] h-24 w-[80%] text-brand-text/30">
                <path d="M 3 21 C 19 21, 18 8, 34 21 S 51 34, 66 21 S 82 8, 97 21" fill="none" stroke="currentColor" strokeWidth="0.7" strokeDasharray="2 2" vectorEffect="non-scaling-stroke" />
              </svg>

              <div className="relative grid gap-3 sm:grid-cols-4">
                <ProcessNode icon={Radar} number="01" label={c.labels.detects[locale]} active />
                <ProcessNode icon={FileSearch} number="02" label={c.labels.investigates[locale]} />
                <ProcessNode icon={Sparkles} number="03" label={c.labels.recommends[locale]} />
                <ProcessNode icon={ArrowRight} number="04" label={c.labels.result[locale]} />
              </div>

              <div className="relative mt-7 grid gap-3 md:grid-cols-[1fr_0.9fr]">
                <article className="rounded-[1.25rem] border border-brand-text/30 bg-[color-mix(in_oklab,var(--color-text-brand)_6%,var(--color-bg-surface))] p-5 shadow-sm">
                  <p className="font-mono text-micro uppercase tracking-[0.12em] text-brand-text">{c.labels.detects[locale]}</p>
                  <p className="mt-2 line-clamp-3 text-base font-semibold leading-relaxed text-ink">{active.detects[locale]}</p>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface">
                      <span className="dima-usecase-scan block h-full w-3/4 rounded-full bg-brand" />
                    </span>
                    <span className="size-2 rounded-full bg-brand motion-safe:animate-pulse" />
                  </div>
                </article>

                <article className="rounded-[1.25rem] border border-hairline bg-surface p-5 shadow-sm">
                  <p className="font-mono text-micro uppercase tracking-[0.12em] text-muted">{c.labels.result[locale]}</p>
                  <p className="mt-2 text-lg font-semibold leading-snug text-ink">{active.result[locale]}</p>
                  <div className="mt-5 flex items-center gap-2 text-ui font-medium text-brand-text">
                    <Sparkles aria-hidden="true" className="size-4" />
                    <span>{c.ready[locale]}</span>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </Stack>
    </Section>
  );
}

function ProcessNode({ icon: Icon, number, label, active = false }: { icon: LucideIcon; number: string; label: string; active?: boolean }) {
  return (
    <div className={[
      "relative z-10 rounded-card border p-3 shadow-sm",
      active ? "border-brand-text/35 bg-surface" : "border-hairline bg-surface/90",
    ].join(" ")}>
      <div className="flex items-center justify-between gap-2">
        <span className={["grid size-8 place-items-center rounded-control", active ? "bg-brand text-white" : "bg-raised text-brand-text"].join(" ")}>
          <Icon aria-hidden="true" className="size-4" />
        </span>
        <span className="font-mono text-micro text-muted">{number}</span>
      </div>
      <p className="mt-3 text-micro font-semibold leading-snug text-ink">{label}</p>
    </div>
  );
}
