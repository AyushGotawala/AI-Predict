import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth/SignUp'

export const signupUser = createAsyncThunk(
    'signup/signupUser',
    async(userData, {rejectWithValue}) =>{
        try{
            const response = await axios.post(API_URL,userData);
            return response.data;
        }catch (error){
            return rejectWithValue(
                error.response?.data?.message || 'SignUp Failed..'
            );
        }
    }
);

const signupSlice = createSlice({
    name : 'signup',
    initialState : {
        user : null,
        loading : false,
        error : null,
        message : null
    },
    reducers : {},
    extraReducers : (builder) =>{
        builder
            .addCase(signupUser.pending,(state)=>{
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(signupUser.fulfilled,(state,action)=>{
                state.loading = false;
                state.user = action.payload.user;
                state.message = action.payload.message;
            })
            .addCase(signupUser.rejected,(state,action)=>{
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const signupReducer = signupSlice.reducer;