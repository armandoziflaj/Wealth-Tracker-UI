import api from './apiClient.ts';
import type {TransactionFilterDto, TransactionResponseDto} from "../types/Transactions.ts";
import type {PaginatedResponse} from "../types";

export const fetchFilteredTransactions = async (
        filters: TransactionFilterDto,
        signal?: AbortSignal
    ) : Promise<PaginatedResponse<TransactionResponseDto>> => {
        const response = await api.post('/api/transactions', filters, {
            signal
        });
        return response.data;
    };