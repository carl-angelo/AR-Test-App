import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './baseApiQuery';
import { Addresses, ApiResponse, ContactDetails, People } from '../interfaces/people-interface';

const HUB_ENDPOINT = '/hub/api/v1';

export const hubApi = createApi({
  reducerPath: 'peopleApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['PEOPLE_LIST', 'ADDRESS_LIST', 'CONTACT_LIST'],
  endpoints: (builder) => ({
    getPeopleList: builder.query<ApiResponse<People>, EmptyObject>({
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
          // const { data } = await queryFulfilled;
          // console.log(data);
        } catch(e) {
          console.error('ERROR PEOPLE LIST', e);
          dispatch(hubApi.util.invalidateTags(['PEOPLE_LIST']));
        }
      },
    }),
    getAddresses: builder.query<ApiResponse<Addresses>, EmptyObject>({
      query: () => ({
        url: `${HUB_ENDPOINT}/addresses`,
        params: {
          entryStatus: "ACTIVE",
          pageSize: 100
        },
        provideTags: ['ADDRESS_LIST']
      }),
      extraOptions: {
        auth: true
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          // const { data } = await queryFulfilled;
          // console.log(data);
        } catch(e) {
          console.error('ERROR ADDRESS LIST', e);
          dispatch(hubApi.util.invalidateTags(['ADDRESS_LIST']));
        }
      },
    }),
    getContactDetails: builder.query<ApiResponse<ContactDetails>, EmptyObject>({
      query: () => ({
        url: `${HUB_ENDPOINT}/contact-details`,
        params: {
          entryStatus: "ACTIVE",
          pageSize: 100
        },
        provideTags: ['CONTACT_LIST']
      }),
      extraOptions: {
        auth: true
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          // const { data } = await queryFulfilled;
          // console.log(data);
        } catch(e) {
          console.error('ERROR CONTACT DETAILS', e);
          dispatch(hubApi.util.invalidateTags(['CONTACT_LIST']));
        }
      },
    }),
  })
});

export const {
  useGetPeopleListQuery,
  useGetAddressesQuery,
  useGetContactDetailsQuery
} = hubApi;