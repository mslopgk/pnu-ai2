import { useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { gsap, prefersReducedMotion } from "../motion/gsap";
import { Sidebar, type MenuGroupKey } from "./Sidebar";

/**
 * Nav Links component (Figma 95:760). Identical on every page in the source
 * file — including the active indicator, which always sits on the first link.
 */
const LINKS = [
  { label: "AI College", to: "/" },
  { label: "Education", to: "/education-research" },
  { label: "Research", to: "/education-research" },
  { label: "People", to: "/overview" },
  { label: "News", to: "/" },
];

export function Navigation({
  /** Which sidebar group opens highlighted — the page's own section. */
  menuGroup = "departments",
}: {
  menuGroup?: MenuGroupKey;
}) {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState<MenuGroupKey>(menuGroup);
  const navRef = useRef<HTMLElement>(null);

  const openMenu = () => {
    setActiveGroup(menuGroup);
    setMenuOpen(true);
  };

  /* Chrome intro: the pill drops in, the active indicator wipes out from its
     left edge, and the hamburger pops last. */
  useLayoutEffect(() => {
    const el = navRef.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-nav-pill]",
        { opacity: 0, y: -16 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 0.1 },
      );
      gsap.fromTo(
        "[data-nav-indicator]",
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.5, ease: "power2.out", delay: 0.45 },
      );
      gsap.fromTo(
        "[data-nav-burger]",
        { opacity: 0, scale: 0.7 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)", delay: 0.3 },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <nav ref={navRef} className="absolute left-0 top-0 z-50 h-[104px] w-[1920px]">
        <div
          data-nav-pill
          className="absolute left-[1121px] top-[32px] flex h-[52px] items-center gap-[58px] overflow-hidden rounded-full bg-section-dark px-[20px]"
        >
          <div
            data-nav-indicator
            className="absolute left-px top-0 h-[52px] w-[138px] rounded-[42px] bg-white/30"
          />
          {LINKS.map(({ label, to }, i) => (
            <Link
              key={label}
              to={to}
              /* Several labels share a destination, so only the first match
                 may claim the current page. */
              aria-current={
                pathname === to && LINKS.findIndex((l) => l.to === to) === i
                  ? "page"
                  : undefined
              }
              className="relative flex shrink-0 cursor-pointer items-center overflow-hidden font-ui text-[20px] font-semibold leading-[normal] whitespace-nowrap text-white"
            >
              {label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          aria-label="메뉴 열기"
          aria-expanded={menuOpen}
          onClick={openMenu}
          data-nav-burger
          className="absolute left-[1846px] top-[28px] size-[48px] cursor-pointer rounded-[24px] bg-black transition-colors duration-200 hover:bg-white/30"
        >
          <span className="absolute left-[14px] top-[17px] h-[2px] w-[20px] rounded-[1px] bg-white" />
          <span className="absolute left-[14px] top-[23px] h-[2px] w-[20px] rounded-[1px] bg-white" />
          <span className="absolute left-[14px] top-[29px] h-[2px] w-[20px] rounded-[1px] bg-white" />
        </button>
      </nav>

      <Sidebar
        open={menuOpen}
        activeGroup={activeGroup}
        onActiveGroupChange={setActiveGroup}
        onClose={() => setMenuOpen(false)}
      />
    </>
  );
}
