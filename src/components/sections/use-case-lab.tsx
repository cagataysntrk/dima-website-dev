"use client";

import * as React from "react";
import {
  BriefcaseBusiness,
  CircleDollarSign,
  Factory,
  FileSearch,
  PackageSearch,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Heading, Section, Stack, Text } from "@upcytech/ui";

import type { Locale } from "@/i18n/routing";
import { useCaseLab, type UseCaseId } from "@/content/use-case-lab";
import { AnimatedBackground } from "@/components/vendor/motion-primitives/animated-background";

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
    }, 6200);
    return () => window.clearInterval(timer);
  }, [manual, reduced, c.cases]);

  return (
    <Section width="wide" responsive aria-labelledby="use-case-lab-title" className="py-20! sm:py-24! lg:py-28!">
      <Stack gap="loose">
        <div className="grid gap-5 lg:grid-cols-12 lg:items-end">
          <Stack gap="tight" className="lg:col-span-8">
            <Text variant="eyebrow">{c.eyebrow[locale]}</Text>
            <Heading level={2} variant="title" id="use-case-lab-title">{c.title[locale]}</Heading>
          </Stack>
          <p className="max-w-xl text-ui leading-relaxed text-muted lg:col-span-4 lg:justify-self-end lg:text-right">
            {c.visualNote[locale]}
          </p>
        </div>

        <div className="overflow-hidden rounded-[1.35rem] border border-outline bg-surface shadow-xl">
          <div className="border-b border-hairline px-3 py-2 sm:px-4">
            <div className="flex snap-x snap-mandatory gap-1 overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <AnimatedBackground
                defaultValue={active.id}
                onValueChange={(id) => {
                  if (!id) return;
                  setActiveId(id as UseCaseId);
                  setManual(true);
                }}
                className="rounded-button bg-ink"
                transition={{ type: "spring", stiffness: 380, damping: 36 }}
              >
                {c.cases.map((item) => {
                  const Icon = ICONS[item.id];
                  return (
                    <button
                      key={item.id}
                      data-id={item.id}
                      type="button"
                      aria-pressed={item.id === active.id}
                      className="min-w-max snap-start rounded-button px-3 py-2.5 text-ink transition-colors data-[checked=true]:text-canvas"
                    >
                      <span className="flex items-center gap-2">
                        <Icon aria-hidden="true" className="size-4" />
                        <span className="text-ui font-semibold">{item.layer[locale]}</span>
                      </span>
                    </button>
                  );
                })}
              </AnimatedBackground>
            </div>
          </div>

          <div className="grid lg:grid-cols-[minmax(0,1.45fr)_minmax(21rem,0.55fr)]">
            <div className="relative min-h-[24rem] overflow-hidden border-b border-hairline bg-raised sm:min-h-[30rem] lg:min-h-[40rem] lg:border-b-0 lg:border-r">
              <img
                src="/product-concepts/dima-command-center.webp"
                alt=""
                width={1536}
                height={1024}
                className="absolute inset-0 size-full object-cover object-top"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,transparent_48%,color-mix(in_oklab,var(--color-bg-canvas)_82%,transparent)_100%)]" />

              <div className="absolute inset-x-3 bottom-3 sm:inset-x-6 sm:bottom-6">
                <div className="max-w-xl rounded-[1rem] border border-hairline bg-surface/95 p-3.5 shadow-xl backdrop-blur-xl sm:rounded-[1.1rem] sm:p-5">
                  <p className="font-mono text-micro uppercase tracking-[0.12em] text-brand-text">{c.visualLabels.signal[locale]}</p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-ink">{active.title[locale]}</h3>
                  <p className="mt-2 text-ui leading-relaxed text-muted">{active.detects[locale]}</p>
                </div>
              </div>
            </div>

            <aside className="flex min-h-0 flex-col p-4 sm:p-6 lg:min-h-[40rem] lg:p-7">
              <div>
                <p className="font-mono text-micro uppercase tracking-[0.12em] text-brand-text">{active.layer[locale]}</p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-ink sm:text-2xl">{active.title[locale]}</h3>
                <p className="mt-3 text-ui leading-relaxed text-muted">{active.problem[locale]}</p>
              </div>

              <div className="mt-5 border-t border-hairline pt-4 sm:mt-7 sm:pt-5">
                <div className="flex items-center gap-2">
                  <FileSearch aria-hidden="true" className="size-4 text-brand-text" />
                  <p className="text-ui font-semibold text-ink">{c.visualLabels.reason[locale]}</p>
                </div>
                <p className="mt-2 text-ui leading-relaxed text-muted">{active.investigates[locale]}</p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {active.data[locale].map((item) => (
                    <span key={item} className="rounded-chip border border-hairline bg-raised px-2.5 py-1 text-micro text-muted">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 border-t border-hairline pt-4 lg:mt-auto lg:pt-5">
                <div className="flex items-center gap-2">
                  <Sparkles aria-hidden="true" className="size-4 text-brand-text" />
                  <p className="text-ui font-semibold text-ink">{c.visualLabels.decision[locale]}</p>
                </div>
                <p className="mt-2 text-ui leading-relaxed text-muted">{active.recommends[locale]}</p>
                <div className="mt-4 rounded-control bg-ink p-4 text-canvas">
                  <p className="text-micro opacity-55">{c.labels.result[locale]}</p>
                  <p className="mt-1 text-ui font-semibold leading-snug">{active.result[locale]}</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </Stack>
    </Section>
  );
}
