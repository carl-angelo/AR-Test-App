import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { baseAPI } from '../constants';
import { getAccessToken } from '../hooks/useAuth';


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
