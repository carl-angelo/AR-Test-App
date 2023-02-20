import { configureStore, createImmutableStateInvariantMiddleware, createListenerMiddleware } from '@reduxjs/toolkit';
import { loginApi } from '../services/login';
import { logoutApi } from '../services/logout';
import { authReducer } from '../slices/auth';

export const getStore = (initialState = {}) => {
  const listenerMiddleware = createListenerMiddleware();

  const immutableInvariantMiddleware = createImmutableStateInvariantMiddleware({
    warnAfter: 250
  });

  const store = configureStore({
    preloadedState: initialState,
    reducer: {
      auth: authReducer,
      [loginApi.reducerPath]: loginApi.reducer,
      [logoutApi.reducerPath]: logoutApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: true
      })
        .prepend(listenerMiddleware.middleware)
        .concat(
          immutableInvariantMiddleware,
          loginApi.middleware,
          logoutApi.middleware,
        )
  });

  return store;
};

export const store = getStore();