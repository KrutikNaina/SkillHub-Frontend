// pages/Profile.jsx
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Github, Linkedin, Twitter, Pencil } from 'lucide-react'
import DashboardNavbar from '../components/DashboardNavbar'
import { useNavigate } from 'react-router-dom'

const tabs = [
  { key: 'projects', label: '📁 My Projects' },
  { key: 'starred', label: '⭐ Starred' },
  { key: 'followers', label: '👥 Followers' }
]

const Profile = () => {
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState('starred')  
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [countdown, setCountdown] = useState(5)
  const [starredSkills, setStarredSkills] = useState([])
  const [followers, setFollowers] = useState([]) 

  // ✅ Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) throw new Error("No token found")

        const res = await axios.get('http://localhost:5000/api/users/me', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setProfile(res.data)
      } catch (err) {
        const errorMessage =
          err.message === "No token found"
            ? "Could not load profile. Please log in again."
            : "Failed to load profile data."
        setError(errorMessage)

        // Start countdown if auth error
        if (err.message === "No token found") {
          let timer = setInterval(() => {
            setCountdown(prev => {
              if (prev === 1) {
                clearInterval(timer)
                navigate("/login")
              }
              return prev - 1
            })
          }, 1000)
        }
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [navigate])

  // ✅ Loading state
  if (loading) return (
    <p className="text-center mt-10 text-gray-500 animate-pulse">
      Loading profile...
    </p>
  )

  // 🔴 Error Screen with Countdown
  if (error && error.includes("log in again")) {
    return (
      <>
        <DashboardNavbar />
        <section className="min-h-screen flex items-center justify-center bg-[#f4f6fa] dark:bg-gray-900">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg text-center max-w-md">
            <h2 className="text-2xl font-bold text-red-500 mb-4">⚠️ Error</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-2">{error}</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Redirecting to login in <span className="font-semibold">{countdown}</span> seconds...
            </p>
            <div className="mt-6">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${(countdown / 5) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  }

  // Generic error (non-auth)
  if (error) return (
    <p className="p-6 text-red-500">{error}</p>
  )

  return (
    <>
      <DashboardNavbar />
      <section className="w-full min-h-screen px-4 -mt-16 py-24 bg-[#f4f6fa] dark:bg-gray-900 text-gray-900 dark:text-white">
        <div className="relative max-w-4xl mx-auto bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-lg p-10">

          {/* Edit button */}
          <a href="/edit-profile" className="absolute top-4 right-4 px-3 py-1.5 bg-blue-600 text-white rounded-full flex items-center gap-1 text-sm hover:bg-blue-700 transition">
            <Pencil className="w-4 h-4" /> Edit
          </a>

          {/* Avatar & Info */}
          <div className="text-center">
            <img src={profile.avatar || '/default-avatar.png'} alt={profile.name || 'User Avatar'} className="w-28 h-28 rounded-full mx-auto border-4 border-blue-600 shadow-md object-cover" />
            <h1 className="text-3xl font-bold mt-4">{profile.displayName}</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">{profile.bio || 'No bio yet'} 🚀</p>

            {/* Social links */}
            <div className="flex justify-center gap-5 mt-4">
              {profile.github && <a href={profile.github} target="_blank" rel="noreferrer"><Github className="w-5 h-5 hover:text-blue-500 transition" /></a>}
              {profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin className="w-5 h-5 hover:text-blue-500 transition" /></a>}
              {profile.twitter && <a href={profile.twitter} target="_blank" rel="noreferrer"><Twitter className="w-5 h-5 hover:text-blue-500 transition" /></a>}
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === tab.key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 hover:bg-blue-600 hover:text-white'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activeTab === 'projects' && (
              <>
                <Card title="Portfolio Website" desc="Built with React & Tailwind" />
                <Card title="SkillHub" desc="Skill showcase platform (WIP)" />
              </>
            )}

            {activeTab === 'starred' && (
              starredSkills.length > 0
                ? starredSkills.map((skill) => (
                  <Card key={skill._id} title={skill.title} desc={skill.description} />
                ))
                : <p className="col-span-full text-center text-gray-500">No starred skills yet</p>
            )}

            {activeTab === 'followers' && (
              followers.length > 0
                ? followers.map((f) => (
                  <Card
                    key={f._id}
                    title={f.followerId?.displayName || f.followerId?.name || 'Unknown User'}
                    desc={f.followerId?.bio || 'No bio available'}
                  />
                ))
                : <p className="col-span-full text-center text-gray-500">No followers yet</p>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

// Card component
const Card = ({ title, desc }) => (
  <div className="p-5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow hover:shadow-md transition">
    <h3 className="font-semibold text-lg">{title}</h3>
    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{desc}</p>
  </div>
)

export default Profile
