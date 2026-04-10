import styles from "./TransactionWidget.module.css";

interface Transaction {
    id: number;
    amount: number;
    description: string;
    transactionDate: string;
    type: number;
    categoryName: string;
    categoryColor?: string;
    isRecurring: boolean;
}

const TransactionWidget = ({transactions}: { transactions: Transaction[] }) => {
    return (
        <div className={styles.container}>
            {transactions.length === 0 ? (
                <div className={styles.emptyState}>No Data Cycles Detected</div>
            ) : (
                transactions.map((t) => (
                    <div key={t.id} className={styles.row}>
                        <div className={styles.leftSection}>
                            <div
                                className={styles.accentBar}
                                style={{backgroundColor: t.categoryColor || 'var(--accent)'}}
                            />

                            <div className={styles.info}>
                                <h4 className={styles.description}>{t.description}</h4>
                                <div className={styles.meta}>
                                    <span className={styles.categoryName}>{t.categoryName}</span>
                                    {t.isRecurring && <span className={styles.recurringLabel}>Recursive</span>}
                                </div>
                            </div>
                        </div>

                        <div className={styles.rightSection}>
                            <div className={styles.amountWrapper}>
                                <span className={`${styles.amount} ${t.type === 0 ? styles.expense : styles.income}`}>
                                    {t.type === 0 ? '+' : '-'}${Math.abs(t.amount).toLocaleString()}
                                </span>
                            </div>
                            <span className={styles.date}>
                                {new Date(t.transactionDate).toLocaleDateString(undefined, {
                                    month: 'short',
                                    day: 'numeric'
                                })}
                            </span>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default TransactionWidget;