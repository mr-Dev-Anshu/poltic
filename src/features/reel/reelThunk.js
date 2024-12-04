import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const upload = createAsyncThunk('reel/upload', async({}, {rejectWithValue}) => {
    try{
        const response = await axios.post("http://localhost:9000/api/v1/reels/create",{})
        return response.data
    } catch(error) {
        const errorMessage = error.response?.data?.message || "Failed to upload reel"
        console.log(errorMessage);
        return rejectWithValue(errorMessage)       
    }
})