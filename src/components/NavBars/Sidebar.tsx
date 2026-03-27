import {
    LayoutDashboard,
    ArrowLeftRight,
    Shapes,
    Target,
    LogOut
} from 'lucide-react';
import {ZenButton} from "../ZenButton.tsx";
import {useAuth} from "../../hooks/useAuth.ts";


const Sidebar = () => {
    const { logout } = useAuth();

    return (
        <aside className="w-72 h-screen bg-zen-card border-r border-white/5 flex-col p-8 sticky top-0 hidden md:flex">
            <div className="mb-12 px-4">
                <h2 className="text-2xl font-black italic tracking-tighter text-white">
                    Wealth<span className="text-zen-neon">Tracker</span>
                </h2>
            </div>

            <nav className="grow space-y-2">
                <ZenButton variant="ghost" className="w-full justify-start text-[11px]" icon={<LayoutDashboard size={18} />}>
                    Dashboard
                </ZenButton>
                <ZenButton variant="ghost" className="w-full justify-start text-[11px]" icon={<ArrowLeftRight size={18} />}>
                    Transactions
                </ZenButton>
                <ZenButton variant="ghost" className="w-full justify-start text-[11px]" icon={<Shapes size={18} />}>
                    Categories
                </ZenButton>
                <ZenButton variant="ghost" className="w-full justify-start text-[11px]" icon={<Target size={18} />}>
                    Budget Goals
                </ZenButton>
            </nav>

            <div className="pt-8 border-t border-white/5 space-y-4">
                <ZenButton variant="outline" size="sm" className="w-full">
                    Upgrade Pro
                </ZenButton>

                <ZenButton
                    variant="ghost"
                    icon={<LogOut size={16} />}
                    onClick={logout}
                >
                    Logout
                </ZenButton>
            </div>
        </aside>
    );
};
export default Sidebar