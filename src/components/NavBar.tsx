import { useAuth } from '../hooks/useAuth.ts';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();

    return (
        <nav className="fixed top-0 w-full z-50 bg-zen-deep/80 backdrop-blur-md border-b border-white/5">
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">

                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 bg-zen-neon rounded-lg shadow-neon-glow flex items-center justify-center group-hover:rotate-12 transition-transform">
                        <span className="text-black font-black text-xl">W</span>
                    </div>
                    <span className="text-white font-bold text-xl tracking-tighter">
                        Wealth<span className="text-zen-neon">Tracker</span>
                    </span>
                </Link>

                <div className="flex items-center gap-8">
                    {isAuthenticated ? (
                        <>
                            <Link to="/" className="text-zen-muted hover:text-zen-neon transition-colors text-sm font-medium">
                                Dashboard
                            </Link>
                            <Link to="/" className="text-zen-muted hover:text-zen-neon transition-colors text-sm font-medium">
                                Transactions
                            </Link>
                            <button
                                onClick={logout}
                                className="bg-white/5 hover:bg-white/10 text-white px-5 py-2 rounded-lg text-sm font-bold transition-all"
                            >
                                Log Out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-white hover:text-zen-neon transition-colors text-sm font-medium">
                                Sign In
                            </Link>
                            <Link
                                to="/Register"
                                className="bg-zen-neon text-black px-6 py-2.5 rounded-xl font-bold text-sm shadow-neon-glow hover:scale-105 transition-transform"
                            >
                                Get Started
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;