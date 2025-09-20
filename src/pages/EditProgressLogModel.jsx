import { useState, useEffect } from "react";

const BACKEND_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : "https://skillhub-backend.vercel.app";

const EditProgressLogModal = ({ isOpen, onClose, editingLog, onUpdate }) => {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch log data when modal opens
  useEffect(() => {
    const fetchLog = async () => {
      if (!editingLog?._id) return;

      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await fetch(`${BACKEND_URL}/api/progresslogs/${editingLog._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch log");
        const data = await res.json();

        setFormData({
          skillTitle: data.skillTitle || "",
          date: data.date ? data.date.split("T")[0] : "",
          notes: data.notes || "",
          completionPercent: data.completionPercent || 0,
          image: data.image || "",
          video: data.video || "",
        });
      } catch (err) {
        console.error("Error fetching log:", err);
        alert("Error fetching log");
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) fetchLog();
  }, [isOpen, editingLog]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Ensure completionPercent stays between 0-100
    if (name === "completionPercent") {
      const val = Math.min(100, Math.max(0, Number(value)));
      setFormData((prev) => ({ ...prev, [name]: val }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Authentication token missing. Please log in.");
        return;
      }

      const res = await fetch(`${BACKEND_URL}/api/progresslogs/${editingLog._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to update log");

      const updatedLog = await res.json();
      onUpdate(updatedLog); // send updated log to parent
      onClose();
    } catch (err) {
      console.error("Error updating log:", err);
      alert("Error updating log");
    }
  };

  if (!isOpen || !formData) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4 text-purple-700">Edit Progress Log</h2>
        {loading ? (
          <p className="text-center py-4">Loading log...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Skill Title" name="skillTitle" value={formData.skillTitle} onChange={handleChange} />
            <Input label="Date" type="date" name="date" value={formData.date} onChange={handleChange} />
            <TextArea label="Notes" name="notes" value={formData.notes} onChange={handleChange} />
            <Input
              label="Completion Percentage"
              type="number"
              name="completionPercent"
              value={formData.completionPercent}
              onChange={handleChange}
              min="0"
              max="100"
            />
            <Input label="Image URL" name="image" value={formData.image} onChange={handleChange} />
            <Input label="Video URL" name="video" value={formData.video} onChange={handleChange} />

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-lg"
              >
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-lg">
                Update Log
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

// Reusable Input
const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      {...props}
      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none"
    />
  </div>
);

// Reusable TextArea
const TextArea = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <textarea
      {...props}
      rows={3}
      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none"
    />
  </div>
);

export default EditProgressLogModal;
