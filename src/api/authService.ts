import type {AuthData, BaseResponse} from "../types";
import type {RegisterCredentials} from "../types/auth.ts";
import apiClient from "./apiClient.ts";

export const authService = {
    login: async (
        credentials: { email: string; password: string },
        signal?: AbortSignal
    ): Promise<BaseResponse<AuthData>> => {
        const response = await apiClient.post<BaseResponse<AuthData>>(
            '/auth/login',
            credentials,
            { signal }
        );
        return response.data;
    },

    register: async (
        credentials: RegisterCredentials,
        signal?: AbortSignal
    ): Promise<BaseResponse<AuthData>> => {
        const response = await apiClient.post<BaseResponse<AuthData>>(
            '/auth/register',
            credentials,
            { signal }
        );
        return response.data;
    }
};