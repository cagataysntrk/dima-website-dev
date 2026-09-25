import type * as React from "react";
import { Heading, Section, Stack, Text } from "@upcytech/ui";
import type { Point } from "@/content/types";
import { Reveal, RevealItem } from "../motion/reveal";

/** The story as prose: a reading column, not cards. */
export function Story({ title, paragraphs }: { title: string; paragraphs: string[] }) {
  return (
    <Section divided aria-labelledby="story-title">
      <Reveal className="grid gap-10 lg:grid-cols-12">
        <Heading level={2} variant="title" id="story-title" className="lg:col-span-4">{title}</Heading>
        <Stack className="lg:col-span-8">
          {paragraphs.map((p, i) => <Text key={i} className="text-lede">{p}</Text>)}
        </Stack>
      </Reveal>
    </Section>
  );
}

/**
 * Convictions as statements: each one a sentence a competitor could not publish while its
 * own product contradicts it, with a line of reasoning beneath.
 */
export function Beliefs({ title, items }: { title: string; items: Point[] }) {
  return (
    <Section divided aria-labelledby="beliefs-title">
      <Stack gap="loose">
        <Heading level={2} variant="title" id="beliefs-title">{title}</Heading>
        <Reveal as="ul" stagger className="grid gap-x-12 gap-y-10 md:grid-cols-2">
          {items.map((item, i) => (
            <RevealItem as="li" key={item.title} className="flex flex-col gap-3 border-t border-outline pt-5">
              <span aria-hidden="true" className="font-mono text-eyebrow text-muted tabular">
                {String(i + 1).padStart(2, "0")}
              </span>
              <Heading level={3} variant="subtitle">{item.title}</Heading>
              <Text tone="muted">{item.body}</Text>
            </RevealItem>
          ))}
        </Reveal>
      </Stack>
    </Section>
  );
}

/** Plain facts about location and working posture, as a definition list. */
export function FactList({ id, title, intro, facts }: {
  id: string;
  title: string;
  intro: string;
  facts: { label: string; value: React.ReactNode }[];
}) {
  return (
    <Section divided aria-labelledby={`${id}-title`}>
      <Reveal className="grid gap-10 lg:grid-cols-12">
        <Stack gap="tight" className="min-w-0 lg:col-span-5">
          <Heading level={2} variant="title" id={`${id}-title`}>{title}</Heading>
          <Text tone="muted">{intro}</Text>
        </Stack>
        <dl className="min-w-0 flex flex-col lg:col-span-7">
          {facts.map((fact) => (
            <div key={fact.label} className="grid gap-1 border-t border-hairline py-4 sm:grid-cols-3 sm:gap-6">
              <dt className="text-ui text-muted">{fact.label}</dt>
              <dd className="min-w-0 break-words text-ink sm:col-span-2">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Section>
  );
}
