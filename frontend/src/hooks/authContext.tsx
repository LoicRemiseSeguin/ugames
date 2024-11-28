"use client";

import { authService, LoginModel, RegisterModel } from "@/services/auth";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { setCookie, getCookie, deleteCookie } from 'cookies-next';
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
    isAuthenticated: boolean;
    undecodedToken: string | null;
    token: UserToken | null;
    register: (data: RegisterModel) => Promise<void>;
    login: (data: LoginModel) => Promise<void>;
    logout: () => void;
}

interface UserToken {
    id: string,
    username: string,
    is_admin?: boolean
};

interface AuthProviderProps {
    children: ReactNode;
};

const TOKEN_COOKIE_NAME = 'session-token';
const COOKIE_OPTIONS = {
    maxAge: 60 * 60 * 10, // 10 hours
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [undecodedToken, setUndecodedToken] = useState<string | null>(() => {
        try {
            const cookieToken = getCookie(TOKEN_COOKIE_NAME)?.valueOf();
            return cookieToken?.toString() || null;
        } catch (error) {
            console.error('Error reading cookie:', error);
            return null;
        }
    });
    const [token, setToken] = useState<UserToken | null>(() => {
        try {
            const cookieToken = getCookie(TOKEN_COOKIE_NAME)?.valueOf();
            return cookieToken ? jwtDecode<UserToken>(cookieToken) : null; //cookieToken?.toString() || null;
        } catch (error) {
            console.error('Error reading cookie:', error);
            return null;
        }
    });
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token);

    useEffect(() => {
        setIsAuthenticated(!!token);
    }, [token]);

    const register = async (registerData: RegisterModel) => {
        try {
            await authService.register(registerData);
        } catch (err) {
            console.error('Registration error:', err);
            throw err;
        }
    };

    const login = async (loginData: LoginModel) => {
        try {
            const response = await authService.login(loginData);

            if (response.token) {
                // Set cookie
                setCookie(TOKEN_COOKIE_NAME, /*JSON.stringify(response.token)*/response.token.toString(), COOKIE_OPTIONS);
                // Update state
                setToken(jwtDecode<UserToken>(response.token));
                setUndecodedToken(response.token.toString());
            } else {
                throw new Error('No token received from login response');
            }
        } catch (err) {
            console.error('Login error:', err);
            throw err;
        }
    };

    const logout = () => {
        try {
            setToken(null);
            setUndecodedToken(null);
            setIsAuthenticated(false);
            deleteCookie(TOKEN_COOKIE_NAME, COOKIE_OPTIONS);
        } catch (err) {
            console.error('Logout error:', err);
        }
    };

    const value: AuthContextType = {
        isAuthenticated,
        undecodedToken,
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