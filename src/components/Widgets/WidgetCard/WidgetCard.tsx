import React from "react";
import styles from "./WidgetCard.module.css";

interface WidgetCardProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

const WidgetCard = ({title, subtitle, children, onClick, className = ""}: WidgetCardProps) => {
    const cardClasses = `${styles.card} ${onClick ? styles.clickable : ""} ${className}`;

    return (
        <div className={cardClasses} onClick={onClick}>
            <div className={styles.header}>
                <div className={styles.textGroup}>
                    <h2 className={styles.title}>{title}</h2>
                    {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
                </div>
                <div className={styles.liveIndicator}/>
            </div>

            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
};
export default WidgetCard;