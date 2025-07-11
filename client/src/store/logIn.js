import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/auth/Login`;

export const loginUser = createAsyncThunk(
  "login/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, userData);
      return response.data;
    } catch (error) {
      const apiData = error.response?.data;

      if (apiData?.errors) {
        return rejectWithValue(apiData.errors);
      } else if (apiData?.message) {
        return rejectWithValue([{ message: apiData.message }]);
      } else {
        return rejectWithValue([{ message: "Login Failed. Please try again." }]);
      }
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    logout: (state) => {
      (state.user = null),
        (state.token = null),
        localStorage.removeItem("user"),
        localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.message = action.payload.message;

        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = loginSlice.actions;
export const loginReducer = loginSlice.reducer;
