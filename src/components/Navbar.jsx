import EducationSection from "./EducationSection";
import SkillSection from "./SkillsSection";
import Workflow from "./Workflow"; 

const Header = () => {
  return (
    <header className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 backdrop-blur-lg bg-white/10 border border-white/30 rounded-full px-10 py-3 shadow-lg">
      <nav className="flex gap-8 text-base text-white font-semibold">
        <a href="#home" className="hover:text-[#00ffff] transition-colors duration-300">Home</a>
        <a href="#about" className="hover:text-[#00ffff] transition-colors duration-300">About</a>
        <a href="#skills" className="hover:text-[#00ffff] transition-colors duration-300">Skills</a>
        <a href="#projects" className="hover:text-[#00ffff] transition-colors duration-300">Projects</a>
        <a href="#education" className="hover:text-[#00ffff] transition-colors duration-300">Education</a>
        <a href="#contact" className="hover:text-[#00ffff] transition-colors duration-300">Contact</a>
      </nav>
    </header>
  );
};

export default Header;
