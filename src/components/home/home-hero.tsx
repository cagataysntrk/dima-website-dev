import type { CSSProperties, ReactNode } from "react";
import { Section, Stack, Text } from "@upcytech/ui";
import { HeroTitle } from "@/components/home/hero-title";
import { HeroField } from "@/components/home/hero-field";

const delay = (ms: number) => ({ "--enter-delay": `${ms}ms` }) as CSSProperties;

/**
 * The home hero: headline, lede and actions over the existing Pixel Blast field, with a
 * product-specific visual to their right from lg up. The layout, spacing and performance
 * posture stay intact while the old globe is replaced by the Company Brain preview.
 *
 * Below lg the visual is left out so the headline remains the first, lightest experience.
 *
 * The text layer lets clicks through to the field — its ripples answer a click — and only the
 * headline (kinetic hover), the lede (selection) and the actions take the pointer back.
 */
export function HomeHero({ descriptor, title, accents, lede, actions, visual }: {
  descriptor: string;
  title: string;
  /** Title words set in italic, faded brand blue. */
  accents: readonly string[];
  lede: string;
  actions: ReactNode;
  visual: ReactNode;
}) {
  return (
    <div className="relative isolate -mt-(--nav-offset) flex min-h-[min(72svh,56rem)] flex-col justify-center overflow-hidden pt-(--nav-offset) sm:min-h-[min(78svh,56rem)] lg:min-h-[min(88svh,56rem)]">
      <HeroField />
      {/* Readability veil: the page ground, dense behind the text block and gone by its edges,
          so the field runs edge to edge yet no line of copy sits on busy dots. Phones centre
          it (text spans the width); wider screens hold it over the left-hand column. */}
      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-0 -z-[5]",
          "bg-[radial-gradient(95%_60%_at_50%_58%,color-mix(in_oklab,var(--color-bg-canvas)_92%,transparent)_0%,color-mix(in_oklab,var(--color-bg-canvas)_70%,transparent)_45%,transparent_80%)]",
          "md:bg-[radial-gradient(66%_64%_at_28%_56%,color-mix(in_oklab,var(--color-bg-canvas)_94%,transparent)_0%,color-mix(in_oklab,var(--color-bg-canvas)_78%,transparent)_55%,transparent_88%)]",
        ].join(" ")}
      />
      <div className="pointer-events-none">
        <Section rhythm="hero">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Stack gap="loose">
                <Stack>
                  <p className="pointer-events-auto font-mono text-micro uppercase tracking-[0.14em] text-brand-text animate-enter" style={delay(30)}>
                    {descriptor}
                  </p>
                  <div className="pointer-events-auto">
                    <HeroTitle text={title} accents={accents} />
                  </div>
                  <Text variant="lede" tone="muted" className="pointer-events-auto animate-enter" style={delay(90)}>
                    {lede}
                  </Text>
                </Stack>
                <div className="pointer-events-auto flex w-fit flex-wrap gap-2 animate-enter" style={delay(180)}>
                  {actions}
                </div>
              </Stack>
            </div>
            <div className="hidden lg:col-span-5 lg:block">
              {visual}
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
