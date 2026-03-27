import type {Column} from "../../components/ZenGrid.tsx";
import type {CategoryResponse} from "../../types/Category.ts";
import * as Icons from "lucide-react";
import {type LucideIcon, Settings2} from "lucide-react";

export const columns: Column<CategoryResponse>[] = [
    {
        header: 'Identity',
        render: (cat: CategoryResponse) => {
            const Icon = (Icons[cat.icon as keyof typeof Icons] as LucideIcon) || Icons.HelpCircle;
            return (
                <div className="flex items-center gap-4">
                    <div
                        className="p-2.5 rounded-xl transition-all group-hover:scale-110"
                        style={{ backgroundColor: `${cat.color}15`, color: cat.color }}
                    >
                        <Icon size={18} strokeWidth={2.2} />
                    </div>
                    <span className="font-bold tracking-tight text-white/90">{cat.name}</span>
                </div>
            );
        }
    },
    {
        header: 'Classification',
        render: (cat: CategoryResponse) => (
            <span className="text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 bg-white/5 border border-white/5 rounded-full text-zen-muted">
                    {cat.type}
                </span>
        )
    },
    {
        header: 'System ID',
        className: 'hidden lg:block font-mono text-white/10 text-[10px]',
        render: (cat: CategoryResponse) => `0x${cat.id.toString(16).toUpperCase()}`
    },
    {
        header: 'Actions',
        className: 'text-right',
        render: () => (
            <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="text-zen-muted hover:text-white p-2">
                    <Settings2 size={16} />
                </button>
            </div>
        )
    }
];