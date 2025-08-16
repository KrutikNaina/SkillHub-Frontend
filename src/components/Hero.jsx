import { Typewriter } from 'react-simple-typewriter'
import heroImage from '../assets/app-launch.svg'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom' // ✅ Import useNavigate

const Hero = () => {
  const navigate = useNavigate() // ✅ init navigate

  return (
    <section className="w-full min-h-screen pt-24 flex items-center justify-center bg-[#f4f6fa] dark:bg-gray-900 px-4 sm:px-6 lg:px-20">
      <div className="w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
        {/* LEFT TEXT SECTION */}
        <div className="w-full lg:w-1/2">
          <h1 className="text-4xl md:text-4.9xl font-bold leading-snug text-gray-900 dark:text-white">
            Connect with learners across <br className="hidden md:block" />
            <span className="text-blue-600">Skill-Hub</span>
          </h1>

          <p className="mt-6 text-lg text-gray-700 dark:text-gray-300">
            SkillHub helps you showcase your skills, track progress, and grow alongside others. Whether you're learning to code, cook, or create — you’re never learning alone.
          </p>

          <h2 className="mt-6 text-xl font-medium text-gray-900 dark:text-white">
            Helping you{' '}
            <span className="text-blue-600 font-bold">
              <Typewriter
                words={['learn faster', 'track smarter', 'grow every day']}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={80}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </span>
          </h2>

          {/* CTA BUTTON with login route */}
          <button
            onClick={() => navigate('/login')} // ✅ Redirect to /login
            className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          >
            🚀 Start Learning Now
          </button>
        </div>

        {/* RIGHT IMAGE SECTION with Floating Motion */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <motion.img
            src={heroImage}
            alt="SkillHub Hero Illustration"
            className="w-full max-w-md bg-transparent"
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
  