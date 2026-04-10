export interface TransactionResponseDto {
    id: number;
    amount: number;
    description: string;
    transactionDate: string;
    type: number;
    categoryId: number;
    categoryName: string;
    categoryIcon?: string;
    categoryColor?: string;
    notes?: string;
    isRecurring: boolean;
}

export interface TransactionFilterDto {
    searchTerm?: string;
    fromDate?: Date;
    toDate?: Date;
    type?: number | null;
    categoryId?: number | null;
    minAmount?: number;
    maxAmount?: number;
    pageNumber: number;
    pageSize: number;
}

export interface TransactionCreateDto {
    amount: number;
    description: string;
    transactionDate: string;
    type: TransactionType;
    categoryId: number;
    notes?: string;
    isRecurring: boolean;

    [key: string]: unknown;
}

export interface TransactionUpdateDto extends TransactionCreateDto {
    id: number;
}

export const TransactionType = {
    Expense: 0,
    Income: 1,
} as const;
export type TransactionType = typeof TransactionType[keyof typeof TransactionType];