import { useRef } from "react";
import { Band } from "../../components/Canvas";
import { SplitText } from "../../motion/SplitText";
import { useScrub } from "../../motion/useScrub";

/*
  Figma nodes 272:1255 / 272:1258 / 272:1256 / 272:1260 — a full-viewport
  typographic beat between the Hero and the Statistics plate. Page-absolute Y
  values are 1172 / 1172 / 1503 against a band that starts at 1080.
*/

/*
  The three words drift in opposing directions so the block shears apart as it
  crosses the viewport: "NEW" and "START." pull left, "2027" pulls right, and
  the two rows separate vertically at the same time.
*/
const DRIFT = [
  { selector: "[data-motion=new]", to: { x: -110, y: -30 } },
  { selector: "[data-motion=year]", to: { x: 130, y: -30 } },
  { selector: "[data-motion=start]", to: { x: -90, y: 40 } },
];

const WORD =
  "wdth-100 absolute text-[400px] leading-[normal] whitespace-nowrap text-white";

export function NewStart() {
  const ref = useRef<HTMLElement>(null);
  useScrub(ref, DRIFT);

  return (
    <Band top={1080} height={1080} className="bg-[#091d37]" innerRef={ref}>
      {/* One heading for the reader; the design sets it as three loose words. */}
      <h2 className="sr-only">New 2027 Start.</h2>

      <SplitText
        aria-hidden="true"
        data-motion="new"
        text="NEW"
        stagger={0.08}
        yPercent={85}
        className={`${WORD} left-[55px] top-[92px] font-bold tracking-[-24px]`}
      />

      <SplitText
        aria-hidden="true"
        data-motion="year"
        text="2027"
        stagger={0.08}
        yPercent={-85}
        delay={0.12}
        className={`${WORD} left-[1011px] top-[92px] font-extrabold tracking-[-40px]`}
      />

      <SplitText
        aria-hidden="true"
        data-motion="start"
        text="START."
        stagger={0.07}
        yPercent={85}
        delay={0.24}
        className={`${WORD} left-[593px] top-[423px] font-bold tracking-[-24px]`}
      />
    </Band>
  );
}
