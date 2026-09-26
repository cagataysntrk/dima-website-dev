"use client";

import * as React from "react";
import {
  Activity,
  Building2,
  Database,
  Factory,
  FileSearch,
  Landmark,
  ListChecks,
  Network,
  PackageSearch,
  Pause,
  Play,
  Search,
  ShieldCheck,
  ShoppingCart,
  type LucideIcon,
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
} as const satisfies Record<BrainLobeId, LucideIcon>;

const GRAPH_POSITIONS: Record<BrainLobeId, { x: number; y: number }> = {
  finance: { x: 22, y: 24 },
  sales: { x: 78, y: 22 },
  operations: { x: 52, y: 67 },
  procurement: { x: 82, y: 62 },
  quality: { x: 18, y: 68 },
};

const BRAIN_POSITIONS: Record<BrainLobeId, { x: number; y: number }> = {
  finance: { x: 34, y: 28 },
  sales: { x: 66, y: 28 },
  operations: { x: 50, y: 68 },
  procurement: { x: 67, y: 57 },
  quality: { x: 32, y: 58 },
};

const STATUS_CLASS: Record<BrainStatus, string> = {
  attention: "border-brand-text/45 bg-[color-mix(in_oklab,var(--color-text-brand)_10%,var(--color-bg-surface))]",
  investigating: "border-outline bg-surface",
  opportunity: "border-brand-text/30 bg-[color-mix(in_oklab,var(--color-text-brand)_6%,var(--color-bg-surface))]",
  normal: "border-hairline bg-surface",
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

function statusDot(status: BrainStatus) {
  return [
    "size-1.5 shrink-0 rounded-full",
    status === "normal" ? "bg-muted" : "bg-brand motion-safe:animate-pulse",
  ].join(" ");
}

export function CompanyBrainHero({ locale }: { locale: Locale }) {
  const reduced = useReducedMotion();
  const [activeId, setActiveId] = React.useState<BrainLobeId>("operations");

  React.useEffect(() => {
    if (reduced) return;
    const ids = companyBrain.lobes.filter((item) => item.status !== "normal").map((item) => item.id);
    const timer = window.setInterval(() => {
      setActiveId((current) => {
        const index = ids.indexOf(current);
        return ids[(index + 1) % ids.length] ?? "operations";
      });
    }, 2600);
    return () => window.clearInterval(timer);
  }, [reduced]);

  return (
    <div role="img" aria-label={companyBrain.heroAria[locale]} className="mx-auto w-full max-w-[34rem]">
      <DashboardFrame locale={locale} activeId={activeId} lens="map" compact />
    </div>
  );
}

export function CompanyBrainExperience({ locale }: { locale: Locale }) {
  const c = companyBrain;
  const reduced = useReducedMotion();
  const [lens, setLens] = React.useState<"brain" | "map">("brain");
  const [activeId, setActiveId] = React.useState<BrainLobeId>("operations");
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    if (paused || reduced) return;
    const ids = c.lobes.map((item) => item.id);
    const timer = window.setInterval(() => {
      setActiveId((current) => {
        const index = ids.indexOf(current);
        return ids[(index + 1) % ids.length] ?? "operations";
      });
    }, 3600);
    return () => window.clearInterval(timer);
  }, [paused, reduced, c.lobes]);

  const select = (id: BrainLobeId) => {
    setActiveId(id);
    setPaused(true);
  };

  return (
    <Section divided aria-labelledby="company-brain-title">
      <Stack gap="loose">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <Stack gap="tight" className="lg:col-span-8">
            <p className="font-mono text-micro uppercase tracking-[0.16em] text-brand-text">{c.eyebrow[locale]}</p>
            <Heading level={2} variant="title" id="company-brain-title">{c.title[locale]}</Heading>
            <Text variant="lede" tone="muted" className="max-w-3xl">{c.intro[locale]}</Text>
          </Stack>
          <div className="space-y-2 lg:col-span-4 lg:justify-self-end lg:text-right">
            <p className="font-mono text-micro uppercase tracking-[0.14em] text-muted">{c.sample[locale]}</p>
            <p className="text-micro text-muted">{c.auto.helper[locale]}</p>
          </div>
        </div>

        <DashboardFrame
          locale={locale}
          activeId={activeId}
          lens={lens}
          paused={paused}
          onSelect={select}
          onLensChange={setLens}
          onPauseChange={setPaused}
        />
      </Stack>
    </Section>
  );
}

