import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const DashboardNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
    console.log('Token:', storedToken); // ✅ Log token to console
  }, []);

  const isActive = (path) =>
    location.pathname === path
      ? 'text-blue-600 font-semibold'
      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="w-full px-6 py-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold text-blue-600">SkillHub</h1>
        <div className="flex items-center gap-6 text-sm">
          {token && (
            <>
              {/* Show only if token exists */}
              <Link to="/dashboard" className={isActive('/dashboard')}>Dashboard</Link>
              <Link to="/profile" className={isActive('/profile')}>Profile</Link>
              <Link to="/logs" className={isActive('/logs')}>Progress Log</Link>
              <Link to="/skill-repository" className={isActive('/skill-repository')}>Repository</Link>
              <Link to="/milestones" className={isActive('/milestones')}>Milestones</Link>
            </>
          )}
          {token && (
            <button
              onClick={handleLogout}
              className="text-red-500 hover:text-red-700"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
