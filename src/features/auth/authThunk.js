import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

export const login = createAsyncThunk("auth/login",
    async (email,password) => {
        const response = await axios.post("https://polity-backend.onrender.com/api/v1/users/login", { email, password })

            return response.data
    })


    
    export const signup = createAsyncThunk(
        "auth/signup",
        async ({ firstName, lastName, email, country, phone, password }, { rejectWithValue }) => {
            try {
                const response = await axios.post(
                    "https://polity-backend.onrender.com/api/v1/users/signup",
                    { firstName, lastName, email, country, phone, password },
                    { withCredentials: true } // Ensures cookies are sent and stored
                );
                return response.data;
            } catch (error) {
                const errorMessage = error.response?.data?.message || "Something went wrong";
                return rejectWithValue(errorMessage); 
            }
        }
    );


    export const fetchCurrentUser = createAsyncThunk(
        "auth/getCurrentUser",
        async (_, { rejectWithValue }) => {
            try {
                const response = await axios.get("https://polity-backend.onrender.com/api/v1/users/current", {
                    withCredentials: true,
                });
                console.log(response.data)
                return response.data;
            } catch (error) {
                const errorMessage = error.response?.data?.message || "Failed to fetch current user";
                return rejectWithValue(errorMessage);
            }
        }
    );