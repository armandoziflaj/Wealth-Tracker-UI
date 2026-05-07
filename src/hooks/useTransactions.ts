import {
    createTransaction,
    deleteTransaction,
    fetchCategorySummary,
    fetchFilteredTransactions,
    fetchMonthlySummary,
    updateTransaction
} from "../api/apiTransactions.ts";
import {useApiQuery} from "./useApiQuery.ts";
import type {TransactionCreateDto, TransactionFilterDto, TransactionUpdateDto} from "../types/Transactions.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {handleApiError} from "./handleApiErrors.ts";

export const useFilteredTransactions = (filters: TransactionFilterDto) => {
    return useApiQuery(
        ['transactions', filters],
        async ({signal}) => {
            try {
                const result = await fetchFilteredTransactions(filters, signal);

                if (!result.isSuccess) {
                    throw new Error(result.errors?.join('. ') || "An unknown error occurred.");
                }
                return result;
            } catch (err) {
                return handleApiError(err);
            }
        },
        {
            retry: false,
        }
    );
};

export const useCreateTransaction = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (transaction: TransactionCreateDto) => {
            try {
                const result = await createTransaction(transaction);

                if (!result.isSuccess) {
                    throw new Error(result.errors?.join('. ') || "Failed to commit transaction.");
                }
                return result.data;
            } catch (err) {
                return handleApiError(err);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['transactions']});
            queryClient.invalidateQueries({queryKey: ['categorySummary']});
            queryClient.invalidateQueries({queryKey: ['monthlySummary']});
        }
    });
};

export const useUpdateTransaction = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (transaction: TransactionUpdateDto) => {
            try {
                const result = await updateTransaction(transaction);

                if (!result.isSuccess) {
                    throw new Error(result.errors?.join('. ') || "Failed to update transaction.");
                }
                return result.data;
            } catch (err) {
                return handleApiError(err);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['transactions']});
            queryClient.invalidateQueries({queryKey: ['categorySummary']});
            queryClient.invalidateQueries({queryKey: ['monthlySummary']});
        }
    });
};

export const useDeleteTransaction = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (transactionId: number) => {
            try {
                return await deleteTransaction(transactionId);
            } catch (err) {
                return handleApiError(err);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['transactions']});
        },
    });
};

export const useMonthlySummary = () => {
    return useApiQuery(
        ['monthly-summary'],
        async ({signal}) => {
            try {
                const result = await fetchMonthlySummary(signal);

                if (!result.isSuccess) {
                    throw new Error(result.errors?.join('. ') || "Failed to fetch monthly summary.");
                }
                return result;
            } catch (err) {
                return handleApiError(err);
            }
        },
        {
            retry: false,
        }
    );
};

export const useCategorySummary = () => {
    return useApiQuery(
        ['category-summary'],
        async ({signal}) => {
            try {
                const result = await fetchCategorySummary(signal);

                if (!result.isSuccess) {
                    throw new Error(result.errors?.join('. ') || "Failed to fetch category summary.");
                }
                return result;
            } catch (err) {
                return handleApiError(err);
            }
        },
        {
            retry: false,
        }
    );
};