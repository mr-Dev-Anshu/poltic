import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base URL configuration
const BASE_URL = "https://polity-backend.onrender.com/api/v1";

export const follow = createAsyncThunk(
    "reort/reel",
    async ({ creatorId, userId }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/follow/create`,
                { creatorId, userId},
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            return response.data;
        } catch (error) {
            console.log(error)
            const errorMessage = error.response?.data?.message || "Failed to follow Creator";
            return rejectWithValue(errorMessage);
        }
    }
);