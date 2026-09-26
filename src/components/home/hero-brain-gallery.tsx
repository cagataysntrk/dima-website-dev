"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, Rotate3D } from "lucide-react";

import type { Locale } from "@/i18n/routing";
import {
  heroBrainLab,
  type HeroBrainCandidateId,
} from "@/content/hero-brain-candidates";
import type {
  BrainCandidateRuntime,
  BrainSceneState,
} from "@/components/vendor/brain-hero/brain-scene-engine";

type Candidate = (typeof heroBrainLab.candidates)[number];

function useMedia(query: string) {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);

  return matches;
}

export function HeroBrainGallery({ locale }: { locale: Locale }) {
  const c = heroBrainLab;
  const [activeIndex, setActiveIndex] = React.useState(0);
  const touchStart = React.useRef<number | null>(null);
  const active = c.candidates[activeIndex]!;
  const coarse = useMedia("(pointer: coarse)");
  const reduced = useMedia("(prefers-reduced-motion: reduce)");

  const move = React.useCallback((delta: number) => {
    setActiveIndex((value) => {
      const length = c.candidates.length;
      return (value + delta + length) % length;
    });
  }, [c.candidates.length]);

  return (
    <div
      className="relative mx-auto w-full max-w-[48rem]"
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") move(-1);
        if (event.key === "ArrowRight") move(1);
      }}
      onTouchStart={(event) => {
        touchStart.current = event.changedTouches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        if (touchStart.current === null) return;
        const end = event.changedTouches[0]?.clientX ?? touchStart.current;
        const delta = end - touchStart.current;
        touchStart.current = null;
        if (Math.abs(delta) < 48) return;
        move(delta > 0 ? -1 : 1);
      }}
    >
      <div className="relative overflow-hidden rounded-[1.2rem] border border-outline bg-ink shadow-2xl sm:rounded-[1.45rem]">
        <div className="flex min-h-11 items-center gap-2 border-b border-white/10 px-3 sm:min-h-12 sm:px-4">
          <span aria-hidden="true" className="size-2 rounded-full bg-white/25" />
          <span aria-hidden="true" className="size-2 rounded-full bg-white/20" />
          <span aria-hidden="true" className="size-2 rounded-full bg-white/15" />
          <span className="ml-1 hidden font-mono text-[0.62rem] uppercase tracking-[0.12em] text-white/45 sm:inline">
            {c.compare[locale]}
          </span>
          <span className="ml-auto inline-flex items-center gap-1.5 text-[0.68rem] font-medium text-white/55">
            <Rotate3D aria-hidden="true" className="size-3.5" />
            {coarse ? c.touchHint[locale] : c.dragHint[locale]}
          </span>
        </div>

        <div className="relative aspect-[4/3] min-h-[21rem] sm:aspect-[16/11] sm:min-h-[28rem] lg:min-h-[34rem]">
          <BrainCandidateScene
            key={active.id}
            candidate={active}
            locale={locale}
            coarse={coarse}
            reduced={reduced}
          />

          <button
            type="button"
            onClick={() => move(-1)}
            aria-label={c.previous[locale]}
            className="absolute left-2 top-1/2 z-20 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/12 bg-black/35 text-white/70 backdrop-blur-md transition hoverable:hover:bg-black/55 hoverable:hover:text-white sm:left-3"
          >
            <ChevronLeft aria-hidden="true" className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => move(1)}
            aria-label={c.next[locale]}
            className="absolute right-2 top-1/2 z-20 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/12 bg-black/35 text-white/70 backdrop-blur-md transition hoverable:hover:bg-black/55 hoverable:hover:text-white sm:right-3"
          >
            <ChevronRight aria-hidden="true" className="size-5" />
          </button>

          <div className="pointer-events-none absolute inset-x-3 bottom-3 z-10 sm:inset-x-5 sm:bottom-5">
            <div className="max-w-[23rem] rounded-[1rem] border border-white/12 bg-black/45 p-3 text-white shadow-xl backdrop-blur-xl sm:p-3.5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold">{active.label[locale]}</p>
                <span className="font-mono text-[0.58rem] uppercase tracking-[0.11em] text-white/45">
                  {String(activeIndex + 1).padStart(2, "0")} / {String(c.candidates.length).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-1 text-[0.72rem] leading-relaxed text-white/60 sm:text-[0.74rem]">{active.note[locale]}</p>
              <p className="mt-2 hidden text-[0.58rem] leading-relaxed text-white/35 sm:block">
                {active.source[locale]} · {active.license}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 p-2 sm:p-2.5">
          <div
            role="tablist"
            aria-label={c.aria[locale]}
            className="flex snap-x snap-mandatory gap-1.5 overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {c.candidates.map((candidate, index) => {
              const selected = candidate.id === active.id;
              return (
                <button
                  key={candidate.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveIndex(index)}
                  className={[
                    "min-h-11 min-w-[8rem] snap-start rounded-[0.8rem] border px-3 py-2 text-left transition sm:min-w-[8.6rem]",
                    selected
                      ? "border-white/20 bg-white/10 text-white"
                      : "border-transparent text-white/45 hoverable:hover:bg-white/[0.045] hoverable:hover:text-white/75",
                  ].join(" ")}
                >
                  <span className="block text-[0.7rem] font-semibold sm:text-[0.72rem]">{candidate.label[locale]}</span>
                  <span className="mt-0.5 block truncate text-[0.56rem] text-current opacity-65 sm:text-[0.58rem]">{candidate.note[locale]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function BrainCandidateScene({
  candidate,
  locale,
  coarse,
  reduced,
}: {
  candidate: Candidate;
  locale: Locale;
  coarse: boolean;
  reduced: boolean;
}) {
  const hostRef = React.useRef<HTMLDivElement>(null);
  const [state, setState] = React.useState<BrainSceneState>("loading");

  React.useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;
    let idleId: number | undefined;
    let timeoutId: number | undefined;

    const boot = async () => {
      try {
        const { mountBrainCandidate } = await import(
          "@/components/vendor/brain-hero/brain-scene-engine"
        );
        if (disposed || !hostRef.current) return;
        cleanup = mountBrainCandidate({
          host: hostRef.current,
          candidate: candidate as BrainCandidateRuntime,
          coarse,
          reduced,
          onState: (next) => {
            if (!disposed) setState(next);
          },
        });
      } catch {
        if (!disposed) setState("error");
      }
    };

    const schedule = () => {
      const win = window as Window & {
        requestIdleCallback?: (
          callback: (deadline: { didTimeout: boolean; timeRemaining: () => number }) => void,
          options?: { timeout: number },
        ) => number;
        cancelIdleCallback?: (id: number) => void;
      };

      if (win.requestIdleCallback) {
        idleId = win.requestIdleCallback(() => void boot(), { timeout: 650 });
      } else {
        timeoutId = window.setTimeout(() => void boot(), 120);
      }
    };

    schedule();

    return () => {
      disposed = true;
      const win = window as Window & { cancelIdleCallback?: (id: number) => void };
      if (idleId !== undefined) win.cancelIdleCallback?.(idleId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
      cleanup?.();
    };
  }, [candidate, coarse, reduced]);

  return (
    <div ref={hostRef} className="absolute inset-0 overflow-hidden bg-ink">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_40%,color-mix(in_oklab,var(--color-text-brand)_18%,transparent),transparent_58%)]"
      />
      {state === "loading" ? (
        <div className="absolute inset-0 z-10 grid place-items-center">
          <span className="font-mono text-[0.64rem] uppercase tracking-[0.14em] text-white/38">
            {heroBrainLab.loading[locale]}
          </span>
        </div>
      ) : null}
      {state === "error" ? (
        <div className="absolute inset-0 z-10 grid place-items-center p-8 text-center">
          <span className="max-w-xs text-ui leading-relaxed text-white/55">{heroBrainLab.fallback[locale]}</span>
        </div>
      ) : null}
    </div>
  );
}
