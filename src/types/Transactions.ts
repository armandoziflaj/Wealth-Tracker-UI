
export interface TransactionResponseDto {
    id: number;
    amount: number;
    description: string;
    transactionDate: string;
    type: number; // 0 = Income, 1 = Expense
    categoryId: number;
    categoryName: string;
    categoryIcon?: string;
    categoryColor?: string;
    notes?: string;
    isRecurring: boolean;
}
export interface TransactionFilterDto {
    searchTerm?: string;
    fromDate?: string;
    toDate?: string;
    type?: number | null;
    categoryId?: number | null;
    minAmount?: number;
    maxAmount?: number;
}