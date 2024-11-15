"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type RegisterData = {
    email: string;
    password: string;
    // other fields...
}

type LoginData = {
    email: string;
    password: string;
}

type ServerResponse = {
    success: boolean;
    message: string;
    token: string;
}

interface AuthContextType {
    isAuthenticated: boolean;
    token: string | null;
    register: (data: RegisterData) => Promise<void>;
    login: (data: LoginData) => Promise<void>;
    logout: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [token, setToken] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token);

    useEffect(() => {
        setIsAuthenticated(!!token);
    }, [token]);

    const register = async (data: RegisterData) => {
        fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                // First check the HTTP status
                if (!response.ok) {
                    // If status is not 2xx, throw an error with status
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                // Parse the JSON response
                return response.json();
            })
            .then((responseData: ServerResponse) => {
                // Handle successful signup
                if (responseData.success) {
                    console.log('Register successful:', responseData.message);
                    setToken(responseData.token);
                    // You might want to redirect or update UI state here

                } else {
                    console.error('Register failed:', responseData.message);

                }
            })
            .catch(error => {
                // Handle network errors or parsing errors
                console.error('Error during Register:', error.message);
                // You might want to show an error message to the user here
            });
    };

    const login = async (data: LoginData) => {
        fetch('/api/login', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                // First check the HTTP status
                if (!response.ok) {
                    // If status is not 2xx, throw an error with status
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                // Parse the JSON response
                return response.json();
            })
            .then((responseData: ServerResponse) => {
                // Handle successful signup
                if (responseData.success) {
                    console.log('Login successful:', responseData.message);
                    setToken(responseData.token);
                    // You might want to redirect or update UI state here

                } else {
                    console.error('Login failed:', responseData.message);

                }
            })
            .catch(error => {
                // Handle network errors or parsing errors
                console.error('Error during Login:', error.message);
                // You might want to show an error message to the user here
            });
    };

    const logout = () => {
        setToken(null);
    };

    const value: AuthContextType = {
        isAuthenticated,
        token,
        register,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );

};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};