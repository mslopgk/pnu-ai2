import {
  createContext,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { ScrollTrigger } from "../motion/gsap";
import { useReveal, type RevealOptions } from "../motion/useReveal";

const ScaleContext = createContext(1);

/**
 * The canvas-to-viewport scale factor. Overlays that must escape the scrolling
 * canvas (the sidebar, detail modals) re-apply it themselves.
 */
export function useCanvasScale() {
  return useContext(ScaleContext);
}

/**
 * Scales the fixed 1920px design canvas to the available viewport width so the
 * page renders exactly as drawn in Figma, at any window size.
 */
export function Canvas({
  width = 1920,
  height,
  children,
}: {
  /** Design width of the Figma frame this page reproduces. */
  width?: number;
  height: number;
  children: ReactNode;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const apply = () => setScale(el.clientWidth / width);

    apply();

    // ResizeObserver covers layout-driven width changes; the resize listener
    // covers plain window resizes even while the tab is not being painted.
    const observer = new ResizeObserver(apply);
    observer.observe(el);
    window.addEventListener("resize", apply);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", apply);
    };
  }, [width]);

  // Scaling changes every element's page position, so every trigger's start
  // and end offsets have to be measured again.
  useLayoutEffect(() => {
    ScrollTrigger.refresh();
  }, [scale, height]);

  return (
    <ScaleContext.Provider value={scale}>
      <div
        ref={viewportRef}
        className="canvas-viewport"
        style={
          {
            "--canvas-w": width,
            "--canvas-h": height,
            "--scale": scale,
          } as React.CSSProperties
        }
      >
        <div
          className="canvas"
          style={{ width: `${width}px`, height: `${height}px` }}
        >
          {children}
        </div>
      </div>
    </ScaleContext.Provider>
  );
}

/** One full-bleed band of the landing page, positioned by its Figma Y offset. */
export function Band({
  top,
  height,
  className = "",
  reveal,
  innerRef,
  children,
}: {
  top: number;
  height: number;
  className?: string;
  /** Fade the band's children up as it scrolls into view. */
  reveal?: boolean | RevealOptions;
  /** Lets a section reach the band element for its own scroll animation. */
  innerRef?: RefObject<HTMLElement | null>;
  children?: ReactNode;
}) {
  const ownRef = useRef<HTMLElement>(null);
  const ref = innerRef ?? ownRef;
  useReveal(ref, Boolean(reveal), typeof reveal === "object" ? reveal : undefined);

  return (
    <section
      ref={ref}
      className={`absolute left-0 w-full overflow-hidden ${className}`}
      style={{ top: `${top}px`, height: `${height}px` }}
    >
      {children}
    </section>
  );
}
