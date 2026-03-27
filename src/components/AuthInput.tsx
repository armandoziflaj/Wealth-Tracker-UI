interface AuthInputProps {
    label: string;
    value: string;
    onChange: (val: string) => void;
    type?: string;
    placeholder?: string;
    name: string;
    required?: boolean;
    autoComplete?: string;
}

export const AuthInput = ({
                              label,
                              value,
                              onChange,
                              type = 'text',
                              placeholder,
                              name,
                              required = false,
                              autoComplete,
                              ...props
                          }: AuthInputProps) => {
    return (
        <div className="flex flex-col gap-2 w-full">
            <label className="text-zen-muted text-[10px] uppercase tracking-[0.2em] font-bold ml-1">
                {label} {required && <span className="text-zen-neon">*</span>}
            </label>
            <input
                {...props}
                name={name}
                type={type}
                value={value}
                required={required}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                className="bg-zen-input border border-white/5 rounded-xl px-5 py-4 text-white
                           focus:outline-none focus:border-zen-neon/40 transition-all"
                autoComplete={autoComplete}
            />
        </div>
    );
};