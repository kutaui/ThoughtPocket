import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
    credentials: "include",
})

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ["User", "Note"],
    endpoints: (builder) => ({}),
})