// src/pages/Milestones.jsx
import { useEffect, useState } from "react";
import DashboardNavbar from "../components/DashboardNavbar";
import { Trophy, Calendar, Flame, PlusCircle } from "lucide-react";
import axios from "axios";

const Milestones = () => {
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    type: "",
    badge: "",
    achievedOn: new Date().toISOString().slice(0, 10),
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "Milestones & Streaks | SkillHub";
    fetchMilestones();
  }, []);

  const fetchMilestones = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/milestones/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Extract the milestones array from response
      setMilestones(res.data.milestones || []);
    } catch (err) {
      console.error("Error fetching milestones:", err);
    } finally {
      setLoading(false);
    }
  };
  

  const handleAddMilestone = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/milestones/create",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFormData({
        type: "",
        badge: "",
        achievedOn: new Date().toISOString().slice(0, 10),
      });
      setShowForm(false);
      fetchMilestones();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add milestone");
      console.error(err);
    }
  };

  if (loading) return <p className="text-center mt-20">Loading milestones...</p>;

  const streakMilestone = milestones.find((m) => m.type?.includes("streak"));
  const skillMilestone = milestones.find((m) => m.type?.includes("completed"));
  const badges = milestones.filter((m) => m.badge);

  return (
    <>
      <DashboardNavbar />
      <section className="w-full min-h-screen px-6 py-24 bg-[#f4f6fa] dark:bg-gray-900 text-gray-900 dark:text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold">🏁 Your Milestones & Streaks</h1>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
            >
              <PlusCircle size={20} /> Add Milestone
            </button>
          </div>

          {/* Add Milestone Modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-md max-h-[80vh] overflow-y-auto p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  🎯 Add Milestone
                </h2>

                {error && (
                  <p className="mb-4 text-red-600 dark:text-red-400 font-medium">{error}</p>
                )}

                <form onSubmit={handleAddMilestone} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                      Milestone Type
                    </label>
                    <input
                      type="text"
                      name="type"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      placeholder="e.g., 7-day streak"
                      required
                      className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                      Badge Name
                    </label>
                    <input
                      type="text"
                      name="badge"
                      value={formData.badge}
                      onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                      placeholder="e.g., Consistency King"
                      className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                      Achieved On
                    </label>
                    <input
                      type="date"
                      name="achievedOn"
                      value={formData.achievedOn}
                      onChange={(e) =>
                        setFormData({ ...formData, achievedOn: e.target.value })
                      }
                      className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div className="flex justify-end gap-4 mt-6">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-4 py-2 rounded-md bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-600 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                    >
                      Add Milestone
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Streak Tracker */}
          {streakMilestone ? (
            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 mb-10 shadow">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Flame className="text-orange-500" /> Current Streak
              </h2>
              <p className="text-lg">
                🔥 {streakMilestone.type} unlocked on{" "}
                {new Date(streakMilestone.achievedOn).toDateString()}
              </p>
            </div>
          ) : (
            <p className="mb-6">No streak milestones yet. Keep learning!</p>
          )}

          {/* Skill Progress */}
          {skillMilestone ? (
            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 mb-10 shadow">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Calendar className="text-blue-600" /> Skill Progress
              </h2>
              <p className="text-lg">📘 {skillMilestone.type}</p>
              <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
                Achieved on: {new Date(skillMilestone.achievedOn).toDateString()}
              </p>
            </div>
          ) : (
            <p className="mb-6">No skill milestones yet.</p>
          )}

          {/* Badges Earned */}
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 shadow">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Trophy className="text-yellow-500" /> Your Badges
            </h2>
            {badges.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {badges.map((badge, idx) => (
                  <Badge key={idx} title={badge.badge} desc={badge.type} color="orange" />
                ))}
              </div>
            ) : (
              <p>No badges earned yet. Keep pushing!</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

const Badge = ({ title, desc, color }) => {
  const colors = {
    orange: "bg-orange-100 text-orange-700",
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    purple: "bg-purple-100 text-purple-700",
  };

  return (
    <div className={`p-4 rounded-xl shadow-md ${colors[color]} dark:bg-opacity-10`}>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm">{desc}</p>
    </div>
  );
};

export default Milestones;
