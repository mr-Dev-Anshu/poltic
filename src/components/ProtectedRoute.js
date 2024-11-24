import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
    const { data: currentUser, loading } = useSelector((state) => state.auth);

    if (loading) {
        // Show a loading state until the user data is fully fetched
        return <div>Loading...</div>;
    }

    if (!currentUser) {
        // If not logged in after loading, redirect to login
        return <Navigate to="/login" replace />;
    }

    // If the user is logged in, render the children
    return children;
};

export default ProtectedRoute;
