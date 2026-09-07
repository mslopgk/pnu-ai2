import { useRef } from "react";
import { Band } from "../../components/Canvas";
import { useDrawIn } from "../../motion/useDrawIn";

const SESSIONS = [
  { month: "06", mode: "온라인", left: 170 },
  { month: "07", mode: "오프라인", left: 490 },
  { month: "08", mode: "온라인", left: 810 },
  { month: "09", mode: "오프라인", left: 1130 },
  { month: "11", mode: "온라인+오프라인", left: 1450 },
];

/*
  The band's reveal owns each card shell's transform, so the CSS hover lift
  lives on an inner surface — otherwise gsap's inline transform would win.
*/
const SURFACE =
  "relative h-full w-full overflow-hidden rounded-[12px] border border-dashed border-[#404040] bg-[#141414] transition-[transform,background-color,border-color] duration-300 ease-out hover:border-accent hover:bg-[#191919] motion-safe:hover:-translate-y-[6px]";

export function InfoSessions() {
  const ref = useRef<HTMLElement>(null);
  /* The hairline inside each card draws itself out from the left. */
  useDrawIn(ref, "[data-motion=rule]", { stagger: 0.09, duration: 0.7, origin: "left center", immediateRender: false });

  return (
    <Band
      top={5504}
      height={1080}
      className="bg-black"
      reveal={{ stagger: 0.09 }}
      innerRef={ref}
    >
      <p className="wdth-100 absolute left-[117px] top-[244.5px] text-[13px] font-extrabold leading-[normal] whitespace-nowrap text-accent">
        06 — 설명회
      </p>
      <p className="wdth-100 absolute left-[117px] top-[280.5px] w-[1000px] text-[34px] font-black leading-[normal] text-white">
        2026년 6월~11월, 매월 진행됩니다.
      </p>

      {SESSIONS.map(({ month, mode, left }) => (
        <div
          key={month}
          className="absolute top-[404.5px] h-[380px] w-[300px]"
          style={{ left: `${left}px` }}
        >
          <div className={SURFACE}>
            <p className="wdth-100 absolute left-[27px] top-[29px] text-[14px] font-normal leading-[normal] whitespace-nowrap text-[#999]">
              2026
            </p>
            <p className="wdth-100 absolute left-[27px] top-[53px] text-[80px] font-black leading-[normal] whitespace-nowrap text-accent">
              {month}
            </p>
            <p className="wdth-100 absolute left-[129px] top-[107px] text-[20px] font-extrabold leading-[normal] whitespace-nowrap text-white">
              월
            </p>
            <div
              data-motion="rule"
              className="absolute left-[27px] top-[199px] h-px w-[244px] bg-[#4d4d4d]"
            />
            <p className="wdth-100 absolute left-[27px] top-[229px] w-[244px] text-[16px] font-extrabold leading-[normal] text-white">
              {mode}
            </p>
            <p className="wdth-100 absolute left-[27px] top-[259px] w-[244px] text-[13px] font-normal leading-[normal] text-[#999]">
              AI대학 입학 설명회
            </p>
          </div>
        </div>
      ))}

      <p className="wdth-100 absolute left-0 top-[814.5px] w-[1920px] text-center text-[15px] font-normal leading-[normal] text-muted-dark">
        온라인 설명회는 실시간 채팅으로 질의응답이 가능하며, 오프라인 설명회는
        IT관 시설 투어와 재학생 멘토링을 함께 진행합니다. 참석자에게는 입학 상담
        우선 예약 혜택이 제공됩니다.
      </p>
    </Band>
  );
}
