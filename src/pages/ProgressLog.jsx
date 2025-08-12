import { useEffect, useState } from "react";
import DashboardNavbar from "../components/DashboardNavbar";
import { Image, Video, CalendarDays, Plus } from "lucide-react";
import AddProgressLogModal from "../pages/AddProgressLogModal"; // Adjust path if needed

const ProgressLog = () => {
  const [logs, setLogs] = useState([
    {
      id: 1,
      date: "2025-06-30",
      skill: "React",
      text: "Built reusable components and integrated Tailwind.\n\n🚀 Also added dark mode toggle!",
      image: "https://via.placeholder.com/300x180",
      completionPercent: 70,
    },
    {
      id: 2,
      date: "2025-06-29",
      skill: "MongoDB",
      text: "Learned about aggregation pipelines and indexes.",
      video: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
      completionPercent: 40,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    document.title = "Progress Log | SkillHub";
  }, []);

  const handleAddLog = (newLog) => {
    setLogs((prev) => [
      ...prev,
      { ...newLog, id: prev.length ? prev[prev.length - 1].id + 1 : 1 },
    ]);
    setIsModalOpen(false);
  };

  return (
    <>
      <section className="w-full min-h-screen px-6 py-24 bg-[#f4f6fa] dark:bg-gray-900 text-gray-900 dark:text-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold flex items-center gap-2">
              <CalendarDays className="text-blue-600" />
              My Skill Logs
            </h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              <Plus className="w-5 h-5" /> Add Progress Log
            </button>
          </div>

          <div className="space-y-10">
            {logs.map((log) => (
              <LogCard key={log.id} log={log} />
            ))}
          </div>
        </div>
      </section>

      <AddProgressLogModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddLog}
      />
    </>
  );
};

const LogCard = ({ log }) => {
  return (
    <div className="p-6 rounded-xl shadow-lg bg-gray-100 dark:bg-gray-800">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-blue-600">{log.skill}</span>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {new Date(log.date).toLocaleDateString()}
        </span>
      </div>

      <div className="whitespace-pre-line text-gray-800 dark:text-white text-base mb-3">
        {log.text}
      </div>

      <div className="mb-2 font-semibold">Completion: {log.completionPercent}%</div>

      {log.image && (
        <div className="mt-3">
          <Image className="mb-1 w-5 h-5 text-gray-500 inline-block" />
          <img
            src={log.image}
            alt="Log Image"
            className="rounded-lg mt-2 w-full max-h-72 object-cover shadow"
          />
        </div>
      )}

      {log.video && (
        <div className="mt-3">
          <Video className="mb-1 w-5 h-5 text-gray-500 inline-block" />
          <video controls className="rounded-lg mt-2 w-full max-h-72 object-cover shadow">
            <source src={log.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
};

export default ProgressLog;
