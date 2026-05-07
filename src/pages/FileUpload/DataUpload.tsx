import {PageHeader} from "../../components/PageHeader/PageHeader.tsx";
import {
    CheckCircleOutline,
    ErrorOutline,
    CloudSync
} from '@mui/icons-material';
import styles from './DataUpload.module.css';
import {useDownloadTemplate, useIngestFile} from "../../hooks/useFileIntegration.ts";
import FileDragDrop from "../../components/FileUploadComponent/FileUpload.tsx";
import {ZenButton} from "../../components/ZenButton/ZenButton.tsx";

const DataUpload = () => {
    const {mutate, isPending, isSuccess, isError, error, data} = useIngestFile();
    const {mutate: download, isPending: isDownloading} = useDownloadTemplate();
    return (
        <div className={styles.importContainer}>
            <PageHeader
                title="DATA"
                accentTitle="INGESTION"
                subtitle="Synchronize external protocol statements"
            />

            <section className={styles.ingestionConsole}>
                <div className={styles.consoleHeader}>
                    <div className={styles.titleGroup}>
                        <h2 className={styles.consoleTitle}>Ingestion Portal</h2>
                        <p className={styles.consoleSubtitle}>Primary node for statement processing</p>
                    </div>

                    <ZenButton
                        variant="outline"
                        size="md"
                        onClick={() => download()}
                        disabled={isDownloading}
                        className={styles.templateBtn}
                    >
                        {isDownloading ? "PREPARING..." : "GET TEMPLATE"}
                    </ZenButton>
                </div>
                <div className={styles.dropzoneWrapper}>

                    <FileDragDrop
                        onFileSelect={(file: File) => mutate(file)}
                        isLoading={isPending}
                        accept={{
                            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
                            'text/csv': ['.csv'],
                            'text/plain': ['.csv']
                        }}
                        mainLabel="INGEST LEDGER DATA"
                        subLabel="Excel (.xlsx) or CSV files only"
                        activeLabel="RELEASE TO SYNCHRONIZE"
                    />

                    {isSuccess && data && (
                        <div className={`${styles.feedback} ${styles.success}`}>
                            <CheckCircleOutline/>
                            <div className={styles.feedbackText}>
                                <strong>Success:</strong> {data.count} nodes synchronized via {data.provider} protocol.
                            </div>
                        </div>
                    )}

                    {isError && (
                        <div className={`${styles.feedback} ${styles.error}`}>
                            <ErrorOutline/>
                            <div className={styles.feedbackText}>
                                <strong>Error:</strong> {error.message}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <section className={styles.docSection}>
                <div className={styles.docHeader}>
                    <CloudSync className={styles.infoMainIcon}/>
                    <h3 className={styles.docTitle}>Integration Protocol</h3>
                </div>

                <div className={styles.infoList}>
                    <div className={styles.infoItem}>
                        <div className={styles.dot}/>
                        <p>Format requirement: Strict <strong>.xlsx</strong> and <strong>.csv</strong> structure.</p>
                    </div>
                    <div className={styles.infoItem}>
                        <div className={styles.dot}/>
                        <p>Signature detection: Logic relies on provider ID in cell A2.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default DataUpload;