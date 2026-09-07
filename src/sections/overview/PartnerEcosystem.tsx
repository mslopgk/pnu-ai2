import { useRef } from "react";
import { Band } from "../../components/Canvas";
import { useReveal } from "../../motion/useReveal";
import { useScrub } from "../../motion/useScrub";
import { Words } from "../../motion/Words";

const PARTNERS = [
  "NAVER Cloud",
  "Google",
  "AWS",
  "LG U+",
  "upstage",
  "LG전자",
  "산업인공지능연구소",
  "장영실AI융합연구원",
  "AI융합교육원",
  "장영실AI펠로우십",
  "데이터사이언스대학원",
  "AX정보화혁신본부",
];

/* Centred headline and closing note drift apart over the black plate. */
const DRIFT = [
  { selector: "[data-motion=lead]", to: { y: -26 } },
  { selector: "[data-motion=note]", to: { y: 20 } },
];

export function PartnerEcosystem() {
  const ref = useRef<HTMLElement>(null);
  const lead = useRef<HTMLParagraphElement>(null);

  useScrub(ref, DRIFT);
  useReveal(lead, true, { stagger: 0.06, y: 22 });

  return (
    <Band
      top={5504}
      height={1080}
      className="bg-black"
      innerRef={ref}
      reveal={{ stagger: 0.04, y: 26 }}
    >
      <p className="wdth-100 absolute left-0 top-[284.5px] w-[1920px] text-center text-[13px] font-extrabold leading-[normal] text-accent">
        06 — 파트너 생태계
      </p>

      <div className="absolute left-0 top-[320.5px] w-[1920px]">
        <Words
          ref={lead}
          data-motion="lead"
          className="wdth-100 text-center text-[34px] font-black leading-[normal] text-white"
          text="검증된 기관과 함께 성장합니다."
        />
      </div>

      {PARTNERS.map((name, i) => (
        <div
          key={name}
          className="group absolute h-[100px] w-[400px]"
          style={{
            left: `${160 + (i % 4) * 400}px`,
            top: `${444.5 + Math.floor(i / 4) * 100}px`,
          }}
        >
          {/*
            The tiles butt up against each other, so hover tints the cell
            rather than lifting it. The inner layer keeps the effect clear of
            the band reveal's inline GSAP transform on the outer box.
          */}
          <div className="absolute inset-0 overflow-hidden border border-solid border-[#404040] transition-[background-color,border-color] duration-300 ease-out group-hover:border-accent/60 group-hover:bg-[#111]">
            <p className="wdth-100 absolute left-0 top-[37px] w-[400px] text-center text-[18px] font-extrabold leading-[normal] text-white transition-[color,transform] duration-300 ease-out motion-safe:group-hover:scale-[1.06] group-hover:text-accent">
              {name}
            </p>
          </div>
        </div>
      ))}

      <div className="absolute left-0 top-[774.5px] w-[1920px]">
        <p
          data-motion="note"
          className="wdth-100 text-center text-[15px] font-normal leading-[normal] text-muted-dark"
        >
          NAVER Cloud, Google, AWS, LG U+, upstage 등 IT 빅테크 기업이 참여하는
          교육과정과 함께, 장영실AI융합연구원 산하 연구센터들이 산업·공공 데이터
          기반 연구를 수행합니다.
        </p>
      </div>
    </Band>
  );
}
