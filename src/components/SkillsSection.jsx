const skills = [
    { name: "HTML", icon: "/icons/html.png" },
    { name: "CSS", icon: "/icons/css.png" },
    { name: "JavaScript", icon: "/icons/js.png" },
    { name: "ReactJS", icon: "/icons/react.png" },
    { name: "NodeJS", icon: "/icons/node.png" },
    { name: "Python", icon: "/icons/python.svg" },
    { name: "Django", icon: "/icons/django.svg" },
    { name: "GitHub", icon: "/icons/git.png" },
    { name: "SQLite", icon: "/icons/sqlite.svg" },
    { name: "MongoDB", icon: "/icons/MongoDB.png" },
    { name: "Tailwind", icon: "/icons/tailwind.png" },
    { name: "Docker", icon: "/icons/docker-mark-blue.png" }, 

    
  ];
  
  const SkillsSection = () => {
    return (
      <div className="mt-20 px-4">
        <h2 id="skills" className="text-3xl sm:text-5xl lg:text-6xl text-center tracking-wide mb-12 scroll-mt-20">
          Skills &{" "}
          <span className="bg-gradient-to-r from-[#00ffff] to-[#9900ff] text-transparent bg-clip-text">
            Abilities
          </span>
        </h2>
  
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_20px_#00ffff40]"
            >
              <img src={skill.icon} alt={skill.name} className="w-12 h-12 mb-3" />
              <p className="text-white text-md font-medium">{skill.name}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default SkillsSection;
  