import { useState, useEffect, useMemo } from "react";
import PieComponent from "../../components/Widgets/PieComponent.tsx";
import LineChartW from "../../components/Widgets/LineChart.tsx";
import WidgetCard from "../../components/Widgets/WidgetCard.tsx";
import TransactionWidget from "../../components/Widgets/TransactionsWidget.tsx";
import { ZenFilterBar, type FilterField } from "../../components/FilterBar.tsx";
import { fetchFilteredTransactions } from "../../hooks/getTransactions.ts";
import type { TransactionFilterDto, TransactionResponseDto } from "../../types/Transactions.ts";
import { transformTransactionData } from "../../hooks/transformTransactionData.ts";

const DASHBOARD_FILTERS: FilterField<TransactionFilterDto>[] = [
    { id: 'fromDate', label: 'From Date', type: 'date' },
    { id: 'toDate', label: 'To Date', type: 'date' },
];

const DashBoard = () => {
    const [filterValues, setFilterValues] = useState<TransactionFilterDto>({
        fromDate: new Date().toISOString().split('T')[0],
        toDate: new Date().toISOString().split('T')[0],
    });

    const [transactions, setTransactions] = useState<TransactionResponseDto[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleFetchData = async () => {
        setIsLoading(true);
        try {
            const data = await fetchFilteredTransactions(filterValues);
            setTransactions(data);
        } catch (error) {
            console.error("Dashboard Fetch Error:", error);
            setTransactions([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        handleFetchData().then(() => console.log("Fetched Transactions"));
    }, []);

    const hasData = transactions.length > 0;

    const cashFlowData = useMemo(() =>
            transformTransactionData(transactions, 'monthly'),
        [transactions]);

    const incomeData = useMemo(() =>
            transformTransactionData(transactions.filter(t => t.type === 0), 'category'),
        [transactions]);

    const expenseData = useMemo(() =>
            transformTransactionData(transactions.filter(t => t.type === 1), 'category'),
        [transactions]);

    return (
        <div className="min-h-screen bg-zen-deep p-8 pt-28 text-white selection:bg-zen-neon selection:text-black">
            <header className="mb-10">
                <h1 className="text-4xl font-black italic tracking-tighter text-white">
                    DASH<span className="text-zen-neon">BOARD</span>
                </h1>
                <p className="text-zen-muted text-xs uppercase tracking-[0.3em] mt-1">
                    Real-time financial intelligence
                </p>
            </header>

            <ZenFilterBar<TransactionFilterDto>
                fields={DASHBOARD_FILTERS}
                values={filterValues}
                onChange={(id, val) => setFilterValues(prev => ({ ...prev, [id]: val }))}
                onApply={handleFetchData}
            />

            {isLoading ? (
                <div className="flex items-center justify-center h-64 ">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-zen-neon"></div>
                </div>
            ) : !hasData ? (
                <div className="flex flex-col items-center justify-center h-64 w-full bg-zen-card rounded-2xl border border-white/5 border-dashed shadow-inner">
                <p className="text-zen-muted uppercase tracking-[0.2em] text-[10px] font-black text-center px-6">
                No intelligence found for the selected period
                </p>
                <button
                onClick={handleFetchData}
            className="mt-4 text-zen-neon text-[10px] underline underline-offset-4 uppercase font-black hover:text-white transition-colors"
        >
            Refresh Dashboard
        </button>
</div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <WidgetCard title="Cash Flow Analysis">
                        <LineChartW data={cashFlowData} />
                    </WidgetCard>

                    <WidgetCard title="Income Breakdown">
                        <PieComponent data={incomeData} />
                    </WidgetCard>

                    <WidgetCard title="Expense Breakdown">
                        <PieComponent data={expenseData} />
                    </WidgetCard>

                    <div className="lg:col-span-2">
                        <WidgetCard title="Recent Transactions">
                            <TransactionWidget transactions={transactions} />
                        </WidgetCard>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DashBoard;