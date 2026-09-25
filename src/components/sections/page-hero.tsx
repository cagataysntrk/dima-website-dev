import type { CSSProperties, ReactNode } from "react";
import { Heading, Section, Stack, Text } from "@upcytech/ui";

const delay = (ms: number) => ({ "--enter-delay": `${ms}ms` }) as CSSProperties;

/**
 * The one H1 of a page, in the display face (DESIGN.md §7), with its lede and actions.
 * No kicker above the heading: the heading carries its own weight. On load the three parts
 * enter in reading order (globals.css, `animate-enter`).
 *
 * The backdrop is decoration only: a neutral dot field strongest in the top-right corner
 * with a soft veil behind the text (the home hero's language, without its WebGL). Ink, not
 * brand — inner pages stay quiet (D-029). Static CSS, so reduced motion needs no variant,
 * and reserved in normal flow, so nothing shifts.
 */
export function PageHero({ title, lede, action, size = "lg" }: {
  title: string;
  lede: string;
  action?: ReactNode;
  /** `xl` for the home page only. */
  size?: "xl" | "lg";
}) {
  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_55%_at_85%_20%,color-mix(in_oklab,var(--color-text-primary)_7%,transparent),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-text-primary)_14%,transparent)_1px,transparent_1.5px)] bg-[length:14px_14px] [mask-image:radial-gradient(70%_60%_at_85%_15%,black,transparent)]"
      />
      <Section rhythm="hero">
        <Stack gap="loose">
          <Stack>
            <Heading level={1} variant="display" size={size} className="max-w-[20ch] animate-enter break-words [overflow-wrap:anywhere]">
              {title}
            </Heading>
            <Text variant="lede" tone="muted" className="animate-enter" style={delay(90)}>{lede}</Text>
          </Stack>
          {action && <div className="flex flex-wrap gap-2 animate-enter" style={delay(180)}>{action}</div>}
        </Stack>
      </Section>
    </div>
  );
}
