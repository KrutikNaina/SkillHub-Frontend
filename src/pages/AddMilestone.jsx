// src/pages/AddMilestone.jsx
import { useState, useEffect } from "react";

const AddMilestone = ({ isOpen, onClose, onAdd, token }) => {
  const [formData, setFormData] = useState({
    type: "",
    badge: "",
    achievedOn: new Date().toISOString().slice(0, 10),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        type: "",
        badge: "",
        achievedOn: new Date().toISOString().slice(0, 10),
      });
      setError(null);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:5000/api/milestones/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token || localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to add milestone");
      }

      const newMilestone = await res.json();
      onAdd(newMilestone);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-md max-h-[80vh] overflow-y-auto p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          🎯 Add Milestone
        </h2>

        {error && (
          <p className="mb-4 text-red-600 dark:text-red-400 font-medium">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Milestone Type */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Milestone Type
            </label>
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              placeholder="e.g., 7-day streak"
              required
              className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          {/* Badge */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Badge Name
            </label>
            <input
              type="text"
              name="badge"
              value={formData.badge}
              onChange={handleChange}
              placeholder="e.g., Consistency King"
              className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          {/* Achieved On */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Achieved On
            </label>
            <input
              type="date"
              name="achievedOn"
              value={formData.achievedOn}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 rounded-md bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-600 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add Milestone"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMilestone;
