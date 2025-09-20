import { useState, useEffect } from "react";

const AddProgressLogModal = ({ isOpen, onClose, onAdd, token }) => {
  const [date, setDate] = useState("");
  const [skillTitle, setSkillTitle] = useState("");
  const [skillId, setSkillId] = useState("");
  const [notes, setNotes] = useState("");
  const [completionPercent, setCompletionPercent] = useState(0);
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setDate(new Date().toISOString().slice(0, 10));
      setSkillTitle("");
      setSkillId("");
      setNotes("");
      setCompletionPercent(0);
      setImage("");
      setVideo("");
      setError(null);
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found. Please log in.");
      setLoading(false);
      return;
    }
  
    const payload = {
      date,
      skillTitle,
      skillId: skillId || null,
      notes,
      completionPercent,
      image: image || null,
      video: video || null,
    };
  
    try {
      const res = await fetch("http://localhost:5000/api/progresslogs/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to add progress log");
      }
  
      const newLog = await res.json();
  
      // Update parent state
      onAdd(newLog);
  
      // Close modal
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
      <div
        className="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-md max-h-[80vh] overflow-y-auto p-6"
        style={{ scrollbarWidth: "thin" }}
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Add Progress Log
        </h2>

        {error && (
          <p className="mb-4 text-red-600 dark:text-red-400 font-medium">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Date, Skill Title, Skill ID, Notes, Completion, Image, Video inputs same as before */}

          {/* Date */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          {/* Skill Title */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Skill Name
            </label>
            <input
              type="text"
              value={skillTitle}
              onChange={(e) => setSkillTitle(e.target.value)}
              placeholder="e.g. React"
              required
              className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          {/* Skill ID */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Skill ID (optional)
            </label>
            <input
              type="text"
              value={skillId}
              onChange={(e) => setSkillId(e.target.value)}
              placeholder="MongoDB ObjectId or leave blank"
              className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Progress Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder="Write your progress details here..."
              required
              className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
            />
          </div>

          {/* Completion Percentage */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Completion Percentage: {completionPercent}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={completionPercent}
              onChange={(e) => setCompletionPercent(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Image URL (optional)
            </label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          {/* Video URL */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Video URL (optional)
            </label>
            <input
              type="url"
              value={video}
              onChange={(e) => setVideo(e.target.value)}
              placeholder="https://example.com/video.mp4"
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
              {loading ? "Adding..." : "Add Log"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProgressLogModal;
