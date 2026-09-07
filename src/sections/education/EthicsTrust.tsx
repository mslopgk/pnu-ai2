import { useRef } from "react";
import { Band } from "../../components/Canvas";
import { useReveal } from "../../motion/useReveal";
import { useScrub } from "../../motion/useScrub";
import { Words } from "../../motion/Words";
import { useDrawIn } from "../../motion/useDrawIn";

const PILLARS = [
  {
    index: "01",
    title: "공통 윤리 교과",
    body: "AI대학 공통기초 교과목 「AI 시대 윤리와 글쓰기」 운영",
    left: 117,
  },
  {
    index: "02",
    title: "윤리·신뢰성 전공모듈",
    body: "전 학과 주요 AI 전공 교과목에 윤리·신뢰성 모듈(강의 1~2차시 + 사례토론·과제) 필수 삽입",
    left: 545,
  },
  {
    index: "03",
    title: "검증 정례화",
    body: "심화·프로젝트 교과에서 출처·편향 가능성·보안 위험·사용 한계를 결과보고서로 제출, 루브릭으로 검증",
    left: 973,
  },
  {
    index: "04",
    title: "앙부일구 AI교육·윤리 연구센터",
    body: "전 센터의 AI 안전·윤리 검토를 상시 지원 (참고 모델: MIT RAISE, Stanford HAI)",
    left: 1401,
  },
];

/* Headline rises while the closing note settles — opposing parallax. */
const DRIFT = [
  { selector: "[data-motion=lead]", to: { y: -24 } },
  { selector: "[data-motion=note]", to: { y: 18 } },
];

export function EthicsTrust() {
  const ref = useRef<HTMLElement>(null);
  const lead = useRef<HTMLParagraphElement>(null);

  useScrub(ref, DRIFT);
  useReveal(lead, true, { stagger: 0.05, y: 20 });
  useDrawIn(ref, "[data-motion=bar]", { duration: 1, origin: "left center", stagger: 0.07, immediateRender: false });

  return (
    <Band
      top={6584}
      height={1080}
      className="bg-white"
      innerRef={ref}
      reveal={{ stagger: 0.07, y: 24 }}
    >
      <p className="wdth-100 absolute left-[117px] top-[218px] w-[400px] text-[13px] font-extrabold leading-[normal] text-accent">
        07 — AI 윤리·신뢰성
      </p>

      <div className="absolute left-[117px] top-[254px] w-[1600px]">
        <Words
          ref={lead}
          data-motion="lead"
          className="wdth-100 text-[34px] font-black leading-[normal] text-ink"
          text="인공지능 기본법 시행에 맞춰 신뢰를 설계합니다."
        />
      </div>

      <div className="absolute left-[117px] top-[394px] h-[56px] w-[1686px] overflow-hidden rounded-[10px]">
        {/*
          The wipe is on the fill, not on this box: scaling the box would take
          its text with it and stretch the line horizontally for the whole
          tween.
        */}
        <div
          data-motion="bar"
          className="absolute inset-0 rounded-[10px] bg-[#e0f7eb]"
        />
        <p className="wdth-100 absolute left-[24px] top-[18px] h-[22px] w-[1640px] text-[15px] font-extrabold leading-[normal] text-[#008040]">
          2026.1.22 인공지능 기본법 시행 — 부산대학교 「AI 정책표준」·AI
          윤리헌장·활용 가이드라인 제정·제도화
        </p>
      </div>

      {PILLARS.map(({ index, title, body, left }) => (
        <div
          key={index}
          className="group absolute top-[490px] h-[220px] w-[400px]"
          style={{ left: `${left}px` }}
        >
          <div className="absolute inset-0 overflow-hidden rounded-[12px] border border-solid border-[#e6e6e6] bg-white transition-[transform,border-color,box-shadow] duration-300 ease-out hover:border-accent motion-safe:group-hover:-translate-y-[6px]">
            <p className="wdth-100 absolute left-[23px] top-[19px] h-[32px] w-[80px] text-[24px] font-black leading-[normal] text-accent">
              {index}
            </p>
            <p className="wdth-100 absolute left-[23px] top-[59px] h-[52px] w-[352px] text-[17px] font-extrabold leading-[normal] text-ink">
              {title}
            </p>
            <p className="wdth-100 absolute left-[23px] top-[119px] h-[90px] w-[352px] text-[13px] font-normal leading-[normal] text-muted">
              {body}
            </p>
          </div>
        </div>
      ))}

      <div className="absolute left-[117px] top-[750px] h-[24px] w-[1600px]">
        <p
          data-motion="note"
          className="wdth-100 text-[15px] font-normal leading-[normal] text-muted"
        >
          정부 정책·국제표준(CS2023)·산업체 수요를 다각적으로 교차분석해 AI대학
          인재상을 도출하고, 「기초 이해 → 문제정의·설계 → 구현 → 검증 →
          협업·확산」 5대 공통역량 전 과정에 신뢰성·보안·윤리(G6)를
          관통시킵니다.
        </p>
      </div>
    </Band>
  );
}
