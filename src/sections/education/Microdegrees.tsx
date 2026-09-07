import { useRef } from "react";
import { Band } from "../../components/Canvas";
import { useReveal } from "../../motion/useReveal";
import { useScrub } from "../../motion/useScrub";
import { Words } from "../../motion/Words";

const TRACKS = [
  "머신러닝 기초",
  "고급 딥러닝",
  "데이터 엔지니어링",
  "생성형 AI·LLM",
  "스마트 제조",
  "프로세스 마이닝",
  "인문-AI 융합",
  "법·정책 AI",
  "아트·디자인 AI",
  "XR",
  "로보틱스",
  "사이버보안",
  "바이오메디컬 AI",
];

/* Display type drifts up against the closing note — opposing parallax. */
const DRIFT = [
  { selector: "[data-motion=lead]", to: { y: -28 } },
  { selector: "[data-motion=note]", to: { y: 20 } },
];

export function Microdegrees() {
  const ref = useRef<HTMLElement>(null);
  const lead = useRef<HTMLParagraphElement>(null);

  useScrub(ref, DRIFT);
  useReveal(lead, true, { stagger: 0.05, y: 20 });

  return (
    <Band
      top={1184}
      height={1080}
      className="bg-black"
      innerRef={ref}
      reveal={{ stagger: 0.045, y: 22 }}
    >
      <p className="wdth-100 absolute left-[117px] top-[322.5px] text-[13px] font-extrabold leading-[normal] whitespace-nowrap text-accent">
        02 — 마이크로디그리
      </p>

      <div className="absolute left-[117px] top-[358.5px] w-[1000px]">
        <Words
          ref={lead}
          data-motion="lead"
          className="wdth-100 text-[34px] font-black leading-[normal] text-white"
          text="13개의 전문 트랙, 9~12학점."
        />
      </div>

      {TRACKS.map((track, i) => (
        <div
          key={track}
          className="group absolute h-[70px] w-[340px]"
          style={{
            left: `${117 + (i % 5) * 352}px`,
            top: `${472.5 + Math.floor(i / 5) * 82}px`,
          }}
        >
          <div className="absolute inset-0 overflow-hidden rounded-[8px] bg-[#141414] transition-[transform,background-color] duration-300 ease-out hover:bg-[#1c1c1c] motion-safe:group-hover:-translate-y-[6px]">
            <p className="wdth-100 absolute left-[20px] top-[14px] text-[12px] font-extrabold leading-[normal] whitespace-nowrap text-accent">
              {String(i + 1).padStart(2, "0")}
            </p>
            <p className="wdth-100 absolute left-[20px] top-[34px] w-[300px] text-[16px] font-extrabold leading-[normal] text-white">
              {track}
            </p>
          </div>
        </div>
      ))}

      <div className="absolute left-[117px] top-[736.5px] w-[1686px]">
        <p
          data-motion="note"
          className="wdth-100 text-[15px] font-normal leading-[normal] text-muted-dark"
        >
          한 학기 또는 두 학기 만에 이수할 수 있어, 본전공과 무관하게 관심 있는
          기술 영역을 빠르게 맛볼 수 있습니다. 이수 결과는 학위와 별도로
          마이크로디그리 인증서로 발급되어 취업 포트폴리오에 바로 활용됩니다.
        </p>
      </div>
    </Band>
  );
}
