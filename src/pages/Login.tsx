import React, { useState, ChangeEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useFetchTokenMutation, useLoginUserMutation, useRefreshTokenMutation } from '../services/login';
import { appId, appSecret } from '../constants';

const Login: React.FC<EmptyObject> = () => {

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();
  const [loginUser, { data: loginResponse, isSuccess: isLoginApiSuccess }] = useLoginUserMutation();
  const [fetchToken, { data: fetchTokenResponse, isSuccess: isFetchTokenSuccess }] = useFetchTokenMutation();
  const [refreshToken, { isSuccess: isRefreshTokenSuccess }] = useRefreshTokenMutation();
  const navigate = useNavigate();
  const isUserLoggedIn = auth.user && auth.userToken && auth.userAccess;

  const handleLogin = () => {
    loginUser({
      username, password
    })
  };

  useEffect(() => {
    if (auth && auth.user && auth.userToken && appId && appSecret) {
      refreshToken({
        username: auth.user,
        refreshToken: auth.userToken,
        appId,
        appSecret
      })
    }
  }, []);

  useEffect(() => {
    if (isRefreshTokenSuccess && isUserLoggedIn) {
      navigate('/');
    }
  }, [isRefreshTokenSuccess]);

  useEffect(() => {
    if (isFetchTokenSuccess && fetchTokenResponse) {
      navigate('/');
    }
  }, [fetchTokenResponse, isFetchTokenSuccess]);

  useEffect(() => {
    if (isLoginApiSuccess && loginResponse?.authCode && appId && appSecret) {
      console.log('isLoginApiSuccess', isLoginApiSuccess);
      fetchToken({
        authCode: loginResponse.authCode,
        appId,
        appSecret
      });
    }
  }, [isLoginApiSuccess, loginResponse]);

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <h2> Login </h2>
        <div className="fieldset flex-col">
          <label htmlFor="username"> Username </label>
          <input type="text" name="username" id="username" onChange={(event: ChangeEvent<HTMLInputElement>) => setUserName(event.target.value)} />
        </div>
        <div className="fieldset flex-col">
          <label htmlFor="password"> Password </label>
          <input type="password" name="password" id="password" onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)} />
        </div>
        <div className="fieldset">
          <button type="submit" name="submit" onClick={handleLogin}> Login </button>
        </div>
      </div>
    </div>
  );
};

export default Login;