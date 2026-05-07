import {useMutation, useQueryClient} from "@tanstack/react-query";
import {getTemplate, scanReceipt, uploadFile} from "../api/apiFile.ts";
import {handleApiError} from "./handleApiErrors.ts";

export interface IngestionResponse {
    count: number;
    provider: string;
}

export const useIngestFile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (file: File) => {
            try {
                const response = await uploadFile(file);

                if (!response.isSuccess) {
                    throw new Error(response.errors?.join('. ') || "Synchronization failed.");
                }

                return response.data;
            } catch (err) {
                return handleApiError(err);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['transactions']});
            queryClient.invalidateQueries({queryKey: ['category-summary']});
            queryClient.invalidateQueries({queryKey: ['monthly-summary']});
        }
    });
};

export const useScanReceipt = () => {
    return useMutation({
        mutationFn: async (file: File) => {
            try {
                const response = await scanReceipt(file);

                if (!response.isSuccess) {
                    throw new Error(response.errors?.join('. ') || "AI Interpretation failed.");
                }

                return response.data;
            } catch (err) {
                return handleApiError(err);
            }
        }
    });
};

export const useDownloadTemplate = () => {
    return useMutation({
        mutationFn: async () => {
            const blob = await getTemplate();

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');

            link.href = url;
            link.setAttribute('download', 'Transactions_Template.xlsx');

            // Append, trigger, and cleanup
            document.body.appendChild(link);
            link.click();
            link.parentNode?.removeChild(link);
            window.URL.revokeObjectURL(url);

            return true;
        },
        onError: (err) => {
            handleApiError(err);
        }
    });
};