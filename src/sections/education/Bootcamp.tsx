import { useRef, type ReactNode } from "react";
import { Band } from "../../components/Canvas";
import { CountUp } from "../../motion/CountUp";
import { useReveal } from "../../motion/useReveal";
import { useScrub } from "../../motion/useScrub";
import { Words } from "../../motion/Words";
import { useDrawIn } from "../../motion/useDrawIn";

type Tier = {
  key: string;
  value: ReactNode;
  label: string;
  left: number;
  top: number;
  rule: number | null;
};

const TIERS: Tier[] = [
  {
    key: "ax1000",
    value: (
      <>
        <CountUp value="1000" />명
      </>
    ),
    label: "AX 1000 (발굴)",
    left: 242,
    top: 455,
    rule: null,
  },
  {
    key: "ax100",
    value: (
      <>
        <CountUp value="100" />명
      </>
    ),
    label: "AX 100 (진학)",
    left: 742,
    top: 455,
    rule: 710,
  },
  {
    key: "ax10",
    value: (
      <>
        <CountUp value="10" />명
      </>
    ),
    label: "AX 10 (정예연구)",
    left: 1242,
    top: 455,
    rule: 1210,
  },
  { key: "fellowship", value: "장영실", label: "AI 펠로우십", left: 242, top: 635, rule: null },
  { key: "capstone", value: "AX", label: "캡스톤", left: 742, top: 635, rule: 710 },
  { key: "startup", value: "Lab to", label: "Start-Up", left: 1242, top: 635, rule: 1210 },
];

/* Oversized figures settle downward while the headline rises past them. */
const DRIFT = [
  { selector: "[data-motion=lead]", to: { y: -26 } },
  { selector: "[data-motion=figure]", to: { y: 16 } },
  { selector: "[data-motion=note]", to: { y: 20 } },
];

export function Bootcamp() {
  const ref = useRef<HTMLElement>(null);
  const lead = useRef<HTMLParagraphElement>(null);

  useScrub(ref, DRIFT);
  useReveal(lead, true, { stagger: 0.05, y: 20 });
  useDrawIn(ref, "[data-motion=rail]", { axis: "y",
    origin: "center top",
    duration: 0.9, stagger: 0.07, immediateRender: false });

  return (
    <Band
      top={2264}
      height={1080}
      className="bg-white"
      innerRef={ref}
      reveal={{ stagger: 0.07, y: 24 }}
    >
      <p className="wdth-100 absolute left-[117px] top-[295px] text-[13px] font-extrabold leading-[normal] whitespace-nowrap text-accent">
        03 — PNU AX 1000·100·10
      </p>

      <div className="absolute left-[117px] top-[331px] w-[1000px]">
        <Words
          ref={lead}
          data-motion="lead"
          className="wdth-100 text-[34px] font-black leading-[normal] text-ink"
          text="발굴 1000 · 진학 100 · 정예연구 10, 단계별 성장 프로그램."
        />
      </div>

      {TIERS.map(({ key, value, label, left, top, rule }) => (
        <div key={key}>
          {rule !== null && (
            <div
              data-motion="rail"
              className="absolute h-[140px] w-px bg-[#e6e6e6]"
              style={{ left: `${rule}px`, top: `${top + 10}px` }}
            />
          )}
          <p
            data-motion="figure"
            className="wdth-100 absolute text-[48px] font-black leading-[normal] whitespace-nowrap text-ink"
            style={{ left: `${left}px`, top: `${top}px` }}
          >
            {value}
          </p>
          <p
            className="wdth-100 absolute text-[15px] font-normal leading-[normal] whitespace-nowrap text-muted"
            style={{ left: `${left}px`, top: `${top + 66}px` }}
          >
            {label}
          </p>
        </div>
      ))}

      <div className="absolute left-[210px] top-[585px] w-[1600px]">
        <p
          data-motion="note"
          className="wdth-100 text-[15px] font-normal leading-[normal] text-muted"
        >
          전 학년 대상 발굴(1000) → 진학(100) → 정예연구(10) 단계로 이어지는
          피라미드형 성장 프로그램
        </p>
      </div>
    </Band>
  );
}
