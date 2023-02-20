import { createApi } from '@reduxjs/toolkit/query/react'
import { baseApiQuery } from './baseApiQuery';
import { authTokenKey, authUser } from '../constants';
import { setLogoutUser } from '../slices/auth';
import { LogoutRequestInterface } from '../interfaces/logout-interface';

export const logoutApi = createApi({
  reducerPath: 'logoutApi',
  baseQuery: baseApiQuery,
  endpoints: (builder) => ({
    logoutUser: builder.mutation<unknown, LogoutRequestInterface>({
      query: ({ refreshToken }) => ({
        url: '/users/logout',
        method: 'POST',
        body: JSON.stringify({
          refreshToken
        })
      }),
      extraOptions: {
        auth: true
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log('user logout', data);
          localStorage.removeItem(authTokenKey);
          localStorage.removeItem(authUser)
          dispatch(setLogoutUser());
        } catch(e) {
          console.error('ERROR LOGIN', e);
        }
      },
      
    })
  })
});

export const {
  useLogoutUserMutation
} = logoutApi;