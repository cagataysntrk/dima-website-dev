"use client";

import * as React from "react";
import {
  Banknote,
  BrainCircuit,
  Factory,
  FlaskConical,
  Search,
  Sparkles,
  Waypoints,
  type LucideIcon,
} from "lucide-react";
import { Heading, Section, Stack, Text } from "@upcytech/ui";

import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import {
  capabilities,
  capabilityCatalogCopy as copy,
  capabilityGroups,
  homeCapabilityIds,
  type CapabilityGroupId,
  type CapabilityId,
} from "@/content/capability-catalog";

const GROUP_ICON: Record<CapabilityGroupId, LucideIcon> = {
  general: BrainCircuit,
  finance: Banknote,
  manufacturing: Factory,
  textile: Waypoints,
  plastics: FlaskConical,
};

const FEATURE_POSITIONS = [
  ["7%", "14%"],
  ["38%", "2%"],
  ["72%", "11%"],
  ["82%", "42%"],
  ["70%", "73%"],
  ["38%", "82%"],
  ["8%", "70%"],
  ["0%", "40%"],
] as const;

export function CapabilityShowcase({ locale }: { locale: Locale }) {
  const featured = capabilities.filter((item) => homeCapabilityIds.includes(item.id));
  const [activeId, setActiveId] = React.useState<CapabilityId>(featured[0]!.id);
  const [manual, setManual] = React.useState(false);
  const active = featured.find((item) => item.id === activeId) ?? featured[0]!;

  React.useEffect(() => {
    if (manual) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;
    const timer = window.setInterval(() => {
      setActiveId((current) => {
        const index = featured.findIndex((item) => item.id === current);
        return featured[(index + 1) % featured.length]!.id;
      });
    }, 4200);
    return () => window.clearInterval(timer);
  }, [manual, featured]);

  return (
    <Section divided aria-labelledby="capability-showcase-title">
      <Stack gap="loose">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <Stack gap="tight" className="max-w-4xl">
            <Text variant="eyebrow">{copy.eyebrow[locale]}</Text>
            <Heading level={2} variant="title" id="capability-showcase-title">{copy.title[locale]}</Heading>
            <Text tone="muted" className="max-w-3xl">{copy.intro[locale]}</Text>
          </Stack>
          <Link
            href="/industries"
            className="inline-flex min-h-11 w-fit items-center rounded-button border border-hairline bg-surface px-4 text-ui font-semibold text-ink transition hoverable:hover:border-outline lg:justify-self-end"
          >
            {copy.viewAll[locale]}
          </Link>
        </div>

        <div className="grid overflow-hidden rounded-[1.75rem] border border-outline bg-surface shadow-xl lg:grid-cols-[1.25fr_0.75fr]">
          <div className="relative min-h-0 overflow-hidden border-b border-hairline bg-[radial-gradient(circle_at_50%_50%,color-mix(in_oklab,var(--color-text-brand)_10%,transparent),transparent_48%)] sm:min-h-[33rem] lg:border-b-0 lg:border-r">
            <div className="grid grid-cols-2 gap-2 p-4 sm:hidden">
              {featured.map((item) => {
                const selected = item.id === active.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => { setActiveId(item.id); setManual(true); }}
                    aria-pressed={selected}
                    className={[
                      "min-h-24 rounded-card border p-3 text-left transition",
                      selected ? "border-brand-text/35 bg-surface shadow-sm" : "border-hairline bg-surface/90",
                    ].join(" ")}
                  >
                    <span className="flex items-start gap-2">
                      <span className={["mt-1 size-2 shrink-0 rounded-full", selected ? "bg-brand" : "bg-outline"].join(" ")} />
                      <span className="text-micro font-semibold leading-snug text-ink">{item.title[locale]}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 hidden size-full text-brand-text/20 sm:block">
              {FEATURE_POSITIONS.map(([x, y], index) => {
                const nx = Number.parseFloat(x) + 9;
                const ny = Number.parseFloat(y) + 7;
                return <path key={index} d={`M 50 50 C 50 50, ${nx} ${ny}, ${nx} ${ny}`} fill="none" stroke="currentColor" strokeWidth="0.35" strokeDasharray="2 2" vectorEffect="non-scaling-stroke" />;
              })}
              <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" strokeWidth="0.25" strokeDasharray="2 3" />
            </svg>

            <div className="absolute left-1/2 top-1/2 z-10 hidden size-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-brand-text/30 bg-surface shadow-xl sm:grid">
              <span aria-hidden="true" className="absolute inset-2 rounded-full border border-brand-text/15 motion-safe:animate-pulse" />
              <div className="text-center">
                <img src="/products/dima-mark.png" alt="" width={34} height={34} className="dima-logo-mark mx-auto size-8" />
                <p className="mt-1 font-mono text-micro uppercase tracking-[0.12em] text-muted">{copy.featured[locale]}</p>
              </div>
            </div>

            {featured.map((item, index) => {
              const [left, top] = FEATURE_POSITIONS[index]!;
              const selected = item.id === active.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => { setActiveId(item.id); setManual(true); }}
                  aria-pressed={selected}
                  className={[
                    "absolute z-20 hidden w-[10.5rem] rounded-card border p-3 text-left shadow-sm backdrop-blur-md transition sm:block sm:w-[12.5rem]",
                    selected
                      ? "border-brand-text/35 bg-surface text-ink shadow-lg"
                      : "border-hairline bg-surface/90 text-ink hoverable:hover:border-outline",
                  ].join(" ")}
                  style={{ left, top }}
                >
                  <span className="flex items-center gap-2">
                    <span className={[
                      "size-2 shrink-0 rounded-full",
                      selected ? "bg-brand motion-safe:animate-pulse" : "bg-outline",
                    ].join(" ")} />
                    <span className="text-micro font-semibold leading-snug">{item.title[locale]}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex min-h-[24rem] flex-col justify-center p-5 sm:p-7">
            <p className="font-mono text-micro uppercase tracking-[0.12em] text-brand-text">{copy.featured[locale]}</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-ink">{active.title[locale]}</h3>
            <p className="mt-4 text-ui leading-relaxed text-muted">{active.summary[locale]}</p>

            <div className="mt-6 rounded-card border border-hairline bg-raised p-4">
              <p className="text-micro font-medium text-muted">{copy.labels.outcome[locale]}</p>
              <p className="mt-2 text-base font-semibold leading-snug text-ink">{active.outcome[locale]}</p>
            </div>

            <p className="mt-6 font-mono text-micro uppercase tracking-[0.12em] text-muted">{copy.labels.loop[locale]}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {copy.loop[locale].map((step, index) => (
                <span key={step} className="inline-flex items-center gap-1.5 rounded-button border border-hairline bg-surface px-2.5 py-1.5 text-micro text-muted">
                  <span className={["size-1.5 rounded-full", index < 3 ? "bg-brand" : "bg-outline"].join(" ")} />
                  {step}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Stack>
    </Section>
  );
}

export function CapabilityDirectory({ locale }: { locale: Locale }) {
  const [group, setGroup] = React.useState<CapabilityGroupId>("general");
  const [query, setQuery] = React.useState("");
  const groupItems = capabilities.filter((item) => item.group === group);
  const filtered = groupItems.filter((item) => {
    const needle = query.trim().toLocaleLowerCase(locale === "tr" ? "tr-TR" : "en-US");
    if (!needle) return true;
    return `${item.title[locale]} ${item.summary[locale]} ${item.outcome[locale]}`
      .toLocaleLowerCase(locale === "tr" ? "tr-TR" : "en-US")
      .includes(needle);
  });
  const [activeId, setActiveId] = React.useState<CapabilityId>(capabilities.find((item) => item.group === group)!.id);

  React.useEffect(() => {
    const first = capabilities.find((item) => item.group === group);
    if (first) setActiveId(first.id);
    setQuery("");
  }, [group]);

  const active = capabilities.find((item) => item.id === activeId && item.group === group) ?? filtered[0] ?? groupItems[0]!;
  const activeGroup = capabilityGroups.find((item) => item.id === group)!;
  const ActiveIcon = GROUP_ICON[group];

  return (
    <Section divided aria-labelledby="capability-directory-title">
      <Stack gap="loose">
        <Stack gap="tight" className="max-w-4xl">
          <Text variant="eyebrow">{copy.eyebrow[locale]}</Text>
          <Heading level={2} variant="title" id="capability-directory-title">{copy.title[locale]}</Heading>
          <Text tone="muted">{copy.intro[locale]}</Text>
        </Stack>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {capabilityGroups.map((item) => {
            const Icon = GROUP_ICON[item.id];
            const selected = item.id === group;
            const count = capabilities.filter((capability) => capability.group === item.id).length;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setGroup(item.id)}
                aria-pressed={selected}
                className={[
                  "min-w-max rounded-button border px-3 py-2.5 transition",
                  selected ? "border-ink/10 bg-ink text-canvas shadow-sm" : "border-hairline bg-surface text-ink",
                ].join(" ")}
              >
                <span className="flex items-center gap-2">
                  <Icon aria-hidden="true" className={["size-4", selected ? "text-white" : "text-brand-text"].join(" ")} />
                  <span className="text-ui font-semibold">{item.label[locale]}</span>
                  <span className={["rounded-chip px-2 py-0.5 font-mono text-micro", selected ? "bg-white/10 text-white/70" : "bg-raised text-muted"].join(" ")}>{count}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr]">
          <aside className="h-fit rounded-[1.5rem] border border-outline bg-surface p-5 shadow-sm lg:sticky lg:top-[calc(var(--nav-offset)+2rem)]">
            <span className="grid size-11 place-items-center rounded-control bg-raised text-brand-text"><ActiveIcon aria-hidden="true" className="size-5" /></span>
            <p className="mt-4 font-mono text-micro uppercase tracking-[0.12em] text-brand-text">{activeGroup.label[locale]}</p>
            <h3 className="mt-2 text-xl font-semibold tracking-tight text-ink">{active.title[locale]}</h3>
            <p className="mt-3 text-ui leading-relaxed text-muted">{active.summary[locale]}</p>
            <div className="mt-5 rounded-card border border-hairline bg-raised p-4">
              <p className="text-micro font-medium text-muted">{copy.labels.outcome[locale]}</p>
              <p className="mt-2 text-base font-semibold leading-snug text-ink">{active.outcome[locale]}</p>
            </div>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {copy.loop[locale].map((step) => (
                <span key={step} className="rounded-chip border border-hairline bg-surface px-2 py-1 text-micro text-muted">{step}</span>
              ))}
            </div>
          </aside>

          <div>
            <label className="relative block">
              <span className="sr-only">{copy.search[locale]}</span>
              <Search aria-hidden="true" className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={copy.search[locale]}
                className="min-h-12 w-full rounded-control border border-hairline bg-surface pl-10 pr-4 text-ui text-ink outline-none transition focus:border-brand-text"
              />
            </label>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {filtered.map((item, index) => {
                const selected = item.id === active.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveId(item.id)}
                    aria-pressed={selected}
                    className={[
                      "min-h-36 rounded-card border p-4 text-left transition",
                      selected
                        ? "border-brand-text/35 bg-[color-mix(in_oklab,var(--color-text-brand)_5%,var(--color-bg-surface))] shadow-sm"
                        : "border-hairline bg-surface hoverable:hover:border-outline",
                    ].join(" ")}
                  >
                    <span className="flex items-start justify-between gap-3">
                      <span className="grid size-8 shrink-0 place-items-center rounded-control bg-raised font-mono text-micro text-brand-text">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {selected ? <Sparkles aria-hidden="true" className="size-4 text-brand-text" /> : null}
                    </span>
                    <span className="mt-3 block text-ui font-semibold leading-snug text-ink">{item.title[locale]}</span>
                    <span className="mt-1.5 line-clamp-2 block text-micro leading-relaxed text-muted">{item.summary[locale]}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </Stack>
    </Section>
  );
}
