import { useSelector } from "react-redux"
import { GlobalStateInterface } from "../interfaces/global-state-interface"
import { authAccess, authTokenKey, authUser } from '../constants';

export const useAuth = () => {
  const logginState = useSelector((state: GlobalStateInterface) => state && state.auth);
  const userToken = localStorage.getItem(authTokenKey)
  const user = localStorage.getItem(authUser);
  const userAccess = localStorage.getItem(authAccess);

  const isLoggedIn = user && userToken;

  return {
    userToken,
    user,
    isLoggedIn,
    userAccess,
    ...logginState
  };
};

export const getAccessToken = () => {
  return localStorage.getItem(authAccess);
};