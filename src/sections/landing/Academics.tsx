import { useRef } from "react";
import { Band } from "../../components/Canvas";
import { useReveal } from "../../motion/useReveal";
import { useScrub } from "../../motion/useScrub";

type Card = {
  eyebrow: [string, string];
  title: string;
  meta: string;
  description: string;
  /** Card artwork; Figma fills all four with the same placeholder photo. */
  image: string;
  left: number;
  top: number;
};

/*
  Figma still ships this row as four instances of the same `Academic Card`
  component: cards 2-4 all carry identical "DATA SCIENCE" copy and all four
  share one photo fill — an unfinished placeholder state in the source file.
  Cards 3 and 4 are filled in here from the departments the rest of the site
  already documents (see src/sections/departments/DepartmentsGrid.tsx), and
  each card gets its own image, so the row no longer shows one photo and one
  department name four times over.
*/
const CARDS: Card[] = [
  {
    eyebrow: ["AI", "COMPUTING"],
    title: "AI컴퓨터공학부",
    meta: "학부 · 정원 214명 · 30명 교수",
    description:
      "AI 핵심기술과 컴퓨터공학을 기반으로 미래 지능정보사회를 이끌 인재를 양성합니다.",
    image: "/assets/academics-ai-computing.webp",
    left: -176,
    top: 314,
  },
  {
    eyebrow: ["DATA", "SCIENCE"],
    title: "데이터사이언스학부·통계학과",
    meta: "학부·학과 · 정원 114명 · 19명 교수",
    description:
      "빅데이터 분석 · 통계적 기계학습 · 베이지안 · AI in Quantitative Finance.",
    image: "/assets/academics-data-science.webp",
    left: 406,
    top: 314,
  },
  {
    eyebrow: ["INDUSTRIAL", "ENGINEERING"],
    title: "산업공학부",
    meta: "학부 · 정원 69명 · 10명 교수",
    description:
      "산업·사회 문제를 프로세스로 구조화·모델링·최적화합니다.",
    image: "/assets/academics-industrial.webp",
    left: 988,
    top: 303,
  },
  {
    eyebrow: ["AX", "CONVERGENCE"],
    title: "AX융합학부",
    meta: "학부 · 정원 27명 · 1명 교수",
    description: "ADP 공통역량을 도메인별 AI전환(AX)으로 확산합니다.",
    image: "/assets/academics-ax-convergence.webp",
    left: 1570,
    top: 303,
  },
];

function AcademicCard({
  eyebrow,
  title,
  meta,
  description,
  image,
  left,
  top,
}: Card) {
  return (
    /*
      The <article> is the scroll-animation target — GSAP owns its inline
      transform, so the hover lift has to live on an inner element or the
      scrubbed drift would overwrite it.
    */
    <article
      data-motion="card"
      className="absolute h-[610px] w-[526px]"
      style={{ left: `${left}px`, top: `${top}px` }}
    >
      <div className="group flex size-full flex-col items-start gap-[25px] overflow-hidden rounded-card bg-surface-card ease-out motion-safe:transition-transform motion-safe:duration-500 motion-safe:hover:-translate-y-[10px]">
        <div className="h-[323.259px] w-[526px] shrink-0 overflow-hidden rounded-card">
          <img
            src={image}
            alt=""
            className="pointer-events-none size-full max-w-none object-cover ease-out motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-[1.06]"
          />
        </div>

        <div className="flex w-full min-h-px flex-1 flex-col items-start gap-[24px] overflow-hidden px-[32px] pb-[38px]">
          <div className="flex w-full flex-col items-start overflow-hidden">
            <div className="wdth-100 h-[75px] w-full text-[24px] font-bold text-accent">
              <p className="leading-[normal]">{eyebrow[0]}</p>
              <p className="leading-[normal]">{eyebrow[1]}</p>
            </div>
            <p className="wdth-100 h-[38px] w-full text-[24px] font-semibold leading-[normal] text-[#efefef]">
              {title}
            </p>
            <p className="wdth-100 h-[25px] w-full text-[13px] font-normal leading-[normal] text-[#efefef]">
              {meta}
            </p>
          </div>
          <p className="wdth-100 h-[62px] w-full text-[20px] font-normal leading-[normal] text-[#efefef]">
            {description}
          </p>
        </div>
      </div>
    </article>
  );
}

/**
 * A display headline split into letters so they can reveal one after another.
 * Each letter is inline-block, which is what lets it be transformed.
 */
function SplitChars({
  text,
  className,
  motion,
  stagger = 0.05,
}: {
  text: string;
  className: string;
  /** Value for the `data-motion` hook the section's scrub config targets. */
  motion?: string;
  stagger?: number;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  useReveal(ref, true, { stagger, y: 44 });

  return (
    <p ref={ref} data-motion={motion} className={className}>
      {Array.from(text).map((ch, i) => (
        <span key={`${ch}-${i}`} className="inline-block">
          {ch === " " ? " " : ch}
        </span>
      ))}
    </p>
  );
}

/* The card row and the oversized wordmark behind it move against each other. */
const DRIFT = [
  { selector: "[data-motion=card]", to: { x: -130 } },
  { selector: "[data-motion=wordmark]", to: { x: 90 } },
];

export function Academics() {
  const ref = useRef<HTMLElement>(null);
  useScrub(ref, DRIFT);

  return (
    <Band
      top={5103}
      height={1080}
      className="bg-academics-bg"
      innerRef={ref}
      reveal={{ stagger: 0.09, y: 28 }}
    >
      <p className="wdth-100 absolute left-[900px] top-[91px] text-[13px] font-extrabold leading-[normal] tracking-[0.52px] whitespace-nowrap text-accent">
        05 — ACADEMICS
      </p>

      <SplitChars
        text="ACADEMICS"
        motion="wordmark"
        stagger={0.045}
        className="absolute left-[213px] top-[48px] display-type text-[300px] leading-[normal] whitespace-nowrap text-white"
      />

      {CARDS.map((card) => (
        <AcademicCard key={card.left} {...card} />
      ))}
    </Band>
  );
}
