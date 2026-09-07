import { useRef } from "react";
import { Band } from "../../components/Canvas";
import { useReveal } from "../../motion/useReveal";
import { useScrub } from "../../motion/useScrub";
import { Words } from "../../motion/Words";
import { useDrawIn } from "../../motion/useDrawIn";

const ROLES = [
  {
    role: "연구원장",
    duties:
      "연구원 총괄, AX 연구 아젠다 설정, 대형 산학과제 기획, 특성화 융합연구원·기업 협력 총괄",
    top: 377,
  },
  {
    role: "AI 핵심기술 교원",
    duties:
      "각 센터의 AI 모델·데이터·시스템 연구책임(연구·과제책임자), 도메인 과제의 AI 공급, 대학원 연구지도",
    top: 423,
  },
  {
    role: "도메인(성장엔진) 교원",
    duties:
      "산업 문제정의·데이터해석·현장 제약조건 제시(AI 수요 역할), AX 과제 공동 PI, 실증 설계",
    top: 469,
  },
  {
    role: "기업·출연연 전문가",
    duties:
      "겸임·겸직·공동임용·산학 공동지도, 현장문제·데이터·테스트베드 제공, 실증 공동수행, 창업 멘토",
    top: 515,
  },
  {
    role: "전문연구인력",
    duties:
      "상시 연구 수행, 데이터 구축·모델 개발·실증, PNU AX 1000/100/10 성장경로 연계",
    top: 561,
  },
  {
    role: "행정 전담인력",
    duties: "과제 협약·정산, 기업 컨택, 보안·윤리 절차, 성과 관리",
    top: 607,
  },
];

/* Headline rises while the Post-Doc panel settles — opposing parallax. */
const DRIFT = [
  { selector: "[data-motion=lead]", to: { y: -22 } },
  { selector: "[data-motion=note]", to: { y: 16 } },
];

export function ResearchOrganization() {
  const ref = useRef<HTMLElement>(null);
  const lead = useRef<HTMLParagraphElement>(null);

  useScrub(ref, DRIFT);
  useReveal(lead, true, { stagger: 0.05, y: 20 });
  useDrawIn(ref, "[data-motion=rule]", { stagger: 0.06, origin: "left center", duration: 0.8, immediateRender: false });

  return (
    <Band
      top={7664}
      height={1080}
      className="bg-surface-card"
      innerRef={ref}
      reveal={{ stagger: 0.06, y: 22 }}
    >
      <p className="wdth-100 absolute left-[117px] top-[237px] w-[400px] text-[13px] font-extrabold leading-[normal] text-accent">
        08 — 연구조직 운영
      </p>

      <div className="absolute left-[117px] top-[273px] w-[1400px]">
        <Words
          ref={lead}
          data-motion="lead"
          className="wdth-100 text-[30px] font-black leading-[normal] text-white"
          text="전문성과 유연성을 겸비한 인력 운영체계."
        />
      </div>

      <p className="wdth-100 absolute left-[117px] top-[323px] h-[20px] w-[1400px] text-[13px] font-normal leading-[normal] text-white">
        겸임·겸직·공동임용 등 다양한 인력 확보 방식으로 우수 연구인력을
        전략적으로 확보·운영합니다.
      </p>

      {ROLES.map(({ role, duties, top }) => (
        <div key={role}>
          <p
            className="wdth-100 absolute left-[117px] h-[40px] w-[260px] text-[14px] font-extrabold leading-[normal] text-white"
            style={{ top: `${top}px` }}
          >
            {role}
          </p>
          <p
            className="wdth-100 absolute left-[400px] h-[40px] w-[1400px] text-[12px] font-normal leading-[normal] text-white"
            style={{ top: `${top}px` }}
          >
            {duties}
          </p>
          <div
            data-motion="rule"
            className="absolute left-[117px] h-px w-[1686px] bg-[#e6e6e6]"
            style={{ top: `${top + 36}px` }}
          />
        </div>
      ))}

      <div className="absolute left-[117px] top-[673px] h-[170px] w-[1686px]">
        <div className="absolute inset-0 bg-[#232323]" />
        <p className="wdth-100 absolute left-[24px] top-[20px] h-[22px] w-[1200px] text-[16px] font-extrabold leading-[normal] text-white">
          지역정착형 박사후연구원(Post-Doc) 지원체계
        </p>
        <p
          data-motion="note"
          className="wdth-100 absolute left-[24px] top-[52px] h-[100px] w-[1600px] text-[13px] font-normal leading-[normal] text-white"
        >
          장기 데이터 축적·반복 실증을 수행할 지역정착형 Post-Doc을 핵심
          연구인력으로 육성하며, 단순 연구비가 아닌 고용보장·정착지원을 포괄하는
          패키지형 지원체계를 구축합니다. 확보한 과제 재원에서
          인건비·연구활동비·데이터·시험·논문·특허 비용을 지원하고,
          후속과제·전략과제·국책과제와 연계한 계속고용 체계를 마련합니다.
          Post-Doc이 연구기획·국제협력·학생지도를 주도하도록 지원하며,
          주거·연구공간 및 지역기업 취업·창업 연계로 지역 정착을 지원합니다.
          기업 R&amp;D 문제는 교수·기업 연구책임자가 공동 지도하며, 학위논문과
          실증 리포트·데이터셋을 연구–실증 포트폴리오로 관리해 석사 학위논문
          대체실적제와 창업 후보 발굴에 활용합니다.
        </p>
      </div>
    </Band>
  );
}
