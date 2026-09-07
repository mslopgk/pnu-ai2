import { useRef } from "react";
import { Band } from "../../components/Canvas";
import { Cta } from "../../components/Cta";
import { CountUp } from "../../motion/CountUp";
import { SplitText } from "../../motion/SplitText";
import { useScrub } from "../../motion/useScrub";

/* Five intake quotas, 214 + 79 + 35 + 69 + 27 = the 424-strong first cohort. */
const QUOTAS = [
  { label: "AI컴퓨터공학부", value: "214", left: 117 },
  { label: "데이터사이언스학부", value: "79", left: 443 },
  { label: "통계학과", value: "35", left: 769 },
  { label: "산업공학부", value: "69", left: 1095 },
  { label: "AX융합학부", value: "27", left: 1421 },
];

const HEADLINE = ["당신의 다음이", "여기서 시작된다."];

/* The headline and the cohort figure drift against each other. */
const PARALLAX = [
  {
    selector: "[data-motion=drift-up]",
    from: { yPercent: 6 },
    to: { yPercent: -6 },
  },
  {
    selector: "[data-motion=drift-down]",
    from: { yPercent: -5 },
    to: { yPercent: 5 },
  },
];

export function Admission() {
  const ref = useRef<HTMLElement>(null);
  useScrub(ref, PARALLAX);

  return (
    <Band
      top={13743}
      height={1080}
      className="bg-black"
      innerRef={ref}
      reveal={{ stagger: 0.07 }}
    >
      <p className="wdth-100 absolute left-[117px] top-[118px] text-[13px] font-extrabold leading-[normal] tracking-[0.52px] whitespace-nowrap text-accent">
        14 — ADMISSION
      </p>

      <div
        data-motion="drift-up"
        className="wdth-100 absolute left-[117px] top-[160px] text-[60px] font-black whitespace-nowrap text-white"
      >
        {HEADLINE.map((line) => (
          <SplitText
            key={line}
            text={line}
            className="leading-[normal] whitespace-pre"
          />
        ))}
      </div>

      <p className="wdth-100 absolute left-[117px] top-[350px] text-[16px] font-normal leading-[normal] whitespace-nowrap text-muted-dark">
        2027학년도 부산대학교 AI대학의 첫 신입생을 모집합니다.
      </p>

      {QUOTAS.map(({ label, value, left }) => (
        <div
          key={label}
          className="group absolute top-[434px] h-[180px] w-[276px]"
          style={{ left: `${left}px` }}
        >
          <p className="wdth-100 absolute left-0 top-0 text-[12px] font-extrabold leading-[0.87] whitespace-nowrap text-white transition-colors duration-300 group-hover:text-accent">
            {label}
          </p>
          <div className="absolute left-0 top-[-28.2px] flex items-start overflow-hidden transition-transform duration-300 group-hover:-translate-y-[6px]">
            <p className="wdth-100 mr-[-12px] shrink-0 text-[138px] font-black leading-[normal] whitespace-nowrap text-white">
              <CountUp value={value} />
            </p>
            <div className="h-[63.6px] w-[23.4px] shrink-0 overflow-hidden pt-[30px]" />
          </div>
        </div>
      ))}

      <div
        data-motion="drift-down"
        className="group absolute left-[117px] top-[664px] h-[225px] w-[345px]"
      >
        <p className="wdth-100 absolute left-0 top-0 text-[15px] font-extrabold leading-[0.87] whitespace-nowrap text-white transition-colors duration-300 group-hover:text-accent">
          FIRST AI COLLEGE COHORT
        </p>
        <div className="absolute left-0 top-[-35.25px] flex items-start overflow-hidden transition-transform duration-300 group-hover:-translate-y-[8px]">
          <p className="wdth-100 mr-[-15px] shrink-0 text-[172.5px] font-black leading-[normal] whitespace-nowrap text-white">
            <CountUp value="424" />
          </p>
          <div className="h-[79.5px] w-[29.25px] shrink-0 overflow-hidden pt-[37.5px]" />
        </div>
      </div>

      <Cta label="입학 안내 보기" to="/admissions-career" tone="light" className="left-[117px] top-[939px]" />
    </Band>
  );
}
