import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}`;

export const emailSpam = createAsyncThunk(
  "email/spamEmail",
  async (emailContent, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${API_URL}/predictEmail`,
        { text: emailContent },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error || error.message);
    }
  }
);

const emailSlice = createSlice({
  name: "email",
  initialState: {
    result: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearResult: (state) => {
      state.result = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(emailSpam.pending, (state) => {
        (state.loading = true), (state.error = null), (state.result = null);
      })
      .addCase(emailSpam.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload.prediction;
      })
      .addCase(emailSpam.rejected, (state, action) => {
        (state.error = action.payload), (state.loading = false);
      });
  },
});

export const { clearResult } = emailSlice.actions;

export const emailReducer = emailSlice.reducer;
