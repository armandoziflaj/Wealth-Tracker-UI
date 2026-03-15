import type {CategoryData, MonthlyData} from "../types";
import type {TransactionResponseDto} from "../types/Transactions.ts";

export function transformTransactionData(
    transactions: TransactionResponseDto[],
    mode: 'category'
): CategoryData[];

export function transformTransactionData(
    transactions: TransactionResponseDto[],
    mode: 'monthly'
): MonthlyData[];

export function transformTransactionData(
    transactions: TransactionResponseDto[],
    mode: 'category' | 'monthly'
) {
    if (!transactions || transactions.length === 0) {
        return [];
    }
    if (mode === 'category') {
        const categoryMap = transactions.reduce((acc, curr) => {
            const name = curr.categoryName;
            if (!acc[name]) {
                acc[name] = {
                    name,
                    value: 0,
                    fill: curr.categoryColor || '#9CA3AF'
                };
            }
            acc[name].value += curr.amount;
            return acc;
        }, {} as Record<string, CategoryData>);

        return Object.values(categoryMap);
    }

    const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const monthlyMap = transactions.reduce((acc, curr) => {
        const date = new Date(curr.transactionDate);
        const monthName = monthLabels[date.getMonth()];

        if (!acc[monthName]) {
            acc[monthName] = { name: monthName, revenue: 0, expenses: 0 };
        }

        if (curr.type === 0) acc[monthName].revenue += curr.amount;
        else acc[monthName].expenses += curr.amount;

        return acc;
    }, {} as Record<string, MonthlyData>);

    return monthLabels
        .filter(m => monthlyMap[m])
        .map(m => monthlyMap[m]);
}