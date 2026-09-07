import { useLayoutEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "./gsap";

/**
 * Counts an integer up when it scrolls into view. Renders the final value as
 * its initial text so the number is correct before (and without) animation.
 */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    const target = Number(value);
    if (!Number.isFinite(target)) return;

    const ctx = gsap.context(() => {
      const counter = { n: 0 };
      gsap.to(counter, {
        n: target,
        duration: 1.4,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = String(Math.round(counter.n));
        },
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    }, el);

    return () => {
      ctx.revert();
      el.textContent = value;
    };
  }, [value]);

  return <span ref={ref}>{value}</span>;
}
