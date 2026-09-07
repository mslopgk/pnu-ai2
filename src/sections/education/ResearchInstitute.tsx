import { useRef } from "react";
import { Band } from "../../components/Canvas";
import { useReveal } from "../../motion/useReveal";
import { useScrub } from "../../motion/useScrub";
import { Words } from "../../motion/Words";

/*
  Nine dashed "sticky note" cards, each slightly rotated. `left/top/w/h` are the
  rotated card's bounding box exactly as Figma reports it; the card itself is a
  220 × 110 rect centred inside that box and rotated back into place.
*/
const CENTERS = [
  { name: "칠정산 주권AI연구센터", left: 188.5, top: 361, w: 230.293, h: 132.394, rotate: 6 },
  { name: "앙부일구 AI교육·윤리연구센터", left: 520, top: 425.65, w: 227.137, h: 125.078, rotate: -4 },
  { name: "인공지능융합연구센터", left: 814.24, top: 351, w: 225.455, h: 121.363, rotate: 3 },
  { name: "Digital-X AIoT연구센터", left: 1180, top: 411.83, w: 228.75, h: 128.756, rotate: -5 },
  { name: "제로트러스트클라우드보안연구센터", left: 1490.41, top: 361, w: 228.75, h: 128.756, rotate: 5 },
  { name: "인간중심-탄소글로벌공급망연구센터", left: 340, top: 609.49, w: 225.455, h: 121.363, rotate: -3 },
  { name: "산업인공지능연구소", left: 692.33, top: 661, w: 227.137, h: 125.078, rotate: 4 },
  { name: "LG전자 스마트제어센터", left: 1100, top: 598, w: 230.293, h: 132.394, rotate: -6 },
  { name: "스마트항만 SCSC(ERC) 연구센터", left: 1480, top: 526.15, w: 227.137, h: 125.078, rotate: -4 },
];

const NEW_CENTERS = [
  {
    title: "칠정산 주권AI연구센터",
    body: "국책 전문 연구기관·국산(주권) AI 모델개발사·방산·에너지 기업과 협력. 프로젝트(안): 해양 Physical AI 파운데이션 모델, 원자력·방산 온톨로지·주권모델 기반 AI 에이전트, 방산·제조 주권 엣지/AI 플랫폼",
    left: 117,
  },
  {
    title: "앙부일구 AI교육·윤리연구센터",
    body: "교육혁신본부·인문·사회·교육 분야 교원·공공기관과 협력(참고 모델: MIT RAISE, Stanford HAI). 프로젝트(안): AI 리터러시·맞춤형 윤리교육 콘텐츠, 신뢰·책임 AI 평가·검증, AI 정책·사회영향 평가",
    left: 985,
  },
];

/* Headline rises while the two centre write-ups settle — opposing parallax. */
const DRIFT = [
  { selector: "[data-motion=lead]", to: { y: -24 } },
  { selector: "[data-motion=note]", to: { y: 18 } },
];

export function ResearchInstitute() {
  const ref = useRef<HTMLElement>(null);
  const lead = useRef<HTMLParagraphElement>(null);

  useScrub(ref, DRIFT);
  useReveal(lead, true, { stagger: 0.05, y: 20 });

  return (
    <Band
      top={4424}
      height={1080}
      className="bg-white"
      innerRef={ref}
      reveal={{ stagger: 0.06, y: 24 }}
    >
      <p className="wdth-100 absolute left-0 top-[161px] w-[1920px] text-center text-[13px] font-extrabold leading-[normal] text-accent">
        05 — 장영실AI융합연구원
      </p>

      <div className="absolute left-0 top-[197px] w-[1920px]">
        <Words
          ref={lead}
          data-motion="lead"
          className="wdth-100 text-center text-[34px] font-black leading-[normal] text-ink"
          text="9개 산하 연구센터가 AI 연구를 이끕니다."
        />
      </div>

      {CENTERS.map(({ name, left, top, w, h, rotate }) => (
        <div
          key={name}
          className="group absolute flex items-center justify-center"
          style={{ left: `${left}px`, top: `${top}px`, width: `${w}px`, height: `${h}px` }}
        >
          <div
            className="relative h-[110px] w-[220px] flex-none"
            style={{ transform: `rotate(${rotate}deg)` }}
          >
            <div className="absolute inset-0 overflow-hidden rounded-[4px] border-2 border-dashed border-accent transition-[transform,background-color] duration-300 ease-out hover:bg-[#effbf4] motion-safe:group-hover:-translate-y-[6px]">
              <p className="wdth-100 absolute left-[108px] top-[40px] w-[220px] -translate-x-1/2 text-center text-[17px] font-extrabold leading-[normal] text-ink">
                {name}
              </p>
            </div>
          </div>
        </div>
      ))}

      {NEW_CENTERS.map(({ title, body, left }) => (
        <div key={title}>
          <p
            data-motion="note"
            className="wdth-100 absolute top-[841px] h-[28px] w-[400px] text-[20px] font-extrabold leading-[normal] text-accent"
            style={{ left: `${left}px` }}
          >
            {title}
          </p>
          <p
            data-motion="note"
            className="wdth-100 absolute top-[878.5px] h-[40px] w-[800px] text-[15px] font-normal leading-[normal] text-muted"
            style={{ left: `${left}px` }}
          >
            {body}
          </p>
        </div>
      ))}
    </Band>
  );
}
