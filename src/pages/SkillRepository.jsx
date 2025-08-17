// pages/SkillRepository.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddSkillModal from "./AddSkillModal";
import EditSkillModal from "./EditSkillModel"; // Fixed typo in import
import { Plus } from "lucide-react";
import axios from "axios";
import DashboardNavbar from "../components/DashboardNavbar";

const SkillRepository = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countdown, setCountdown] = useState(3);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const res = await axios.get("http://localhost:5000/api/skills", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setSkills(res.data || []);
      } catch (err) {
        setError("Failed to load skills.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  // Countdown & redirect if error
  useEffect(() => {
    if (error) {
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            navigate("/login"); // redirect to login
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [error, navigate]);

  const addStaticSkill = (newSkill) => {
    setSkills((prev) => [...prev, newSkill]);
  };

  const deleteSkill = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      await axios.delete(`http://localhost:5000/api/skills/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSkills((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      setError("Failed to delete skill.");
      console.error(err);
    }
  };

  const updateSkill = async (id, updatedData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const res = await axios.put(
        `http://localhost:5000/api/skills/${id}`,
        updatedData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSkills((prev) =>
        prev.map((s) => (s._id === id ? res.data.skill : s))
      );
    } catch (err) {
      setError("Failed to update skill.");
      console.error(err);
    }
  };

  // 🔹 If error, only show error block (hide everything else)
  if (error) {
    return (
      <>
        <DashboardNavbar />
        <section className="min-h-screen flex items-center justify-center bg-[#f4f6fa] dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold">⚠️ {error}</h2>
            <p className="mt-2 text-sm">
              Redirecting to login in{" "}
              <span className="font-semibold">{countdown}</span> seconds...
            </p>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <DashboardNavbar />
      <section className="min-h-screen px-6 py-24 bg-[#f4f6fa] dark:bg-gray-900 text-gray-900 dark:text-white">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Skill Repositories</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            <Plus className="w-4 h-4" /> Add New
          </button>
        </div>

        {loading ? (
          <p className="text-gray-600 dark:text-gray-400">Loading skills...</p>
        ) : skills.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">No skills found.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill) => (
              <div
                key={skill._id}
                onClick={() => navigate(`/skills/${skill._id}`)}
                className="cursor-pointer rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 shadow hover:shadow-lg transition"
              >
                {skill.coverImage && (
                  <div className="w-full aspect-[16/9] overflow-hidden">
                    <img
                      src={skill.coverImage}
                      alt={skill.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="p-4">
                  <h3 className="text-xl font-semibold">{skill.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {skill.description}
                  </p>
                  <div className="text-xs mt-3 text-gray-600 dark:text-gray-400">
                    🎯 {skill.targetGoal} • 📅{" "}
                    {new Date(skill.startDate).toLocaleDateString()}
                  </div>

                  <div
                    className="flex gap-2 mt-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => deleteSkill(skill._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => {
                        setSelectedSkill(skill);
                        setEditModalOpen(true);
                      }}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg text-sm"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modals */}
        <AddSkillModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          addStaticSkill={addStaticSkill}
        />

        <EditSkillModal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          skill={selectedSkill}
          updateSkill={updateSkill}
        />
      </section>
    </>
  );
};

export default SkillRepository;
