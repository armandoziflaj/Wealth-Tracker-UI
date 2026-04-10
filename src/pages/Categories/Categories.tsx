import {useState} from 'react';
import {ZenGrid} from '../../components/ZenGrid.tsx';
import {ZenButton} from '../../components/ZenButton.tsx';
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

export const Categories = () => {
    const {data, isLoading} = useCategories();
    const createMutation = useCreateCategory();
    const deleteMutation = useDeleteCategory();
    const updateMutation = useUpdateCategory();

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

    const handleFormSubmit = async (values: CategoryCreateDto) => {
        try {
            const payload: CategoryCreateDto = {
                ...values,
                type: Number(values.type) as TransactionType
            };

            if (selectedCategory?.id) {
                await updateMutation.mutateAsync({
                    ...payload,
                    id: selectedCategory.id
                });
            } else {
                await createMutation.mutateAsync(payload);
            }

            setIsModalOpen(false);
            setSelectedCategory(null);
        } catch (e) {
            console.error("Operation failed:", e);
        }
    };

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
                                if (selectedCategory?.id) {
                                    deleteMutation.mutate(selectedCategory.id);
                                    setSelectedCategory(null);
                                }
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
                error={createMutation.error?.message || updateMutation.error?.message}
                onSubmit={handleFormSubmit}
            />
        </div>
    );
};