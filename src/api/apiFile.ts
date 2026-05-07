import type {BaseResponse} from "../types";
import apiClient from "./apiClient.ts";
import type {TransactionCreateDto} from "../types/Transactions.ts";

export interface IngestionResponse {
    count: number;
    provider: string;
}

export const uploadFile = async (file: File): Promise<BaseResponse<IngestionResponse>> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post<BaseResponse<IngestionResponse>>('/File', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
};

export const scanReceipt = async (file: File): Promise<BaseResponse<TransactionCreateDto>> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post<BaseResponse<TransactionCreateDto>>('/File/PostAI', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
};
export const getTemplate = async (): Promise<Blob> => {
    const response = await fetch('http://localhost:5043/api/file/template');

    if (!response.ok) throw new Error("Template fetch failed.");

    return await response.blob();
};