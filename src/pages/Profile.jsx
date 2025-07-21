import { useEffect, useState } from 'react'
import { Github, Linkedin, Twitter, Pencil } from 'lucide-react'
import DashboardNavbar from '../components/DashboardNavbar'
import axios from 'axios'

const tabs = [
  { key: 'projects', label: '📁 My Projects' },
  { key: 'starred', label: '⭐ Starred' },
  { key: 'followers', label: '👥 Followers' }
]

const Profile = () => {
  const [activeTab, setActiveTab] = useState('projects')
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = localStorage.getItem('userId') || '64fe1b8c49d98d7237c305e6'
        const res = await axios.get(`http://localhost:5000/api/profile/${userId}`)
        setProfile(res.data)
      } catch (err) {
        console.error('❌ Error fetching profile:', err)
      }
    }

    fetchProfile()
  }, [])

  if (!profile) return <div className="text-center mt-24">Loading profile...</div>

  return (
    <section className="w-full min-h-screen px-4 -mt-16 py-24 bg-[#f4f6fa] dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="relative max-w-4xl mx-auto bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-lg p-10">

        {/* ✏️ Edit Profile Floating Button */}
        <a
          href="/edit-profile"
          className="absolute top-4 right-4 px-3 py-1.5 bg-blue-600 text-white rounded-full flex items-center gap-1 text-sm hover:bg-blue-700 transition"
        >
          <Pencil className="w-4 h-4" />
          Edit
        </a>

        {/* Avatar + Name */}
        <div className="text-center">
          <img
            src={profile.avatar}
            alt="Avatar"
            className="w-28 h-28 rounded-full mx-auto border-4 border-blue-600 shadow-md object-cover"
          />
          <h1 className="text-3xl font-bold mt-4">{profile.fullName}</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {profile.bio}
          </p>

          {/* Social Icons */}
          <div className="flex justify-center gap-5 mt-4">
            {profile.github && (
              <a href={profile.github} target="_blank" rel="noreferrer">
                <Github className="w-5 h-5 hover:text-blue-500 transition" />
              </a>
            )}
            {profile.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                <Linkedin className="w-5 h-5 hover:text-blue-500 transition" />
              </a>
            )}
            {profile.twitter && (
              <a href={profile.twitter} target="_blank" rel="noreferrer">
                <Twitter className="w-5 h-5 hover:text-blue-500 transition" />
              </a>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-10 flex justify-center gap-4 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === tab.key
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
            <>
              <Card title="VedAI" desc="Spiritual AI chatbot using Gita/Vedas" />
              <Card title="TravelBot" desc="Telegram AI Travel Guide" />
            </>
          )}
          {activeTab === 'followers' && (
            <>
              <Card title="@dev_meena" desc="Follows you • MERN Learner" />
              <Card title="@ai_sakshi" desc="Follows you • UI/UX Enthusiast" />
            </>
          )}
        </div>
      </div>
    </section>
  )
}

const Card = ({ title, desc }) => (
  <div className="p-5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow hover:shadow-md transition">
    <h3 className="font-semibold text-lg">{title}</h3>
    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{desc}</p>
  </div>
)

export default Profile
