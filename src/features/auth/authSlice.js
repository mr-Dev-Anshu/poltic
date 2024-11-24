import { createSlice } from "@reduxjs/toolkit";
import { login, signup } from "./authThunk";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.loading= true;
            state.error= null;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.loading=false;
            state.data = action.payload.data;
        })
        .addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(signup.pending, (state) => {
            state.loading= true;
            state.error= null;
        })
        .addCase(signup.fulfilled, (state, action) => {
            state.loading=false;
            state.data = action.payload.data;
        })
        .addCase(signup.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    },
})

export default authSlice.reducer;