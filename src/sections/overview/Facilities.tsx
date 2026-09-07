import { useRef } from "react";
import { Band } from "../../components/Canvas";
import { CountUp } from "../../motion/CountUp";
import { useReveal } from "../../motion/useReveal";
import { useScrub } from "../../motion/useScrub";
import { Words } from "../../motion/Words";
import { useDrawIn } from "../../motion/useDrawIn";

const FLOORS = ["10F", "9F", "8F", "7F", "6F", "5F", "4F", "3F", "2F", "1F", "B1"];

type Stat = {
  /** Literal figure, used where the value is a date rather than a count. */
  value?: string;
  /** Integer figure, counted up on reveal. */
  count?: string;
  unit?: string;
  label: string;
  left: number;
  top: number;
};

const STATS: Stat[] = [
  {
    count: "256",
    unit: "장",
    label: "GPU 인프라 (H100·A100·A6000+PC급)",
    left: 480,
    top: 418.5,
  },
  { value: "25.12", label: "IT관 준공 (부산캠퍼스)", left: 940, top: 418.5 },
  { value: "23.10", label: "경암공학관 준공 (양산캠퍼스)", left: 480, top: 518.5 },
  { count: "424", unit: "명", label: "AI대학 정원", left: 940, top: 518.5 },
  { count: "60", unit: "명", label: "전임교원", left: 480, top: 618.5 },
  { count: "4", unit: "개", label: "학부", left: 940, top: 618.5 },
];

/* Headline lifts as the closing note settles. */
const DRIFT = [
  { selector: "[data-motion=lead]", to: { y: -28 } },
  { selector: "[data-motion=note]", to: { y: 22 } },
];

export function Facilities() {
  const ref = useRef<HTMLElement>(null);
  const lead = useRef<HTMLParagraphElement>(null);

  useScrub(ref, DRIFT);
  useReveal(lead, true, { stagger: 0.06, y: 22 });
  // The floor stack builds itself from the roof down, one slab at a time.
  useDrawIn(ref, "[data-motion=floor]", {
    axis: "x",
    origin: "left top",
    duration: 0.5,
    stagger: 0.05,
    start: "top 80%",
  });

  return (
    <Band
      top={4424}
      height={1080}
      className="bg-white"
      innerRef={ref}
      reveal={{ stagger: 0.045, y: 24 }}
    >
      <p className="wdth-100 absolute left-[117px] top-[288.5px] text-[13px] font-extrabold leading-[normal] whitespace-nowrap text-accent">
        05 — 인프라 (IT관 · 경암공학관)
      </p>

      <div className="absolute left-[117px] top-[324.5px] w-[900px]">
        <Words
          ref={lead}
          data-motion="lead"
          className="wdth-100 text-[34px] font-black leading-[normal] text-ink"
          text="GPU 256장, 두 캠퍼스에 걸친 첨단 인프라."
        />
      </div>

      {FLOORS.map((floor, i) => {
        const top = 418.5 + i * 30;
        const isBasement = floor === "B1";
        return (
          <div key={floor}>
            <div
              data-motion="floor"
              className={`absolute left-[117px] h-[26px] w-[260px] border border-solid border-[#d9d9d9] ${
                isBasement ? "bg-ink" : "bg-[#e6e6e6]"
              }`}
              style={{ top: `${top}px` }}
            />
            <p
              className={`wdth-100 absolute left-[129px] text-[11px] font-extrabold leading-[normal] whitespace-nowrap ${
                isBasement ? "text-white" : "text-muted"
              }`}
              style={{ top: `${top + 6}px` }}
            >
              {floor}
            </p>
          </div>
        );
      })}

      {STATS.map(({ value, count, unit, label, left, top }) => (
        <div key={label}>
          <p
            className="wdth-100 absolute text-[32px] font-black leading-[normal] whitespace-nowrap text-ink"
            style={{ left: `${left}px`, top: `${top}px` }}
          >
            {count ? (
              <>
                <CountUp value={count} />
                {unit}
              </>
            ) : (
              value
            )}
          </p>
          <p
            className="wdth-100 absolute text-[14px] font-normal leading-[normal] whitespace-nowrap text-muted"
            style={{ left: `${left}px`, top: `${top + 44}px` }}
          >
            {label}
          </p>
        </div>
      ))}

      <div className="absolute left-[117px] top-[770.5px] w-[1600px]">
        <p
          data-motion="note"
          className="wdth-100 text-[15px] font-normal leading-[normal] text-muted"
        >
          IT관(부산)과 경암공학관(양산)에 GPU 등 첨단 인프라를 구축해 두
          캠퍼스에서 AI·AX 교육·연구를 동시에 지원합니다.
        </p>
      </div>
    </Band>
  );
}
