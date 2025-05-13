import { useState } from "react";
import { Menu, X } from "lucide-react"; // You can use any icon set or SVG

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 backdrop-blur-lg bg-white/10 border border-white/30 rounded-full px-6 py-3 shadow-lg w-[90%] max-w-4xl">
      <div className="flex items-center justify-between">
        {/* Brand or Logo */}
        <div className="text-white font-bold text-lg">MyPortfolio</div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 text-base text-white font-semibold">
          <a href="#home" className="hover:text-[#00ffff] transition-colors duration-300">Home</a>
          <a href="#about" className="hover:text-[#00ffff] transition-colors duration-300">About</a>
          <a href="#skills" className="hover:text-[#00ffff] transition-colors duration-300">Skills</a>
          <a href="#projects" className="hover:text-[#00ffff] transition-colors duration-300">Projects</a>
          <a href="#education" className="hover:text-[#00ffff] transition-colors duration-300">Education</a>
          <a href="#contact" className="hover:text-[#00ffff] transition-colors duration-300">Contact</a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button onClick={toggleMenu} className="md:hidden text-white">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="md:hidden mt-4 flex flex-col items-center gap-4 text-white font-semibold">
          <a href="#home" onClick={toggleMenu} className="hover:text-[#00ffff]">Home</a>
          <a href="#about" onClick={toggleMenu} className="hover:text-[#00ffff]">About</a>
          <a href="#skills" onClick={toggleMenu} className="hover:text-[#00ffff]">Skills</a>
          <a href="#projects" onClick={toggleMenu} className="hover:text-[#00ffff]">Projects</a>
          <a href="#education" onClick={toggleMenu} className="hover:text-[#00ffff]">Education</a>
          <a href="#contact" onClick={toggleMenu} className="hover:text-[#00ffff]">Contact</a>
        </nav>
      )}
    </header>
  );
};

export default Header;
