import { ZenGrid } from "../../components/ZenGrid.tsx";
import {type TransactionFilterDto,
} from "../../types/Transactions.ts";
import {useState} from "react";
import {useTransactions} from "../../hooks/useTransactions.tsx";
import {columns} from "./TransactionColumns.tsx";

const Transactions = () => {

    const [filters, setFilters] = useState<TransactionFilterDto>({
        searchTerm: "",
        pageNumber: 1,
        pageSize: 10,
        type: null,
    });

    const { data, isLoading } = useTransactions(filters);

    return (
        <div className="p-6 md:p-12 max-w-7xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">

            <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
                <div className="space-y-2">
                    <h1 className="text-6xl font-black italic tracking-tighter uppercase text-white leading-none">
                        Ledger <span className="text-zen-neon">Stream</span>
                    </h1>
                    <p className="text-zen-muted text-xs uppercase tracking-[0.4em] font-medium">
                        Real-time financial transaction monitoring
                    </p>
                </div>
            </header>

            <hr className="border-white/5" />

            <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative w-full md:w-96 group">

                </div>
            </div>

            <ZenGrid
                data={data?.data || []}
                columns={columns}
                isLoading={isLoading}
                currentPage={filters.pageNumber}
                totalPages={data?.totalPages || 1}
                onPageChange={(page) => setFilters(prev => ({ ...prev, pageNumber: page }))}
                onRowClick={(t) => console.log("Inspecting Node:", t.id)}
            />
        </div>
    );
};

export default Transactions;