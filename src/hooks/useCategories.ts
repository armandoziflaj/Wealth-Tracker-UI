import { useApiQuery } from './useApiQuery';
import {createCategory, deleteCategory, fetchCategories, fetchCategory, updateCategory} from '../api/apiCategories';
import {useMutation, useQueryClient} from "@tanstack/react-query";
import type {CategoryCreateDto, CategoryUpdateDto} from "../types/Category.ts";

export const useCategories = () => {
  return useApiQuery(
      ['categories'],
      async ({ signal }) => {
        const result = await fetchCategories(signal);

        if (!result.isSuccess) {
          throw new Error(result.errors?.join(". ") || "Failed to load categories");
        }

        return result.data;
      }
  );
};

export const useCategory = (id: number | undefined) => {
  return useApiQuery(
      ['category', id],
      async ({ signal }) => {
        const result = await fetchCategory(id!, signal);

        if (!result.isSuccess) {
          throw new Error(result.errors?.join(". ") || "Category not found");
        }

        return result.data;
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
            const result = await createCategory(newCategory);
            if (!result.isSuccess) {
                throw new Error(result.errors?.join(". ") || "Failed to create category");
            }
            return result.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
        },
    });
};

export const useUpdateCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newCategory: CategoryUpdateDto) => {
            const result = await updateCategory(newCategory);
            if (!result.isSuccess) {
                throw new Error(result.errors?.join(". ") || "Failed to create category");
            }
            return result.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
        },
    });
};

export const useDeleteCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (categoryId: number) => {
            const result = await deleteCategory(categoryId);
            if (!result.isSuccess) {
                throw new Error(result.errors?.join(". ") || "Failed to create category");
            }
            return result.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
        },
    });
};