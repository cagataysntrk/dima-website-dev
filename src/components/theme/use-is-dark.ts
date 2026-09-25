"use client";

import * as React from "react";

const read = () => {
  const chosen = document.documentElement.dataset.theme;
  return chosen ? chosen === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
};

/**
 * Whether the page is in its dark theme — an explicit choice in the ThemeToggle, otherwise
 * the OS preference — kept current as either changes. For code that needs a resolved colour
 * (canvas, WebGL), where CSS variables cannot reach. False on the server and first render.
 */
export function useIsDark() {
  const [dark, setDark] = React.useState(false);
  React.useEffect(() => {
    const update = () => setDark(read());
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const scheme = matchMedia("(prefers-color-scheme: dark)");
    scheme.addEventListener("change", update);
    return () => { observer.disconnect(); scheme.removeEventListener("change", update); };
  }, []);
  return dark;
}
