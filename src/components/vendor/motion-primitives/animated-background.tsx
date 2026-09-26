"use client";

/**
 * Adapted from Motion-Primitives AnimatedBackground (MIT).
 * Source: https://github.com/ibelick/motion-primitives
 * The behavior is preserved, while styling stays in Dima's design system.
 */
import * as React from "react";
import { AnimatePresence, motion, type Transition } from "motion/react";

export type AnimatedBackgroundProps = {
  children:
    | React.ReactElement<any>[]
    | React.ReactElement<any>;
  defaultValue?: string;
  onValueChange?: (newActiveId: string | null) => void;
  className?: string;
  transition?: Transition;
  enableHover?: boolean;
};

export function AnimatedBackground({
  children,
  defaultValue,
  onValueChange,
  className = "",
  transition,
  enableHover = false,
}: AnimatedBackgroundProps) {
  const [activeId, setActiveId] = React.useState<string | null>(defaultValue ?? null);
  const uniqueId = React.useId();

  const setActive = React.useCallback((id: string | null) => {
    setActiveId(id);
    onValueChange?.(id);
  }, [onValueChange]);

  React.useEffect(() => {
    if (defaultValue !== undefined) setActiveId(defaultValue);
  }, [defaultValue]);

  return React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) return child;
    const id = child.props["data-id"];
    const interactionProps = enableHover
      ? { onMouseEnter: () => setActive(id), onMouseLeave: () => setActive(null) }
      : { onClick: () => setActive(id) };

    return React.cloneElement(
      child,
      {
        key: index,
        className: ["relative", child.props.className].filter(Boolean).join(" "),
        "data-checked": activeId === id ? "true" : "false",
        ...interactionProps,
      },
      <>
        <AnimatePresence initial={false}>
          {activeId === id ? (
            <motion.div
              layoutId={`dima-animated-background-${uniqueId}`}
              className={["absolute inset-0", className].join(" ")}
              transition={transition}
              initial={{ opacity: defaultValue ? 1 : 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          ) : null}
        </AnimatePresence>
        <div className="relative z-10">{child.props.children}</div>
      </>,
    );
  });
}
