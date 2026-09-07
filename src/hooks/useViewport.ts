import { useEffect, useState } from "react";

export type Viewport = "mobile" | "tablet" | "desktop";

function read(): Viewport {
  if (typeof window === "undefined") return "desktop";
  const w = window.innerWidth;
  if (w < 640) return "mobile";
  if (w < 1024) return "tablet";
  return "desktop";
}

/**
 * Which Figma frame to render. The file has three landing frames —
 * Mobile - 390, Tablet - 834 and Desktop - 3 (1920) — so the breakpoints sit
 * just above the two smaller design widths.
 */
export function useViewport(): Viewport {
  const [viewport, setViewport] = useState<Viewport>(read);

  useEffect(() => {
    const onResize = () => setViewport(read());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return viewport;
}
