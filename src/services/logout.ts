import { createApi } from '@reduxjs/toolkit/query/react'
import { baseApiQuery } from './baseApiQuery';
import { authAccess, authTokenKey, authUser } from '../constants';
import { setLogoutUser } from '../slices/auth';
import { LogoutRequestInterface } from '../interfaces/logout-interface';
import { loginApi } from './login';

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
          localStorage.removeItem(authAccess);
          dispatch(setLogoutUser());
          loginApi.util.invalidateTags(['LOGIN_USER', 'FETCH_TOKEN', 'REFETCH_TOKEN']);
        } catch(e) {
          console.error('ERROR LOGOUT', e);
        }
      },
      
    })
  })
});

export const {
  useLogoutUserMutation
} = logoutApi;