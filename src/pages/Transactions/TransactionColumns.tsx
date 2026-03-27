import type {Column} from "../../components/ZenGrid.tsx";
import type {TransactionResponseDto} from "../../types/Transactions.ts";

export const columns: Column<TransactionResponseDto>[] = [
    {
        header: 'Entity',
        render: (t) => (
            <div className="flex flex-col">
            <span className="font-bold text-white tracking-tight" >{t.description}
    {t.isRecurring &&
        <span className="text-[10px] text-zen-neon"> 🔄</span>}
</span>
<span className="text-[9px] text-zen-muted uppercase tracking-[0.2em] font-black">
    {t.categoryName || 'General Node'}
    </span>
    </div>
)
},
{
    header: 'Timeline',
        render: (t) => (
    <span className="text-xs font-medium text-white/40 italic">
        {t.transactionDate}
        </span>
)
},
{
    header: 'Flow State',
        render: (t) => (
    <div className="flex items-center gap-2">
    <div className={`w-1.5 h-1.5 rounded-full ${t.type === 0 ? 'bg-zen-neon animate-pulse' : 'bg-rose-500 animate-pulse'}`} />
<span className={`text-[10px] font-black uppercase tracking-widest ${t.type === 0 ? 'text-zen-neon' : 'text-rose-500'}`}>
    {t.type === 0 ? 'Inflow' : 'Outflow'}
    </span>
    </div>
)
},
{
    header: 'Value',
        className: 'text-right',
    render: (t) => (
    <div className="flex flex-col items-end">
    <span className={`text-lg font-black italic tracking-tighter ${t.type === 0 ? 'text-zen-neon' : 'text-rose-500'}`}>
    {t.type === 0 ? '+' : '-'}${t.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
    </span>
    </div>
)
}
];