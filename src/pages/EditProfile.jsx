import { useState } from 'react'
import { Github, Linkedin, Twitter, UploadCloud } from 'lucide-react'
import avatarDefault from '../assets/krutik-naina.jpg'

const EditProfile = () => {
  const [avatar, setAvatar] = useState(avatarDefault)
  const [name, setName] = useState('Krutik Naina')
  const [bio, setBio] = useState('MERN Developer | Learning & Building at SkillHub 🚀')
  const [github, setGithub] = useState('https://github.com/KrutikNaina')
  const [linkedin, setLinkedin] = useState('https://linkedin.com')
  const [twitter, setTwitter] = useState('https://twitter.com')

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatar(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <section className="w-full min-h-screen px-6 py-24 bg-[#f4f6fa] dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-3xl mx-auto bg-gray-100 dark:bg-gray-800 p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Your Profile</h2>

        <div className="flex flex-col items-center gap-4 mb-8">
          <img src={avatar} alt="Avatar" className="w-28 h-28 rounded-full shadow" />
          <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            <UploadCloud className="w-5 h-5" />
            Change Avatar
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>

        <form className="space-y-5">
          <Input label="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
          <TextArea label="Bio" value={bio} onChange={(e) => setBio(e.target.value)} />

          <Input
            label="GitHub"
            icon={<Github className="w-4 h-4 text-gray-500" />}
            value={github}
            onChange={(e) => setGithub(e.target.value)}
          />
          <Input
            label="LinkedIn"
            icon={<Linkedin className="w-4 h-4 text-gray-500" />}
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
          />
          <Input
            label="Twitter"
            icon={<Twitter className="w-4 h-4 text-gray-500" />}
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
          />

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              className="px-5 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-800 dark:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

const Input = ({ label, icon, ...props }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-900">
      {icon}
      <input
        {...props}
        className="w-full bg-transparent outline-none text-sm text-gray-900 dark:text-white"
      />
    </div>
  </div>
)

const TextArea = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <textarea
      {...props}
      rows={3}
      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 outline-none text-sm text-gray-900 dark:text-white"
    />
  </div>
)

export default EditProfile
