import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base URL configuration
const BASE_URL = "https://823d-13-60-180-150.ngrok-free.app/api/v1";

export const reportReel = createAsyncThunk(
    "reort/reel",
    async ({ creatorId, reporterId, reelId }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/report/create`,
                { creatorId, reporterId, reelId },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            return response.data;
        } catch (error) {
            console.log(error)
            const errorMessage = error.response?.data?.message || "Failed to report reel";
            return rejectWithValue(errorMessage);
        }
    }
);