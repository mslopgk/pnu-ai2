import { useRef } from "react";
import { Band } from "../../components/Canvas";
import { useReveal } from "../../motion/useReveal";
import { useScrub } from "../../motion/useScrub";
import { Words } from "../../motion/Words";
import { useDrawIn } from "../../motion/useDrawIn";

const ROWS = [
  { label: "교육조직", asIs: "분산", toBe: "집적·고도화", top: 300 },
  { label: "학생성장", asIs: "개별 지원", toBe: "성장경로별 확대", top: 430 },
  { label: "AI역량", asIs: "분산 캡스톤", toBe: "AX 캡스톤 개설", top: 560 },
  /* Figma leaves this row's To-Be cell empty — the note below carries the copy. */
  { label: "지역확산", asIs: "학내 소규모 활용", toBe: "", top: 690 },
];

/* Headline rises while the closing note settles — opposing parallax. */
const DRIFT = [
  { selector: "[data-motion=lead]", to: { y: -24 } },
  { selector: "[data-motion=note]", to: { y: 18 } },
];

export function AsIsToBe() {
  const ref = useRef<HTMLElement>(null);
  const lead = useRef<HTMLParagraphElement>(null);

  useScrub(ref, DRIFT);
  useReveal(lead, true, { stagger: 0.05, y: 20 });
  useDrawIn(ref, "[data-motion=rule]", { stagger: 0.08, duration: 0.9, origin: "left center", immediateRender: false });
  useDrawIn(ref, "[data-motion=header-bar]", { stagger: 0.12, duration: 0.9, origin: "left center", immediateRender: false });

  return (
    <Band
      top={10904}
      height={1080}
      className="bg-white"
      innerRef={ref}
      reveal={{ stagger: 0.07, y: 24 }}
    >
      <p className="wdth-100 absolute left-[117px] top-[90px] w-[400px] text-[13px] font-extrabold leading-[normal] text-accent">
        11 — 개편 전후
      </p>

      <div className="absolute left-[117px] top-[126px] w-[1200px]">
        <Words
          ref={lead}
          data-motion="lead"
          className="wdth-100 text-[34px] font-black leading-[normal] text-ink"
          text="무엇이 바뀌는가."
        />
      </div>

      <div
        data-motion="header-bar"
        className="absolute left-[117px] top-[220px] h-[36px] w-[700px] bg-[#ebebeb]"
      />
      <p className="wdth-100 absolute left-[137px] top-[230px] w-[660px] text-[13px] font-extrabold leading-[normal] text-ink">
        As-Is (현재)
      </p>
      <div
        data-motion="header-bar"
        className="absolute left-[1103px] top-[220px] h-[36px] w-[700px] bg-[#e0f7eb]"
      />
      <p className="wdth-100 absolute left-[1123px] top-[230px] w-[660px] text-[13px] font-extrabold leading-[normal] text-ink">
        To-Be (2027~)
      </p>

      {ROWS.map(({ label, asIs, toBe, top }, i) => (
        <div key={label}>
          <p
            className="wdth-100 absolute left-[117px] h-[20px] w-[900px] text-[15px] font-extrabold leading-[normal] text-accent"
            style={{ top: `${top}px` }}
          >
            {label}
          </p>
          <p
            className="wdth-100 absolute left-[117px] h-[40px] w-[700px] text-[26px] font-black leading-[normal] text-muted"
            style={{ top: `${top + 26}px` }}
          >
            {asIs}
          </p>
          <p
            className="wdth-100 absolute left-[855px] h-[40px] w-[150px] text-[24px] font-black leading-[normal] text-accent"
            style={{ top: `${top + 26}px` }}
          >
            →
          </p>
          <p
            className="wdth-100 absolute left-[1123px] h-[40px] w-[700px] text-[26px] font-black leading-[normal] text-ink"
            style={{ top: `${top + 26}px` }}
          >
            {toBe}
          </p>
          {i < ROWS.length - 1 && (
            <div
              data-motion="rule"
              className="absolute left-[117px] h-px w-[1686px] bg-[#ebebeb]"
              style={{ top: `${top + 106}px` }}
            />
          )}
        </div>
      ))}

      <div className="absolute left-[117px] top-[830px] h-[24px] w-[1600px]">
        <p
          data-motion="note"
          className="wdth-100 text-[14px] font-normal leading-[normal] text-muted"
        >
          부산대 AI 데이터센터(AIDC)를 축으로 교내에 흩어진 AI 역량을 하나의
          체계로 통합하고, 대학의 역량 강화가 동남권 산업·사회 전반의 성장으로
          이어지는 선순환 구조를 구축합니다.
        </p>
      </div>
    </Band>
  );
}
