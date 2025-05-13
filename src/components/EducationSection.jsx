import { motion } from "framer-motion";
import { FaGraduationCap, FaCalendarAlt } from "react-icons/fa";

const educationData = [
  {
    degree: "MCA (Master of Computer Applications)",
    institution: "Marwadi University, Rajkot",
    duration: "2024 - 2026",
  },
  {
    degree: "BCA (Bachelor of Computer Applications)",
    institution: "Saurashtra University, Rajkot",
    duration: "2022 - 2024",
  },
  {
    degree: "HSC (Higher Secondary Certificate)",
    institution: "Virani High School, Rajkot",
    duration: "2020 - 2022",
  },
];

const EducationSection = () => {
  return (
    <div id="education" className="mt-20 px-4 max-w-5xl mx-auto">
      <h2 className="text-3xl sm:text-4xl text-center mb-12">
        <span className="bg-gradient-to-r from-[#00ffff] to-[#9900ff] text-transparent bg-clip-text">
          Education
        </span>
      </h2>

      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#00ffff] to-[#9900ff]"></div>

        {educationData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`relative w-full md:w-1/2 p-4 my-8 ${
              index % 2 === 0 ? "ml-auto text-left" : "mr-auto text-right"
            }`}
          >
            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-2 text-lg font-semibold text-white mb-1">
                <FaGraduationCap className="text-[#00ffff]" />
                {item.degree}
              </div>
              <div className="text-neutral-300 mb-2">{item.institution}</div>
              <div className="flex items-center gap-2 text-sm text-neutral-400">
                <FaCalendarAlt />
                {item.duration}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EducationSection;
