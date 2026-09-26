import type { CSSProperties, ReactNode } from "react";
import { Section, Stack, Text } from "@upcytech/ui";
import { HeroTitle } from "@/components/home/hero-title";

const delay = (ms: number) => ({ "--enter-delay": `${ms}ms` }) as CSSProperties;

/**
 * Product-first home hero.
 *
 * The previous full-screen particle field and floating product card made the page read like a
 * generic AI landing page. This composition keeps the opening editorial and lets the product
 * itself carry the visual weight.
 */
export function HomeHero({ descriptor, title, accents, lede, actions, visual }: {
  descriptor: string;
  title: string;
  accents: readonly string[];
  lede: string;
  actions: ReactNode;
  visual: ReactNode;
}) {
  return (
    <div className="relative isolate -mt-(--nav-offset) overflow-hidden pt-(--nav-offset)">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[72%] bg-[radial-gradient(70%_70%_at_78%_36%,color-mix(in_oklab,var(--color-text-brand)_9%,transparent),transparent_74%)]"
      />
      <Section rhythm="hero" width="wide" responsive className="pb-16! pt-20! sm:pb-20! sm:pt-24! lg:pb-24! lg:pt-28!">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8 xl:gap-12">
          <div className="lg:col-span-5 xl:col-span-5">
            <Stack gap="loose">
              <Stack gap="tight">
                <p
                  className="font-mono text-micro uppercase tracking-[0.14em] text-brand-text animate-enter"
                  style={delay(30)}
                >
                  {descriptor}
                </p>
                <HeroTitle text={title || descriptor} accents={accents ?? []} />
                <Text
                  variant="lede"
                  tone="muted"
                  className="max-w-[46rem] text-balance animate-enter"
                  style={delay(90)}
                >
                  {lede}
                </Text>
              </Stack>
              <div className="flex w-fit flex-wrap gap-2 animate-enter" style={delay(160)}>
                {actions}
              </div>
            </Stack>
          </div>

          <div className="lg:col-span-7 xl:col-span-7 lg:translate-x-4 xl:translate-x-8">
            {visual}
          </div>
        </div>
      </Section>
    </div>
  );
}
