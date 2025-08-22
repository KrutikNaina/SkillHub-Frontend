import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const DashboardNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [token, setToken] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const isActive = (path) =>
    location.pathname === path
      ? "text-blue-600 font-semibold"
      : "text-gray-700 dark:text-gray-300 hover:text-blue-600";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="w-full px-6 py-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-blue-600">SkillHub</h1>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          {token && (
            <>
              <Link to="/dashboard" className={isActive("/dashboard")}>
                Dashboard
              </Link>
              <Link to="/profile" className={isActive("/profile")}>
                Profile
              </Link>
              <Link to="/progress-log" className={isActive("/progress-log")}>
                Progress Log
              </Link>
              <Link
                to="/skill-repository"
                className={isActive("/skill-repository")}
              >
                Repository
              </Link>
              <Link to="/milestones" className={isActive("/milestones")}>
                Milestones
              </Link>
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

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && token && (
        <div className="md:hidden mt-4 flex flex-col gap-4 text-sm bg-white dark:bg-gray-900 rounded-lg p-4 shadow-md">
          <Link
            to="/dashboard"
            className={isActive("/dashboard")}
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="/profile"
            className={isActive("/profile")}
            onClick={() => setMenuOpen(false)}
          >
            Profile
          </Link>
          <Link
            to="/progress-log"
            className={isActive("/progress-log")}
            onClick={() => setMenuOpen(false)}
          >
            Progress Log
          </Link>
          <Link
            to="/skill-repository"
            className={isActive("/skill-repository")}
            onClick={() => setMenuOpen(false)}
          >
            Repository
          </Link>
          <Link
            to="/milestones"
            className={isActive("/milestones")}
            onClick={() => setMenuOpen(false)}
          >
            Milestones
          </Link>
          <button
            onClick={() => {
              handleLogout();
              setMenuOpen(false);
            }}
            className="text-red-500 hover:text-red-700 text-left"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default DashboardNavbar;
