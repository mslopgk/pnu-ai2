import { Canvas } from "../components/Canvas";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { Pathway } from "../sections/education/Pathway";
import { Microdegrees } from "../sections/education/Microdegrees";
import { Bootcamp } from "../sections/education/Bootcamp";
import { GraduatePrograms } from "../sections/education/GraduatePrograms";
import { ResearchInstitute } from "../sections/education/ResearchInstitute";
import { FacultyDirectory } from "../sections/education/FacultyDirectory";
import { EthicsTrust } from "../sections/education/EthicsTrust";
import { ResearchOrganization } from "../sections/education/ResearchOrganization";
import { IndustryPartnership } from "../sections/education/IndustryPartnership";
import { Roadmap } from "../sections/education/Roadmap";
import { AsIsToBe } from "../sections/education/AsIsToBe";

/** Figma frame "Desktop - Education Research" (145:579) — 1920 × 12796. */
export default function EducationResearch() {
  return (
    <Canvas height={12796}>
      <Pathway />
      <Microdegrees />
      <Bootcamp />
      <GraduatePrograms />
      <ResearchInstitute />
      <FacultyDirectory />
      <EthicsTrust />
      <ResearchOrganization />
      <IndustryPartnership />
      <Roadmap />
      <AsIsToBe />
      <Footer top={11984} contact="입학정보 · go.pusan.ac.kr" />
      <Navigation menuGroup="education" />
    </Canvas>
  );
}
