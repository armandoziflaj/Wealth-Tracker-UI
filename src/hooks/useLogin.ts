import {useMutation} from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom';
import {useAuth} from './useAuth.ts';
import {authService} from '../api/authService';
import {handleApiError} from "./handleApiErrors.ts";

export const useLogin = () => {
    const {login} = useAuth();
    const navigate = useNavigate();

    const loginMutation = useMutation({
        mutationFn: async (credentials: Record<string, string>) => {
            const response = await authService.login({
                email: credentials.email,
                password: credentials.password
            });
            if (!response.isSuccess) throw new Error(response.errors?.join(". ") || 'Login failed');
            return response.data;
        },
        onSuccess: (data) => {
            login(data.token);
            navigate('/dashboard');
        }
    });

    const googleMutation = useMutation({
        mutationFn: async (googleToken: string) => {
            try {
                const response = await authService.googleLogin({googleToken});

                if (!response.isSuccess) {
                    throw new Error(response.errors?.join(". ") || 'Google Auth failed');
                }

                return response.data;
            } catch (err) {
                return handleApiError(err);
            }
        },
        onSuccess: (data) => {
            login(data.token);
            navigate('/dashboard');
        },
        onError: (err: Error) => {
            console.error("Google Protocol Error:", err.message);
        }
    });

    return {
        handleLogin: loginMutation.mutate,
        handleGoogleLogin: googleMutation.mutate, // Αυτό θα καλέσεις στο onSuccess του GoogleLogin button
        isLoading: loginMutation.isPending || googleMutation.isPending,
        errorMessage: loginMutation.error?.message || googleMutation.error?.message || ''
    };
};