import { Link } from 'react-router-dom';
import { GenericForm } from '../../components/GenericForm/GenericForm.tsx';
import { useRegister } from '../../hooks/useRegister';
import { registerFields } from './register.config.ts';
import type {RegisterCredentials} from "../../types/auth.ts";
import styles from './Register.module.css';

export const Register = () => {
    const { handleRegister, errorMessage, isLoading } = useRegister();

    const onFormSubmit = (data: Record<string, string>) => {
        handleRegister(data as unknown as RegisterCredentials);
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.backgroundGlow} />

                <header className={styles.header}>
                    <h2 className={styles.title}>Create Account</h2>
                    <p className={styles.subtitle}>Join the elite circle of wealth builders.</p>
                </header>

                <GenericForm
                    fields={registerFields}
                    onSubmit={onFormSubmit}
                    submitLabel="Get Started"
                    isLoading={isLoading}
                    error={errorMessage}
                />

                <p className={styles.footer}>
                    Already have an account?{' '}
                    <Link to="/login" className={styles.link}>
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};