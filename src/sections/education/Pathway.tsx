import { useRef } from "react";
import { Band } from "../../components/Canvas";
import { useReveal } from "../../motion/useReveal";
import { useScrub } from "../../motion/useScrub";
import { Words } from "../../motion/Words";

const STAGES = [
  { group: "G1", title: "공통기초", note: "1~2학년 · ADP 공동운영", left: 117, accent: false },
  { group: "G2–G5", title: "코어", note: "3학년 · A·D·P 전문역량", left: 437, accent: false },
  { group: "G7", title: "도메인 응용", note: "3~4학년 · 성장엔진 산업 문제언어 번역", left: 757, accent: false },
  {
    group: "G8",
    title: "실전프로젝트·AX캡스톤",
    note: "4학년 필수 · 기업문제 정의→설계→구현→검증→실증",
    left: 1077,
    accent: true,
  },
  { group: "진출", title: "대학원·취업·창업", note: "4학년", left: 1397, accent: false },
];

const CORE_SUBJECTS = [
  { letter: "L", title: "Literacy", body: "AI 이해·활용 — 비전공자를 위한 기초 소양", left: 117 },
  { letter: "D", title: "Data", body: "데이터 기반 융합 — 도메인 데이터로 AI 문제 해결", left: 637 },
  { letter: "E", title: "Engineering", body: "AI 설계·구현 — 모델·시스템 직접 개발", left: 1157 },
];

/* The headline rises while the closing note settles — opposing parallax. */
const DRIFT = [
  { selector: "[data-motion=lead]", to: { y: -26 } },
  { selector: "[data-motion=note]", to: { y: 20 } },
];

/* Cards lift on hover; the surface is a child so GSAP owns the outer transform. */
const CARD =
  "absolute inset-0 overflow-hidden rounded-[12px] transition-[transform,background-color,border-color] duration-300 ease-out motion-safe:group-hover:-translate-y-[6px]";

export function Pathway() {
  const ref = useRef<HTMLElement>(null);
  const lead = useRef<HTMLParagraphElement>(null);

  useScrub(ref, DRIFT);
  useReveal(lead, true, { stagger: 0.05, y: 20 });

  return (
    <Band
      top={104}
      height={1080}
      className="bg-white"
      innerRef={ref}
      reveal={{ stagger: 0.06, y: 24 }}
    >
      <p className="wdth-100 absolute left-[117px] top-[90px] w-[500px] text-[13px] font-extrabold leading-[normal] text-accent">
        01 — 학부 교육과정 (PNU-AI Pathway)
      </p>

      <div className="absolute left-[117px] top-[126px] w-[1600px]">
        <Words
          ref={lead}
          data-motion="lead"
          className="wdth-100 text-[34px] font-black leading-[normal] text-ink"
          text="1학년부터 4학년까지, 성장경로로 이어집니다."
        />
      </div>

      <p className="wdth-100 absolute left-[117px] top-[182px] h-[24px] w-[1600px] text-[15px] font-normal leading-[normal] text-muted">
        &quot;기초 이해 → 문제정의·설계 → 구현 → 검증 → 협업·확산&quot;의 5대
        공통역량을 공통기초·코어·횡단·통합 그룹-모듈로 이수합니다.
      </p>

      {STAGES.map(({ group, title, note, left, accent }, i) => (
        <div key={group}>
          <div
            className="group absolute top-[260px] h-[160px] w-[300px]"
            style={{ left: `${left}px` }}
          >
            <div
              className={`${CARD} ${
                accent ? "bg-[#e0f7eb] hover:bg-[#d5f2e3]" : "bg-[#f5f5f5] hover:bg-[#efefef]"
              }`}
            >
              <p className="wdth-100 absolute left-[20px] top-[20px] w-[260px] text-[20px] font-black leading-[normal] text-[#008040]">
                {group}
              </p>
              <p className="wdth-100 absolute left-[20px] top-[56px] h-[44px] w-[260px] text-[16px] font-extrabold leading-[normal] text-ink">
                {title}
              </p>
              <p className="wdth-100 absolute left-[20px] top-[104px] h-[48px] w-[260px] text-[12px] font-normal leading-[normal] text-muted">
                {note}
              </p>
            </div>
          </div>
          {i < STAGES.length - 1 && (
            <p
              className="wdth-100 absolute top-[325px] h-[24px] w-[16px] text-[20px] font-black leading-[normal] text-accent"
              style={{ left: `${left + 302}px` }}
            >
              →
            </p>
          )}
        </div>
      ))}

      <p className="wdth-100 absolute left-[117px] top-[440px] h-[20px] w-[1000px] text-[13px] font-normal leading-[normal] text-muted">
        G6 — 신뢰성·보안·윤리는 전 과정을 관통하는 공통 필수교과로 운영됩니다.
      </p>

      <p className="wdth-100 absolute left-[117px] top-[500px] h-[26px] w-[500px] text-[18px] font-extrabold leading-[normal] text-ink">
        APEX AI 코어교과 — 선택형 이수
      </p>

      {CORE_SUBJECTS.map(({ letter, title, body, left }) => (
        <div
          key={letter}
          className="group absolute top-[550px] h-[130px] w-[500px]"
          style={{ left: `${left}px` }}
        >
          <div
            className={`${CARD} border border-solid border-[#d9d9d9] bg-white hover:border-accent`}
          >
            <p className="wdth-100 absolute left-[23px] top-[19px] h-[48px] w-[80px] text-[36px] font-black leading-[normal] text-accent">
              {letter}
            </p>
            <p className="wdth-100 absolute left-[109px] top-[29px] h-[24px] w-[370px] text-[16px] font-extrabold leading-[normal] text-ink">
              {title}
            </p>
            <p className="wdth-100 absolute left-[23px] top-[81px] h-[40px] w-[452px] text-[13px] font-normal leading-[normal] text-muted">
              {body}
            </p>
          </div>
        </div>
      ))}

      <div className="absolute left-[117px] top-[710px] h-[40px] w-[1600px]">
        <p
          data-motion="note"
          className="wdth-100 text-[14px] font-normal leading-[normal] text-muted"
        >
          학습자의 전공 배경과 AI 역량 수준에 따라 L·D·E 코어교과를 선택형으로
          이수하며, 선수역량이 부족하면 비학점 보완과정을 먼저 이수합니다. 이후
          AI 융합 교과목(브릿지 교과)·도메인 AI 심화·AX 캡스톤디자인으로
          이어집니다.
        </p>
      </div>
    </Band>
  );
}
