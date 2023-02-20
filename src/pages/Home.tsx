import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useLogoutUserMutation } from '../services/logout';

const Home: React.FC<EmptyObject> = () => {

  const [logoutApi] = useLogoutUserMutation();
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutApi({ refreshToken: auth.refreshToken || auth.userToken }).then(() => {
      navigate('/login');
    });
  };

  return <div>
    Home
    <button onClick={handleLogout}>logout</button>
  </div>;
};

export default Home;