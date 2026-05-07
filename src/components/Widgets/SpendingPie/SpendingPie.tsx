import {PieChart, Pie, ResponsiveContainer, Tooltip, Legend} from 'recharts';
import type {Props as LegendProps} from 'recharts/types/component/DefaultLegendContent';
import type {CategoryData} from "../../../types";
import styles from './SpendingPie.module.css';

interface SpendingPieProps {
    data: CategoryData[];
}

const SpendingPie = ({data}: SpendingPieProps) => {
    if (!data || data.length === 0) {
        return <div className={styles.emptyState}>No Data Nodes Detected</div>;
    }

    const CustomizedLegend = (props: LegendProps) => {
        const {payload} = props;
        if (!payload) return null;

        return (
            <div className={styles.customLegendContainer}>
                {payload.map((entry, index) => {
                    const categoryData = entry.payload as CategoryData;

                    return (
                        <div key={`item-${index}`} className={styles.legendItem}>
                            <div
                                className={styles.legendColor}
                                style={{backgroundColor: entry.color}}
                            />
                            <span className={styles.legendName}>{entry.value}</span>
                            <span className={styles.legendName}>
                                ${categoryData.value.toLocaleString()}
                            </span>
                        </div>
                    );
                })}
            </div>
        );
    };

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
                    nameKey="name"
                    stroke="none"
                />
                <Tooltip
                    contentStyle={{
                        backgroundColor: 'var(--bg-surface)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '8px',
                        fontSize: '12px'
                    }}
                />
                <Legend content={CustomizedLegend}/>
            </PieChart>
        </ResponsiveContainer>
    );
};

export default SpendingPie;