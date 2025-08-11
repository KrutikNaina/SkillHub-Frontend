// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token being sent:", token); // Debug

    axios.get("http://localhost:5000/api/users/me", {
      headers: {
        Authorization: `Bearer ${token}`, // Must match "Bearer <token>"
      },
    })
      .then((res) => setProfile(res.data))
      .catch((err) => console.error("Error fetching profile:", err));
  }, []);


  if (error) return <p className="text-red-500">{error}</p>;

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={profile.avatar || "/default-avatar.png"}
          alt={profile.name || "User Avatar"}
          className="w-20 h-20 rounded-full object-cover"
        />

        <div>
          <h2 className="text-xl font-bold">{profile.name}</h2>
          <p className="text-gray-600">{profile.email}</p>
        </div>
      </div>

      <div className="space-y-2">
        <p><strong>Bio:</strong> {profile.bio || "Not provided"}</p>
        <p><strong>GitHub:</strong> {profile.github || "Not provided"}</p>
        <p><strong>LinkedIn:</strong> {profile.linkedin || "Not provided"}</p>
        <p><strong>Twitter:</strong> {profile.twitter || "Not provided"}</p>
        <p><strong>Website:</strong> {profile.website || "Not provided"}</p>
      </div>
    </div>
  );
};

export default Profile;
