import type {GenericFormProps} from "../../types/form.ts";
import {useState} from "react";
import {ZenButton} from "../ZenButton.tsx";
import styles from './GenericForm.module.css';
import TextField from '@mui/material/TextField';
import {ColorSelector} from "../ColorSelector/ColorSelector.tsx";
import {FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch} from "@mui/material";


export const GenericForm = <T extends Record<string, unknown>>({
                                                                   fields,
                                                                   onSubmit,
                                                                   submitLabel,
                                                                   isLoading,
                                                                   error,
                                                                   ...rest
                                                               }: GenericFormProps<T>) => {
    const [formData, setFormData] = useState<Record<string, string>>(() => {
        const initial: Record<string, string> = {};

        fields.forEach(f => {
            if (f.defaultValue !== undefined && f.defaultValue !== null) {
                if (f.type === 'datetime' && typeof f.defaultValue === 'string') {
                    initial[f.id] = f.defaultValue.substring(0, 16);
                } else if (f.type === 'bool') {
                    initial[f.id] = String(f.defaultValue);
                } else {
                    initial[f.id] = String(f.defaultValue);
                }
            } else {
                if (f.type === 'datetime') {
                    const now = new Date();
                    const offset = now.getTimezoneOffset() * 60000;
                    initial[f.id] = new Date(now.getTime() - offset).toISOString().substring(0, 16);
                } else if (f.type === 'date') {
                    initial[f.id] = new Date().toISOString().split('T')[0];
                } else if (f.type === 'color') {
                    initial[f.id] = '#94A3B8';
                } else if (f.type === 'bool') {
                    initial[f.id] = 'false';
                } else {
                    initial[f.id] = '';
                }
            }
        });

        return initial;
    });

    const handleChange = (id: string, value: string) => {
        setFormData(prev => ({...prev, [id]: value}));
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit(formData as unknown as T);
            }}
            className={styles.form}
            {...rest}
        >
            {error && <div className={styles.error}>{error}</div>}

            <div className={styles.fieldsGrid}>
                {fields.map((field) => (
                    <div
                        key={field.id}
                        className={field.width === 'half' ? styles.halfWidth : styles.fullWidth}
                    >
                        {field.type === 'color' ? (
                            <ColorSelector
                                selectedColor={formData[field.id] || '#9CA3AF'}
                                onSelect={(color) => handleChange(field.id, color)}
                            />
                        ) : field.type === 'select' ? (
                            <FormControl fullWidth variant="outlined" className={styles.zenInput}>
                                <InputLabel
                                    id={`${field.id}-label`}
                                    required={field.required}>{field.label}
                                </InputLabel>
                                <Select
                                    labelId={`${field.id}-label`}
                                    id={field.id}
                                    value={formData[field.id] || ''}
                                    label={field.label}
                                    onChange={(e) => handleChange(field.id, e.target.value)}
                                    className={styles.zenSelect}
                                    MenuProps={{
                                        classes: {paper: styles.zenDropdown}
                                    }}
                                    required={field.required}
                                >
                                    {field.options?.map((option) => (
                                        <MenuItem key={option.value} value={option.value} className={styles.zenItem}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        ) : field.type === 'bool' ? (
                            <div className={styles.switchWrapper}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={formData[field.id] === 'true'}
                                            onChange={(e) => handleChange(field.id, e.target.checked ? 'true' : 'false')}
                                            color="primary"
                                            className={styles.zenSwitch}
                                        />
                                    }
                                    label={field.label}
                                    className={styles.switchLabel}
                                />
                            </div>
                        ) : field.type === 'datetime' ? (
                            <TextField
                                label={field.label}
                                type="datetime-local"
                                value={formData[field.id] || ''}
                                onChange={(e) => handleChange(field.id, e.target.value)}
                                required={field.required}
                                fullWidth
                                placeholder={field.placeholder}
                                variant="outlined"
                                className={styles.zenInput}
                            />
                        ) : field.type === 'date' ? (
                            <TextField
                                label={field.label}
                                type="date"
                                value={formData[field.id] || ''}
                                onChange={(e) => handleChange(field.id, e.target.value)}
                                required={field.required}
                                fullWidth
                                variant="outlined"
                                className={styles.zenInput}
                            />
                        ) : (
                            <TextField
                                label={field.label}
                                type={field.type}
                                placeholder={field.placeholder}
                                value={formData[field.id] || ''}
                                onChange={(val) => handleChange(field.id, val.target.value)}
                                name={field.id}
                                required={field.required}
                                autoComplete={field.autocomplete}
                                fullWidth
                                variant="outlined"
                                className={styles.zenInput}
                            />
                        )}
                    </div>
                ))}
            </div>

            <ZenButton
                type="submit"
                variant="solid"
                isLoading={isLoading}
                className={styles.submitButton}
                size="lg"
            >
                {submitLabel}
            </ZenButton>
        </form>
    );
};