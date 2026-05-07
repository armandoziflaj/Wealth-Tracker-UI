import {Link} from 'react-router-dom';
import {GenericForm} from '../../components/GenericForm/GenericForm.tsx';
import {useRegister} from '../../hooks/useRegister';
import {registerFields} from './register.config.ts';
import type {RegisterCredentials} from "../../types/auth.ts";
import styles from './Register.module.css';
import {GoogleAuthButton} from "../../components/ZenButton/GoogleButton/GoogleAuthButton.tsx";
import {useLogin} from "../../hooks/useLogin.ts";

export const Register = () => {
    const {handleRegister, errorMessage, isLoading} = useRegister();
    const {handleGoogleLogin, isLoading: isGoogleLoading} = useLogin();

    const onFormSubmit = (data: Record<string, string>) => {
        handleRegister(data as unknown as RegisterCredentials);
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.backgroundGlow}/>

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

                <div className={styles.separator}>
                    <span>OR</span>
                </div>

                <div className={styles.googleWrapper}>
                    <GoogleAuthButton
                        onSuccess={handleGoogleLogin}
                        isLoading={isGoogleLoading}
                    />
                </div>

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