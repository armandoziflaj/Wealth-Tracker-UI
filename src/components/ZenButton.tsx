import React from 'react';

interface ZenButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'solid' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    icon?: React.ReactNode;
}

export const ZenButton = ({
                              children,
                              variant = 'solid',
                              size = 'md',
                              isLoading,
                              icon,
                              className = '',
                              ...props // 1. Collect all remaining props (like onClick) here
                          }: ZenButtonProps) => {

    const baseStyles = "inline-flex items-center justify-center font-bold tracking-wider transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none uppercase text-[10px]";
    const roundedStyles = "rounded-2xl";

    const variants = {
        solid: "bg-zen-neon text-black shadow-neon-glow hover:shadow-neon-hover hover:-translate-y-0.5",
        outline: "bg-transparent border-2 border-zen-neon text-zen-neon hover:bg-zen-neon/10",
        ghost: "bg-transparent text-zen-muted hover:text-white hover:bg-white/5"
    };

    const sizes = {
        sm: "px-4 py-2 text-[9px] tracking-[0.1em]",
        md: "px-6 py-3.5 text-[10px] tracking-[0.2em]",
        lg: "px-10 py-5 text-[16px] font-black tracking-[0.25em]"
    };

    return (
        <button
            {...props}
            className={`${baseStyles} ${roundedStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={isLoading || props.disabled}
        >
            {isLoading ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
            ) : icon ? (
                <span className="mr-2">{icon}</span>
            ) : null}

            {children}
        </button>
    );
};