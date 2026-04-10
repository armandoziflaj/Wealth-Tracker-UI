import { Link } from 'react-router-dom';
import { GenericForm } from '../../components/GenericForm/GenericForm.tsx';
import { useLogin } from '../../hooks/useLogin';
import { loginFields } from './login.config';
import styles from './Login.module.css';

const Login = () => {
    const { handleLogin, errorMessage: error, isLoading } = useLogin();

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <header className={styles.header}>
                    <h2 className={styles.title}>Welcome Back</h2>
                    <p className={styles.subtitle}>Enter your credentials to access your vault.</p>
                </header>

                <GenericForm
                    fields={loginFields}
                    onSubmit={handleLogin}
                    submitLabel="Sign In"
                    isLoading={isLoading}
                    error={error}
                />

                <p className={styles.footer}>
                    Don't have an account?{' '}
                    <Link to="/register" className={styles.link}>
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};
export default Login