import {create} from 'zustand';

interface ZenAlertState {
    open: boolean;
    message: string;
    title: string;
    severity: 'success' | 'info' | 'warning' | 'error';

    notify: (message: string, severity?: 'success' | 'info' | 'warning' | 'error', title?: string) => void;
    close: () => void;
}

export const useZenStore = create<ZenAlertState>((set) => ({
    open: false,
    message: '',
    title: '',
    severity: 'info',

    notify: (message: string, severity = 'info', title = '') =>
        set({
            open: true,
            message,
            severity,
            title: title || (severity === 'error' ? 'System Error' : 'Notification')
        }),

    close: () => set({open: false}),
}));