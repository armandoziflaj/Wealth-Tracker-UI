import styles from "./CategoriesColumns.module.css";
import type {CategoryResponse} from "../../types/Category.ts";
import type {Column} from "../../components/ZenGrid.tsx";
import {TransactionType} from "../../types/Transactions.ts";

export const columns: Column<CategoryResponse>[] = [
    {
        header: 'Vault Node',
        render: (cat) => (
            <div className={styles.nodeWrapper}>
                <div
                    className={styles.colorIndicator}
                    style={{backgroundColor: cat.color}}
                />
                <span className={styles.nodeName}>{cat.name}</span>
            </div>
        )
    },
    {
        header: 'Protocol',
        render: (cat) => {
            const isExpense = cat.type === TransactionType.Expense;
            return (
                <span className={styles.protocolBadge} style={{
                    color: isExpense ? '#ff4d4d' : 'var(--accent)',
                    borderColor: isExpense ? 'rgba(255, 77, 77, 0.15)' : 'rgba(198, 255, 94, 0.15)'
                }}>
                    {isExpense ? 'Expense' : 'Income'}
                </span>
            );
        }
    },
    {
        header: 'Vault Balance',
        render: (cat: CategoryResponse) => {
            const symbol = cat.transactionTotal === 0 ? '' : (cat.type === 0 ? '-' : '+');

            return (
                <span style={{
                    color: cat.transactionTotal > 0 ? 'var(--text-main)' : 'var(--text-dim)',
                    fontWeight: 800,
                    fontFamily: 'JetBrains Mono, monospace',
                    letterSpacing: '-0.02em'
                }}>
                {symbol}${cat.transactionTotal.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })}
            </span>
            );
        }
    },
    {
        header: 'Signature',
        render: (cat) => (
            <span className={styles.hexCode}>
                {cat.color}
            </span>
        )
    }
];