import { configureStore, createImmutableStateInvariantMiddleware, createListenerMiddleware } from '@reduxjs/toolkit';
import { loginApi } from '../services/login';
import { loggedInReducer } from '../slices/login';

export const getStore = (initialState = {}) => {
  const listenerMiddleware = createListenerMiddleware();

  const immutableInvariantMiddleware = createImmutableStateInvariantMiddleware({
    warnAfter: 250
  });

  const store = configureStore({
    preloadedState: initialState,
    reducer: {
      loggedInUser: loggedInReducer,
      [loginApi.reducerPath]: loginApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: true
      })
        .prepend(listenerMiddleware.middleware)
        .concat(
          immutableInvariantMiddleware,
          loginApi.middleware
        )
  });

  return store;
};

export const store = getStore();