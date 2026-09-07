import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { ScrollTrigger } from "./gsap";
import { useLenis } from "./lenis";

/**
 * Jumps to the top on navigation — Lenis keeps its scroll position across
 * route changes — and re-measures triggers for the page that just mounted.
 */
export function ScrollReset() {
  const { pathname } = useLocation();
  const lenis = useLenis();

  useLayoutEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);

    ScrollTrigger.refresh();
  }, [pathname, lenis]);

  return null;
}
