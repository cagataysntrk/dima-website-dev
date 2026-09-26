"use client";

import * as React from "react";
import {
  Activity,
  CircleDollarSign,
  Database,
  Factory,
  PackageSearch,
  Pause,
  Play,
  ScanLine,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Heading, Section, Stack, Text } from "@upcytech/ui";
import type { Locale } from "@/i18n/routing";
import { continuousIntelligence, type WatchEventId } from "@/content/continuous-intelligence";

const EVENT_ICON: Record<WatchEventId, LucideIcon> = {
  "production-loss": Factory,
  "collection-risk": CircleDollarSign,
  "margin-shift": ShoppingCart,
  "supplier-opportunity": PackageSearch,
  "quality-stable": ShieldCheck,
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
    }, 4200);
    return () => window.clearInterval(timer);
  }, [paused, reduced, c.events.length]);

  const select = (index: number) => {
    setActiveIndex(index);
    setPaused(true);
  };

  return (
    <Section divided aria-labelledby="continuous-intelligence-title">
      <Stack gap="loose">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          <Stack gap="tight" className="lg:col-span-6">
            <Text variant="eyebrow">{c.eyebrow[locale]}</Text>
            <Heading level={2} variant="title" id="continuous-intelligence-title">
              {c.title[locale]}
            </Heading>
            <Text variant="lede" tone="muted">{c.intro[locale]}</Text>

            <div className="mt-2 grid gap-3 sm:grid-cols-2">
              <article className="rounded-card border border-hairline bg-surface p-4">
                <p className="text-ui font-semibold text-ink">{c.thesis.horizontal.title[locale]}</p>
                <p className="mt-1 text-ui leading-relaxed text-muted">{c.thesis.horizontal.body[locale]}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {c.thesis.horizontal.items[locale].map((item) => (
                    <span key={item} className="rounded-chip border border-hairline bg-raised px-2 py-1 text-micro text-muted">{item}</span>
                  ))}
                </div>
              </article>
              <article className="rounded-card border border-hairline bg-surface p-4">
                <p className="text-ui font-semibold text-ink">{c.thesis.vertical.title[locale]}</p>
                <p className="mt-1 text-ui leading-relaxed text-muted">{c.thesis.vertical.body[locale]}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {c.thesis.vertical.items[locale].map((item) => (
                    <span key={item} className="rounded-chip border border-hairline bg-raised px-2 py-1 text-micro text-muted">{item}</span>
                  ))}
                </div>
              </article>
            </div>

            <article className="rounded-card border border-brand-text/25 bg-[color-mix(in_oklab,var(--color-text-brand)_6%,var(--color-bg-surface))] p-4">
              <div className="flex items-center gap-2">
                <Sparkles aria-hidden="true" className="size-4 text-brand-text" />
                <p className="text-ui font-semibold text-ink">{c.thesis.cross.title[locale]}</p>
              </div>
              <p className="mt-1 text-ui leading-relaxed text-muted">{c.thesis.cross.body[locale]}</p>
            </article>
          </Stack>

          <div className="lg:col-span-6">
            <div data-brand="dima" className="dima-app overflow-hidden rounded-card border border-outline bg-surface shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline px-4 py-3">
                <div className="flex items-center gap-2">
                  <span aria-hidden="true" className="relative flex size-3">
                    <span className="absolute inline-flex size-full motion-safe:animate-ping rounded-full bg-brand opacity-40" />
                    <span className="relative inline-flex size-3 rounded-full bg-brand" />
                  </span>
                  <div>
                    <p className="text-ui font-semibold text-ink">{c.monitor.title[locale]}</p>
                    <p className="text-micro text-muted">{c.monitor.sources[locale]}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setPaused((value) => !value)}
                  aria-label={(paused ? c.monitor.resume : c.monitor.pause)[locale]}
                  className="inline-flex min-h-11 items-center gap-2 rounded-control border border-hairline bg-raised px-3 text-micro text-muted transition hoverable:hover:text-ink"
                >
                  {paused ? <Play aria-hidden="true" className="size-3.5" /> : <Pause aria-hidden="true" className="size-3.5" />}
                  {(paused ? c.monitor.resume : c.monitor.pause)[locale]}
                </button>
              </div>

              <div className="border-b border-hairline px-4 py-3">
                <p className="font-mono text-micro uppercase tracking-[0.12em] text-muted">{c.monitor.sample[locale]}</p>
                <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                  {c.events.map((event, index) => {
                    const Icon = EVENT_ICON[event.id];
                    const selected = index === activeIndex;
                    return (
                      <button
                        key={event.id}
                        type="button"
                        onClick={() => select(index)}
                        aria-pressed={selected}
                        className={[
                          "min-w-[9rem] rounded-control border p-3 text-left transition",
                          selected ? "border-brand-text/40 bg-[color-mix(in_oklab,var(--color-text-brand)_7%,var(--color-bg-surface))]" : "border-hairline bg-raised",
                        ].join(" ")}
                      >
                        <span className="flex items-center gap-2">
                          <Icon aria-hidden="true" className="size-4 text-brand-text" />
                          <span className="text-micro font-semibold text-ink">{event.domain[locale]}</span>
                        </span>
                        <span className="mt-2 block text-micro text-muted">{event.status[locale]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-control bg-raised text-brand-text">
                    <ScanLine aria-hidden="true" className="size-4" />
                  </span>
                  <div>
                    <p className="font-mono text-micro uppercase tracking-[0.12em] text-brand-text">{active.status[locale]}</p>
                    <h3 className="mt-1 text-lg font-semibold tracking-tight text-ink">{active.title[locale]}</h3>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <Detail label={c.monitor.detected[locale]} body={active.detected[locale]} icon={Activity} />
                  <Detail label={c.monitor.inspected[locale]} body={active.inspected[locale]} icon={Database} />
                  <Detail label={c.monitor.recommendation[locale]} body={active.recommendation[locale]} icon={Sparkles} />
                  <Detail label={c.monitor.impact[locale]} body={active.impact[locale]} icon={CircleDollarSign} />
                </div>

                <div className="mt-5 border-t border-hairline pt-4">
                  <p className="text-micro font-medium text-muted">{c.processTitle[locale]}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-1.5">
                    {c.process[locale].map((item, index) => (
                      <React.Fragment key={item}>
                        <span className={[
                          "rounded-chip border px-2.5 py-1 text-micro transition",
                          index === activeIndex % c.process[locale].length
                            ? "border-brand-text/40 bg-raised text-ink"
                            : "border-hairline text-muted",
                        ].join(" ")}>
                          {item}
                        </span>
                        {index < c.process[locale].length - 1 && <span aria-hidden="true" className="text-muted">›</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Stack>
    </Section>
  );
}

function Detail({ label, body, icon: Icon }: { label: string; body: string; icon: LucideIcon }) {
  return (
    <article className="rounded-control border border-hairline bg-raised p-3">
      <div className="flex items-center gap-2 text-micro font-medium text-muted">
        <Icon aria-hidden="true" className="size-3.5 text-brand-text" />
        {label}
      </div>
      <p className="mt-2 text-ui leading-relaxed text-ink">{body}</p>
    </article>
  );
}
