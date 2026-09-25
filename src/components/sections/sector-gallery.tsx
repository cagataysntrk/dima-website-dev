"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";

export interface GalleryItem {
  id: string;
  name: string;
  summary: string;
  href: string;
  image?: string;
  alt: string;
}

/**
 * The sectors as an accordion gallery (after shadcn's gallery-accordion): photographs side by
 * side, the active one widening while the others narrow; on phones they stack and the active
 * one grows taller. Pointer, tap or keyboard focus opens a panel. Every sector's name, summary
 * and link stay in the page for assistive technology — closed panels only hide them visually.
 */
export function SectorGallery({ items, linkLabel, missingLabel }: {
  items: readonly GalleryItem[];
  linkLabel: string;
  missingLabel: string;
}) {
  const [active, setActive] = React.useState(0);

  return (
    <ul className="mt-12 flex flex-col gap-3 lg:h-[28rem] lg:flex-row">
      {items.map((item, i) => {
        const open = i === active;
        return (
          <li
            key={item.id}
            onPointerEnter={(event) => { if (event.pointerType === "mouse") setActive(i); }}
            onFocusCapture={() => setActive(i)}
            className={[
              "group relative overflow-hidden rounded-[calc(var(--radius-panel)*1.25)] border border-hairline bg-raised",
              "transition-[flex-grow,height] duration-500 ease-out-expo motion-reduce:transition-none",
              "lg:h-full lg:basis-0",
              open ? "h-80 lg:grow-[4]" : "h-24 lg:grow",
            ].join(" ")}
          >
            {item.image ? (
              <img src={item.image} alt={item.alt} loading="lazy" decoding="async"
                   className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.03] motion-reduce:transition-none" />
            ) : (
              <div className="absolute inset-0 grid place-items-center border border-dashed border-outline font-mono text-micro uppercase text-muted">
                {`[COPY NEEDED: ${item.name} — ${missingLabel}]`}
              </div>
            )}
            {/* Scrim: photographs vary, the text on them must not — dense through the middle too,
                where the summary reaches on an open card. */}
            <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-black/85 via-black/55 to-black/5" />

            <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
              <button
                type="button"
                aria-expanded={open}
                aria-controls={`${item.id}-sector-panel`}
                onClick={() => setActive(i)}
                className="flex min-h-11 w-full items-center text-left font-title text-subtitle font-semibold"
              >
                {item.name}
              </button>
              <div className={[
                "grid transition-[grid-template-rows,opacity] duration-500 ease-out-expo motion-reduce:transition-none",
                open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              ].join(" ")} id={`${item.id}-sector-panel`} inert={!open || undefined}>
                <div className="overflow-hidden">
                  <p className="mt-2 max-w-md text-ui leading-relaxed text-white/85">{item.summary}</p>
                  <a href={item.href} className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-ui font-medium text-white no-underline underline-offset-4 hoverable:hover:underline">
                    {linkLabel}
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </a>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
