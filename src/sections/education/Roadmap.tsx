import { useRef } from "react";
import { Band } from "../../components/Canvas";
import { useReveal } from "../../motion/useReveal";
import { useScrub } from "../../motion/useScrub";
import { Words } from "../../motion/Words";
import { useDrawIn } from "../../motion/useDrawIn";

const PHASES = [
  {
    year: "2026",
    title: "설계·기능연계",
    body: "AI대학 학칙·교육과정·정원안 마련, 대학원 교과·연구자산을 A·D·X로 매핑, 공동지도·AX 연구트랙 시범 운영",
    tag: "산출물 · 학칙·조직·정원 심의안",
    tagWidth: 230,
    top: 206,
  },
  {
    year: "2027",
    title: "학부 출범·대학원 1단계",
    body: "AI대학 2027.3 출범, AX융합학부 승인 범위 운영, AX 연구트랙·편제의 단계 개편 착수",
    tag: "산출물 · 승인 조직·연구트랙",
    tagWidth: 208,
    top: 366,
  },
  {
    year: "2028",
    title: "대학원 2단계 확대",
    body: "A·D 공통교과·AX 심화교과 학점·공동지도 정착, 성과 확인된 AX 연구트랙을 전공·세부전공으로 확대",
    tag: "산출물 · 확대 연구트랙안·실증성과",
    tagWidth: 241,
    top: 526,
  },
  {
    year: "2029",
    title: "성과기반 재편",
    body: "학생·산업·연구수요에 따라 AX융합전공·대학원 연구트랙을 신설·통합·일몰하고 교원·정원 조정",
    tag: "산출물 · 전공·트랙 조정안",
    tagWidth: 197,
    top: 686,
  },
  {
    year: "2030",
    title: "3원 제도화·산학 정착",
    body: "5개년 성과로 AI·DS·AX 3원의 조직·학위·정원·운영규정을 정착, 계약학과·후속 공동연구 확대",
    tag: "산출물 · 종합평가서·지속운영 규정",
    tagWidth: 241,
    top: 846,
  },
];

/* Headline rises while the phase copy settles — opposing parallax. */
const DRIFT = [
  { selector: "[data-motion=lead]", to: { y: -22 } },
  { selector: "[data-motion=note]", to: { y: 14 } },
];

export function Roadmap() {
  const ref = useRef<HTMLElement>(null);
  const lead = useRef<HTMLParagraphElement>(null);

  useScrub(ref, DRIFT);
  useReveal(lead, true, { stagger: 0.05, y: 20 });
  // The spine draws downward just before the first phase lands.
  useDrawIn(ref, "[data-motion=rail]", { axis: "y",
    origin: "center top",
    duration: 1.2,
    start: "top 78%", stagger: 0.07, immediateRender: false });

  return (
    <Band
      top={9824}
      height={1080}
      className="bg-white"
      innerRef={ref}
      reveal={{ stagger: 0.08, y: 26 }}
    >
      <p className="wdth-100 absolute left-[117px] top-[80px] w-[400px] text-[13px] font-extrabold leading-[normal] text-accent">
        10 — 5년 로드맵
      </p>

      <div className="absolute left-[117px] top-[116px] w-[1600px]">
        <Words
          ref={lead}
          data-motion="lead"
          className="wdth-100 text-[34px] font-black leading-[normal] text-ink"
          text="2026년부터 2030년까지, 단계적으로 완성됩니다."
        />
      </div>

      <div
        data-motion="rail"
        className="absolute left-[232px] top-[218px] h-[760px] w-[2px] bg-[#d9d9d9]"
      />

      {PHASES.map(({ year, title, body, tag, tagWidth, top }) => (
        <div key={year}>
          <span
            className="absolute left-[225px] size-[16px] rounded-full bg-accent"
            style={{ top: `${top + 4}px` }}
          />
          <p
            className="wdth-100 absolute left-[117px] h-[28px] w-[100px] text-[22px] font-black leading-[normal] text-ink"
            style={{ top: `${top}px` }}
          >
            {year}
          </p>
          <p
            className="wdth-100 absolute left-[260px] w-[320px] text-[17px] font-extrabold leading-[normal] text-ink"
            style={{ top: `${top + 2}px` }}
          >
            {title}
          </p>
          <p
            data-motion="note"
            className="wdth-100 absolute left-[260px] h-[60px] w-[1250px] text-[13px] font-normal leading-[normal] text-muted"
            style={{ top: `${top + 34}px` }}
          >
            {body}
          </p>
          <div
            className="absolute left-[260px] h-[28px] overflow-hidden rounded-[14px] bg-[#e0f7eb]"
            style={{ top: `${top + 94}px`, width: `${tagWidth}px` }}
          >
            <p
              className="wdth-100 absolute left-0 top-[6px] h-[16px] text-center text-[11px] font-extrabold leading-[normal] text-[#008040]"
              style={{ width: `${tagWidth}px` }}
            >
              {tag}
            </p>
          </div>
        </div>
      ))}
    </Band>
  );
}
