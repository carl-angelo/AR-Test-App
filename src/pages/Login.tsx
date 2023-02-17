import React, { useState, ChangeEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useLoginUserMutation } from '../services/login';

const Login: React.FC<EmptyObject> = () => {

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const isLoggedIn = useAuth();
  const [loginUser] = useLoginUserMutation();
  const navigate = useNavigate();

  const handleLogin = () => {
    loginUser({
      username, password
    })
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn]);

  return (
    <div>
      <div>
        <h2> Login </h2>
        <div>
          <label htmlFor="username"> Username </label>
          <input type="text" name="username" id="username" onChange={(event: ChangeEvent<HTMLInputElement>) => setUserName(event.target.value)} />
        </div>
        <div>
          <label htmlFor="password"> Password </label>
          <input type="password" name="password" id="password" onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)} />
        </div>
        <div>
          <button type="submit" name="submit" onClick={handleLogin}> Login </button>
        </div>
      </div>
    </div>
  );
};

export default Login;