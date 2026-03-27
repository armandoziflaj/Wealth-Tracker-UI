import { useState } from 'react';
import {ZenGrid} from '../../components/ZenGrid.tsx';
import { ZenButton } from '../../components/ZenButton.tsx';
import { useCategories, useCreateCategory } from '../../hooks/useCategories.ts';
import type {FormField} from "../../types/form.ts";
import type {CategoryCreateDto} from "../../types/Category.ts";
import { FormModal } from '../../components/FormModal.tsx';
import {columns} from "./CategoriesColumns.tsx";
import {Delete, Edit2, PlusCircle} from "lucide-react";

export const Categories = () => {
    const { data, isLoading } = useCategories();

    const createMutation = useCreateCategory();
    const [areVisible, setAreVisible] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const categoryFields: FormField[] = [
        { id: 'name', label: 'Vault Name', type: 'text', placeholder: 'e.g., Rent', required: true },
        { id: 'icon', label: 'Icon Name', type: 'text', placeholder: 'Home, Zap, ShoppingCart...', required: true },
        { id: 'color', label: 'Theme Color', type: 'text', placeholder: '#00FFCC', required: true },
        { id: 'type', label: 'Type', type: 'text', placeholder: 'expense or income', required: true },
    ];

    const handleCreateCategory = (formData: Record<string, unknown>) => {
        const dto = formData as unknown as CategoryCreateDto;

        createMutation.mutate(dto, {
            onSuccess: () => {
                setIsModalOpen(false);
            }
        });
    };

    return (
        <div className="p-6 md:p-12 max-w-7xl mx-auto space-y-12 min-h-screen">

            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h1 className="text-5xl font-black tracking-tighter text-white uppercase italic">Vaults</h1>
                    <p className="text-zen-muted text-[10px] uppercase tracking-[0.5em] mt-2 font-bold opacity-60">
                        Category Node Management
                    </p>
                </div>

                <div className="flex gap-3">
                    <ZenButton
                        variant="outline"
                        size="sm"
                        hidden={!areVisible}
                        onClick={() => setIsModalOpen(true)}
                    >
                        <Delete size={16} />
                    </ZenButton>
                    <ZenButton
                        variant="outline"
                        size="sm"
                        hidden={!areVisible}
                        onClick={() => setIsModalOpen(true)}
                    >
                        <Edit2 size={16} />
                    </ZenButton>
                    <ZenButton
                        variant="solid"
                        size="sm"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <PlusCircle size={16} />
                    </ZenButton>
                </div>
            </header>

            <ZenGrid
                data={data || []}
                columns={columns}
                isLoading={isLoading}
                currentPage={currentPage}
                totalPages={1}
                onPageChange={setCurrentPage}
                onRowClick={(cat) => {
                    setAreVisible(true);
                    console.log("Selected:", cat.id);
                }}
            />

            <FormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Create New Category"
                subtitle="Configure Category Parameters"
                fields={categoryFields}
                submitLabel="Construct Vault"
                isSubmitting={createMutation.isPending}
                error={createMutation.error?.message}
                onSubmit={handleCreateCategory}
            />
        </div>
    );
};