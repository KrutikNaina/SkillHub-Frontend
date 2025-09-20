import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Github, Linkedin, Twitter, UploadCloud } from 'lucide-react';
import DashboardNavbar from '../components/DashboardNavbar';
import api from '../services/api';

const EditProfile = () => {
  const [avatar, setAvatar] = useState('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [github, setGithub] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [twitter, setTwitter] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Fetch current profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/api/users/me');
        const user = res.data;

        setName(user.displayName || '');
        setBio(user.bio || '');
        setGithub(user.github || '');
        setLinkedin(user.linkedin || '');
        setTwitter(user.twitter || '');
        setAvatar(user.avatar || '');
      } catch (err) {
        console.error(err);
        setMessage('❌ Failed to load profile. Please log in again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Avatar preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatar(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Submit updated data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put('/api/users/me', {
        name,
        bio,
        avatar,
        github,
        linkedin,
        twitter,
      });

      setMessage('✅ Profile updated successfully!');
      console.log(res.data);

      setTimeout(() => navigate('/profile'), 1000);
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to update profile');
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-500 animate-pulse">Loading...</p>;

  return (
    <>
      <DashboardNavbar />
      <section className="w-full min-h-screen px-6 py-24 bg-[#f4f6fa] dark:bg-gray-900 text-gray-900 dark:text-white">
        <div className="max-w-3xl mx-auto bg-gray-100 dark:bg-gray-800 p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Edit Your Profile</h2>

          {/* Avatar Upload */}
          <div className="flex flex-col items-center gap-4 mb-8">
            <img
              src={avatar || '/default-avatar.png'}
              alt="Avatar"
              className="w-28 h-28 rounded-full shadow object-cover"
            />
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

          {/* Profile Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
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

            {message && (
              <div className="text-center mt-4 text-sm font-medium">{message}</div>
            )}

            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                className="px-5 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-800 dark:text-white"
                onClick={() => navigate('/profile')}
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
    </>
  );
};

// Reusable Input component
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
);

// Reusable TextArea component
const TextArea = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <textarea
      {...props}
      rows={3}
      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 outline-none text-sm text-gray-900 dark:text-white"
    />
  </div>
);

export default EditProfile;
