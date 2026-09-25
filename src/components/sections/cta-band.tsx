import type { ReactNode } from "react";
import { Reveal } from "../motion/reveal";
import { BorderBeam } from "../vendor/magicui/border-beam";
import { AnimatedShinyText } from "../vendor/magicui/animated-shiny-text";
import { CtaParticles } from "./cta-particles";

/**
 * The page's closing call to action, just above the footer — after upcyman.com's CTASection:
 * a card over the landscape painting, a light travelling its border (Magic UI BorderBeam),
 * particles inside it, a soft brand glow, the headline centred, the subhead with a passing
 * shine (AnimatedShinyText), and the rainbow CTA. Brand blue where the sister site has green.
 *
 * Its copy stays each page's own — the intent differs per page (brief §6); the sister site's
 * free-trial badge has no counterpart here.
 *
 * The painting is decorative (empty alt), lazy, and sized per screen from three WebP widths;
 * dimmed on the dark theme (globals.css, .cta-art). Motion — beam, particles, shine — stops
 * under reduced motion.
 */
export function CtaBand({ id, title, body, action }: {
  id?: string;
  title: string;
  body: string;
  action: ReactNode;
}) {
  const titleId = id ? `${id}-title` : undefined;
  return (
    <section id={id} aria-labelledby={titleId} className="relative isolate overflow-hidden py-16 sm:py-24 lg:py-32">
      <img
        src="/cta/landscape-1280.webp"
        srcSet="/cta/landscape-768.webp 768w, /cta/landscape-1280.webp 1280w, /cta/landscape-1920.webp 1920w"
        sizes="100vw"
        alt=""
        width={1920}
        height={1076}
        loading="lazy"
        decoding="async"
        className="cta-art absolute inset-0 -z-10 size-full object-cover object-center"
      />
      <div className="mx-auto w-full max-w-content px-4 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[calc(var(--radius-panel)*1.5)] border border-hairline bg-raised">
            <BorderBeam
              size={300}
              duration={12}
              borderWidth={1.5}
              colorFrom="var(--color-text-brand)"
              colorTo="color-mix(in oklab, var(--color-text-brand) 45%, transparent)"
            />
            <CtaParticles />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,color-mix(in_oklab,var(--color-text-brand)_16%,transparent),transparent_60%),radial-gradient(60%_40%_at_80%_100%,color-mix(in_oklab,var(--color-text-brand)_8%,transparent),transparent_70%)]"
            />
            <div className="relative px-5 py-14 text-center sm:px-12 sm:py-20 lg:px-16 lg:py-24">
              <h2 id={titleId} className="mx-auto max-w-2xl font-title text-title font-semibold text-balance text-ink sm:text-display-md">
                {title}
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-balance">
                <AnimatedShinyText shimmerWidth={120}>{body}</AnimatedShinyText>
              </p>
              {/* Stacked on a phone: one width for every action, and room for the rainbow's glow
                  under the first so it does not wash over the next. */}
              <div className="mt-10 flex flex-col items-center gap-5 sm:flex-row sm:justify-center sm:gap-3 max-sm:[&>*]:w-full max-sm:[&>*]:max-w-xs">{action}</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
