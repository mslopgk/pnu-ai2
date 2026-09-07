import { Canvas } from "../components/Canvas";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { DeanMessage } from "../sections/overview/DeanMessage";
import { AdpxVision } from "../sections/overview/AdpxVision";
import { HistoryTimeline } from "../sections/overview/HistoryTimeline";
import { Organization } from "../sections/overview/Organization";
import { Facilities } from "../sections/overview/Facilities";
import { PartnerEcosystem } from "../sections/overview/PartnerEcosystem";

/** Figma frame "Desktop - Overview" (136:504) — 1920 × 7396. */
export default function Overview() {
  return (
    <Canvas height={7396}>
      <DeanMessage />
      <AdpxVision />
      <HistoryTimeline />
      <Organization />
      <Facilities />
      <PartnerEcosystem />
      <Footer top={6584} />
      <Navigation menuGroup="overview" />
    </Canvas>
  );
}
