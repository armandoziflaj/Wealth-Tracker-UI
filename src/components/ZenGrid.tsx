import React from 'react';
import {ZenButton} from './ZenButton';
import styles from './ZenGrid.module.css';

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
    selectedRowId?: number | string;
    onPageChange: (page: number) => void;
}

export function ZenGrid<T extends { id: string | number }>({
                                                               data,
                                                               columns,
                                                               isLoading,
                                                               onRowClick,
                                                               currentPage,
                                                               totalPages,
                                                               selectedRowId,
                                                               onPageChange
                                                           }: ZenGridProps<T>) {
    const isFirstPage = currentPage <= 1;
    const isLastPage = currentPage >= totalPages;
    return (
        <div className={styles.gridContainer}>
            <div className={styles.gridWrapper}>

                {/* Desktop Header */}
                <div className={styles.desktopHeader}
                     style={{gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))`}}>
                    {columns.map((col, idx) => (
                        <div key={idx} className={`${styles.headerCell} ${col.className}`}>
                            {col.header}
                        </div>
                    ))}
                </div>

                <div className={styles.body}>
                    {isLoading ? (
                        [...Array(5)].map((_, i) => (
                            <div key={i} className={styles.loadingRow}/>
                        ))
                    ) : data.length === 0 ? (
                        <div className={styles.noData}>
                            No data nodes detected
                        </div>
                    ) : (
                        data.map((item, rowIdx) => {
                            const isSelected = selectedRowId !== undefined && item.id === selectedRowId;
                            return (
                                <div
                                    key={rowIdx}
                                    onClick={() => onRowClick?.(item)}
                                    className={`${styles.row} ${isSelected ? styles.selectedRow : ''}`}
                                    style={{
                                        gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))`
                                    }}
                                >
                                    {columns.map((col, colIdx) => (
                                        <div key={colIdx} className={`${styles.cell} ${col.className}`}>
                                            {colIdx > 0 && (
                                                <span className={styles.mobileLabel}>
                                    {col.header}
                                </span>
                                            )}
                                            {col.render(item)}
                                        </div>
                                    ))}
                                </div>
                            );
                        })
                    )}
                </div>
            </div>


            {totalPages > 1 && (
                <div className={styles.paginationBar}>

                    <div className={styles.paginationControls}>
                        <ZenButton variant="ghost" size="sm" disabled={isFirstPage}
                                   onClick={() => onPageChange(currentPage - 1)}>Prev</ZenButton>
                        <div className={styles.pageInfo}>
                            <span className={styles.currentPage}>{currentPage}</span>
                            <span className={styles.separator}>/</span>
                            <span>{totalPages}</span>
                        </div>
                        <ZenButton variant="ghost" size="sm" disabled={isLastPage}
                                   onClick={() => onPageChange(currentPage + 1)}>Next</ZenButton>
                    </div>
                </div>
            )}
        </div>
    );
}