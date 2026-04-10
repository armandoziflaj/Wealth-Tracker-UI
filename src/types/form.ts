export interface FormField {
    id: string;
    label: string;
    type: 'text' | 'email' | 'password' | 'number' | 'color' | 'select' | 'datetime' | 'date' | 'bool';
    placeholder?: string;
    required?: boolean;
    width?: 'full' | 'half';
    autocomplete?: string;
    defaultValue?: string | number | boolean | null;
    options?: { value: string | number; label: string }[];
}

export interface GenericFormProps<T> {
    fields: FormField[];
    submitLabel: string;
    isLoading: boolean;
    error?: string;
    onSubmit: (data: T) => void | Promise<void>;
}