import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import BackendURL from '@/utils/BackendURL';

const baseQuery = fetchBaseQuery({
  baseUrl: BackendURL,
  credentials: 'include',
});

const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User', 'Note'],
  endpoints: (builder) => ({}),
});

export default apiSlice;
