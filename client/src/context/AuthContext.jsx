import React, { createContext, useContext, useState } from "react";

// Initial state for the context
const authContext = createContext({
    userId: null,
    token: null,
    setUserId: () => { },
    setToken: () => { },
});

// Reusable hook for localStorage state
const useLocalStorage = (key, initialValue) => {
    const [state, setState] = useState(() => {
        try {
            return localStorage.getItem(key) || initialValue;
        } catch (error) {
            console.error(`Error accessing localStorage for key "${key}":`, error);
            return initialValue;
        }
    });

    const setLocalStorage = (value) => {
        try {
            setState(value);
            if (value) {
                localStorage.setItem(key, value);
            } else {
                localStorage.removeItem(key);
            }
        } catch (error) {
            console.error(`Error setting localStorage for key "${key}":`, error);
        }
    };

    return [state, setLocalStorage];
};

// Context Provider
export const ContextProvider = ({ children }) => {

    // User Id and Token Configuration
    const [userId, setUserId] = useLocalStorage("ACCESS_USER_ID", null);
    const [token, setToken] = useLocalStorage("ACCESS_TOKEN", null);



    return (
        <authContext.Provider value={{ userId, token, setUserId, setToken }}>
            {children}
        </authContext.Provider>
    );
};

// Custom Hook
export const useAuthContext = () => {
    const context = useContext(authContext);
    if (!context) {
        throw new Error("useAuthContext must be used within a ContextProvider");
    }
    return context;
};
