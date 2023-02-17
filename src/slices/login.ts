import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from '../constants/initialState';

export const LoginSlice = createSlice({
  name: 'LoggedInUser',
  initialState,
  reducers: {
    setLoggedInUser: (state, action: PayloadAction<string>) => {
      state.loggedInUser = { username: action.payload }
    }
  }
});

export const { setLoggedInUser } = LoginSlice.actions;
export const { reducer: loggedInReducer } = LoginSlice;