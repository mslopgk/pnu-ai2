import { useLayoutEffect, type RefObject } from "react";
import { gsap, prefersReducedMotion } from "./gsap";

export type RevealOptions = {
  /** Seconds between each child. */
  stagger?: number;
  /** Travel distance in design px. */
  y?: number;
};

/**
 * Fades a section's direct children up as it scrolls into view.
 *
 * Children are animated rather than the section itself: sections are
 * absolutely positioned bands, so transforming one would move it off its
 * Figma coordinate. Their children are absolutely positioned too, and a
 * transform on those is purely visual.
 */
export function useReveal(
  ref: RefObject<HTMLElement | null>,
  enabled: boolean,
  { stagger = 0.05, y = 24 }: RevealOptions = {},
) {
  useLayoutEffect(() => {
    if (!enabled) return;

    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    const targets = Array.from(el.children);
    if (targets.length === 0) return;

    const ctx = gsap.context(() => {
      /*
        fromTo with immediateRender: false, not from(). `from` hides the
        children the moment the tween is built, so anything whose trigger never
        fires — a mis-measured offset, a refresh that races a route change —
        would stay invisible. This way the section renders normally until the
        trigger actually runs.
      */
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          stagger,
          immediateRender: false,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [ref, enabled, stagger, y]);
}