function DashboardFrame({
  locale,
  activeId,
  lens,
  compact = false,
  paused = false,
  onSelect,
  onLensChange,
  onPauseChange,
}: {
  locale: Locale;
  activeId: BrainLobeId;
  lens: "brain" | "map";
  compact?: boolean;
  paused?: boolean;
  onSelect?: (id: BrainLobeId) => void;
  onLensChange?: (lens: "brain" | "map") => void;
  onPauseChange?: (paused: boolean) => void;
}) {
  const c = companyBrain;
  const active = React.useMemo(() => c.lobes.find((lobe) => lobe.id === activeId) ?? c.lobes[0], [activeId]);
  const todayItems = React.useMemo(() => c.lobes.filter((lobe) => lobe.status !== "normal"), []);

  return (
    <div data-brand="dima" className="dima-app overflow-hidden rounded-card border border-outline bg-surface shadow-xl">
      <div className={compact ? "grid" : "grid lg:grid-cols-[10.5rem_minmax(0,1fr)]"}>
        {!compact && <DashboardSidebar locale={locale} />}

        <div className="min-w-0">
          <DashboardTopbar locale={locale} compact={compact} />

          <div className={compact ? "p-3 sm:p-4" : "p-4 sm:p-6"}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <p className={compact ? "text-sm font-semibold text-ink" : "text-xl font-semibold tracking-tight text-ink"}>
                  {c.dashboard.heading[locale]}
                </p>
                {!compact && <p className="mt-1 max-w-2xl text-ui leading-relaxed text-muted">{c.dashboard.subheading[locale]}</p>}
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-chip border border-hairline bg-raised px-2.5 py-1 text-micro text-muted">
                  <span aria-hidden="true" className="relative flex size-2">
                    <span className="absolute inline-flex size-full motion-safe:animate-ping rounded-full bg-brand opacity-40" />
                    <span className="relative inline-flex size-2 rounded-full bg-brand" />
                  </span>
                  {c.dashboard.live[locale]}
                </span>
                {!compact && (
                  <span className="rounded-chip border border-hairline bg-raised px-2.5 py-1 text-micro text-muted">
                    {c.dashboard.sampleBadge[locale]}
                  </span>
                )}
              </div>
            </div>

            {!compact && (
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <div role="group" aria-label={c.lensLabel[locale]} className="inline-flex rounded-control border border-hairline bg-raised p-1">
                    <LensButton active={lens === "brain"} icon={Activity} label={c.lenses.brain[locale]} onClick={() => onLensChange?.("brain")} />
                    <LensButton active={lens === "map"} icon={Network} label={c.lenses.map[locale]} onClick={() => onLensChange?.("map")} />
                  </div>
                  <button
                    type="button"
                    onClick={() => onPauseChange?.(!paused)}
                    aria-label={(paused ? c.auto.resume : c.auto.pause)[locale]}
                    className="inline-flex min-h-11 items-center gap-2 rounded-control border border-hairline bg-raised px-3 text-ui text-muted transition hoverable:hover:text-ink"
                  >
                    {paused ? <Play aria-hidden="true" className="size-4" /> : <Pause aria-hidden="true" className="size-4" />}
                    <span className="hidden sm:inline">{(paused ? c.auto.resume : c.auto.pause)[locale]}</span>
                  </button>
                </div>
                <span className="inline-flex items-center gap-2 text-ui text-muted">
                  <Activity aria-hidden="true" className="size-4 text-brand-text" />
                  {active.statusLabel[locale]}
                </span>
              </div>
            )}

            <div className={compact ? "mt-3 grid gap-3 sm:grid-cols-[minmax(0,1fr)_10.5rem]" : "mt-5 grid gap-4 xl:grid-cols-[minmax(0,1fr)_20rem]"}>
              <div className="min-w-0 overflow-hidden rounded-card border border-hairline bg-raised">
                {lens === "brain" && !compact ? (
                  <BrainForm locale={locale} activeId={activeId} onSelect={onSelect} />
                ) : (
                  <CompanyMap locale={locale} activeId={activeId} compact={compact} onSelect={onSelect} />
                )}
              </div>

              <SignalRail locale={locale} activeId={activeId} active={active} todayItems={todayItems} compact={compact} onSelect={onSelect} />
            </div>

            {!compact && (
              <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {c.dashboard.metrics[locale].map((metric) => (
                  <div key={metric.label} className="dima-surface-sm p-4">
                    <p className="text-micro text-muted">{metric.label}</p>
                    <p className="mt-1 text-2xl font-semibold tabular-nums tracking-tight text-ink">{metric.value}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardSidebar({ locale }: { locale: Locale }) {
  const c = companyBrain;
  const items: { label: string; icon: LucideIcon; active?: boolean }[] = [
    { label: c.dashboard.overview[locale], icon: Building2, active: true },
    { label: c.dashboard.companyMap[locale], icon: Network },
    { label: c.dashboard.signals[locale], icon: Activity },
    { label: c.dashboard.investigations[locale], icon: FileSearch },
    { label: c.dashboard.decisions[locale], icon: ListChecks },
    { label: c.dashboard.dataSources[locale], icon: Database },
  ];

  return (
    <aside className="hidden border-r border-hairline bg-[color-mix(in_oklab,var(--color-text-primary)_2%,var(--color-bg-canvas))] p-3 lg:block">
      <div className="flex items-center gap-2 px-2 py-2">
        <img src="/products/dima-mark.png" alt="" width={24} height={24} className="dima-logo-mark size-6 shrink-0" />
        <span className="text-ui font-semibold text-ink">{c.dashboard.productLabel[locale]}</span>
      </div>
      <div className="mt-4 space-y-1">
        {items.map(({ label, icon: Icon, active }) => (
          <div key={label} className={["flex min-h-9 items-center gap-2 rounded-control px-2.5 text-micro", active ? "bg-surface font-medium text-ink shadow-sm" : "text-muted"].join(" ")}>
            <Icon aria-hidden="true" className="size-3.5 shrink-0" />
            <span className="truncate">{label}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}

function DashboardTopbar({ locale, compact }: { locale: Locale; compact: boolean }) {
  const c = companyBrain;
  return (
    <div className="flex min-h-12 items-center gap-3 border-b border-hairline px-3 sm:px-4">
      {compact && (
        <div className="flex shrink-0 items-center gap-2">
          <img src="/products/dima-mark.png" alt="" width={22} height={22} className="dima-logo-mark size-[1.375rem]" />
          <span className="text-micro font-semibold text-ink">{c.dashboard.productLabel[locale]}</span>
        </div>
      )}
      <div className="mx-auto flex min-h-8 w-full max-w-lg items-center gap-2 rounded-control border border-hairline bg-canvas/70 px-3 text-micro text-muted">
        <Search aria-hidden="true" className="size-3.5 shrink-0" />
        <span className="truncate">{c.dashboard.search[locale]}</span>
      </div>
      {!compact && <span className="hidden text-micro text-muted sm:block">{c.dashboard.sampleBadge[locale]}</span>}
    </div>
  );
}

function BrainForm({ locale, activeId, onSelect }: { locale: Locale; activeId: BrainLobeId; onSelect?: (id: BrainLobeId) => void }) {
  const c = companyBrain;
  return (
    <div className="relative aspect-[16/10] min-h-[29rem] overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,color-mix(in_oklab,var(--color-text-brand)_13%,transparent),transparent_46%)]" />
      <svg aria-hidden="true" viewBox="0 0 800 480" preserveAspectRatio="xMidYMid meet" className="absolute inset-0 size-full text-outline">
        <path
          d="M400 70 C344 35 281 46 247 95 C190 92 145 129 145 181 C101 207 94 269 128 307 C118 358 158 401 210 405 C245 451 320 454 400 414 C480 454 555 451 590 405 C642 401 682 358 672 307 C706 269 699 207 655 181 C655 129 610 92 553 95 C519 46 456 35 400 70 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
        <path d="M400 72 C389 129 411 168 400 222 C389 274 410 326 400 412" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="5 6" vectorEffect="non-scaling-stroke" />
        <path d="M245 116 C285 143 303 184 293 229 C281 278 301 327 350 375" fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <path d="M555 116 C515 143 497 184 507 229 C519 278 499 327 450 375" fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <path d="M170 245 C232 223 272 235 321 269" fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <path d="M630 245 C568 223 528 235 479 269" fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        {c.relations.map((relation) => {
          const from = BRAIN_POSITIONS[relation.from];
          const to = BRAIN_POSITIONS[relation.to];
          return (
            <line
              key={relation.label.en}
              x1={from.x * 8}
              y1={from.y * 4.8}
              x2={to.x * 8}
              y2={to.y * 4.8}
              stroke="currentColor"
              strokeWidth="0.7"
              strokeDasharray="3 5"
              vectorEffect="non-scaling-stroke"
            />
          );
        })}
      </svg>

      <div className="absolute left-1/2 top-[47%] z-10 -translate-x-1/2 -translate-y-1/2">
        <div className="relative flex size-20 items-center justify-center rounded-full border border-brand-text/35 bg-surface shadow-lg">
          <span aria-hidden="true" className="absolute inset-0 motion-safe:animate-ping rounded-full border border-brand-text/20" />
          <div className="relative text-center">
            <img src="/products/dima-mark.png" alt="" width={26} height={26} className="dima-logo-mark mx-auto" />
            <p className="mt-1 text-micro font-semibold text-ink">{c.coreLabel[locale]}</p>
          </div>
        </div>
      </div>

      {c.lobes.map((lobe) => {
        const Icon = ICONS[lobe.id];
        const pos = BRAIN_POSITIONS[lobe.id];
        const active = lobe.id === activeId;
        return (
          <button
            key={lobe.id}
            type="button"
            aria-pressed={active}
            onClick={() => onSelect?.(lobe.id)}
            className={[
              "absolute z-10 min-w-[8.5rem] -translate-x-1/2 -translate-y-1/2 rounded-card border px-3 py-2.5 text-left shadow-sm transition duration-160",
              active ? "border-brand-text/55 bg-surface shadow-md" : STATUS_CLASS[lobe.status],
            ].join(" ")}
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
          >
            <span className="flex items-center gap-2">
              <span className={["flex size-8 shrink-0 items-center justify-center rounded-control bg-raised", active ? "motion-safe:animate-pulse" : ""].join(" ")}>
                <Icon aria-hidden="true" className="size-4 text-brand-text" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-ui font-semibold text-ink">{lobe.shortLabel[locale]}</span>
                <span className="mt-0.5 flex items-center gap-1.5 text-micro text-muted">
                  <span aria-hidden="true" className={statusDot(lobe.status)} />
                  <span className="truncate">{lobe.statusLabel[locale]}</span>
                </span>
              </span>
            </span>
          </button>
        );
      })}

      <div className="absolute inset-x-4 bottom-3 flex flex-wrap justify-center gap-1.5">
        {c.relations.map((relation) => (
          <span key={relation.label.en} className="rounded-chip border border-hairline bg-surface/90 px-2 py-1 text-micro text-muted backdrop-blur-sm">
            {relation.label[locale]}
          </span>
        ))}
      </div>
    </div>
  );
}

function CompanyMap({ locale, activeId, compact, onSelect }: { locale: Locale; activeId: BrainLobeId; compact: boolean; onSelect?: (id: BrainLobeId) => void }) {
  const c = companyBrain;
  return (
    <div className={compact ? "relative aspect-[16/10] min-h-[16rem] overflow-hidden" : "relative aspect-[16/10] min-h-[29rem] overflow-hidden"}>
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,color-mix(in_oklab,var(--color-text-brand)_12%,transparent),transparent_46%)]" />
      <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full text-outline">
        {c.lobes.map((lobe) => {
          const pos = GRAPH_POSITIONS[lobe.id];
          return <line key={lobe.id} x1="50" y1="48" x2={pos.x} y2={pos.y} stroke="currentColor" strokeWidth="0.45" vectorEffect="non-scaling-stroke" />;
        })}
        {c.relations.map((relation) => {
          const from = GRAPH_POSITIONS[relation.from];
          const to = GRAPH_POSITIONS[relation.to];
          return <line key={relation.label.en} x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="currentColor" strokeWidth="0.25" strokeDasharray="2 2" vectorEffect="non-scaling-stroke" />;
        })}
      </svg>

      <div className="absolute left-1/2 top-[48%] z-10 -translate-x-1/2 -translate-y-1/2">
        <div className={compact ? "relative flex size-20 items-center justify-center rounded-full border border-brand-text/35 bg-surface shadow-lg" : "relative flex size-28 items-center justify-center rounded-full border border-brand-text/35 bg-surface shadow-lg"}>
          <span aria-hidden="true" className="absolute inset-0 motion-safe:animate-ping rounded-full border border-brand-text/20" />
          <div className="relative text-center">
            <img src="/products/dima-mark.png" alt="" width={compact ? 24 : 30} height={compact ? 24 : 30} className="dima-logo-mark mx-auto" />
            <p className="mt-1 text-micro font-semibold text-ink">{c.coreLabel[locale]}</p>
          </div>
        </div>
      </div>

      {c.lobes.map((lobe) => {
        const Icon = ICONS[lobe.id];
        const pos = GRAPH_POSITIONS[lobe.id];
        const active = lobe.id === activeId;
        const card = (
          <span className="flex items-center gap-2">
            <span className={compact ? "flex size-5 shrink-0 items-center justify-center rounded-control bg-raised" : "flex size-8 shrink-0 items-center justify-center rounded-control bg-raised"}>
              <Icon aria-hidden="true" className={compact ? "size-3 text-brand-text" : "size-4 text-brand-text"} />
            </span>
            <span className="min-w-0">
              <span className={compact ? "block truncate text-[0.65rem] font-medium text-ink" : "block truncate text-ui font-semibold text-ink"}>{lobe.shortLabel[locale]}</span>
              {!compact && (
                <span className="mt-0.5 flex items-center gap-1.5 text-micro text-muted">
                  <span aria-hidden="true" className={statusDot(lobe.status)} />
                  <span className="truncate">{lobe.statusLabel[locale]}</span>
                </span>
              )}
            </span>
          </span>
        );
        const className = [
          "absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-card border text-left shadow-sm transition duration-160",
          compact ? "min-w-[5.75rem] px-2 py-1.5" : "min-w-[9.5rem] px-3.5 py-3",
          active ? "border-brand-text/50 bg-surface shadow-md" : STATUS_CLASS[lobe.status],
        ].join(" ");
        const style = { left: `${pos.x}%`, top: `${pos.y}%` };

        return compact ? (
          <div key={lobe.id} className={className} style={style}>{card}</div>
        ) : (
          <button key={lobe.id} type="button" aria-pressed={active} onClick={() => onSelect?.(lobe.id)} className={className} style={style}>{card}</button>
        );
      })}

      {!compact && (
        <div className="absolute inset-x-4 bottom-3 flex flex-wrap justify-center gap-1.5">
          {c.relations.map((relation) => (
            <span key={relation.label.en} className="rounded-chip border border-hairline bg-surface/90 px-2 py-1 text-micro text-muted backdrop-blur-sm">{relation.label[locale]}</span>
          ))}
        </div>
      )}
    </div>
  );
}

function SignalRail({ locale, activeId, active, todayItems, compact, onSelect }: {
  locale: Locale;
  activeId: BrainLobeId;
  active: (typeof companyBrain.lobes)[number];
  todayItems: readonly (typeof companyBrain.lobes)[number][];
  compact: boolean;
  onSelect?: (id: BrainLobeId) => void;
}) {
  const c = companyBrain;
  const visible = compact ? todayItems.slice(0, 2) : todayItems;

  return (
    <aside className={compact ? "rounded-card border border-hairline bg-raised p-3" : "space-y-3"}>
      <div className={compact ? "" : "dima-surface-sm p-4"}>
        <div className="flex items-center justify-between gap-3">
          <p className="text-ui font-semibold text-ink">{c.dashboard.todayTitle[locale]}</p>
          <span className="font-mono text-micro text-brand-text">{todayItems.length}</span>
        </div>
        <div className="mt-3 space-y-2">
          {visible.map((lobe) => {
            const body = (
              <>
                <span className="flex items-center gap-2 text-micro font-medium text-ink">
                  <span aria-hidden="true" className={statusDot(lobe.status)} />
                  <span>{lobe.shortLabel[locale]}</span>
                </span>
                <span className="mt-1 block text-micro leading-relaxed text-muted">{lobe.finding.title[locale]}</span>
              </>
            );
            const className = ["w-full rounded-control border p-2.5 text-left transition duration-160", lobe.id === activeId ? "border-brand-text/40 bg-surface" : "border-hairline bg-canvas/40"].join(" ");

            return compact ? (
              <div key={lobe.id} className={className}>{body}</div>
            ) : (
              <button key={lobe.id} type="button" aria-pressed={lobe.id === activeId} onClick={() => onSelect?.(lobe.id)} className={className}>{body}</button>
            );
          })}
        </div>
      </div>

      {!compact && (
        <div className="dima-surface-sm p-4">
          <p className="text-micro font-medium text-muted">{c.dashboard.contextTitle[locale]}</p>
          <div className="mt-2 flex items-center gap-2">
            {(() => {
              const Icon = ICONS[active.id];
              return <span className="flex size-8 shrink-0 items-center justify-center rounded-control bg-raised"><Icon aria-hidden="true" className="size-4 text-brand-text" /></span>;
            })()}
            <div className="min-w-0">
              <p className="text-ui font-semibold text-ink">{active.label[locale]}</p>
              <p className="truncate text-micro text-muted">{active.statusLabel[locale]}</p>
            </div>
          </div>

          <p className="mt-4 text-ui leading-relaxed text-muted">{active.finding.body[locale]}</p>

          <div className="mt-4 border-t border-hairline pt-3">
            <p className="text-micro font-medium text-muted">{c.dashboard.evidenceTitle[locale]}</p>
            <ul className="mt-2 space-y-1.5">
              {active.finding.evidence[locale].map((item) => (
                <li key={item} className="flex gap-2 text-micro leading-relaxed text-muted">
                  <span aria-hidden="true" className="mt-[0.45em] size-1 shrink-0 rounded-full bg-brand" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 border-t border-hairline pt-3">
            <p className="text-micro font-medium text-muted">{c.dashboard.nextTitle[locale]}</p>
            <p className="mt-1 text-ui leading-relaxed text-ink">{active.finding.next[locale]}</p>
          </div>

          <p className="mt-4 border-t border-hairline pt-3 text-micro leading-relaxed text-muted">{c.detail.chat[locale]}</p>
        </div>
      )}
    </aside>
  );
}

function LensButton({ active, icon: Icon, label, onClick }: { active: boolean; icon: LucideIcon; label: string; onClick: () => void }) {
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
