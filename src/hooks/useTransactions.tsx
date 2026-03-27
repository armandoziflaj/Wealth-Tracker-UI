import {fetchFilteredTransactions} from "../api/apiTransactions.ts";
import {useApiQuery} from "./useApiQuery.ts";
import type {TransactionFilterDto} from "../types/Transactions.ts";

export const useTransactions = (filters: TransactionFilterDto) => {
    return useApiQuery(
        ['transactions', filters],
        async ({ signal }) => {
            const result = await fetchFilteredTransactions(filters, signal);

            if (!result.isSuccess) {
                throw new Error(result.errors?.join('. ') || "An unknown error occurred.");            }
            return result;
        },
        {
            retry: false,
        }
    );
};