import { useState, useEffect } from "react";
import DashboardNavbar from "../components/DashboardNavbar";

const Feed = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch all users for feed (excluding logged-in user)
  useEffect(() => {
    const fetchFeed = async () => {
      try {
        setLoading(true);
        setError(null);

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
        setUsers(data); // ✅ backend must provide isFollowing
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

  // 🔹 Follow User
  const handleFollow = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("Please log in first.");

      const res = await fetch("http://localhost:5000/api/followers/follow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userIdToFollow: userId }), // ✅ match backend
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to follow user");
      }

      setUsers((prev) =>
        prev.map((u) =>
          u._id === userId ? { ...u, isFollowing: true } : u
        )
      );
    } catch (err) {
      alert(err.message);
    }
  };

  // 🔹 Unfollow User
  const handleUnfollow = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("Please log in first.");

      const res = await fetch("http://localhost:5000/api/followers/unfollow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userIdToUnfollow: userId }), // ✅ match backend
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to unfollow user");
      }

      setUsers((prev) =>
        prev.map((u) =>
          u._id === userId ? { ...u, isFollowing: false } : u
        )
      );
    } catch (err) {
      alert(err.message);
    }
  };

  // 🔹 Card Component
  const UserCard = ({ user }) => (
    <div
      onClick={() => setSelectedUser(user)}
      className="cursor-pointer p-6 rounded-2xl shadow-md hover:shadow-xl bg-white dark:bg-gray-800 relative transition flex flex-col items-center text-center"
    >
      <img
        src={user.avatar || "https://via.placeholder.com/100"}
        alt={user.displayName}
        className="w-20 h-20 rounded-full object-cover mb-4 border-2 border-blue-500 shadow-md"
      />

      <h3 className="text-lg font-semibold text-blue-600">
        {user.displayName}
      </h3>

      <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
        {user.bio || "No bio added yet."}
      </p>

      <div className="mt-4">
        {user.isFollowing ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleUnfollow(user._id);
            }}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Unfollow
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleFollow(user._id);
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Follow
          </button>
        )}
      </div>
    </div>
  );

  // 🔹 Modal Component
  const UserModal = ({ user, onClose }) => {
    if (!user) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg w-96 relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>

          <img
            src={user.avatar || "https://via.placeholder.com/150"}
            alt={user.displayName}
            className="w-24 h-24 mx-auto rounded-full object-cover mb-4 border-2 border-blue-500 shadow-md"
          />

          <h2 className="text-xl font-bold text-center text-blue-600">
            {user.displayName}
          </h2>

          <p className="text-center text-gray-600 dark:text-gray-300 mt-2">
            {user.bio || "No bio available."}
          </p>

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
          <div className="flex justify-between items-center mb-12">
            <h1 className="text-4xl font-bold text-blue-600">User Feed</h1>
          </div>

          {loading && (
            <p className="text-center text-gray-500">Loading users...</p>
          )}
          {error && <p className="text-center text-red-600">{error}</p>}

          {!loading && !error && users.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No followers added yet <br />
                Not following anyone yet
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {users.map((user) => (
              <UserCard key={user._id || user.id} user={user} />
            ))}
          </div>
        </div>
      </section>

      {selectedUser && (
        <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </>
  );
};

export default Feed;
