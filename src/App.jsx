import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Workflow from "./components/Workflow";
import ProjectSection from "./components/ProjectSection";
import Footer from "./components/Footer";
import SkillsSection from "./components/SkillsSection";
import ContactSection from "./components/ContactSection";
import EducationSection from "./components/EducationSection";
import { Analytics } from "@vercel/analytics/next"

const App = () => {
  return (
    <>
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto pt-20 px-6">
        <HeroSection />
        <Workflow />
        <SkillsSection />
        <ProjectSection />
        <EducationSection />
        <ContactSection />
        <Footer />
      </div>
      <Analytics />
      </div>
    </>
  );
};

export default App;
