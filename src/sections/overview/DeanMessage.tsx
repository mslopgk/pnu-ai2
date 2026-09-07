import { useRef } from "react";
import { Band } from "../../components/Canvas";
import { useReveal } from "../../motion/useReveal";
import { useScrub } from "../../motion/useScrub";
import { Words } from "../../motion/Words";

/* The pull-quote and the closing note drift against each other. */
const DRIFT = [
  { selector: "[data-motion=quote]", to: { y: -30 } },
  { selector: "[data-motion=note]", to: { y: 20 } },
];

export function DeanMessage() {
  const ref = useRef<HTMLElement>(null);
  const lineOne = useRef<HTMLParagraphElement>(null);
  const lineTwo = useRef<HTMLParagraphElement>(null);

  useScrub(ref, DRIFT);
  useReveal(lineOne, true, { stagger: 0.07, y: 22 });
  useReveal(lineTwo, true, { stagger: 0.07, y: 22 });

  return (
    <Band
      top={104}
      height={1080}
      className="bg-white"
      innerRef={ref}
      reveal={{ stagger: 0.07, y: 26 }}
    >
      <p className="wdth-100 absolute left-[117px] top-[266px] text-[13px] font-extrabold leading-[normal] whitespace-nowrap text-accent">
        01 — 인사말
      </p>

      <div className="wdth-100 absolute left-[190px] top-[387.5px] h-[90px] w-[1200px] text-[30px] font-black text-ink">
        <Words
          ref={lineOne}
          data-motion="quote"
          className="leading-[normal]"
          text={'"실제 산업 수요와 대학 교육을'}
        />
        <Words
          ref={lineTwo}
          data-motion="quote"
          className="leading-[normal]"
          text={'긴밀하게 연결해 나가겠습니다."'}
        />
      </div>

      <div className="absolute left-[190px] top-[505.5px] size-[96px] rounded-full bg-ink" />
      <p className="wdth-100 absolute left-[223px] top-[531px] text-[32px] font-extrabold leading-[normal] whitespace-nowrap text-white">
        최
      </p>
      <p className="wdth-100 absolute left-[306px] top-[513.5px] text-[20px] font-extrabold leading-[normal] whitespace-nowrap text-ink">
        최재원
      </p>
      <p className="wdth-100 absolute left-[306px] top-[543.5px] text-[15px] font-normal leading-[normal] whitespace-nowrap text-muted">
        부산대학교 총장
      </p>

      <div className="absolute left-[190px] top-[625.5px] h-[44px] w-[1400px]">
        <p
          data-motion="note"
          className="wdth-100 text-[15px] font-normal leading-[normal] text-muted"
        >
          부산대는 혁신제조해양융합대학 설립으로 교육혁신 모델을 확대해
          제조·해양산업의 AX(AI 대전환)를 이끌 인재 양성을 추진한다고
          밝혔습니다.
        </p>
      </div>
    </Band>
  );
}
