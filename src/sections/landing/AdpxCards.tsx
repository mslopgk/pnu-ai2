import { Fragment, useLayoutEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../../motion/gsap";

/*
  The four department cards, the blurred A / D / P / X letterforms behind them
  and their captions sit directly on the page canvas in Figma (they deliberately
  bleed past the ADPX frame on both edges), so they are positioned in page
  coordinates rather than inside a clipped band.

  Figma nodes: letters 67:754 / 67:752 / 67:750 / 67:748, cards 67:753 / 67:886 /
  67:888 / 67:887, captions 67:892…67:905.
*/

const LETTERS = [
  { char: "A", left: 286, top: 4098, width: 322 },
  { char: "D", left: 861, top: 4098, width: 304 },
  { char: "P", left: 1468, top: 4108, width: 268 },
  { char: "X", left: 1797, top: 4376, width: 303 },
];

const CARDS = [
  { src: "/assets/adpx-card-1.webp", left: -73 },
  { src: "/assets/adpx-card-2.webp", left: 482 },
  { src: "/assets/adpx-card-3.webp", left: 1037 },
  { src: "/assets/adpx-card-4.webp", left: 1592 },
];

const CAPTIONS: {
  title: string;
  left: number;
  titleTop: number;
  bodyTop: number;
  bodyLeft: number;
  lines: string[];
}[] = [
  {
    title: "AI Computing",
    left: 12,
    titleTop: 4692,
    bodyTop: 4750,
    bodyLeft: 12,
    lines: [
      "AI를 만드는 AI 컴퓨터공학부,",
      "키우는 데이터사이언스·통계학부,",
      "모델링하는 산업공학부, 확산시키는 AX 융합학부.",
    ],
  },
  {
    title: "DS & Statistics",
    left: 520,
    titleTop: 4689,
    bodyTop: 4747,
    bodyLeft: 520,
    lines: [
      "AI를 키우는 연료, 데이터를 다루는 학문입니다.",
      "빅데이터 분석, 통계적 기계학습, 베이지안 추론,",
      "정량적 금융(Quantitative Finance)을 4대 축으로",
      "데이터 사이언티스트와 통계학자를 양성합니다.",
    ],
  },
  {
    title: "Industrial Engineering",
    left: 1079,
    titleTop: 4689,
    bodyTop: 4747,
    bodyLeft: 1079,
    lines: [
      "모든 조직·활동·작업은 프로세스로 모델링됩니다.",
      "스마트 제조 · AI 공정 최적화 · 프로세스 마이닝 · 인간-AI 협업을",
      "핵심 분야로 다룹니다.",
      "류광렬 교수(DS 대학원장)팀의 스마트팩토리 연구로 잘 알려져 있습니다.",
    ],
  },
  {
    title: "AX Convergence",
    left: 1630,
    titleTop: 4689,
    bodyTop: 4747,
    bodyLeft: 1628,
    lines: [
      "\u00a0AI를 전 학문 분야에 접목·확장합니다.",
      "인문·예술·법·사회·자연·공학을 가리지 않고,",
      "AI 윤리·정책·디자인·기후 등 어디든 융합 가능한 가장",
      "유연한 학부입니다.",
    ],
  },
];

export function AdpxCards() {
  /*
    The row already bleeds past both canvas edges, so scrolling drives it
    sideways: cards travel left while the blurred letters behind them drift the
    other way. The first card doubles as the ScrollTrigger element — these
    nodes live directly on the canvas, so there is no wrapping section to
    trigger from.
  */
  const triggerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const lettersRef = useRef<HTMLParagraphElement[]>([]);
  const captionsRef = useRef<HTMLElement[]>([]);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const trigger = triggerRef.current;
    if (!trigger) return;

    const ctx = gsap.context(() => {
      const scrollTrigger = {
        trigger,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.6,
      };
      /*
        The captions are the cards' own labels — they sit over the lower third
        of each one — so they have to ride the same horizontal scrub. Left
        behind they would slide 240px across the row and hang off the card
        they name.
      */
      gsap.fromTo(
        [...cardsRef.current, ...captionsRef.current],
        { x: 120 },
        { x: -120, ease: "none", scrollTrigger },
      );
      gsap.fromTo(
        lettersRef.current,
        { x: -80 },
        { x: 80, ease: "none", scrollTrigger },
      );

      /*
        On top of the scrub, the row deals itself in left to right the first
        time it appears. The reveal only touches y/opacity, so it composes with
        the scrubbed x above instead of fighting it.
      */
      const dealIn = {
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        immediateRender: false,
      } as const;

      gsap.fromTo(
        cardsRef.current,
        { y: 90, opacity: 0 },
        {
          ...dealIn,
          y: 0,
          opacity: 1,
          scrollTrigger: { trigger, start: "top 85%", once: true },
        },
      );
      gsap.fromTo(
        lettersRef.current,
        { y: 60, opacity: 0 },
        {
          ...dealIn,
          y: 0,
          opacity: 1,
          scrollTrigger: { trigger, start: "top 92%", once: true },
        },
      );
      gsap.fromTo(
        captionsRef.current,
        { y: 40, opacity: 0 },
        {
          ...dealIn,
          y: 0,
          opacity: 1,
          stagger: 0.055,
          scrollTrigger: {
            trigger: captionsRef.current[0],
            start: "top 92%",
            once: true,
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {LETTERS.map(({ char, left, top, width }, i) => (
        <p
          key={char}
          ref={(el) => {
            if (el) lettersRef.current[i] = el;
          }}
          aria-hidden="true"
          className="absolute display-type text-[500px] leading-[normal] whitespace-nowrap text-white blur-[19.9px]"
          style={{ left: `${left}px`, top: `${top}px`, width: `${width}px` }}
        >
          {char}
        </p>
      ))}

      {CARDS.map(({ src, left }, i) => (
        <div
          key={src}
          ref={(el) => {
            if (el) {
              cardsRef.current[i] = el;
              if (i === 0) triggerRef.current = el;
            }
          }}
          className="absolute top-[4241px] h-[630px] w-[520px]"
          style={{ left: `${left}px` }}
        >
          {/*
            The hover lift lives on an inner element: the outer box carries the
            scrubbed GSAP transform, and a CSS transform on the same node would
            simply be overwritten every frame.
          */}
          <div className="group relative size-full overflow-hidden rounded-[37px] transition-transform duration-500 ease-out motion-safe:hover:-translate-y-[10px]">
            <img
              src={src}
              alt=""
              loading="lazy"
              decoding="async"
              className="pointer-events-none absolute inset-0 size-full max-w-none object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.06]"
            />
            {/*
              The captions are white and sit over the lower third of each card.
              Figma's own cards happened to be dark down there; the replacement
              artwork is not, so the scrim guarantees the text reads on any of
              them.
            */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>
        </div>
      ))}

      {CAPTIONS.map((caption, i) => (
        <Fragment key={caption.title}>
          <p
            ref={(el) => {
              if (el) captionsRef.current[i * 2] = el;
            }}
            className="wdth-100 absolute text-[32px] font-bold leading-[normal] whitespace-nowrap text-white"
            style={{ left: `${caption.left}px`, top: `${caption.titleTop}px` }}
          >
            {caption.title}
          </p>
          <div
            ref={(el) => {
              if (el) captionsRef.current[i * 2 + 1] = el;
            }}
            className="wdth-100 absolute text-[15px] font-normal whitespace-nowrap text-white"
            style={{ left: `${caption.bodyLeft}px`, top: `${caption.bodyTop}px` }}
          >
            {caption.lines.map((line, j) => (
              <p key={j} className="leading-[normal] whitespace-pre">
                {line}
              </p>
            ))}
          </div>
        </Fragment>
      ))}
    </>
  );
}
