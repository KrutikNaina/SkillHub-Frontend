import { useState, useEffect } from "react";
import AddProgressLogModal from "./AddProgressLogModal";
import EditProgressLogModal from "./EditProgressLogModel"; // ✅ new import
import { CalendarDays, Trash2, Pencil } from "lucide-react";
import DashboardNavbar from "../components/DashboardNavbar";

const ProgressLog = ({ token }) => {
  const [logs, setLogs] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingLog, setEditingLog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch progress logs
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        setLoading(true);
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
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  // Add log
  const handleAddLog = (savedLog) => {
    setLogs((prev) => [savedLog, ...prev]);
    setIsAddModalOpen(false);
  };

  // Update log
  const handleUpdateLog = (updatedLog) => {
    setLogs((prev) =>
      prev.map((log) => (log._id === updatedLog._id ? updatedLog : log))
    );
    setEditingLog(null);
    setIsEditModalOpen(false);
  };

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
    document.title = "Progress Log | SkillHub";
  }, []);

  const LogCard = ({ log }) => {
    const extractYouTubeID = (url) => {
      const regExp =
        /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      return match && match[2].length === 11 ? match[2] : null;
    };

    return (
      <div className="p-6 rounded-2xl shadow-md hover:shadow-xl bg-white dark:bg-gray-800 relative transition">
        {/* Date + Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col items-end gap-2">
          {/* Date shown above buttons */}
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {new Date(log.date).toLocaleDateString()}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setEditingLog(log);
                setIsEditModalOpen(true); // ✅ open edit modal
              }}
              className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white shadow-md transition transform hover:scale-110"
              title="Edit Log"
            >
              <Pencil size={18} />
            </button>
            <button
              onClick={() => handleDeleteLog(log._id)}
              className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-600 hover:text-white shadow-md transition transform hover:scale-110"
              title="Delete Log"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        {/* Header */}
        <div className="mb-2">
          <span className="text-base font-semibold text-blue-600">
            {log.skillTitle || log.skill}
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
        {log.video && log.video.includes("youtube") && (
          <div className="mt-3 aspect-w-16 aspect-h-9">
            <iframe
              className="rounded-lg w-full h-64"
              src={`https://www.youtube.com/embed/${extractYouTubeID(
                log.video
              )}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}

        {log.video && !log.video.includes("youtube") && (
          <div className="mt-3">
            <video
              controls
              className="rounded-lg mt-2 w-full max-h-72 object-cover shadow-md"
            >
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
      <DashboardNavbar />
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
                setIsAddModalOpen(true);
              }}
              className="px-5 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
            >
              + Add Log
            </button>
          </div>

          {/* Loader / Error / Empty State */}
          {loading && (
            <p className="text-center text-gray-500">Loading logs...</p>
          )}
          {error && <p className="text-center text-red-600">{error}</p>}

          {!loading && !error && logs.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No progress logs yet.
              </p>
              <button
                onClick={() => setIsAddModalOpen(true)}
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

      {/* Modal for Add */}
      <AddProgressLogModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddLog}
        token={token}
      />

      <EditProgressLogModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingLog(null);
        }}
        onUpdate={handleUpdateLog} // ✅ was onLogUpdated
        token={token}
        editingLog={editingLog}
      />
    </>
  );
};

export default ProgressLog;
