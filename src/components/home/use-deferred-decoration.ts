"use client";

import * as React from "react";

const isDark = () => {
  const chosen = document.documentElement.dataset.theme;
  return chosen ? chosen === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
};

/**
 * When a decorative WebGL layer (the hero's Pixel Blast, its globe) may mount, and in which
 * theme. Decoration waits:
 * - until the page has loaded and the browser is idle, so it never competes with the headline
 *   (LCP) or the first interactions;
 * - forever, under data saver — and under reduced motion, unless the layer can hold still
 *   (`stillUnderReducedMotion`, as the globe does);
 * and it follows the theme, whether chosen in the toggle or inherited from the OS.
 */
export function useDeferredDecoration({ stillUnderReducedMotion = false }: { stillUnderReducedMotion?: boolean } = {}) {
  const [on, setOn] = React.useState(false);
  const [dark, setDark] = React.useState(false);

  React.useEffect(() => {
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (connection?.saveData) return;
    if (!stillUnderReducedMotion && matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const update = () => setDark(isDark());
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const scheme = matchMedia("(prefers-color-scheme: dark)");
    scheme.addEventListener("change", update);

    let idle: number | undefined;
    const start = () => {
      idle = typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback(() => setOn(true), { timeout: 2000 })
        : window.setTimeout(() => setOn(true), 300);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });

    return () => {
      observer.disconnect();
      scheme.removeEventListener("change", update);
      window.removeEventListener("load", start);
      if (idle !== undefined) {
        if ("cancelIdleCallback" in window) window.cancelIdleCallback(idle);
        window.clearTimeout(idle);
      }
    };
  }, [stillUnderReducedMotion]);

  return { on, dark };
}
