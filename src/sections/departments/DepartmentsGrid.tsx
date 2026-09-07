import { useRef } from "react";
import { Band } from "../../components/Canvas";
import { CountUp } from "../../motion/CountUp";
import { useReveal } from "../../motion/useReveal";
import { useScrub } from "../../motion/useScrub";
import { Words } from "../../motion/Words";

type Department = {
  letter: string;
  name: string;
  /** Bare integer — the "명" suffix is rendered beside the counter. */
  count: string;
  majors: string;
  summary: string;
  left: number;
};

const DEPARTMENTS: Department[] = [
  {
    letter: "A",
    name: "AI컴퓨터공학부",
    count: "214",
    majors:
      "컴퓨터공학전공 84 · 인공지능전공 60 · 인터랙티브콘텐츠전공 17 · AI컴퓨팅자유전공 53",
    summary: "AI 모델·알고리즘·시스템을 설계하고 구현합니다.",
    left: 117,
  },
  {
    letter: "D",
    name: "데이터사이언스학부",
    count: "79",
    majors: "데이터사이언스전공 59 · 첨단바이오공학전공 20",
    summary: "데이터 수집·처리·분석과 통계적 추론을 다룹니다.",
    left: 457,
  },
  {
    letter: "D",
    name: "통계학과",
    count: "35",
    majors: "단일학과 · 35명",
    summary: "통계적 추론과 신뢰성 검증·불확실성 정량화를 전담합니다.",
    left: 797,
  },
  {
    letter: "P",
    name: "산업공학부",
    count: "69",
    majors: "산업공학전공 40 · 산업AI전공 29",
    summary: "산업·사회 문제를 프로세스로 구조화·모델링·최적화합니다.",
    left: 1137,
  },
  {
    letter: "X",
    name: "AX융합학부",
    count: "27",
    majors: "스마트시티전공 27",
    summary: "ADP 공통역량을 도메인별 AI전환(AX)으로 확산합니다.",
    left: 1477,
  },
];

/* The headline and the card row move against each other as the band passes. */
const DRIFT = [
  { selector: "[data-motion=words]", to: { y: -26 } },
  { selector: "[data-motion=card]", to: { y: 18 } },
];

/*
  Three nested boxes, one transform each: the <article> is the band's reveal
  target, the middle box carries the scrubbed parallax, and the inner box owns
  the CSS hover lift. Sharing an element would make the three fight over
  `transform`.

  The card is 320px wide with a 1px border, so its Figma children sit at
  x/y − 1 relative to the padding box.
*/
function DepartmentCard({
  letter,
  name,
  count,
  majors,
  summary,
  left,
}: Department) {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref, true, { stagger: 0.055, y: 14 });

  return (
    <article
      className="absolute top-[220px] h-[700px] w-[320px]"
      style={{ left: `${left}px` }}
    >
      <div data-motion="card" className="h-full w-full">
        <div
          ref={ref}
          className="group relative h-full w-full overflow-hidden border border-solid border-[#404040] bg-[#141414] transition-[transform,border-color] duration-300 ease-out hover:-translate-y-[8px] hover:border-accent"
        >
          <p className="wdth-100 absolute left-[23px] top-[23px] h-[36px] w-[60px] text-[28px] font-black leading-[normal] text-accent">
            {letter}
          </p>
          <p className="wdth-100 absolute left-[23px] top-[73px] h-[52px] w-[272px] text-[19px] font-extrabold leading-[normal] text-white">
            {name}
          </p>
          <p className="wdth-100 absolute left-[23px] top-[131px] h-[40px] w-[200px] text-[30px] font-black leading-[normal] text-accent">
            <CountUp value={count} />명
          </p>
          <p className="wdth-100 absolute left-[23px] top-[179px] h-[40px] w-[272px] text-[11px] font-normal leading-[normal] text-[#a6a6a6]">
            {majors}
          </p>
          <p className="wdth-100 absolute left-[23px] top-[235px] h-[70px] w-[272px] text-[13px] font-normal leading-[normal] text-white">
            {summary}
          </p>
          <button
            type="button"
            disabled
            className="pointer-events-none absolute left-[23px] top-[629px] h-[40px] w-[272px] overflow-hidden rounded-[20px] bg-white"
          >
            <span className="absolute left-0 top-[13px] flex h-[16px] w-[272px] items-center justify-center">
              <span className="wdth-100 text-[12px] font-extrabold leading-[normal] text-black">
                학과 페이지 바로가기
              </span>
              <span className="wdth-100 ml-[7px] text-[12px] font-extrabold leading-[normal] text-black transition-transform duration-300 ease-out group-hover:translate-x-[4px]">
                →
              </span>
            </span>
          </button>
        </div>
      </div>
    </article>
  );
}

export function DepartmentsGrid() {
  const ref = useRef<HTMLElement>(null);
  useScrub(ref, DRIFT);

  return (
    <Band
      top={1184}
      height={1080}
      className="bg-black"
      reveal={{ stagger: 0.09, y: 28 }}
      innerRef={ref}
    >
      <p className="wdth-100 absolute left-[117px] top-[90px] w-[400px] text-[13px] font-extrabold leading-[normal] text-accent">
        02 — 학과·전공
      </p>
      <p className="wdth-100 absolute left-[117px] top-[126px] w-[1600px] text-[34px] font-black leading-[normal] text-white">
        <Words text="5개 학과, 각자의 자리에서 AI를 만듭니다." />
      </p>

      {DEPARTMENTS.map((department) => (
        <DepartmentCard key={department.name} {...department} />
      ))}
    </Band>
  );
}
