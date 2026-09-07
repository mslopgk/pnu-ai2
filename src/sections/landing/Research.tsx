import { useRef } from "react";
import { Band } from "../../components/Canvas";
import { Cta } from "../../components/Cta";
import { CountUp } from "../../motion/CountUp";
import { useReveal } from "../../motion/useReveal";
import { useScrub } from "../../motion/useScrub";

const KEYWORDS: { label: string; size: number; dim?: boolean }[] = [
  { label: "AI", size: 32 },
  { label: "CV", size: 20, dim: true },
  { label: "NLP", size: 24 },
  { label: "LLM", size: 20, dim: true },
  { label: "PHYSICAL AI", size: 28 },
  { label: "XR", size: 20, dim: true },
  { label: "BIO AI", size: 24 },
  { label: "DATA", size: 20, dim: true },
];

/**
 * A display headline split into letters so they can reveal one after another.
 * Each letter is inline-block, which is what lets it be transformed.
 */
function SplitChars({
  text,
  className,
  stagger = 0.05,
}: {
  text: string;
  className: string;
  stagger?: number;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  useReveal(ref, true, { stagger, y: 36 });

  return (
    <p ref={ref} className={className}>
      {Array.from(text).map((ch, i) => (
        <span key={`${ch}-${i}`} className="inline-block">
          {ch === " " ? " " : ch}
        </span>
      ))}
    </p>
  );
}

/* The keyword cluster and the figures below it drift against each other. */
const DRIFT = [
  { selector: "[data-motion=keywords]", from: { x: 60 }, to: { x: -60 } },
  { selector: "[data-motion=figures]", from: { x: -28 }, to: { x: 28 } },
];

export function Research() {
  const ref = useRef<HTMLElement>(null);
  const keywordsRef = useRef<HTMLDivElement>(null);

  useScrub(ref, DRIFT);
  /* The research keywords land one after the other. */
  useReveal(keywordsRef, true, { stagger: 0.07, y: 20 });

  return (
    <Band
      top={8343}
      height={1080}
      className="bg-white"
      innerRef={ref}
      reveal={{ stagger: 0.08 }}
    >
      <p className="wdth-100 absolute left-0 top-[198px] w-[1920px] text-center text-[13px] font-extrabold leading-[normal] tracking-[0.52px] text-accent">
        08 — RESEARCH
      </p>
      <SplitChars
        text="한계 없는 연구."
        className="wdth-100 absolute left-0 top-[236px] w-[1920px] text-center text-[72px] font-black leading-[normal] text-ink"
      />
      <p className="wdth-100 absolute left-0 top-[358px] w-[1920px] text-center text-[16px] font-normal leading-[normal] text-muted">
        AI 핵심기술부터 산업 현장의 문제 해결까지 다양한 분야의 연구를
        수행합니다.
      </p>

      <div
        ref={keywordsRef}
        data-motion="keywords"
        className="absolute left-[581.5px] top-[524px] flex items-center gap-[36px] overflow-hidden whitespace-nowrap"
      >
        {KEYWORDS.map(({ label, size, dim }) => (
          <p
            key={label}
            className={`wdth-100 shrink-0 font-black leading-[normal] ${
              dim ? "text-muted" : "text-ink"
            }`}
            style={{ fontSize: `${size}px` }}
          >
            {label}
          </p>
        ))}
      </div>

      <div
        data-motion="figures"
        className="absolute left-[760px] top-[668px] h-[100px] w-[400px] overflow-hidden"
      >
        <p className="wdth-100 absolute left-0 top-0 text-[64px] font-black whitespace-nowrap text-ink">
          <CountUp value="480" />+
        </p>
        <p className="wdth-100 absolute left-0 top-[78px] w-[160px] text-[16px] font-normal text-muted">
          연구 논문 · 매년
        </p>
        <p className="wdth-100 absolute left-[240px] top-0 w-[160px] text-[64px] font-black text-ink">
          <CountUp value="14" />+
        </p>
        <p className="wdth-100 absolute left-[240px] top-[78px] w-[160px] text-[16px] font-normal text-muted">
          연구실
        </p>
      </div>

      <Cta label="연구 더 알아보기" to="/education-research" className="left-[117px] top-[858px]" />
    </Band>
  );
}
