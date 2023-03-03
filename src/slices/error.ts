import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
	ContentGlobalInterface,
	ErrorInterface,
} from "../interfaces/global-state-interface";

const initialState: ContentGlobalInterface<ErrorInterface> = {
	content: null,
};

export const ErrorSlice = createSlice({
	name: "ErrorSlice",
	initialState,
	reducers: {
		setError: (state, action: PayloadAction<ErrorInterface>) => {
			state.content = {
				code: action.payload.code,
				data: action.payload.data,
			};
		},
		clearError: (state) => {
			state.content = null;
		},
	},
});

export const { setError, clearError } = ErrorSlice.actions;
export const { reducer: errorReducer } = ErrorSlice;
