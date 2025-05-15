import { motion } from "framer-motion";
import { FaMedal, FaCalendarAlt } from "react-icons/fa"; // Changed from FaCertificate to FaMedal
import { Helmet } from 'react-helmet';

const achievements = [
  {
    title: "Gen AI Study Completion",
    date: "Sep 2024 - Oct 2024",
    description: "Completed Google’s Generative AI Study Jam program focused on prompt engineering, model usage, and AI ethics.",
  },
  {
    title: "Hack The Mountains 5.0",
    date: "Issued Sep 2024",
    description: "Took part in Hack The Mountains 5.0, a 36-hour non-stop hackathon held at Marwadi University, where I worked on building a full-stack web application from scratch alongside my team.",
  },
];

const AchievementSection = () => {
  return (
    <div className="mt-20 px-4 max-w-5xl mx-auto">
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
      <h2 id="achievements" className="text-3xl sm:text-5xl lg:text-6xl text-center tracking-wide mb-12 scroll-mt-24">
        My{" "}
        <span className="bg-gradient-to-r from-[#00ffff] to-[#9900ff] text-transparent bg-clip-text">
          Achievements
        </span>
      </h2>

      <div className="grid gap-8 md:grid-cols-2">
        {achievements.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg hover:scale-105 hover:shadow-[0_0_25px_#00ffff40] transition-all duration-300"
          >
            <div className="flex items-center gap-3 text-lg font-semibold text-white mb-2">
              <FaMedal className="text-[#00ffff]" />
              {item.title}
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-400 mb-2">
              <FaCalendarAlt />
              {item.date}
            </div>
            <p className="text-neutral-300 text-sm">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AchievementSection;
