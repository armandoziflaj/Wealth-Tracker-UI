import { useState } from 'react';
import { AuthInput } from './AuthInput';
import { type GenericFormProps } from '../types/form.ts';
import {ZenButton} from "./ZenButton.tsx";

export const GenericForm = ({ fields, onSubmit, submitLabel, isLoading, error }: GenericFormProps) => {
    const [formData, setFormData] = useState<Record<string, string>>({});

    const handleChange = (id: string, value: string) => {
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    return (
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="space-y-6">
            {error && <div className="bg-red-500/10 p-3 rounded-xl text-red-500 text-sm">{error}</div>}

            <div className="grid grid-cols-2 gap-4">
                {fields.map((field) => (
                    <div
                        key={field.id}
                        className={field.width === 'half' ? 'col-span-1' : 'col-span-2'}
                    >
                        <AuthInput
                            label={field.label}
                            type={field.type}
                            placeholder={field.placeholder}
                            value={formData[field.id] || ''}
                            onChange={(val) => handleChange(field.id, val)}
                            name={field.id}
                            required={field.required}
                        />
                    </div>
                ))}
            </div>

            <ZenButton
                type="submit"
                variant="solid"
                isLoading={isLoading}
                className="w-full mt-6"
                size="lg"
            >
                {submitLabel}
            </ZenButton>
        </form>
    );
};