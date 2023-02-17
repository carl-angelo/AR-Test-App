import { createApi } from '@reduxjs/toolkit/query/react'
import { LoginRequestInterface, LoginResponseInterface } from '../interfaces/login-interface';
import { baseApiQuery } from './baseApiQuery';
import { appId } from '../constants';
import { setLoggedInUser } from '../slices/login';

export const loginApi = createApi({
  reducerPath: 'loginApi',
  baseQuery: baseApiQuery,
  tagTypes: ['LOGIN_USER'],
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
        })
      }),
      async onQueryStarted({ username }, { dispatch, queryFulfilled }) {
        try {
          const { data: { authCode } } = await queryFulfilled;

          localStorage.setItem('authUser', authCode);
          dispatch(setLoggedInUser(username));
        } catch(e) {
          console.error('ERROR LOGIN', e);
          dispatch(loginApi.util.invalidateTags(['LOGIN_USER']));
        }
      },
      
    })
  })
});

export const {
  useLoginUserMutation
} = loginApi;