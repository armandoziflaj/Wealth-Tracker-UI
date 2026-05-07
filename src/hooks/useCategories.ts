import {useApiQuery} from './useApiQuery';
import {createCategory, deleteCategory, fetchCategories, fetchCategory, updateCategory} from '../api/apiCategories';
import {useMutation, useQueryClient} from "@tanstack/react-query";
import type {CategoryCreateDto, CategoryUpdateDto} from "../types/Category.ts";
import {handleApiError} from "./handleApiErrors.ts";

export const useCategories = () => {
    return useApiQuery(
        ['categories'],
        async ({signal}) => {
            try {
                const result = await fetchCategories(signal);

                if (!result.isSuccess) {
                    throw new Error(result.errors?.join(". ") || "Failed to load categories");
                }

                return result.data;
            } catch (err) {
                return handleApiError(err);
            }
        }
    );
};

export const useCategory = (id: number | undefined) => {
    return useApiQuery(
        ['category', id],
        async ({signal}) => {
            try {
                const result = await fetchCategory(id!, signal);

                if (!result.isSuccess) {
                    throw new Error(result.errors?.join(". ") || "Category not found");
                }
                return result.data;
            } catch (err) {
                return handleApiError(err);
            }
        },
        {
            enabled: !!id,
        }
    );
};
export const useCreateCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newCategory: CategoryCreateDto) => {
            try {
                const result = await createCategory(newCategory);

                if (!result.isSuccess) {
                    throw new Error(result.errors?.join(". ") || "Failed to create category");
                }

                return result.data;
            } catch (err) {
                return handleApiError(err);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['categories']});
        },
    });
};

export const useUpdateCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newCategory: CategoryUpdateDto) => {
            try {
                const result = await updateCategory(newCategory);
                if (!result.isSuccess) {
                    throw new Error(result.errors?.join(". ") || "Failed to update category");
                }
                return result.data;
            } catch (err) {
                return handleApiError(err);
            }

        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['categories']});
        },
    });
};

export const useDeleteCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (categoryId: number) => {
            try {
                const result = await deleteCategory(categoryId);
                if (!result.isSuccess) {
                    throw new Error(result.errors?.join(". ") || "Failed to delete category");
                }
                return result.data;
            } catch (err) {
                return handleApiError(err);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['categories']});
        },
    });
};