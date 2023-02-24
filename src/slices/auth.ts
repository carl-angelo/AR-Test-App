import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ContentGlobalInterface, GlobalStateInterface } from "../interfaces/global-state-interface";
import { LoggedInUserDetail } from "../interfaces/login-interface";

const initialState: ContentGlobalInterface<LoggedInUserDetail> = {
  content: null
};

export const AuthSlice = createSlice({
  name: 'AuthUserSlice',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<LoggedInUserDetail>) => {
      state.content = { ...action.payload }
    },
    setLogoutUser: (state) => {
      state.content = null;
    },
  }
});

export const { setAuth, setLogoutUser } = AuthSlice.actions;
export const { reducer: authReducer  } = AuthSlice;