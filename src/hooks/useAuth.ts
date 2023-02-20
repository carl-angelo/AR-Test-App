import { useSelector } from "react-redux"
import { GlobalStateInterface } from "../interfaces/global-state-interface"
import { authTokenKey, authUser } from '../constants';

export const useAuth = () => {
  const logginState = useSelector((state: GlobalStateInterface) => state && state.auth);
  const userToken = localStorage.getItem(authTokenKey)
  const user = localStorage.getItem(authUser);

  const isLoggedIn = user && userToken;

  return {
    userToken,
    user,
    isLoggedIn,
    ...logginState
  };
};