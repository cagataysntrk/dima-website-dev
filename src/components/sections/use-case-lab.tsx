"use client";

import * as React from "react";
import {
  BriefcaseBusiness,
  CircleDollarSign,
  Factory,
  PackageSearch,
  ShieldCheck,
  ShoppingCart,
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
    }, 5200);
    return () => window.clearInterval(timer);
  }, [manual, reduced, c.cases]);

  return (
    <Section divided aria-labelledby="use-case-lab-title">
      <Stack gap="loose">
        <Stack gap="tight" className="max-w-4xl">
          <Text variant="eyebrow">{c.eyebrow[locale]}</Text>
          <Heading level={2} variant="title" id="use-case-lab-title">{c.title[locale]}</Heading>
          <Text variant="lede" tone="muted">{c.intro[locale]}</Text>
        </Stack>

        <div className="grid gap-5 xl:grid-cols-[13rem_minmax(0,1fr)]">
          <div role="tablist" className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-1">
            {c.cases.map((item) => {
              const selected = item.id === active.id;
              const Icon = ICONS[item.id];
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => { setActiveId(item.id); setManual(true); }}
                  className={[
                    "min-h-12 rounded-control border p-3 text-left transition",
                    selected ? "border-brand-text/40 bg-[color-mix(in_oklab,var(--color-text-brand)_7%,var(--color-bg-surface))]" : "border-hairline bg-surface",
                  ].join(" ")}
                >
                  <span className="flex items-center gap-2">
                    <Icon aria-hidden="true" className="size-4 text-brand-text" />
                    <span className="text-ui font-semibold text-ink">{item.layer[locale]}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div role="tabpanel" className="overflow-hidden rounded-card border border-outline bg-surface shadow-sm">
            <div className="border-b border-hairline p-5 sm:p-6">
              <p className="font-mono text-micro uppercase tracking-[0.12em] text-brand-text">{active.layer[locale]}</p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight text-ink">{active.title[locale]}</h3>
              <div className="mt-4 rounded-control border border-hairline bg-raised p-4">
                <p className="text-micro font-medium text-muted">{c.labels.problem[locale]}</p>
                <p className="mt-1 text-ui leading-relaxed text-ink">{active.problem[locale]}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3">
              <FlowCell label={c.labels.detects[locale]} body={active.detects[locale]} index={1} />
              <FlowCell label={c.labels.investigates[locale]} body={active.investigates[locale]} index={2} />
              <FlowCell label={c.labels.recommends[locale]} body={active.recommends[locale]} index={3} />
            </div>

            <div className="grid border-t border-hairline lg:grid-cols-[minmax(0,1fr)_18rem]">
              <div className="p-5 sm:p-6">
                <p className="text-micro font-medium text-muted">{c.labels.result[locale]}</p>
                <p className="mt-2 text-base font-semibold text-ink">{active.result[locale]}</p>
              </div>
              <div className="border-t border-hairline bg-raised/50 p-5 lg:border-l lg:border-t-0">
                <p className="text-micro font-medium text-muted">{c.labels.data[locale]}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {active.data[locale].map((item) => (
                    <span key={item} className="rounded-chip border border-hairline bg-surface px-2 py-1 text-micro text-muted">{item}</span>
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

function FlowCell({ label, body, index }: { label: string; body: string; index: number }) {
  return (
    <article className="border-b border-hairline p-5 md:border-b-0 md:border-r last:md:border-r-0">
      <span className="font-mono text-micro text-brand-text">{String(index).padStart(2, "0")}</span>
      <p className="mt-2 text-ui font-semibold text-ink">{label}</p>
      <p className="mt-2 text-ui leading-relaxed text-muted">{body}</p>
    </article>
  );
}
