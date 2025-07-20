import { useState } from 'react'
import { X } from 'lucide-react'

const AddSkillModal = ({ isOpen, onClose, addStaticSkill }) => {
  const [formData, setFormData] = useState({
    title: '',
    coverImage: '',
    startDate: '',
    targetGoal: '',
    description: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Use passed prop to add skill to static state
    addStaticSkill(formData)
    setFormData({
      title: '',
      coverImage: '',
      startDate: '',
      targetGoal: '',
      description: '',
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-[#f4f6fa] dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
        >
          <X />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Add New Skill
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Skill Title"
            required
            className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white outline-none"
          />

          <input
            type="url"
            name="coverImage"
            value={formData.coverImage}
            onChange={handleChange}
            placeholder="Cover Image URL"
            className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white outline-none"
          />

          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white outline-none"
          />

          <input
            type="text"
            name="targetGoal"
            value={formData.targetGoal}
            onChange={handleChange}
            placeholder="Target Goal (e.g., 30-day challenge)"
            className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white outline-none"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            placeholder="Description"
            className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white outline-none"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            ➕ Add Skill
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddSkillModal
