import {useState} from 'react';
import {ZenGrid} from '../../components/ZenGrid/ZenGrid.tsx';
import {ZenButton} from '../../components/ZenButton/ZenButton.tsx';
import {useCategories, useCreateCategory, useDeleteCategory, useUpdateCategory} from '../../hooks/useCategories.ts';
import type {FormField} from "../../types/form.ts";
import type {CategoryCreateDto, CategoryUpdateDto} from "../../types/Category.ts";
import {FormModal} from '../../components/FormModal/FormModal.tsx';
import {columns} from "./CategoriesColumns.tsx";
import {PageHeader} from "../../components/PageHeader/PageHeader.tsx"; // Import this
import styles from './Categories.module.css';
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import {TransactionType} from "../../types/Transactions.ts";
import {useZenStore} from "../../components/ZenStore.tsx";

export const Categories = () => {
    const notify = useZenStore((state) => state.notify);
    const {data, isLoading} = useCategories();
    const createMutation = useCreateCategory();
    const deleteMutation = useDeleteCategory();
    const updateMutation = useUpdateCategory();

    const handleFormSubmit = async (values: CategoryCreateDto) => {
        try {
            const payload: CategoryCreateDto = {
                ...values,
                type: Number(values.type) as TransactionType
            };

            if (selectedCategory?.id) {
                await updateMutation.mutateAsync({...payload, id: selectedCategory.id});
                notify(`Vault "${payload.name}" reconfigured.`, "success", "Success");
            } else {
                await createMutation.mutateAsync(payload);
                notify(`New vault "${payload.name}" constructed.`, "success", "Success");
            }

            setIsModalOpen(false);
            setSelectedCategory(null);
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Protocol synchronization failed.";
            notify(msg, "error", "Fail");
            console.log(err);
        }
    };
    const handleDelete = async () => {
        if (!selectedCategory?.id) return;

        try {
            await deleteMutation.mutateAsync(selectedCategory.id);
            notify("Vault deleted successfully.", "success", "Success");
            setSelectedCategory(null);
        } catch (err: unknown) {
            const errorMessage = err instanceof Error
                ? err.message
                : "System failure: Database constraint violation.";
            notify(errorMessage, "error", "Error");
            console.log("Delete operation halted.");
        }
    };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState<CategoryUpdateDto | null>(null);

    const categoryFields: FormField[] = [
        {
            id: 'name',
            label: 'Vault Name',
            type: 'text',
            placeholder: 'e.g., Rent',
            required: true,
            defaultValue: selectedCategory?.name || '',
        },
        {
            id: 'type',
            label: 'Transaction Type',
            type: 'select',
            required: true,
            options: [
                {label: 'Expense', value: TransactionType.Expense},
                {label: 'Income', value: TransactionType.Income}
            ],
            defaultValue: selectedCategory?.type ?? TransactionType.Expense
        },
        {
            id: 'color',
            label: 'Theme Color',
            type: 'color',
            required: true,
            defaultValue: selectedCategory?.color || '#C6FF5E',
        }
    ];

    return (
        <div className={styles.container}>
            <PageHeader
                title="VAU"
                accentTitle="LTS"
                subtitle="Category Node Management"
                action={
                    <div className={styles.buttonGroup}>
                        <ZenButton
                            variant="outline"
                            size="sm"
                            onClick={() => {
                                handleDelete();
                            }}
                            disabled={!selectedCategory?.id}
                        >
                            <DeleteForeverOutlinedIcon/>
                        </ZenButton>
                        <ZenButton
                            variant="outline"
                            size="sm"
                            onClick={() => setIsModalOpen(true)}
                            disabled={!selectedCategory?.id}
                        >
                            <ModeOutlinedIcon/>
                        </ZenButton>
                        <ZenButton
                            variant="solid"
                            size="sm"
                            onClick={() => {
                                setSelectedCategory(null);
                                setIsModalOpen(true);
                            }}
                        >
                            <AddOutlinedIcon/>
                        </ZenButton>
                    </div>
                }
            />

            <ZenGrid
                data={data || []}
                columns={columns}
                isLoading={isLoading}
                currentPage={currentPage}
                totalPages={1}
                onPageChange={setCurrentPage}
                selectedRowId={selectedCategory?.id}
                onRowClick={(cat) => {
                    const updateData: CategoryUpdateDto = {
                        ...cat,
                        name: cat.name ?? 'Untitled Vault',
                        color: cat.color ?? '#94A3B8',
                        type: cat.type === TransactionType.Expense ? TransactionType.Expense
                            : TransactionType.Income,
                        id: cat.id
                    };
                    setSelectedCategory(updateData);
                }}
            />

            <FormModal<CategoryCreateDto>
                key={selectedCategory?.id ?? 'create-mode'}
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedCategory(null);
                }}
                title={selectedCategory ? "Modify Vault" : "Create New Vault"}
                submitLabel={selectedCategory ? "Update Configuration" : "Construct Vault"}
                fields={categoryFields}
                isSubmitting={createMutation.isPending || updateMutation.isPending}
                onSubmit={handleFormSubmit}
            />
        </div>
    );
};