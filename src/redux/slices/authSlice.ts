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
      const newState = {
        ...state,
        userInfo: action.payload,
      };
      if (typeof window !== 'undefined') {
        localStorage.setItem('userInfo', JSON.stringify(action.payload));
      }
      return newState;
    },
    logout: (state) => {
      const newState = {
        ...state,
        userInfo: null,
      };
      if (typeof window !== 'undefined') {
        localStorage.removeItem('userInfo');
      }
      return newState;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
