import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/redux/slices/authSlice';
import apiSlice from '@/redux/slices/apiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
