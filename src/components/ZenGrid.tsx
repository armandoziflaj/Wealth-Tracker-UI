// components/ZenGrid.tsx
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ZenButton } from './ZenButton';

export interface Column<T> {
    header: string;
    render: (item: T) => React.ReactNode;
    className?: string;
}

export interface ZenGridProps<T> {
    data: T[];
    columns: Column<T>[];
    isLoading?: boolean;
    onRowClick?: (item: T) => void;
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function ZenGrid<T>({
                               data,
                               columns,
                               isLoading,
                               onRowClick,
                               currentPage,
                               totalPages,
                               onPageChange
                           }: ZenGridProps<T>) {
    const isFirstPage = currentPage <= 1;
    const isLastPage = currentPage >= totalPages;

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="w-full overflow-hidden border border-white/5 bg-white/1 backdrop-blur-xl ">

                {/* Desktop Header */}
                <div className='hidden md:grid border-b border-white/5 bg-white/2'
                     style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}>
                    {columns.map((col, idx) => (
                        <div key={idx} className={`px-6 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-zen-muted ${col.className}`}>
                            {col.header}
                        </div>
                    ))}
                </div>

                {/* Body: Responsive Rows */}
                <div className="flex flex-col divide-y divide-white/5">
                    {isLoading ? (
                        [...Array(5)].map((_, i) => (
                            <div key={i} className="p-6 animate-pulse bg-white/5 h-20 mb-1" />
                        ))
                    ) : data.length === 0 ? (
                        <div className="px-6 py-20 text-center text-zen-muted uppercase text-[10px] font-black tracking-widest opacity-50">
                            No data nodes detected
                        </div>
                    ) : (
                        data.map((item, rowIdx) => (
                            <div
                                key={rowIdx}
                                onClick={() => onRowClick?.(item)}
                                className="group flex flex-col md:grid p-5 md:p-0 transition-all hover:bg-zen-neon/5 active:scale-[0.99] cursor-pointer"
                                style={{
                                    gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))`
                                }}
                            >
                                {columns.map((col, colIdx) => (
                                    <div key={colIdx} className={`md:px-6 md:py-6 text-sm font-medium text-white/80 group-hover:text-white ${col.className}`}>
                                        {/* Mobile Label */}
                                        {colIdx > 0 && (
                                            <span className="md:hidden text-[8px] font-black uppercase text-zen-muted tracking-widest block mb-1 opacity-50">
                                                {col.header}
                                            </span>
                                        )}
                                        {col.render(item)}
                                    </div>
                                ))}
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Pagination bar */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center px-6 py-2 bg-white/2 border border-white/5 backdrop-blur-sm">

                    <div className="flex gap-3">
                        <ZenButton variant="ghost" size="sm" disabled={isFirstPage} onClick={() => onPageChange(currentPage - 1)} icon={<ChevronLeft size={14} />}>Prev</ZenButton>
                        <div className="flex items-center justify-center min-w-[60px] text-[10px] font-black tracking-widest text-zen-muted">
                            <span className="text-zen-neon">{currentPage}</span>
                            <span className="mx-2 text-white/10">/</span>
                            <span>{totalPages}</span>
                        </div>
                        <ZenButton variant="ghost" size="sm" disabled={isLastPage} onClick={() => onPageChange(currentPage + 1)} icon={<ChevronRight size={14} />}>Next</ZenButton>
                    </div>
                </div>
            )}
        </div>
    );
}