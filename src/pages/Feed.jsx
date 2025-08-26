import { useState, useEffect } from "react";
import DashboardNavbar from "../components/DashboardNavbar";

const Feed = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null); // 🔹 For popup

  // Fetch all users for feed (excluding logged-in user)
  useEffect(() => {
    const fetchFeed = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found. Please log in again.");
          setLoading(false);
          return;
        }

        const res = await fetch("http://localhost:5000/api/feed", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Failed to fetch feed");
        }

        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, []);

  useEffect(() => {
    document.title = "Feed | SkillHub";
  }, []);

  // 🔹 Card Component
  const UserCard = ({ user }) => {
    return (
      <div
        onClick={() => setSelectedUser(user)} // open popup
        className="cursor-pointer p-6 rounded-2xl shadow-md hover:shadow-xl bg-white dark:bg-gray-800 relative transition flex flex-col items-center text-center"
      >
        {/* Avatar */}
        <img
          src={user.avatar || "https://via.placeholder.com/100"}
          alt={user.displayName}
          className="w-20 h-20 rounded-full object-cover mb-4 border-2 border-blue-500 shadow-md"
        />
        {/* Username */}
        <h3 className="text-lg font-semibold text-blue-600">
          {user.displayName}
        </h3>
        {/* Bio */}
        <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
          {user.bio || "No bio added yet."}
        </p>
      </div>
    );
  };

  // 🔹 Modal Component
  const UserModal = ({ user, onClose }) => {
    if (!user) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg w-96 relative">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>

          {/* Avatar */}
          <img
            src={user.avatar || "https://via.placeholder.com/150"}
            alt={user.displayName}
            className="w-24 h-24 mx-auto rounded-full object-cover mb-4 border-2 border-blue-500 shadow-md"
          />

          {/* Name */}
          <h2 className="text-xl font-bold text-center text-blue-600">
            {user.displayName}
          </h2>

          {/* Bio */}
          <p className="text-center text-gray-600 dark:text-gray-300 mt-2">
            {user.bio || "No bio available."}
          </p>

          {/* Followers / Following */}
          <div className="flex justify-center gap-6 mt-4 text-sm text-gray-500">
            <span>{user.followersCount || 0} Followers</span>
            <span>{user.followingCount || 0} Following</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <DashboardNavbar />
      <section className="w-full min-h-screen px-6 py-20 bg-[#f4f6fa] dark:bg-gray-900 text-gray-900 dark:text-white">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-12">
            <h1 className="text-4xl font-bold text-blue-600">User Feed</h1>
          </div>

          {/* Loader / Error / Empty State */}
          {loading && (
            <p className="text-center text-gray-500">Loading users...</p>
          )}
          {error && <p className="text-center text-red-600">{error}</p>}

          {!loading && !error && users.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No users available in the feed.
              </p>
            </div>
          )}

          {/* Feed Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {users.map((user) => (
              <UserCard key={user._id || user.id} user={user} />
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedUser && (
        <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </>
  );
};

export default Feed;
