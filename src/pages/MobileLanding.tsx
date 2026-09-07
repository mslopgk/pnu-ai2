import { useState } from "react";
import { Canvas, Band } from "../components/Canvas";
import { CountUp } from "../motion/CountUp";
import { Sidebar, type MenuGroupKey } from "../components/Sidebar";

/*
  Figma frame "Mobile - 390" (26:77) — 390 × 4711.796.

  Note: this frame (and its Tablet sibling) predates the current desktop
  landing. It covers five sections — Hero, Statistics, ADPX, Academics,
  Education — and is reproduced exactly as drawn, including the Statistics
  background image, which the source file parks off-canvas at x = -390.
*/

const STATS = [
  { label: "DEPARTMENTS", number: "5", left: 24, top: 535.5 },
  { label: "STUDENTS", number: "424", left: 207, top: 535.5 },
  { label: "FACULTY", number: "60", left: 24, top: 655.5 },
  { label: "RESEARCH", number: "480", suffix: "+", left: 207, top: 655.5 },
  { label: "AWARDS", number: "28", suffix: "+", left: 24, top: 775.5 },
  { label: "GLOBAL QS", number: "76", left: 207, top: 775.5 },
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

/* One 420.616px pitch per card; the sixth slot is gone with the duplicate. */
const CARD_TOPS = [112.8, 533.416, 954.032, 1374.648, 1795.264];

export default function MobileLanding() {
  /* Figma draws no mobile menu, so the button opens the shared sidebar. */
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState<MenuGroupKey>("departments");

  return (
    <Canvas width={390} height={4291.18}>
      <div className="absolute inset-0 bg-hero-bg" />

      <img
        src="/assets/logo.webp"
        alt="부산대학교 AI대학"
        className="absolute left-[24px] top-[24px] h-[30.8px] w-[44.862px] object-contain object-bottom"
      />
      <button
        type="button"
        aria-label="메뉴 열기"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(true)}
        className="absolute left-[342px] top-[32px] h-[16px] w-[24px] overflow-hidden"
      >
        <span className="absolute left-0 top-0 h-[2px] w-[24px] bg-ink" />
        <span className="absolute left-0 top-[7px] h-[2px] w-[24px] bg-ink" />
        <span className="absolute left-0 top-[14px] h-[2px] w-[24px] bg-ink" />
      </button>

      <Band top={88} height={536} reveal>
        <div className="absolute left-[24px] top-0 size-[342px] overflow-hidden">
          <img
            src="/assets/hero-portrait.webp"
            alt=""
            className="pointer-events-none absolute left-0 top-0 size-full max-w-none"
          />
        </div>
        <p className="absolute left-[24px] top-[374px] display-type text-[55px] leading-[normal] whitespace-nowrap text-ink">
          Intelligence,
        </p>
        <p className="absolute left-[24px] top-[430px] display-type text-[55px] leading-[normal] whitespace-nowrap text-ink">
          Reimagined.
        </p>
      </Band>

      <Band top={624} height={925.5} className="bg-black" reveal={{ stagger: 0.08 }}>
        <p className="absolute left-[24px] top-[347.5px] display-type text-[80.5px] leading-[normal] whitespace-nowrap text-white mix-blend-exclusion">
          ARISE
        </p>
        <p className="absolute left-[24px] top-[429.1px] display-type text-[80.5px] leading-[normal] whitespace-nowrap text-white mix-blend-exclusion">
          PNU
        </p>

        {STATS.map(({ label, number, suffix, left, top }) => (
          <div
            key={label}
            className="absolute h-[102px] w-[156.4px]"
            style={{ left: `${left}px`, top: `${top}px` }}
          >
            <p className="wdth-100 absolute left-0 top-0 text-[6.8px] font-extrabold leading-[0.87] whitespace-nowrap text-white">
              {label}
            </p>
            <div className="absolute left-0 top-[-15.98px] flex items-start overflow-hidden">
              <p className="wdth-100 mr-[-6.8px] shrink-0 text-[78.2px] font-black leading-[normal] whitespace-nowrap text-white">
                <CountUp value={number} />
              </p>
              <div className="flex shrink-0 flex-col items-start overflow-hidden pt-[17px]">
                {suffix && (
                  <p className="wdth-100 shrink-0 text-[21.76px] font-black leading-[0.87] whitespace-nowrap text-white">
                    {suffix}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </Band>

      <Band top={1549.5} height={192} className="bg-black" reveal>
        <p className="absolute left-[24px] top-[48px] display-type text-[80px] leading-[normal] tracking-[2.4px] whitespace-nowrap text-white">
          ADP+X
        </p>
      </Band>

      <Band top={1741.5} height={2215.88} className="bg-white" reveal={{ stagger: 0.09 }}>
        <p className="absolute left-[24px] top-[40px] display-type text-[34px] leading-[normal] whitespace-nowrap text-ink">
          ACADEMICS
        </p>

        {DEPARTMENTS.map((card, i) => (
          <article
            key={i}
            className="absolute left-[24px] flex h-[396.616px] w-[342px] flex-col items-start gap-[16.255px] overflow-hidden rounded-[17.555px] bg-surface-card"
            style={{ top: `${CARD_TOPS[i]}px` }}
          >
            <div className="h-[210.2px] w-full shrink-0 overflow-hidden rounded-[17.555px]">
              <img
                src={card.image}
                alt=""
                className="pointer-events-none size-full max-w-none object-cover"
              />
            </div>
            <div className="flex w-full min-h-px flex-1 flex-col items-start gap-[15.605px] overflow-hidden px-[20.806px] pb-[24.707px]">
              <div className="flex w-full flex-col items-start overflow-hidden">
                <div className="wdth-100 h-[48.764px] w-full text-[15.6px] font-bold text-accent">
                  <p className="leading-[normal]">{card.eyebrow[0]}</p>
                  <p className="leading-[normal]">{card.eyebrow[1]}</p>
                </div>
                <p className="wdth-100 h-[24.707px] w-full text-[15.6px] font-semibold leading-[normal] text-[#efefef]">
                  {card.title}
                </p>
                <p className="wdth-100 h-[16.255px] w-full text-[8.45px] font-normal leading-[normal] text-[#efefef]">
                  {card.meta}
                </p>
              </div>
              <p className="wdth-100 h-[40.312px] w-full text-[13px] font-normal leading-[normal] text-[#efefef]">
                {card.description}
              </p>
            </div>
          </article>
        ))}
      </Band>

      <Band top={3957.384} height={333.8} className="bg-black" reveal>
        <p className="wdth-100 absolute left-[24px] top-[56px] text-[20px] font-extrabold leading-[0.87] whitespace-nowrap text-white">
          EDUCATION
        </p>
        <div className="absolute left-[24px] top-[97px] display-type text-[48px] whitespace-nowrap text-white">
          <p className="leading-[normal]">LEARN.</p>
          <p className="leading-[normal]">BUILD.</p>
          <p className="leading-[normal]">CREATE.</p>
        </div>
      </Band>
      <Sidebar
        open={menuOpen}
        activeGroup={activeGroup}
        onActiveGroupChange={setActiveGroup}
        onClose={() => setMenuOpen(false)}
      />
    </Canvas>
  );
}
