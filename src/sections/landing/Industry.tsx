import { useRef } from "react";
import { Band } from "../../components/Canvas";
import { Cta } from "../../components/Cta";
import { CountUp } from "../../motion/CountUp";
import { SplitText } from "../../motion/SplitText";
import { useScrub } from "../../motion/useScrub";

const PARTNERS = [
  { name: "NAVER Cloud", top: 214 },
  { name: "Google", top: 268 },
  { name: "AWS", top: 322 },
  { name: "LG U+", top: 376 },
  { name: "upstage", top: 430 },
];

const HEADLINE = ["대학에서 산업으로,", "산업에서 다시", "교육으로."];

/* The rule between the two columns draws downward as the band arrives. */
const DRAW = [
  {
    selector: "[data-motion=rule]",
    from: { scaleY: 0, transformOrigin: "center top" },
    to: { scaleY: 1 },
  },
];

/*
  The headline and the figures opposite it drift against each other across the
  band. Deliberately `yPercent` and not `y`: the band reveal already owns `y` on
  these same elements, and GSAP composes the two translations independently.
*/
const PARALLAX = [
  {
    selector: "[data-motion=drift-up]",
    from: { yPercent: 5 },
    to: { yPercent: -5 },
  },
  {
    selector: "[data-motion=drift-down]",
    from: { yPercent: -9 },
    to: { yPercent: 9 },
  },
];

export function Industry() {
  const ref = useRef<HTMLElement>(null);
  useScrub(ref, DRAW, { start: "top 85%", end: "top 45%" });
  useScrub(ref, PARALLAX);

  return (
    <Band
      top={9423}
      height={1080}
      className="bg-black"
      innerRef={ref}
      reveal={{ stagger: 0.07 }}
    >
      <p className="wdth-100 absolute left-[117px] top-[170px] text-[13px] font-extrabold leading-[normal] tracking-[0.52px] whitespace-nowrap text-accent">
        10 — INDUSTRY
      </p>

      <div
        data-motion="drift-up"
        className="wdth-100 absolute left-[117px] top-[214px] text-[60px] font-black whitespace-nowrap text-white"
      >
        {HEADLINE.map((line) => (
          <SplitText
            key={line}
            text={line}
            className="leading-[normal] whitespace-pre"
          />
        ))}
      </div>

      <div className="wdth-100 absolute left-[117px] top-[481px] w-[420px] text-[16px] font-normal text-white">
        <p className="leading-[normal]">실제 산업 수요와 대학 교육을 연결하고</p>
        <p className="leading-[normal]">기업과 함께 현장의 문제를 해결합니다.</p>
      </div>

      <Cta
        label="산학협력 더 알아보기"
        to="/admissions-career"
        tone="light"
        className="left-[117px] top-[567px]"
      />

      <div
        data-motion="rule"
        className="absolute left-[1100px] top-[214px] h-[277px] w-px bg-ink/15"
      />

      {PARTNERS.map(({ name, top }) => (
        <p
          key={name}
          className="wdth-100 absolute right-[117px] w-[700px] text-right text-[30px] font-extrabold leading-[normal] text-white transition-colors duration-300 hover:text-accent"
          style={{ top: `${top}px` }}
        >
          {name}
        </p>
      ))}

      <p
        data-motion="drift-down"
        className="wdth-100 absolute right-[117px] top-[560px] w-[700px] text-right text-[72px] font-black leading-[normal] text-white"
      >
        <CountUp value="35" />+
      </p>
      <p className="wdth-100 absolute right-[117px] top-[650px] w-[700px] text-right text-[16px] font-normal leading-[normal] text-muted-dark">
        산학협력 파트너 기관
      </p>
      <p
        data-motion="drift-down"
        className="wdth-100 absolute right-[117px] top-[720px] w-[700px] text-right text-[56px] font-black leading-[normal] text-white"
      >
        <CountUp value="200" />명
      </p>
      <p className="wdth-100 absolute right-[117px] top-[790px] w-[700px] text-right text-[16px] font-normal leading-[normal] text-muted-dark">
        AI 부트캠프 산학 인턴십 규모
      </p>
    </Band>
  );
}
