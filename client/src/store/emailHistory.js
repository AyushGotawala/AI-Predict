import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}`;

export const spamEmailHistory = createAsyncThunk(
  'email/history',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(`${API_URL}/EmailHistory`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      return response.data; // API returns { success, count, data }
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error || error.message);
    }
  }
);

export const fiveAnalysisHistory = createAsyncThunk(
  'fiveAnalysis/history',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(`${API_URL}/getFiveHistory`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      return response.data; // API returns { success, count, data }
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error || error.message);
    }
  }
);

export const deleteEmailHistory = createAsyncThunk(
  'emailHistory/delete',
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${API_URL}/EmailHistory/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return { id, message: response.data.message }; // Return deleted ID
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error || error.message);
    }
  }
);

const emailHistorySlice = createSlice({
  name: 'emailHistory',
  initialState: {
    data: null,
    fiveData: [],
    loading: false,
    error: null,
    emailCount: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(spamEmailHistory.pending, (state) => {
        state.data = null;
        state.loading = true;
        state.error = null;
      })
      .addCase(spamEmailHistory.fulfilled, (state, action) => {
        state.data = action.payload.data; // Assign the data array
        state.emailCount = action.payload.count; // Assign the count
        state.loading = false;
        state.error = null;
      })
      .addCase(spamEmailHistory.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(deleteEmailHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteEmailHistory.fulfilled, (state, action) => {
        state.loading = false;
        if (state.data) {
          state.data = state.data.filter((item) => item._id !== action.payload.id);
        }
        state.emailCount = Math.max(0, state.emailCount - 1); // Ensure count doesn't go below 0
      })
      .addCase(deleteEmailHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fiveAnalysisHistory.pending, (state) => {
        state.fiveData = [];
        state.loading = true;
        state.error = null;
      })
      .addCase(fiveAnalysisHistory.fulfilled, (state, action) => {
        state.fiveData = action.payload.data; // Assign the data array
        state.loading = false;
        state.error = null;
      })
      .addCase(fiveAnalysisHistory.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const emailHistoryReducer = emailHistorySlice.reducer;