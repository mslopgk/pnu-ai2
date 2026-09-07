import { useRef } from "react";
import { Band } from "../../components/Canvas";
import { CountUp } from "../../motion/CountUp";
import { useDrawIn } from "../../motion/useDrawIn";

const MILESTONES = [
  { date: "2026.04", label: "모집요강 발표", width: 200, top: 312.75, accent: false },
  { date: "2026.09", label: "수시 지원 (9.8~9.11)", width: 350, top: 372.75, accent: false },
  { date: "2026.12", label: "정시 지원", width: 500, top: 432.75, accent: false },
  { date: "2027.03", label: "첫 신입생 입학", width: 650, top: 492.75, accent: true },
];

const QUOTAS = [
  { name: "AI컴퓨터공학부", count: "214", top: 646.75 },
  { name: "데이터사이언스학부", count: "79", top: 694.75 },
  { name: "통계학과", count: "35", top: 742.75 },
  { name: "산업공학부", count: "69", top: 790.75 },
  { name: "AX융합학부", count: "27", top: 838.75 },
];

export function EnrollmentSchedule() {
  const ref = useRef<HTMLElement>(null);
  /* The four timeline bars grow out of the left margin, longest last. */
  useDrawIn(ref, "[data-motion=rail]", { stagger: 0.12, duration: 0.9, origin: "left center", immediateRender: false });
  /* The quota table rules follow, one row at a time. */
  useDrawIn(ref, "[data-motion=rule]", { stagger: 0.09, duration: 0.7, origin: "left center", immediateRender: false });

  return (
    <Band top={104} height={1080} className="bg-white" reveal={{ stagger: 0.07 }} innerRef={ref}>
      <p className="wdth-100 absolute left-[117px] top-[152.75px] text-[13px] font-extrabold leading-[normal] whitespace-nowrap text-accent">
        01 — 2027 입학 안내
      </p>
      <p className="wdth-100 absolute left-[117px] top-[188.75px] w-[1000px] text-[34px] font-black leading-[normal] text-ink">
        <CountUp value="424" />명, 네 가지 전형.
      </p>

      {MILESTONES.map(({ date, label, width, top, accent }) => (
        <div key={date}>
          <div
            data-motion="rail"
            className={`absolute left-[117px] h-[8px] ${accent ? "bg-accent" : "bg-ink"}`}
            style={{ top: `${top}px`, width: `${width}px` }}
          />
          <p
            className="wdth-100 absolute left-[117px] text-[16px] font-extrabold leading-[normal] whitespace-nowrap text-ink"
            style={{ top: `${top + 20}px` }}
          >
            {date}
          </p>
          <p
            className="wdth-100 absolute left-[230px] text-[15px] font-normal leading-[normal] whitespace-nowrap text-muted"
            style={{ top: `${top + 20}px` }}
          >
            {label}
          </p>
        </div>
      ))}

      <p className="wdth-100 absolute left-[117px] top-[612.75px] text-[13px] font-extrabold leading-[normal] whitespace-nowrap text-accent">
        학과별 정원
      </p>

      {QUOTAS.map(({ name, count, top }) => (
        <div key={name}>
          <p
            className="wdth-100 absolute left-[117px] w-[500px] text-[16px] font-extrabold leading-[normal] text-ink"
            style={{ top: `${top}px` }}
          >
            {name}
          </p>
          <p
            className="wdth-100 absolute left-[650px] text-[16px] font-normal leading-[normal] whitespace-nowrap text-muted"
            style={{ top: `${top}px` }}
          >
            <CountUp value={count} />명
          </p>
          <div
            data-motion="rule"
            className="absolute left-[117px] h-px w-[1686px] bg-[#e6e6e6]"
            style={{ top: `${top + 36}px` }}
          />
        </div>
      ))}

      <p className="wdth-100 absolute left-[117px] top-[906.25px] w-[1600px] text-[15px] font-normal leading-[normal] text-muted">
        전형은 학생부종합평가·교과성적·논술·수능 위주 전형까지 네 가지로 나뉘며,
        학과마다 수시·정시 비율이 달라 지망 학과의 모집요강을 미리 확인하는 것이
        중요합니다.
      </p>
    </Band>
  );
}
