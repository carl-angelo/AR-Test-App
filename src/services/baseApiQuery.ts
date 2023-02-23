import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError, retry } from '@reduxjs/toolkit/query/react';
import { baseAPI } from '../constants';
import { getAccessToken } from '../hooks/useAuth';
import { authAccess, authTokenKey, authUser } from '../constants';
import { setAuth, setLogoutUser } from '../slices/auth';
import { LoggedInUserDetail } from '../interfaces/login-interface';


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
  return rawBaseQuery(args, api, extraOptions);
};

export const baseQueryWithReauth: BaseQueryFn<
string | FetchArgs,
unknown,
FetchBaseQueryError
> = async (args, api, extraOptions) => {
let result = await baseApiQuery(args, api, extraOptions)
if (result.error && result.error.status === 401) {
  // try to get a new token
  const { data } = await baseApiQuery(`${baseAPI}users/refresh-token`, api, extraOptions)
  if (data) {
    // store the new token
    // api.dispatch(rawBaseQuery(refreshResult.data))
    const token = data as LoggedInUserDetail;
    localStorage.setItem(authTokenKey, token?.refreshToken);
    localStorage.setItem(authUser, token?.username);
    localStorage.setItem(authAccess, token.accessToken);
    api.dispatch(setAuth(token));
    // retry the initial query
    result = await baseApiQuery(args, api, extraOptions)
  } else {
    api.dispatch(setLogoutUser())
  }
}
return result
}