import type {TransactionType} from "./Transactions.ts";

export interface CategoryResponse {
    id: number;
    name: string;
    color?: string;
    type: TransactionType;
    transactionTotal: number;
}

export type CategoryCreateDto = {
    name: string;
    color: string;
    type: TransactionType;
};

export interface CategoryUpdateDto extends CategoryCreateDto {
    id: number;
}