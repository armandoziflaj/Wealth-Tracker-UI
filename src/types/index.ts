export interface BaseResponse<T> {
    isSuccess: boolean;
    data: T;
    errors: string[];
}

export interface PaginatedResponse<T> extends BaseResponse<T[]> {
    totalCount: number;
    totalPages: number;
    pageNumber: number;
    pageSize: number;
}

export interface AuthData {
    token: string;
}

export type CategoryData = {
    name: string;
    value: number;
    fill: string;
};

export interface DashboardData {
    protocolFlow: CategoryData[];
    categoryExpenseAllocation: CategoryData[];
    categoryIncomeAllocation: CategoryData[];
}

export type MonthlyData = {
    name: string;
    revenue: number;
    expenses: number
};
