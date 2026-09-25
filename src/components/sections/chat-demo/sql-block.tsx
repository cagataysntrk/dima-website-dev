"use client";

import * as React from "react";
import { ChevronRight } from "lucide-react";

/**
 * The query under an answer, as the product shows it (its packages/ui report/SqlBlock.tsx):
 * a quiet "show query" toggle, then the SQL with a sticky line-number gutter and token colours
 * — keywords in the brand, functions, strings and numbers each in a chart colour. Here the
 * chart colours are the other product brands' text tokens, scoped with data-brand.
 */
const KEYWORDS = new Set(["SELECT", "FROM", "JOIN", "ON", "WHERE", "AND", "OR", "GROUP", "BY", "ORDER", "DESC", "ASC", "LIMIT", "AS", "INTERVAL", "DATE", "CURRENT_DATE", "NOT", "NULL", "IN", "IS", "CASE", "WHEN", "THEN", "ELSE", "END", "FALSE", "TRUE"]);

type Kind = "keyword" | "function" | "string" | "number" | "punct" | "ident" | "space";

function tokenize(line: string): { kind: Kind; text: string }[] {
  const out: { kind: Kind; text: string }[] = [];
  const re = /('[^']*')|(\d+(?:\.\d+)?(?:e\d+)?)|([A-Za-z_ğüşıöçĞÜŞİÖÇ][\wğüşıöçĞÜŞİÖÇ.]*)(\s*\()?|(\s+)|(.)/gu;
  for (const m of line.matchAll(re)) {
    if (m[1]) out.push({ kind: "string", text: m[1] });
    else if (m[2]) out.push({ kind: "number", text: m[2] });
    else if (m[3]) {
      const word = m[3];
      if (m[4]) out.push({ kind: "function", text: word }, { kind: "punct", text: m[4] });
      else out.push({ kind: KEYWORDS.has(word.toUpperCase()) ? "keyword" : "ident", text: word });
    } else if (m[5]) out.push({ kind: "space", text: m[5] });
    else out.push({ kind: "punct", text: m[6]! });
  }
  return out;
}

/** Brand scopes standing in for the product's chart palette. */
const TOKEN: Record<Kind, { className: string; brand?: string }> = {
  keyword: { className: "font-medium text-brand-text" },
  function: { className: "text-brand-text", brand: "upcyops" },
  string: { className: "text-brand-text", brand: "upcyman" },
  number: { className: "text-brand-text", brand: "upcycarbon" },
  punct: { className: "text-muted" },
  ident: { className: "text-ink" },
  space: { className: "" },
};

export function SqlBlock({ sql, label }: { sql: string; label: string }) {
  const [open, setOpen] = React.useState(false);
  const lines = React.useMemo(() => sql.split("\n").map(tokenize), [sql]);
  return (
    <div>
      <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open}
              className="group flex cursor-pointer items-center gap-1 text-xs text-muted transition-colors hoverable:hover:text-ink pointer-coarse:min-h-11">
        <ChevronRight aria-hidden="true" className={`size-3.5 transition-transform duration-160 ${open ? "rotate-90" : ""}`} />
        {label}
      </button>
      {open && (
        <div className="mt-2 overflow-x-auto rounded-lg border border-hairline bg-[color-mix(in_oklab,var(--dima-muted)_40%,transparent)]">
          <pre className="py-2 font-mono text-[12px] leading-relaxed">
            <code>
              {lines.map((tokens, i) => (
                <span key={i} className="flex">
                  <span aria-hidden="true" className="sticky left-0 w-10 shrink-0 border-r border-hairline bg-[color-mix(in_oklab,var(--dima-muted)_85%,transparent)] pr-3 text-right text-[color-mix(in_oklab,var(--color-text-muted)_60%,transparent)] backdrop-blur-md select-none">
                    {i + 1}
                  </span>
                  <span className="pr-4 pl-3 whitespace-pre">
                    {tokens.map((t, j) => (
                      <span key={j} data-brand={TOKEN[t.kind].brand} className={TOKEN[t.kind].className}>{t.text}</span>
                    ))}
                  </span>
                </span>
              ))}
            </code>
          </pre>
        </div>
      )}
    </div>
  );
}
