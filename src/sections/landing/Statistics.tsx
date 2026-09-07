import { useRef } from "react";
import { Band } from "../../components/Canvas";
import { useScrub } from "../../motion/useScrub";
import { useReveal } from "../../motion/useReveal";
import { CountUp } from "../../motion/CountUp";
import { SplitText } from "../../motion/SplitText";
import { MediaBackdrop } from "../../components/MediaBackdrop";

type Stat = {
  label: string;
  number: string;
  suffix?: string;
  left: number;
  top: number;
};

const STATS: Stat[] = [
  { label: "DEPARTMENTS", number: "5", left: 1046, top: 132 },
  { label: "STUDENTS", number: "424", left: 1395, top: 132 },
  { label: "FACULTY", number: "60", left: 1046, top: 429 },
  { label: "RESEARCH", number: "480", suffix: "+", left: 1404, top: 429 },
  { label: "AWARDS", number: "28", suffix: "+", left: 1046, top: 717 },
  { label: "GLOBAL QS", number: "76", left: 1404, top: 717 },
];

/*
  The plate and the wordmark over it travel in opposite directions: the image
  lifts while "AI" pulls right and "COLLEGE" pulls left, so the two lines shear
  apart across the exclusion blend.
*/
const DRIFT = [
  { selector: "[data-motion=visual]", to: { y: -60, x: -40 } },
  { selector: "[data-motion=ai]", to: { x: 90 } },
  { selector: "[data-motion=college]", to: { x: -70 } },
];

const WORDMARK =
  "absolute display-type text-[200px] leading-[normal] whitespace-nowrap text-white mix-blend-exclusion";

function StatBlock({ label, number, suffix, left, top }: Stat) {
  return (
    <div
      className="absolute h-[300px] w-[460px]"
      style={{ left: `${left}px`, top: `${top}px` }}
    >
      <p className="wdth-100 absolute left-0 top-0 text-[20px] font-extrabold leading-[0.87] whitespace-nowrap text-white">
        {label}
      </p>
      <div className="absolute left-0 top-[-47px] flex items-start overflow-hidden">
        <p className="wdth-100 mr-[-20px] shrink-0 text-[230px] font-black leading-[normal] whitespace-nowrap text-white">
          <CountUp value={number} />
        </p>
        <div className="flex shrink-0 flex-col items-start overflow-hidden pt-[50px]">
          {suffix && (
            <p className="wdth-100 shrink-0 text-[64px] font-black leading-[0.87] whitespace-nowrap text-white">
              {suffix}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export function Statistics() {
  const ref = useRef<HTMLElement>(null);
  /*
    The six blocks read as one grid, so they get their own staggered reveal
    rather than the band's. The wrapper is a full-bleed, untransformed layer:
    every block keeps its exact Figma offset inside it.
  */
  const gridRef = useRef<HTMLDivElement>(null);
  useScrub(ref, DRIFT);
  useReveal(gridRef, true, { stagger: 0.08, y: 40 });

  return (
    <Band top={2160} height={1080} className="bg-black" innerRef={ref}>
      <div
        data-motion="visual"
        className="absolute left-[-1px] top-0 h-[1080px] w-[864px] -scale-x-100"
      >
        <MediaBackdrop
          video="/assets/video/stats-visual.mp4"
          poster="/assets/stats-visual.webp"
        />
      </div>

      {/* Two lines in the design, one wordmark for the reader. */}
      <h2 className="sr-only">AI College</h2>

      <SplitText
        aria-hidden="true"
        data-motion="ai"
        text="AI"
        stagger={0.09}
        className={`${WORDMARK} left-[666px] top-[646px]`}
      />
      <SplitText
        aria-hidden="true"
        data-motion="college"
        text="COLLEGE"
        stagger={0.06}
        delay={0.1}
        className={`${WORDMARK} left-[30px] top-[847px]`}
      />

      <div ref={gridRef} className="absolute inset-0">
        {STATS.map((stat) => (
          <StatBlock key={stat.label} {...stat} />
        ))}
      </div>
    </Band>
  );
}
