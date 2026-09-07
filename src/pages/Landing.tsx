import { useViewport } from "../hooks/useViewport";
import DesktopLanding from "./DesktopLanding";
import TabletLanding from "./TabletLanding";
import MobileLanding from "./MobileLanding";

/**
 * The landing page exists as three separate frames in Figma. Each is rendered
 * on its own fixed-width canvas, picked by viewport width.
 */
export default function Landing() {
  const viewport = useViewport();

  if (viewport === "mobile") return <MobileLanding />;
  if (viewport === "tablet") return <TabletLanding />;
  return <DesktopLanding />;
}
