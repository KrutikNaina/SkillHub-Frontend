import { useState } from "react";
import { X } from "lucide-react";

const AddSkillModal = ({ isOpen, onClose, addStaticSkill }) => {
  const [formData, setFormData] = useState({
    title: "",
    coverImage: "",
    startDate: "",
    targetGoal: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Backend URL dynamic
  const BACKEND_URL =
    import.meta.env.MODE === "development"
      ? "http://localhost:5000"
      : "https://skill-hub-backend-4b6u.vercel.app";

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please log in.");

      const res = await fetch(`${BACKEND_URL}/api/skills/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to add skill");
      }

      const data = await res.json();
      console.log("✅ Skill added:", data);

      if (addStaticSkill) addStaticSkill(data.skill);

      setFormData({
        title: "",
        coverImage: "",
        startDate: "",
        targetGoal: "",
        description: "",
      });
      onClose();
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-opacity duration-300">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] p-8 pb-6 relative overflow-y-auto transform transition-all duration-300 scale-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Add New Skill
        </h2>

        {error && (
          <p className="mb-4 text-red-600 dark:text-red-400 font-medium">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Skill Title */}
          <InputField
            label="Skill Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter skill title"
            required
          />

          {/* Cover Image */}
          <InputField
            label="Cover Image URL"
            name="coverImage"
            value={formData.coverImage}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            type="url"
          />

          {/* Start Date */}
          <InputField
            label="Start Date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            type="date"
            min={today}
          />

          {/* Target Goal */}
          <InputField
            label="Target Goal"
            name="targetGoal"
            value={formData.targetGoal}
            onChange={handleChange}
            placeholder="E.g., 30-day challenge"
          />

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Describe your skill"
              className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 transition-colors font-medium"
          >
            {loading ? "Adding..." : "Add Skill"}
          </button>
        </form>
      </div>
    </div>
  );
};

// Reusable input component
const InputField = ({ label, name, value, onChange, placeholder, type = "text", min }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      min={min}
      className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
    />
  </div>
);

export default AddSkillModal;
