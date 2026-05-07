import {GenericForm} from '../GenericForm/GenericForm.tsx';
import type {FormField} from "../../types/form.ts";
import {GenericModal} from "../GenericModal/GenericModal.tsx";

interface FormModalProps<T> {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    subtitle?: string;
    fields: FormField[];
    submitLabel: string;
    isSubmitting: boolean;
    error?: string;
    onSubmit: (formData: T) => void | Promise<void>;
}

export const FormModal = <T extends Record<string, unknown>>({
                                                                 isOpen,
                                                                 onClose,
                                                                 title,
                                                                 subtitle,
                                                                 fields,
                                                                 submitLabel,
                                                                 isSubmitting,
                                                                 error,
                                                                 onSubmit,
                                                             }: FormModalProps<T>) => {
    return (
        <GenericModal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            subtitle={subtitle}
            size="md"
        >
            <GenericForm<T>
                fields={fields}
                submitLabel={submitLabel}
                isLoading={isSubmitting}
                error={error}
                onSubmit={onSubmit}
            />
        </GenericModal>
    );
};