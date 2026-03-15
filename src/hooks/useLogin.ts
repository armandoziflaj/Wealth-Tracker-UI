import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth.ts';
import { authService } from '../api/authService';
import { type ApiResponse } from '../types';
import type {AxiosError} from "axios";

export const useLogin = () => {
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (credentials: Record<string, string>) => {
        setIsLoading(true);
        setErrorMessage('');

        try {
            const response =
                await authService.login(credentials.email, credentials.password);
            if (response.isSuccess) {
                login(response.data.token);
                navigate('/dashboard');
            } else {
                setErrorMessage(response.message || 'Login failed');
            }
        } catch (err) {
            const axiosError = err as AxiosError<ApiResponse<null>>;

            const apiResponse = axiosError.response?.data;

            const message =
                apiResponse?.message ||
                "An unexpected error occurred";
            console.log(apiResponse?.errors);

            setErrorMessage(message);
        } finally {
            setIsLoading(false);
        }
    };

    return { handleLogin, errorMessage, isLoading };
};