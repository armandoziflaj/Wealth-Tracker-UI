import api from '../api/apiClient';
import type {TransactionFilterDto} from "../types/Transactions.ts";

export const fetchFilteredTransactions = async (filters: TransactionFilterDto) => {
    const response = await api.get('/transactions/filter', { params: filters });
    return response.data;
};