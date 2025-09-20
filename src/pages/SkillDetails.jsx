// pages/SkillDetails.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import DashboardNavbar from "../components/DashboardNavbar";

// ✅ Dynamic backend URL
const BACKEND_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : "https://skillhub-backend.vercel.app";

const SkillDetails = () => {
  const { id } = useParams();
  const [skill, setSkill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countdown, setCountdown] = useState(5); // countdown state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const res = await axios.get(`${BACKEND_URL}/api/skills/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSkill(res.data);
      } catch (err) {
        const errorMessage =
          err.message === "No token found"
            ? "Could not load profile. Please log in again."
            : "Failed to load skill details.";
        setError(errorMessage);

        // Start countdown if auth error
        if (err.message === "No token found") {
          let timer = setInterval(() => {
            setCountdown((prev) => {
              if (prev === 1) {
                clearInterval(timer);
                navigate("/login");
              }
              return prev - 1;
            });
          }, 1000);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSkill();
  }, [id, navigate]);

  if (loading) return <p className="p-6">Loading...</p>;

  // 🔴 Error Screen with Countdown
  if (error && error.includes("log in again")) {
    return (
      <>
        <DashboardNavbar />
        <section className="min-h-screen flex items-center justify-center bg-[#f4f6fa] dark:bg-gray-900">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg text-center max-w-md">
            <h2 className="text-2xl font-bold text-red-500 mb-4">⚠️ Error</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-2">{error}</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Redirecting to login in <span className="font-semibold">{countdown}</span> seconds...
            </p>
            <div className="mt-6">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${(countdown / 5) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!skill) return <p className="p-6">Skill not found.</p>;

  // ✅ Progress Calculation
  const calculateProgress = () => {
    const startDate = new Date(skill.startDate);
    const currentDate = new Date();

    // Extract number of days from targetGoal (e.g., "2 days")
    const targetDaysMatch = skill.targetGoal.match(/(\d+)\s*day(s)?/i);
    const targetDays = targetDaysMatch ? parseInt(targetDaysMatch[1], 10) : 2;

    const elapsedMilliseconds = currentDate - startDate;
    const elapsedDays = elapsedMilliseconds / (1000 * 60 * 60 * 24);

    let progressPercent = (elapsedDays / targetDays) * 100;
    progressPercent = Math.min(Math.max(progressPercent, 0), 100);

    let level = "Beginner";
    let emoji = "🌱";
    if (progressPercent >= 100) {
      level = "Expert";
      emoji = "🏆";
    } else if (progressPercent >= 75) {
      level = "Advanced";
      emoji = "🚀";
    } else if (progressPercent >= 50) {
      level = "Intermediate";
      emoji = "🔥";
    }

    return { percent: progressPercent, level, emoji };
  };

  const { percent, level, emoji } = calculateProgress();

  return (
    <>
      <DashboardNavbar />
      <section className="min-h-screen px-6 py-24 bg-[#f4f6fa] dark:bg-gray-900 text-gray-900 dark:text-white">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg"
        >
          ⬅ Back
        </button>

        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow rounded-xl overflow-hidden">
          {skill.coverImage && (
            <img
              src={skill.coverImage}
              alt={skill.title}
              className="w-full h-64 object-cover"
            />
          )}
          <div className="p-6">
            <h1 className="text-3xl font-bold">{skill.title}</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              {skill.description}
            </p>

            <div className="mt-4 text-gray-700 dark:text-gray-400 space-y-2">
              <p>
                <strong>🎯 Target Goal:</strong> {skill.targetGoal}
              </p>
              <p>
                <strong>📅 Start Date:</strong>{" "}
                {new Date(skill.startDate).toLocaleDateString()}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mt-6">
              <p className="mb-2 font-semibold">
                Progress: {level} {emoji}
              </p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                <div
                  className="bg-blue-500 h-4 rounded-full transition-all"
                  style={{ width: `${percent}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SkillDetails;
