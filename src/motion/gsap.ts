import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Whether motion should be suppressed. Read at animation-setup time rather
 * than cached, so a mid-session OS change is picked up on the next mount.
 */
export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export { gsap, ScrollTrigger };
