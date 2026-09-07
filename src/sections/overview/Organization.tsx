import { useRef } from "react";
import { Band } from "../../components/Canvas";
import { CountUp } from "../../motion/CountUp";
import { useReveal } from "../../motion/useReveal";
import { useScrub } from "../../motion/useScrub";
import { Words } from "../../motion/Words";
import { useDrawIn } from "../../motion/useDrawIn";

const UNITS = [
  { name: "AI컴퓨터공학부", students: "214", faculty: "30", left: 180, stem: 329 },
  { name: "데이터사이언스학부", students: "79", faculty: "11", left: 495, stem: 644 },
  { name: "통계학과", students: "35", faculty: "8", left: 810, stem: 959 },
  { name: "산업공학부", students: "69", faculty: "10", left: 1125, stem: 1274 },
  {
    name: "AX융합학부",
    students: "27",
    faculty: "1",
    left: 1440,
    stem: 1589,
  },
];

/* Centred headline and closing note drift apart over the black plate. */
const DRIFT = [
  { selector: "[data-motion=lead]", to: { y: -26 } },
  { selector: "[data-motion=note]", to: { y: 20 } },
];

export function Organization() {
  const ref = useRef<HTMLElement>(null);
  const lead = useRef<HTMLParagraphElement>(null);

  useScrub(ref, DRIFT);
  useReveal(lead, true, { stagger: 0.06, y: 20 });
  // The chart assembles top-down: trunk, then the spine, then each branch.
  useDrawIn(ref, "[data-motion=trunk]", {
    axis: "y",
    origin: "left top",
    duration: 0.5,
    start: "top 80%",
  });
  useDrawIn(ref, "[data-motion=spine]", {
    axis: "x",
    origin: "center",
    duration: 0.9,
    start: "top 76%",
  });
  useDrawIn(ref, "[data-motion=branch]", {
    axis: "y",
    origin: "left top",
    duration: 0.5,
    stagger: 0.06,
    start: "top 72%",
  });

  return (
    <Band
      top={3344}
      height={1080}
      className="bg-black"
      innerRef={ref}
      reveal={{ stagger: 0.07, y: 28 }}
    >
      <p className="wdth-100 absolute left-0 top-[294.5px] w-[1920px] text-center text-[13px] font-extrabold leading-[normal] text-accent">
        04 — 조직 및 교수진
      </p>

      <div className="absolute left-0 top-[330.5px] w-[1920px]">
        <Words
          ref={lead}
          data-motion="lead"
          className="wdth-100 text-center text-[32px] font-extrabold leading-[normal] text-white"
          text="60명의 교수진, 4개 학부 + 1개 학과."
        />
      </div>

      <div className="group absolute left-[800px] top-[434.5px] h-[70px] w-[320px]">
        <div className="absolute inset-0 overflow-hidden rounded-[8px] border border-solid border-[#404040] bg-[#141414] text-center transition-[transform,border-color] duration-300 ease-out motion-safe:group-hover:-translate-y-[4px] group-hover:border-accent/60">
          <p className="wdth-100 absolute left-0 top-[19px] w-[320px] text-[16px] font-extrabold leading-[normal] text-white">
            AI대학
          </p>
          <p className="wdth-100 absolute left-0 top-[45px] w-[320px] text-[12px] font-normal leading-[normal] text-[#999]">
            2027년 3월 개교
          </p>
        </div>
      </div>

      <div
        data-motion="trunk"
        className="absolute left-[959px] top-[504.5px] h-[40px] w-[2px] bg-[#404040]"
      />
      <div
        data-motion="spine"
        className="absolute left-[160px] top-[544.5px] h-[2px] w-[1600px] bg-[#404040]"
      />

      {UNITS.map(({ name, students, faculty, left, stem }) => (
        <div key={name}>
          <div
            data-motion="branch"
            className="absolute top-[546.5px] h-[30px] w-[2px] bg-[#404040]"
            style={{ left: `${stem}px` }}
          />
          <div
            className="group absolute top-[576.5px] h-[90px] w-[300px]"
            style={{ left: `${left}px` }}
          >
            {/*
              Hover lift sits on this inner layer — the outer box carries the
              band's reveal transform, which GSAP writes inline and which would
              override a Tailwind hover translate.
            */}
            <div className="absolute inset-0 overflow-hidden rounded-[8px] border border-solid border-[#404040] bg-[#141414] text-center transition-[transform,border-color,background-color] duration-300 ease-out motion-safe:group-hover:-translate-y-[6px] group-hover:border-accent/60 group-hover:bg-[#1b1b1b]">
              <p className="wdth-100 absolute left-0 top-[19px] w-[300px] text-[16px] font-extrabold leading-[normal] text-white transition-colors duration-300 group-hover:text-accent">
                {name}
              </p>
              <p className="wdth-100 absolute left-0 top-[45px] w-[300px] text-[12px] font-normal leading-[normal] text-[#999]">
                <CountUp value={students} />명 · <CountUp value={faculty} />명 교수
              </p>
            </div>
          </div>
        </div>
      ))}

      <p className="wdth-100 absolute left-0 top-[714.5px] w-[1920px] text-center text-[14px] font-normal leading-[normal] text-[#999]">
        행정 조직: 교무위원회 · 산학연구협력실 · 입학홍보팀 · 총무행정팀
      </p>

      <div className="absolute left-0 top-[764.5px] w-[1920px]">
        <p
          data-motion="note"
          className="wdth-100 text-center text-[15px] font-normal leading-[normal] text-muted-dark"
        >
          60명의 전임교원이 학부 강의와 산학 공동연구를 함께 수행합니다.
        </p>
      </div>
    </Band>
  );
}
