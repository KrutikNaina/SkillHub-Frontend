import { useState, useEffect } from "react";

const AddProgressLogModal = ({ isOpen, onClose, onAdd }) => {
  const [date, setDate] = useState("");
  const [skill, setSkill] = useState("");
  const [notes, setNotes] = useState("");
  const [completionPercent, setCompletionPercent] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setDate(new Date().toISOString().slice(0, 10)); // default today
      setSkill("");
      setNotes("");
      setCompletionPercent(0);
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ date, skill, notes, completionPercent });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Add Progress Log
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Skill Name
            </label>
            <input
              type="text"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              placeholder="e.g. React"
              required
              className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

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

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-600 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Add Log
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProgressLogModal;
