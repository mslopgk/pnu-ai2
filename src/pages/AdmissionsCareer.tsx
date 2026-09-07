import { Canvas } from "../components/Canvas";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { EnrollmentSchedule } from "../sections/admissions/EnrollmentSchedule";
import { Scholarships } from "../sections/admissions/Scholarships";
import { StudentGrowth } from "../sections/admissions/StudentGrowth";
import { CareerStats } from "../sections/admissions/CareerStats";
import { Counseling } from "../sections/admissions/Counseling";
import { InfoSessions } from "../sections/admissions/InfoSessions";

/** Figma frame "Desktop - Admissions Career" (146:1026) — 1920 × 7396. */
export default function AdmissionsCareer() {
  return (
    <Canvas height={7396}>
      <EnrollmentSchedule />
      <Scholarships />
      <StudentGrowth />
      <CareerStats />
      <Counseling />
      <InfoSessions />
      <Footer top={6584} contact="입학정보 · go.pusan.ac.kr" />
      <Navigation menuGroup="admissions" />
    </Canvas>
  );
}
