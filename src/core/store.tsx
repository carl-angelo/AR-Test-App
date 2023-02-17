import { configureStore, createImmutableStateInvariantMiddleware, createListenerMiddleware } from '@reduxjs/toolkit';

export const getStore = (initialState = {}) => {
  const listenerMiddleware = createListenerMiddleware();

  const immutableInvariantMiddleware = createImmutableStateInvariantMiddleware({
    warnAfter: 250
  });

  const store = configureStore({
    preloadedState: initialState,
    reducer: {
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: true
      })
        .prepend(listenerMiddleware.middleware)
        .concat(
          immutableInvariantMiddleware,
        )
  });

  return store;
};

export const store = getStore();