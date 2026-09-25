"use client";

/**
 * Magic UI "Hyper Text" — MIT, https://magicui.design/r/hyper-text. Adapted:
 * - Plain elements, no Motion: the scramble is a requestAnimationFrame loop over letters and
 *   needs nothing else, and it can then sit inside a strict <Reveal>.
 * - The real text is always what the server sends; the scramble only runs after mount, once,
 *   when it scrolls into view (and again on hover). Screen readers get the text, never the noise.
 * - Meant for the mono labels: a fixed advance width means the scramble never reflows.
 * - Reduced motion: no scramble.
 */
import * as React from "react";
import { cn } from "@upcytech/ui";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

type Tag = "span" | "p" | "div";

export function HyperText({
  children, as: Component = "span", className, duration = 800, delay = 0,
  startOnView = true, animateOnHover = true,
}: {
  children: string;
  as?: Tag;
  className?: string;
  /** Milliseconds for the whole word to resolve. */
  duration?: number;
  delay?: number;
  startOnView?: boolean;
  animateOnHover?: boolean;
}) {
  const ref = React.useRef<HTMLElement>(null);
  const [shown, setShown] = React.useState(children);
  const running = React.useRef(false);

  const run = React.useCallback(() => {
    if (running.current || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    running.current = true;
    const start = performance.now();
    const frame = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const settled = progress * children.length;
      setShown(Array.from(children, (ch, i) =>
        ch === " " || i <= settled ? ch : LETTERS[Math.floor(Math.random() * LETTERS.length)]!).join(""));
      if (progress < 1) requestAnimationFrame(frame);
      else running.current = false;
    };
    requestAnimationFrame(frame);
  }, [children, duration]);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (!startOnView) {
      timer = setTimeout(run, delay);
      return () => clearTimeout(timer);
    }
    const io = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      timer = setTimeout(run, delay);
      io.disconnect();
    }, { threshold: 0.1, rootMargin: "0px 0px -20% 0px" });
    io.observe(el);
    return () => { io.disconnect(); clearTimeout(timer); };
  }, [delay, startOnView, run]);

  return (
    <Component
      ref={ref as React.Ref<never>}
      className={cn(className)}
      onMouseEnter={animateOnHover ? run : undefined}
    >
      <span className="sr-only">{children}</span>
      <span aria-hidden="true">{shown}</span>
    </Component>
  );
}
