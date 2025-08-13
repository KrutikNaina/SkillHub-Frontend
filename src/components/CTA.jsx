import { Link } from 'react-router-dom'

const CTA = () => {
  return (
    <section className="w-full bg-[#f4f6fa] dark:bg-gray-900 px-4 sm:px-6 lg:px-20 mb-16 py-8 border-gray-300 dark:border-gray-700">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* LEFT TEXT */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Ready to Build Your Skills with Consistency?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-1 text-sm">
            Join thousands growing every day on SkillHub.
          </p>
        </div>

        {/* CTA BUTTON */}
        <Link
          to="/login"
          className="inline-block bg-blue-600 text-white font-medium px-6 py-3 rounded-xl hover:bg-blue-700 transition"
        >
          🚀 Join SkillHub Now
        </Link>
      </div>
    </section>
  )
}

export default CTA
