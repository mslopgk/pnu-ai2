import { useLayoutEffect, useRef, type CSSProperties } from "react";
import { gsap, prefersReducedMotion } from "./gsap";

/**
 * One line of oversized display type whose characters stagger into place.
 *
 * The element renders as plain text and is only split into per-character spans
 * imperatively, once the animation is actually about to run — and it is joined
 * back into plain text the moment the animation finishes. That matters for a
 * canvas built on exact Figma advance widths: `display: inline-block` per glyph
 * suppresses kerning pairs, so the split form can measure a hair wider than the
 * design. Keeping the split transient means the resting state, the
 * reduced-motion state and the first paint all use the untouched text.
 */
export function SplitText({
  text,
  className,
  style,
  /** Seconds between characters. */
  stagger = 0.045,
  /** Travel distance as a share of the glyph box. */
  yPercent = 65,
  /** Play on mount instead of on scroll — for above-the-fold lines. */
  immediate = false,
  delay = 0,
  start = "top 85%",
  ...rest
}: {
  text: string;
  className?: string;
  style?: CSSProperties;
  stagger?: number;
  yPercent?: number;
  immediate?: boolean;
  delay?: number;
  start?: string;
  "aria-hidden"?: boolean | "true" | "false";
  "data-motion"?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    const spans = Array.from(text, (char) => {
      const span = document.createElement("span");
      span.style.display = "inline-block";
      span.style.willChange = "transform, opacity";
      // A collapsed inline-block would swallow the word space.
      span.textContent = char === " " ? " " : char;
      return span;
    });

    const restore = () => {
      el.textContent = text;
    };

    el.textContent = "";
    for (const span of spans) el.appendChild(span);

    const ctx = gsap.context(() => {
      /*
        fromTo with immediateRender: false, per the project's reveal rule — the
        line stays visible until its trigger actually runs.
      */
      gsap.fromTo(
        spans,
        { opacity: 0, yPercent, filter: "blur(12px)" },
        {
          opacity: 1,
          yPercent: 0,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power3.out",
          stagger,
          delay,
          /*
            An `immediate` line has no trigger that could fail to fire, so it
            can safely pre-render its hidden state and hold it through `delay`.
            A scroll-triggered one must not: see useReveal.
          */
          immediateRender: immediate,
          onComplete: restore,
          ...(immediate
            ? {}
            : { scrollTrigger: { trigger: el, start, once: true } }),
        },
      );
    }, el);

    return () => {
      ctx.revert();
      restore();
    };
  }, [text, stagger, yPercent, immediate, delay, start]);

  return (
    <p ref={ref} className={className} style={style} {...rest}>
      {text}
    </p>
  );
}
