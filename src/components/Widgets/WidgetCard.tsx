import React from "react";

interface WidgetCardProps {
    title: string;
    children: React.ReactNode;
}

const WidgetCard = ({ title, children }: WidgetCardProps) => {
    return (
        <div className="bg-zen-card p-6 rounded-2xl border border-white/5 shadow-neon-glow flex flex-col transition-all hover:border-zen-neon/50">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white tracking-tight">
                    {title}
                </h2>
                {/* Decorative Neon Dot */}
                <div className="h-2 w-2 rounded-full bg-zen-neon shadow-[0_0_8px_#C6FF5E]" />
            </div>

            <div className="h-75 w-full">
                {children}
            </div>
        </div>
    );
};

export default WidgetCard;