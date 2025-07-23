import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"; // Fixed incorrect import

const API_URL = `${import.meta.env.VITE_API_URL}`;

export const imagePredict = createAsyncThunk(
  'image/predict',
  async (fileData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${API_URL}/predictImage`,
        fileData, // Send FormData directly
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data.prediction;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error || error.message);
    }
  }
);

const imageSlice = createSlice({
  name: 'image',
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
      .addCase(imagePredict.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.result = null;
      })
      .addCase(imagePredict.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload;
      })
      .addCase(imagePredict.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearResult } = imageSlice.actions;
export const imageReducer = imageSlice.reducer;