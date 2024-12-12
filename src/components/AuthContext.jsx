import React, { createContext, useState, useContext } from 'react';

// Create a context to store the auth state
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};

// AuthProvider component to wrap around your app
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('authToken') || null);
    const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || null); // Add email state

    // Function to log in and save the token and email
    const login = (userToken, email) => {
        setToken(userToken);
        setUserEmail(email); // Set the user email

        localStorage.setItem('authToken', userToken); // Save token in localStorage
        localStorage.setItem('userEmail', email); // Save email in localStorage

    };

    // Function to log out and clear the token and email
    const logout = () => {
        setToken(null);
        setUserEmail(null); // Clear the user email
        localStorage.removeItem('authToken'); // Remove token from localStorage
        localStorage.removeItem('userEmail'); // Remove email from localStorage
   
    };

    const value = {
        token,
        userEmail, // Include user email in the context value
        isLoggedIn: !!token,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};