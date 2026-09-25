import type { Point } from "@/content/types";
import { Reveal, RevealItem } from "../motion/reveal";

/**
 * A staged process drawn as a flow: a vertical rail with a node per step. Numbers carry the
 * order; the rail carries the direction. Vertical at every width: it lives in a product
 * block's 7/12 column, where four steps side by side got ~150px each — bodies of 10+ lines and
 * nodes touching their numbers. Static CSS beyond the shared Reveal — nothing to reduce.
 */
export function WorkflowFlow({ steps }: { steps: Point[] }) {
  return (
    <Reveal
      as="ol"
      stagger
      className={[
        "relative ml-1 border-l border-outline pl-6",
        "flex max-w-prose flex-col",
      ].join(" ")}
    >
      {steps.map((step, i) => (
        <RevealItem
          as="li"
          key={step.title}
          className="relative flex flex-col gap-1.5 py-4 first:pt-0 last:pb-0"
        >
          <span
            aria-hidden="true"
            className={`absolute -left-[29px] ${i === 0 ? "top-[14px]" : "top-[30px]"} size-2 rounded-full bg-ink`}
          />
          <span aria-hidden="true" className="font-mono text-eyebrow text-muted tabular">
            {String(i + 1).padStart(2, "0")}
          </span>
          <p className="font-medium text-ink">{step.title}</p>
          <p className="leading-relaxed text-muted">{step.body}</p>
        </RevealItem>
      ))}
    </Reveal>
  );
}
