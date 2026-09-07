import { useRef } from "react";
import { Band } from "../../components/Canvas";
import { Cta } from "../../components/Cta";
import { SplitText } from "../../motion/SplitText";
import { useScrub } from "../../motion/useScrub";

/*
  The two connectors between PNU → BUSAN → SOUTHEAST REGION draw downward, so
  the hierarchy reads as one line being traced rather than three stacked words.
*/
const DRAW = [
  {
    selector: "[data-motion=connector]",
    from: { scaleY: 0, transformOrigin: "center top" },
    to: { scaleY: 1 },
  },
];

export function Ecosystem() {
  const ref = useRef<HTMLElement>(null);
  useScrub(ref, DRAW, { start: "top 70%", end: "center 70%" });

  return (
    <Band
      top={10503}
      height={1080}
      className="bg-white"
      innerRef={ref}
      reveal={{ stagger: 0.07 }}
    >
      <p className="wdth-100 absolute left-0 top-[248px] w-[1920px] text-center text-[13px] font-extrabold leading-[normal] tracking-[0.52px] text-accent">
        11 — ECOSYSTEM
      </p>
      <SplitText
        text="하나의 생태계로 연결한다."
        className="wdth-100 absolute left-0 top-[286px] w-[1920px] text-center text-[60px] font-black leading-[normal] whitespace-pre text-ink"
      />
      <p className="wdth-100 absolute left-0 top-[387px] w-[1920px] text-center text-[16px] font-normal leading-[normal] text-muted">
        부산대학교의 AI 교육·연구 역량을 대학과 지역사회, 기업, 출연연과
        연결하여 동남권 AX 혁신을 선도합니다.
      </p>

      <p className="wdth-100 absolute left-0 top-[468px] w-[1920px] text-center text-[40px] font-black leading-[normal] text-accent">
        PNU
      </p>
      <div
        data-motion="connector"
        className="absolute left-[960px] top-[536px] h-[28px] w-px bg-ink/20"
      />
      <p className="wdth-100 absolute left-0 top-[576px] w-[1920px] text-center text-[30px] font-black leading-[normal] text-ink">
        BUSAN
      </p>
      <div
        data-motion="connector"
        className="absolute left-[960px] top-[630px] h-[28px] w-px bg-ink/20"
      />
      <p className="wdth-100 absolute left-0 top-[670px] w-[1920px] text-center text-[22px] font-black leading-[normal] text-muted">
        SOUTHEAST REGION
      </p>

      <p className="wdth-100 absolute left-0 top-[728px] w-[1920px] text-center text-[16px] font-normal leading-[normal] text-muted">
        ARISE AI 연구소 · 장영실 AI융합연구원 · AI융합교육센터 · AI대학원 ·
        데이터사이언스대학원
      </p>

      <Cta label="에코시스템 더 알아보기" to="/overview" className="left-[879px] top-[808px]" />
    </Band>
  );
}
