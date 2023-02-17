import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { baseAPI } from '../constants';


export const baseApiQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // const token = getToken();

  const rawBaseQuery = fetchBaseQuery({
    baseUrl: baseAPI,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/hal+json');
      return headers;
    }
  });
  return rawBaseQuery(args, api, extraOptions);
};
