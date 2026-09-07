import { useRef } from "react";
import { Link } from "react-router-dom";
import { Band } from "../components/Canvas";
import { SplitText } from "../motion/SplitText";
import { useScrub } from "../motion/useScrub";

const NAV = [
  "AI COLLEGE",
  "ACADEMICS",
  "EDUCATION",
  "RESEARCH",
  "INDUSTRY",
  "PEOPLE",
  "ADMISSION",
];

/** Figma gives the footer no destinations; these are the closest real routes. */
const FOOTER_ROUTES: Record<string, string> = {
  "AI COLLEGE": "/",
  ACADEMICS: "/departments",
  EDUCATION: "/education-research",
  RESEARCH: "/education-research",
  INDUSTRY: "/admissions-career",
  PEOPLE: "/overview",
  ADMISSION: "/admissions-career",
};

const HEADLINE = ["AI를 만들고,", "키우고, 확산시키는 대학."];

/* The rule above the nav wipes out from the left as the footer arrives. */
const DRAW = [
  {
    selector: "[data-motion=rule]",
    from: { scaleX: 0, transformOrigin: "left center" },
    to: { scaleX: 1 },
  },
];

export function Footer({
  top,
  contact = "입학정보 · go.pusan.ac.kr",
}: {
  top: number;
  /** Overridable, though every frame in the file carries the same line. */
  contact?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  useScrub(ref, DRAW, { start: "top 85%", end: "top 45%" });

  return (
    <Band
      top={top}
      height={812}
      className="bg-black"
      innerRef={ref}
      reveal={{ stagger: 0.07 }}
    >
      <div className="wdth-100 absolute left-[117px] top-[170px] text-[60px] font-black whitespace-nowrap text-white">
        {HEADLINE.map((line) => (
          <SplitText
            key={line}
            text={line}
            className="leading-[normal] whitespace-pre"
          />
        ))}
      </div>

      <p className="wdth-100 absolute left-[117px] top-[374px] text-[16px] font-normal leading-[normal] whitespace-nowrap text-muted-dark">
        부산대학교 AI대학
      </p>
      <p className="wdth-100 absolute left-[117px] top-[404px] text-[14px] font-normal leading-[normal] whitespace-nowrap text-muted-dark">
        부산광역시 금정구 부산대학로63번길 2
      </p>
      <p className="wdth-100 absolute left-[117px] top-[428px] text-[14px] font-normal leading-[normal] whitespace-nowrap text-muted-dark">
        {contact}
      </p>

      <div
        data-motion="rule"
        className="absolute left-[117px] top-[497px] h-px w-[1686px] bg-white/15"
      />

      <nav className="absolute left-[117px] top-[529px] flex items-center gap-[32px] overflow-hidden whitespace-nowrap font-ui text-[13px] font-semibold leading-[normal] text-muted-dark">
        {NAV.map((item) => (
          <Link
            key={item}
            to={FOOTER_ROUTES[item] ?? "/"}
            className="shrink-0 transition-colors duration-300 hover:text-white"
          >
            {item}
          </Link>
        ))}
      </nav>

      <p className="wdth-100 absolute left-[117px] top-[585px] text-[12px] font-normal leading-[normal] whitespace-nowrap text-muted-dark">
        © 2027 AI College, Pusan National University
      </p>
    </Band>
  );
}
