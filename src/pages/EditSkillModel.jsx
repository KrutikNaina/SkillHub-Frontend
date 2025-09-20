import { useState, useEffect } from "react";
import { X } from "lucide-react";

const BACKEND_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : "https://skillhub-backend.vercel.app";

const EditSkillModal = ({ isOpen, onClose, skill, updateSkill }) => {
  const [formData, setFormData] = useState({
    title: "",
    coverImage: "",
    startDate: "",
    targetGoal: "",
    description: "",
  });

  useEffect(() => {
    if (skill) {
      setFormData({
        title: skill.title || "",
        coverImage: skill.coverImage || "",
        startDate: skill.startDate?.split("T")[0] || "",
        targetGoal: skill.targetGoal || "",
        description: skill.description || "",
      });
    }
  }, [skill]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("Authentication token missing. Please log in.");

      const res = await fetch(`${BACKEND_URL}/api/skills/${skill._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to update skill");
      const data = await res.json();

      updateSkill(skill._id, data.skill); // callback to parent
      onClose();
    } catch (err) {
      console.error("Error updating skill:", err);
      alert("Error updating skill");
    }
  };

  const today = new Date().toISOString().split("T")[0];
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-opacity duration-300">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-8 relative transform transition-all duration-300 scale-100">
        {/* Cursor blink style */}
        <style>{`
          @keyframes blink {
            0%, 100% { border-color: #3b82f6; }
            50% { border-color: transparent; }
          }
          .blink-cursor:focus {
            animation: blink 0.7s step-end infinite;
          }
        `}</style>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Edit Skill
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input label="Skill Title" name="title" value={formData.title} onChange={handleChange} required />
          <Input label="Cover Image URL" type="url" name="coverImage" value={formData.coverImage} onChange={handleChange} placeholder="https://example.com/image.jpg" />
          <Input label="Start Date" type="date" name="startDate" value={formData.startDate} onChange={handleChange} min={today} />
          <Input label="Target Goal" name="targetGoal" value={formData.targetGoal} onChange={handleChange} placeholder="E.g., 30-day challenge" />
          <TextArea label="Description" name="description" value={formData.description} onChange={handleChange} rows={4} placeholder="Describe your skill" />

          <button type="submit" className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 transition-colors font-medium">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

// Reusable Input component
const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
    <input
      {...props}
      className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 blink-cursor transition-colors"
    />
  </div>
);

// Reusable TextArea component
const TextArea = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
    <textarea
      {...props}
      className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 blink-cursor transition-colors resize-none"
    />
  </div>
);

export default EditSkillModal;
