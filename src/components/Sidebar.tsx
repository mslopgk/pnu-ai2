import { useEffect, useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { useCanvasScale } from "./Canvas";
import { gsap, prefersReducedMotion } from "../motion/gsap";
import { useScrollLock } from "../motion/lenis";
import { useDialogFocus } from "./useDialogFocus";

export type MenuGroupKey = "overview" | "departments" | "education" | "admissions";

type Group = {
  key: MenuGroupKey;
  label: string;
  to: string;
  items: string[];
};

/*
  Figma has one "Sidebar Overlay" frame per page, each identical except for
  which group is highlighted and which flyout is shown. Modelled here as one
  interactive component: the page's own group is active on open, and hovering
  another group swaps the flyout.

  The flyout lists are taken from each page's own sidebar context — those are
  the up-to-date ones (146:955, 147:1025). The older "Flyout Content
  (Departments Page Context)" frame 121:450 still carries the superseded
  6-item 교육·연구 and 5-item 입학·취업 lists.
*/
const GROUPS: Group[] = [
  {
    key: "overview",
    label: "대학 소개",
    to: "/overview",
    items: [
      "인사말",
      "ADP+X 비전",
      "연혁",
      "조직 및 교수진",
      "시설 (IT관)",
      "파트너 생태계",
    ],
  },
  {
    key: "departments",
    label: "학과·전공",
    to: "/departments",
    items: [
      "AI컴퓨터공학부",
      "데이터사이언스학부",
      "통계학과",
      "산업공학부",
      "AX융합학부",
    ],
  },
  {
    key: "education",
    label: "교육·연구",
    to: "/education-research",
    items: [
      "학부 교육과정 (PNU-AI Pathway)",
      "마이크로디그리",
      "PNU AX 1000·100·10",
      "대학원",
      "장영실AI융합연구원",
      "대표 연구진",
      "AI 윤리·신뢰성",
      "연구조직 운영",
      "산학협력",
      "5년 로드맵",
      "개편 전후",
    ],
  },
  {
    key: "admissions",
    label: "입학·취업",
    to: "/admissions-career",
    items: [
      "2027 입학 안내",
      "장학 프로그램",
      "학생 성장 지원",
      "성과·인증",
      "입학 상담",
      "설명회",
    ],
  },
];

const PANEL_WIDTH = 760;

export function Sidebar({
  open,
  activeGroup,
  onActiveGroupChange,
  onClose,
}: {
  open: boolean;
  activeGroup: MenuGroupKey;
  onActiveGroupChange: (key: MenuGroupKey) => void;
  onClose: () => void;
}) {
  const canvasScale = useCanvasScale();
  const panelRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLButtonElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const flyoutRef = useRef<HTMLDivElement>(null);
  /** Flyout height at the previous active group, so a swap can tween between. */
  const lastFlyoutHeight = useRef<number | null>(null);
  /*
    The panel is drawn at 760px against the 1920 desktop canvas. On the 390
    mobile canvas that same factor would make it wider than the screen, so it
    is capped at the viewport.
  */
  const viewport =
    typeof document === "undefined" ? Infinity : document.documentElement.clientWidth;
  const scale = Math.min(canvasScale, viewport / PANEL_WIDTH);

  useScrollLock(open);
  useDialogFocus(open, panelRef);

  const active = GROUPS.find((g) => g.key === activeGroup) ?? GROUPS[1];
  /*
    Items sit at y = 70 + i * 40 with breathing room below the last one. Figma
    draws the frame at a fixed 330/290px, which no longer fits the 11-item
    교육·연구 list, so the height is derived from the item count instead — it
    reproduces both Figma values exactly for the lists that do fit.
  */
  const flyoutHeight = 70 + active.items.length * 40 + 20;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  /* Panel entrance: scrim fades, the 760px surface slides in from the right
     edge, then the four group labels stagger in behind it. */
  useLayoutEffect(() => {
    if (!open) return;
    const surface = surfaceRef.current;
    if (!surface) return;
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(scrimRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power1.out" });
      gsap.fromTo(surface, { xPercent: 100 }, { xPercent: 0, duration: 0.55, ease: "power3.out" });
      gsap.fromTo(
        surface.querySelectorAll("[data-menu-chrome]"),
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power1.out", delay: 0.2 },
      );
      gsap.fromTo(
        surface.querySelectorAll("[data-menu-group]"),
        { opacity: 0, x: 28 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out", stagger: 0.07, delay: 0.16 },
      );
    }, surface);

    return () => ctx.revert();
  }, [open]);

  /* Flyout cross-fade: its rows re-stagger and the panel tweens between the
     old and new list heights whenever the active group changes. */
  useLayoutEffect(() => {
    if (!open) {
      lastFlyoutHeight.current = null;
      return;
    }
    const el = flyoutRef.current;
    if (!el) return;

    const from = lastFlyoutHeight.current;
    lastFlyoutHeight.current = flyoutHeight;
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      if (from !== null && from !== flyoutHeight) {
        gsap.fromTo(el, { height: from }, { height: flyoutHeight, duration: 0.35, ease: "power2.out" });
      }
      gsap.fromTo(
        el.querySelectorAll("[data-flyout-item]"),
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: "power2.out",
          stagger: 0.03,
          delay: from === null ? 0.3 : 0,
        },
      );
    }, el);

    return () => ctx.revert();
  }, [open, activeGroup, flyoutHeight]);

  if (!open) return null;

  /*
    Portalled to <body>: `position: fixed` inside the transformed canvas would
    be scoped to the canvas rather than the viewport.
  */
  return createPortal(
    <div ref={panelRef} role="dialog" aria-modal="true" aria-label="메뉴" className="fixed inset-0 z-[100]">
      <button
        ref={scrimRef}
        type="button"
        aria-label="메뉴 닫기"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-pointer bg-black/55"
      />

      <div
        ref={surfaceRef}
        className="absolute right-0 top-0 h-full overflow-hidden bg-black"
        style={{ width: `${PANEL_WIDTH * scale}px` }}
      >
        <div
          className="relative"
          style={{
            width: `${PANEL_WIDTH}px`,
            height: "1080px",
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          <button
            type="button"
            aria-label="메뉴 닫기"
            onClick={onClose}
            data-menu-chrome
            className="wdth-100 absolute left-[690px] top-[40px] cursor-pointer text-[24px] font-extrabold leading-[normal] whitespace-nowrap text-white transition-colors duration-200 hover:text-accent"
          >
            ✕
          </button>
          <p
            data-menu-chrome
            className="wdth-100 absolute left-[60px] top-[44px] text-[13px] font-extrabold leading-[normal] whitespace-nowrap text-accent"
          >
            MENU
          </p>

          {GROUPS.map((group, i) => {
            const isActive = group.key === activeGroup;
            /*
              The highlighted group stays a link. Rendering it as plain text
              would delete the element the keyboard had just focused — hover
              and focus both make a group active, so it would vanish under the
              caret before Enter could reach it.
            */
            return (
              <Link
                key={group.key}
                to={group.to}
                onClick={onClose}
                onMouseEnter={() => onActiveGroupChange(group.key)}
                onFocus={() => onActiveGroupChange(group.key)}
                aria-current={isActive ? "true" : undefined}
                data-menu-group
                className={`wdth-100 absolute left-[60px] cursor-pointer text-[24px] font-extrabold leading-[normal] whitespace-nowrap transition-colors duration-200 ${
                  isActive ? "text-accent" : "text-white"
                }`}
                style={{ top: `${140 + i * 80}px` }}
              >
                {group.label}
              </Link>
            );
          })}

          <div
            ref={flyoutRef}
            className="absolute left-[380px] top-[140px] w-[340px] overflow-hidden bg-[#141414]"
            style={{ height: `${flyoutHeight}px` }}
          >
            <p
              data-flyout-item
              className="wdth-100 absolute left-[30px] top-[30px] text-[13px] font-extrabold leading-[normal] whitespace-nowrap text-accent"
            >
              {active.label}
            </p>
            {active.items.map((item, i) => (
              <Link
                key={item}
                to={active.to}
                onClick={onClose}
                data-flyout-item
                className="wdth-100 absolute left-[30px] w-[280px] cursor-pointer text-[16px] font-normal leading-[normal] text-white transition-colors duration-200 hover:text-accent"
                style={{ top: `${70 + i * 40}px` }}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
