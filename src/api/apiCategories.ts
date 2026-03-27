import api from './apiClient.ts';
import type { CategoryCreateDto, CategoryUpdateDto, CategoryResponse } from "../types/Category.ts";
import type { BaseResponse } from "../types";

export const fetchCategories = async (signal?: AbortSignal): Promise<BaseResponse<CategoryResponse[]>> => {
    const response = await api.get<BaseResponse<CategoryResponse[]>>('/category', { signal });
    return response.data;
};

export const fetchCategory = async (id: number, signal?: AbortSignal): Promise<BaseResponse<CategoryResponse>> => {
    const response = await api.get<BaseResponse<CategoryResponse>>(`/category/${id}`, { signal });
    return response.data;
};

export const createCategory = async (data: CategoryCreateDto, signal?: AbortSignal): Promise<BaseResponse<CategoryResponse>> => {
    const response = await api.post<BaseResponse<CategoryResponse>>('/category', data, { signal });
    return response.data;
};

export const updateCategory = async (data: CategoryUpdateDto, signal?: AbortSignal): Promise<BaseResponse<CategoryResponse>> => {
    const response = await api.put<BaseResponse<CategoryResponse>>(`/category/update`, data, { signal });
    return response.data;
};

export const deleteCategory = async (id: number, signal?: AbortSignal): Promise<BaseResponse<void>> => {
    const response = await api.delete<BaseResponse<void>>(`/category/${id}`, { signal });
    return response.data;
};