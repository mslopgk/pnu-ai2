import { useLayoutEffect, useRef } from "react";
import { Band } from "../../components/Canvas";
import { useScrub } from "../../motion/useScrub";
import { SplitText } from "../../motion/SplitText";
import { gsap, prefersReducedMotion } from "../../motion/gsap";
import { MediaBackdrop } from "../../components/MediaBackdrop";

/*
  The robot and the two headline lines drift at different speeds, so the
  portrait slides behind the type as the hero leaves the viewport.
*/
const PARALLAX = [
  { selector: "[data-motion=portrait]", to: { y: 120 } },
  { selector: "[data-motion=line1]", to: { y: -70 } },
  { selector: "[data-motion=line2]", to: { y: -140 } },
];

const LINE =
  "absolute display-type text-[250px] leading-[normal] whitespace-nowrap text-white";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  useScrub(ref, PARALLAX, { start: "top top", end: "bottom top" });

  /*
    The hero is above the fold, so its entrance plays on mount rather than on a
    scroll trigger: the portrait settles down out of a slight zoom while the two
    headline lines type themselves in around it.

    Scale only — deliberately no opacity fade. A timed tween that starts at
    opacity 0 leaves the robot invisible for as long as the ticker is stalled
    (a tab opened in the background, a throttled rAF), and this one carries the
    whole hero image. Stalling at scale 1.06 is imperceptible; stalling at
    opacity 0 is a blank hero.
  */
  useLayoutEffect(() => {
    const el = portraitRef.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scale: 1.06 },
        { scale: 1, duration: 1.4, ease: "power3.out" },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <Band top={0} height={1080} className="bg-hero-bg" innerRef={ref}>
      {/*
        Figma's layer order — "Intelligence," behind the robot, "Reimagined."
        in front — only works while the robot is a cut-out. The clip is a VP9
        WebM with a real alpha channel for exactly that reason; an opaque
        rectangle here would erase the middle of the first line.
      */}
      {/* Split across two lines in the design; one heading for the reader. */}
      <h1 className="sr-only">Intelligence, Reimagined.</h1>

      <SplitText
        aria-hidden="true"
        data-motion="line1"
        text="Intelligence,"
        immediate
        delay={0.15}
        stagger={0.04}
        className={`${LINE} left-[77px] top-[461px]`}
      />

      <div
        ref={portraitRef}
        data-motion="portrait"
        className="absolute left-[450px] top-[32px] size-[1056px]"
      >
        <MediaBackdrop
          alpha
          video="/assets/video/hero-portrait.webm"
          poster="/assets/hero-portrait.webp"
        />
      </div>

      <SplitText
        aria-hidden="true"
        data-motion="line2"
        text="Reimagined."
        immediate
        delay={0.45}
        stagger={0.04}
        className={`${LINE} left-[627px] top-[658px]`}
      />
    </Band>
  );
}
