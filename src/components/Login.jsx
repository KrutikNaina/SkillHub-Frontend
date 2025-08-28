import { useEffect, useState } from 'react';
import { Github } from 'lucide-react';
import googleLogo from '../assets/google-logo.svg';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config.js'

const Login = () => {
  const [warning, setWarning] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const listener = (event) => {
      const allowedOrigins = ['http://localhost:5000', 'http://localhost:5173','https://skill-hub-backend-4b6u.vercel.app', 'https://skillhub.krutiknaina.com/'];
      if (!allowedOrigins.includes(event.origin)) return;

      if (event.data?.type === 'oauth-success') {
        const token = event.data.token;

        if (token) {
          localStorage.setItem('token', token);

          const payload = JSON.parse(atob(token.split('.')[1]));
          setUser(payload);

          navigate('/profile');
        } else {
          setWarning('Token missing in OAuth response.');
        }
      }

      window.removeEventListener('message', listener);
    };

    window.addEventListener('message', listener);
    return () => window.removeEventListener('message', listener);
  }, [navigate]);

  const openPopup = (url, provider) => {
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    window.open(
      url,
      `${provider}Auth`,
      `width=${width},height=${height},left=${left},top=${top}`
    );
  };


  const handleGoogleLogin = () => {
    openPopup('https://skillhub.krutiknaina.com//auth/google', 'Google');
  };
  
  const handleGithubLogin = () => {
    openPopup('https://skillhub.krutiknaina.com//auth/github', 'GitHub');
  };
  

  return (
    <section className="w-full min-h-screen flex items-center justify-center px-4 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-md w-full p-8 bg-white dark:bg-gray-800 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
          Sign in to <span className="text-blue-600">SkillHub</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-center mt-2 mb-6">
          Track your skills, join the community, and grow faster.
        </p>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 py-3 px-4 rounded-lg hover:border-blue-600 transition mb-4"
        >
          <img src={googleLogo} alt="Google" className="w-5 h-5" />
          <span>Continue with Google</span>
        </button>

        <button
          onClick={handleGithubLogin}
          className="w-full flex items-center justify-center gap-3 bg-gray-900 text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition"
        >
          <Github className="w-5 h-5" />
          <span>Continue with GitHub</span>
        </button>

        {user && (
          <div className="mt-4 text-sm text-green-600 text-center">
            ✅ Welcome, {user.name} ({user.email})
          </div>
        )}

        {warning && (
          <div className="mt-4 text-sm text-yellow-600 text-center">
            ⚠️ {warning}
          </div>
        )}
      </div>
    </section>
  );
};

export default Login;
