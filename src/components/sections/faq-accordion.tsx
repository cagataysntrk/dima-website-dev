"use client";

import * as React from "react";

/**
 * Questions that open independently: a button per question with `aria-expanded`, the
 * answer in a grid-rows animation (the gallery's language) that honours reduced motion.
 * The first answer starts open so the pattern is visible; keyboards get native buttons.
 */
export function FaqAccordion({ items, idPrefix }: {
  items: { q: string; a: string }[];
  /** Prefix for the button/panel ids, unique per page. */
  idPrefix: string;
}) {
  const [open, setOpen] = React.useState<readonly boolean[]>(items.map((_, i) => i === 0));
  const toggle = (i: number) =>
    setOpen((prev) => prev.map((v, j) => (j === i ? !v : v)));

  return (
    <div className="flex flex-col">
      {items.map((item, i) => {
        const isOpen = !!open[i];
        const buttonId = `${idPrefix}-q${i}`;
        const panelId = `${idPrefix}-a${i}`;
        return (
          <div key={i} className="border-t border-hairline py-1.5 last:border-b">
            <h4>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                // The row's padding lives on the button (py-2.5 + the row's py-1.5 = the old
                // py-4): a 44px touch target that stops where the answer starts.
                className="flex w-full cursor-pointer items-baseline justify-between gap-4 py-2.5 text-left font-medium text-ink"
              >
                <span>{item.q}</span>
                <span
                  aria-hidden="true"
                  className={[
                    "shrink-0 font-mono text-ui text-muted transition-transform duration-300 ease-out-expo motion-reduce:transition-none",
                    isOpen ? "rotate-45" : "",
                  ].join(" ")}
                >
                  +
                </span>
              </button>
            </h4>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              // Closed answers stay rendered for the animation but leave the
              // accessibility tree and the tab order via `inert`.
              inert={!isOpen || undefined}
              className={[
                "grid transition-[grid-template-rows,opacity] duration-300 ease-out-expo motion-reduce:transition-none",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              ].join(" ")}
            >
              <div className="overflow-hidden">
                <p className="max-w-prose pb-2.5 leading-relaxed text-muted">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
