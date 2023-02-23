import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './baseApiQuery';
import { GetPeopleResponse, People } from '../interfaces/people-interface';

const HUB_ENDPOINT = '/hub/api/v1';

export const hubApi = createApi({
  reducerPath: 'peopleApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['PEOPLE_LIST',],
  endpoints: (builder) => ({
    getPeopleList: builder.query<GetPeopleResponse, EmptyObject>({
      query: () => ({
        url: `${HUB_ENDPOINT}/people`,
        params: {
          entryStatus: "ACTIVE",
          pageSize: 100
        },
        provideTags: ['PEOPLE_LIST']
      }),
      extraOptions: {
        auth: true
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
        } catch(e) {
          console.error('ERROR LOGIN', e);
          dispatch(hubApi.util.invalidateTags(['PEOPLE_LIST']));
        }
      },
    })
  })
});

export const {
  useGetPeopleListQuery,
} = hubApi;