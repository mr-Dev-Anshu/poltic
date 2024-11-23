import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

export const loginUser = createAsyncThunk("auth/login",
    async ({ email, password }, { rejectWithVal }) => {
        try {
            const response = await axios.post("https://polity-backend.onrender.com/api/v1/users/login", { email, password })
            return response.data
        } catch (error) {
            return rejectWithVal(error.response.data.message || "Login Failed")
        }
    })

export const signupUser = createAsyncThunk("auth/signup", async ({firstName, lastName, email, country, phone, password, confPassword}, {rejectWithVal}) => {
    try{
        const response = await axios.post("http://polity-backend.onrender.com/api/v1/users/signup", {firstName, lastName, email, country, phone, password, confPassword})
        return response.data
    } catch(error) {
        return rejectWithVal(error.response.data.message || "SignUp Failed")
    }
})