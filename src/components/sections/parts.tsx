import type { ReactNode } from "react";
import { Heading, Stack } from "@upcytech/ui";
import type { Point } from "@/content/types";

/** One labelled part of a section: "The problem", "What it does", "Where the pressure comes from". */
export function Part({ id, title, children }: { id?: string; title: string; children: ReactNode }) {
  return (
    <Stack gap="tight" id={id} className="scroll-mt-24">
      <Heading level={3} variant="subheading">{title}</Heading>
      {children}
    </Stack>
  );
}

/** Title-and-body points separated by hairlines. Numbered only when the order is real. */
export function PointList({ points, ordered = false }: { points: Point[]; ordered?: boolean }) {
  const List = ordered ? "ol" : "ul";
  return (
    <List className="flex flex-col gap-4">
      {points.map((point, i) => (
        <li key={i} className="flex gap-3 border-t border-hairline pt-4">
          {ordered && (
            <span aria-hidden="true" className="font-mono text-eyebrow text-muted tabular">
              {String(i + 1).padStart(2, "0")}
            </span>
          )}
          <div className="flex flex-col gap-1">
            <p className="font-medium text-ink">{point.title}</p>
            <p className="max-w-prose leading-relaxed text-muted">{point.body}</p>
          </div>
        </li>
      ))}
    </List>
  );
}

/**
 * A comparison table's phone layout: each row a block — its name, then each column as a
 * label over its value. Rendered below `sm` in place of the table (which is `hidden sm:block`),
 * so only one of the two is ever in the accessibility tree; the table keeps its semantics where
 * it has room, and a phone reads whole sentences instead of a side-scrolling, faded grid.
 */
export function StackedRows({ caption, captionHidden = false, rows }: {
  caption: string;
  captionHidden?: boolean;
  rows: { key: string; head: ReactNode; brand?: string; cells: { label: string; value: ReactNode; muted?: boolean }[] }[];
}) {
  return (
    <div className="sm:hidden">
      <p className={captionHidden ? "sr-only" : "pb-3 text-ui text-muted"}>{caption}</p>
      <ul className="border-t border-hairline">
        {rows.map((row) => (
          <li key={row.key} data-brand={row.brand} className="border-b border-hairline py-5">
            <div className="font-semibold text-ink">{row.head}</div>
            <dl className="mt-3 space-y-3">
              {row.cells.map((cell) => (
                <div key={cell.label}>
                  <dt className="font-mono text-eyebrow uppercase text-muted">{cell.label}</dt>
                  <dd className={`mt-1 text-ui leading-relaxed ${cell.muted ? "text-muted" : "text-ink"}`}>{cell.value}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
    </div>
  );
}
