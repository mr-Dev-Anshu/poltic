import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base URL configuration
// const BASE_URL = "http://localhost:9000/api/v1"; // Local
// Uncomment this line and comment the above line for production
const BASE_URL = "https://polity-backend.onrender.com/api/v1";

// Login
export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/users/login`,
                { email, password },
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            console.log(error)
            const errorMessage = error.response?.data?.message || "Something went wrong";
            return rejectWithValue(errorMessage);
        }
    } 
);

// Signup
export const signup = createAsyncThunk(
    "auth/signup",
    async ({ firstName, lastName, email, country, phone, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/users/signup`,
                { firstName, lastName, email, country, phone, password },
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Something went wrong";
            return rejectWithValue(errorMessage);
        }
    }
);

// Fetch Current User
export const fetchCurrentUser = createAsyncThunk(
    "auth/getCurrentUser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/users/current`, {
                withCredentials: true,
            });
            // console.log(response.data)
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to fetch current user";
            console.log(errorMessage)
            return rejectWithValue(errorMessage);
        }
    }
);

// Logout
export const logout = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/users/logout`,
                {},
                { withCredentials: true }
            )
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Something went wrong while logging out";
            return rejectWithValue(errorMessage);
        }
    }
);


export const updateProfile = createAsyncThunk('auth/update', async ( {id , updates }  , {rejectWithValue} )=> {
    try {
        console.log("this is from updates " , updates)
        const response = await axios.put(`${BASE_URL}/users/update?id=${id}` , updates , {withCredentials:true}); 
         return response.data ; 
    } catch (error) {
       const errorMessage = error.response?.data?.message || "Somethign went worng while updating the profile"
       return rejectWithValue(errorMessage); 
    }
})