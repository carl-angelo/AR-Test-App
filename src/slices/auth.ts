import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from '../constants/initialState';
import { LoggedInUserDetail } from "../interfaces/login-interface";

export const AuthSlice = createSlice({
  name: 'AuthUserSlice',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<LoggedInUserDetail>) => {
      state.auth = { ...action.payload }
    },
    setLogoutUser: (state) => {
      state.auth = null;
    },
  }
});

export const { setAuth, setLogoutUser } = AuthSlice.actions;
export const { reducer: authReducer  } = AuthSlice;