import React from 'react';
import styles from './ZenButton.module.css';

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
                              ...props
                          }: ZenButtonProps) => {

    const variantClass = styles[variant] || styles.solid;
    const sizeClass = styles[size] || styles.md;

    return (
        <button
            {...props}
            className={`${styles.base} ${variantClass} ${sizeClass} ${className}`}
            disabled={isLoading || props.disabled}
        >
            {isLoading ? (
                <div className={styles.loadingSpinner} />
            ) : icon ? (
                <span className={styles.icon}>{icon}</span>
            ) : null}

            {children}
        </button>
    );
};