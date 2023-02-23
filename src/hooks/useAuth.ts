import { useSelector } from "react-redux"
import { GlobalStateInterface } from "../interfaces/global-state-interface"
import { authAccess, authTokenKey, authUser } from '../constants';
import { LoggedInUserDetail } from "../interfaces/login-interface";
import { useNavigate } from "react-router-dom";

interface StateInterface {
  auth: LoggedInUserDetail | null;
}

interface AuthHook {
  userToken: string | null;
  user: string | null;
  isLoggedIn: string | null;
  userAccess: string | null;
  auth: LoggedInUserDetail | null;
}

export const useAuth = (): AuthHook => {
  const auth = useSelector((state: GlobalStateInterface): StateInterface['auth'] => state?.auth);
  const userToken = localStorage.getItem(authTokenKey)
  const user = localStorage.getItem(authUser);
  const userAccess = localStorage.getItem(authAccess);

  const isLoggedIn = user && userToken;

  return {
    userToken,
    user,
    isLoggedIn,
    userAccess,
    auth
  };
};

export const getAccessToken = () => {
  return localStorage.getItem(authAccess);
};