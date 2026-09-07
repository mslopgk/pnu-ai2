import { Canvas } from "../components/Canvas";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { Hero } from "../sections/landing/Hero";
import { NewStart } from "../sections/landing/NewStart";
import { Statistics } from "../sections/landing/Statistics";
import { Adpx } from "../sections/landing/Adpx";
import { AdpxCards } from "../sections/landing/AdpxCards";
import { Academics } from "../sections/landing/Academics";
import { EducationPrograms } from "../sections/landing/EducationPrograms";
import { Growth } from "../sections/landing/Growth";
import { Research } from "../sections/landing/Research";
import { Industry } from "../sections/landing/Industry";
import { Ecosystem } from "../sections/landing/Ecosystem";
import { People } from "../sections/landing/People";
import { Launch } from "../sections/landing/Launch";
import { Admission } from "../sections/landing/Admission";
import { News } from "../sections/landing/News";

/** Figma frame "Desktop - 3" (67:564) — 1920 × 16713. */
export default function DesktopLanding() {
  return (
    <Canvas height={16713}>
      <Hero />
      <NewStart />
      <Statistics />
      <Adpx />
      <AdpxCards />
      <Academics />
      <EducationPrograms />
      <Growth />
      <Research />
      <Industry />
      <Ecosystem />
      <People />
      <Launch />
      <Admission />
      <News />
      <Footer top={15901} />
      <Navigation menuGroup="departments" />
    </Canvas>
  );
}
