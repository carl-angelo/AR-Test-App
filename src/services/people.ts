import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseApiQuery";
import {
	Addresses,
	ApiResponse,
	ContactDetails,
	DeletePeopleInterface,
	People,
} from "../interfaces/people-interface";

const HUB_ENDPOINT = "/hub/api/v1";

export const hubApi = createApi({
	reducerPath: "peopleApi",
	baseQuery: baseQueryWithReauth,
	tagTypes: ["PEOPLE_LIST", "ADDRESS_LIST", "CONTACT_LIST"],
	endpoints: (builder) => ({
		getPeopleList: builder.query<ApiResponse<People>, EmptyObject>({
			query: () => ({
				url: `${HUB_ENDPOINT}/people`,
				params: {
					entryStatus: "ACTIVE",
					pageSize: 100,
				},
				provideTags: ["PEOPLE_LIST"],
			}),
			extraOptions: {
				auth: true,
			},
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					/* empty */
				} catch (e) {
					console.error("ERROR PEOPLE LIST", e);
					dispatch(hubApi.util.invalidateTags(["PEOPLE_LIST"]));
				}
			},
		}),
		getAddresses: builder.query<ApiResponse<Addresses>, EmptyObject>({
			query: () => ({
				url: `${HUB_ENDPOINT}/addresses`,
				params: {
					entryStatus: "ACTIVE",
					pageSize: 100,
				},
				provideTags: ["ADDRESS_LIST"],
			}),
			extraOptions: {
				auth: true,
			},
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					/* empty */
				} catch (e) {
					console.error("ERROR ADDRESS LIST", e);
					dispatch(hubApi.util.invalidateTags(["ADDRESS_LIST"]));
				}
			},
		}),
		getContactDetails: builder.query<ApiResponse<ContactDetails>, any>({
			query: (props) => ({
				url: `${HUB_ENDPOINT}/contact-details?${props}`,
				params: {
					entryStatus: "ACTIVE",
					pageSize: 100,
				},
				provideTags: ["CONTACT_LIST"],
			}),
			extraOptions: {
				auth: true,
			},
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					/* empty */
				} catch (e) {
					console.error("ERROR CONTACT DETAILS", e);
					dispatch(hubApi.util.invalidateTags(["CONTACT_LIST"]));
				}
			},
		}),
		deletePeople: builder.mutation<unknown, DeletePeopleInterface>({
			query: (props) => ({
				url: `${HUB_ENDPOINT}/people/${props.entryId}`,
				method: "DELETE",
				params: props,
			}),
			extraOptions: {
				auth: true,
			},
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					dispatch(hubApi.util.invalidateTags(["PEOPLE_LIST"]));
				} catch (e) {
					console.error("ERROR DELETE PEOPLE", e);
				}
			},
		}),
		deleteContact: builder.mutation<unknown, { entryId: string }>({
			query: (props) => ({
				url: `${HUB_ENDPOINT}/contact-details/${props.entryId}`,
				method: "DELETE",
				params: props,
			}),
			extraOptions: {
				auth: true,
			},
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					dispatch(hubApi.util.invalidateTags(["CONTACT_LIST"]));
				} catch (e) {
					console.error("ERROR DELETE CONTACT", e);
				}
			},
		}),
		deleteAddress: builder.mutation<unknown, { entryId: string }>({
			query: (props) => ({
				url: `${HUB_ENDPOINT}/addresses/${props.entryId}`,
				method: "DELETE",
				params: props,
			}),
			extraOptions: {
				auth: true,
			},
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					dispatch(hubApi.util.invalidateTags(["ADDRESS_LIST"]));
				} catch (e) {
					console.error("ERROR DELETE ADDRESS", e);
				}
			},
		}),
	}),
});

export const {
	useGetPeopleListQuery,
	useGetAddressesQuery,
	useGetContactDetailsQuery,
	useDeletePeopleMutation,
	useDeleteContactMutation,
	useDeleteAddressMutation,
} = hubApi;
