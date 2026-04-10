import {useState} from "react";
import {ZenFilterBar, type FilterField} from "../../components/FilterBar/FilterBar.tsx";
import type {TransactionFilterDto} from "../../types/Transactions.ts";
import styles from './DashBoard.module.css';
import LineChartW from "../../components/Widgets/LineChart.tsx";
import {useCategorySummary, useFilteredTransactions, useMonthlySummary} from "../../hooks/useTransactions.ts";
import SpendingPie from "../../components/Widgets/SpendingPie/SpendingPie.tsx";
import WidgetCard from "../../components/Widgets/WidgetCard/WidgetCard.tsx";
import TransactionWidget from "../../components/Widgets/TransactionWidget /TransactionsWidget.tsx";
import {GenericModal} from "../../components/GenericModal/GenericModal.tsx";
import {PageHeader} from "../../components/PageHeader/PageHeader.tsx";

const DASHBOARD_FILTERS: FilterField<TransactionFilterDto>[] = [
    {id: 'fromDate', label: 'From Date', type: 'date'},
    {id: 'toDate', label: 'To Date', type: 'date'},
];

const DashBoard = () => {
    const [filterValues, setFilterValues] = useState<TransactionFilterDto>({
        fromDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        toDate: new Date(),
        pageNumber: 1,
        pageSize: 20
    });

    const {
        data: transactionsResponse,
        isLoading: isTransactionsLoading,
        refetch: refetchTransactions,
        isError: isTransactionsError
    } = useFilteredTransactions(filterValues);

    const {
        data: summaryResponse,
        isLoading: isSummaryLoading,
        isError: isSummaryError
    } = useMonthlySummary();

    const {
        data: categorySummaryResponse,
        isLoading: isCategoryLoading,
        isError: isCategoryError
    } = useCategorySummary();

    const transactions = transactionsResponse?.data ?? [];
    const monthlySummary = summaryResponse?.data ?? [];
    const categorySummary = categorySummaryResponse?.data ?? {
        protocolFlow: [],
        categoryExpenseAllocation: [],
        categoryIncomeAllocation: []
    };

    const [isPieExpanded, setIsPieExpanded] = useState(false);

    const globalLoading = isTransactionsLoading || isSummaryLoading || isCategoryLoading;

    return (
        <div className={styles.dashboard}>
            <PageHeader
                title="DASH"
                accentTitle="BOARD"
                subtitle="Real-time financial intelligence"
            />

            <ZenFilterBar<TransactionFilterDto>
                fields={DASHBOARD_FILTERS}
                values={filterValues}
                onChange={(id, val) => setFilterValues(prev => ({...prev, [id]: val}))}
                onApply={refetchTransactions}
            />

            {globalLoading ? (
                <div className={styles.loadingContainer}>
                    <div className={styles.spinner}></div>
                </div>
            ) : isTransactionsError || isSummaryError || isCategoryError ? (
                <div className={styles.noDataContainer}>
                    <p className={styles.noDataText}>
                        No intelligence found for the selected period
                    </p>
                    <button
                        className={styles.refreshButton}
                    >
                        Refresh Dashboard
                    </button>
                </div>
            ) : (
                <div className={styles.grid}>
                    <WidgetCard
                        title="Protocol Trends"
                        subtitle="Global Intelligence"
                        className={styles.span8}
                    >
                        <LineChartW data={monthlySummary}/>
                    </WidgetCard>

                    <WidgetCard
                        title="Allocation"
                        subtitle="Sector Distribution"
                        className={`${styles.span4} ${styles.clickable}`}
                        onClick={() => setIsPieExpanded(true)}
                    >
                        <div style={{pointerEvents: 'none', height: '100%', width: '100%'}}>
                            <SpendingPie data={categorySummary.protocolFlow}/>
                        </div>
                    </WidgetCard>

                    <WidgetCard
                        title="Live Stream"
                        subtitle="Real-time Data Nodes"
                        className={styles.span12}
                    >
                        <TransactionWidget transactions={transactions}/>
                    </WidgetCard>
                </div>
            )}
            <GenericModal
                isOpen={isPieExpanded}
                onClose={() => setIsPieExpanded(false)}
                title="sector intelligence"
                subtitle="detailed allocation breakdown"
            >
                <div className={styles.expandedcontainer} key={isPieExpanded ? 'open' : 'closed'}>
                    <div className={styles.modalchart}>
                        <h3 className={styles.modaltitle}>inflow distribution</h3>
                        <div className={styles.piewrapper}>
                            <SpendingPie data={categorySummary.categoryIncomeAllocation}/>
                        </div>
                    </div>

                    <div className={styles.modalchart}>
                        <h3 className={styles.modaltitle}>outflow distribution</h3>
                        <div className={styles.piewrapper}>
                            <SpendingPie data={categorySummary.categoryExpenseAllocation}/>
                        </div>
                    </div>
                </div>
            </GenericModal>
        </div>
    );
}

export default DashBoard;