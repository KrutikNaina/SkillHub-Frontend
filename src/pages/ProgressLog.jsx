// ProgressLog.jsx
import { useState, useEffect } from 'react'
import AddProgressLogModal from './AddProgressLogModal'
import { CalendarDays, Trash2, Pencil } from 'lucide-react'
import DashboardNavbar from '../components/DashboardNavbar'

const ProgressLog = ({ token }) => {
  const [logs, setLogs] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingLog, setEditingLog] = useState(null) // ✅ track log being edited
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Fetch progress logs
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        setLoading(true)
        const res = await fetch("http://localhost:5000/api/progresslogs/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Failed to fetch logs");
        }

        const data = await res.json();
        setLogs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false)
      }
    };

    fetchLogs();
  }, []);

  // Add or update log
  const handleSaveLog = (savedLog) => {
    if (editingLog) {
      // update existing log
      setLogs((prev) =>
        prev.map((log) => (log._id === savedLog._id ? savedLog : log))
      )
    } else {
      // new log
      setLogs((prev) => [savedLog, ...prev])
    }
    setEditingLog(null)
    setIsModalOpen(false)
  }

  // Delete log handler
  const handleDeleteLog = async (id) => {
    if (!window.confirm("Are you sure you want to delete this log?")) return;
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const res = await fetch(`http://localhost:5000/api/progresslogs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to delete log");
      }

      setLogs((prev) => prev.filter((log) => log._id !== id));
    } catch (err) {
      alert("Error deleting log: " + err.message);
    }
  };

  useEffect(() => {
    document.title = 'Progress Log | SkillHub'
  }, [])

  const LogCard = ({ log }) => {
    const extractYouTubeID = (url) => {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      return (match && match[2].length === 11) ? match[2] : null;
    };

    return (
      <div className="p-6 rounded-2xl shadow-md hover:shadow-xl bg-white dark:bg-gray-800 relative transition">
        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex gap-3">
          <button
            onClick={() => {
              setEditingLog(log)
              setIsModalOpen(true)
            }}
            className="text-blue-600 hover:text-blue-800"
            title="Edit Log"
          >
            <Pencil size={20} />
          </button>
          <button
            onClick={() => handleDeleteLog(log._id)}
            className="text-red-600 hover:text-red-800"
            title="Delete Log"
          >
            <Trash2 size={20} />
          </button>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-base font-semibold text-blue-600">{log.skillTitle || log.skill}</span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {new Date(log.date).toLocaleDateString()}
          </span>
        </div>

        {/* Notes */}
        <div className="whitespace-pre-line text-gray-700 dark:text-gray-200 text-base mb-3">
          {log.notes || log.text}
        </div>

        {/* Image */}
        {log.image && (
          <div className="mt-3">
            <img
              src={log.image}
              alt="Log"
              className="rounded-lg mt-2 w-full max-h-72 object-cover shadow-md"
            />
          </div>
        )}

        {/* Video */}
        {log.video && log.video.includes('youtube') && (
          <div className="mt-3 aspect-w-16 aspect-h-9">
            <iframe
              className="rounded-lg w-full h-64"
              src={`https://www.youtube.com/embed/${extractYouTubeID(log.video)}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}

        {log.video && !log.video.includes('youtube') && (
          <div className="mt-3">
            <video controls className="rounded-lg mt-2 w-full max-h-72 object-cover shadow-md">
              <source src={log.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <DashboardNavbar/>
      <section className="w-full min-h-screen px-6 py-20 bg-[#f4f6fa] dark:bg-gray-900 text-gray-900 dark:text-white">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-12">
            <h1 className="text-4xl font-bold flex items-center gap-2">
              <CalendarDays className="text-blue-600" />
              My Skill Logs
            </h1>
            <button
              onClick={() => {
                setEditingLog(null)
                setIsModalOpen(true)
              }}
              className="px-5 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
            >
              + Add Log
            </button>
          </div>

          {/* Loader / Error / Empty State */}
          {loading && <p className="text-center text-gray-500">Loading logs...</p>}
          {error && <p className="text-center text-red-600">{error}</p>}

          {!loading && !error && logs.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-600 dark:text-gray-400 text-lg">No progress logs yet.</p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Add Your First Log
              </button>
            </div>
          )}

          {/* Logs List */}
          <div className="space-y-10">
            {logs.map((log) => (
              <LogCard key={log._id || log.id} log={log} />
            ))}
          </div>
        </div>
      </section>

      {/* Modal for Add/Edit */}
      <AddProgressLogModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingLog(null)
        }}
        onAdd={handleSaveLog}
        token={token}
        editingLog={editingLog} // ✅ pass log for edit mode
      />
    </>
  )
}

export default ProgressLog
