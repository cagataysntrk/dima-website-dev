"use client";

import { useMemo, useState } from "react";
import {
  Activity,
  Brain,
  Factory,
  Landmark,
  Network,
  PackageSearch,
  ShieldCheck,
  ShoppingCart,
} from "lucide-react";
import { Heading, Section, Stack, Text } from "@upcytech/ui";
import type { Locale } from "@/i18n/routing";
import { companyBrain, type BrainLobeId, type BrainStatus } from "@/content/company-brain";

const ICONS = {
  finance: Landmark,
  operations: Factory,
  sales: ShoppingCart,
  procurement: PackageSearch,
  quality: ShieldCheck,
} as const;

const BRAIN_CELL = {
  finance: "col-start-1 row-start-1 rounded-[58%_42%_44%_56%/48%_44%_56%_52%]",
  sales: "col-start-2 row-start-1 rounded-[42%_58%_56%_44%/44%_48%_52%_56%]",
  procurement: "col-start-1 row-start-2 rounded-[50%_46%_52%_48%/42%_55%_45%_58%]",
  quality: "col-start-2 row-start-2 rounded-[46%_54%_48%_52%/55%_42%_58%_45%]",
  operations: "col-span-2 row-start-3 mx-[12%] rounded-[44%_56%_48%_52%/54%_46%_54%_46%]",
} as const;

const MAP_POSITION = {
  finance: "left-[7%] top-[11%]",
  sales: "right-[7%] top-[11%]",
  procurement: "left-[4%] bottom-[10%]",
  quality: "right-[4%] bottom-[10%]",
  operations: "left-1/2 bottom-[3%] -translate-x-1/2",
} as const;

const STATUS_STYLE: Record<BrainStatus, string> = {
  attention: "border-brand-text bg-[color-mix(in_oklab,var(--color-text-brand)_12%,var(--color-bg-surface))]",
  investigating: "border-outline bg-raised",
  opportunity: "border-brand-text/70 bg-[color-mix(in_oklab,var(--color-text-brand)_8%,var(--color-bg-surface))]",
  normal: "border-hairline bg-surface",
};

function statusDot(status: BrainStatus) {
  return [
    "size-2 shrink-0 rounded-full",
    status === "normal" ? "bg-muted" : "bg-brand motion-safe:animate-pulse",
  ].join(" ");
}

