import {useState} from "react";
import {ZenGrid} from "../../components/ZenGrid/ZenGrid.tsx";
import {
    RecursionType,
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
import {useCategories} from "../../hooks/useCategories.ts";
import {columns} from "./TransactionColumns.tsx";
import {PageHeader} from "../../components/PageHeader/PageHeader.tsx";
import styles from './Transactions.module.css';
import {ZenButton} from "../../components/ZenButton/ZenButton.tsx";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ScannerOutlinedIcon from '@mui/icons-material/ScannerOutlined';
import {FormModal} from "../../components/FormModal/FormModal.tsx";
import type {FormField} from "../../types/form.ts";
import {useZenStore} from "../../components/ZenStore.tsx";
import FileDragDrop from "../../components/FileUploadComponent/FileUpload.tsx";
import {GenericModal} from "../../components/GenericModal/GenericModal.tsx";
import {useScanReceipt} from "../../hooks/useFileIntegration.ts";
import {Typography} from "@mui/material";

const Transactions = () => {
    const notify = useZenStore((state) => state.notify);
    const [filters, setFilters] = useState<TransactionFilterDto>({
        searchTerm: "",
        pageNumber: 1,
        pageSize: 10,
        type: null,
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState<TransactionUpdateDto | null>(null);
    const [isScannerOpen, setIsScannerOpen] = useState(false);
    const {data, isLoading} = useFilteredTransactions(filters);
    const {data: categories} = useCategories();
    const createMutation = useCreateTransaction();
    const updateMutation = useUpdateTransaction();
    const deleteMutation = useDeleteTransaction();

    const handleDelete = async () => {
        if (!selectedTransaction?.id) return;

        try {
            await deleteMutation.mutateAsync(selectedTransaction.id);
            notify("Transaction node purged successfully.", "success", "Success");
            setSelectedTransaction(null);
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Failed to purge transaction.";
            notify(msg, "error", "Operation Aborted");
        }
    };

    const transactionFields: FormField[] = [
        {
            id: 'amount',
            label: 'Amount',
            type: 'number',
            required: true,
            step: '0.01',
            placeholder: '0.00',
            defaultValue: selectedTransaction?.amount || 0.00
        },
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
            options: [
                {label: 'Expense', value: '0'},
                {label: 'Income', value: '1'}],
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
        {
            id: 'recursionTime',
            label: 'Recursion Time',
            type: 'select',
            options: Object.keys(RecursionType).map(key => ({
                label: key,
                value: RecursionType[key as keyof typeof RecursionType].toString()
            })),
            defaultValue: selectedTransaction?.recursionTime?.toString() ?? '2',
            width: 'full',
            showIf: (values: Record<string, unknown>) => values.isRecurring === true || values.isRecurring === 'true',
        },
    ];

    const handleFormSubmit = async (values: TransactionCreateDto) => {
        try {
            const rawValues = values as unknown as Record<string, string>;
            const isRecurring = rawValues.isRecurring === 'true';

            const payload: TransactionUpdateDto = {
                id: selectedTransaction?.id || 0,
                amount: Number(rawValues.amount),
                description: String(rawValues.description),
                transactionDate: String(rawValues.transactionDate),
                type: Number(rawValues.type) as TransactionType,
                categoryId: Number(rawValues.categoryId),
                notes: String(rawValues.notes || ""),
                isRecurring: isRecurring,
                recursionTime: isRecurring && rawValues.recursionTime
                    ? (Number(rawValues.recursionTime) as RecursionType)
                    : undefined
            };

            if (selectedTransaction?.id) {
                await updateMutation.mutateAsync({...payload, id: selectedTransaction.id});
                notify("Transaction node synchronized.", "success", "Success");
            } else {
                await createMutation.mutateAsync(payload);
                notify("New entry committed to ledger.", "success", "Success");
            }

            setIsModalOpen(false);
            setSelectedTransaction(null);
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Protocol synchronization failed.";
            notify(msg, "error", "Fail");
            console.log(err);
        }
    };

    const scanMutation = useScanReceipt();
    const handleReceiptUpload = async (file: File) => {
        try {
            const aiData = await scanMutation.mutateAsync(file);
            setSelectedTransaction({
                ...aiData,
                id: 0,
                transactionDate: aiData.transactionDate?.substring(0, 16),
            });
            setIsScannerOpen(false);
            setIsModalOpen(true);

            notify("Neural link synchronized. Please verify details.", "success", "Scan Success");
        } catch {
            // React Query / handleApiError handles the error notification usually,
            // but you can add extra logic here.
        }
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
                            onClick={() => setIsScannerOpen(true)}
                        >
                            <ScannerOutlinedIcon/>
                        </ZenButton>
                        <ZenButton
                            variant="outline"
                            size="sm"
                            disabled={!selectedTransaction?.id || deleteMutation.isPending}
                            onClick={() => {
                                handleDelete()
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

            <GenericModal
                isOpen={isScannerOpen}
                onClose={() => setIsScannerOpen(false)}
                title="Receipt Scanner"
                subtitle="AI RECEIPT INTERPRETATION"
            >
                <Typography
                    variant="body2"
                    sx={{color: 'var(--text-dim)', textAlign: 'center', mb: 3, fontSize: '0.9rem'}}
                >
                    Upload receipts individually. Our neural engine will extract the ledger data
                    and a form will open automatically. Please validate the data and submit.
                </Typography>
                <FileDragDrop
                    isLoading={scanMutation.isPending}
                    onFileSelect={handleReceiptUpload}
                    mainLabel="Upload receipt image"
                    subLabel="JPEG, PNG or WEBP formats"
                    loadingLabel="Syncing data with AI agent! Please wait!"
                    accept={{
                        'image/jpeg': ['.jpg', '.jpeg'],
                        'image/png': ['.png'],
                        'image/webp': ['.webp']
                    }}
                />
                <Typography
                    variant="body2"
                    sx={{color: 'var(--text-dim)', textAlign: 'center', mt: 2, fontSize: '0.9rem'}}
                >
                    <strong>Note:</strong> The AI engine is still in development. Please be patient.
                </Typography>
            </GenericModal>
        </div>
    );
};

export default Transactions;