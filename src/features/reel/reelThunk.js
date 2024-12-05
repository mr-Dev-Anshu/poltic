import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base URL configuration
const BASE_URL = "https://polity-backend.onrender.com/api/v1";

// Upload Reel
export const uploadReel = createAsyncThunk(
    "reels/upload",
    async ({ title, description, videoFile }, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("videoFile", videoFile);

            const response = await axios.post(
                `${BASE_URL}/reels/upload`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true,
                }
            );
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to upload reel";
            return rejectWithValue(errorMessage);
        }
    }
);

// Get All Reels
export const getReels = createAsyncThunk(
    "reels/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/reels`, {
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
