import { createApi } from '@reduxjs/toolkit/query/react'
import { FetchTokenRequestInterface, LoggedInUserDetail, LoginRequestInterface, LoginResponseInterface, RefreshTokenRequestInterface } from '../interfaces/login-interface';
import { baseApiQuery } from './baseApiQuery';
import { appId, authAccess, authTokenKey, authUser } from '../constants';
import { setAuth } from '../slices/auth';

export const loginApi = createApi({
  reducerPath: 'loginApi',
  baseQuery: baseApiQuery,
  tagTypes: ['LOGIN_USER', 'FETCH_TOKEN', 'REFETCH_TOKEN'],
  endpoints: (builder) => ({
    loginUser: builder.mutation<LoginResponseInterface, LoginRequestInterface>({
      query: ({ username, password }) => ({
        url: '/users/login',
        params: {
          appId
        },
        method: 'POST',
        body: JSON.stringify({
          username, password
        }),
        provideTags: ['LOGIN_USER']
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          // try...
        } catch(e: any) {
          console.error('ERROR LOGIN', e);
          dispatch(loginApi.util.invalidateTags(['LOGIN_USER']));
        }
      },
    }),
    fetchToken: builder.mutation<LoggedInUserDetail, FetchTokenRequestInterface>({
      query: (props) => ({
        url: '/users/fetch-token',
        method: 'POST',
        body: JSON.stringify(props),
        provideTags: ['FETCH_TOKEN']
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem(authTokenKey, data.refreshToken);
          localStorage.setItem(authUser, data.username);
          localStorage.setItem(authAccess, data.accessToken);
          dispatch(setAuth(data));
        } catch(e) {
          console.error('ERROR LOGIN', e);
          dispatch(loginApi.util.invalidateTags(['FETCH_TOKEN']));
        }
      },
      
    }),
    refreshToken: builder.mutation<LoggedInUserDetail, RefreshTokenRequestInterface>({
      query: (props) => ({
        url: '/users/refresh-token',
        method: 'POST',
        body: JSON.stringify(props),
        provideTags: ['REFETCH_TOKEN']
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem(authTokenKey, data.refreshToken);
          localStorage.setItem(authUser, data.username);
          localStorage.setItem(authAccess, data.accessToken);
          dispatch(setAuth(data));
        } catch(e) {
          console.error('ERROR LOGIN', e);
          if (e)
          dispatch(loginApi.util.invalidateTags(['REFETCH_TOKEN']));
        }
      },
      
    }),
  })
});

export const {
  useLoginUserMutation,
  useFetchTokenMutation,
  useRefreshTokenMutation
} = loginApi;