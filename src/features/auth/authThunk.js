import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

export const login = createAsyncThunk("auth/login",
    async (email,password) => {
            const response = await axios.post("https://polity-backend.onrender.com/api/v1/users/login", { email, password })
            return response.data
    })

export const signup = createAsyncThunk("auth/signup", async (firstName, lastName, email, country, phone, password, confPassword) => {
        const response = await axios.post("http://polity-backend.onrender.com/api/v1/users/signup", {firstName, lastName, email, country, phone, password, confPassword})
        return response.data
})