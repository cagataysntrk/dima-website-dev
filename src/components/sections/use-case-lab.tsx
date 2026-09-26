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

          <div className="border-b border-hairline px-5 py-4 sm:px-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-mono text-micro uppercase tracking-[0.12em] text-brand-text">{active.layer[locale]}</p>
                <h3 className="mt-1 text-xl font-semibold tracking-tight text-ink">{active.title[locale]}</h3>
              </div>
              <span className="inline-flex items-center gap-2 rounded-button border border-brand-text/25 bg-[color-mix(in_oklab,var(--color-text-brand)_6%,var(--color-bg-surface))] px-3 py-2 text-micro font-semibold text-brand-text">
                <Sparkles aria-hidden="true" className="size-3.5" />
                {c.ready[locale]}
              </span>
            </div>
          </div>

          <div className="relative min-h-[29rem] overflow-hidden p-5 sm:p-7">
            <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_47%,color-mix(in_oklab,var(--color-text-brand)_9%,transparent),transparent_52%)]" />
            <svg aria-hidden="true" viewBox="0 0 100 36" preserveAspectRatio="none" className="absolute left-[7%] top-[38%] h-28 w-[86%] text-brand-text/30">
              <path d="M 4 18 C 20 18, 24 18, 34 18 S 54 18, 66 18 S 82 18, 96 18" fill="none" stroke="currentColor" strokeWidth="0.7" strokeDasharray="2 2" vectorEffect="non-scaling-stroke" />
            </svg>
            <span aria-hidden="true" className="dima-usecase-flow absolute left-[13%] top-[49%] size-2.5 rounded-full bg-brand shadow-[0_0_20px_color-mix(in_oklab,var(--color-bg-brand)_70%,transparent)]" />

            <div className="relative grid gap-4 lg:grid-cols-3">
              <VisualCaseCard
                icon={Radar}
                label={c.visualLabels.signal[locale]}
                body={active.detects[locale]}
                emphasis
              />
              <VisualCaseCard
                icon={FileSearch}
                label={c.visualLabels.reason[locale]}
                body={active.investigates[locale]}
              >
                <div className="mt-4">
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted">{c.visualLabels.context[locale]}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {active.data[locale].map((item) => (
                      <span key={item} className="rounded-chip border border-hairline bg-raised px-2 py-1 text-micro text-muted">{item}</span>
                    ))}
                  </div>
                </div>
              </VisualCaseCard>
              <VisualCaseCard
                icon={Sparkles}
                label={c.visualLabels.decision[locale]}
                body={active.recommends[locale]}
              >
                <div className="mt-4 rounded-control border border-hairline bg-raised p-3">
                  <div className="flex items-center gap-2 text-brand-text">
                    <ArrowRight aria-hidden="true" className="size-4" />
                    <span className="text-micro font-semibold">{c.labels.result[locale]}</span>
                  </div>
                  <p className="mt-1 text-ui font-semibold leading-snug text-ink">{active.result[locale]}</p>
                </div>
              </VisualCaseCard>
            </div>
          </div>
        </div>
      </Stack>
    </Section>
  );
}

function VisualCaseCard({
  icon: Icon,
  label,
  body,
  emphasis = false,
  children,
}: {
  icon: LucideIcon;
  label: string;
  body: string;
  emphasis?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <article className={[
      "relative z-10 min-h-[19rem] rounded-[1.4rem] border p-5 shadow-sm backdrop-blur-sm sm:p-6",
      emphasis
        ? "border-brand-text/30 bg-[color-mix(in_oklab,var(--color-text-brand)_6%,var(--color-bg-surface))]"
        : "border-hairline bg-surface/95",
    ].join(" ")}>
      <span className={[
        "grid size-10 place-items-center rounded-control",
        emphasis ? "bg-brand text-white" : "bg-raised text-brand-text",
      ].join(" ")}>
        <Icon aria-hidden="true" className="size-5" />
      </span>
      <p className="mt-5 font-mono text-micro uppercase tracking-[0.12em] text-muted">{label}</p>
      <p className="mt-2 text-base font-semibold leading-relaxed text-ink">{body}</p>
      {children}
    </article>
  );
}
