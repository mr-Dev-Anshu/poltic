import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base URL configuration
const BASE_URL = "https://polity-backend.onrender.com/api/v1";
// const BASE_URL = "http://localhost:9000/api/v1";

// Upload Reel
export const uploadReel = createAsyncThunk(
    "reels/upload",
    async ({ title, description, video , thumbnail , userId  }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/reels/create`,
                {title , description , video , thumbnail , userId },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            return response.data;
        } catch (error) {
            console.log(error)
            const errorMessage = error.response?.data?.message || "Failed to upload reel";
            return rejectWithValue(errorMessage);
        }
    }
);

// Get All Reels
export const getReels = createAsyncThunk(
    "reels/get-all",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/reels/get-all`, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to fetch reels";
            return rejectWithValue(errorMessage);
        }
    }
);

// Delete Reel
export const deleteReel = createAsyncThunk(
    "reels/delete",
    async (reelId, { rejectWithValue }) => {
        try {
            const response = await axios.delete(
                `${BASE_URL}/reels/delete?id=${reelId}`,
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to delete reel";
            return rejectWithValue(errorMessage);
        }
    }
);


export const getReelsByUserId = createAsyncThunk( "reels/get", async(userId, {rejectWithValue}) => {
    try{
        const response = await axios.get(`${BASE_URL}/reels/getByUserId?userId=${userId}`,
            {withCredentials:true}
        )
        return response.data
    } catch(error) {
        const errorMessage = error.response?.data?.message || "Failed to get reels"
        return rejectWithValue(errorMessage)
    }
});