import axios from "axios";
import type {BaseResponse} from "../types";

export const handleApiError = (err: unknown): never => {
    if (axios.isAxiosError<BaseResponse<unknown>>(err)) {
        const serverMessage = err.response?.data?.errors?.join(". ");
        throw new Error(serverMessage || "A server error occurred");
    }

    if (err instanceof Error) {
        throw err;
    }

    throw new Error("An unexpected error occurred");
};