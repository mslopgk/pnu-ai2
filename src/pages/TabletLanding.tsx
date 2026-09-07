import { Link } from "react-router-dom";
import { Canvas, Band } from "../components/Canvas";
import { CountUp } from "../motion/CountUp";

/*
  Figma frame "Tablet - 834" (27:161) — 834 × 3406.238.

  Same five-section scope as the Mobile frame, and likewise reproduced as
  drawn — including the Statistics background image parked off-canvas at
  x = -400 in the source file.
*/

const NAV_LINKS = [
  { label: "AI College", left: 16.4 },
  { label: "Education", left: 144.96 },
  { label: "Research", left: 272.52 },
  { label: "People", left: 395.08 },
  { label: "News", left: 497.64 },
];

/** Figma gives the narrow navs no destinations; these match the desktop nav. */
const NAV_ROUTES: Record<string, string> = {
  "AI College": "/",
  Education: "/education-research",
  Research: "/education-research",
  People: "/overview",
  News: "/",
};

const STATS = [
  { label: "DEPARTMENTS", number: "5", left: 432, top: 40 },
  { label: "STUDENTS", number: "424", left: 629, top: 40 },
  { label: "FACULTY", number: "60", left: 432, top: 188 },
  { label: "RESEARCH", number: "480", suffix: "+", left: 629, top: 188 },
  { label: "AWARDS", number: "28", suffix: "+", left: 432, top: 336 },
  { label: "GLOBAL QS", number: "76", left: 629, top: 336 },
];

/*
  The five units the rest of the site documents (see
  src/sections/departments/DepartmentsGrid.tsx). Figma's deleted mobile frame
  repeated two of them across six identical cards sharing one photo; each unit
  now appears once, with its own artwork.
*/
const DEPARTMENTS = [
  {
    eyebrow: ["AI", "COMPUTING"] as const,
    title: "AI컴퓨터공학부",
    meta: "학부 · 정원 214명",
    description:
      "AI 핵심기술과 컴퓨터공학을 기반으로 미래 지능정보사회를 이끌 인재를 양성합니다.",
    image: "/assets/academics-ai-computing.webp",
  },
  {
    eyebrow: ["DATA", "SCIENCE"] as const,
    title: "데이터사이언스학부",
    meta: "학부 · 정원 79명",
    description: "데이터 수집·처리·분석과 통계적 추론을 다룹니다.",
    image: "/assets/academics-data-science.webp",
  },
  {
    eyebrow: ["STATIS-", "TICS"] as const,
    title: "통계학과",
    meta: "학과 · 정원 35명",
    description: "통계적 추론과 신뢰성 검증·불확실성 정량화를 전담합니다.",
    image: "/assets/academics-data-science.webp",
  },
  {
    eyebrow: ["INDUSTRIAL", "ENGINEERING"] as const,
    title: "산업공학부",
    meta: "학부 · 정원 69명",
    description: "산업·사회 문제를 프로세스로 구조화·모델링·최적화합니다.",
    image: "/assets/academics-industrial.webp",
  },
  {
    eyebrow: ["AX", "CONVER-"] as const,
    title: "AX융합학부",
    meta: "학부 · 정원 27명",
    description: "ADP 공통역량을 도메인별 AI전환(AX)으로 확산합니다.",
    image: "/assets/academics-ax-convergence.webp",
  },
];

/* Two columns, 433.373px row pitch; five units leave the last cell empty. */
const CARD_SLOTS = [
  { left: 48, top: 172.8 },
  { left: 433, top: 172.8 },
  { left: 48, top: 606.173 },
  { left: 433, top: 606.173 },
  { left: 48, top: 1039.545 },
];

