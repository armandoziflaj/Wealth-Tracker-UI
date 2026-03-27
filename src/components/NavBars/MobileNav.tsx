import {
    LayoutDashboard,
    ArrowLeftRight,
    Shapes,
    Target,
    LogOut // Import the logout icon
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth'; // Import your hook

export const MobileNav = () => {
    const location = useLocation();
    const { logout } = useAuth(); // Get the logout function
    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="md:hidden fixed bottom-0 left-0 w-full bg-zen-card/90 backdrop-blur-xl border-t border-white/5 px-4 py-3 flex justify-between items-center z-50">

            {/* Navigation Links */}
            <Link to="/DashBoard" className={`flex flex-col items-center gap-1 ${isActive('/DashBoard') ? 'text-zen-neon' : 'text-zen-muted'}`}>
                <LayoutDashboard size={18} />
                <span className="text-[7px] uppercase font-black tracking-widest">Dash</span>
            </Link>

            <Link to="/Transactions" className={`flex flex-col items-center gap-1 ${isActive('/Transactions') ? 'text-zen-neon' : 'text-zen-muted'}`}>
                <ArrowLeftRight size={18} />
                <span className="text-[7px] uppercase font-black tracking-widest">Flow</span>
            </Link>

            <Link to="/Categories" className={`flex flex-col items-center gap-1 ${isActive('/Categories') ? 'text-zen-neon' : 'text-zen-muted'}`}>
                <Shapes size={18} />
                <span className="text-[7px] uppercase font-black tracking-widest">Cats</span>
            </Link>

            <Link to="/Goals" className={`flex flex-col items-center gap-1 ${isActive('/Goals') ? 'text-zen-neon' : 'text-zen-muted'}`}>
                <Target size={18} />
                <span className="text-[7px] uppercase font-black tracking-widest">Goals</span>
            </Link>

            <button
                onClick={logout}
                className="flex flex-col items-center gap-1 text-zen-neon active:scale-90 transition-transform"
            >
                <LogOut size={18} />
                <span className="text-[7px] uppercase font-black tracking-widest">Exit</span>
            </button>
        </nav>
    );
};