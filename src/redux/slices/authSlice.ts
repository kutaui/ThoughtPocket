import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const newState = {
        ...state,
        userInfo: action.payload,
      };

      return newState;
    },
    logout: (state) => {
      const newState = {
        ...state,
        userInfo: null,
      };
      return newState;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
