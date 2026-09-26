"use client";

import * as React from "react";
import {
  Activity,
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Database,
  FileSearch,
  Factory,
  Landmark,
  Network,
  Pause,
  Play,
  Search,
  ShieldCheck,
  ShoppingCart,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { Heading, Section, Stack, Text } from "@upcytech/ui";
import type { Locale } from "@/i18n/routing";
import { productExperience, type ExperienceStepId } from "@/content/product-experience";

const OVERVIEW_VISUAL = {
  finance: { icon: Landmark, x: "17%", y: "24%" },
  sales: { icon: ShoppingCart, x: "78%", y: "23%" },
  manufacturing: { icon: Factory, x: "50%", y: "67%" },
  procurement: { icon: Building2, x: "82%", y: "66%" },
  quality: { icon: ShieldCheck, x: "18%", y: "68%" },
} as const;

const STEP_ICON: Record<ExperienceStepId, LucideIcon> = {
  overview: Network,
  signal: Activity,
  investigation: FileSearch,
  evidence: ShieldCheck,
  decision: ClipboardCheck,
  action: Wrench,
};

export function ProductExperienceSuite({ locale }: { locale: Locale }) {
  const c = productExperience;
  const [step, setStep] = React.useState<ExperienceStepId>("overview");
  const [paused, setPaused] = React.useState(false);
  const [reduced, setReduced] = React.useState(false);
  const active = c.steps.find((item) => item.id === step) ?? c.steps[0];

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
      setStep((current) => {
        const index = c.steps.findIndex((item) => item.id === current);
        return c.steps[(index + 1) % c.steps.length]!.id;
      });
    }, 4300);
    return () => window.clearInterval(timer);
  }, [paused, reduced, c.steps]);

  const selectStep = (id: ExperienceStepId) => {
    setStep(id);
    setPaused(true);
  };

  return (
    <Section divided aria-labelledby="product-experience-title">
      <Stack gap="loose">
        <Stack gap="tight" className="max-w-4xl">
          <Text variant="eyebrow">{c.eyebrow[locale]}</Text>
          <Heading level={2} variant="title" id="product-experience-title">
            {c.title[locale]}
          </Heading>
          <Text variant="lede" tone="muted">{c.intro[locale]}</Text>
        </Stack>

        <div data-brand="dima" className="dima-app overflow-hidden rounded-card border border-outline bg-surface shadow-xl">
          <div className="grid lg:grid-cols-[11rem_minmax(0,1fr)]">
            <aside className="border-b border-hairline bg-[color-mix(in_oklab,var(--color-text-primary)_2%,var(--color-bg-canvas))] p-3 lg:border-b-0 lg:border-r">
              <div className="flex items-center gap-2 px-2 py-2">
                <img src="/products/dima-mark.png" alt="" width={24} height={24} className="dima-logo-mark size-6" />
                <span className="text-ui font-semibold text-ink">{c.brand[locale]}</span>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-1 sm:grid-cols-6 lg:grid-cols-1">
                {c.steps.map((item) => {
                  const Icon = STEP_ICON[item.id];
                  const selected = item.id === step;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => selectStep(item.id)}
                      className={[
                        "flex min-h-11 items-center gap-2 rounded-control px-2.5 text-left text-micro transition",
                        selected ? "bg-surface font-medium text-ink shadow-sm" : "text-muted hoverable:hover:text-ink",
                      ].join(" ")}
                    >
                      <Icon aria-hidden="true" className="size-3.5 shrink-0" />
                      <span className="truncate">{item.nav[locale]}</span>
                    </button>
                  );
                })}
              </div>
            </aside>

            <div className="min-w-0">
              <div className="flex min-h-14 items-center gap-3 border-b border-hairline px-4">
                <div className="flex min-h-9 min-w-0 flex-1 items-center gap-2 rounded-control border border-hairline bg-canvas/70 px-3 text-ui text-muted">
                  <Search aria-hidden="true" className="size-4 shrink-0" />
                  <span className="truncate">{c.search[locale]}</span>
                </div>
                <span className="hidden rounded-chip border border-hairline bg-raised px-2.5 py-1 text-micro text-muted sm:inline-flex">
                  <span aria-hidden="true" className="mr-1.5 size-1.5 rounded-full bg-brand motion-safe:animate-pulse" />
                  {c.auto.running[locale]}
                </span>
                <button
                  type="button"
                  onClick={() => setPaused((value) => !value)}
                  aria-label={(paused ? c.auto.resume : c.auto.pause)[locale]}
                  className="inline-flex min-h-9 items-center gap-1.5 rounded-control border border-hairline bg-raised px-2.5 text-micro text-muted transition hoverable:hover:text-ink"
                >
                  {paused ? <Play aria-hidden="true" className="size-3.5" /> : <Pause aria-hidden="true" className="size-3.5" />}
                  <span className="hidden md:inline">{(paused ? c.auto.resume : c.auto.pause)[locale]}</span>
                </button>
              </div>

              <div className="grid xl:grid-cols-[minmax(0,1fr)_20rem]">
                <div className="min-w-0 p-4 sm:p-6">
                  <div className="mb-5">
                    <p className="font-mono text-micro uppercase tracking-[0.12em] text-brand-text">
                      {active.nav[locale]}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold tracking-tight text-ink">{active.title[locale]}</h3>
                    <p className="mt-2 max-w-3xl text-ui leading-relaxed text-muted">{active.body[locale]}</p>
                  </div>
                  <ExperienceCanvas locale={locale} step={step} />
                </div>

                <aside className="border-t border-hairline bg-raised/40 p-4 sm:p-5 xl:border-l xl:border-t-0">
                  <CaseSummary locale={locale} step={step} />
                </aside>
              </div>

              <div className="border-t border-hairline px-4 py-3">
                <div className="flex flex-wrap items-center gap-2">
                  {c.steps.map((item, index) => (
                    <div key={item.id} className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => selectStep(item.id)}
                        className={[
                          "rounded-chip border px-2.5 py-1 text-micro",
                          item.id === step ? "border-brand-text/40 bg-raised text-ink" : "border-hairline text-muted",
                        ].join(" ")}
                      >
                        {index + 1}. {item.nav[locale]}
                      </button>
                      {index < c.steps.length - 1 && <ArrowRight aria-hidden="true" className="size-3 text-muted" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="font-mono text-micro uppercase tracking-[0.12em] text-muted">{c.labels.sampleNotice[locale]}</p>
      </Stack>
    </Section>
  );
}

function ExperienceCanvas({ locale, step }: { locale: Locale; step: ExperienceStepId }) {
  if (step === "overview") return <Overview locale={locale} />;
  if (step === "signal") return <Signal locale={locale} />;
  if (step === "investigation") return <Investigation locale={locale} />;
  if (step === "evidence") return <Evidence locale={locale} />;
  if (step === "decision") return <Decision locale={locale} />;
  return <Action locale={locale} />;
}

function Overview({ locale }: { locale: Locale }) {
  const c = productExperience;
  const nodes = c.overviewNodes.map((node) => ({
    ...node,
    ...OVERVIEW_VISUAL[node.id],
  }));
  return (
    <div className="relative min-h-[28rem] overflow-hidden rounded-card border border-hairline bg-raised">
      <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full text-outline">
        {nodes.map((node) => (
          <line key={node.label[locale]} x1="50" y1="48" x2={parseFloat(node.x)} y2={parseFloat(node.y)} stroke="currentColor" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
      <div className="absolute left-1/2 top-[48%] flex size-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-brand-text/35 bg-surface shadow-lg">
        <div className="text-center">
          <img src="/products/dima-mark.png" alt="" width={28} height={28} className="dima-logo-mark mx-auto" />
          <p className="mt-1 text-micro font-semibold text-ink">{c.labels.company[locale]}</p>
        </div>
      </div>
      {nodes.map((node) => {
        const Icon = node.icon;
        return (
          <div
            key={node.label[locale]}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-card border border-hairline bg-surface px-3 py-2 shadow-sm"
            style={{ left: node.x, top: node.y }}
          >
            <span className="flex items-center gap-2 text-ui font-medium text-ink">
              <Icon aria-hidden="true" className="size-4 text-brand-text" />
              {node.label[locale]}
            </span>
          </div>
        );
      })}
      <div className="absolute inset-x-4 bottom-4 grid gap-2 sm:grid-cols-2">
        <div className="rounded-control border border-brand-text/35 bg-surface p-3 shadow-sm">
          <p className="text-micro font-medium text-ink">{c.sampleCase.signal.title[locale]}</p>
          <p className="mt-1 text-micro text-muted">{c.sampleCase.signal.meta[locale]}</p>
        </div>
        <div className="rounded-control border border-hairline bg-surface p-3 shadow-sm">
          <p className="text-micro font-medium text-ink">{c.labels.secondarySignal[locale]}</p>
          <p className="mt-1 text-micro text-muted">{c.labels.secondarySignalMeta[locale]}</p>
        </div>
      </div>
    </div>
  );
}

function Signal({ locale }: { locale: Locale }) {
  const s = productExperience.sampleCase;
  return (
    <div className="grid gap-4">
      <div className="rounded-card border border-brand-text/35 bg-[color-mix(in_oklab,var(--color-text-brand)_7%,var(--color-bg-surface))] p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xl font-semibold text-ink">{s.signal.title[locale]}</p>
            <p className="mt-1 text-ui text-muted">{s.signal.meta[locale]}</p>
          </div>
          <span className="rounded-chip border border-brand-text/30 bg-surface px-2.5 py-1 text-micro text-brand-text">
            {productExperience.labels.attention[locale]}
          </span>
        </div>
        <p className="mt-4 text-ui font-medium text-ink">{s.signal.impact[locale]}</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {s.metrics[locale].map((metric) => (
          <div key={metric.label} className="dima-surface-sm p-4">
            <p className="text-micro text-muted">{metric.label}</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums text-ink">{metric.value}</p>
            <p className="mt-1 text-micro text-muted">{metric.context}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Investigation({ locale }: { locale: Locale }) {
  const c = productExperience;
  return (
    <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_15rem]">
      <div className="rounded-card border border-hairline bg-surface p-5">
        <p className="text-ui font-semibold text-ink">{c.labels.cause[locale]}</p>
        <div className="mt-4 space-y-4">
          {c.sampleCase.causes[locale].map((cause) => (
            <div key={cause.label}>
              <div className="flex items-center justify-between gap-3">
                <span className="text-ui font-medium text-ink">{cause.label}</span>
                <span className="font-mono text-micro text-brand-text">{cause.score}</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-raised">
                <div className="h-full rounded-full bg-brand" style={{ width: cause.score }} />
              </div>
              <p className="mt-1.5 text-micro text-muted">{cause.note}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-card border border-hairline bg-raised p-4">
        <p className="text-micro font-medium text-muted">{c.labels.source[locale]}</p>
        <ul className="mt-3 space-y-2">
          {c.sampleCase.sources[locale].map((source) => (
            <li key={source} className="flex items-center gap-2 text-micro text-ink">
              <Database aria-hidden="true" className="size-3.5 text-brand-text" />
              {source}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Evidence({ locale }: { locale: Locale }) {
  const c = productExperience;
  return (
    <div className="rounded-card border border-hairline bg-surface p-5">
      <div className="flex items-center gap-2">
        <ShieldCheck aria-hidden="true" className="size-5 text-brand-text" />
        <p className="text-base font-semibold text-ink">{c.labels.evidence[locale]}</p>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {c.sampleCase.evidence[locale].map((item, index) => (
          <div key={item} className="rounded-control border border-hairline bg-raised p-4">
            <span className="font-mono text-micro text-brand-text">{String(index + 1).padStart(2, "0")}</span>
            <p className="mt-2 text-ui leading-relaxed text-ink">{item}</p>
            <button type="button" className="mt-3 text-micro font-medium text-brand-text">
              {c.labels.inspect[locale]}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Decision({ locale }: { locale: Locale }) {
  const c = productExperience;
  return (
    <div className="grid gap-3">
      <p className="text-ui font-semibold text-ink">{c.labels.options[locale]}</p>
      {c.sampleCase.decisions[locale].map((option, index) => (
        <div key={option.title} className={["rounded-card border p-4", index === 0 ? "border-brand-text/40 bg-[color-mix(in_oklab,var(--color-text-brand)_6%,var(--color-bg-surface))]" : "border-hairline bg-surface"].join(" ")}>
          <div className="flex items-start gap-3">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-hairline bg-raised font-mono text-micro text-muted">{index + 1}</span>
            <div>
              <p className="text-ui font-semibold text-ink">{option.title}</p>
              <p className="mt-1 text-ui leading-relaxed text-muted">{option.effect}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Action({ locale }: { locale: Locale }) {
  const c = productExperience;
  return (
    <div className="rounded-card border border-brand-text/35 bg-[color-mix(in_oklab,var(--color-text-brand)_6%,var(--color-bg-surface))] p-6">
      <div className="flex size-10 items-center justify-center rounded-control bg-brand text-white">
        <CheckCircle2 aria-hidden="true" className="size-5" />
      </div>
      <p className="mt-4 font-mono text-micro uppercase tracking-[0.12em] text-muted">{c.labels.prepared[locale]}</p>
      <h4 className="mt-2 text-xl font-semibold text-ink">{c.sampleCase.action.title[locale]}</h4>
      <p className="mt-2 text-ui text-muted">{c.sampleCase.action.owner[locale]}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        <span className="rounded-chip border border-hairline bg-surface px-3 py-1.5 text-micro text-ink">{c.sampleCase.action.approval[locale]}</span>
        <span className="rounded-chip border border-hairline bg-surface px-3 py-1.5 text-micro text-muted">{c.sampleCase.company[locale]}</span>
      </div>
    </div>
  );
}

function CaseSummary({ locale, step }: { locale: Locale; step: ExperienceStepId }) {
  const c = productExperience;
  return (
    <div className="space-y-5">
      <div>
        <p className="font-mono text-micro uppercase tracking-[0.12em] text-muted">{c.sampleCase.company[locale]}</p>
        <p className="mt-1 text-ui font-semibold text-ink">{c.sampleCase.period[locale]}</p>
      </div>
      <div className="border-t border-hairline pt-4">
        <p className="text-micro font-medium text-muted">{c.sampleCase.signal.title[locale]}</p>
        <p className="mt-2 text-ui font-semibold text-ink">{c.sampleCase.signal.impact[locale]}</p>
      </div>
      <div className="border-t border-hairline pt-4">
        <p className="text-micro font-medium text-muted">{c.labels.currentStep[locale]}</p>
        <p className="mt-1 text-ui font-semibold text-ink">{c.steps.find((item) => item.id === step)?.nav[locale]}</p>
      </div>
      <div className="border-t border-hairline pt-4">
        <p className="text-micro font-medium text-muted">{c.labels.source[locale]}</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {c.sampleCase.sources[locale].map((source) => (
            <span key={source} className="rounded-chip border border-hairline bg-surface px-2 py-1 text-micro text-muted">{source}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
