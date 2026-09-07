import { useEffect, type RefObject } from "react";

const FOCUSABLE =
  'a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])';

/**
 * Makes an overlay behave like a modal dialog for the keyboard: focus moves
 * into it on open, Tab cycles inside it, the page behind it stops taking
 * focus, and the control that opened it gets focus back on close.
 *
 * The overlays are portalled to `<body>`, so the page is silenced by marking
 * the app root inert rather than by wrapping anything.
 */
export function useDialogFocus(
  open: boolean,
  ref: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const el = ref.current;
    if (!open || !el) return;

    const opener = document.activeElement as HTMLElement | null;
    const root = document.getElementById("root");
    root?.setAttribute("inert", "");

    const items = () =>
      [...el.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
        (n) => n.offsetWidth > 0 || n.offsetHeight > 0,
      );

    items()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const list = items();
      if (!list.length) return;
      const first = list[0];
      const last = list[list.length - 1];

      if (!el.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey, true);
    return () => {
      document.removeEventListener("keydown", onKey, true);
      root?.removeAttribute("inert");
      opener?.focus?.();
    };
  }, [open, ref]);
}
