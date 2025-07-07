import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api"; // point to your api.js

const initialState = {
  role: null,
  loading: false,
  error: null,
};

// --- Login thunk ---
export const loginUser = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    const res = await api.post("/api/auth/login", data);
    return res.data.role; // we just care about role now
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.msg || "Login failed");
  }
});

// --- Register thunk ---
export const registerUser = createAsyncThunk("auth/register", async (data, thunkAPI) => {
  try {
    await api.post("/api/auth/register", data);
    return "Registered successfully";
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.msg || "Register failed");
  }
});

// --- Logout thunk ---
export const logoutUser = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await api.post("/api/auth/logout");
    return true;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.msg || "Logout failed");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.role = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.role = null;
        state.error = null;
      });
  },
});

export default authSlice.reducer;
