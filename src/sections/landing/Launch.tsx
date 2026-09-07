import { useRef } from "react";
import { Band } from "../../components/Canvas";
import { SplitText } from "../../motion/SplitText";
import { useReveal } from "../../motion/useReveal";
import { useScrub } from "../../motion/useScrub";
import { MediaBackdrop } from "../../components/MediaBackdrop";

const MILESTONES = [
  { date: "2025.12", label: "IT관 준공 (267억 · 13,161㎡)", left: 117, active: false },
  { date: "2026.05", label: "Google AI 교육 협약 체결", left: 537, active: false },
  { date: "2026.06", label: "AI 부트캠프 출범 (75억원 · 5년)", left: 957, active: false },
  { date: "2027.03", label: "첫 신입생 424명 입학", left: 1377, active: true },
];

/* The milestone rail draws itself toward the 2027 marker. */
const DRAW = [
  {
    selector: "[data-motion=rail]",
    from: { scaleX: 0, transformOrigin: "left center" },
    to: { scaleX: 1 },
  },
];

/*
  The two display lines drift apart as the band passes.

  The backdrop itself is deliberately NOT translated: its horizon glow is baked
  into the asset at the exact height that puts it below the milestone rail, and
  any vertical drift (or the overscan that drift would need to avoid exposing an
  edge) would slide that horizon into the type. It brightens instead.
*/
const PARALLAX = [
  { selector: "[data-motion=media]", from: { opacity: 0.72 }, to: { opacity: 1 } },
  {
    selector: "[data-motion=drift-up]",
    from: { yPercent: 5 },
    to: { yPercent: -5 },
  },
  {
    selector: "[data-motion=drift-down]",
    from: { yPercent: -12 },
    to: { yPercent: 12 },
  },
];

export function Launch() {
  const ref = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  useScrub(ref, DRAW, { start: "top 75%", end: "center center" });
  useScrub(ref, PARALLAX);
  /*
    The foreground is revealed through its own wrapper rather than the band's
    `reveal`, which would also lift the backdrop off the top edge of the band
    and flash a seam under it.
  */
  useReveal(copyRef, true, { stagger: 0.07 });

  return (
    <Band top={12663} height={1080} className="bg-surface-card" innerRef={ref}>
      {/*
        The section colour and a soft top fade are baked into the asset, so the
        glowing horizon lands below the milestone rail and the type above it
        stays on near-black with no seam.
      */}
      <div data-motion="media" className="absolute inset-0">
        <MediaBackdrop
          video="/assets/video/launch-2027.mp4"
          poster="/assets/launch-2027.webp"
        />
      </div>

      <div ref={copyRef} className="absolute inset-0">
        <p className="wdth-100 absolute left-[117px] top-[293px] text-[13px] font-extrabold leading-[normal] tracking-[0.52px] whitespace-nowrap text-accent">
          13 — LAUNCH
        </p>
        <SplitText
          text="2027.03"
          data-motion="drift-up"
          stagger={0.06}
          className="wdth-100 absolute left-[117px] top-[343px] text-[140px] font-black leading-[normal] whitespace-pre text-white"
        />
        <SplitText
          text="부산대학교 AI대학, 새로운 시작."
          data-motion="drift-down"
          stagger={0.025}
          className="wdth-100 absolute left-[117px] top-[560px] text-[44px] font-black leading-[normal] whitespace-pre text-accent"
        />
        <p className="wdth-100 absolute left-[117px] top-[651px] text-[18px] font-normal leading-[normal] whitespace-nowrap text-muted-dark">
          4개 학부 · 1개 학과 · 첫 입학생 424명
        </p>

        <div
          data-motion="rail"
          className="absolute left-[117px] top-[723px] h-px w-[1686px] bg-white/15"
        />

        {MILESTONES.map(({ date, label, left, active }) => (
          <div key={date}>
            <span
              className="absolute size-[8px] rounded-full"
              style={{
                left: `${left}px`,
                top: "719px",
                background: active ? "var(--color-accent)" : "#ffffff",
              }}
            />
            <p
              className="wdth-100 absolute text-[13px] font-normal leading-[normal] whitespace-nowrap text-muted-dark"
              style={{ left: `${left}px`, top: "743px" }}
            >
              {date}
            </p>
            <p
              className={`wdth-100 absolute w-[400px] text-[15px] font-extrabold leading-[normal] ${
                active ? "text-accent" : "text-white"
              }`}
              style={{ left: `${left}px`, top: "765px" }}
            >
              {label}
            </p>
          </div>
        ))}
      </div>
    </Band>
  );
}
