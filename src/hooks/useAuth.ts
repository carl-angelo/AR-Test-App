import { useSelector } from "react-redux"
import { GlobalStateInterface } from "../interfaces/global-state-interface"

export const useAuth = () => {
  const isLoggedIn = useSelector((state: GlobalStateInterface) => state && state.loggedInUser && state.loggedInUser.username);

  return {
    isLoggedIn
  };
};