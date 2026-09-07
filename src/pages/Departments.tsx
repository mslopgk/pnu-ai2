import { Canvas } from "../components/Canvas";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { OriginStory } from "../sections/departments/OriginStory";
import { DepartmentsGrid } from "../sections/departments/DepartmentsGrid";
import { AxConvergence } from "../sections/departments/AxConvergence";

/** Figma frame "Desktop - Departments" (118:424) — 1920 × 4156. */
export default function Departments() {
  return (
    <Canvas height={4156}>
      <OriginStory />
      <DepartmentsGrid />
      <AxConvergence />
      <Footer top={3344} contact="입학정보 · go.pusan.ac.kr" />
      <Navigation menuGroup="departments" />
    </Canvas>
  );
}
