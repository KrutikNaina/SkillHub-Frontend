// src/pages/AddMilestone.jsx
import React, { useState } from "react";

const AddMilestone = () => {
  const [formData, setFormData] = useState({
    type: "",
    badge: "",
    achievedOn: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/milestones", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // if using auth
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Milestone added successfully 🚀");
        setFormData({ type: "", badge: "", achievedOn: "" });
      } else {
        alert("Error while adding milestone ❌");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          🎯 Add Milestone
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Type */}
          <div>
            <label className="block text-gray-600 font-medium mb-2">
              Milestone Type
            </label>
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              placeholder="e.g., 7-day streak"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Badge */}
          <div>
            <label className="block text-gray-600 font-medium mb-2">
              Badge Name
            </label>
            <input
              type="text"
              name="badge"
              value={formData.badge}
              onChange={handleChange}
              placeholder="e.g., Consistency King"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-gray-600 font-medium mb-2">
              Achieved On
            </label>
            <input
              type="date"
              name="achievedOn"
              value={formData.achievedOn}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Add Milestone
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMilestone;
