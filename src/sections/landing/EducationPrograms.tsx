import { useRef } from "react";
import { Band } from "../../components/Canvas";
import { Cta } from "../../components/Cta";
import { MediaBackdrop } from "../../components/MediaBackdrop";
import { useReveal } from "../../motion/useReveal";
import { useScrub } from "../../motion/useScrub";

const PROGRAMS = [
  { index: "01", title: "CURRICULUM", note: "Pentomino 시스템", top: 390 },
  { index: "02", title: "MICRO DEGREE", note: "13개 트랙 운영", top: 464 },
  { index: "03", title: "BOOTCAMP", note: "5년 · 7개 전문 트랙", top: 538 },
  { index: "04", title: "GLOBAL", note: "8개국 파트너 대학", top: 612 },
  { index: "05", title: "START-UP", note: null, top: 686 },
];

/* Backdrop and display type pull apart as the section passes. */
const DRIFT = [
  /*
    The programme list at x1395+ already sits over the right half of the
    backdrop box, which is transparent there. Drifting the media far right
    pushes the robot itself under that dark-on-light copy, so the travel is
    kept short — still opposing the display type, without eating the list.
  */
  { selector: "[data-motion=media]", to: { x: 25 } },
  { selector: "[data-motion=display]", to: { x: -45 } },
];

/* The programme list's rule draws down from its top edge. */
const DRAW = [
  {
    selector: "[data-motion=rule]",
    from: { scaleY: 0, transformOrigin: "top center" },
    to: { scaleY: 1 },
  },
];

export function EducationPrograms() {
  const ref = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useScrub(ref, DRIFT);
  useScrub(ref, DRAW, { start: "top 70%", end: "center center" });
  /* "Learn, Build, Create." arrives a line at a time. */
  useReveal(headingRef, true, { stagger: 0.09, y: 40 });

  return (
    <Band
      top={6183}
      height={1080}
      className="bg-white"
      innerRef={ref}
      reveal={{ stagger: 0.07 }}
    >
      {/*
        The flip lives on the inner element: the outer box is the scrub target
        and a mirrored ancestor would invert the direction of its drift.
      */}
      <div
        data-motion="media"
        className="absolute left-[437px] top-[21px] h-[1071px] w-[942px]"
      >
        <div className="absolute inset-0 -scale-x-100">
          <MediaBackdrop
            video="/assets/video/education.mp4"
            poster="/assets/education.webp"
          />
        </div>
      </div>

      <p className="wdth-100 absolute left-[105px] top-[305px] text-[13px] font-extrabold leading-[normal] tracking-[0.52px] whitespace-nowrap text-accent">
        06 — EDUCATION
      </p>

      <div
        ref={headingRef}
        data-motion="display"
        className="absolute left-[105px] top-[337px] display-type text-[96px] whitespace-nowrap text-ink"
      >
        <p className="leading-none">Learn,</p>
        <p className="leading-none">Build,</p>
        <p className="leading-none">Create.</p>
      </div>

      <div className="wdth-100 absolute left-[105px] top-[673px] w-[420px] text-[16px] font-normal text-muted">
        <p className="leading-[normal]">정규교육부터 마이크로디그리, 부트캠프,</p>
        <p className="leading-[normal]">국제교류, 창업까지 학생의 성장 단계에</p>
        <p className="leading-[normal]">맞는 교육 경험을 제공합니다.</p>
      </div>

      <Cta label="교육 더 알아보기" to="/education-research" className="left-[105px] top-[782px]" />

      <div
        data-motion="rule"
        className="absolute left-[1345px] top-[329px] h-[414px] w-px bg-ink/15"
      />

      {PROGRAMS.map(({ index, title, note, top }) => (
        <div key={index}>
          <p
            className="wdth-100 absolute left-[1395px] text-[14px] font-normal leading-[normal] whitespace-nowrap text-accent"
            style={{ top: `${top + 4}px` }}
          >
            {index}
          </p>
          <p
            className="wdth-100 absolute left-[1435px] text-[26px] font-extrabold leading-[normal] whitespace-nowrap text-ink"
            style={{ top: `${top}px` }}
          >
            {title}
          </p>
          {note && (
            <p
              className="wdth-100 absolute left-[1435px] text-[14px] font-normal leading-[normal] whitespace-nowrap text-muted"
              style={{ top: `${top + 34}px` }}
            >
              {note}
            </p>
          )}
        </div>
      ))}
    </Band>
  );
}
