import { useRef } from "react";
import { Band } from "../../components/Canvas";
import { useReveal } from "../../motion/useReveal";
import { useScrub } from "../../motion/useScrub";
import { Words } from "../../motion/Words";

const PILLARS = [
  {
    letter: "A",
    title: "Artificial Intelligence",
    body: "코드로 AI를 직접 설계하고 평가합니다.",
    left: 117,
    top: 377.5,
  },
  {
    letter: "D",
    title: "Data",
    body: "AI를 키우는 연료, 데이터를 다룹니다.",
    left: 1017,
    top: 377.5,
  },
  {
    letter: "P",
    title: "Process",
    body: "모든 조직과 프로세스를 모델링합니다.",
    left: 117,
    top: 591.5,
  },
  {
    letter: "X",
    title: "eXtension",
    body: "AI를 모든 학문 분야로 확장합니다.",
    left: 1017,
    top: 591.5,
  },
];

/* Headline and closing note pull apart as the band crosses the viewport. */
const DRIFT = [
  { selector: "[data-motion=lead]", to: { y: -28 } },
  { selector: "[data-motion=note]", to: { y: 22 } },
];

export function AdpxVision() {
  const ref = useRef<HTMLElement>(null);
  const lead = useRef<HTMLParagraphElement>(null);

  useScrub(ref, DRIFT);
  useReveal(lead, true, { stagger: 0.06, y: 20 });

  return (
    <Band
      top={1184}
      height={1080}
      className="bg-black"
      innerRef={ref}
      reveal={{ stagger: 0.08, y: 30 }}
    >
      <p className="wdth-100 absolute left-[117px] top-[247.5px] text-[13px] font-extrabold leading-[normal] whitespace-nowrap text-accent">
        02 — ADP+X 비전
      </p>

      <div className="absolute left-[117px] top-[283.5px] w-[1400px]">
        <Words
          ref={lead}
          data-motion="lead"
          className="wdth-100 text-[32px] font-extrabold leading-[normal] text-white"
          text="AI를 만들고, 키우고, 모델링하고, 확산시킨다."
        />
      </div>

      {PILLARS.map(({ letter, title, body, left, top }) => (
        <div
          key={letter}
          className="group absolute h-[190px] w-[860px]"
          style={{ left: `${left}px`, top: `${top}px` }}
        >
          {/*
            The hover lift lives on this inner layer: the outer box is what the
            band's reveal tween transforms, and GSAP's inline transform would
            otherwise win over a Tailwind hover translate.
          */}
          <div className="absolute inset-0 overflow-hidden rounded-[8px] border border-solid border-[#404040] transition-[transform,border-color,background-color] duration-300 ease-out motion-safe:group-hover:-translate-y-[6px] group-hover:border-accent/50 group-hover:bg-[#0d0d0d]">
            <p className="wdth-100 absolute left-[31px] top-[23px] text-[48px] font-black leading-[normal] whitespace-nowrap text-accent transition-transform duration-300 ease-out motion-safe:group-hover:scale-110 origin-left">
              {letter}
            </p>
            <p className="wdth-100 absolute left-[129px] top-[39px] w-[700px] text-[20px] font-extrabold leading-[normal] text-white">
              {title}
            </p>
            <p className="wdth-100 absolute left-[31px] top-[119px] w-[796px] text-[15px] font-normal leading-[normal] text-muted">
              {body}
            </p>
          </div>
        </div>
      ))}

      <div className="absolute left-[117px] top-[811.5px] w-[1686px]">
        <p
          data-motion="note"
          className="wdth-100 text-[15px] font-normal leading-[normal] text-muted-dark"
        >
          「PNU-AX 마스터플랜 A.U.R.A」에 기초한 순환 구조로, AI대학은
          AI교육·AI연구·AI인프라 3대 기능을 통합해 인재·기술·인프라를 공급하는
          공동 허브입니다.
        </p>
      </div>
    </Band>
  );
}
