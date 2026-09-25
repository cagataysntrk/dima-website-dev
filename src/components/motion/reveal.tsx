"use client";

/**
 * Scroll reveal, by Emil Kowalski's rules and DESIGN.md §9.
 *
 * - Low frequency: a section is revealed once per visit, so it may animate at all.
 * - Content already on screen when the page loads never animates. Hiding the hero until
 *   JavaScript runs would delay LCP and leave a blank page if the script fails. Only content
 *   that starts below the fold arms itself, then reveals when it scrolls in.
 * - transform + opacity only, the transform as a string so Motion hands it to the compositor
 *   (Motion's x/y shorthands run on the main thread). Never from scale(0).
 * - Exponential ease-out, the house curve. Stagger 60ms, within the 30–80ms band.
 * - Reduced motion keeps the fade and drops the movement: gentler, not absent.
 *
 * Motion rather than CSS scroll-driven animation (DESIGN.md §12): a view() timeline replays in
 * reverse when scrolling back up, and cannot leave initially visible content untouched.
 */
import * as React from "react";
import { domAnimation, LazyMotion, m, useInView, useReducedMotion, type Variants } from "motion/react";

/** --upcytech-ease-out. Motion cannot read a CSS variable. */
const EASE_OUT = [0.23, 1, 0.32, 1] as const;
const DISTANCE = 12;

const TAGS = { div: m.div, ol: m.ol, ul: m.ul, li: m.li } as const;
type Tag = keyof typeof TAGS;

const item = (still: boolean): Variants => ({
  // Hiding happens off-screen, so it is instant.
  hidden: { opacity: 0, transform: `translateY(${still ? 0 : DISTANCE}px)`, transition: { duration: 0 } },
  shown: { opacity: 1, transform: "translateY(0px)", transition: { duration: 0.5, ease: EASE_OUT } },
});

const group: Variants = {
  hidden: { transition: { duration: 0 } },
  shown: { transition: { staggerChildren: 0.06 } },
};

interface RevealProps extends React.HTMLAttributes<HTMLElement> {
  as?: Tag;
  /** Reveal children one after another. Children must be <RevealItem>. */
  stagger?: boolean;
}

export function Reveal({ as = "div", stagger = false, children, ...props }: RevealProps) {
  const ref = React.useRef<HTMLElement>(null);
  const still = useReducedMotion() ?? false;
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  // Armed only when the element starts below the fold; otherwise it is simply shown.
  const [armed, setArmed] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (el && el.getBoundingClientRect().top > window.innerHeight) setArmed(true);
  }, []);

  const Component = TAGS[as] as React.ElementType;
  return (
    <LazyMotion features={domAnimation} strict>
      <Component
        ref={ref}
        initial={false}
        animate={!armed || inView ? "shown" : "hidden"}
        variants={stagger ? group : item(still)}
        {...props}
      >
        {children}
      </Component>
    </LazyMotion>
  );
}

interface RevealItemProps extends React.HTMLAttributes<HTMLElement> {
  as?: Tag;
}

/** One step of a staggered <Reveal>. Inherits its parent's state; animates on its own turn. */
export function RevealItem({ as = "div", children, ...props }: RevealItemProps) {
  const still = useReducedMotion() ?? false;
  const Component = TAGS[as] as React.ElementType;
  return (
    <Component variants={item(still)} {...props}>
      {children}
    </Component>
  );
}
