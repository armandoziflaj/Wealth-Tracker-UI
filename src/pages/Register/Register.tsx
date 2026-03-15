import { Link } from 'react-router-dom';
import { GenericForm } from '../../components/GenericForm';
import { useRegister } from '../../hooks/useRegister'; // Use the register hook
import { registerFields } from './register.config.ts';
import type {RegisterCredentials} from "../../types/auth.ts";

export const Register = () => {
    const { handleRegister, errorMessage, isLoading } = useRegister();

    const onFormSubmit = (data: Record<string, string>) => {
        handleRegister(data as unknown as RegisterCredentials);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[90vh] py-10">
            <div className="w-full max-w-xl bg-zen-card border border-white/5 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">

                <div className="absolute -top-24 -right-24 w-64 h-64 bg-zen-neon/5 blur-[100px] rounded-full pointer-events-none" />

                <header className="text-center mb-10">
                    <h2 className="text-3xl font-black text-white italic tracking-tight">Create Account</h2>
                    <p className="text-zen-muted text-sm mt-2">Join the elite circle of wealth builders.</p>
                </header>

                <GenericForm
                    fields={registerFields}
                    onSubmit={onFormSubmit}
                    submitLabel="Get Started"
                    isLoading={isLoading}
                    error={errorMessage}
                />

                <p className="mt-8 text-center text-sm text-zen-muted">
                    Already have an account?{' '}
                    <Link to="/login" className="text-zen-neon font-bold hover:underline underline-offset-4">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};