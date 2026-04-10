import styles from './PageHeader.module.css';
import React from "react";

interface PageHeaderProps {
    title: string;
    accentTitle?: string;
    subtitle: string;
    action?: React.ReactNode;
}

export const PageHeader = ({title, accentTitle, subtitle, action}: PageHeaderProps) => (
    <header className={styles.header}>
        <div className={styles.textGroup}>
            <h1 className={styles.title}>
                {title} {accentTitle && <span>{accentTitle}</span>}
            </h1>
            <p className={styles.subtitle}>{subtitle}</p>
        </div>
        {action && <div className={styles.action}>{action}</div>}
    </header>
);