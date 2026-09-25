"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";
import OptionWheel from "@/components/vendor/reactbits/option-wheel";
import { Safari } from "@/components/vendor/magicui/safari";
import { Iphone } from "@/components/vendor/magicui/iphone";
import type { BrandKey } from "@/content/products";

export interface ShowcaseItem {
  id: string;
  name: string;
  brandKey: BrandKey;
  oneLiner: string;
  href: string;
  /** The product's own domain, shown in the browser's address bar. */
  host?: string;
  desktop?: string;
  mobile?: string;
}

/**
 * Below Tailwind's lg. Decided after mount (false on the server and the first render), so the
 * markup the server sends always matches the client's first render.
 */
function useCompact() {
  const [compact, setCompact] = React.useState(true);
  React.useEffect(() => {
    const query = matchMedia("(max-width: 63.99rem), (hover: none), (pointer: coarse)");
    const update = () => setCompact(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return compact;
}

/** A missing screenshot, said plainly inside the device — never a drawn stand-in. */
function Missing({ text, className }: { text: string; className: string }) {
  return (
    <div className={`absolute grid place-items-center border border-dashed border-outline bg-raised p-1.5 sm:p-3 text-center font-mono text-[9px] sm:text-micro uppercase text-muted leading-tight overflow-hidden ${className}`}>
      {text}
    </div>
  );
}

/**
 * The home page's responsive product selector. Desktop fine-pointer users get the expressive
 * OptionWheel; touch users get ordinary buttons that never capture vertical page scrolling.
 * Both presentations share the same selected product and preview.
 */
export function ProductShowcase({ items, labels }: {
  items: readonly ShowcaseItem[];
  labels: { wheel: string; link: string; missingDesktop: string; missingMobile: string };
}) {
  const [index, setIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const [inView, setInView] = React.useState(true);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const pauseTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const item = items[index] ?? items[0]!;
  const compact = useCompact();
  // An endless wheel: the products repeat three times and the wheel loops, so turning it keeps
  // running from the last product back to the first. Only the first copy is announced (period).
  const n = items.length;
  const ring = [...items, ...items, ...items];

  const pauseForInteraction = React.useCallback(() => {
    setIsPaused(true);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 7000);
  }, []);

  const handleSelect = React.useCallback(
    (newIndex: number) => {
      setIndex(newIndex);
      pauseForInteraction();
    },
    [pauseForInteraction]
  );

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry?.isIntersecting ?? false);
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    if (isPaused || !inView || n <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % n);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, inView, n]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12"
    >
      <div className="relative z-10 lg:col-span-4">
        {compact ? (
          <div role="group" aria-label={labels.wheel} className="grid grid-cols-1 gap-2 min-[360px]:grid-cols-2">
            {items.map((option, optionIndex) => (
              <button
                key={option.id}
                type="button"
                aria-pressed={optionIndex === index}
                onClick={() => handleSelect(optionIndex)}
                data-brand={option.brandKey}
                className={[
                  "flex min-h-11 min-w-0 items-center gap-2 rounded-control border px-3 py-2 text-left text-ui font-medium transition-colors duration-160 cursor-pointer",
                  optionIndex === index ? "border-brand-text bg-raised text-brand-text shadow-xs" : "border-hairline bg-surface text-muted hoverable:hover:text-ink",
                ].join(" ")}
              >
                <span aria-hidden="true" className="size-2 shrink-0 rounded-chip bg-brand" />
                <span className="min-w-0 break-words">{option.name}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="relative h-64 sm:h-72 lg:h-[32rem]">
            <OptionWheel
              items={ring.map((i) => i.name)}
              itemBrands={ring.map((i) => i.brandKey)}
              period={n}
              loop
              defaultSelected={n}
              selectedIndex={n + index}
              onChange={(i) => handleSelect(i % n)}
              ariaLabel={labels.wheel}
              side="left"
              inset={40}
              fontSize={2.25}
              spacing={1.5}
              tilt={7}
              blur={1.5}
              fade={0.3}
              minOpacity={0}
              className="[mask-image:linear-gradient(to_bottom,transparent_0%,black_18%,black_82%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_18%,black_82%,transparent_100%)]"
            />
          </div>
        )}
      </div>

      <div className="lg:col-span-8">
        <div data-brand={item.brandKey} className="relative pb-[9%] pr-[16%]">
          <div key={`d-${item.id}`} className="relative transition-opacity duration-300 ease-out-expo starting:opacity-0">
            <Safari url={item.host ?? ""} imageSrc={item.desktop} mode="simple" className="drop-shadow-[0_24px_48px_color-mix(in_oklab,var(--color-text-primary)_18%,transparent)]" />
            {!item.desktop && <Missing text={`[COPY NEEDED: ${item.name} — ${labels.missingDesktop}]`} className="inset-x-0 bottom-0 top-[7%] rounded-b-[11px]" />}
          </div>
          <div key={`m-${item.id}`} className="absolute bottom-0 right-0 w-[27%] transition-opacity duration-300 ease-out-expo starting:opacity-0">
            <Iphone src={item.mobile} className="drop-shadow-[0_18px_36px_color-mix(in_oklab,var(--color-text-primary)_22%,transparent)]" />
            {!item.mobile && <Missing text={`[COPY NEEDED: ${item.name} — ${labels.missingMobile}]`} className="inset-[3%_6%] rounded-[12%/6%]" />}
          </div>
        </div>

        <div aria-live="polite" data-brand={item.brandKey} className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-x-6">
          <p className="min-w-0 flex-1 max-w-prose text-ink">
            <span className="mr-2 font-semibold" translate="no">
              <span aria-hidden="true" className="mr-2 inline-block size-2 rounded-full bg-brand align-middle" />
              {item.name}
            </span>
            <span className="text-muted">{item.oneLiner}</span>
          </p>
          <a href={item.href} className="inline-flex min-h-11 shrink-0 items-center gap-1.5 text-ui font-medium text-brand-text no-underline self-start sm:self-auto">
            {labels.link}
            <ArrowRight aria-hidden="true" className="size-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
