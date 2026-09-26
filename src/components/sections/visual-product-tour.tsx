"use client";

import * as React from "react";
import {
  ArrowRight,
  Building2,
  Check,
  Database,
  Factory,
  FileSpreadsheet,
  Layers3,
  MessageSquare,
  Pause,
  Play,
  Radar,
  Sparkles,
  Waypoints,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Heading, Section, Stack, Text } from "@upcytech/ui";

import type { Locale } from "@/i18n/routing";
import { productTour, type ProductTourStageId } from "@/content/product-tour";
import { chatDemoFor } from "@/content/dima-demo";
import { products } from "@/content/products";
import { ChatDemo } from "@/components/sections/chat-demo/chat-demo";
import { AnimatedBackground } from "@/components/vendor/motion-primitives/animated-background";

const STAGE_ICON: Record<ProductTourStageId, LucideIcon> = {
  auth: Sparkles,
  connect: Database,
  model: Waypoints,
  dashboard: Layers3,
  chat: MessageSquare,
  watch: Radar,
};

const DOMAIN_POSITIONS = [
  ["20%", "24%"],
  ["50%", "16%"],
  ["78%", "26%"],
  ["82%", "60%"],
  ["63%", "78%"],
  ["37%", "78%"],
  ["16%", "59%"],
  ["50%", "50%"],
] as const;

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

export function ProductHeroPreview({ locale }: { locale: Locale }) {
  const c = productTour.heroPreview;

  return (
    <div role="img" aria-label={c.imageAlt[locale]} className="relative -mx-3 w-auto sm:mx-0 sm:w-full">
      <div className="overflow-hidden rounded-[1.05rem] border border-outline bg-surface shadow-xl sm:rounded-[1.35rem] sm:shadow-2xl">
        <div className="flex min-h-10 items-center gap-1.5 border-b border-hairline bg-surface px-3 sm:min-h-11 sm:gap-2 sm:px-4">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-outline sm:size-2" />
          <span aria-hidden="true" className="size-1.5 rounded-full bg-outline sm:size-2" />
          <span aria-hidden="true" className="size-1.5 rounded-full bg-outline sm:size-2" />
          <span className="ml-1 hidden font-mono text-micro uppercase tracking-[0.12em] text-muted sm:inline">{c.sample[locale]}</span>
          <span className="ml-auto inline-flex items-center gap-1.5 text-[0.66rem] font-medium text-muted sm:gap-2 sm:text-micro">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-positive sm:size-2" />
            {c.monitoring[locale]}
          </span>
        </div>

        <div className="relative">
          <img
            src="/product-concepts/dima-full-brain.webp"
            alt=""
            width={1536}
            height={1024}
            fetchPriority="high"
            className="aspect-[4/3] w-full object-cover object-top sm:aspect-[16/10]"
          />

          <div className="hidden sm:absolute sm:bottom-5 sm:right-5 sm:block sm:max-w-[18rem] sm:rounded-[1rem] sm:border sm:border-hairline sm:bg-surface/95 sm:p-3 sm:shadow-lg sm:backdrop-blur-md">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-brand-text">{c.signalMeta[locale]}</p>
            <p className="mt-1 text-ui font-semibold leading-snug text-ink">{c.signal[locale]}</p>
          </div>
        </div>

        <div className="border-t border-hairline bg-surface p-3 sm:hidden">
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.11em] text-brand-text">{c.signalMeta[locale]}</p>
          <p className="mt-1 text-sm font-semibold leading-snug text-ink">{c.signal[locale]}</p>
        </div>
      </div>
    </div>
  );
}

