import { useLayoutEffect, useRef, type RefObject } from "react";
import { Band } from "../../components/Canvas";
import { gsap, prefersReducedMotion } from "../../motion/gsap";
import { useScrub } from "../../motion/useScrub";

const AWARD = "수상";

/*
  The 340px wordmark and the award caption under it drift against each other
  while the band passes. No `pin` — it misbehaves inside the scaled canvas.
*/
const DRIFT = [
  { selector: "[data-motion=display]", to: { y: -70 } },
  { selector: "[data-motion=caption]", to: { y: 32 } },
];

/**
 * Staggers the characters of the oversized wordmark.
 *
 * The trigger is the band, not the wordmark: the band's own reveal fires at
 * `top 85%` of the band, and a trigger on the wordmark — 281px lower — would
 * blank characters that had already been on screen for a moment.
 */
function useCharStagger(ref: RefObject<HTMLElement | null>, selector: string) {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    const chars = el.querySelectorAll(selector);
    if (chars.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        chars,
        { opacity: 0, yPercent: 24 },
        {
          opacity: 1,
          yPercent: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
          immediateRender: false,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [ref, selector]);
}

export function CareerStats() {
  const ref = useRef<HTMLElement>(null);
  useScrub(ref, DRIFT);
  useCharStagger(ref, "[data-motion=char]");

  return (
    <Band
      top={3344}
      height={1080}
      className="bg-white text-center"
      reveal={{ stagger: 0.08 }}
      innerRef={ref}
    >
      <p className="wdth-100 absolute left-0 top-[251.5px] w-[1920px] text-[13px] font-extrabold leading-[normal] text-accent">
        04 — 성과·인증
      </p>

      <div className="absolute left-0 top-[281.5px] w-[1920px]">
        <p
          data-motion="display"
          className="wdth-100 text-[340px] font-black leading-[normal] text-ink"
        >
          {Array.from(AWARD).map((char, i) => (
            <span key={`${char}-${i}`} data-motion="char" className="inline-block">
              {char}
            </span>
          ))}
        </p>
      </div>

      <div className="absolute left-0 top-[700.5px] w-[1920px]">
        <div data-motion="caption" className="relative">
          <p className="wdth-100 absolute left-0 top-0 w-[1920px] text-[24px] font-extrabold leading-[normal] text-accent">
            제2회 대한민국 인공지능 혁신대상
          </p>
          <p className="wdth-100 absolute left-0 top-[54px] w-[1920px] text-[16px] font-normal leading-[normal] text-muted">
            NAVER Cloud·Google·AWS·LG U+·upstage 등 IT 빅테크 기업참여형 교육과정을
            통해 재학 중 실무 프로젝트와 채용연계 인턴십에 참여할 수 있습니다.
          </p>
          <p className="wdth-100 absolute left-0 top-[107px] w-[1920px] text-[15px] font-normal leading-[normal] text-muted">
            AI혁신 종합대상 수상과 함께, 대학 AI정책표준 수립·AI 신뢰성 인증 획득 등
            교육의 신뢰성을 대외적으로 인정받았습니다.
          </p>
        </div>
      </div>
    </Band>
  );
}
