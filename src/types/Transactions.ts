
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
export interface PagedResult<T> {
    items: T[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    hasNextPage: boolean;
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
export const MOCK_TRANSACTIONS: TransactionResponseDto[] = [
    { id: 1, amount: 5000, description: "Monthly Salary", transactionDate: "2026-03-01", type: 0, categoryId: 1, categoryName: "Career", isRecurring: true },
    { id: 2, amount: 150, description: "Starbucks Reserve", transactionDate: "2026-03-15", type: 1, categoryId: 2, categoryName: "Lifestyle", isRecurring: false },
    { id: 3, amount: 1200, description: "Freelance Project", transactionDate: "2026-03-10", type: 0, categoryId: 3, categoryName: "Side Hustle", isRecurring: false },
    { id: 4, amount: 80, description: "Netflix Subscription", transactionDate: "2026-03-05", type: 1, categoryId: 4, categoryName: "Entertainment", isRecurring: true },
    { id: 5, amount: 450, description: "Grocery Run", transactionDate: "2026-03-18", type: 1, categoryId: 5, categoryName: "Essentials", isRecurring: false },
];