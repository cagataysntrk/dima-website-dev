/**
 * Magic UI "Bento Grid" — MIT, https://magicui.design/r/bento-grid. Adapted:
 * - tokens instead of neutral-* and raw shadows: surface, hairline border, brand-text icon;
 *   the panel radius family (1.25× panel) like the rest of the home page's cards;
 * - lucide's arrow instead of @radix-ui/react-icons (one icon set per site);
 * - the whole card is the link (the CTA's ::after stretches over it), so the hit area is the
 *   card, not a small hover-only line; the CTA text slides in on hover on desktop, shows on
 *   keyboard focus, and is always visible on touch;
 * - one column on phones, three from md; the heading level is the host's (h3 under a section h2).
 */
import type { ElementType, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@upcytech/ui";

/** Rows are at least 19rem but grow with their content — a fixed height let wrapped content
 *  collide on phones. */
export function BentoGrid({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("grid w-full auto-rows-[minmax(19rem,auto)] grid-cols-1 gap-4 md:grid-cols-3", className)}>{children}</div>;
}

export function BentoCard({ name, className, background, top, Icon, description, href, cta }: {
  name: string;
  className?: string;
  /** Decoration behind the card, out of the flow. */
  background?: ReactNode;
  /** Content at the card's top, in the flow — it pushes the text down instead of covering it. */
  top?: ReactNode;
  Icon: ElementType;
  description: string;
  href: string;
  cta: string;
}) {
  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-[calc(var(--radius-panel)*1.25)] border border-hairline bg-surface",
        "transition-colors duration-300 ease-out-expo hoverable:hover:border-outline",
        className,
      )}
    >
      {background && <div aria-hidden="true" className="pointer-events-none absolute inset-0">{background}</div>}
      {top ? <div className="relative z-10 p-6 pb-0">{top}</div> : <div aria-hidden="true" />}

      <div className="relative z-10 p-6">
        <div className="pointer-events-none flex transform-gpu flex-col gap-1.5 transition-transform duration-300 ease-out-expo lg:group-hover:-translate-y-8 lg:group-focus-within:-translate-y-8">
          <Icon aria-hidden="true" className="size-10 origin-left text-brand-text transition-transform duration-300 ease-out-expo lg:group-hover:scale-75 lg:group-focus-within:scale-75" />
          <h3 className="mt-2 font-title text-subtitle font-semibold text-ink">{name}</h3>
          <p className="max-w-lg text-ui leading-relaxed text-muted">{description}</p>
        </div>
        <a
          href={href}
          className={cn(
            "mt-4 inline-flex items-center gap-1.5 text-ui font-medium text-brand-text no-underline pointer-coarse:min-h-11",
            "after:absolute after:inset-0 after:content-['']",
            "lg:absolute lg:bottom-6 lg:left-6 lg:mt-0 lg:translate-y-2 lg:opacity-0",
            "lg:transition-[opacity,transform] lg:duration-300 lg:ease-out-expo",
            "lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:focus-visible:translate-y-0 lg:focus-visible:opacity-100",
          )}
        >
          {cta}
          <ArrowRight aria-hidden="true" className="size-4" />
        </a>
      </div>
    </div>
  );
}
