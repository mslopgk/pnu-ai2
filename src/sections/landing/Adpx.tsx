import { useLayoutEffect, useRef } from "react";
import { Band } from "../../components/Canvas";
import { useScrub } from "../../motion/useScrub";
import { SplitText } from "../../motion/SplitText";
import { gsap, prefersReducedMotion } from "../../motion/gsap";
import { MediaBackdrop } from "../../components/MediaBackdrop";

/*
  The ink splash grows slightly while the wordmark's letter-spacing opens up,
  so the two read as one expanding gesture. The sweep is centred on the design's
  -12px tracking, which is what a reduced-motion viewer sees.
*/
const EXPAND = [
  { selector: "[data-motion=splash]", from: { scale: 0.9 }, to: { scale: 1.08 } },
  {
    selector: "[data-motion=wordmark]",
    from: { letterSpacing: "-20px" },
    to: { letterSpacing: "-4px" },
  },
];

export function Adpx() {
  const ref = useRef<HTMLElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);
  useScrub(ref, EXPAND);

  /*
    The department line reads as the rule under the wordmark, so it wipes in
    from the left rather than simply fading.
  */
  useLayoutEffect(() => {
    const el = captionRef.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, clipPath: "inset(0 100% 0 0)" },
        {
          opacity: 1,
          clipPath: "inset(0 0% 0 0)",
          duration: 1.1,
          ease: "power2.out",
          immediateRender: false,
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <Band top={3237} height={1080} className="bg-black" innerRef={ref}>
      <div
        data-motion="splash"
        className="absolute left-[259px] top-0 h-[935px] w-[1402px]"
      >
        <MediaBackdrop
          video="/assets/video/adpx-splash.mp4"
          poster="/assets/adpx-splash.webp"
        />
      </div>

      <SplitText
        data-motion="wordmark"
        text="ADP+X"
        stagger={0.07}
        yPercent={70}
        className="wdth-100 absolute left-[296px] top-[198px] text-[400px] font-bold leading-[normal] tracking-[-12px] whitespace-nowrap text-white"
      />

      <p
        ref={captionRef}
        className="wdth-100 absolute left-[388px] top-[739px] text-[32px] font-bold leading-[normal] whitespace-nowrap text-white"
      >
        AI Computing / DS &amp; Statistics / Industrial Engineering / AX
        Convergence
      </p>
    </Band>
  );
}
