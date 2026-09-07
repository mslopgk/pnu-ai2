import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useCanvasScale } from "./Canvas";
import { gsap, prefersReducedMotion } from "../motion/gsap";
import { useScrollLock } from "../motion/lenis";
import { useDialogFocus } from "./useDialogFocus";

/**
 * Centred detail overlay for the AX-cluster and faculty tables. Figma draws
 * these as standalone frames at a fixed design size (AX 263:699+ at 1400×760,
 * faculty 264:702+ at 1000×N) — white, 16px corners, with a 36px #f2f2f2 close
 * puck at x = width − 60, y = 24. They are re-scaled here by the same factor as
 * the page canvas and portalled out of it so `fixed` is relative to the
 * viewport.
 */
export function Modal({
  open,
  width,
  height,
  onClose,
  label,
  children,
}: {
  open: boolean;
  width: number;
  height: number;
  onClose: () => void;
  label: string;
  children: ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLButtonElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useScrollLock(open);
  useDialogFocus(open, panelRef);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  /* Scale-fade entrance, then the table's rows cascade in behind it. The
     surface carries the canvas scale as a static transform, so the tween runs
     on the wrapper above it and leaves that transform alone. */
  useLayoutEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const surface = surfaceRef.current;
    if (!panel || !surface) return;
    if (prefersReducedMotion()) return;

    const rows = Array.from(surface.children).filter((n) => n !== closeRef.current);

    const ctx = gsap.context(() => {
      gsap.fromTo(scrimRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: "power1.out" });
      gsap.fromTo(
        panel,
        { opacity: 0, scale: 0.94, y: 18 },
        { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: "power3.out" },
      );
      if (rows.length) {
        gsap.fromTo(
          rows,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", stagger: 0.05, delay: 0.14 },
        );
      }
      gsap.fromTo(
        closeRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)", delay: 0.3 },
      );
    });

    return () => ctx.revert();
  }, [open]);

  const scale = useCanvasScale();

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[110] flex items-center justify-center">
      <button
        ref={scrimRef}
        type="button"
        aria-label="닫기"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-pointer bg-black/55"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        className="relative overflow-auto"
        style={{ width: `${width * scale}px`, height: `${height * scale}px` }}
      >
        <div
          ref={surfaceRef}
          className="relative overflow-hidden rounded-[16px] bg-white"
          style={{
            width: `${width}px`,
            height: `${height}px`,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          {children}
          <button
            ref={closeRef}
            type="button"
            aria-label="닫기"
            onClick={onClose}
            className="absolute top-[24px] size-[36px] cursor-pointer overflow-hidden rounded-[18px] bg-[#f2f2f2] transition-colors duration-200 hover:bg-[#e3e3e3]"
            style={{ left: `${width - 60}px` }}
          >
            <span className="wdth-100 absolute left-0 top-[9px] h-[20px] w-[36px] text-center text-[16px] font-extrabold leading-[normal] text-ink">
              ✕
            </span>
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
