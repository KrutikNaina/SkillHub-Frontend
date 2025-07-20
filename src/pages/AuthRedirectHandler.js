// AuthRedirectHandler.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthRedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get('token');

    if (token) {
      localStorage.setItem('token', token);
      navigate('/dashboard'); // or wherever you want after login
    } else {
      navigate('/login');
    }
  }, []);

  return <div>Logging in...</div>;
};

export default AuthRedirectHandler;
