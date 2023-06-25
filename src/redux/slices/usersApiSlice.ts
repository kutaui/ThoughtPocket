import {apiSlice} from "@/redux/slices/apiSlice";

const USERS_URL: string = "/api/users";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: USERS_URL + "/auth",
                method: "POST",
                body: credentials,
                credentials: "include",
                options: {
                    tags: ["User"],
                }
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: USERS_URL + "/logout",
                method: "POST",
                body:{},
                options: {
                    tags: ["User"],
                }
            })
        }),
        register: builder.mutation({
            query: (credentials) => ({
                url: USERS_URL,
                method: "POST",
                body: credentials,
                options: {
                    tags: ["User"],
                }
            }),
        }),
    }),
})

export const {useLoginMutation, useLogoutMutation,useRegisterMutation} = usersApiSlice;
