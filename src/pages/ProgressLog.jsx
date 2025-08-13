import { useState, useEffect } from 'react'
import AddProgressLogModal from './AddProgressLogModal' // adjust path as needed
import { CalendarDays } from 'lucide-react'

const ProgressLog = ({ token }) => {
  const [logs, setLogs] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Fetch progress logs from backend API
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

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
      }
    };

    fetchLogs();
  }, []);


  // Add new log to state when modal form submits
  const handleAddLog = (newLog) => {
    // Add the new log at the top of the logs list
    setLogs((prev) => [newLog, ...prev])
    setIsModalOpen(false)
  }
  

  useEffect(() => {
    document.title = 'Progress Log | SkillHub'
  }, [])

  const LogCard = ({ log }) => {
    // helper function here or outside component
    const extractYouTubeID = (url) => {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      return (match && match[2].length === 11) ? match[2] : null;
    };
  
    return (
      <div className="p-6 rounded-xl shadow-lg bg-gray-100 dark:bg-gray-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-blue-600">{log.skillTitle || log.skill}</span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {new Date(log.date).toLocaleDateString()}
          </span>
        </div>
  
        <div className="whitespace-pre-line text-gray-800 dark:text-white text-base mb-3">
          {log.notes || log.text}
        </div>
  
        {log.image && (
          <div className="mt-3">
            <img
              src={log.image}
              alt="Log Image"
              className="rounded-lg mt-2 w-full max-h-72 object-cover shadow"
            />
          </div>
        )}
  
        {/* Video - YouTube or MP4 */}
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
            <video controls className="rounded-lg mt-2 w-full max-h-72 object-cover shadow">
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
      <section className="w-full min-h-screen px-6 py-24 bg-[#f4f6fa] dark:bg-gray-900 text-gray-900 dark:text-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold flex items-center gap-2">
              <CalendarDays className="text-blue-600" />
              My Skill Logs
            </h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Add Progress Log
            </button>
          </div>

          {loading && <p>Loading logs...</p>}
          {error && <p className="text-red-600">{error}</p>}

          {!loading && !error && logs.length === 0 && (
            <p>No progress logs found.</p>
          )}

          <div className="space-y-10">
            {logs.map((log) => (
              <LogCard key={log._id || log.id} log={log} />
            ))}
          </div>
        </div>
      </section>

      <AddProgressLogModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddLog}
        token={token} // pass token so modal can use it to POST
      />
    </>
  )
}

const LogCard = ({ log }) => {
  return (
    <div className="p-6 rounded-xl shadow-lg bg-gray-100 dark:bg-gray-800">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-blue-600">{log.skillTitle || log.skill}</span>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {new Date(log.date).toLocaleDateString()}
        </span>
      </div>

      <div className="whitespace-pre-line text-gray-800 dark:text-white text-base mb-3">
        {log.notes || log.text}
      </div>

      {log.image && (
        <div className="mt-3">
          <img
            src={log.image}
            alt="Log Image"
            className="rounded-lg mt-2 w-full max-h-72 object-cover shadow"
          />
        </div>
      )}


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


    </div>
  )
}


export default ProgressLog
