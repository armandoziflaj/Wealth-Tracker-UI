import api from './apiClient.ts';
import type {
    TransactionCreateDto,
    TransactionFilterDto,
    TransactionResponseDto,
    TransactionUpdateDto
} from "../types/Transactions.ts";
import type {BaseResponse, CategoryData, DashboardData, MonthlyData, PaginatedResponse} from "../types";

export const fetchFilteredTransactions = async (
    filters: TransactionFilterDto,
    signal?: AbortSignal
): Promise<PaginatedResponse<TransactionResponseDto>> => {
    const response = await api.get('/Transaction/GetFilteredTransactions', {
        params: filters,
        signal
    });
    return response.data;
};

export const createTransaction = async (
    transaction: TransactionCreateDto,
    signal?: AbortSignal
): Promise<BaseResponse<TransactionCreateDto>> => {
    const response = await api.post('/Transaction', transaction, {signal});
    return response.data;
};

export const updateTransaction = async (
    transaction: TransactionUpdateDto,
    signal?: AbortSignal
): Promise<BaseResponse<TransactionUpdateDto>> => {
    const response = await api.put('/Transaction', transaction, {signal});
    return response.data;
};

export const deleteTransaction = async (
    transactionId: number,
    signal?: AbortSignal
): Promise<BaseResponse<boolean>> => {
    const response = await api.delete(`/Transaction/${transactionId}`, {signal});
    return response.data;
};
export const fetchMonthlySummary = async (signal?: AbortSignal): Promise<BaseResponse<MonthlyData[]>> => {
    const response = await api.get('/Transaction/GetMonthlySummary', {signal});
    return response.data;
};

export const fetchCategorySummary = async (
    signal?: AbortSignal
): Promise<BaseResponse<DashboardData>> => {

    const response = await api.get('/Transaction/GetCategorySummary', {
        signal
    });

    return response.data;
};