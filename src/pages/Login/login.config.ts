import { type FormField } from '../../types/form';

export const loginFields: FormField[] = [
    {
        id: 'email',
        label: 'Email Address',
        type: 'email',
        placeholder: 'name@example.com',
        required: true,
        width: "full"
    },
    {
        id: 'password',
        label: 'Password',
        type: 'password',
        placeholder: '••••••••',
        required: true,
        width: "full"
    },
];