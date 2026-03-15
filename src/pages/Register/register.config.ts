import { type FormField } from '../../types/form';

export const registerFields: FormField[] = [
    {
        id: 'FirstName',
        label: 'First Name',
        type: 'text',
        placeholder: 'First Name',
        required: true,
        width: "half"
    },
    {
        id: 'LastName',
        label: 'Last Name',
        type: 'text',
        placeholder: 'Last Name',
        required: true,
        width: "half"
    },
    {
        id: 'email',
        label: 'Email Address',
        type: 'email',
        placeholder: 'name@example.com',
        required: true
    },
    {
        id: 'password',
        label: 'Password',
        type: 'password',
        placeholder: '••••••••',
        required: true
    },
    {
        id: 'passwordMap',
        label: 'Password',
        type: 'password',
        placeholder: '••••••••',
        required: true
    },

];