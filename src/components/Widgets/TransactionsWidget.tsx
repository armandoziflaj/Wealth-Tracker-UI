interface Transaction {
    id: number;
    amount: number;
    description: string;
    transactionDate: string;
    type: number; // 0 = Income, 1 = Expense
    categoryId: number;
    categoryName: string;
    categoryIcon?: string;
    categoryColor?: string;
    notes?: string;
    isRecurring: boolean;
}

const TransactionWidget = ({ transactions }: { transactions: Transaction[] }) => {
    return (
            <div className="space-y-3 overflow-y-auto h-full pr-2">
                {transactions.map((t) => (
                    <div
                        key={t.id}
                        className="group flex items-center justify-between p-3 rounded-xl bg-white/2 border border-white/5 hover:bg-white/5 transition-all"
                    >
                        <div className="flex items-center gap-4">
                            <div
                                className="w-10 h-10 rounded-lg flex items-center justify-center text-xl shadow-sm"
                                style={{ backgroundColor: `${t.categoryColor}20`, color: t.categoryColor }}
                            >
                                {t.categoryIcon || '💰'}
                            </div>

                            <div>
                                <h4 className="text-sm font-bold text-white group-hover:text-zen-neon transition-colors">
                                    {t.description}
                                </h4>
                                <div className="flex items-center gap-2">
                                    <p className="text-[10px] text-zen-muted uppercase tracking-widest">
                                        {t.categoryName}
                                    </p>
                                    {t.isRecurring && <span className="text-[10px] text-zen-neon">🔄</span>}
                                </div>
                            </div>
                        </div>

                        <div className="text-right">
                            <p className={`text-sm font-black ${t.type === 0 ? 'text-zen-neon' : 'text-rose-500'}`}>
                                {t.type === 0 ? '+' : '-'}${Math.abs(t.amount).toLocaleString()}
                            </p>
                            <p className="text-[9px] text-zen-muted uppercase">
                                {new Date(t.transactionDate).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
    );
};

export default TransactionWidget;