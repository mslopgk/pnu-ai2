import { useRef, type ReactNode } from "react";
import { Band } from "../../components/Canvas";
import { CountUp } from "../../motion/CountUp";
import { useReveal } from "../../motion/useReveal";
import { useScrub } from "../../motion/useScrub";
import { Words } from "../../motion/Words";
import { useDrawIn } from "../../motion/useDrawIn";

type Event = { date: string; title: ReactNode; top: number };

const EVENTS: Event[] = [
  {
    date: "2020.04",
    title: "거점국립대 최초·최대 AI융합대학원 설립 (AI융합연구센터 선정)",
    top: 328,
  },
  { date: "2023.10", title: "경암공학관 준공 (양산캠퍼스)", top: 406 },
  { date: "2024.03", title: "데이터사이언스전문대학원 설립", top: 484 },
  { date: "2025.12", title: "IT관 준공 (부산캠퍼스)", top: 562 },
  { date: "2026.09", title: "2027학년도 수시 원서접수 (9.8~9.11)", top: 640 },
  {
    date: "2027.03",
    title: (
      <>
        첫 신입생 <CountUp value="424" />명 입학 · AI대학 개교
      </>
    ),
    top: 718,
  },
  {
    date: "수상",
    title: "제2회 대한민국 인공지능 혁신대상(AI혁신 종합대상) 수상",
    top: 796,
  },
];

/* Headline rises while the closing note settles — opposing parallax. */
const DRIFT = [
  { selector: "[data-motion=lead]", to: { y: -30 } },
  { selector: "[data-motion=note]", to: { y: 24 } },
];

export function HistoryTimeline() {
  const ref = useRef<HTMLElement>(null);
  const lead = useRef<HTMLParagraphElement>(null);

  useScrub(ref, DRIFT);
  useReveal(lead, true, { stagger: 0.06, y: 22 });
  // The spine draws itself downward just before the first entry lands.
  useDrawIn(ref, "[data-motion=rail]", {
    axis: "y",
    origin: "left top",
    duration: 1.1,
    start: "top 78%",
  });

  return (
    <Band
      top={2264}
      height={1080}
      className="bg-white"
      innerRef={ref}
      reveal={{ stagger: 0.07, y: 26 }}
    >
      <p className="wdth-100 absolute left-[117px] top-[208px] text-[13px] font-extrabold leading-[normal] whitespace-nowrap text-accent">
        03 — 연혁
      </p>

      <div className="absolute left-[117px] top-[244px] w-[1000px]">
        <Words
          ref={lead}
          data-motion="lead"
          className="wdth-100 text-[40px] font-black leading-[normal] text-ink"
          text="2020년부터 2027년까지."
        />
      </div>

      <div
        data-motion="rail"
        className="absolute left-[240px] top-[338px] h-[526px] w-[2px] bg-[#d9d9d9]"
      />

      {EVENTS.map(({ date, title, top }) => (
        <div key={date}>
          <span
            className="absolute left-[236px] size-[10px] rounded-full bg-accent"
            style={{ top: `${top + 6}px` }}
          />
          <p
            className="wdth-100 absolute left-[117px] text-[16px] font-extrabold leading-[normal] whitespace-nowrap text-accent"
            style={{ top: `${top + 2}px` }}
          >
            {date}
          </p>
          <p
            className="wdth-100 absolute left-[280px] w-[1400px] text-[18px] font-extrabold leading-[normal] text-ink"
            style={{ top: `${top}px` }}
          >
            {title}
          </p>
        </div>
      ))}

      <div className="absolute left-[117px] top-[923px] w-[1600px]">
        <p
          data-motion="note"
          className="wdth-100 text-[15px] font-normal leading-[normal] text-muted"
        >
          거점국립대 최초의 AI융합대학원 설립부터 양산·부산 두 캠퍼스의 건물
          준공, 대한민국 인공지능 혁신대상 수상까지 이어진 성과가 2027년 3월
          AI대학 개교로 모입니다.
        </p>
      </div>
    </Band>
  );
}
