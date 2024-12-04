import { createSlice } from "@reduxjs/toolkit";
import { upload } from "./reelThunk";

const reelSlice = createSlice({
    name: "reel",
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(upload.pending, (state) => {
            state.error = null
        })
        .addCase(upload.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        })
        .addCase(upload.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})


export default reelSlice.reducer