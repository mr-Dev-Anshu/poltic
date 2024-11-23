import { createSlice } from "@reduxjs/toolkit";
import { loginUser, signupUser } from "./authThunk";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token:null,
        isLoading: false,
        error: null,
    },
    reducers: {
        logout(state) {
            state.user = null;
            state.token = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.isLoading= true;
            state.error= null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading=false;
            state.user = action.payload.user;
            state.token = action.payload.token;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
        .addCase(signupUser.pending, (state) => {
            state.isLoading= true;
            state.error= null;
        })
        .addCase(signupUser.fulfilled, (state, action) => {
            state.isLoading=false;
            state.user = action.payload.user;
            state.token = action.payload.token;
        })
        .addCase(signupUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
    },
})

export const { logout } = authSlice.actions;
export default authSlice.reducer;