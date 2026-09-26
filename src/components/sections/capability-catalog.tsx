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
import { AnimatedBackground } from "@/components/vendor/motion-primitives/animated-background";

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
    }, 5200);
    return () => window.clearInterval(timer);
  }, [manual, featured]);

  const image =
    active.id === "investigation" || active.id === "decision-desk" || active.id === "scenario-studio"
      ? "/product-concepts/dima-full-brain.webp"
      : "/product-concepts/dima-command-center.webp";

  return (
    <Section
      width="wide"
      responsive
      aria-labelledby="capability-showcase-title"
      className="bg-[var(--upcytech-neutral-1000)] py-20! text-white sm:py-24! lg:py-28!"
    >
      <Stack gap="loose">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <Stack gap="tight" className="lg:col-span-8">
            <Text variant="eyebrow" className="text-white/55">{copy.eyebrow[locale]}</Text>
            <Heading level={2} variant="title" id="capability-showcase-title" className="max-w-4xl text-white">
              {copy.title[locale]}
            </Heading>
            <p className="max-w-3xl text-ui leading-relaxed text-white/60">{copy.intro[locale]}</p>
          </Stack>
          <Link
            href="/industries"
            className="inline-flex min-h-11 w-fit items-center rounded-button border border-white/15 px-4 text-ui font-semibold text-white transition hoverable:hover:bg-white/5 lg:col-span-4 lg:justify-self-end"
          >
            {copy.viewAll[locale]}
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[18rem_minmax(0,1fr)]">
          <div className="min-w-0">
            <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
              <AnimatedBackground
                defaultValue={active.id}
                onValueChange={(id) => {
                  if (!id) return;
                  setActiveId(id as CapabilityId);
                  setManual(true);
                }}
                className="rounded-[0.9rem] bg-white/10"
                transition={{ type: "spring", stiffness: 360, damping: 36 }}
              >
                {featured.map((item, index) => (
                  <button
                    key={item.id}
                    data-id={item.id}
                    type="button"
                    aria-pressed={item.id === active.id}
                    className="min-w-[13rem] rounded-[0.9rem] px-3 py-3 text-left text-white/60 transition-colors data-[checked=true]:text-white lg:min-w-0"
                  >
                    <span className="flex items-start gap-3">
                      <span className="pt-0.5 font-mono text-[0.62rem] tabular-nums opacity-45">{String(index + 1).padStart(2, "0")}</span>
                      <span className="text-ui font-semibold leading-snug">{item.title[locale]}</span>
                    </span>
                  </button>
                ))}
              </AnimatedBackground>
            </div>
          </div>

          <div className="min-w-0 overflow-hidden rounded-[1.3rem] border border-white/12 bg-white/[0.035] shadow-2xl">
            <div className="flex min-h-12 items-center gap-2 border-b border-white/10 px-4">
              <span aria-hidden="true" className="size-2 rounded-full bg-white/25" />
              <span aria-hidden="true" className="size-2 rounded-full bg-white/20" />
              <span aria-hidden="true" className="size-2 rounded-full bg-white/15" />
              <span className="ml-2 font-mono text-micro uppercase tracking-[0.12em] text-white/45">{copy.featured[locale]}</span>
            </div>

            <div className="relative min-h-[28rem] overflow-hidden sm:min-h-[34rem]">
              <img
                key={image}
                src={image}
                alt=""
                width={1536}
                height={1024}
                className="absolute inset-0 size-full object-cover object-top opacity-90"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,transparent_45%,color-mix(in_oklab,var(--upcytech-neutral-1000)_78%,transparent)_100%)]" />

              <div className="absolute inset-x-4 bottom-4 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[24rem]">
                <div className="rounded-[1.15rem] border border-white/15 bg-[color-mix(in_oklab,var(--upcytech-neutral-1000)_90%,transparent)] p-4 shadow-xl backdrop-blur-xl sm:p-5">
                  <p className="font-mono text-micro uppercase tracking-[0.12em] text-white/45">{copy.featured[locale]}</p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-white">{active.title[locale]}</h3>
                  <p className="mt-3 text-ui leading-relaxed text-white/65">{active.summary[locale]}</p>
                  <div className="mt-4 border-t border-white/10 pt-4">
                    <p className="text-micro text-white/45">{copy.labels.outcome[locale]}</p>
                    <p className="mt-1 text-ui font-semibold leading-snug text-white">{active.outcome[locale]}</p>
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

  React.useEffect(() => {
    if (filtered.length > 0 && !filtered.some((item) => item.id === activeId)) {
      setActiveId(filtered[0]!.id);
    }
  }, [filtered, activeId]);

  const active = capabilities.find((item) => item.id === activeId && item.group === group) ?? filtered[0] ?? groupItems[0]!;
  const activeGroup = capabilityGroups.find((item) => item.id === group)!;
  const ActiveIcon = GROUP_ICON[group];

  return (
    <Section width="wide" responsive divided aria-labelledby="capability-directory-title" className="py-20! sm:py-24! lg:py-28!">
      <Stack gap="loose">
        <div className="grid gap-5 lg:grid-cols-12 lg:items-end">
          <Stack gap="tight" className="lg:col-span-8">
            <Text variant="eyebrow">{copy.eyebrow[locale]}</Text>
            <Heading level={2} variant="title" id="capability-directory-title">{copy.title[locale]}</Heading>
            <Text tone="muted" className="max-w-3xl">{copy.intro[locale]}</Text>
          </Stack>
          <p className="text-ui text-muted lg:col-span-4 lg:justify-self-end lg:text-right">
            {activeGroup.description[locale]}
          </p>
        </div>

        <div className="border-y border-hairline py-3">
          <div className="flex gap-1 overflow-x-auto">
            <AnimatedBackground
              defaultValue={group}
              onValueChange={(id) => {
                if (id) setGroup(id as CapabilityGroupId);
              }}
              className="rounded-button bg-ink"
              transition={{ type: "spring", stiffness: 380, damping: 36 }}
            >
              {capabilityGroups.map((item) => {
                const Icon = GROUP_ICON[item.id];
                const count = capabilities.filter((capability) => capability.group === item.id).length;
                return (
                  <button
                    key={item.id}
                    data-id={item.id}
                    type="button"
                    aria-pressed={item.id === group}
                    className="min-w-max rounded-button px-3 py-2.5 text-ink transition-colors data-[checked=true]:text-canvas"
                  >
                    <span className="flex items-center gap-2">
                      <Icon aria-hidden="true" className="size-4" />
                      <span className="text-ui font-semibold">{item.label[locale]}</span>
                      <span className="font-mono text-micro opacity-50">{count}</span>
                    </span>
                  </button>
                );
              })}
            </AnimatedBackground>
          </div>
        </div>

        <div className="grid overflow-hidden rounded-[1.35rem] border border-outline bg-surface shadow-sm lg:grid-cols-[minmax(18rem,0.72fr)_minmax(0,1.28fr)]">
          <div className="border-b border-hairline lg:border-b-0 lg:border-r">
            <div className="border-b border-hairline p-3">
              <label className="relative block">
                <span className="sr-only">{copy.search[locale]}</span>
                <Search aria-hidden="true" className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={copy.search[locale]}
                  className="min-h-11 w-full rounded-control border border-hairline bg-canvas pl-9 pr-3 text-ui text-ink outline-none transition focus:border-brand-text"
                />
              </label>
            </div>

            <div className="max-h-[38rem] overflow-y-auto">
              {filtered.map((item, index) => {
                const selected = item.id === active.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveId(item.id)}
                    aria-pressed={selected}
                    className={[
                      "grid w-full grid-cols-[2.25rem_minmax(0,1fr)] gap-3 border-b border-hairline px-4 py-4 text-left last:border-b-0 transition",
                      selected ? "bg-raised" : "bg-surface hoverable:hover:bg-raised/55",
                    ].join(" ")}
                  >
                    <span className={[
                      "grid size-8 place-items-center rounded-control font-mono text-micro",
                      selected ? "bg-ink text-canvas" : "bg-canvas text-muted",
                    ].join(" ")}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0">
                      <span className={["block text-ui font-semibold leading-snug", selected ? "text-ink" : "text-ink"].join(" ")}>
                        {item.title[locale]}
                      </span>
                      <span className="mt-1 line-clamp-1 block text-micro text-muted">{item.outcome[locale]}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <aside className="relative min-h-[34rem] p-5 sm:p-7 lg:min-h-[38rem] lg:p-8">
            <div aria-hidden="true" className="absolute inset-x-0 top-0 h-44 bg-[radial-gradient(55%_100%_at_18%_0%,color-mix(in_oklab,var(--color-text-brand)_8%,transparent),transparent_78%)]" />
            <div className="relative">
              <span className="grid size-11 place-items-center rounded-control border border-hairline bg-raised text-brand-text">
                <ActiveIcon aria-hidden="true" className="size-5" />
              </span>
              <p className="mt-6 font-mono text-micro uppercase tracking-[0.12em] text-brand-text">{activeGroup.label[locale]}</p>
              <h3 className="mt-2 max-w-2xl text-3xl font-semibold tracking-tight text-ink">{active.title[locale]}</h3>
              <p className="mt-4 max-w-3xl text-ui leading-relaxed text-muted">{active.summary[locale]}</p>

              <div className="mt-8 grid gap-5 border-y border-hairline py-6 sm:grid-cols-2">
                <div>
                  <p className="font-mono text-micro uppercase tracking-[0.12em] text-muted">{copy.labels.outcome[locale]}</p>
                  <p className="mt-2 text-base font-semibold leading-relaxed text-ink">{active.outcome[locale]}</p>
                </div>
                <div>
                  <p className="font-mono text-micro uppercase tracking-[0.12em] text-muted">{copy.labels.loop[locale]}</p>
                  <ol className="mt-3 grid gap-2">
                    {copy.loop[locale].map((step, index) => (
                      <li key={step} className="flex items-center gap-3 text-ui text-muted">
                        <span className="font-mono text-micro text-brand-text">{String(index + 1).padStart(2, "0")}</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className="mt-7 overflow-hidden rounded-[1.1rem] border border-hairline bg-raised">
                <img
                  src={group === "manufacturing" || group === "textile" || group === "plastics"
                    ? "/product-concepts/dima-full-brain.webp"
                    : "/product-concepts/dima-command-center.webp"}
                  alt=""
                  width={1536}
                  height={1024}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[16/7] w-full object-cover object-top"
                />
              </div>
            </div>
          </aside>
        </div>
      </Stack>
    </Section>
  );
}
