import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth.ts';
import { authService } from '../api/authService';

export const useLogin = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: async (credentials: Record<string, string>) => {

            const response = await authService.login({
                email: credentials.email,
                password: credentials.password
            });

            if (!response.isSuccess) {
                throw new Error(response.errors?.join(". ") || 'Login failed');
            }

            return response.data;
        },
        onSuccess: (data) => {
            login(data.token);
            navigate('/dashboard');
        },
        onError: (err: Error) => {
            console.error("Login Error:", err.message);
        }
    });

    return {
        handleLogin: mutation.mutate,
        isLoading: mutation.isPending,
        errorMessage: mutation.error?.message || ''
    };
};