// src/pages/Milestones.jsx
import { useEffect } from 'react'
import DashboardNavbar from '../components/DashboardNavbar'
import { Trophy, Calendar, Flame } from 'lucide-react'

const Milestones = () => {
  useEffect(() => {
    document.title = "Milestones & Streaks | SkillHub"
  }, [])

  return (
    <>
    <DashboardNavbar/>
      <section className="w-full min-h-screen px-6 py-24 bg-[#f4f6fa] dark:bg-gray-900 text-gray-900 dark:text-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-center">
            🏁 Your Milestones & Streaks
          </h1>

          {/* Streak Tracker */}
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 mb-10 shadow">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Flame className="text-orange-500" /> Current Streak
            </h2>
            <p className="text-lg">🔥 You’re on a 7-day learning streak!</p>
            <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-4 mt-4">
              <div className="bg-orange-500 h-4 rounded-full w-7/12 transition-all duration-500" />
            </div>
            <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">Keep going to hit 30 days!</p>
          </div>

          {/* Progress Towards Goal */}
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 mb-10 shadow">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Calendar className="text-blue-600" /> Skill Progress
            </h2>
            <p className="text-lg">📘 Web Development: 65% complete</p>
            <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-4 mt-4">
              <div className="bg-blue-600 h-4 rounded-full w-2/3 transition-all duration-500" />
            </div>
            <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">Goal: Finish React module by July 10</p>
          </div>

          {/* Badges Earned */}
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 shadow">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Trophy className="text-yellow-500" /> Your Badges
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              <Badge title="Consistency King" desc="7-day streak!" color="orange" />
              <Badge title="Skill Achiever" desc="50% of goal reached" color="blue" />
              <Badge title="30-Day Champ" desc="Logged for 30 days" color="green" />
              <Badge title="React Warrior" desc="Completed React Basics" color="purple" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

const Badge = ({ title, desc, color }) => {
  const colors = {
    orange: 'bg-orange-100 text-orange-700',
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
    purple: 'bg-purple-100 text-purple-700'
  }

  return (
    <div className={`p-4 rounded-xl shadow-md ${colors[color]} dark:bg-opacity-10`}>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm">{desc}</p>
    </div>
  )
}

export default Milestones
