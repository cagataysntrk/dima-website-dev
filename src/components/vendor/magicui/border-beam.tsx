"use client";

/**
 * Magic UI "Border Beam" — MIT, https://magicui.design/r/border-beam. Adapted:
 * - `m` inside its own LazyMotion, so it can sit inside a strict <Reveal>;
 * - reduced motion: no beam (a light circling the edge forever is exactly what that
 *   preference asks to be spared) — hidden by CSS and not animated, never removed from the
 *   markup, so server and client render the same tree;
 * - `cn` from the design system. Colours are passed in — tokens, not hex.
 */
import type * as React from "react";
import { domAnimation, LazyMotion, m, useReducedMotion, type MotionStyle, type Transition } from "motion/react";
import { cn } from "@upcytech/ui";

interface BorderBeamProps {
  size?: number;
  duration?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
  transition?: Transition;
  className?: string;
  style?: React.CSSProperties;
  reverse?: boolean;
  initialOffset?: number;
  borderWidth?: number;
}

export const BorderBeam = ({
  className,
  size = 50,
  delay = 0,
  duration = 6,
  colorFrom = "var(--color-text-brand)",
  colorTo = "var(--color-bg-brand)",
  transition,
  style,
  reverse = false,
  initialOffset = 0,
  borderWidth = 1,
}: BorderBeamProps) => {
  // Reduced motion must not change the markup: the server cannot know the preference, so a
  // `return null` here rendered the beam on the server and nothing on the client — a
  // hydration mismatch that threw the whole page away. The beam is always rendered, hidden
  // by CSS under reduced motion, and only its animation depends on the (client-side) hook.
  const reduce = useReducedMotion();
  return (
    <LazyMotion features={domAnimation}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] border-(length:--border-beam-width) border-transparent mask-[linear-gradient(transparent,transparent),linear-gradient(#000,#000)] mask-intersect [mask-clip:padding-box,border-box] motion-reduce:hidden"
        style={{ "--border-beam-width": `${borderWidth}px` } as React.CSSProperties}
      >
        <m.div
          className={cn("absolute aspect-square", "bg-linear-to-l from-(--color-from) via-(--color-to) to-transparent", className)}
          style={{
            width: size,
            offsetPath: `rect(0 auto auto 0 round ${size}px)`,
            "--color-from": colorFrom,
            "--color-to": colorTo,
            ...style,
          } as MotionStyle}
          initial={{ offsetDistance: `${initialOffset}%` }}
          animate={reduce ? undefined : {
            offsetDistance: reverse
              ? [`${100 - initialOffset}%`, `${-initialOffset}%`]
              : [`${initialOffset}%`, `${100 + initialOffset}%`],
          }}
          transition={{ repeat: Infinity, ease: "linear", duration, delay: -delay, ...transition }}
        />
      </div>
    </LazyMotion>
  );
};
