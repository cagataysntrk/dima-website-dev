"use client";

import * as React from "react";
import { ArrowUp } from "lucide-react";

/**
 * Vertical reading progress rail running down the right edge of the viewport,
 * plus a hairline progress line at the top.
 */
export function ScrollProgress({ label }: { label?: string }) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      if (total <= 0) {
        setProgress(0);
        return;
      }
      const current = Math.min(Math.max(el.scrollTop / total, 0), 1);
      setProgress(Math.round(current * 100));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (progress <= 0) return null;

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      className="pointer-events-none fixed inset-y-0 right-0 z-30 w-1 bg-hairline/20"
    >
      <div
        className="w-full bg-brand transition-[height] duration-75 ease-out"
        style={{ height: `${progress}%` }}
      />
    </div>
  );
}

/**
 * Floating button in the bottom-right corner to smoothly scroll back to top.
 */
export function ScrollToTop({ label }: { label: string }) {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 360);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      aria-label={label}
      onClick={handleClick}
      className={[
        "fixed bottom-6 right-6 z-40 flex size-10 sm:size-11 pointer-coarse:size-11 items-center justify-center rounded-full",
        "border border-hairline bg-canvas/90 text-muted shadow-lg backdrop-blur-md cursor-pointer",
        "transition-all duration-300 ease-out-expo hoverable:hover:scale-110 hoverable:hover:text-ink hoverable:hover:bg-raised",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      ].join(" ")}
    >
      <ArrowUp aria-hidden="true" className="size-4" />
    </button>
  );
}
