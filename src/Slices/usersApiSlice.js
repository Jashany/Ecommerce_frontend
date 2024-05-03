import { apiSlice } from "./apiSlice";
const USERS_URL = 'http://localhost:3000';

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/api/users/login`,
                method: "POST",
                body: data,
            }),
        }),
        signup: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/api/users/register`,
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const { useLoginMutation,useSignupMutation } = userApiSlice;
