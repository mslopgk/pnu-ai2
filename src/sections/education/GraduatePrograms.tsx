import { useRef } from "react";
import { Band } from "../../components/Canvas";
import { useReveal } from "../../motion/useReveal";
import { useScrub } from "../../motion/useScrub";
import { Words } from "../../motion/Words";
import { useDrawIn } from "../../motion/useDrawIn";

const LAYERS = [
  {
    layer: "제1층",
    title: "공통 핵심교과",
    body: "AI 연구방법론·데이터 분석을 전 계열 대학원생 대상 공통 핵심교과로 운영, 2026학년도 신설 필수교과 「연구자를 위한 AI 이해와 활용」과 연계해 연구역량 표준화",
    left: 117,
  },
  {
    layer: "제2층",
    title: "고급 AI 심화교과",
    body: "주권AI·피지컬AI·생성형AI·AI반도체·로봇 등 첨단 AI 분야 심화교과 및 국가 전략산업 데이터 교육",
    left: 687,
  },
  {
    layer: "제3층",
    title: "AX 전략산업 연구연계",
    body: "산학 공동 AX 프로젝트를 대학원 연구·논문·특허·창업으로 연계, 지역 전략산업의 AX 혁신으로 확산",
    left: 1257,
  },
];

/* Headline rises, the three-layer row settles — opposing parallax. */
const DRIFT = [
  { selector: "[data-motion=lead]", to: { y: -26 } },
  { selector: "[data-motion=layer]", to: { y: 16 } },
];

export function GraduatePrograms() {
  const ref = useRef<HTMLElement>(null);
  const lead = useRef<HTMLParagraphElement>(null);

  useScrub(ref, DRIFT);
  useReveal(lead, true, { stagger: 0.05, y: 20 });
  useDrawIn(ref, "[data-motion=rail]", { axis: "y",
    origin: "center top",
    duration: 1, stagger: 0.07, immediateRender: false });

  return (
    <Band
      top={3344}
      height={1080}
      className="bg-black"
      innerRef={ref}
      reveal={{ stagger: 0.06, y: 24 }}
    >
      <p className="wdth-100 absolute left-[117px] top-[150px] text-[13px] font-extrabold leading-[normal] whitespace-nowrap text-accent">
        04 — 대학원
      </p>

      <div className="absolute left-[117px] top-[186px] w-[1000px]">
        <Words
          ref={lead}
          data-motion="lead"
          className="wdth-100 text-[34px] font-black leading-[normal] text-white"
          text="두 개의 특성화 대학원."
        />
      </div>

      <div
        data-motion="rail"
        className="absolute left-[960px] top-[310px] h-[620px] w-px bg-[#404040]"
      />

      <p className="wdth-100 absolute left-[117px] top-[330px] text-[30px] font-extrabold leading-[normal] whitespace-nowrap text-white">
        AI 대학원
      </p>
      <p className="wdth-100 absolute left-[117px] top-[380px] text-[56px] font-black leading-[normal] whitespace-nowrap text-accent">
        &apos;20.4
      </p>
      <p className="wdth-100 absolute left-[117px] top-[460px] w-[700px] text-[15px] font-normal leading-[normal] text-[#a6a6a6]">
        거점국립대 최초·최대 AI융합대학원 (AI융합연구센터 선정)
      </p>
      <p className="wdth-100 absolute left-[117px] top-[490px] w-[700px] text-[15px] font-normal leading-[normal] text-[#a6a6a6]">
        박사급 AI 연구인력 양성, 산학 공동연구 프로젝트 중심 커리큘럼
      </p>

      <p className="wdth-100 absolute left-[1060px] top-[330px] text-[30px] font-extrabold leading-[normal] whitespace-nowrap text-white">
        데이터사이언스전문대학원
      </p>
      <p className="wdth-100 absolute left-[1060px] top-[380px] text-[24px] font-extrabold leading-[normal] whitespace-nowrap text-accent">
        류광열 교수
      </p>
      <p className="wdth-100 absolute left-[1060px] top-[420px] w-[700px] text-[15px] font-normal leading-[normal] text-[#a6a6a6]">
        데이터사이언스학부 · Physical AI·스마트제조·제조데이터분석 연구
      </p>
      <p className="wdth-100 absolute left-[1060px] top-[450px] w-[700px] text-[15px] font-normal leading-[normal] text-[#a6a6a6]">
        &apos;24.3 설립 · 빅데이터·통계·인과추론 전문 인력 양성, 산업체 연계 논문
        지도
      </p>

      <p className="wdth-100 absolute left-[117px] top-[610px] h-[26px] w-[500px] text-[18px] font-extrabold leading-[normal] text-white">
        대학원 3층 교육체계
      </p>

      {LAYERS.map(({ layer, title, body, left }, i) => (
        <div key={layer}>
          <div
            className="group absolute top-[660px] h-[300px] w-[546px]"
            style={{ left: `${left}px` }}
          >
            <div data-motion="layer" className="absolute inset-0">
              <div className="absolute inset-0 overflow-hidden rounded-[12px] bg-surface-card transition-[transform,background-color] duration-300 ease-out hover:bg-[#1d1d1d] motion-safe:group-hover:-translate-y-[6px]">
                <p className="wdth-100 absolute left-[24px] top-[24px] h-[22px] w-[200px] text-[16px] font-black leading-[normal] text-accent">
                  {layer}
                </p>
                <p className="wdth-100 absolute left-[24px] top-[54px] h-[30px] w-[498px] text-[19px] font-extrabold leading-[normal] text-white">
                  {title}
                </p>
                <p className="wdth-100 absolute left-[24px] top-[96px] h-[90px] w-[498px] text-[13px] font-normal leading-[normal] text-muted">
                  {body}
                </p>
              </div>
            </div>
          </div>
          {i < LAYERS.length - 1 && (
            <p
              className="wdth-100 absolute top-[790px] h-[24px] w-[20px] text-[20px] font-black leading-[normal] text-accent"
              style={{ left: `${left + 548}px` }}
            >
              →
            </p>
          )}
        </div>
      ))}
    </Band>
  );
}
