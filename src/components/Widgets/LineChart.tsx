import {
    LineChart, Line, ResponsiveContainer, XAxis, YAxis,
    CartesianGrid, Tooltip, Legend
} from 'recharts';
import type {MonthlyData} from "../../types";

interface LineChartWProps {
    data: MonthlyData[];
}

const LineChartW = ({data}: LineChartWProps) => {
    return (
        <div style={{width: '100%', height: 350, background: 'transparent'}}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{top: 20, right: 20, left: 0, bottom: 0}}>
                    {/* Definitions για τα Gradients */}
                    <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--zen-neon)" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="var(--zen-neon)" stopOpacity={0}/>
                        </linearGradient>
                    </defs>

                    {/* Απαλό Grid - Μόνο οριζόντιες γραμμές για λιγότερο "θόρυβο" */}
                    <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="var(--border-color)"
                    />

                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{fill: 'var(--text-dim)', fontSize: 12, fontWeight: 600}}
                        dy={10}
                    />

                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{fill: 'var(--text-dim)', fontSize: 12}}
                        tickFormatter={(value) => `$${value}`}
                    />

                    {/* Custom Tooltip που ταιριάζει με το Zen Style */}
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'var(--bg-surface)',
                            borderRadius: '12px',
                            border: '1px solid var(--border-color)',
                            boxShadow: '0 10px 25px var(--zen-black)',
                            color: 'var(--text-main)'
                        }}
                        itemStyle={{fontSize: '12px', fontWeight: 700, textTransform: 'uppercase'}}
                    />

                    <Legend
                        verticalAlign="top"
                        align="right"
                        iconType="circle"
                        wrapperStyle={{
                            paddingBottom: '20px',
                            fontSize: '10px',
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em'
                        }}
                    />

                    {/* Revenue Line με Glow Effect */}
                    <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="var(--zen-neon)"
                        strokeWidth={4}
                        dot={{r: 4, fill: 'var(--zen-neon)', strokeWidth: 2, stroke: 'var(--bg-app)'}}
                        activeDot={{r: 8, strokeWidth: 0, fill: 'var(--zen-neon)'}}
                        animationDuration={1500}
                    />

                    {/* Expenses Line */}
                    <Line
                        type="monotone"
                        dataKey="expenses"
                        stroke="var(--zen-error)"
                        strokeWidth={3}
                        strokeDasharray="5 5"
                        dot={false}
                        activeDot={{r: 6, fill: 'var(--zen-error)'}}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default LineChartW;