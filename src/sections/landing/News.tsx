import { useRef } from "react";
import { Band } from "../../components/Canvas";
import { Cta } from "../../components/Cta";
import { SplitText } from "../../motion/SplitText";
import { useScrub } from "../../motion/useScrub";

const CATEGORIES = ["NEWS", "RESEARCH", "EDUCATION", "EVENT"];

const ITEMS = [
  {
    date: "2026.06.15",
    title: "2026 부산 AI 서밋 · Fei-Fei Li 기조연설 — BEXCO 6월 15일",
    top: 392,
    size: 20,
    ruleTop: 438,
    ruleTone: "bg-ink/10",
  },
  {
    date: "2026.05.22",
    title: "Google AI 교육 협약 체결 — Gemini API + 클라우드 크레딧 지원",
    top: 457,
    size: 20,
    ruleTop: 503,
    ruleTone: "bg-ink/10",
  },
  {
    date: "2026.04.10",
    title: "AI 대학 신설 확정 — 4학부 424명, 2027년 3월 첫 신입생 입학",
    top: 522,
    size: 19,
    ruleTop: 568,
    ruleTone: "bg-ink/10",
  },
  {
    date: "2026.03.12",
    title: "BioAI 연구실 — Nature Machine Intelligence 게재 (신약 발굴 AI)",
    top: 587,
    size: 19,
    ruleTop: 633,
    ruleTone: "bg-ink/10",
  },
  {
    date: "2025.12.20",
    title: "IT관 준공 — 267억 / 13,161㎡ / 친환경 인텔리전트 빌딩",
    top: 652,
    size: 19,
    ruleTop: 698,
    ruleTone: "bg-ink/25",
  },
  {
    date: "2025.08.21",
    title: "RoboCup 2025 세계 챔피언십 우승 — 부산대 'TidyBoy'",
    top: 717,
    size: 19,
    ruleTop: 763,
    ruleTone: "bg-ink/25",
  },
];

/* Every hairline in the list wipes out from the left, top row first. */
const DRAW = [
  {
    selector: "[data-motion=rule]",
    from: { scaleX: 0, transformOrigin: "left center" },
    to: { scaleX: 1, stagger: 0.06 },
  },
];

export function News() {
  const ref = useRef<HTMLElement>(null);
  useScrub(ref, DRAW, { start: "top 80%", end: "bottom 90%" });

  return (
    <Band
      top={14823}
      height={1078}
      className="bg-white"
      innerRef={ref}
      reveal={{ stagger: 0.055 }}
    >
      <p className="wdth-100 absolute left-[117px] top-[263px] text-[13px] font-extrabold leading-[normal] tracking-[0.52px] whitespace-nowrap text-accent">
        15 — NEWS
      </p>
      <SplitText
        text="지금, AI대학의 소식"
        stagger={0.035}
        className="wdth-100 absolute left-[117px] top-[291px] text-[32px] font-extrabold leading-[normal] whitespace-pre text-ink"
      />

      <div className="absolute left-[1509px] top-[299px] flex items-center gap-[20px] overflow-hidden whitespace-nowrap text-[13px] leading-[normal]">
        {CATEGORIES.map((category, i) => (
          <p
            key={category}
            className={`wdth-100 shrink-0 font-normal transition-colors duration-300 ${
              i === 0 ? "text-accent" : "text-muted hover:text-ink"
            }`}
          >
            {category}
          </p>
        ))}
      </div>

      <div
        data-motion="rule"
        className="absolute left-[117px] top-[373px] h-px w-[1686px] bg-ink/25"
      />

      {ITEMS.map(({ date, title, top, size, ruleTop, ruleTone }) => (
        <div key={date} className="group">
          <p
            className="wdth-100 absolute left-[117px] text-[14px] font-normal leading-[normal] whitespace-nowrap text-muted transition-colors duration-300 group-hover:text-ink"
            style={{ top: `${top + 6}px` }}
          >
            {date}
          </p>
          <p
            className="wdth-100 absolute left-[267px] w-[900px] font-extrabold leading-[normal] text-ink transition-transform duration-300 group-hover:translate-x-[8px]"
            style={{ top: `${top}px`, fontSize: `${size}px` }}
          >
            {title}
          </p>
          <div
            data-motion="rule"
            className={`absolute left-[117px] h-px w-[1686px] ${ruleTone}`}
            style={{ top: `${ruleTop}px` }}
          />
        </div>
      ))}

      <Cta label="전체 소식 보기" className="left-[117px] top-[794px]" />
    </Band>
  );
}
