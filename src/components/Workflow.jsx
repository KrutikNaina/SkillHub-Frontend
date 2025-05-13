import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import codeImg from "../assets/aboutus.png";
import { checklistItems } from "../constants";

const Workflow = () => {
  return (
    <div id="about"  className="mt-20">
      <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center mt-6 tracking-wide">
        About{" "}
        <span className="bg-gradient-to-r from-[#00ffff] to-[#9900ff] text-transparent bg-clip-text">
          Me
        </span>
      </h2>

      <div className="flex flex-wrap justify-center">
        {/* Floating Image Section */}
        <div className="p-2 w-full lg:w-1/2 flex justify-center items-center">
          <motion.img
            src={codeImg}
            alt="Coding"
            className="w-[70%] h-auto"
            whileHover={{ scale: 1.05, rotate: 1 }}
            animate={{ y: [0, -10, 0] }}
            transition={{
              repeat: Infinity,
              repeatType: "mirror",
              duration: 3,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Description + Button Section */}
        <div className="pt-12 w-full lg:w-1/2">
          {checklistItems.map((item, index) => (
            <div key={index} className="flex flex-col mb-12 mt-5 px-4">
              <div className="flex items-start space-x-3">
                <p className="text-lg text-white">{item.description}</p>
              </div>
              {/* Download CV Button */}
              <div className="mt-4">
                <a
                  href="/icons/Krutik_Naina_CV.pdf"
                  download
                  className="inline-block px-4 py-2 border border-white/20 text-white rounded-md text-sm hover:bg-white/10 transition duration-300"
                >
                  Download CV
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Workflow;
