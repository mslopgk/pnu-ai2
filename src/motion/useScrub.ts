import { useLayoutEffect, type RefObject } from "react";
import { gsap, prefersReducedMotion } from "./gsap";

type ScrubTarget = {
  /** CSS selector, scoped to the section element. */
  selector: string;
  from?: gsap.TweenVars;
  to: gsap.TweenVars;
};

/**
 * Scroll-scrubbed movement inside one section.
 *
 * Deliberately no `pin`: the page canvas carries a `transform: scale()`, and
 * ScrollTrigger's pinning misplaces elements inside a transformed ancestor.
 * Scrubbed transforms are unaffected.
 */
export function useScrub(
  ref: RefObject<HTMLElement | null>,
  targets: ScrubTarget[],
  { start = "top bottom", end = "bottom top" } = {},
) {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      for (const { selector, from, to } of targets) {
        const nodes = el.querySelectorAll(selector);
        if (nodes.length === 0) continue;

        const scrollTrigger = { trigger: el, start, end, scrub: 0.6 };
        if (from) {
          gsap.fromTo(nodes, from, { ...to, ease: "none", scrollTrigger });
        } else {
          gsap.to(nodes, { ...to, ease: "none", scrollTrigger });
        }
      }
    }, el);

    return () => ctx.revert();
    // `targets` is authored as a module-level constant at every call site.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, start, end]);
}
