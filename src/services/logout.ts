import { createApi } from "@reduxjs/toolkit/query/react";
import { baseApiQuery } from "./baseApiQuery";
import { authAccess, authTokenKey, authUser } from "../constants";
import { setLogoutUser } from "../slices/auth";
import { LogoutRequestInterface } from "../interfaces/logout-interface";
import { loginApi } from "./login";
import { hubApi } from "./people";

export const logoutApi = createApi({
	reducerPath: "logoutApi",
	baseQuery: baseApiQuery,
	endpoints: (builder) => ({
		logoutUser: builder.mutation<unknown, LogoutRequestInterface>({
			query: ({ refreshToken }) => ({
				url: "/users/logout",
				method: "POST",
				body: JSON.stringify({
					refreshToken,
				}),
			}),
			extraOptions: {
				auth: true,
			},
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					if (data) {
						localStorage.removeItem(authTokenKey);
						localStorage.removeItem(authUser);
						localStorage.removeItem(authAccess);
						dispatch(setLogoutUser());
						dispatch(loginApi.util.resetApiState());
						dispatch(hubApi.util.resetApiState());
					}
				} catch (e) {
					console.error("ERROR LOGOUT", e);
				}
			},
		}),
	}),
});

export const { useLogoutUserMutation } = logoutApi;
