import {
    LineChart, Line, ResponsiveContainer, XAxis, YAxis,
    CartesianGrid, Tooltip, Legend
} from 'recharts';
import type { MonthlyData} from "../../types";

interface LineChartWProps {
    data: MonthlyData[];
}

const LineChartW = ({ data }: LineChartWProps) => {
    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {/* 2. Use Hex codes for "neon" colors. 3. Use unique dataKeys. */}
                    <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#39FF14"
                        activeDot={{ r: 8 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="expenses"
                        stroke="#FF3131"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default LineChartW;