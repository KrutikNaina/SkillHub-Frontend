// pages/Profile.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { Pencil, Github, Linkedin, Twitter } from "lucide-react";
import DashboardNavbar from "../components/DashboardNavbar";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [counts, setCounts] = useState({ followers: 0, following: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countdown, setCountdown] = useState(5);

  const token = localStorage.getItem("token");

  // ✅ Dynamic backend URL
  const BACKEND_URL =
    import.meta.env.MODE === "development"
      ? "http://localhost:5000"
      : "https://skill-hub-backend-4b6u.vercel.app";

  // Fetch profile, skills, and follower counts
  const fetchProfile = async () => {
    try {
      if (!token) throw new Error("No token found");

      // User profile
      const resProfile = await axios.get(`${BACKEND_URL}/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(resProfile.data);

      // Skills
      const resSkills = await axios.get(`${BACKEND_URL}/api/skills`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSkills(resSkills.data);

      // Followers & Following Counts
      const resCounts = await axios.get(
        `${BACKEND_URL}/api/followers/${resProfile.data._id}/counts`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCounts({
        followers: resCounts.data.followersCount,
        following: resCounts.data.followingCount,
      });
    } catch (err) {
      console.error(err.response || err);
      const errorMessage =
        err.message === "No token found"
          ? "Could not load profile. Please log in again."
          : "Failed to load profile data.";
      setError(errorMessage);

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

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-500 animate-pulse">
        Loading profile...
      </p>
    );

  if (error && error.includes("log in again")) {
    return (
      <>
        <DashboardNavbar />
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 dark:from-gray-800 dark:to-gray-900">
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl p-8 rounded-2xl shadow-xl text-center max-w-md">
            <h2 className="text-2xl font-bold text-red-500 mb-4">⚠️ Error</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-2">{error}</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Redirecting to login in{" "}
              <span className="font-semibold">{countdown}</span> seconds...
            </p>
          </div>
        </section>
      </>
    );
  }

  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <>
      <DashboardNavbar />
      <section className="w-full min-h-screen px-4 -mt-16 py-24 bg-gradient-to-br from-blue-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white">
        <div className="relative max-w-5xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-lg p-10">
          <a
            href="/edit-profile"
            className="absolute top-4 right-4 px-3 py-1.5 bg-blue-600 text-white rounded-full flex items-center gap-1 text-sm hover:bg-blue-700 transition"
          >
            <Pencil className="w-4 h-4" /> Edit
          </a>

          <div className="text-center">
            <img
              src={profile?.avatar || "/default-avatar.png"}
              alt={profile?.displayName || "User Avatar"}
              className="w-28 h-28 rounded-full mx-auto border-4 border-blue-600 shadow-md object-cover"
            />
            <h1 className="text-3xl font-bold mt-4">{profile.displayName}</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {profile.bio || "No bio yet"} 🚀
            </p>
            <div className="flex justify-center gap-5 mt-4">
              {profile.github && (
                <a href={profile.github} target="_blank" rel="noreferrer">
                  <Github className="w-5 h-5 hover:text-blue-500 transition" />
                </a>
              )}
              {profile.linkedin && (
                <a href={profile.linkedin} target="_blank" rel="noreferrer">
                  <Linkedin className="w-5 h-5 hover:text-blue-500 transition" />
                </a>
              )}
              {profile.twitter && (
                <a href={profile.twitter} target="_blank" rel="noreferrer">
                  <Twitter className="w-5 h-5 hover:text-blue-500 transition" />
                </a>
              )}
            </div>
          </div>

          {/* Skills Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-center mb-6">🛠️ My Skills</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {skills.length > 0 ? (
                skills.map((skill) => (
                  <Card
                    key={skill._id}
                    title={skill.title}
                    description={skill.description}
                  />
                ))
              ) : (
                <p className="col-span-full text-center text-gray-500">
                  No skills added yet
                </p>
              )}
            </div>
          </div>

          {/* Followers & Following Count */}
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold mb-6">👥 Followers & Following</h2>
            <div className="flex justify-center gap-10 text-lg">
              <p className="text-gray-700 dark:text-gray-300">
                Followers:{" "}
                <span className="font-semibold text-blue-600">
                  {counts.followers}
                </span>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Following:{" "}
                <span className="font-semibold text-blue-600">
                  {counts.following}
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const Card = ({ title, description }) => (
  <div className="p-6 rounded-2xl bg-gradient-to-br from-white/90 to-gray-100/90 dark:from-gray-900/90 dark:to-gray-800/90 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl hover:-translate-y-1 transition cursor-pointer">
    <h3 className="font-semibold text-xl mb-2 text-blue-600 dark:text-blue-400">
      {title}
    </h3>
    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
      {description || "No description provided"}
    </p>
  </div>
);

export default Profile;
