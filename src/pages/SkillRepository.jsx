import { useEffect, useState } from 'react'
import AddSkillModal from './AddSkillModal'
import { Plus } from 'lucide-react'
import axios from 'axios'

const SkillRepository = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch skills from MongoDB
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/skills')
        setSkills(res.data.skills || [])
        setLoading(false)
      } catch (err) {
        setError('Failed to load skills.')
        setLoading(false)
      }
    }

    fetchSkills()
  }, [])

  // Add new skill manually
  const addStaticSkill = (skill) => {
    setSkills((prevSkills) => [...prevSkills, skill])
  }

  return (
    <section className="min-h-screen px-6 py-24 bg-[#f4f6fa] dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Skill Repositories</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          <Plus className="w-4 h-4" /> Add New
        </button>
      </div>

      {loading ? (
        <p className="text-gray-600 dark:text-gray-400">Loading skills...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : skills.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No skills found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 shadow hover:shadow-lg transition"
            >
              {skill.coverImage && (
                <img src={skill.coverImage} alt={skill.title} className="w-full h-40 object-cover" />
              )}
              <div className="p-4">
                <h3 className="text-xl font-semibold">{skill.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{skill.description}</p>
                <div className="text-xs mt-3 text-gray-600 dark:text-gray-400">
                  🎯 {skill.targetGoal} • 📅 {skill.startDate}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AddSkillModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        addStaticSkill={addStaticSkill}
      />
    </section>
  )
}

export default SkillRepository
