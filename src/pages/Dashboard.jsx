import { Link } from 'react-router-dom';
import { FaUserEdit, FaTasks, FaChartLine, FaBook, FaPlus, FaSignOutAlt } from 'react-icons/fa';
import { useEffect, useState } from 'react';

// Dummy user context (replace with actual Google auth user)
const mockUser = {
  displayName: "Krutik Naina"
};

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Replace this with your actual auth logic
    setUser(mockUser); 
  }, []);

  const handleLogout = () => {
    // TODO: implement logout logic
    console.log("Logged out");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f6fa]">
      
      {/* Header */}
      <header className="bg-white shadow px-6 py-4 flex justify-between items-center rounded-b-2xl">
        <h1 className="text-2xl font-bold text-blue-700">SkillHub</h1>
        <div className="flex items-center gap-4">
          <span className="text-blue-600 font-medium">
            Welcome, {user?.displayName || "User"} 👋
          </span>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-1 px-3 py-1.5 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition text-sm"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow px-6 py-4">
        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
            <p className="text-gray-500">Total Skills</p>
            <h3 className="text-2xl font-semibold text-blue-600">12</h3>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
            <p className="text-gray-500">Milestones Completed</p>
            <h3 className="text-2xl font-semibold text-blue-600">4</h3>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
            <p className="text-gray-500">Days Active</p>
            <h3 className="text-2xl font-semibold text-blue-600">26</h3>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Link to="/edit-profile" className="flex flex-col items-center bg-white p-5 rounded-2xl shadow hover:bg-blue-50 transition">
            <FaUserEdit size={28} className="text-blue-600 mb-2" />
            <span className="text-sm font-semibold">Edit Profile</span>
          </Link>
          <Link to="/logs" className="flex flex-col items-center bg-white p-5 rounded-2xl shadow hover:bg-blue-50 transition">
            <FaTasks size={28} className="text-blue-600 mb-2" />
            <span className="text-sm font-semibold">Progress Log</span>
          </Link>
          <Link to="/milestones" className="flex flex-col items-center bg-white p-5 rounded-2xl shadow hover:bg-blue-50 transition">
            <FaChartLine size={28} className="text-blue-600 mb-2" />
            <span className="text-sm font-semibold">Milestones</span>
          </Link>
          <Link to="/skill-repository" className="flex flex-col items-center bg-white p-5 rounded-2xl shadow hover:bg-blue-50 transition">
            <FaBook size={28} className="text-blue-600 mb-2" />
            <span className="text-sm font-semibold">Skills</span>
          </Link>
        </div>

        {/* Add Skill CTA */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-2xl flex items-center justify-between shadow-lg">
          <div>
            <h3 className="text-xl font-semibold">Add New Skill</h3>
            <p className="text-sm text-blue-100">Keep growing by tracking your new skill today!</p>
          </div>
          <Link to="/add-skillModal" className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-xl hover:bg-blue-100 transition flex items-center gap-2">
            <FaPlus /> Add Skill
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white text-center text-sm py-3 shadow-inner mt-4">
        © {new Date().getFullYear()} SkillHub. Built with ❤️ by Krutik Naina.
      </footer>
    </div>
  );
};

export default Dashboard;
