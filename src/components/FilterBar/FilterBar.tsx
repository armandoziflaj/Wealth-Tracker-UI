import {ZenButton} from '../ZenButton.tsx';
import styles from './FilterBar.module.css';

type FilterValue = string | number | boolean | null | undefined;

interface FilterOption {
    label: string;
    value: FilterValue;
}

export interface FilterField<T> {
    id: keyof T;
    label: string;
    type: 'tabs' | 'date' | 'select' | 'search';
    options?: FilterOption[];
    placeholder?: string;
}

interface ZenFilterBarProps<T> {
    fields: FilterField<T>[];
    values: T;
    onChange: (id: keyof T, value: FilterValue) => void;
    onApply: () => void;
}

export const ZenFilterBar = <T extends object>({
                                                   fields,
                                                   values,
                                                   onChange,
                                                   onApply
                                               }: ZenFilterBarProps<T>) => {
    return (
        <div className={styles.filterBar}>
            <div className={styles.fieldsContainer}>
                {fields.map((field) => {
                    const currentValue = values[field.id] as FilterValue;

                    return (
                        <div key={String(field.id)} className={styles.field}>
                            <label className={styles.label}>
                                {field.label}
                            </label>

                            {field.type === 'date' && (
                                <input
                                    type="date"
                                    className={`${styles.input} ${styles.dateInput}`}
                                    value={(currentValue as string) || ''}
                                    onChange={(e) => onChange(field.id, e.target.value)}
                                />
                            )}

                            {field.type === 'search' && (
                                <input
                                    type="text"
                                    placeholder={field.placeholder ?? 'SEARCH...'}
                                    className={`${styles.input} ${styles.searchInput}`}
                                    value={(currentValue as string) || ''}
                                    onChange={(e) => onChange(field.id, e.target.value)}
                                />
                            )}

                            {field.type === 'tabs' && (
                                <div className={styles.tabsContainer}>
                                    {field.options?.map((opt) => (
                                        <button
                                            key={String(opt.value)}
                                            type="button"
                                            onClick={() => onChange(field.id, opt.value)}
                                            className={`${styles.tabButton} ${currentValue === opt.value ? styles.active : ''}`}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}

                <div className={styles.applyButtonContainer}>
                    <ZenButton
                        type="button"
                        variant="solid"
                        onClick={onApply}
                        className={styles.applyButton}
                    >
                        Apply Filters
                    </ZenButton>
                </div>
            </div>
        </div>
    );
};