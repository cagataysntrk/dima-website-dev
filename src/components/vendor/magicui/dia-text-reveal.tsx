"use client";

/**
 * Magic UI "Dia Text Reveal" — MIT, https://magicui.design/r/dia-text-reveal. Adapted:
 * - `onComplete`, so the home hero can hand over to KineticText once the sweep settles;
 * - no baseline nudge (translateY) or line-height override: the hand-over must move nothing;
 * - `cn` from the design system, and the ink token as the default settled colour.
 */
import type * as React from "react";
import { useEffect, useRef, useState } from "react";
import {
  animate, motion, useInView, useMotionValue, useReducedMotion, useTransform, type HTMLMotionProps,
} from "motion/react";
import { cn } from "@upcytech/ui";

const DEFAULT_COLORS = ["#c679c4", "#fa3d1d", "#ffb005", "#e1e1fe", "#0358f7"];
const BAND_HALF = 17;
const SWEEP_START = -BAND_HALF;
const SWEEP_END = 100 + BAND_HALF;

const sweepEase = (t: number) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2);

function buildGradient(pos: number, colors: string[], textColor: string) {
  const bandStart = pos - BAND_HALF;
  const bandEnd = pos + BAND_HALF;
  if (bandStart >= 100) return `linear-gradient(90deg, ${textColor}, ${textColor})`;
  const n = colors.length;
  const parts: string[] = [];
  if (bandStart > 0) parts.push(`${textColor} 0%`, `${textColor} ${bandStart.toFixed(2)}%`);
  colors.forEach((c, i) => {
    const pct = n === 1 ? pos : bandStart + (i / (n - 1)) * BAND_HALF * 2;
    parts.push(`${c} ${pct.toFixed(2)}%`);
  });
  if (bandEnd < 100) parts.push(`transparent ${bandEnd.toFixed(2)}%`, `transparent 100%`);
  return `linear-gradient(90deg, ${parts.join(", ")})`;
}

function measureWidths(el: HTMLElement, texts: string[]) {
  const ghost = el.cloneNode() as HTMLElement;
  Object.assign(ghost.style, { position: "absolute", visibility: "hidden", pointerEvents: "none", width: "auto", whiteSpace: "nowrap" });
  el.parentElement!.appendChild(ghost);
  const widths = texts.map((t) => {
    ghost.textContent = t;
    return ghost.getBoundingClientRect().width;
  });
  ghost.remove();
  return widths;
}

export interface DiaTextRevealProps
  extends Omit<HTMLMotionProps<"span">, "ref" | "children" | "style" | "animate" | "transition" | "color"> {
  /** Text to reveal. Several strings rotate when `repeat` is true. */
  text: string | string[];
  /** Colours sampled across the moving band. */
  colors?: string[];
  /** Settled colour, and the colour of the already-revealed region. */
  textColor?: string;
  /** One sweep, in seconds. */
  duration?: number;
  delay?: number;
  repeat?: boolean;
  repeatDelay?: number;
  /** Start when scrolled into view; otherwise on mount. */
  startOnView?: boolean;
  once?: boolean;
  className?: string;
  fixedWidth?: boolean;
  /** Called once the sweep has settled (not called when repeating). */
  onComplete?: () => void;
  /**
   * Renders instead of the text (single-text use only) — for inner structure such as
   * italic words. The band paints through descendants, since background-clip: text clips to
   * every glyph inside the span.
   */
  children?: React.ReactNode;
}

export function DiaTextReveal({
  text,
  colors = DEFAULT_COLORS,
  textColor = "var(--color-text-primary)",
  duration = 1.5,
  delay = 0,
  repeat = false,
  repeatDelay = 0.5,
  startOnView = true,
  once = true,
  className,
  fixedWidth = false,
  onComplete,
  children,
  ...props
}: DiaTextRevealProps) {
  const texts = Array.isArray(text) ? text : [text];
  const isMulti = texts.length > 1;
  const prefersReducedMotion = useReducedMotion();

  const spanRef = useRef<HTMLSpanElement>(null);
  const optsRef = useRef({ colors, textColor, duration, delay, repeat, repeatDelay, texts, onComplete });
  optsRef.current = { colors, textColor, duration, delay, repeat, repeatDelay, texts, onComplete };

  const indexRef = useRef(0);
  const hasPlayedRef = useRef(false);
  const completedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const playRef = useRef<() => void>(null!);
  const stopRef = useRef<(() => void) | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [measuredWidths, setMeasuredWidths] = useState<number[]>([]);

  const sweepPos = useMotionValue(SWEEP_START);
  const backgroundImage = useTransform(sweepPos, (pos) =>
    buildGradient(pos, optsRef.current.colors, optsRef.current.textColor));
  const isInView = useInView(spanRef, { once, amount: 0.1 });

  useEffect(() => {
    const el = spanRef.current;
    if (!el || !isMulti) return;
    setMeasuredWidths(measureWidths(el, texts));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Array.isArray(text) ? text.join("\0") : text]);

  playRef.current = () => {
    const { duration, delay, repeat, repeatDelay, texts } = optsRef.current;
    sweepPos.set(SWEEP_START);
    const controls = animate(sweepPos, SWEEP_END, {
      duration,
      delay,
      ease: sweepEase,
      onComplete() {
        if (!repeat) {
          completedRef.current = true;
          optsRef.current.onComplete?.();
          return;
        }
        timerRef.current = setTimeout(() => {
          const next = (indexRef.current + 1) % texts.length;
          indexRef.current = next;
          setActiveIndex(next);
          playRef.current();
        }, repeatDelay * 1000);
      },
    });
    stopRef.current = () => controls.stop();
  };

  useEffect(() => {
    if (prefersReducedMotion) {
      sweepPos.set(SWEEP_END);
      optsRef.current.onComplete?.();
      return;
    }
    if (startOnView && !isInView) return;
    if (once && hasPlayedRef.current) return;
    hasPlayedRef.current = true;
    playRef.current();
    return () => {
      stopRef.current?.();
      clearTimeout(timerRef.current);
      // Upstream bug: React Strict Mode (development) mounts, unmounts and remounts. The
      // cleanup stopped the sweep, `once` then refused to restart it, and the text stayed
      // transparent for good. An unfinished sweep may start again.
      if (!completedRef.current) hasPlayedRef.current = false;
    };
  }, [isInView, startOnView, once, prefersReducedMotion, sweepPos]);

  const fixedW = isMulti && fixedWidth && measuredWidths.length > 0 ? Math.max(...measuredWidths) : undefined;
  const animatedW = isMulti && !fixedWidth && measuredWidths[activeIndex] != null ? measuredWidths[activeIndex] : undefined;

  return (
    <motion.span
      ref={spanRef}
      className={cn("text-inherit", className)}
      style={{
        color: "transparent",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        backgroundSize: "100% 100%",
        backgroundImage,
        ...(isMulti && {
          display: "inline-block",
          overflow: "hidden",
          whiteSpace: "nowrap",
          verticalAlign: "text-center",
          ...(fixedW != null && { width: fixedW }),
        }),
      }}
      animate={animatedW != null ? { width: animatedW } : undefined}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      {...props}
    >
      {children ?? texts[activeIndex]}
    </motion.span>
  );
}
