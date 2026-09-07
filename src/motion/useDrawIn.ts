import { useLayoutEffect, type RefObject } from "react";
import { gsap, prefersReducedMotion } from "./gsap";

export type DrawInOptions = {
  /** `x` for horizontal rules, `y` for vertical rails. */
  axis?: "x" | "y";
  /** CSS transform-origin the rule grows out of. */
  origin?: string;
  stagger?: number;
  duration?: number;
  start?: string;
  /**
   * Whether the collapsed state is painted before the trigger fires. Default
   * `true`: the rule is already at zero when it scrolls into view, so the draw
   * reads as a wipe rather than a snap. Pass `false` when a target must never
   * be left collapsed by a trigger that does not run.
   */
  immediateRender?: boolean;
};

/**
 * Draws rules, dividers and connector rails in from nothing as their section
 * arrives — scale 0 -> 1 along one axis, staggered.
 *
 * Only ever point this at a decorative line. Scaling a filled panel that
 * contains text squashes the text for the length of the tween; give such a
 * panel an inset fill child and animate that instead.
 */
export function useDrawIn(
  ref: RefObject<HTMLElement | null>,
  selector: string,
  {
    axis = "x",
    origin = "left top",
    stagger = 0.06,
    duration = 0.7,
    start = "top 85%",
    immediateRender = true,
  }: DrawInOptions = {},
) {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const nodes = el.querySelectorAll(selector);
      if (nodes.length === 0) return;

      const prop = axis === "x" ? "scaleX" : "scaleY";
      /*
        `transformOrigin` belongs in the from-vars: an origin declared only in
        the to-vars is not applied until the tween starts, so the collapsed
        rule would sit on its default centre origin until then.
      */
      gsap.fromTo(
        nodes,
        { [prop]: 0, transformOrigin: origin },
        {
          [prop]: 1,
          duration,
          ease: "power2.out",
          stagger,
          immediateRender,
          scrollTrigger: { trigger: el, start, once: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [ref, selector, axis, origin, stagger, duration, start, immediateRender]);
}
