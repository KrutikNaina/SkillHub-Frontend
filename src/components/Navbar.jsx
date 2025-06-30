import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom' // ✅ Add this import

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`w-full fixed top-0 z-50 transition-all ${
        scrolled ? 'backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left: Logo */}
        <h1 className="text-2xl font-bold text-blue-600">SkillHub</h1>

        {/* Right: Join Now Button */}
        <Link
          to="/login" // ✅ This now routes to the login page
          className="px-5 py-2 rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition"
        >
          Join Now
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
