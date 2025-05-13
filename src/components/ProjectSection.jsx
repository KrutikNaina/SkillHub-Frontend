import { Github, ExternalLink } from "lucide-react";

const projects = [
  {
    name: "VedAI - Spiritual AI Chatbot",
    image: "/icons/vedai.png",
    github: "https://github.com/krutiknaina/vedai",
    live: "https://vedai.onrender.com",
  },
  {
    name: "QR-Based Employee Management System",
    image: "/icons/emp_qr.png",
    github: "https://github.com/KrutikNaina/Employee-ProfileScan.git",
    live: "https://employee-profilescan.onrender.com",
  },
  {
    name: "Pest Control Website",
    image: "/icons/service.png",
    github: "https://github.com/KrutikNaina/PestControl.git",
    live: "https://pest-control-beta.vercel.app/",
  },
//   {
//     name: "Python Weather App",
//     image: "/projects/weather.png",
//     github: "https://github.com/krutiknaina/python-weather",
//     live: "#",
//   },
];

const ProjectSection = () => {
  return (
    <div id="projects" className="mt-20 px-4">
      <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center tracking-wide mb-12">
        My{" "}
        <span className="bg-gradient-to-r from-[#00ffff] to-[#9900ff] text-transparent bg-clip-text">
          Projects
        </span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-white/5 border border-white/10 rounded-xl overflow-hidden shadow-lg hover:shadow-[0_0_25px_#00ffff40] transition-transform hover:scale-105 duration-300"
          >
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl text-white font-semibold mb-4">
                {project.name}
              </h3>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectSection;
