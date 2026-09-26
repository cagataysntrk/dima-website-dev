"use client";

import * as React from "react";
import { Banknote, BriefcaseBusiness, Factory, ListChecks, type LucideIcon } from "lucide-react";
import { Heading, Section, Stack, Text } from "@upcytech/ui";

import type { Locale } from "@/i18n/routing";
import { businessValue, type BusinessLensId } from "@/content/business-value";
import { AnimatedBackground } from "@/components/vendor/motion-primitives/animated-background";

const ICONS: Record<BusinessLensId, LucideIcon> = {
  executive: BriefcaseBusiness,
  finance: Banknote,
  operations: Factory,
  teams: ListChecks,
};

const IMPACT_INDEX: Record<BusinessLensId, number> = {
  executive: 3,
  finance: 2,
  operations: 0,
  teams: 1,
};

export function BusinessValueMap({ locale }: { locale: Locale }) {
  const [activeId, setActiveId] = React.useState<BusinessLensId>("executive");
  const active = businessValue.roles.find((item) => item.id === activeId) ?? businessValue.roles[0];
  const activeImpact = IMPACT_INDEX[active.id];

  return (
    <Section width="wide" responsive aria-labelledby="business-value-title" className="py-20! sm:py-24! lg:py-28!">
      <Stack gap="loose">
        <div className="grid gap-5 lg:grid-cols-12 lg:items-end">
          <Stack gap="tight" className="lg:col-span-8">
            <Text variant="eyebrow">{businessValue.eyebrow[locale]}</Text>
            <Heading level={2} variant="title" id="business-value-title">{businessValue.title[locale]}</Heading>
          </Stack>
          <p className="max-w-xl text-ui leading-relaxed text-muted lg:col-span-4 lg:justify-self-end lg:text-right">
            {businessValue.intro[locale]}
          </p>
        </div>

        <div className="overflow-hidden rounded-[1.35rem] border border-outline bg-surface shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline px-4 py-3 sm:px-6">
            <div>
              <p className="font-mono text-micro uppercase tracking-[0.12em] text-brand-text">{businessValue.example.label[locale]}</p>
              <p className="mt-1 text-base font-semibold text-ink">{businessValue.example.signal[locale]}</p>
            </div>
            <span className="rounded-button bg-ink px-3 py-2 text-micro font-semibold text-canvas">
              {active.output[locale]}
            </span>
          </div>

          <div className="grid lg:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.65fr)]">
            <div className="border-b border-hairline lg:border-b-0 lg:border-r">
              <div className="grid grid-cols-[minmax(7rem,0.55fr)_minmax(0,1.45fr)] border-b border-hairline bg-raised px-4 py-2.5 text-micro text-muted sm:px-6">
                <span>{businessValue.example.label[locale]}</span>
                <span>{active.title[locale]}</span>
              </div>

              <div>
                {businessValue.example.nodes.map((node, index) => {
                  const highlighted = index === activeImpact;
                  return (
                    <div
                      key={node.label.en}
                      className={[
                        "grid min-h-20 grid-cols-[minmax(7rem,0.55fr)_minmax(0,1.45fr)] items-center border-b border-hairline px-4 py-4 last:border-b-0 sm:px-6",
                        highlighted ? "bg-[color-mix(in_oklab,var(--color-text-brand)_5%,var(--color-bg-surface))]" : "bg-surface",
                      ].join(" ")}
                    >
                      <span className="flex items-center gap-2 text-ui font-semibold text-ink">
                        <span className={["size-2 rounded-full", highlighted ? "bg-brand" : "bg-outline"].join(" ")} />
                        {node.label[locale]}
                      </span>
                      <span className={["text-ui", highlighted ? "font-semibold text-ink" : "text-muted"].join(" ")}>
                        {node.value[locale]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <aside className="p-4 sm:p-6">
              <div className="flex gap-1 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible">
                <AnimatedBackground
                  defaultValue={active.id}
                  onValueChange={(id) => {
                    if (id) setActiveId(id as BusinessLensId);
                  }}
                  className="rounded-[0.9rem] bg-ink"
                  transition={{ type: "spring", stiffness: 380, damping: 36 }}
                >
                  {businessValue.roles.map((role) => {
                    const Icon = ICONS[role.id];
                    return (
                      <button
                        key={role.id}
                        data-id={role.id}
                        type="button"
                        aria-pressed={role.id === active.id}
                        className="min-w-[12rem] rounded-[0.9rem] px-3 py-3 text-left text-ink transition-colors data-[checked=true]:text-canvas lg:min-w-0"
                      >
                        <span className="flex items-start gap-3">
                          <Icon aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                          <span>
                            <span className="block text-micro opacity-55">{role.label[locale]}</span>
                            <span className="mt-0.5 block text-ui font-semibold leading-snug">{role.title[locale]}</span>
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </AnimatedBackground>
              </div>

              <div className="mt-5 border-t border-hairline pt-5">
                <p className="text-ui leading-relaxed text-muted">{active.body[locale]}</p>
                <p className="mt-4 text-ui font-semibold leading-snug text-ink">{active.output[locale]}</p>
              </div>
            </aside>
          </div>
        </div>
      </Stack>
    </Section>
  );
}
