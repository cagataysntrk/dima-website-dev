"use client";

import * as React from "react";
import { ArrowRight, Compass, Sparkles } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import type { Product } from "@/content/products";
import type { ProblemEntry, ProblemMatcherCopy } from "@/content/problem-matcher";

interface ProblemMatcherProps {
  locale: Locale;
  copy: ProblemMatcherCopy;
  products: readonly Product[];
}

export function ProblemMatcher({ locale, copy, products }: ProblemMatcherProps) {
  const [selectedId, setSelectedId] = React.useState<string | null>(copy.problems[0]?.id ?? null);

  const selected = copy.problems.find((p) => p.id === selectedId) ?? null;
  const product = selected ? products.find((p) => p.id === selected.productId) : null;

  return (
    <section
      aria-labelledby="problem-matcher-heading"
      className="scroll-mt-[calc(var(--nav-offset)+2rem)] border-b border-hairline py-8 sm:py-12"
    >
      <div className="mx-auto w-full max-w-content px-6">
        <div className="rounded-2xl border border-hairline bg-raised/70 p-5 backdrop-blur-md sm:p-7 shadow-sm">
          {/* Header */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-5 border-b border-hairline">
            <div className="flex items-center gap-2.5">
              <span className="flex size-7 items-center justify-center rounded-lg bg-brand/15 text-brand">
                <Compass aria-hidden="true" className="size-4" />
              </span>
              <span className="font-mono text-micro uppercase tracking-wider text-muted font-semibold">
                {copy.badge[locale]}
              </span>
            </div>
            <p className="text-ui text-muted">
              {copy.hint[locale]}
            </p>
          </div>

          <div className="mt-5">
            <h2 id="problem-matcher-heading" className="text-ui font-semibold text-ink sm:text-h3">
              {copy.title[locale]}
            </h2>

            {/* Problem Pills List */}
            <div className="mt-4 flex flex-wrap gap-2 sm:gap-2.5" role="group" aria-label={copy.title[locale]}>
              {copy.problems.map((item) => {
                const isSelected = item.id === selectedId;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={isSelected}
                    data-brand={item.brandKey}
                    onClick={() => setSelectedId(isSelected ? null : item.id)}
                    className={[
                      // A pill while the label fits one line; on a phone the labels wrap, and a wrapped pill is a stadium.
                      "inline-flex min-h-11 items-center gap-2 rounded-full max-sm:rounded-card border px-3.5 py-2 text-left text-ui font-medium transition-all duration-200 cursor-pointer",
                      isSelected
                        ? "border-brand-text bg-brand/10 text-brand-text shadow-xs scale-[1.01]"
                        : "border-hairline bg-surface text-muted hoverable:hover:text-ink hoverable:hover:border-outline",
                    ].join(" ")}
                  >
                    <span
                      aria-hidden="true"
                      className={[
                        "size-1.5 shrink-0 rounded-full transition-colors",
                        isSelected ? "bg-brand" : "bg-muted/50",
                      ].join(" ")}
                    />
                    <span>{item.label[locale]}</span>
                  </button>
                );
              })}
            </div>

            {/* Recommendation Display Card */}
            {selected && product && (
              <div
                data-brand={selected.brandKey}
                className="mt-6 flex flex-col gap-4 rounded-xl border border-brand/25 bg-brand/5 p-4 sm:p-5 sm:flex-row sm:items-center sm:justify-between transition-all duration-300 animate-in fade-in slide-in-from-bottom-2"
              >
                <div className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand text-on-brand"
                  >
                    <Sparkles className="size-3.5" />
                  </span>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span aria-hidden="true" className="size-2 rounded-full bg-brand" />
                      <span className="font-semibold text-ui text-ink" translate="no">
                        {product.name}
                      </span>
                    </div>
                    <p className="text-ui text-ink leading-relaxed max-w-3xl">
                      {selected.recommendation[locale]}
                    </p>
                  </div>
                </div>

                <a
                  href={`#${selected.targetSlug}`}
                  className="inline-flex min-h-11 shrink-0 items-center gap-2 self-start rounded-full border border-brand-text/30 bg-surface px-4 py-2 text-ui font-medium text-brand-text shadow-xs transition-colors hoverable:hover:bg-raised no-underline sm:self-center cursor-pointer"
                >
                  <span>{copy.actionText[locale]}</span>
                  <ArrowRight aria-hidden="true" className="size-4" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