export function CompanyBrainHero({ locale }: { locale: Locale }) {
  const c = companyBrain;
  return (
    <div data-brand="dima" role="img" aria-label={c.heroAria[locale]} className="relative mx-auto aspect-[5/4] w-full max-w-[31rem]">
      <div className="absolute inset-[4%] rounded-[46%_54%_48%_52%/43%_42%_58%_57%] border border-outline bg-[color-mix(in_oklab,var(--color-bg-surface)_82%,transparent)] shadow-xl backdrop-blur-sm" />
      <div aria-hidden="true" className="absolute bottom-[12%] left-1/2 top-[12%] w-px -translate-x-1/2 bg-hairline" />
      <div className="absolute inset-[11%] grid grid-cols-2 grid-rows-3 gap-3">
        {c.lobes.map((lobe) => {
          const Icon = ICONS[lobe.id];
          return (
            <div
              key={lobe.id}
              className={[
                "flex min-w-0 flex-col justify-center border px-3 py-3 shadow-sm",
                BRAIN_CELL[lobe.id],
                STATUS_STYLE[lobe.status],
              ].join(" ")}
            >
              <div className="flex items-center gap-2">
                <Icon aria-hidden="true" className="size-4 shrink-0 text-brand-text" />
                <span className="truncate text-ui font-medium text-ink">{lobe.shortLabel[locale]}</span>
              </div>
              <div className="mt-2 flex items-center gap-2 text-micro text-muted">
                <span aria-hidden="true" className={statusDot(lobe.status)} />
                <span className="truncate">{lobe.statusLabel[locale]}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function CompanyBrainExperience({ locale }: { locale: Locale }) {
  const c = companyBrain;
  const [lens, setLens] = useState<"brain" | "map">("brain");
  const [activeId, setActiveId] = useState<BrainLobeId>("operations");
  const active = useMemo(() => c.lobes.find((lobe) => lobe.id === activeId) ?? c.lobes[0], [activeId]);

  return (
    <Section divided aria-labelledby="company-brain-title">
      <Stack gap="loose">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <Stack gap="tight" className="lg:col-span-8">
            <p className="font-mono text-micro uppercase tracking-[0.16em] text-brand-text">{c.eyebrow[locale]}</p>
            <Heading level={2} variant="title" id="company-brain-title">{c.title[locale]}</Heading>
            <Text variant="lede" tone="muted" className="max-w-3xl">{c.intro[locale]}</Text>
          </Stack>
          <div className="lg:col-span-4 lg:justify-self-end">
            <p className="font-mono text-micro uppercase tracking-[0.14em] text-muted">{c.sample[locale]}</p>
          </div>
        </div>

        <div data-brand="dima" className="overflow-hidden rounded-card border border-outline bg-surface shadow-sm">
          <div className="flex flex-col gap-3 border-b border-hairline p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div role="group" aria-label={c.lensLabel[locale]} className="inline-flex w-fit rounded-control border border-hairline bg-raised p-1">
              <LensButton active={lens === "brain"} icon={Brain} label={c.lenses.brain[locale]} onClick={() => setLens("brain")} />
              <LensButton active={lens === "map"} icon={Network} label={c.lenses.map[locale]} onClick={() => setLens("map")} />
            </div>
            <div className="flex items-center gap-2 text-ui text-muted">
              <Activity aria-hidden="true" className="size-4 text-brand-text" />
              <span>{active.statusLabel[locale]}</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.65fr)]">
            <div className="min-w-0 border-b border-hairline p-4 sm:p-6 lg:border-b-0 lg:border-r">
              {lens === "brain" ? (
                <BrainLens locale={locale} activeId={activeId} onSelect={setActiveId} />
              ) : (
                <MapLens locale={locale} activeId={activeId} onSelect={setActiveId} />
              )}
            </div>

            <aside className="min-w-0 p-5 sm:p-7">
              <p className="font-mono text-micro uppercase tracking-[0.14em] text-muted">{c.detail.domain[locale]}</p>
              <div className="mt-2 flex items-start gap-3">
                {(() => {
                  const Icon = ICONS[active.id];
                  return <span className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-control bg-raised text-brand-text"><Icon aria-hidden="true" className="size-5" /></span>;
                })()}
                <div className="min-w-0">
                  <h3 className="text-xl font-semibold text-ink">{active.label[locale]}</h3>
                  <p className="mt-1 text-ui leading-relaxed text-muted">{active.summary[locale]}</p>
                </div>
              </div>

              <DetailBlock label={c.detail.entities[locale]}>
                <div className="flex flex-wrap gap-2">
                  {active.entities[locale].map((entity) => (
                    <span key={entity} className="rounded-chip border border-hairline bg-raised px-2.5 py-1 text-micro text-muted">{entity}</span>
                  ))}
                </div>
              </DetailBlock>

              <DetailBlock label={c.detail.finding[locale]}>
                <p className="font-medium text-ink">{active.finding.title[locale]}</p>
                <p className="mt-2 text-ui leading-relaxed text-muted">{active.finding.body[locale]}</p>
              </DetailBlock>

              <DetailBlock label={c.detail.evidence[locale]}>
                <ul className="space-y-2">
                  {active.finding.evidence[locale].map((item) => (
                    <li key={item} className="flex gap-2 text-ui text-muted">
                      <span aria-hidden="true" className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-brand" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </DetailBlock>

              <DetailBlock label={c.detail.next[locale]}>
                <p className="text-ui font-medium text-ink">{active.finding.next[locale]}</p>
              </DetailBlock>
            </aside>
          </div>
        </div>

        <div aria-label={c.flowLabel[locale]} className="flex flex-wrap items-center gap-x-2 gap-y-2">
          {c.flow[locale].map((step, index) => (
            <div key={step} className="flex items-center gap-2">
              <span className="rounded-chip border border-hairline bg-surface px-2.5 py-1.5 text-micro font-medium text-muted">{step}</span>
              {index < c.flow[locale].length - 1 && <span aria-hidden="true" className="text-muted">→</span>}
            </div>
          ))}
        </div>
      </Stack>
    </Section>
  );
}

function LensButton({ active, icon: Icon, label, onClick }: {
  active: boolean;
  icon: typeof Brain;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={[
        "inline-flex min-h-11 items-center gap-2 rounded-control px-3 text-ui font-medium transition-colors duration-160",
        active ? "bg-surface text-ink shadow-xs" : "text-muted hoverable:hover:text-ink",
      ].join(" ")}
    >
      <Icon aria-hidden="true" className="size-4" />
      <span>{label}</span>
    </button>
  );
}

function BrainLens({ locale, activeId, onSelect }: {
  locale: Locale;
  activeId: BrainLobeId;
  onSelect: (id: BrainLobeId) => void;
}) {
  const c = companyBrain;
  return (
    <div className="relative mx-auto aspect-[5/4] w-full max-w-3xl rounded-[46%_54%_48%_52%/43%_42%_58%_57%] border border-outline bg-[color-mix(in_oklab,var(--color-bg-raised)_68%,transparent)] p-[8%] shadow-inner">
      <div aria-hidden="true" className="absolute bottom-[8%] left-1/2 top-[8%] w-px -translate-x-1/2 bg-hairline" />
      <div className="grid h-full grid-cols-2 grid-rows-3 gap-2 sm:gap-4">
        {c.lobes.map((lobe) => {
          const Icon = ICONS[lobe.id];
          const active = lobe.id === activeId;
          return (
            <button
              key={lobe.id}
              type="button"
              aria-pressed={active}
              onClick={() => onSelect(lobe.id)}
              className={[
                "group relative flex min-w-0 flex-col justify-center border px-3 py-3 text-left shadow-sm transition duration-160 sm:px-5",
                BRAIN_CELL[lobe.id],
                active ? "border-brand-text bg-[color-mix(in_oklab,var(--color-text-brand)_14%,var(--color-bg-surface))] shadow-md" : STATUS_STYLE[lobe.status],
              ].join(" ")}
            >
              <div className="flex items-center gap-2">
                <Icon aria-hidden="true" className="size-4 shrink-0 text-brand-text sm:size-5" />
                <span className="truncate text-ui font-semibold text-ink sm:text-base">{lobe.shortLabel[locale]}</span>
              </div>
              <span className="mt-2 flex items-center gap-2 text-micro text-muted">
                <span aria-hidden="true" className={statusDot(lobe.status)} />
                <span className="truncate">{lobe.statusLabel[locale]}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function MapLens({ locale, activeId, onSelect }: {
  locale: Locale;
  activeId: BrainLobeId;
  onSelect: (id: BrainLobeId) => void;
}) {
  const c = companyBrain;
  return (
    <div className="relative mx-auto aspect-[5/4] w-full max-w-3xl overflow-hidden rounded-card border border-hairline bg-raised">
      <svg aria-hidden="true" viewBox="0 0 100 80" preserveAspectRatio="none" className="absolute inset-0 size-full text-outline">
        <path d="M50 38 L20 18 M50 38 L80 18 M50 38 L18 65 M50 38 L82 65 M50 38 L50 70" fill="none" stroke="currentColor" strokeWidth="0.45" vectorEffect="non-scaling-stroke" />
        <path d="M20 18 C34 10 66 10 80 18 M18 65 C28 52 39 48 50 38 M82 65 C72 52 61 48 50 38" fill="none" stroke="currentColor" strokeWidth="0.3" strokeDasharray="2 2" vectorEffect="non-scaling-stroke" />
      </svg>

      <div className="absolute left-1/2 top-[46%] flex size-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-brand-text bg-surface text-center shadow-md sm:size-28">
        <span className="px-2 text-ui font-semibold text-ink">{c.coreLabel[locale]}</span>
      </div>

      {c.lobes.map((lobe) => {
        const Icon = ICONS[lobe.id];
        const active = lobe.id === activeId;
        return (
          <button
            key={lobe.id}
            type="button"
            aria-pressed={active}
            onClick={() => onSelect(lobe.id)}
            className={[
              "absolute flex min-h-14 min-w-[7.5rem] max-w-[10rem] items-center gap-2 rounded-card border px-3 py-2 text-left shadow-sm transition duration-160 sm:min-w-[9rem]",
              MAP_POSITION[lobe.id],
              active ? "z-10 border-brand-text bg-surface shadow-md" : STATUS_STYLE[lobe.status],
            ].join(" ")}
          >
            <Icon aria-hidden="true" className="size-4 shrink-0 text-brand-text" />
            <span className="min-w-0">
              <span className="block truncate text-ui font-medium text-ink">{lobe.shortLabel[locale]}</span>
              <span className="mt-0.5 flex items-center gap-1.5 text-micro text-muted">
                <span aria-hidden="true" className={statusDot(lobe.status)} />
                <span className="truncate">{lobe.statusLabel[locale]}</span>
              </span>
            </span>
          </button>
        );
      })}

      <div className="absolute inset-x-3 bottom-2 hidden flex-wrap justify-center gap-1.5 md:flex">
        {c.relations.map((relation) => (
          <span key={relation.label.en} className="rounded-chip border border-hairline bg-surface/90 px-2 py-1 text-micro text-muted backdrop-blur-sm">
            {relation.label[locale]}
          </span>
        ))}
      </div>
    </div>
  );
}

function DetailBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-6 border-t border-hairline pt-5">
      <p className="mb-3 font-mono text-micro uppercase tracking-[0.14em] text-muted">{label}</p>
      {children}
    </div>
  );
}
