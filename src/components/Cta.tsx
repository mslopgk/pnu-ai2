import { Link } from "react-router-dom";

/**
 * "라벨 →" link used at the foot of most sections.
 *
 * Figma gives these no destinations. Where one of the five real routes is the
 * obvious target the caller passes `to`; otherwise the control renders as a
 * disabled button rather than an `href="#"` anchor, which would silently throw
 * the reader back to the top of a very long page.
 */
export function Cta({
  label,
  to,
  className = "",
  tone = "dark",
  style,
}: {
  label: string;
  /** One of the app routes, when the section has a real destination. */
  to?: string;
  className?: string;
  tone?: "dark" | "light";
  style?: React.CSSProperties;
}) {
  /* Figma draws every CTA frame 23px tall (67:610 and siblings), with an 8px
     gap between the 15px label and the 16px accent arrow. */
  /* No `overflow-hidden` here: the shell is shrink-to-fit and the arrow ends
     exactly on its right edge, so clipping would eat the whole hover nudge. */
  const shell = `group absolute flex h-[23px] items-center gap-[8px] whitespace-nowrap leading-[normal] ${className}`;
  const body = (
    <>
      <span
        className={`wdth-100 text-[15px] font-extrabold tracking-[0.45px] ${
          tone === "dark" ? "text-ink" : "text-white"
        }`}
      >
        {label}
      </span>
      {/* Hover affordance: the arrow nudges right. CSS only, and the
          transition is dropped under a reduced-motion preference. */}
      <span className="wdth-100 text-[16px] font-black text-accent transition-transform duration-200 ease-out group-hover:translate-x-[4px] motion-reduce:transition-none motion-reduce:group-hover:translate-x-0">
        →
      </span>
    </>
  );

  if (!to) {
    return (
      <button type="button" disabled className={shell} style={style}>
        {body}
      </button>
    );
  }

  return (
    <Link to={to} className={shell} style={style}>
      {body}
    </Link>
  );
}
