import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("AuthContext: Checking for token...");
        try {
            const token = localStorage.getItem('token');
            if (token) {
                console.log("AuthContext: Token found.");
                const payload = JSON.parse(atob(token.split('.')[1]));
                setUser({ username: payload.sub, token });
            } else {
                console.log("AuthContext: No token found.");
            }
        } catch (e) {
            console.error("AuthContext: Error processing token. Removing it.", e);
            localStorage.removeItem('token');
        } finally {
            console.log("AuthContext: Finished loading.");
            setLoading(false);
        }
    }, []);

    const login = async (username, password) => {
        const response = await api.post('/auth/signin', { username, password });
        const { token } = response.data;
        localStorage.setItem('token', token);
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser({ username: payload.sub, token });
    };

    const signup = async (userData) => {
        const { email, ...signupData } = userData;
        await api.post('/auth/signup', signupData);
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete api.defaults.headers.common['Authorization'];
        setUser(null);
    };

    const value = {
        user,
        loading,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};