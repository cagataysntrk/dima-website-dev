"use client";

import * as React from "react";
import { Banknote, BriefcaseBusiness, Factory, ListChecks, type LucideIcon } from "lucide-react";
import { Heading, Section, Stack, Text } from "@upcytech/ui";

import type { Locale } from "@/i18n/routing";
import { businessValue, type BusinessLensId } from "@/content/business-value";

const ICONS: Record<BusinessLensId, LucideIcon> = {
  executive: BriefcaseBusiness,
  finance: Banknote,
  operations: Factory,
  teams: ListChecks,
};

const NODE_POSITIONS = [
  ["8%", "16%"],
  ["62%", "10%"],
  ["68%", "66%"],
  ["8%", "68%"],
] as const;

export function BusinessValueMap({ locale }: { locale: Locale }) {
  const [activeId, setActiveId] = React.useState<BusinessLensId>("executive");
  const active = businessValue.roles.find((item) => item.id === activeId) ?? businessValue.roles[0];

  return (
    <Section divided aria-labelledby="business-value-title">
      <Stack gap="loose">
        <Stack gap="tight" className="max-w-4xl">
          <Text variant="eyebrow">{businessValue.eyebrow[locale]}</Text>
          <Heading level={2} variant="title" id="business-value-title">{businessValue.title[locale]}</Heading>
          <Text tone="muted">{businessValue.intro[locale]}</Text>
        </Stack>

        <div className="grid overflow-hidden rounded-[1.75rem] border border-outline bg-surface shadow-sm lg:grid-cols-[0.72fr_1.28fr]">
          <div className="border-b border-hairline p-4 sm:p-5 lg:border-b-0 lg:border-r">
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              {businessValue.roles.map((role) => {
                const Icon = ICONS[role.id];
                const selected = role.id === active.id;
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setActiveId(role.id)}
                    aria-pressed={selected}
                    className={[
                      "rounded-card border p-4 text-left transition",
                      selected
                        ? "border-brand-text/35 bg-[color-mix(in_oklab,var(--color-text-brand)_6%,var(--color-bg-surface))] shadow-sm"
                        : "border-hairline bg-surface hoverable:hover:border-outline",
                    ].join(" ")}
                  >
                    <span className="flex items-center gap-3">
                      <span className={["grid size-9 place-items-center rounded-control", selected ? "bg-brand text-white" : "bg-raised text-brand-text"].join(" ")}>
                        <Icon aria-hidden="true" className="size-5" />
                      </span>
                      <span>
                        <span className="block text-micro font-medium text-muted">{role.label[locale]}</span>
                        <span className="mt-0.5 block text-ui font-semibold text-ink">{role.title[locale]}</span>
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 rounded-card border border-hairline bg-raised p-4">
              <p className="text-ui leading-relaxed text-muted">{active.body[locale]}</p>
              <p className="mt-3 text-ui font-semibold text-ink">{active.output[locale]}</p>
            </div>
          </div>

          <div className="relative min-h-0 overflow-hidden p-5 sm:min-h-[31rem] sm:p-7">
            <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,color-mix(in_oklab,var(--color-text-brand)_10%,transparent),transparent_50%)]" />
            <p className="relative z-10 font-mono text-micro uppercase tracking-[0.12em] text-brand-text">{businessValue.example.label[locale]}</p>

            <div className="relative z-10 mt-4 grid gap-2 sm:hidden">
              <div className="rounded-card border border-brand-text/35 bg-surface p-4 shadow-sm">
                <p className="text-base font-semibold leading-snug text-ink">{businessValue.example.signal[locale]}</p>
              </div>
              {businessValue.example.nodes.map((node) => (
                <div key={node.label.en} className="rounded-card border border-hairline bg-raised p-3">
                  <p className="text-micro text-muted">{node.label[locale]}</p>
                  <p className="mt-1 text-ui font-semibold text-ink">{node.value[locale]}</p>
                </div>
              ))}
            </div>

            <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 hidden size-full text-brand-text/25 sm:block">
              {NODE_POSITIONS.map(([x, y], index) => {
                const x2 = Number.parseFloat(x) + 13;
                const y2 = Number.parseFloat(y) + 10;
                return <path key={index} d={`M 50 50 C 50 50, ${x2} ${y2}, ${x2} ${y2}`} fill="none" stroke="currentColor" strokeWidth="0.4" strokeDasharray="2 2" vectorEffect="non-scaling-stroke" />;
              })}
            </svg>

            <div className="absolute left-1/2 top-1/2 z-20 hidden w-[15rem] -translate-x-1/2 -translate-y-1/2 rounded-[1.4rem] border border-brand-text/35 bg-surface p-5 text-center shadow-xl sm:block">
              <span aria-hidden="true" className="mx-auto mb-3 flex size-3 rounded-full bg-brand motion-safe:animate-pulse" />
              <p className="text-base font-semibold leading-snug text-ink">{businessValue.example.signal[locale]}</p>
            </div>

            {businessValue.example.nodes.map((node, index) => {
              const [left, top] = NODE_POSITIONS[index]!;
              return (
                <div
                  key={node.label.en}
                  className="absolute z-10 hidden w-[12rem] rounded-card border border-hairline bg-surface/95 p-3 shadow-sm backdrop-blur-sm sm:block sm:w-[13.5rem]"
                  style={{ left, top }}
                >
                  <p className="text-micro font-medium text-muted">{node.label[locale]}</p>
                  <p className="mt-1 text-ui font-semibold leading-snug text-ink">{node.value[locale]}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Stack>
    </Section>
  );
}
