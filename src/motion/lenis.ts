import { createContext, useContext, useEffect } from "react";
import type Lenis from "lenis";

export const LenisContext = createContext<Lenis | null>(null);

/** The page's Lenis instance, or null when smooth scrolling is off. */
export function useLenis() {
  return useContext(LenisContext);
}

/**
 * Pauses smooth scrolling while an overlay is open, so the page behind a modal
 * or the sidebar does not scroll with the wheel.
 */
export function useScrollLock(locked: boolean) {
  const lenis = useLenis();

  useEffect(() => {
    if (!locked) return;

    lenis?.stop();
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    return () => {
      lenis?.start();
      document.body.style.overflow = overflow;
    };
  }, [locked, lenis]);
}
