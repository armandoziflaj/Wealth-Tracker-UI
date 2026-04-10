import {useState} from "react";
import {ZenGrid} from "../../components/ZenGrid.tsx";
import {
    type TransactionCreateDto,
    type TransactionFilterDto, type TransactionType,
    type TransactionUpdateDto
} from "../../types/Transactions.ts";
import {
    useFilteredTransactions,
    useCreateTransaction,
    useUpdateTransaction, useDeleteTransaction,
    // useDeleteTransaction
} from "../../hooks/useTransactions.ts";
import {useCategories} from "../../hooks/useCategories.ts"; // Needed for the Category dropdown
import {columns} from "./TransactionColumns.tsx";
import {PageHeader} from "../../components/PageHeader/PageHeader.tsx";
import styles from './Transactions.module.css';
import {ZenButton} from "../../components/ZenButton.tsx";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import {FormModal} from "../../components/FormModal/FormModal.tsx";
import type {FormField} from "../../types/form.ts";

const Transactions = () => {
    const [filters, setFilters] = useState<TransactionFilterDto>({
        searchTerm: "",
        pageNumber: 1,
        pageSize: 10,
        type: null,
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState<TransactionUpdateDto | null>(null);

    // 2. Hooks
    const {data, isLoading} = useFilteredTransactions(filters);
    const {data: categories} = useCategories();
    const createMutation = useCreateTransaction();
    const updateMutation = useUpdateTransaction();
    const deleteMutation = useDeleteTransaction();

    const transactionFields: FormField[] = [
        {id: 'amount', label: 'Amount', type: 'number', required: true, defaultValue: selectedTransaction?.amount || 0},
        {
            id: 'description',
            label: 'Description',
            type: 'text',
            required: true,
            defaultValue: selectedTransaction?.description || ''
        },
        {
            id: 'transactionDate',
            label: 'Date',
            type: 'datetime',
            required: true,
            defaultValue: selectedTransaction?.transactionDate || new Date().toISOString().split('T')[0]
        },
        {
            id: 'type',
            label: 'Type',
            type: 'select',
            options: [{label: 'Expense', value: '0'}, {label: 'Income', value: '1'}],
            defaultValue: selectedTransaction?.type?.toString() || '0'
        },
        {
            id: 'categoryId',
            label: 'Vault (Category)',
            type: 'select',
            options: categories?.map(c => ({label: c.name, value: c.id.toString()})) || [],
            defaultValue: selectedTransaction?.categoryId?.toString() || ''
        },
        {id: 'notes', label: 'Internal Notes', type: 'text', defaultValue: selectedTransaction?.notes || ''},
        {
            id: 'isRecurring',
            label: 'Recurring Node',
            type: 'bool',
            defaultValue: selectedTransaction?.isRecurring ? 'true' : 'false',
            width: 'full'
        },
    ];

    const handleFormSubmit = async (values: TransactionCreateDto) => {
        const payload: TransactionUpdateDto = {
            id: selectedTransaction?.id || 0,
            amount: Number(values.amount),
            description: String(values.description),
            transactionDate: String(values.transactionDate),
            type: Number(values.type) as TransactionType,
            categoryId: Number(values.categoryId),
            notes: String(values.notes || ""),
            isRecurring: Boolean(values.isRecurring),
        };

        if (selectedTransaction?.id) {
            await updateMutation.mutateAsync({...payload, id: selectedTransaction.id});
        } else {
            await createMutation.mutateAsync(payload);
        }
        setIsModalOpen(false);
        setSelectedTransaction(null);
    };

    return (
        <div className={styles.container}>
            <PageHeader
                title="TRANS"
                accentTitle="ACTIONS"
                subtitle="Real-time financial transaction monitoring"
                action={
                    <div className={styles.buttonGroup}>
                        <ZenButton
                            variant="outline"
                            size="sm"
                            disabled={!selectedTransaction?.id}
                            onClick={() => {
                                if (selectedTransaction?.id) deleteMutation.mutate(selectedTransaction.id);
                                setSelectedTransaction(null);
                            }}
                        >
                            <DeleteForeverOutlinedIcon/>
                        </ZenButton>
                        <ZenButton
                            variant="outline"
                            size="sm"
                            disabled={!selectedTransaction?.id}
                            onClick={() => setIsModalOpen(true)}
                        >
                            <ModeOutlinedIcon/>
                        </ZenButton>
                        <ZenButton
                            variant="solid"
                            size="sm"
                            onClick={() => {
                                setSelectedTransaction(null);
                                setIsModalOpen(true);
                            }}
                        >
                            <AddOutlinedIcon/>
                        </ZenButton>
                    </div>
                }
            />

            <ZenGrid
                data={data?.data || []}
                columns={columns}
                isLoading={isLoading}
                currentPage={filters.pageNumber}
                totalPages={data?.totalPages || 1}
                onPageChange={(page) => setFilters(prev => ({...prev, pageNumber: page}))}
                selectedRowId={selectedTransaction?.id}
                onRowClick={(row) => {
                    const updateData: TransactionUpdateDto = {
                        ...row,
                        transactionDate: row.transactionDate ? row.transactionDate.substring(0, 16) : '',
                        type: row.type as TransactionType,
                        id: row.id,
                        amount: Number(row.amount),
                        categoryId: Number(row.categoryId),
                        isRecurring: !!row.isRecurring
                    };
                    setSelectedTransaction(updateData);
                }}
            />

            <FormModal<TransactionCreateDto>
                key={selectedTransaction?.id ?? 'create'}
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedTransaction(null);
                }}
                title={selectedTransaction ? "Edit Transaction" : "New Entry"}
                submitLabel={selectedTransaction ? "Synchronize" : "Commit to Ledger"}
                fields={transactionFields}
                isSubmitting={createMutation.isPending || updateMutation.isPending}
                onSubmit={handleFormSubmit}
            />
        </div>
    );
};

export default Transactions;