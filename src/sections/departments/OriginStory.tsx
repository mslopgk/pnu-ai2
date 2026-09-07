import { useRef } from "react";
import { Band } from "../../components/Canvas";
import { CountUp } from "../../motion/CountUp";
import { useScrub } from "../../motion/useScrub";
import { Words } from "../../motion/Words";

/** Left column — the pre-2027 structure. */
const BEFORE = [
  {
    college: "정보의생명공학대학",
    count: "269",
    units: "정보컴퓨터공학부 · 의생명융합정보학부",
    top: 395,
  },
  {
    college: "공과대학",
    count: "223",
    units: "전자제어공학부 · 산업공학과 · 첨단모빌리티자유전공 · 스마트시티전공",
    top: 479,
  },
  {
    college: "자연과학대학",
    count: "35",
    units: "통계학과",
    top: 563,
  },
];

/** Right column — the 2027 structure. */
const AFTER = [
  {
    college: "AI대학 (신설)",
    count: "424",
    units:
      "AI컴퓨터공학부 · 데이터사이언스학부 · 통계학과 · 산업공학부 · AX융합학부 — 아래 5개 학과 참조",
    top: 395,
  },
  {
    college: "공과대학 (재편)",
    count: "140",
    units:
      "X-모빌리티융합학부(96명) · 바이오메디컬공학과(44명) — AI대학과는 별개의 학사조직",
    top: 517,
  },
];

/* The two column headers wipe out of the left margin as the band arrives. */
const RAILS = [
  {
    selector: "[data-motion=rail]",
    from: { scaleX: 0, transformOrigin: "left center" },
    to: { scaleX: 1 },
  },
];

/* The headline and the closing figure drift against each other. */
const DRIFT = [
  { selector: "[data-motion=words]", to: { y: -24 } },
  { selector: "[data-motion=figure]", to: { y: 24 } },
];

export function OriginStory() {
  const ref = useRef<HTMLElement>(null);
  useScrub(ref, RAILS, { start: "top 72%", end: "center bottom" });
  useScrub(ref, DRIFT);

  return (
    <Band
      top={104}
      height={1080}
      className="bg-white"
      reveal={{ stagger: 0.06 }}
      innerRef={ref}
    >
      <p className="wdth-100 absolute left-[117px] top-[140px] w-[400px] text-[13px] font-extrabold leading-[normal] text-accent">
        01 — 학사조직 개편
      </p>
      <p className="wdth-100 absolute left-[117px] top-[176px] w-[1600px] text-[34px] font-black leading-[normal] text-ink">
        <Words text="5개 학과가 하나로, AI대학이 출범합니다." />
      </p>
      <p className="wdth-100 absolute left-[117px] top-[234px] h-[24px] w-[1600px] text-[15px] font-normal leading-[normal] text-muted">
        정보의생명공학대학·공과대학·자연과학대학 3개 대학에 흩어진 7개 학사단위를
        재편해 AI대학과 공과대학으로 집적합니다. 2027년 3월 출범.
      </p>

      <div className="absolute left-[117px] top-[340px] h-[32px] w-[700px]">
        <div data-motion="rail" className="h-full w-full bg-[#e6e6e6]" />
      </div>
      <p className="wdth-100 absolute left-[137px] top-[348px] h-[16px] w-[660px] text-[12px] font-extrabold leading-[normal] text-ink">
        기존 (2026학년도 이전) · 527명
      </p>

      {BEFORE.map(({ college, count, units, top }) => (
        <div key={college}>
          <p
            className="wdth-100 absolute left-[117px] h-[20px] w-[200px] text-[15px] font-extrabold leading-[normal] text-ink"
            style={{ top: `${top}px` }}
          >
            {college}
          </p>
          <p
            className="wdth-100 absolute left-[720px] h-[20px] w-[90px] text-[15px] font-black leading-[normal] text-muted"
            style={{ top: `${top}px` }}
          >
            <CountUp value={count} />명
          </p>
          <p
            className="wdth-100 absolute left-[117px] h-[32px] w-[620px] text-[12px] font-normal leading-[normal] text-muted"
            style={{ top: `${top + 24}px` }}
          >
            {units}
          </p>
        </div>
      ))}

      <p className="wdth-100 absolute left-[870px] top-[500px] h-[40px] w-[150px] text-[32px] font-black leading-[normal] text-accent">
        →
      </p>

      <div className="absolute left-[1103px] top-[340px] h-[32px] w-[700px]">
        <div data-motion="rail" className="h-full w-full bg-[#e5faf0]" />
      </div>
      <p className="wdth-100 absolute left-[1123px] top-[348px] h-[16px] w-[660px] text-[12px] font-extrabold leading-[normal] text-ink">
        AI대학 + 공과대학 (2027.3 출범) · 564명
      </p>

      {AFTER.map(({ college, count, units, top }) => (
        <div key={college}>
          <p
            className="wdth-100 absolute left-[1103px] w-[400px] text-[20px] font-extrabold leading-[normal] text-ink"
            style={{ top: `${top}px` }}
          >
            {college}
          </p>
          <p
            className="wdth-100 absolute left-[1720px] w-[100px] text-[20px] font-black leading-[normal] text-accent"
            style={{ top: `${top}px` }}
          >
            <CountUp value={count} />명
          </p>
          <p
            className="wdth-100 absolute left-[1103px] h-[32px] w-[620px] text-[12px] font-normal leading-[normal] text-muted"
            style={{ top: `${top + 32}px` }}
          >
            {units}
          </p>
        </div>
      ))}

      <p className="wdth-100 absolute left-[117px] top-[667px] h-[60px] w-[900px] text-[44px] font-black leading-[normal] text-ink">
        <span data-motion="figure" className="inline-block">
          <CountUp value="527" />명 → <CountUp value="564" />명
        </span>
      </p>
      <p className="wdth-100 absolute left-[117px] top-[737px] h-[24px] w-[1500px] text-[14px] font-normal leading-[normal] text-muted">
        +37명(+7%) 확대 — AI컴퓨터공학부(214명)는 AI대학 정원의 50.5%를 차지하는
        최대 학부입니다.
      </p>
    </Band>
  );
}
