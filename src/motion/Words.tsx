import type { ComponentProps } from "react";

/**
 * A single line of display type split into inline-block word spans.
 *
 * The spans are the paragraph's only children, so passing its ref to
 * `useReveal` staggers the headline word by word without any extra helper.
 * Each span carries its own leading space (`whitespace-pre`), so the rendered
 * text and its line-breaking behaviour are identical to a plain paragraph.
 */
export function Words({
  text,
  ...props
}: { text: string } & ComponentProps<"p">) {
  return (
    <p {...props}>
      {text.split(" ").map((word, i) => (
        <span key={`${i}-${word}`} className="inline-block whitespace-pre">
          {i === 0 ? word : ` ${word}`}
        </span>
      ))}
    </p>
  );
}
