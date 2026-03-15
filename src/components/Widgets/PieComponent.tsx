import { PieChart, Pie, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import type {CategoryData} from "../../types";

interface SpendingPieProps {
    data: CategoryData[] ;
}

const SpendingPie = ({data} : SpendingPieProps) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                />
                <Tooltip
                    contentStyle={{
                        backgroundColor: '#1e293b',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '8px',
                    }}
                />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default SpendingPie;