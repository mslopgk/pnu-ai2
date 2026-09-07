import { useRef } from "react";
import { Band } from "../../components/Canvas";
import { useReveal } from "../../motion/useReveal";
import { useScrub } from "../../motion/useScrub";
import { Words } from "../../motion/Words";
import { useDrawIn } from "../../motion/useDrawIn";

const ENGINES = [
  {
    field: "해운·항만물류",
    partners: "KMI · BPA · HJNC 등",
    highlight: "부산항 AX전환 8,921억원 연계",
    top: 323.5,
  },
  {
    field: "첨단조선해양",
    partners: "삼성중공업 · 한화오션 · 한국해양과학기술원 등",
    highlight: "명지·녹산 실증산단 249억원",
    top: 401.5,
  },
  {
    field: "미래모빌리티·제조",
    partners: "DN솔루션즈 · 현대자동차 · LG전자 · 르노코리아 등",
    highlight: null,
    top: 479.5,
  },
  {
    field: "우주항공·방산",
    partners: "한화에어로스페이스 · KAI · 대한항공 등",
    highlight: "부산 함정 MRO 490억원",
    top: 557.5,
  },
  {
    field: "차세대 원자력·SMR",
    partners: "한국수력원자력 · 한국전기연구원 등",
    highlight: null,
    top: 635.5,
  },
];

const MEMBERSHIP = [
  { step: "① 수요 제안", detail: "문제 제안·포럼 참여", left: 117, arrow: 607 },
  {
    step: "② 공동연구",
    detail: "현금·현물 매칭, 데이터·테스트베드 제공",
    left: 647,
    arrow: 1137,
  },
  {
    step: "③ 전략 파트너",
    detail: "공동연구소·겸직 파견·채용 연계",
    left: 1177,
    arrow: null,
  },
];

/* Headline rises while the closing note settles — opposing parallax. */
const DRIFT = [
  { selector: "[data-motion=lead]", to: { y: -24 } },
  { selector: "[data-motion=note]", to: { y: 16 } },
];

export function IndustryPartnership() {
  const ref = useRef<HTMLElement>(null);
  const lead = useRef<HTMLParagraphElement>(null);

  useScrub(ref, DRIFT);
  useReveal(lead, true, { stagger: 0.05, y: 20 });
  useDrawIn(ref, "[data-motion=rule]", { stagger: 0.06, origin: "left center", duration: 0.8, immediateRender: false });

  return (
    <Band
      top={8744}
      height={1080}
      className="bg-white"
      innerRef={ref}
      reveal={{ stagger: 0.06, y: 22 }}
    >
      <p className="wdth-100 absolute left-[117px] top-[182px] w-[300px] text-[13px] font-extrabold leading-[normal] text-accent">
        09 — 산학협력
      </p>

      <div className="absolute left-[117px] top-[218px] w-[1600px]">
        <Words
          ref={lead}
          data-motion="lead"
          className="wdth-100 text-[34px] font-black leading-[normal] text-ink"
          text="5대 성장엔진 분야와 함께 성장합니다."
        />
      </div>

      <div
        data-motion="rule"
        className="absolute left-[117px] top-[305.5px] h-px w-[1686px] bg-[#e6e6e6]"
      />

      {ENGINES.map(({ field, partners, highlight, top }) => (
        <div key={field}>
          <p
            className="wdth-100 absolute left-[117px] w-[320px] text-[20px] font-black leading-[normal] text-ink"
            style={{ top: `${top}px` }}
          >
            {field}
          </p>
          <p
            className="wdth-100 absolute left-[460px] h-[22px] w-[750px] text-[15px] font-normal leading-[normal] text-muted"
            style={{ top: `${top + 4}px` }}
          >
            {partners}
          </p>
          {highlight && (
            <p
              className="wdth-100 absolute left-[1300px] h-[24px] w-[500px] text-[16px] font-extrabold leading-[normal] text-accent"
              style={{ top: `${top + 2}px` }}
            >
              {highlight}
            </p>
          )}
          <div
            data-motion="rule"
            className="absolute left-[117px] h-px w-[1686px] bg-[#e6e6e6]"
            style={{ top: `${top + 60}px` }}
          />
        </div>
      ))}

      <div className="absolute left-[117px] top-[733.5px] h-[42px] w-[1600px]">
        <p
          data-motion="note"
          className="wdth-100 text-[15px] font-normal leading-[normal] text-muted"
        >
          장영실AI융합연구원 산하 칠정산 주권AI연구센터·앙부일구
          AI교육·윤리연구센터가 이들 성장엔진 분야의 AX 프로젝트를
          Top-Down·Bottom-Up 이원 구조로 수행하며, 우수 과제는 첨단전략산업
          융합연구원의 산업 연계 프로젝트로 승격됩니다.
        </p>
      </div>

      <p className="wdth-100 absolute left-[117px] top-[813.5px] w-[400px] text-[14px] font-extrabold leading-[normal] text-ink">
        기업 참여 3단계 멤버십
      </p>

      {MEMBERSHIP.map(({ step, detail, left, arrow }) => (
        <div key={step}>
          <p
            className="wdth-100 absolute top-[843.5px] w-[500px] text-[13px] font-extrabold leading-[normal] text-accent"
            style={{ left: `${left}px` }}
          >
            {step}
          </p>
          <p
            className="wdth-100 absolute top-[865.5px] h-[32px] w-[480px] text-[12px] font-normal leading-[normal] text-muted"
            style={{ left: `${left}px` }}
          >
            {detail}
          </p>
          {arrow !== null && (
            <p
              className="wdth-100 absolute top-[843.5px] h-[18px] w-[20px] text-[14px] font-extrabold leading-[normal] text-muted"
              style={{ left: `${arrow}px` }}
            >
              →
            </p>
          )}
        </div>
      ))}
    </Band>
  );
}
