import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth.ts';
import { authService } from '../api/authService';
import { type RegisterCredentials } from '../types/auth.ts';

export const useRegister = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: async (credentials: RegisterCredentials) => {
            const response = await authService.register(credentials);

            if (!response.isSuccess) {
                throw new Error(response.errors?.join(". ") || 'Registration failed');
            }
            return response.data;
        },
        onSuccess: (data) => {
            login(data.token);
            navigate('/dashboard');
        },
        onError: (err: Error) => {
            console.error("Registration Error:", err.message);
        }
    });

    return {
        handleRegister: mutation.mutate,
        isLoading: mutation.isPending,
        errorMessage: mutation.error?.message || ''
    };
};