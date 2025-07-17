import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}`;

export const spamEmailHistory = createAsyncThunk(
  'email/history',
  async(_,{ rejectWithValue })=>{
    try{
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${API_URL}/EmailHistory`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    }catch(error){
      return rejectWithValue(error?.response?.data?.error || error.message);
    }
  }
);

export const deleteEmailHistory = createAsyncThunk(
  'emailHistory/delete',
  async(id,{ rejectWithValue })=>{
    try{
      const token = localStorage.getItem('token');
      const response = await axios.delete(
        `${API_URL}/EmailHistory/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return {id, message : response.data.message};
    }catch(error){
      return rejectWithValue(error?.response?.data?.error || error.message);
    }
  }
)

const emailHistorySLicer = createSlice({
    name : 'emailHistory',
    initialState : {
        data: null,
        loading: false,
        error: null,
        count : 0
    },
    reducers : {

    },
    extraReducers : (builder)=> {
        builder
            .addCase(spamEmailHistory.pending,(state)=>{
                state.data = null,
                state.loading = true,
                state.error = 0
            })
            .addCase(spamEmailHistory.fulfilled,(state,action)=>{
                state.data = action.payload.data,
                state.loading = false,
                state.count = action.payload.count
                state.error = null
            })
            .addCase(spamEmailHistory.rejected,(state,action)=>{
                state.error = action.payload,
                state.loading = false
            })
            .addCase(deleteEmailHistory.pending,(state)=>{
              state.loading = true
            })
            .addCase(deleteEmailHistory.fulfilled,(state,action)=>{
              state.loading = false
              state.data = state.data.filter((item) => item._id !== action.payload.id);
              state.count = state.count-1;
            })
            .addCase(deleteEmailHistory.rejected,(state,action)=>{
              state.loading = false
              state.error = state.payload
            })
    }
})

export const emailHistoryReducer = emailHistorySLicer.reducer;