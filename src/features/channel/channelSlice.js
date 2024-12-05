import { createSlice } from "@reduxjs/toolkit";
import { createChannel , getChannelByEmail ,  updateChannel ,  } from "./channelThunk";
const channelSlice = createSlice({
    name: "channel",
    initialState: {
        data: null,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createChannel.fulfilled, (state, action) => {
                state.data = action.payload;
                state.error = null;
            })
            .addCase(createChannel.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(getChannelByEmail.fulfilled, (state, action) => {
                state.data = action.payload;
                state.error = null;
            })
            .addCase(getChannelByEmail.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(updateChannel.fulfilled, (state, action) => {
                state.data = action.payload;
                state.error = null;
            })
            .addCase(updateChannel.rejected, (state, action) => {
                state.error = action.payload;
            })
    },
});

export default channelSlice.reducer;
