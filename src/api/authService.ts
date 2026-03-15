import apiClient from './apiClient';
import { type RegisterCredentials } from '../types/auth';
import { type ApiResponse, type AuthData } from '../types';

export const authService = {
    login: async (email: string, password: string): Promise<ApiResponse<AuthData>> => {
        const response =
            await apiClient.post<ApiResponse<AuthData>>('/auth/login', { email, password });
        return response.data;
    },
    register: async (credentials : RegisterCredentials): Promise<ApiResponse<AuthData>> => {
        const response =
            await apiClient.post<ApiResponse<AuthData>>('/auth/register', credentials);
        return response.data;
    }
};