// src/pages/Dashboard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { LayoutDashboard, BookOpen, ListTodo, User, Flame, Trophy } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-purple-100 to-pink-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-xl rounded-r-3xl p-6 hidden md:block">
        <h2 className="text-2xl font-bold text-purple-700 mb-10">SkillHub</h2>
        <nav className="flex flex-col gap-6 text-gray-700">
          <Link to="/dashboard" className="flex items-center gap-3 hover:text-purple-600">
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
          <Link to="/skill-repository" className="flex items-center gap-3 hover:text-purple-600">
            <BookOpen className="w-5 h-5" />
            Skills
          </Link>
          <Link to="/logs" className="flex items-center gap-3 hover:text-purple-600">
            <ListTodo className="w-5 h-5" />
            Progress Logs
          </Link>
          <Link to="/profile" className="flex items-center gap-3 hover:text-purple-600">
            <User className="w-5 h-5" />
            Profile
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-purple-800">Welcome back, Krutik! 👋</h1>
            <p className="text-sm text-gray-600 mt-1">Here’s your skill-building dashboard.</p>
          </div>
          <img
            src="https://api.dicebear.com/7.x/identicon/svg?seed=krutik"
            alt="avatar"
            className="w-10 h-10 rounded-full border-2 border-purple-400 shadow-sm"
          />
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card title="Skills Added" value="12" color="from-purple-400 to-purple-600" />
          <Card title="Milestones Achieved" value="5" color="from-pink-400 to-pink-600" />
          <Card title="Progress Logs" value="21" color="from-blue-400 to-blue-600" />
        </div>

        {/* 🔥 Streak Tracker */}
        <div className="mt-10 bg-white p-6 rounded-2xl shadow-md flex items-center gap-4">
          <div className="text-5xl text-orange-500">🔥</div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Current Streak</h3>
            <p className="text-2xl font-bold text-purple-600">7 Days</p>
            <p className="text-sm text-gray-500">Keep the fire alive! Log daily progress to maintain your streak.</p>
          </div>
        </div>

        {/* 🏆 Achievements Grid */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4 text-purple-700 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" /> Unlocked Achievements
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {achievements.map((achieve) => (
              <div
                key={achieve.title}
                className="bg-gradient-to-br from-white to-purple-50 p-4 rounded-xl shadow hover:shadow-lg transition-all"
              >
                <div className="text-3xl">{achieve.icon}</div>
                <h4 className="mt-2 font-semibold text-gray-800">{achieve.title}</h4>
                <p className="text-sm text-gray-500">{achieve.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Logs */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4 text-purple-700">Recent Logs</h2>
          <ul className="bg-white rounded-xl p-6 shadow-md space-y-4">
            <li className="border-b pb-2">✔️ Learned React Props – 2 days ago</li>
            <li className="border-b pb-2">✔️ Logged a new JavaScript project – 4 days ago</li>
            <li>✔️ Achieved ‘Git Basics’ milestone – 6 days ago</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

const Card = ({ title, value, color }) => (
  <div
    className={`bg-gradient-to-r ${color} text-white p-6 rounded-2xl shadow-md transform hover:scale-105 transition-transform duration-300`}
  >
    <h3 className="text-xl font-semibold">{title}</h3>
    <p className="text-3xl font-bold mt-2">{value}</p>
  </div>
);

// 🏆 Sample Achievements
const achievements = [
  {
    title: "Skill Initiator",
    icon: "🎯",
    description: "Added your first skill to the repository",
  },
  {
    title: "Daily Logger",
    icon: "📅",
    description: "Logged progress 5 days in a row",
  },
  {
    title: "Milestone Maker",
    icon: "🥇",
    description: "Completed your first learning milestone",
  },
];

export default Dashboard;
