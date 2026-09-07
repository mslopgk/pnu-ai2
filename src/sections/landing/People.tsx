import { useRef } from "react";
import { Band } from "../../components/Canvas";
import { Cta } from "../../components/Cta";
import { CountUp } from "../../motion/CountUp";
import { SplitText } from "../../motion/SplitText";
import { useScrub } from "../../motion/useScrub";

const DEPARTMENTS = [
  {
    name: "AI컴퓨터공학부",
    meta: "214명 · 30명 교수",
    top: 326,
    ruleWidth: 113,
    active: true,
  },
  {
    name: "데이터사이언스학부·통계학과",
    meta: "114명 · 19명 교수",
    top: 416,
    ruleWidth: 207,
    active: false,
  },
  {
    name: "산업공학부",
    meta: "69명 · 10명 교수",
    top: 506,
    ruleWidth: 78,
    active: false,
  },
  {
    name: "AX융합학부",
    meta: "27명 · 1명 교수",
    top: 596,
    ruleWidth: 91,
    active: false,
  },
];

const HEADLINE = ["지능 뒤에는", "사람이 있다."];

/* The four department underscores wipe out from the left, one after another. */
const DRAW = [
  {
    selector: "[data-motion=rule]",
    from: { scaleX: 0, transformOrigin: "left center" },
    to: { scaleX: 1, stagger: 0.09 },
  },
];

/* Display type and the headcount figure drift against each other. */
const PARALLAX = [
  {
    selector: "[data-motion=drift-up]",
    from: { yPercent: 6 },
    to: { yPercent: -6 },
  },
  {
    selector: "[data-motion=drift-down]",
    from: { yPercent: -9 },
    to: { yPercent: 9 },
  },
];

export function People() {
  const ref = useRef<HTMLElement>(null);
  useScrub(ref, DRAW, { start: "top 82%", end: "top 40%" });
  useScrub(ref, PARALLAX);

  return (
    <Band
      top={11583}
      height={1080}
      className="bg-black"
      innerRef={ref}
      reveal={{ stagger: 0.08 }}
    >
      <p className="wdth-100 absolute left-[117px] top-[266px] text-[13px] font-extrabold leading-[normal] tracking-[0.52px] whitespace-nowrap text-accent">
        12 — PEOPLE
      </p>

      {DEPARTMENTS.map(({ name, meta, top, ruleWidth, active }) => (
        <div key={name} className="group">
          <p
            className={`wdth-100 absolute left-[117px] text-[18px] font-extrabold leading-[normal] whitespace-nowrap transition-colors duration-300 ${
              active ? "text-white" : "text-muted-dark group-hover:text-white"
            }`}
            style={{ top: `${top}px` }}
          >
            {name}
          </p>
          <p
            className="wdth-100 absolute left-[117px] text-[14px] font-normal leading-[normal] whitespace-nowrap text-muted-dark"
            style={{ top: `${top + 28}px` }}
          >
            {meta}
          </p>
          <div
            data-motion="rule"
            className={`absolute left-[117px] h-[2px] transition-colors duration-300 ${
              active ? "bg-accent" : "bg-white/15 group-hover:bg-white/45"
            }`}
            style={{ top: `${top + 52}px`, width: `${ruleWidth}px` }}
          />
        </div>
      ))}

      <div
        data-motion="drift-up"
        className="wdth-100 absolute right-[117px] top-[286px] w-[900px] text-right text-[60px] font-black text-white"
      >
        {HEADLINE.map((line) => (
          <SplitText
            key={line}
            text={line}
            className="leading-[normal] whitespace-pre"
          />
        ))}
      </div>
      <p className="wdth-100 absolute right-[117px] top-[472px] w-[900px] text-right text-[16px] font-normal leading-[normal] text-muted-dark">
        AI대학의 교육과 연구를 이끌어가는 교수진과 연구자를 소개합니다.
      </p>

      <Cta label="교원 소개" to="/education-research" tone="light" className="left-[1726px] top-[523px]" />

      <p
        data-motion="drift-down"
        className="wdth-100 absolute right-[117px] top-[596px] w-[900px] text-right text-[56px] font-black leading-[normal] text-white"
      >
        <CountUp value="60" />
      </p>
      <p className="wdth-100 absolute right-[117px] top-[666px] w-[900px] text-right text-[16px] font-normal leading-[normal] text-muted-dark">
        명의 교수진이 함께합니다
      </p>
      <p className="wdth-100 absolute right-[117px] top-[756px] w-[900px] text-right text-[18px] font-extrabold leading-[normal] text-white">
        RoboCup 2025 세계 챔피언 &apos;TidyBoy&apos; 배출
      </p>
      <p className="wdth-100 absolute right-[117px] top-[792px] w-[900px] text-right text-[15px] font-normal leading-[normal] text-muted-dark">
        BioAI Lab · VIPLab · PNUCVLAB · S3Lab · XRL Lab 등 14개 연구실
      </p>
    </Band>
  );
}
