import { Github, ExternalLink } from "lucide-react";
import { Helmet } from 'react-helmet';

const projects = [
  {
    name: "VedAI - Spiritual AI Chatbot",
    github: "https://github.com/krutiknaina/vedai",
    live: "https://vedai.krutiknaina.com/",
    date: "Apr 2024 - Present",
    description:
      "An AI-powered chatbot based on Hindu scriptures offering answers with spiritual insights, Gita shlokas, and Choghadiya support.",
    technologies: ["Django", "SQLite", "Gemini API", "Bootstrap", "JavaScript"],
  },
  {
    name: "QR-Based Employee Management System",
    // image: "/icons/emp_qr.png",
    github: "https://github.com/KrutikNaina/Employee-ProfileScan.git",
    live: "https://www.employee-profilescan.krutiknaina.com/",
    date: "Mar 2024 - Apr 2024",
    description:
      "A web-based system that uses QR scanning to manage and display employee data, including attendance and profiles.",
    technologies: ["Django", "SQLite", "QR Code", "Bootstrap", "JavaScript"],
  },
  {
    name: "Pest Control Website",
    github: "https://github.com/KrutikNaina/PestControl.git",
    live: "https://pest-control.krutiknaina.com/",
    date: "Feb 2024 - Mar 2024",
    
    description:
      "A modern responsive website for a pest control business showcasing services, contact, and booking options.",
    technologies: ["HTML", "CSS", "JavaScript", "Responsive Design"],
  },
];

const ProjectSection = () => {
  return (
    <div className="mt-20 px-4">
      <Helmet>
        <title>Krutik Naina | Full-Stack Developer</title>
        <meta name="description" content="Portfolio of Krutik Naina, showcasing front-end development projects and skills." />
        <meta name="keywords" content="Krutik Naina, Front-End Developer, React, Portfolio" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Krutik Naina | Full-Stack Developer" />
        <meta property="og:description" content="Explore the portfolio of Krutik Naina, a passionate front-end developer." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://krutiknaina.com/" />
        <meta property="og:image" content="https://krutiknaina.com/og-image.jpg" />
      </Helmet>
      <h2 id="projects" className="text-3xl sm:text-5xl lg:text-6xl text-center tracking-wide mb-12 scroll-mt-20">
        My{" "}
        <span className="bg-gradient-to-r from-[#00ffff] to-[#9900ff] text-transparent bg-clip-text">
          Projects
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <div
            key={index}
            className="border border-white/10 rounded-2xl p-6 shadow-md hover:shadow-[0_0_30px_#00ffff30] hover:scale-[1.02] transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_20px_#00ffff40]"
          >

            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">
                {project.name}
              </h3>
              <p className="text-sm text-gray-400">{project.date}</p>
            </div>
            <p className="text-gray-300 mb-4">{project.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="border border-white/20 text-sm text-white px-3 py-1 rounded-full bg-white/5"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex space-x-6">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#00ffff] transition"
                title="GitHub"
              >
                <Github size={22} />
              </a>
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#9900ff] transition"
                title="Live Demo"
              >
                <ExternalLink size={22} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectSection;
