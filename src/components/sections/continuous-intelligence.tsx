"use client";

import * as React from "react";
import {
  CircleDollarSign,
  Database,
  Pause,
  Play,
  ScanLine,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Heading, Section, Stack, Text } from "@upcytech/ui";

import type { Locale } from "@/i18n/routing";
import { continuousIntelligence } from "@/content/continuous-intelligence";

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

export function ContinuousIntelligence({ locale }: { locale: Locale }) {
  const c = continuousIntelligence;
  const reduced = useReducedMotion();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const active = c.events[activeIndex]!;

  React.useEffect(() => {
    if (paused || reduced) return;
    const timer = window.setInterval(() => {
      setActiveIndex((value) => (value + 1) % c.events.length);
    }, 5400);
    return () => window.clearInterval(timer);
  }, [paused, reduced, c.events.length]);

  const choose = (index: number) => {
    setActiveIndex(index);
    setPaused(true);
  };

  return (
    <Section width="wide" responsive aria-labelledby="continuous-intelligence-title" className="py-20! sm:py-24! lg:py-28!">
      <Stack gap="loose">
        <div className="grid gap-5 lg:grid-cols-12 lg:items-end">
          <Stack gap="tight" className="lg:col-span-8">
            <Text variant="eyebrow">{c.eyebrow[locale]}</Text>
            <Heading level={2} variant="title" id="continuous-intelligence-title" className="max-w-4xl">
              {c.title[locale]}
            </Heading>
            <p className="max-w-3xl text-ui leading-relaxed text-muted">{c.monitor.intro[locale]}</p>
          </Stack>

          <div className="flex items-center gap-3 lg:col-span-4 lg:justify-self-end">
            <span className="inline-flex items-center gap-2 font-mono text-micro uppercase tracking-[0.12em] text-muted">
              <span aria-hidden="true" className="size-2 rounded-full bg-positive" />
              {c.monitor.sources[locale]}
            </span>
            <button
              type="button"
              onClick={() => setPaused((value) => !value)}
              aria-label={(paused ? c.monitor.resume : c.monitor.pause)[locale]}
              className="inline-flex min-h-11 items-center gap-2 rounded-button border border-hairline bg-surface px-3 text-ui font-medium text-muted transition hoverable:hover:text-ink"
            >
              {paused ? <Play aria-hidden="true" className="size-4" /> : <Pause aria-hidden="true" className="size-4" />}
              {(paused ? c.monitor.resume : c.monitor.pause)[locale]}
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-[1.35rem] border border-outline bg-surface shadow-xl">
          <div className="relative border-b border-hairline bg-raised/60">
            {!paused && !reduced ? <span aria-hidden="true" className="dima-ledger-scan absolute inset-y-0 w-28 bg-[linear-gradient(90deg,transparent,color-mix(in_oklab,var(--color-text-brand)_7%,transparent),transparent)]" /> : null}

            <div
              role="row"
              className="hidden grid-cols-[5rem_9rem_7rem_minmax(0,1.6fr)_minmax(0,1fr)] gap-4 px-5 py-3 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted lg:grid"
            >
              <span>{c.monitor.columns.time[locale]}</span>
              <span>{c.monitor.columns.domain[locale]}</span>
              <span>{c.monitor.columns.status[locale]}</span>
              <span>{c.monitor.columns.finding[locale]}</span>
              <span>{c.monitor.columns.impact[locale]}</span>
            </div>

            <div role="table" aria-label={c.monitor.title[locale]} className="divide-y divide-hairline">
              {c.events.map((event, index) => {
                const selected = index === activeIndex;
                return (
                  <button
                    key={event.id}
                    type="button"
                    role="row"
                    onClick={() => choose(index)}
                    aria-pressed={selected}
                    className={[
                      "grid w-full gap-2 px-4 py-4 text-left transition sm:px-5 lg:grid-cols-[5rem_9rem_7rem_minmax(0,1.6fr)_minmax(0,1fr)] lg:items-center lg:gap-4",
                      selected ? "bg-surface" : "bg-transparent hoverable:hover:bg-surface/70",
                    ].join(" ")}
                  >
                    <span className="font-mono text-micro tabular-nums text-muted">{event.time}</span>

                    <span className="text-ui font-semibold text-ink">{event.domain[locale]}</span>

                    <span className="inline-flex w-fit items-center gap-2 rounded-chip border border-hairline bg-surface px-2 py-1 text-micro text-muted">
                      <span
                        aria-hidden="true"
                        className={[
                          "size-1.5 rounded-full",
                          event.status.tr === "Fırsat"
                            ? "bg-positive"
                            : event.status.tr === "Normal"
                              ? "bg-info"
                              : event.status.tr === "Risk"
                                ? "bg-warning"
                                : "bg-negative",
                        ].join(" ")}
                      />
                      {event.status[locale]}
                    </span>

                    <span className="text-ui font-medium leading-relaxed text-ink">{event.title[locale]}</span>
                    <span className="text-ui leading-relaxed text-muted">{event.impact[locale]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div key={active.id} className="dima-ledger-detail grid gap-5 p-5 sm:p-6 lg:grid-cols-[1fr_1fr_1fr] lg:p-7">
            <LedgerDetail
              icon={ScanLine}
              label={c.monitor.detected[locale]}
              body={active.detected[locale]}
            />
            <LedgerDetail
              icon={Database}
              label={c.monitor.inspected[locale]}
              body={active.inspected[locale]}
            />
            <LedgerDetail
              icon={Sparkles}
              label={c.monitor.recommendation[locale]}
              body={active.recommendation[locale]}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-hairline px-5 py-4 sm:px-6">
            <div className="flex items-center gap-2">
              <CircleDollarSign aria-hidden="true" className="size-4 text-brand-text" />
              <span className="text-micro font-medium text-muted">{c.monitor.impact[locale]}</span>
              <span className="text-ui font-semibold text-ink">{active.impact[locale]}</span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {c.process[locale].map((item, index) => (
                <React.Fragment key={item}>
                  <span className={["text-micro", index <= activeIndex % c.process[locale].length ? "text-ink" : "text-muted"].join(" ")}>
                    {item}
                  </span>
                  {index < c.process[locale].length - 1 ? <span aria-hidden="true" className="text-hairline">/</span> : null}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </Stack>
    </Section>
  );
}

function LedgerDetail({
  icon: Icon,
  label,
  body,
}: {
  icon: LucideIcon;
  label: string;
  body: string;
}) {
  return (
    <article className="border-t border-hairline pt-4">
      <div className="flex items-center gap-2">
        <Icon aria-hidden="true" className="size-4 text-brand-text" />
        <p className="font-mono text-micro uppercase tracking-[0.12em] text-muted">{label}</p>
      </div>
      <p className="mt-2 text-ui leading-relaxed text-ink">{body}</p>
    </article>
  );
}
