import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth.ts';
import { authService } from '../api/authService';
import { type RegisterCredentials } from '../types/auth.ts';
import { type ApiResponse } from '../types';
import axios, { AxiosError } from "axios";

export const useRegister = () => {
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { login } = useAuth();

    const navigate = useNavigate();

    const handleRegister = async (credentials: RegisterCredentials) => {
        setIsLoading(true);
        setErrorMessage('');

        try {
            const response = await authService.register(credentials);

            if (response.isSuccess ) {
                login(response.data.token);
                navigate('/dashboard');
            } else {
                setErrorMessage(response.message || 'Registration failed');
            }
        } catch (err) {

            if (axios.isAxiosError(err)) {
                const axiosError = err as AxiosError<ApiResponse<null>>;
                const apiResponse = axiosError.response?.data;

                const message =
                    apiResponse?.message ||
                    "An unexpected error occurred";
                console.log(apiResponse?.errors);

                setErrorMessage(message);
            } else {
                setErrorMessage("Check your internet connection.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return { handleRegister, errorMessage, isLoading };
};