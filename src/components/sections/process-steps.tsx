import { Heading, Section, Stack, Text } from "@upcytech/ui";
import type { Point } from "@/content/types";
import { Reveal, RevealItem } from "../motion/reveal";

/**
 * A real sequence, so it is numbered — the one case where step numbers carry information.
 * Four across on wide screens so the order reads left to right; stacked on narrow ones.
 * The steps reveal in order for the same reason they are numbered.
 */
export function ProcessSteps({ title, intro, durationLabel, steps, layout = "grid" }: {
  title: string;
  intro: string;
  durationLabel: string;
  steps: (Point & { duration: string })[];
  /** `timeline` draws the sequence as a vertical rail (hiring); `grid` keeps four across. */
  layout?: "grid" | "timeline";
}) {
  const timeline = layout === "timeline";
  return (
    <Section divided aria-labelledby="process-title">
      <Stack gap="loose">
        <Stack gap="tight" className="max-w-prose">
          <Heading level={2} variant="title" id="process-title">{title}</Heading>
          <Text tone="muted">{intro}</Text>
        </Stack>
        <Reveal as="ol" stagger className={timeline
          ? "relative ml-1 flex max-w-prose flex-col border-l border-outline pl-6"
          : "grid gap-x-6 gap-y-8 md:grid-cols-2 lg:grid-cols-4"}>
          {steps.map((step, i) => (
            <RevealItem as="li" key={step.title} className={timeline
              ? "relative flex flex-col gap-2 py-4 first:pt-0 last:pb-0"
              : "flex flex-col gap-2 border-t border-outline pt-4"}>
              {timeline && (
                <span aria-hidden="true" className={`absolute -left-[29px] ${i === 0 ? "top-[14px]" : "top-[30px]"} size-2 rounded-full bg-ink`} />
              )}
              <span aria-hidden="true" className="font-mono text-eyebrow text-muted tabular">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="font-semibold text-ink">{step.title}</p>
              <p className="leading-relaxed text-muted">{step.body}</p>
              <p className="mt-auto pt-2 font-mono text-micro uppercase text-muted">
                {durationLabel} <span aria-hidden="true" className="opacity-40">·</span> {step.duration}
              </p>
            </RevealItem>
          ))}
        </Reveal>
      </Stack>
    </Section>
  );
}
