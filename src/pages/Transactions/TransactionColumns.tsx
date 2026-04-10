import styles from "./TransactionsColumns.module.css";
import type {TransactionResponseDto} from "../../types/Transactions.ts";
import type {Column} from "../../components/ZenGrid.tsx";
import {TransactionType} from "../../types/Transactions.ts";

export const columns: Column<TransactionResponseDto>[] = [
    {
        header: 'Transaction Node',
        render: (t) => (
            <div className={styles.nodeWrapper}>
                <span className={styles.description}>
                    {t.description}
                    {t.isRecurring && <span style={{marginLeft: '8px', opacity: 0.5}}>🔄</span>}
                </span>
                <span className={styles.categoryTag}>
                    {t.categoryName || 'General Terminal'}
                </span>
            </div>
        )
    },
    {
        header: 'Timeline',
        render: (t) => (
            <span className={styles.timestamp}>
                {new Date(t.transactionDate).toLocaleDateString(undefined, {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                })}
            </span>
        )
    },
    {
        header: 'Protocol',
        render: (t) => {
            const isIncome = t.type === TransactionType.Income;
            const color = isIncome ? 'var(--accent)' : '#ff4d4d';

            return (
                <div className={styles.protocolBadge} style={{
                    color: color,
                    borderColor: isIncome ? 'rgba(198, 255, 94, 0.15)' : 'rgba(255, 77, 77, 0.15)'
                }}>
                    <div
                        className={styles.colorIndicator}
                        style={{backgroundColor: color}}
                    />
                    {isIncome ? 'Inflow' : 'Outflow'}
                </div>
            );
        }
    },
    {
        header: 'Value',
        render: (t) => {
            const isIncome = t.type === TransactionType.Income;

            return (
                <span>
                    {isIncome ? '+' : '-'}${t.amount.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })}
                </span>
            );
        }
    }
];