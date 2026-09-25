"use client";

/**
 * Magic UI "Text Animate" — MIT, https://magicui.design/r/text-animate. Adapted:
 * - Armed only when it starts below the fold, like components/motion/reveal.tsx. Upstream
 *   renders every segment at opacity 0 on the server, so text already on screen would be
 *   blank until JavaScript ran — and forever without it. Here the server sends visible text.
 * - `m` inside its own LazyMotion, so it can sit inside a strict <Reveal>.
 * - Screen readers get one sr-only copy; the animated segments are hidden from them.
 *   (Upstream also sets aria-label, which is not allowed on a <p> or <span>.)
 * - Reduced motion: never armed, so the text simply stays put.
 */
import { memo, useEffect, useRef, useState, type ElementType } from "react";
import { domAnimation, LazyMotion, m, useInView, useReducedMotion, type MotionProps, type Variants } from "motion/react";
import { cn } from "@upcytech/ui";

type AnimationType = "text" | "word" | "character" | "line";
type AnimationVariant = "fadeIn" | "blurIn" | "blurInUp" | "blurInDown" | "slideUp" | "slideDown";

const motionElements = {
  div: m.div, h1: m.h1, h2: m.h2, h3: m.h3, h4: m.h4, p: m.p, span: m.span,
} as const;

interface TextAnimateProps extends Omit<MotionProps, "children"> {
  children: string;
  className?: string;
  segmentClassName?: string;
  delay?: number;
  /** Spread of the whole stagger, in seconds. */
  duration?: number;
  as?: keyof typeof motionElements;
  by?: AnimationType;
  startOnView?: boolean;
  once?: boolean;
  animation?: AnimationVariant;
  id?: string;
}

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const ITEMS: Record<AnimationVariant, Variants> = {
  fadeIn: {
    hidden: { opacity: 0, transform: "translateY(20px)" },
    show: { opacity: 1, transform: "translateY(0px)", transition: { duration: 0.3, ease: EASE_OUT } },
  },
  blurIn: {
    hidden: { opacity: 0, filter: "blur(10px)" },
    show: { opacity: 1, filter: "blur(0px)", transition: { duration: 0.3, ease: EASE_OUT } },
  },
  blurInUp: {
    hidden: { opacity: 0, filter: "blur(10px)", transform: "translateY(20px)" },
    show: {
      opacity: 1, filter: "blur(0px)", transform: "translateY(0px)",
      transition: { transform: { duration: 0.3, ease: EASE_OUT }, opacity: { duration: 0.4 }, filter: { duration: 0.3 } },
    },
  },
  blurInDown: {
    hidden: { opacity: 0, filter: "blur(10px)", transform: "translateY(-20px)" },
    show: {
      opacity: 1, filter: "blur(0px)", transform: "translateY(0px)",
      transition: { transform: { duration: 0.3, ease: EASE_OUT }, opacity: { duration: 0.4 }, filter: { duration: 0.3 } },
    },
  },
  slideUp: {
    hidden: { opacity: 0, transform: "translateY(20px)" },
    show: { opacity: 1, transform: "translateY(0px)", transition: { duration: 0.3, ease: EASE_OUT } },
  },
  slideDown: {
    hidden: { opacity: 0, transform: "translateY(-20px)" },
    show: { opacity: 1, transform: "translateY(0px)", transition: { duration: 0.3, ease: EASE_OUT } },
  },
};

function split(text: string, by: AnimationType) {
  if (by === "word") return text.split(/(\s+)/);
  if (by === "character") return text.split("");
  if (by === "line") return text.split("\n");
  return [text];
}

function TextAnimateBase({
  children, delay = 0, duration = 0.3, className, segmentClassName, as = "p",
  startOnView = true, once = true, by = "word", animation = "blurInUp", ...props
}: TextAnimateProps) {
  const Component = motionElements[as] as ElementType;
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [armed, setArmed] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (startOnView && !reduce && el && el.getBoundingClientRect().top > window.innerHeight) setArmed(true);
  }, [startOnView, reduce]);
  const inView = useInView(ref, { once, margin: "0px 0px -10% 0px" });

  const segments = split(children, by);
  const container: Variants = {
    hidden: { transition: { duration: 0 } },
    show: { transition: { delayChildren: delay, staggerChildren: duration / segments.length } },
  };

  return (
    <LazyMotion features={domAnimation}>
      <Component
        ref={ref}
        variants={container}
        initial={false}
        animate={armed && !inView ? "hidden" : "show"}
        className={cn(by === "word" ? "whitespace-normal" : "whitespace-pre-wrap", className)}
        {...props}
      >
        <span className="sr-only">{children}</span>
        {segments.map((segment, i) =>
          // Word mode: spaces are plain text in a whitespace-normal container, so a space at a
          // wrap collapses away. As inline-block spans (or preserved by pre-wrap), a line may
          // break before the space and every wrapped line of a heading started indented by one.
          by === "word" && /^\s+$/.test(segment) ? (
            <span key={`${by}-${i}`} aria-hidden="true">{segment}</span>
          ) : (
            <m.span
              key={`${by}-${i}`}
              variants={ITEMS[animation]}
              aria-hidden="true"
              className={cn(by === "line" ? "block" : "inline-block whitespace-pre", segmentClassName)}
            >
              {segment}
            </m.span>
          ),
        )}
      </Component>
    </LazyMotion>
  );
}

export const TextAnimate = memo(TextAnimateBase);
