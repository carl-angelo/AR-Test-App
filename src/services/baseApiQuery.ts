import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError, retry } from '@reduxjs/toolkit/query/react';
import { baseAPI } from '../constants';
import { getAccessToken } from '../hooks/useAuth';
import { authAccess, authTokenKey, authUser } from '../constants';
import { setAuth, setLogoutUser } from '../slices/auth';
import { LoggedInUserDetail } from '../interfaces/login-interface';
import { setError } from '../slices/error';

export const baseApiQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError, { auth?: boolean }
> = async (args, api, extraOptions) => {
  const auth = getAccessToken();

  const rawBaseQuery = fetchBaseQuery({
    baseUrl: baseAPI,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/hal+json');
      if (extraOptions?.auth) {
        headers.set('Authorization', `Bearer ${auth}`);
      }
      return headers;
    }
  });
  const result = await rawBaseQuery(args, api, extraOptions);
  if (result.error) {
    api.dispatch(setError({ code: result.error.status as number, data: result.error.data }));
  }
  return result;
};

export const baseQueryWithReauth: BaseQueryFn<
string | FetchArgs,
unknown,
FetchBaseQueryError
> = async (args, api, extraOptions) => {
let result = await baseApiQuery(args, api, extraOptions)
if (result.error && result.error.status === 401) {

  const { data } = await baseApiQuery(`${baseAPI}users/refresh-token`, api, extraOptions);

  if (data) {
    const token = data as LoggedInUserDetail;
    localStorage.setItem(authTokenKey, token?.refreshToken);
    localStorage.setItem(authUser, token?.username);
    localStorage.setItem(authAccess, token.accessToken);
    api.dispatch(setAuth(token));

    result = await baseApiQuery(args, api, extraOptions);
  } else {
    api.dispatch(setLogoutUser());
    localStorage.removeItem(authTokenKey);
    localStorage.removeItem(authUser);
    localStorage.removeItem(authAccess);
    window.location.href = '/login';
  }
}
return result
}