import {
	configureStore,
	createImmutableStateInvariantMiddleware,
	createListenerMiddleware,
} from "@reduxjs/toolkit";
import { loginApi } from "../services/login";
import { logoutApi } from "../services/logout";
import { hubApi } from "../services/people";
import { authReducer } from "../slices/auth";
import { errorReducer } from "../slices/error";

export const getStore = (initialState = {}) => {
	const listenerMiddleware = createListenerMiddleware();

	const immutableInvariantMiddleware = createImmutableStateInvariantMiddleware({
		warnAfter: 250,
	});

	const store = configureStore({
		preloadedState: initialState,
		reducer: {
			auth: authReducer,
			error: errorReducer,
			[loginApi.reducerPath]: loginApi.reducer,
			[logoutApi.reducerPath]: logoutApi.reducer,
			[hubApi.reducerPath]: hubApi.reducer,
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				serializableCheck: false,
				immutableCheck: true,
			})
				.prepend(listenerMiddleware.middleware)
				.concat(
					immutableInvariantMiddleware,
					loginApi.middleware,
					logoutApi.middleware,
					hubApi.middleware
				),
	});

	return store;
};

export const store = getStore();
