import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

// Login thunk
export const loginUser = createAsyncThunk("auth/login", async (credentials, thunkAPI) => {
  try {
    const response = await api.post("/api/auth/login", credentials);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.msg || "Login failed";
    return thunkAPI.rejectWithValue(message);
  }
});

// Register thunk
export const registerUser = createAsyncThunk("auth/register", async (userData, thunkAPI) => {
  try {
    const response = await api.post("/api/auth/register", userData);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.msg || "Registration failed";
    return thunkAPI.rejectWithValue(message);
  }
});

// Verify token thunk
export const verifyToken = createAsyncThunk("auth/verify", async (_, thunkAPI) => {
  try {
    const response = await api.get("/api/auth/verify");
    return response.data.user;
  } catch (error) {
    const message = error.response?.data?.msg || "Token verification failed";
    return thunkAPI.rejectWithValue(message);
  }
});

// Get current user profile
export const getCurrentUser = createAsyncThunk("auth/me", async (_, thunkAPI) => {
  try {
    const response = await api.get("/api/auth/me");
    return response.data;
  } catch (error) {
    const message = error.response?.data?.msg || "Failed to fetch user profile";
    return thunkAPI.rejectWithValue(message);
  }
});

// Update user profile
export const updateProfile = createAsyncThunk("auth/updateProfile", async (profileData, thunkAPI) => {
  try {
    const response = await api.put("/api/auth/profile", profileData);
    return response.data.user;
  } catch (error) {
    const message = error.response?.data?.msg || "Failed to update profile";
    return thunkAPI.rejectWithValue(message);
  }
});

// Logout thunk
export const logoutUser = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await api.post("/api/auth/logout");
    return true;
  } catch (error) {
    // Even if logout fails on server, clear local state
    return true;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    clearCredentials: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          id: action.payload.id,
          name: action.payload.name,
          email: action.payload.email,
          role: action.payload.role,
        };
        state.token = "authenticated"; // We use httpOnly cookies, so no actual token
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      })

      // Register cases
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          id: action.payload.id,
          name: action.payload.name,
          email: action.payload.email,
          role: action.payload.role,
        };
        state.token = "authenticated";
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Verify token cases
      .addCase(verifyToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.token = "authenticated";
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(verifyToken.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null; // Don't show error for failed verification
      })

      // Get current user cases
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      // Update profile cases
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload };
      })

      // Logout cases
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
      });
  },
});

export const { clearError, setCredentials, clearCredentials } = authSlice.actions;

export default authSlice.reducer;
