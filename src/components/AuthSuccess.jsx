import { useEffect } from 'react';

const AuthSuccess = () => {
  useEffect(() => {
    localStorage.setItem('isLoggedIn', 'true');
    window.close(); // Closes the popup
  }, []);

  return <div>Login successful! You can close this tab.</div>;
};

export default AuthSuccess;