export function VisualProductTour({ locale }: { locale: Locale }) {
  const c = productTour;
  const reduced = useReducedMotion();
  const [activeId, setActiveId] = React.useState<ProductTourStageId>("auth");
  const [paused, setPaused] = React.useState(false);
  const activeIndex = c.stages.findIndex((stage) => stage.id === activeId);
  const active = c.stages[activeIndex] ?? c.stages[0];

  React.useEffect(() => {
    if (paused || reduced) return;
    const timer = window.setInterval(() => {
      setActiveId((current) => {
        const index = c.stages.findIndex((stage) => stage.id === current);
        return c.stages[(index + 1) % c.stages.length]!.id;
      });
    }, 6200);
    return () => window.clearInterval(timer);
  }, [paused, reduced, c.stages]);

  const choose = (id: ProductTourStageId) => {
    setActiveId(id);
    setPaused(true);
  };

  return (
    <Section width="wide" responsive aria-labelledby="visual-product-tour-title" className="py-20! sm:py-24! lg:py-28!">
      <Stack gap="loose">
        <div className="grid gap-5 lg:grid-cols-12 lg:items-end">
          <Stack gap="tight" className="lg:col-span-8">
            <Text variant="eyebrow">{c.eyebrow[locale]}</Text>
            <Heading level={2} variant="title" id="visual-product-tour-title">{c.title[locale]}</Heading>
          </Stack>
          <div className="flex items-center gap-3 lg:col-span-4 lg:justify-self-end">
            <span className="hidden max-w-52 text-right font-mono text-micro uppercase tracking-[0.12em] text-muted sm:block">{c.note[locale]}</span>
            <button
              type="button"
              onClick={() => setPaused((value) => !value)}
              aria-label={(paused ? c.auto.resume : c.auto.pause)[locale]}
              className="inline-flex min-h-11 items-center gap-2 rounded-button border border-hairline bg-surface px-3 text-ui font-medium text-muted transition hoverable:hover:text-ink"
            >
              {paused ? <Play aria-hidden="true" className="size-4" /> : <Pause aria-hidden="true" className="size-4" />}
              <span>{(paused ? c.auto.resume : c.auto.pause)[locale]}</span>
            </button>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[17rem_minmax(0,1fr)] xl:gap-7">
          <div className="lg:pt-3">
            <div role="tablist" aria-label={c.title[locale]} className="flex snap-x snap-mandatory gap-2 overflow-x-auto overscroll-x-contain pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:flex-col lg:overflow-visible lg:pb-0">
              <AnimatedBackground
                defaultValue={active.id}
                onValueChange={(id) => {
                  if (id) choose(id as ProductTourStageId);
                }}
                className="rounded-[0.9rem] bg-ink shadow-sm"
                transition={{ type: "spring", stiffness: 360, damping: 34 }}
              >
                {c.stages.map((stage) => {
                  const Icon = STAGE_ICON[stage.id];
                  return (
                    <button
                      key={stage.id}
                      data-id={stage.id}
                      type="button"
                      role="tab"
                      aria-selected={stage.id === active.id}
                      className="min-w-[11.25rem] snap-start rounded-[0.9rem] px-3 py-3 text-left text-ink transition-colors data-[checked=true]:text-canvas sm:min-w-[12.5rem] lg:min-w-0"
                    >
                      <span className="flex items-start gap-3">
                        <span className="grid size-8 shrink-0 place-items-center rounded-control border border-current/15">
                          <Icon aria-hidden="true" className="size-4" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-ui font-semibold">{stage.tab[locale]}</span>
                          <span className="mt-0.5 block truncate font-mono text-[0.62rem] uppercase tracking-[0.11em] opacity-60">
                            {stage.step} · {stage.meta[locale]}
                          </span>
                        </span>
                      </span>
                    </button>
                  );
                })}
              </AnimatedBackground>
            </div>

            <div className="mt-5 hidden border-t border-hairline pt-4 lg:block">
              <p className="text-ui font-semibold text-ink">{active.title[locale]}</p>
              <p className="mt-2 text-ui leading-relaxed text-muted">{active.caption[locale]}</p>
              <div className="mt-5 flex gap-1.5">
                {c.stages.map((stage, index) => (
                  <button
                    key={stage.id}
                    type="button"
                    aria-label={stage.tab[locale]}
                    onClick={() => choose(stage.id)}
                    className={["h-1 flex-1 rounded-full transition-colors", index <= activeIndex ? "bg-brand" : "bg-hairline"].join(" ")}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="min-w-0 overflow-hidden rounded-[1.35rem] border border-outline bg-surface shadow-2xl">
            <div className="flex min-h-12 items-center border-b border-hairline px-4 sm:px-5">
              <span aria-hidden="true" className="size-2 rounded-full bg-outline" />
              <span aria-hidden="true" className="ml-1.5 size-2 rounded-full bg-outline" />
              <span aria-hidden="true" className="ml-1.5 size-2 rounded-full bg-outline" />
              <div className="ml-4 min-w-0">
                <p className="truncate text-ui font-semibold text-ink">{active.title[locale]}</p>
              </div>
              <span className="ml-auto hidden text-micro text-muted sm:inline">{c.auto.running[locale]}</span>
            </div>

            <div className="border-b border-hairline px-4 py-3 lg:hidden">
              <p className="text-ui leading-relaxed text-muted">{active.caption[locale]}</p>
            </div>

            <div className="relative min-h-[30rem] overflow-hidden bg-canvas sm:min-h-[36rem] lg:min-h-[40rem] xl:min-h-[43rem]">
              <div key={active.id} className="dima-tour-scene min-h-[30rem] sm:min-h-[36rem] lg:min-h-[40rem] xl:min-h-[43rem]">
                <TourScene id={active.id} locale={locale} />
              </div>
            </div>
          </div>
        </div>
      </Stack>
    </Section>
  );
}

function TourScene({ id, locale }: { id: ProductTourStageId; locale: Locale }) {
  if (id === "auth") return <AuthScene locale={locale} />;
  if (id === "connect") return <ConnectScene locale={locale} />;
  if (id === "model") return <ModelScene locale={locale} />;
  if (id === "dashboard") return <DashboardScene locale={locale} />;
  if (id === "chat") return <ChatScene locale={locale} />;
  return <WatchScene locale={locale} />;
}

function AuthScene({ locale }: { locale: Locale }) {
  const c = productTour.auth;
  const product = products[0]!;
  return (
    <div className="grid min-h-[28rem] place-items-center p-4 sm:min-h-[34rem] sm:p-8">
      <div className="w-full max-w-xl rounded-[1.25rem] border border-outline bg-surface p-4 shadow-xl sm:rounded-[1.75rem] sm:p-7">
        <div className="flex items-center gap-3">
          <img src="/products/dima-mark.png" alt="" width={36} height={36} className="dima-logo-mark size-8 sm:size-9" />
          <div className="min-w-0">
            <p className="text-base font-semibold text-ink sm:text-lg">{product.name}</p>
            <p className="truncate text-micro text-muted">{c.title[locale]}</p>
          </div>
        </div>

        <div className="mt-5 rounded-button border border-hairline bg-canvas px-3 py-3 text-center text-ui font-medium text-ink shadow-sm sm:mt-6 sm:px-4">
          <span className="mr-2 inline-grid size-6 place-items-center rounded-full bg-surface font-semibold text-brand-text shadow-sm">G</span>
          {c.google[locale]}
        </div>

        <div className="my-4 flex items-center gap-3 sm:my-5">
          <span className="h-px flex-1 bg-hairline" />
          <span className="text-micro text-muted">{product.name}</span>
          <span className="h-px flex-1 bg-hairline" />
        </div>

        <div className="grid gap-2.5 min-[380px]:grid-cols-2 sm:gap-3">
          <div className="relative overflow-hidden rounded-card border border-brand-text/35 bg-[color-mix(in_oklab,var(--color-text-brand)_7%,var(--color-bg-surface))] p-3.5 sm:p-4">
            <span aria-hidden="true" className="absolute -right-5 -top-5 size-20 rounded-full bg-brand/10 blur-xl" />
            <Database aria-hidden="true" className="size-5 text-brand-text" />
            <p className="mt-3 text-ui font-semibold text-ink sm:mt-4">{c.own[locale]}</p>
            <ArrowRight aria-hidden="true" className="mt-2.5 size-4 text-brand-text sm:mt-3" />
          </div>
          <div className="rounded-card border border-hairline bg-raised p-3.5 sm:p-4">
            <Building2 aria-hidden="true" className="size-5 text-brand-text" />
            <p className="mt-3 text-ui font-semibold text-ink sm:mt-4">{c.sample[locale]}</p>
            <ArrowRight aria-hidden="true" className="mt-2.5 size-4 text-muted sm:mt-3" />
          </div>
        </div>
        <p className="mt-4 text-center text-micro leading-relaxed text-muted sm:mt-5">{c.disclaimer[locale]}</p>
      </div>
    </div>
  );
}

function ConnectScene({ locale }: { locale: Locale }) {
  const c = productTour.connect;
  const icons: LucideIcon[] = [Database, Building2, FileSpreadsheet, Database, Factory, Zap];

  return (
    <div className="min-h-[30rem] p-4 sm:min-h-[34rem] sm:p-6 lg:grid lg:grid-cols-[1fr_0.85fr] lg:gap-5 lg:p-8">
      <div className="sm:hidden">
        <div className="rounded-[1.15rem] border border-hairline bg-surface p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="font-mono text-micro uppercase tracking-[0.12em] text-muted">{c.setupLabel[locale]}</p>
            <img src="/products/dima-mark.png" alt="" width={28} height={28} className="dima-logo-mark size-7" />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {c.sources.map((source, index) => {
              const Icon = icons[index] ?? Database;
              return (
                <div key={source} className="flex min-h-12 items-center gap-2 rounded-control border border-hairline bg-raised px-2.5 py-2">
                  <span className="grid size-7 shrink-0 place-items-center rounded-control bg-surface text-brand-text">
                    <Icon aria-hidden="true" className="size-3.5" />
                  </span>
                  <span className="min-w-0 truncate text-micro font-medium text-ink">{source}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-4 border-t border-hairline pt-4">
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-muted">{c.contextLabel[locale]}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {c.entities[locale].map((item) => (
                <span key={item} className="rounded-chip border border-hairline bg-canvas px-2 py-1 text-micro text-muted">{item}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-3 rounded-[1.15rem] border border-hairline bg-surface p-4">
          <div className="space-y-2">
            {c.checks[locale].map((item, index) => (
              <div key={item} className="flex items-center gap-2.5 text-ui text-ink">
                <span className={[
                  "grid size-6 shrink-0 place-items-center rounded-full",
                  index < 3 ? "bg-[color-mix(in_oklab,var(--color-text-brand)_12%,transparent)] text-brand-text" : "bg-raised text-muted",
                ].join(" ")}>
                  {index < 3 ? <Check aria-hidden="true" className="size-3.5" /> : <span className="size-1.5 rounded-full bg-brand" />}
                </span>
                <span className="leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative hidden min-h-[24rem] overflow-hidden rounded-[1.5rem] border border-hairline bg-surface sm:block">
        <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full text-brand-text/25">
          {[18, 31, 44, 57, 70, 83].map((y) => (
            <path key={y} d={`M 15 ${y} C 32 ${y}, 35 50, 50 50`} fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" vectorEffect="non-scaling-stroke" />
          ))}
        </svg>
        <div className="absolute left-1/2 top-1/2 z-10 grid size-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-brand-text/30 bg-surface shadow-xl">
          <img src="/products/dima-mark.png" alt="" width={36} height={36} className="dima-logo-mark relative size-9" />
        </div>
        <div className="absolute inset-y-0 left-4 flex w-[42%] flex-col justify-center gap-2 sm:left-6">
          {c.sources.map((source, index) => {
            const Icon = icons[index] ?? Database;
            return (
              <div key={source} className="flex items-center gap-2 rounded-control border border-hairline bg-surface/95 px-3 py-2 shadow-sm backdrop-blur-sm">
                <span className="grid size-7 place-items-center rounded-control bg-raised text-brand-text"><Icon aria-hidden="true" className="size-3.5" /></span>
                <span className="truncate text-micro font-medium text-ink">{source}</span>
                <span className="ml-auto size-1.5 rounded-full bg-brand" />
              </div>
            );
          })}
        </div>
        <div className="absolute bottom-4 right-4 top-4 w-[28%] rounded-card border border-hairline bg-raised/90 p-3 backdrop-blur-sm sm:right-6 sm:w-[30%]">
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-muted">{c.contextLabel[locale]}</p>
          <div className="mt-3 space-y-2">
            {c.entities[locale].map((item, index) => (
              <div key={item} className="flex items-center gap-2 text-micro text-ink">
                <span className="size-1.5 rounded-full bg-brand" style={{ opacity: 1 - index * 0.12 }} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 hidden flex-col justify-center rounded-[1.5rem] border border-hairline bg-surface p-5 sm:flex sm:p-6 lg:mt-0">
        <p className="font-mono text-micro uppercase tracking-[0.12em] text-muted">{c.setupLabel[locale]}</p>
        <div className="mt-5 space-y-3">
          {c.checks[locale].map((item, index) => (
            <div key={item} className="flex items-center gap-3 rounded-control border border-hairline bg-raised px-3 py-3">
              <span className={[
                "grid size-7 place-items-center rounded-full",
                index < 3 ? "bg-[color-mix(in_oklab,var(--color-text-brand)_12%,transparent)] text-brand-text" : "bg-surface text-muted",
              ].join(" ")}>
                {index < 3 ? <Check aria-hidden="true" className="size-4" /> : <span className="size-2 rounded-full bg-brand" />}
              </span>
              <span className="text-ui font-medium text-ink">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ModelScene({ locale }: { locale: Locale }) {
  const c = productTour.model;
  return (
    <div className="relative min-h-[30rem] overflow-hidden p-4 sm:min-h-[34rem] sm:p-8">
      <div className="sm:hidden">
        <div className="rounded-[1.15rem] border border-outline bg-surface p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-full border border-brand-text/30 bg-raised">
              <img src="/products/dima-mark.png" alt="" width={28} height={28} className="dima-logo-mark size-7" />
            </span>
            <div>
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-brand-text">{c.company[locale]}</p>
              <p className="mt-1 text-base font-semibold text-ink">{c.heading[locale]}</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {c.domains[locale].map((domain, index) => (
              <div key={domain} className="flex min-h-12 items-center gap-2 rounded-control border border-hairline bg-raised px-3 py-2.5">
                <span className={["size-2 shrink-0 rounded-full", index < 3 ? "bg-brand" : "bg-outline"].join(" ")} />
                <span className="text-micro font-semibold leading-snug text-ink">{domain}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="hidden sm:block">
        <p className="absolute left-1/2 top-7 z-20 -translate-x-1/2 whitespace-nowrap rounded-button border border-hairline bg-surface/90 px-4 py-2 text-ui font-semibold text-ink shadow-sm backdrop-blur-sm">
          {c.heading[locale]}
        </p>
        <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full text-outline">
          {DOMAIN_POSITIONS.slice(0, 7).map(([x, y], index) => (
            <line key={index} x1="50" y1="50" x2={Number.parseFloat(x)} y2={Number.parseFloat(y)} stroke="currentColor" strokeWidth="0.35" strokeDasharray="2 2" vectorEffect="non-scaling-stroke" />
          ))}
        </svg>
        <div className="absolute left-1/2 top-1/2 z-10 grid size-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-brand-text/35 bg-surface shadow-xl">
          <span aria-hidden="true" className="absolute inset-2 rounded-full border border-brand-text/15" />
          <div className="text-center">
            <img src="/products/dima-mark.png" alt="" width={34} height={34} className="dima-logo-mark mx-auto size-8" />
            <p className="mt-1 text-micro font-semibold text-ink">{c.company[locale]}</p>
          </div>
        </div>
        {c.domains[locale].map((domain, index) => {
          const [x, y] = DOMAIN_POSITIONS[index]!;
          return (
            <div
              key={domain}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-card border border-hairline bg-surface/95 px-3 py-2.5 shadow-sm backdrop-blur-sm"
              style={{ left: x, top: y }}
            >
              <span className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-brand" />
                <span className="text-micro font-semibold text-ink sm:text-ui">{domain}</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DashboardScene({ locale }: { locale: Locale }) {
  return (
    <div className="relative min-h-[30rem] overflow-hidden bg-raised sm:min-h-[34rem]">
      <img
        src="/products/dima-mobile.webp"
        alt={productTour.dashboard.imageAlt[locale]}
        width={1080}
        height={2337}
        className="absolute inset-0 size-full object-cover object-top sm:hidden"
      />
      <img
        src="/product-concepts/dima-command-center.webp"
        alt=""
        width={1536}
        height={1024}
        className="absolute inset-0 hidden size-full object-cover object-top sm:block"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-canvas/80 via-transparent to-transparent" />
      <div className="absolute bottom-4 left-4 right-4 flex flex-col items-start gap-2 sm:bottom-7 sm:left-7 sm:right-7 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-3">
        <span className="rounded-button border border-white/25 bg-black/60 px-3 py-2 text-micro font-medium text-white backdrop-blur-md">
          {productTour.dashboard.ready[locale]}
        </span>
        <span className="max-w-full rounded-button border border-white/25 bg-white/90 px-3 py-2 text-micro font-medium leading-snug text-ink backdrop-blur-md">
          {productTour.dashboard.summary[locale]}
        </span>
      </div>
    </div>
  );
}

function ChatScene({ locale }: { locale: Locale }) {
  const product = products[0]!;
  return (
    <div className="p-3 sm:p-5">
      <ChatDemo
        copy={chatDemoFor(locale)}
        locale={locale}
        product={{ name: product.name, brandKey: product.brandKey }}
      />
    </div>
  );
}

function WatchScene({ locale }: { locale: Locale }) {
  const c = productTour.watch;
  return (
    <div className="relative min-h-[30rem] overflow-hidden sm:min-h-[34rem]">
      <img
        src="/product-concepts/dima-full-brain.webp"
        alt=""
        width={1536}
        height={1024}
        className="absolute inset-0 size-full object-cover object-top opacity-55"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,var(--color-bg-canvas)_8%,color-mix(in_oklab,var(--color-bg-canvas)_68%,transparent)_45%,var(--color-bg-canvas)_94%)]" />

      <div className="relative z-10 grid min-h-[30rem] gap-4 p-4 sm:min-h-[34rem] sm:gap-5 sm:p-6 lg:grid-cols-[0.85fr_1.15fr] lg:p-8">
        <div className="flex flex-col justify-center">
          <span className="inline-flex w-fit items-center gap-2 rounded-button border border-brand-text/30 bg-surface/90 px-3 py-2 text-micro font-semibold text-brand-text shadow-sm backdrop-blur-sm">
            <span aria-hidden="true" className="relative flex size-2">
              <span className="absolute inline-flex size-full motion-safe:animate-ping rounded-full bg-brand opacity-35" />
              <span className="relative inline-flex size-2 rounded-full bg-brand" />
            </span>
            {c.badge[locale]}
          </span>
          <div className="mt-4 max-w-md rounded-[1.2rem] border border-outline bg-surface/95 p-4 shadow-xl backdrop-blur-md sm:rounded-[1.5rem] sm:p-5">
            <p className="font-mono text-micro uppercase tracking-[0.12em] text-brand-text">{c.signal[locale]}</p>
            <p className="mt-2 text-xl font-semibold tracking-tight text-ink">{c.signalTitle[locale]}</p>
            <p className="mt-2 text-ui text-muted">{c.impact[locale]}</p>
            <div className="mt-5 flex items-center gap-2">
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-raised">
                <span className="dima-watch-scan block h-full w-2/3 rounded-full bg-brand" />
              </span>
              <span className="font-mono text-micro text-muted">{c.monitoring[locale]}</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {c.loop[locale].map((item, index) => (
                <span
                  key={item}
                  className="dima-watch-loop-step rounded-button border border-hairline bg-raised px-2.5 py-1 text-micro font-medium text-muted"
                  style={{ animationDelay: `${index * 720}ms` }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="rounded-[1.2rem] border border-hairline bg-surface/90 p-3.5 shadow-xl backdrop-blur-md sm:rounded-[1.5rem] sm:p-5">
            <div className="space-y-2.5">
              {c.events.map((event, index) => (
                <div
                  key={event.time}
                  className="dima-watch-event flex items-start gap-3 rounded-control border border-hairline bg-raised/90 px-3 py-3"
                  style={{ animationDelay: `${index * 650}ms` }}
                >
                  <span className="font-mono text-micro text-muted">{event.time}</span>
                  <span className={[
                    "mt-1.5 size-2 shrink-0 rounded-full",
                    index === c.events.length - 1 ? "bg-brand" : "bg-[color-mix(in_oklab,var(--color-text-brand)_55%,var(--color-bg-raised))]",
                  ].join(" ")} />
                  <span className="text-ui font-medium leading-relaxed text-ink">{event[locale]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
