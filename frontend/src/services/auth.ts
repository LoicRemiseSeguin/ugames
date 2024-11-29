import { fetchWrapper } from '@/api/fetchWrapper';

export interface RegisterModel {
    email: string,
    username: string,
    first_name: string,
    last_name: string,
    password_hash: string
};

export interface LoginModel {
    username: string,
    password: string
};

export const authService = {

    login: (loginData: LoginModel) => {
        return fetchWrapper('/api/users/login', {
            method: 'POST',
            body: loginData
        });
    },

    register: (registerData: RegisterModel) => {
        return fetchWrapper('/api/users', {
            method: 'POST',
            body: registerData
        });
    }
};