import type { CSSProperties, ReactNode } from "react";
import { Heading, Section, Stack, Text } from "@upcytech/ui";

const delay = (ms: number) => ({ "--enter-delay": `${ms}ms` }) as CSSProperties;

/**
 * Quiet editorial hero for inner pages.
 *
 * The previous dot field repeated the old AI-marketing language. Inner pages now use scale,
 * whitespace and one restrained brand wash, leaving product surfaces below to carry detail.
 */
export function PageHero({ title, lede, action, size = "lg" }: {
  title: string;
  lede: string;
  action?: ReactNode;
  size?: "xl" | "lg";
}) {
  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full bg-[radial-gradient(55%_70%_at_82%_18%,color-mix(in_oklab,var(--color-text-brand)_7%,transparent),transparent_76%)]"
      />
      <Section rhythm="hero" width="wide" responsive className="pb-16! pt-20! sm:pb-20! sm:pt-24! lg:pb-24! lg:pt-28!">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Stack gap="tight" className="lg:col-span-8">
            <Heading
              level={1}
              variant="display"
              size={size}
              className="max-w-[16ch] animate-enter break-words [overflow-wrap:anywhere] [text-wrap:balance]"
            >
              {title}
            </Heading>
            <Text
              variant="lede"
              tone="muted"
              className="max-w-3xl animate-enter"
              style={delay(80)}
            >
              {lede}
            </Text>
          </Stack>
          {action ? (
            <div className="flex flex-wrap gap-2 animate-enter lg:col-span-4 lg:justify-self-end" style={delay(140)}>
              {action}
            </div>
          ) : null}
        </div>
      </Section>
    </div>
  );
}
