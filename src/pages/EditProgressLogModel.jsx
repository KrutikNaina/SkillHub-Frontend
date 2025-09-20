import { useState, useEffect } from "react";

const EditProgressLogModal = ({ isOpen, onClose, editingLog, onUpdate }) => {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch single log data from backend when modal opens
  useEffect(() => {
    const fetchLog = async () => {
      if (!editingLog?._id) return;

      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:5000/api/progresslogs/${editingLog._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
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
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) fetchLog();
  }, [isOpen, editingLog]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:5000/api/progresslogs/${editingLog._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error("Failed to update log");
      const updatedLog = await res.json();
      onUpdate(updatedLog); // ✅ send updated log to parent
      onClose();
    } catch (err) {
      console.error("Error updating log:", err);
      alert("Error updating log");
    }
  };

  if (!isOpen || !formData) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4 text-purple-700">
          Edit Progress Log
        </h2>
        {loading ? (
          <p>Loading log...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Skill Title</label>
              <input
                type="text"
                name="skillTitle"
                value={formData.skillTitle}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                rows="3"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium">
                Completion Percentage
              </label>
              <input
                type="number"
                name="completionPercent"
                value={formData.completionPercent}
                onChange={handleChange}
                min="0"
                max="100"
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Image URL</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Video URL</label>
              <input
                type="text"
                name="video"
                value={formData.video}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded-lg"
              >
                Update Log
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditProgressLogModal;
