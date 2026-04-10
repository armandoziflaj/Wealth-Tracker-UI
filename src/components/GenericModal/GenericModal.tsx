import {Modal, Box, Typography, Fade, IconButton} from "@mui/material";
import styles from './GenericModal.module.css';
import CloseIcon from '@mui/icons-material/Close';

interface ZenModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    subtitle?: string;
    children: React.ReactNode;
}

export const GenericModal = ({isOpen, onClose, title, subtitle, children}: ZenModalProps) => {
    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            closeAfterTransition
            className={styles.backdrop}
        >
            <Fade in={isOpen}>
                <Box className={styles.modalContent}>
                    <header className={styles.header}>
                        <div className={styles.titleGroup}>
                            <Typography className={styles.title}>{title}</Typography>
                            {subtitle && <Typography className={styles.subtitle}>{subtitle}</Typography>}
                        </div>
                        <IconButton onClick={onClose} className={styles.closeButton}>
                            <CloseIcon fontSize="small"/>
                        </IconButton>
                    </header>

                    <div className={styles.body}>
                        {children}
                    </div>
                </Box>
            </Fade>
        </Modal>
    );
};