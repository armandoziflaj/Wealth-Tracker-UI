import { ZenButton } from './ZenButton';

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
        <div className="bg-zen-card p-5 md:p-6 rounded-3xl border border-white/5 flex flex-col md:flex-row md:items-end gap-6 md:gap-10 mb-8 shadow-2xl">

            <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8 flex-1">
                {fields.map((field) => {
                    const currentValue = values[field.id] as FilterValue;

                    return (
                        <div key={String(field.id)} className="flex flex-col gap-2.5 w-full md:w-auto">
                            {/* Label */}
                            <label className="text-[9px] font-black tracking-[0.2em] text-zen-muted uppercase pl-0.5">
                                {field.label}
                            </label>

                            {/* Date Input */}
                            {field.type === 'date' && (
                                <input
                                    type="date"
                                    className="bg-zen-input border border-white/5 rounded-xl px-4 py-3 md:py-2 text-[12px] md:text-[11px] text-white/90 outline-none uppercase appearance-none scheme-dark transition-all focus:border-zen-neon/30 w-full md:w-40 cursor-pointer"
                                    value={(currentValue as string) ?? ''}
                                    onChange={(e) => onChange(field.id, e.target.value)}
                                />
                            )}

                            {/* Search Input */}
                            {field.type === 'search' && (
                                <input
                                    type="text"
                                    placeholder={field.placeholder ?? 'SEARCH...'}
                                    className="bg-zen-input border border-white/5 rounded-xl px-4 py-3 md:py-2 text-[12px] md:text-[11px] text-white outline-none uppercase focus:border-zen-neon/30 transition-all w-full md:min-w-45"
                                    value={(currentValue as string) ?? ''}
                                    onChange={(e) => onChange(field.id, e.target.value)}
                                />
                            )}

                            {field.type === 'tabs' && (
                                <div className="flex bg-zen-input p-1 rounded-xl border border-white/5 w-full md:w-auto">
                                    {field.options?.map((opt) => (
                                        <button
                                            key={String(opt.value)}
                                            type="button"
                                            onClick={() => onChange(field.id, opt.value)}
                                            className={`flex-1 md:flex-none px-4 py-2 md:py-1.5 rounded-lg text-[9px] font-bold transition-all 
                                                ${currentValue === opt.value
                                                ? 'bg-zen-neon text-black shadow-neon-glow'
                                                : 'text-zen-muted hover:text-white'}`}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Apply Button: Full width on mobile, auto on desktop */}
            <div className="w-full md:w-auto md:ml-auto">
                <ZenButton
                    type="button" // Important to prevent form submission
                    variant="solid"
                    onClick={onApply}
                    className="w-full md:w-auto bg-zen-neon hover:opacity-90 text-black font-black text-[10px] px-6 py-4 md:py-2.5 rounded-xl uppercase tracking-widest shadow-neon-glow transition-all active:scale-95"
                >
                    Apply Filters
                </ZenButton>
            </div>
        </div>
    );
};