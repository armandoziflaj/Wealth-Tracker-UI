export interface FormField {
    id: string;
    label: string;
    type: 'text' | 'email' | 'password' | 'number';
    placeholder?: string;
    required?: boolean;
    width?: 'full' | 'half';
    autocomplete?: string;
}

export interface GenericFormProps {
    fields: FormField[];
    onSubmit: (data: Record<string, string>) => void | Promise<void>;
    submitLabel: string;
    isLoading?: boolean;
    error?: string | null;
}