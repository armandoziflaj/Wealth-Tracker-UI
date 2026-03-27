import * as Icons from 'lucide-react';
import { GenericForm } from './GenericForm';
import type { FormField } from "../types/form.ts";

interface FormModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    subtitle: string;
    fields: FormField[];
    submitLabel: string;
    isSubmitting: boolean;
    error?: string;
    onSubmit: (formData: Record<string, unknown>) => void;
}

export const FormModal = ({
    isOpen,
    onClose,
    title,
    subtitle,
    fields,
    submitLabel,
    isSubmitting,
    error,
    onSubmit
}: FormModalProps) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
            <div className="bg-zen-deep border border-white/10 p-10 rounded-[2.5rem] w-full max-w-lg relative shadow-2xl">
                <button
                    onClick={onClose}
                    className="absolute top-8 right-8 text-zen-muted hover:text-white transition-colors"
                >
                    <Icons.X size={20} />
                </button>

                <div className="mb-8">
                    <h2 className="text-3xl font-bold tracking-tighter text-white">{title}</h2>
                    <p className="text-zen-muted text-[10px] uppercase tracking-widest mt-1">{subtitle}</p>
                </div>

                <GenericForm
                    fields={fields}
                    submitLabel={submitLabel}
                    isLoading={isSubmitting}
                    error={error}
                    onSubmit={onSubmit}
                />
            </div>
        </div>
    );
};
