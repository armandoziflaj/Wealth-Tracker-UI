import {Alert, AlertTitle, Snackbar, Box} from '@mui/material';
import {useZenStore} from "../ZenStore.tsx";
import './ZenAlert.module.css';

export const ZenAlert = () => {
    const {open, message, title, severity, close} = useZenStore();
    const duration = severity === 'error' ? null : 5000;

    return (
        <Snackbar
            open={open}
            autoHideDuration={duration}
            onClose={close}
            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
            sx={{zIndex: 10000}}
        >
            <Box sx={{width: '100%'}}>
                <Alert
                    onClose={close}
                    severity={severity}
                    variant="filled"
                    elevation={0}
                    sx={{
                        width: '100%',
                        minWidth: '320px',
                        borderRadius: '16px',
                        fontFamily: 'inherit',
                    }}
                >
                    {title && <AlertTitle>{title}</AlertTitle>}
                    <span style={{fontSize: '0.95rem', fontWeight: 600}}>
                        {message}
                    </span>
                </Alert>
            </Box>
        </Snackbar>
    );
};