/**
 * The result chart, drawn to match the product's Recharts output (its packages/ui chart/
 * Chart.tsx) without shipping Recharts (D-040): a 16:10 box, horizontal grid lines only at 60%,
 * 11px muted ticks with no axis or tick lines, a 48px Y gutter, single-series bars at most 48px
 * wide with a 5px top radius (horizontal: 26px, 4px right radius), a 2px monotone-looking line,
 * all in the product's chart-1 blue (--dima-chart). The chart is an image with a name; the
 * table view is its accessible twin.
 */
export interface ChartRow { label: string; value: number; display: string }
export type ChartKind = "bar" | "hbar" | "line";

/**
 * Recharts-like "nice" ticks from zero: the smallest step of 1, 2, 2.5 or 5 × 10ⁿ that needs at
 * most six ticks — so the top tick sits just above the largest value (78.4 → 80, 468 → 500).
 */
export function niceTicks(max: number) {
  const value = max > 0 ? max : 1;
  const mag = 10 ** Math.floor(Math.log10(value / 5));
  const step = [1, 2, 2.5, 5, 10, 20, 25, 50].map((m) => m * mag).find((s) => Math.ceil(value / s) + 1 <= 6)!;
  const top = Math.ceil(value / step) * step;
  return Array.from({ length: Math.round(top / step) + 1 }, (_, i) => Number((i * step).toFixed(6)));
}

export function PocChart({ kind, rows, label, tick }: {
  kind: ChartKind;
  rows: ChartRow[];
  label: string;
  /** Formats an axis value in the result's unit ("%80", "400 ton"). */
  tick: (value: number) => string;
}) {
  const ticks = niceTicks(Math.max(...rows.map((r) => r.value)));
  const top = ticks.at(-1)!;
  return (
    <div role="img" aria-label={label} className="@container flex aspect-[16/10] w-full flex-col text-[11px] text-muted">
      {kind === "hbar" ? <HBars rows={rows} ticks={ticks} top={top} tick={tick} /> : <Columns kind={kind} rows={rows} ticks={ticks} top={top} tick={tick} />}
    </div>
  );
}

function Columns({ kind, rows, ticks, top, tick }: { kind: "bar" | "line"; rows: ChartRow[]; ticks: number[]; top: number; tick: (v: number) => string }) {
  const pct = (v: number) => (v / top) * 100;
  // Points sit at the centre of each band, as Recharts places a category.
  const x = (i: number) => ((i + 0.5) / rows.length) * 100;
  return (
    <>
      <div aria-hidden="true" className="relative mt-2 mr-3 flex min-h-0 flex-1">
        <div className="relative w-12 shrink-0">
          {ticks.map((t) => (
            <span key={t} className="absolute right-2 translate-y-1/2 tabular-nums" style={{ bottom: `${pct(t)}%` }}>{tick(t)}</span>
          ))}
        </div>
        <div className="relative flex-1">
          {ticks.map((t) => (
            <span key={t} className="absolute inset-x-0 border-t border-[color-mix(in_oklab,var(--color-border-subtle)_60%,transparent)]" style={{ bottom: `${pct(t)}%` }} />
          ))}
          {kind === "bar" ? (
            <div className="absolute inset-0 flex items-end">
              {rows.map((r) => (
                <div key={r.label} className="flex h-full flex-1 items-end justify-center px-[5%]">
                  <div className="w-full max-w-12 rounded-t-[5px] bg-[var(--dima-chart)]" style={{ height: `${pct(r.value)}%` }} />
                </div>
              ))}
            </div>
          ) : (
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full overflow-visible text-[var(--dima-chart)]">
              <path
                d={smooth(rows.map((r, i) => [x(i), 100 - pct(r.value)]))}
                fill="none" stroke="currentColor" strokeWidth={2} vectorEffect="non-scaling-stroke" strokeLinejoin="round" strokeLinecap="round"
              />
            </svg>
          )}
        </div>
      </div>
      <div aria-hidden="true" className="mr-3 ml-12 flex pt-2">
        {rows.map((r) => (
          <span key={r.label} className="min-w-0 flex-1 truncate px-0.5 text-center">{r.label}</span>
        ))}
      </div>
    </>
  );
}

function HBars({ rows, ticks, top, tick }: { rows: ChartRow[]; ticks: number[]; top: number; tick: (v: number) => string }) {
  const pct = (v: number) => (v / top) * 100;
  return (
    <>
      <div aria-hidden="true" className="relative mt-2 mr-3 flex min-h-0 flex-1">
        <div className="flex w-24 shrink-0 flex-col">
          {rows.map((r) => (
            <span key={r.label} className="flex min-h-0 flex-1 items-center justify-end truncate pr-2">{r.label}</span>
          ))}
        </div>
        <div className="relative flex-1">
          {ticks.map((t) => (
            <span key={t} className="absolute inset-y-0 border-l border-[color-mix(in_oklab,var(--color-border-subtle)_60%,transparent)]" style={{ left: `${pct(t)}%` }} />
          ))}
          <div className="absolute inset-0 flex flex-col">
            {rows.map((r) => (
              <div key={r.label} className="flex min-h-0 flex-1 items-center">
                <div className="h-[70%] max-h-[26px] rounded-r-[4px] bg-[var(--dima-chart)]" style={{ width: `${pct(r.value)}%` }} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="relative mr-3 ml-24 h-5 pt-2">
        {ticks.map((t) => (
          <span key={t} className="absolute -translate-x-1/2 tabular-nums" style={{ left: `${pct(t)}%` }}>{tick(t)}</span>
        ))}
      </div>
    </>
  );
}

/** A monotone-looking curve through the points (Catmull-Rom as cubic Béziers, tension ½). */
function smooth(points: [number, number][]) {
  if (points.length < 2) return "";
  let d = `M${points[0]![0]},${points[0]![1]}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i]!, p1 = points[i]!, p2 = points[i + 1]!, p3 = points[i + 2] ?? p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0]},${c1[1]} ${c2[0]},${c2[1]} ${p2[0]},${p2[1]}`;
  }
  return d;
}
