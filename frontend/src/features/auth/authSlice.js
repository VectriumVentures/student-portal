import { createSlice } from "@reduxjs/toolkit";

// Safe localStorage getter
const getUserFromStorage = () => {
    try {
        const userString = localStorage.getItem("user");
        return userString && userString !== "undefined" ? JSON.parse(userString) : null;
    } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        localStorage.removeItem("user");
        return null;
    }
};

const initialState = {
    role: getUserFromStorage()?.role || null,
    user: getUserFromStorage(),
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
        setUser: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.role = action.payload.role;
        },
        clearAuth: (state) => {
            state.user = null;
            state.role = null;
            state.token = null;
            state.loading = false;
            state.error = null;
        }
    }
});

export const { setLoading, setError, clearError, setUser, clearAuth } = authSlice.actions;
export default authSlice.reducer;
