import React, {useCallback} from 'react';
import {type Accept, useDropzone} from 'react-dropzone';
import {CloudUpload} from '@mui/icons-material';
import styles from './FileUpload.module.css';

interface DragDropProps {
    onFileSelect: (file: File) => void;
    isLoading: boolean;
    accept?: Accept;
    mainLabel?: string;
    subLabel?: string;
    activeLabel?: string;
    loadingLabel?: string;
}

const FileDragDrop: React.FC<DragDropProps> = ({
                                                   onFileSelect,
                                                   isLoading,
                                                   accept,
                                                   mainLabel = 'Drag & drop bank statement',
                                                   subLabel = 'Microsoft Excel (.xlsx) and (.csv) files only',
                                                   activeLabel = 'DROP TO INGEST DATA',
                                                   loadingLabel = 'PROTOCOL SYNCHRONIZING...'
                                               }) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            onFileSelect(acceptedFiles[0]);
        }
    }, [onFileSelect]);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept,
        multiple: false,
        disabled: isLoading
    });

    return (
        <div
            {...getRootProps()}
            className={`
                ${styles.dropzone} 
                ${isDragActive ? styles.active : ''} 
                ${isLoading ? styles.loading : ''}
            `}
        >
            <input {...getInputProps()} />

            <div className={styles.content}>
                <CloudUpload className={styles.icon}/>

                {isDragActive ? (
                    <p className={styles.textActive}>{activeLabel}</p>
                ) : (
                    <div className={styles.textGroup}>
                        <p className={styles.textMain}>
                            {isLoading ? loadingLabel : mainLabel}
                        </p>
                        <p className={styles.textMuted}>
                            {subLabel}
                        </p>
                    </div>
                )}
            </div>

            <div className={styles.glowLayer}></div>
        </div>
    );
};

export default FileDragDrop;