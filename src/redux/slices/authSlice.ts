import { createSlice } from "@reduxjs/toolkit";

const getInitialUserInfo = () => {
    if (typeof window !== "undefined") {
        const storedUserInfo = localStorage.getItem("userInfo");
        return storedUserInfo ? JSON.parse(storedUserInfo) : null;
    }
    return null;
};

const initialState = {
    userInfo: getInitialUserInfo(),
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            if (typeof window !== "undefined") {
                localStorage.setItem("userInfo", JSON.stringify(action.payload));
            }
        },
        logout: (state) => {
            state.userInfo = null;
            if (typeof window !== "undefined") {
                localStorage.removeItem("userInfo");
            }
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
