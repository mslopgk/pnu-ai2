import { useRef } from "react";
import { Band } from "../../components/Canvas";
import { useReveal } from "../../motion/useReveal";
import { useScrub } from "../../motion/useScrub";
import { CountUp } from "../../motion/CountUp";
import { Cta } from "../../components/Cta";
import { MediaBackdrop } from "../../components/MediaBackdrop";

const STEPS = [
  { index: "01", title: "AI 특화 Pathway", left: 117, active: true },
  { index: "02", title: "AX1000 · 100 · 10", left: 679, active: false },
  { index: "03", title: "AI Lab to Start-Up", left: 1241, active: false },
];

/**
 * A display headline split into letters so they can reveal one after another.
 * Each letter is inline-block, which is what lets it be transformed.
 */
function SplitChars({
  text,
  className,
  motion,
  stagger = 0.06,
}: {
  text: string;
  className: string;
  /** Value for the `data-motion` hook the section's scrub config targets. */
  motion?: string;
  stagger?: number;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  useReveal(ref, true, { stagger, y: 40 });

  return (
    <p ref={ref} data-motion={motion} className={className}>
      {Array.from(text).map((ch, i) => (
        <span key={`${ch}-${i}`} className="inline-block">
          {ch === " " ? " " : ch}
        </span>
      ))}
    </p>
  );
}

/* The rail draws itself left-to-right across the section. */
const DRAW = [
  {
    selector: "[data-motion=rail]",
    from: { scaleX: 0, transformOrigin: "left center" },
    to: { scaleX: 1 },
  },
];

/* Artwork and display type slide past each other. */
const DRIFT = [
  { selector: "[data-motion=visual]", to: { x: -80 } },
  { selector: "[data-motion=display]", to: { x: 55 } },
];

export function Growth() {
  const ref = useRef<HTMLElement>(null);
  useScrub(ref, DRAW, { start: "top 75%", end: "center center" });
  useScrub(ref, DRIFT);

  return (
    <Band
      top={7263}
      height={1080}
      className="bg-black"
      innerRef={ref}
      reveal={{ stagger: 0.06 }}
    >
      {/*
        Figma leaves an empty `image 1` placeholder spanning this section and
        the whole middle of the band is blank as a result. The artwork fills
        that gap and carries the eye from BEYOND across to AI; it is generated
        on pure black, so it meets the band with no seam.

        It is the band's first child so it paints behind every line of type:
        it drifts left while the display type drifts right, and the two would
        otherwise converge far enough for the clip to cover the tail of
        "BEYOND".
      */}
      <div
        data-motion="visual"
        className="absolute left-[700px] top-[112px] h-[495px] w-[990px]"
      >
        <MediaBackdrop
          video="/assets/video/growth-beyond.mp4"
          poster="/assets/growth-beyond.webp"
        />
      </div>

      <p className="wdth-100 absolute left-[117px] top-[248px] text-[13px] font-extrabold leading-[normal] tracking-[0.52px] whitespace-nowrap text-accent">
        07 — GROWTH
      </p>

      <SplitChars
        text="GO"
        motion="display"
        className="wdth-100 absolute left-[117px] top-[238px] text-[128px] font-medium leading-[normal] whitespace-nowrap text-white"
      />
      <SplitChars
        text="BEYOND"
        motion="display"
        className="wdth-100 absolute left-[117px] top-[364px] text-[128px] font-medium leading-[normal] whitespace-nowrap text-white"
      />
      <SplitChars
        text="AI"
        motion="display"
        className="wdth-100 absolute left-[1664px] top-[364px] text-[128px] font-bold leading-[normal] whitespace-nowrap text-white"
      />

      <div
        data-motion="rail"
        className="absolute left-[124px] top-[618px] h-[2px] w-[1686px] bg-white/50"
      />

      {STEPS.map(({ index, title, left, active }) => (
        <div key={index}>
          <span
            className="absolute size-[14px] rounded-full"
            style={{
              left: `${left}px`,
              top: "612px",
              background: active ? "var(--color-accent)" : "#ffffff",
            }}
          />
          <p
            className="wdth-100 absolute text-[14px] font-normal leading-[normal] whitespace-nowrap text-muted-dark"
            style={{ left: `${left + 7}px`, top: "646px" }}
          >
            {index}
          </p>
          <p
            className="wdth-100 absolute w-[522px] text-[22px] font-extrabold leading-[normal] text-white"
            style={{ left: `${left + 7}px`, top: "670px" }}
          >
            {title}
          </p>
        </div>
      ))}

      <p className="wdth-100 absolute left-[124px] top-[718px] text-[40px] font-extrabold leading-[normal] whitespace-nowrap text-white">
        <CountUp value="1000" />·<CountUp value="100" />·<CountUp value="10" />
      </p>
      <p className="wdth-100 absolute left-[124px] top-[768px] text-[16px] font-normal leading-[normal] whitespace-nowrap text-muted-dark">
        PNU AX 성장 프로그램 · 발굴-진학-정예연구
      </p>

      <Cta
        label="성장경로 더 알아보기"
        to="/education-research"
        tone="light"
        className="left-[1648px] top-[823px]"
      />
    </Band>
  );
}
