import apiSlice from '@/redux/slices/apiSlice';

const NOTES_URL = '/api/notes';

export const notesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createNote: builder.mutation({
      query: (note) => ({
        url: NOTES_URL,
        credentials: 'include',
        method: 'POST',
        body: note,
        options: {
          tags: ['Note'],
        },
      }),
    }),
    deleteNote: builder.mutation({
      query: (note) => ({
        url: `${NOTES_URL}/${note._id}`,
        method: 'DELETE',
        credentials: 'include',

        options: {
          tags: ['Note'],
        },
      }),
    }),
    updateNote: builder.mutation({
      query: (note) => ({
        url: `${NOTES_URL}/${note._id}`,
        method: 'PUT',
        credentials: 'include',

        body: note,
        options: {
          tags: ['Note'],
        },
      }),
    }),
    getNotes: builder.mutation({
      query: () => ({
        url: NOTES_URL,
        credentials: 'include',
        method: 'GET',
        options: {
          tags: ['Note'],
        },
      }),
    }),
  }),
});

export const {
  useGetNotesMutation,
  useDeleteNoteMutation,
  useCreateNoteMutation,
  useUpdateNoteMutation,
} = notesApiSlice;
