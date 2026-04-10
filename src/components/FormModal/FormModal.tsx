import {Modal, Box, Typography, Fade, IconButton} from "@mui/material";
import {GenericForm} from '../GenericForm/GenericForm.tsx';
import type {FormField} from "../../types/form.ts";
import styles from './FormModal.module.css';
import CloseIcon from '@mui/icons-material/Close';


interface FormModalProps<T> {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    fields: FormField[];
    submitLabel: string;
    isSubmitting: boolean;
    error?: string;
    onSubmit: (formData: T) => void | Promise<void>;
}

export const FormModal = <T extends Record<string, unknown>>({
                                                                 isOpen,
                                                                 onClose,
                                                                 title,
                                                                 fields,
                                                                 submitLabel,
                                                                 isSubmitting,
                                                                 error,
                                                                 onSubmit,
                                                             }: FormModalProps<T>) => {
    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            closeAfterTransition
        >
            <Fade in={isOpen}>
                <Box className={styles.modalContent}>
                    <Box className={styles.header}>
                        <Typography className={styles.title}>
                            {title}
                        </Typography>
                    </Box>

                    <IconButton
                        onClick={onClose}
                        className={styles.closeButton}
                    >
                        <CloseIcon fontSize="small"/>
                    </IconButton>

                    <GenericForm<T>
                        fields={fields}
                        submitLabel={submitLabel}
                        isLoading={isSubmitting}
                        error={error}
                        onSubmit={onSubmit}
                    />
                </Box>
            </Fade>
        </Modal>
    );
};