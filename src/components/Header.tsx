import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { appId, appSecret } from '../constants';
import { useAuth } from '../hooks/useAuth';
import { useRefreshTokenMutation } from '../services/login';
import { useLogoutUserMutation } from '../services/logout';
import Loading from './Loading';

const Header: React.FC<EmptyObject> = () => {

  const [logoutApi, { isLoading: isLogoutLoading }] = useLogoutUserMutation();
  const { auth, userToken, user, userAccess } = useAuth();
  const navigate = useNavigate();
  const [refreshToken, { isSuccess: isRefreshTokenSuccess, isLoading: isRefreshTokenLoading }] = useRefreshTokenMutation();
  const isUserLoggedIn = user && userToken && userAccess;
  const isLoading = isLogoutLoading || isRefreshTokenLoading;

  const handleLogout = () => {
    logoutApi({ refreshToken: auth?.refreshToken || userToken }).then(() => {
      navigate('/login');
    });
  };

  const handleTokenRefresh = () => {
    if (user && userToken && appId && appSecret) {
      refreshToken({
        username: user,
        refreshToken: userToken,
        appId,
        appSecret
      });
    }
  };

  useEffect(() => {
    handleTokenRefresh();
  }, []);

  useEffect(() => {
    if (isRefreshTokenSuccess && isUserLoggedIn) {
      navigate('/');
    }
  }, [isRefreshTokenSuccess]);

  if (!userToken) {
    return null;
  }

  return (
    <>
      <Loading loading={isLoading} />
      <div className="header" data-testid="header">
        <div className="container">
          <div className="logo">Advice Revolution</div>
          <button type="button" data-testid="logout-btn" className="button button-primary" onClick={handleLogout}>LOGOUT</button>
        </div>
      </div>
    </>
  );
};

export default Header;