import { useEffect, useState, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./gsap";
import { LenisContext } from "./lenis";

/**
 * Drives Lenis from GSAP's ticker so smooth scrolling and ScrollTrigger share
 * one clock — running two RAF loops makes scrubbed animations jitter.
 *
 * Disabled entirely under `prefers-reduced-motion: reduce`, which leaves the
 * browser's native scrolling in place.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const instance = new Lenis({
      duration: 1.1,
      // Slight ease-out; keeps long pages from feeling floaty.
      easing: (t) => 1 - Math.pow(1 - t, 3),
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });

    instance.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Publishing the instance is what lets overlays pause it; this is
    // synchronising React with an external system, not derived state.
    setLenis(instance);

    return () => {
      gsap.ticker.remove(raf);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
