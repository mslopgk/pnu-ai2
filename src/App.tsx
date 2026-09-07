import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SmoothScroll } from "./motion/SmoothScroll";
import { ScrollReset } from "./motion/ScrollReset";
import Landing from "./pages/Landing";
import Overview from "./pages/Overview";
import Departments from "./pages/Departments";
import EducationResearch from "./pages/EducationResearch";
import AdmissionsCareer from "./pages/AdmissionsCareer";

export default function App() {
  return (
    <SmoothScroll>
      <BrowserRouter>
        <ScrollReset />
        {/* One main landmark so the very long pages are reachable by
            landmark navigation. */}
        <main>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/departments" element={<Departments />} />
            <Route
              path="/education-research"
              element={<EducationResearch />}
            />
            <Route path="/admissions-career" element={<AdmissionsCareer />} />
          </Routes>
        </main>
      </BrowserRouter>
    </SmoothScroll>
  );
}
