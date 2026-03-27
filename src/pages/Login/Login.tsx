import { Link } from 'react-router-dom';
import { GenericForm } from '../../components/GenericForm';
import { useLogin } from '../../hooks/useLogin';
import { loginFields } from './login.config';

const Login = () => {
    const { handleLogin, errorMessage: error, isLoading } = useLogin();

    return (
        <div className="flex flex-col items-center justify-center min-h-[90vh] py-10">
            <div className="w-full max-w-md bg-zen-card border border-white/5 p-10 rounded-[2.5rem] shadow-2xl">
                <header className="text-center mb-10">
                    <h2 className="text-3xl font-black text-white italic">Welcome Back</h2>
                    <p className="text-zen-muted text-sm mt-2">Enter your credentials to access your vault.</p>
                </header>

                <GenericForm
                    fields={loginFields}
                    onSubmit={handleLogin}
                    submitLabel="Sign In"
                    isLoading={isLoading}
                    error={error}
                />

                <p className="mt-8 text-center text-sm text-zen-muted">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-zen-neon font-bold hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};
export default Login