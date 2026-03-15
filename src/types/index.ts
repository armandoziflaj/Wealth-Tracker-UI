export interface ApiResponse<T> {
    isSuccess: boolean;
    data: T;
    message: string;
    errors?: string[];
}
export interface AuthData {
    token: string;
}
export type CategoryData = { name: string; value: number; fill: string };
export type MonthlyData = { name: string; revenue: number; expenses: number };
