import { useEffect, useState } from "react";
import AddSkillModal from "./AddSkillModal";
import EditSkillModal from "./EditSkillModel";
import { Plus } from "lucide-react";
import axios from "axios";
import DashboardNavbar from "../components/DashboardNavbar";

const SkillRepository = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Add modal
  const [editModalOpen, setEditModalOpen] = useState(false); // Edit modal
  const [selectedSkill, setSelectedSkill] = useState(null); // Skill being edited
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 📌 Fetch skills from backend on mount
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

  // 📌 Add skill
  const addSkill = async (skillData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const res = await axios.post(
        "http://localhost:5000/api/skills/add",
        skillData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSkills((prev) => [...prev, res.data.skill]);
    } catch (err) {
      setError("Failed to add skill.");
      console.error(err);
    }
  };

  // 📌 Delete skill
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

  // 📌 Update skill
  const updateSkill = async (id, updatedData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const res = await axios.put(
        `http://localhost:5000/api/skills/${id}`,
        updatedData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSkills((prev) => prev.map((s) => (s._id === id ? res.data.skill : s)));
    } catch (err) {
      setError("Failed to update skill.");
      console.error(err);
    }
  };

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
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : skills.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">No skills found.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill) => (
              <div
                key={skill._id}
                className="rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 shadow hover:shadow-lg transition"
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

                  <div className="flex gap-2 mt-3">
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

        {/* Add Modal */}
        <AddSkillModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          addSkill={addSkill}
        />

        {/* Edit Modal */}
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
