import { createSlice } from "@reduxjs/toolkit";
import { uploadReel, getReels, deleteReel } from "./reelsThunk";

const reelsSlice = createSlice({
    name: "reels",
    initialState: {
        data: null,
        error: null,
        loading: false, // Loading only for getReels
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle Upload Reel
            .addCase(uploadReel.fulfilled, (state, action) => {
                state.data = action.payload;
                state.error = null;
            })
            .addCase(uploadReel.rejected, (state, action) => {
                state.error = action.payload;
            })
            // Handle Get Reels
            .addCase(getReels.pending, (state) => {
                state.loading = true; // Set loading to true
                state.error = null;
            })
            .addCase(getReels.fulfilled, (state, action) => {
                state.loading = false; // Reset loading
                state.data = action.payload;
                state.error = null;
            })
            .addCase(getReels.rejected, (state, action) => {
                state.loading = false; // Reset loading
                state.error = action.payload;
            })
            // Handle Delete Reel
            .addCase(deleteReel.fulfilled, (state, action) => {
                state.data = state.data.filter((reel) => reel.id !== action.meta.arg);
                state.error = null;
            })
            .addCase(deleteReel.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export default reelsSlice.reducer;
