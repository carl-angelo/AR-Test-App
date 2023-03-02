import React, { useState, ChangeEvent, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetchTokenMutation, useLoginUserMutation } from '../../services/login';
import { appId, appSecret } from '../../constants';
import Loading from '../../components/Loading';

const Login: React.FC<EmptyObject> = () => {

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loginUser, {
    data: loginResponse,
    isSuccess: isLoginApiSuccess,
    isLoading: isLoginMutationLoading
  }] = useLoginUserMutation();
  const [fetchToken, {
    data: fetchTokenResponse,
    isSuccess: isFetchTokenSuccess,
    isLoading: isFetchTokenLoading,
  }] = useFetchTokenMutation();
  const navigate = useNavigate();
  const isLoading = isLoginMutationLoading || isFetchTokenLoading;
  

  const handleLogin = useCallback(() => {
    loginUser({
      username, password
    });
  }, [username, password]);

  const handleFetchToken = useCallback(() => {
    if (isLoginApiSuccess && loginResponse?.authCode && appId && appSecret) {
      fetchToken({
        authCode: loginResponse.authCode,
        appId,
        appSecret
      });
    }
  }, [isLoginApiSuccess, loginResponse, appId, appSecret]);

  useEffect(() => {
    handleFetchToken();
  }, [isLoginApiSuccess, loginResponse]);

  useEffect(() => {
    if (isFetchTokenSuccess && fetchTokenResponse) {
      navigate('/');
    }
  }, [fetchTokenResponse, isFetchTokenSuccess]);

  return (
    <>
      <Loading loading={isLoading} />
      <div className="login-container">
        <div className="login-wrapper">
          <h2>Login</h2>
          <div className="fieldset flex-col">
            <label htmlFor="username"> Username </label>
            <input type="text" name="username" id="username" data-testid="login-username" onChange={(event: ChangeEvent<HTMLInputElement>) => setUserName(event.target.value)} />
          </div>
          <div className="fieldset flex-col">
            <label htmlFor="password"> Password </label>
            <input type="password" name="password" id="password" data-testid="login-password" onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)} />
          </div>
          <div className="fieldset">
            <button type="submit" name="submit" data-testid="login-button" className="button button-primary" onClick={() => handleLogin()}> Login </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;