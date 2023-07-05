import { createSlice } from '@reduxjs/toolkit';

const getInitialUserInfo = () => {
  if (typeof window !== 'undefined') {
    const storedUserInfo = localStorage.getItem('userInfo');
    return storedUserInfo ? JSON.parse(storedUserInfo) : null;
  }
  return null;
};

const initialState = {
  userInfo: getInitialUserInfo(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      return {
        ...state,
        userInfo: action.payload,
      };
    },
    logout: (state) => {
      return {
        ...state,
        userInfo: null,
      };
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