export default function TabletLanding() {
  return (
    <Canvas width={834} height={3406.238}>
      <div className="absolute inset-0 bg-hero-bg" />

      <img
        src="/assets/logo.webp"
        alt="부산대학교 AI대학"
        className="absolute left-[48px] top-[28px] h-[42px] w-[61.176px] object-contain object-bottom"
      />

      <div className="absolute left-[152.96px] top-[24px] flex h-[42.64px] w-[559.04px] items-center gap-[47.56px] overflow-hidden rounded-full bg-section-dark px-[16.4px]">
        <div className="absolute left-[128.74px] top-0 h-[42.64px] w-[113.16px] rounded-[34.44px] bg-[rgba(126,180,255,0.12)]" />
        {NAV_LINKS.map(({ label }) => (
          <Link
            key={label}
            to={NAV_ROUTES[label] ?? "/"}
            className="relative flex shrink-0 items-center overflow-hidden font-ui text-[16.4px] font-semibold leading-[normal] whitespace-nowrap text-white"
          >
            {label}
          </Link>
        ))}
      </div>

      <Band top={100} height={483.52} reveal>
        <div className="absolute left-[342.48px] top-0 size-[443.52px] overflow-hidden">
          <img
            src="/assets/hero-portrait.webp"
            alt=""
            className="pointer-events-none absolute left-0 top-0 size-full max-w-none"
          />
        </div>
        <p className="absolute left-[48px] top-[40px] display-type text-[90px] leading-[normal] whitespace-nowrap text-ink">
          Intelligence,
        </p>
        <p className="absolute left-[48px] top-[238px] display-type text-[90px] leading-[normal] whitespace-nowrap text-ink">
          Reimagined.
        </p>
      </Band>

      <Band top={583.52} height={502} className="bg-black" reveal={{ stagger: 0.08 }}>
        <p className="absolute left-[32px] top-[330px] display-type text-[96.6px] leading-[normal] whitespace-nowrap text-white mix-blend-exclusion">
          ARISE
        </p>
        <p className="absolute left-[32px] top-[425.92px] display-type text-[96.6px] leading-[normal] whitespace-nowrap text-white mix-blend-exclusion">
          PNU
        </p>

        {STATS.map(({ label, number, suffix, left, top }) => (
          <div
            key={label}
            className="absolute h-[126px] w-[193.2px]"
            style={{ left: `${left}px`, top: `${top}px` }}
          >
            <p className="wdth-100 absolute left-0 top-0 text-[8.4px] font-extrabold leading-[0.87] whitespace-nowrap text-white">
              {label}
            </p>
            <div className="absolute left-0 top-[-19.74px] flex items-start overflow-hidden">
              <p className="wdth-100 mr-[-8.4px] shrink-0 text-[96.6px] font-black leading-[normal] whitespace-nowrap text-white">
                <CountUp value={number} />
              </p>
              <div className="flex shrink-0 flex-col items-start overflow-hidden pt-[21px]">
                {suffix && (
                  <p className="wdth-100 shrink-0 text-[26.88px] font-black leading-[0.87] whitespace-nowrap text-white">
                    {suffix}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </Band>

      <Band top={1085.52} height={352} className="bg-black" reveal>
        <p className="absolute left-[48px] top-[80px] display-type text-[160px] leading-[normal] tracking-[4.8px] whitespace-nowrap text-white">
          ADP+X
        </p>
      </Band>

      <Band top={1437.52} height={1504.918} className="bg-white" reveal={{ stagger: 0.09 }}>
        <p className="absolute left-[48px] top-[56px] display-type text-[64px] leading-[normal] whitespace-nowrap text-ink">
          ACADEMICS
        </p>

        {DEPARTMENTS.map((card, i) => {
          const { left, top } = CARD_SLOTS[i];
          return (
          <article
            key={i}
            className="absolute flex h-[409.373px] w-[353px] flex-col items-start gap-[16.778px] overflow-hidden rounded-card bg-surface-card"
            style={{ left: `${left}px`, top: `${top}px` }}
          >
            <div className="h-[216.9px] w-full shrink-0 overflow-hidden rounded-card">
              <img
                src={card.image}
                alt=""
                className="pointer-events-none size-full max-w-none object-cover"
              />
            </div>
            <div className="flex w-full min-h-px flex-1 flex-col items-start gap-[16.107px] overflow-hidden px-[21.476px] pb-[25.503px]">
              <div className="flex w-full flex-col items-start overflow-hidden">
                <div className="wdth-100 h-[50.335px] w-full text-[16.107px] font-bold text-accent">
                  <p className="leading-[normal]">{card.eyebrow[0]}</p>
                  <p className="leading-[normal]">{card.eyebrow[1]}</p>
                </div>
                <p className="wdth-100 h-[25.503px] w-full text-[16.107px] font-semibold leading-[normal] text-[#efefef]">
                  {card.title}
                </p>
                <p className="wdth-100 h-[16.778px] w-full text-[8.724px] font-normal leading-[normal] text-[#efefef]">
                  {card.meta}
                </p>
              </div>
              <p className="wdth-100 h-[41.61px] w-full text-[13.423px] font-normal leading-[normal] text-[#efefef]">
                {card.description}
              </p>
            </div>
          </article>
          );
        })}
      </Band>

      <Band top={2942.438} height={463.8} className="bg-black" reveal>
        <p className="wdth-100 absolute left-[48px] top-[80px] text-[20px] font-extrabold leading-[0.87] whitespace-nowrap text-white">
          EDUCATION
        </p>
        <div className="absolute left-[48px] top-[129px] display-type text-[68px] whitespace-nowrap text-white">
          <p className="leading-[normal]">LEARN.</p>
          <p className="leading-[normal]">BUILD.</p>
          <p className="leading-[normal]">CREATE.</p>
        </div>
      </Band>
    </Canvas>
  );
}
