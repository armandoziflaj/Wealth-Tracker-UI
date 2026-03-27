export interface CategoryResponse {
    id: number;
    name: string;
    color?: string;
    icon?: string;
    type: 'expense' | 'income';
}

export interface CategoryCreateDto {
    name: string;
    color?: string;
    icon?: string;
}

export interface CategoryUpdateDto extends CategoryCreateDto {
    id: number;
}