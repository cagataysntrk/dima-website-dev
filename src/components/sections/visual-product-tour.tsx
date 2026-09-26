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
  Search,
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
    }, 5200);
    return () => window.clearInterval(timer);
  }, [paused, reduced, c.stages]);

  const choose = (id: ProductTourStageId) => {
    setActiveId(id);
    setPaused(true);
  };

  return (
    <Section divided aria-labelledby="visual-product-tour-title">
      <Stack gap="loose">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <Stack gap="tight" className="max-w-4xl">
            <Text variant="eyebrow">{c.eyebrow[locale]}</Text>
            <Heading level={2} variant="title" id="visual-product-tour-title">{c.title[locale]}</Heading>
          </Stack>
          <div className="flex items-center gap-2 lg:justify-self-end">
            <span className="hidden font-mono text-micro uppercase tracking-[0.12em] text-muted sm:inline">{c.note[locale]}</span>
            <button
              type="button"
              onClick={() => setPaused((value) => !value)}
              aria-label={(paused ? c.auto.resume : c.auto.pause)[locale]}
              className="inline-flex min-h-11 items-center gap-2 rounded-button border border-hairline bg-surface px-3 text-ui text-muted shadow-sm transition hoverable:hover:text-ink"
            >
              {paused ? <Play aria-hidden="true" className="size-4" /> : <Pause aria-hidden="true" className="size-4" />}
              <span>{(paused ? c.auto.resume : c.auto.pause)[locale]}</span>
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-[1.75rem] border border-outline bg-surface shadow-xl">
          <div className="border-b border-hairline bg-canvas/70 p-2 sm:p-3">
            <div role="tablist" aria-label={c.title[locale]} className="grid grid-cols-2 gap-2 md:grid-cols-3 xl:grid-cols-6">
              {c.stages.map((stage) => {
                const Icon = STAGE_ICON[stage.id];
                const selected = stage.id === active.id;
                return (
                  <button
                    key={stage.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => choose(stage.id)}
                    className={[
                      "relative min-h-14 overflow-hidden rounded-control border px-3 py-2.5 text-left transition",
                      selected
                        ? "border-ink/10 bg-ink text-canvas shadow-md"
                        : "border-hairline bg-surface text-ink hoverable:hover:border-outline",
                    ].join(" ")}
                  >
                    <span className="flex items-center gap-2">
                      <span className={[
                        "grid size-7 shrink-0 place-items-center rounded-full",
                        selected ? "bg-white/10 text-white" : "bg-raised text-brand-text",
                      ].join(" ")}>
                        <Icon aria-hidden="true" className="size-3.5" />
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-ui font-semibold">{stage.tab[locale]}</span>
                        <span className={["mt-0.5 block truncate font-mono text-[0.625rem] uppercase tracking-[0.12em]", selected ? "text-white/60" : "text-muted"].join(" ")}>
                          {stage.step} · {stage.meta[locale]}
                        </span>
                      </span>
                    </span>
                    {selected && !paused && !reduced && (
                      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-0.5 bg-white/15">
                        <span key={active.id} className="dima-tour-tab-progress block h-full bg-white/70" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="border-b border-hairline px-4 py-3 sm:px-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-mono text-micro uppercase tracking-[0.12em] text-brand-text">{active.meta[locale]}</p>
                <h3 className="mt-1 text-lg font-semibold tracking-tight text-ink sm:text-xl">{active.title[locale]}</h3>
              </div>
              <p className="max-w-xl text-ui leading-relaxed text-muted">{active.caption[locale]}</p>
            </div>
          </div>

          <div className="relative min-h-[34rem] overflow-hidden bg-[radial-gradient(circle_at_50%_35%,color-mix(in_oklab,var(--color-text-brand)_7%,transparent),transparent_48%)]">
            <div key={active.id} className="dima-tour-scene min-h-[34rem]">
              <TourScene id={active.id} locale={locale} />
            </div>
          </div>

          <div className="flex items-center gap-3 border-t border-hairline px-4 py-3 sm:px-6">
            <span className="font-mono text-micro text-muted">{String(activeIndex + 1).padStart(2, "0")}</span>
            <div className="flex flex-1 gap-1.5">
              {c.stages.map((stage, index) => (
                <button
                  key={stage.id}
                  type="button"
                  aria-label={stage.tab[locale]}
                  onClick={() => choose(stage.id)}
                  className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-raised"
                >
                  <span
                    className={[
                      "absolute inset-y-0 left-0 rounded-full bg-brand transition-[width] duration-300",
                      index < activeIndex ? "w-full" : index === activeIndex ? "w-full" : "w-0",
                    ].join(" ")}
                  />
                </button>
              ))}
            </div>
            <span className="hidden items-center gap-1.5 text-micro text-muted sm:inline-flex">
              <span aria-hidden="true" className="relative flex size-2">
                <span className="absolute inline-flex size-full motion-safe:animate-ping rounded-full bg-brand opacity-35" />
                <span className="relative inline-flex size-2 rounded-full bg-brand" />
              </span>
              {c.auto.running[locale]}
            </span>
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
  return (
    <div className="grid min-h-[34rem] place-items-center p-5 sm:p-8">
      <div className="w-full max-w-xl rounded-[1.75rem] border border-outline bg-surface p-5 shadow-xl sm:p-7">
        <div className="flex items-center gap-3">
          <img src="/products/dima-mark.png" alt="" width={36} height={36} className="dima-logo-mark size-9" />
          <div>
            <p className="text-lg font-semibold text-ink">Dima</p>
            <p className="text-micro text-muted">{c.title[locale]}</p>
          </div>
        </div>

        <div className="mt-6 rounded-button border border-hairline bg-canvas px-4 py-3 text-center text-ui font-medium text-ink shadow-sm">
          <span className="mr-2 inline-grid size-6 place-items-center rounded-full bg-surface font-semibold text-brand-text shadow-sm">G</span>
          {c.google[locale]}
        </div>

        <div className="my-5 flex items-center gap-3">
          <span className="h-px flex-1 bg-hairline" />
          <span className="text-micro text-muted">Dima</span>
          <span className="h-px flex-1 bg-hairline" />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="relative overflow-hidden rounded-card border border-brand-text/35 bg-[color-mix(in_oklab,var(--color-text-brand)_7%,var(--color-bg-surface))] p-4">
            <span aria-hidden="true" className="absolute -right-5 -top-5 size-20 rounded-full bg-brand/10 blur-xl" />
            <Database aria-hidden="true" className="size-5 text-brand-text" />
            <p className="mt-4 text-ui font-semibold text-ink">{c.own[locale]}</p>
            <ArrowRight aria-hidden="true" className="mt-3 size-4 text-brand-text" />
          </div>
          <div className="rounded-card border border-hairline bg-raised p-4">
            <Building2 aria-hidden="true" className="size-5 text-brand-text" />
            <p className="mt-4 text-ui font-semibold text-ink">{c.sample[locale]}</p>
            <ArrowRight aria-hidden="true" className="mt-3 size-4 text-muted" />
          </div>
        </div>
        <p className="mt-5 text-center text-micro leading-relaxed text-muted">{c.disclaimer[locale]}</p>
      </div>
    </div>
  );
}

function ConnectScene({ locale }: { locale: Locale }) {
  const c = productTour.connect;
  const icons: LucideIcon[] = [Database, Building2, FileSpreadsheet, Database, Factory, Zap];
  return (
    <div className="grid min-h-[34rem] gap-5 p-5 lg:grid-cols-[1fr_0.85fr] lg:p-8">
      <div className="relative min-h-[24rem] overflow-hidden rounded-[1.5rem] border border-hairline bg-surface">
        <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full text-brand-text/25">
          {[18, 31, 44, 57, 70, 83].map((y) => (
            <path key={y} d={`M 15 ${y} C 32 ${y}, 35 50, 50 50`} fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" vectorEffect="non-scaling-stroke" />
          ))}
        </svg>
        <div className="absolute left-1/2 top-1/2 z-10 grid size-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-brand-text/30 bg-surface shadow-xl">
          <span aria-hidden="true" className="absolute inset-0 motion-safe:animate-ping rounded-full border border-brand-text/20" />
          <img src="/products/dima-mark.png" alt="" width={36} height={36} className="dima-logo-mark relative size-9" />
        </div>
        <div className="absolute inset-y-0 left-4 flex w-[42%] flex-col justify-center gap-2 sm:left-6">
          {c.sources.map((source, index) => {
            const Icon = icons[index] ?? Database;
            return (
              <div key={source} className="flex items-center gap-2 rounded-control border border-hairline bg-surface/95 px-3 py-2 shadow-sm backdrop-blur-sm">
                <span className="grid size-7 place-items-center rounded-control bg-raised text-brand-text"><Icon aria-hidden="true" className="size-3.5" /></span>
                <span className="text-micro font-medium text-ink">{source}</span>
                <span className="ml-auto size-1.5 rounded-full bg-brand motion-safe:animate-pulse" style={{ animationDelay: `${index * 180}ms` }} />
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

      <div className="flex flex-col justify-center rounded-[1.5rem] border border-hairline bg-surface p-5 sm:p-6">
        <p className="font-mono text-micro uppercase tracking-[0.12em] text-muted">{c.setupLabel[locale]}</p>
        <div className="mt-5 space-y-3">
          {c.checks[locale].map((item, index) => (
            <div key={item} className="flex items-center gap-3 rounded-control border border-hairline bg-raised px-3 py-3">
              <span className={[
                "grid size-7 place-items-center rounded-full",
                index < 3 ? "bg-[color-mix(in_oklab,var(--color-text-brand)_12%,transparent)] text-brand-text" : "bg-surface text-muted",
              ].join(" ")}>
                {index < 3 ? <Check aria-hidden="true" className="size-4" /> : <span className="size-2 rounded-full bg-brand motion-safe:animate-ping" />}
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
    <div className="relative min-h-[34rem] overflow-hidden p-5 sm:p-8">
      <p className="absolute left-1/2 top-7 z-20 -translate-x-1/2 whitespace-nowrap rounded-button border border-hairline bg-surface/90 px-4 py-2 text-ui font-semibold text-ink shadow-sm backdrop-blur-sm">
        {c.heading[locale]}
      </p>
      <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full text-outline">
        {DOMAIN_POSITIONS.slice(0, 7).map(([x, y], index) => (
          <line key={index} x1="50" y1="50" x2={Number.parseFloat(x)} y2={Number.parseFloat(y)} stroke="currentColor" strokeWidth="0.35" strokeDasharray="2 2" vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
      <div className="absolute left-1/2 top-1/2 z-10 grid size-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-brand-text/35 bg-surface shadow-xl">
        <span aria-hidden="true" className="absolute inset-2 rounded-full border border-brand-text/15 motion-safe:animate-pulse" />
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
              <span className="size-2 rounded-full bg-brand motion-safe:animate-pulse" style={{ animationDelay: `${index * 120}ms` }} />
              <span className="text-micro font-semibold text-ink sm:text-ui">{domain}</span>
            </span>
          </div>
        );
      })}
    </div>
  );
}

function DashboardScene({ locale }: { locale: Locale }) {
  return (
    <div className="relative min-h-[34rem] overflow-hidden bg-raised">
      <img
        src="/product-concepts/company-map.webp"
        alt={locale === "tr" ? "Dima Şirket Beyni ürün ekranı, örnek şirket verisi" : "Dima Company Brain product screen with sample company data"}
        width={1536}
        height={1024}
        className="absolute inset-0 size-full object-cover object-top"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-canvas/75 via-transparent to-transparent" />
      <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-end justify-between gap-3 sm:bottom-7 sm:left-7 sm:right-7">
        <span className="rounded-button border border-white/25 bg-black/60 px-3 py-2 text-micro font-medium text-white backdrop-blur-md">
          {productTour.dashboard.ready[locale]}
        </span>
        <span className="rounded-button border border-white/25 bg-white/90 px-3 py-2 text-micro font-medium text-ink backdrop-blur-md">
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
    <div className="relative min-h-[34rem] overflow-hidden">
      <img
        src="/product-concepts/live-system.webp"
        alt=""
        width={1536}
        height={1024}
        className="absolute inset-0 size-full object-cover object-top opacity-55"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,var(--color-bg-canvas)_8%,color-mix(in_oklab,var(--color-bg-canvas)_68%,transparent)_45%,var(--color-bg-canvas)_94%)]" />

      <div className="relative z-10 grid min-h-[34rem] gap-5 p-5 lg:grid-cols-[0.85fr_1.15fr] lg:p-8">
        <div className="flex flex-col justify-center">
          <span className="inline-flex w-fit items-center gap-2 rounded-button border border-brand-text/30 bg-surface/90 px-3 py-2 text-micro font-semibold text-brand-text shadow-sm backdrop-blur-sm">
            <span aria-hidden="true" className="relative flex size-2">
              <span className="absolute inline-flex size-full motion-safe:animate-ping rounded-full bg-brand opacity-35" />
              <span className="relative inline-flex size-2 rounded-full bg-brand" />
            </span>
            {c.badge[locale]}
          </span>
          <div className="mt-4 max-w-md rounded-[1.5rem] border border-outline bg-surface/95 p-5 shadow-xl backdrop-blur-md">
            <p className="font-mono text-micro uppercase tracking-[0.12em] text-brand-text">{c.signal[locale]}</p>
            <p className="mt-2 text-xl font-semibold tracking-tight text-ink">{c.signalTitle[locale]}</p>
            <p className="mt-2 text-ui text-muted">{c.impact[locale]}</p>
            <div className="mt-5 flex items-center gap-2">
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-raised">
                <span className="dima-watch-scan block h-full w-2/3 rounded-full bg-brand" />
              </span>
              <span className="font-mono text-micro text-muted">{c.monitoring[locale]}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="rounded-[1.5rem] border border-hairline bg-surface/90 p-4 shadow-xl backdrop-blur-md sm:p-5">
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
