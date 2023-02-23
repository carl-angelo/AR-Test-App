import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from '../constants/initialState';
import { GlobalStateInterface } from "../interfaces/global-state-interface";
import { LoggedInUserDetail } from "../interfaces/login-interface";

export const AuthSlice = createSlice({
  name: 'AuthUserSlice',
  initialState,
  reducers: {
    setAuth: (state: GlobalStateInterface, action: PayloadAction<LoggedInUserDetail>) => {
      state.auth = { ...action.payload }
    },
    setLogoutUser: (state: GlobalStateInterface) => {
      state.auth = null;
    },
  }
});

export const { setAuth, setLogoutUser } = AuthSlice.actions;
export const { reducer: authReducer  } = AuthSlice;