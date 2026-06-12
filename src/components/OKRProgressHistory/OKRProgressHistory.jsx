import React, { useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";
import "./OKRProgressHistory.css";

function OKRProgressHistory({ data = [] }) {
    const [chartData, setChartData] = useState([]);

    // Formata os dados para o gráfico
    useEffect(() => {
        if (!data || data.length === 0) {
            setChartData([]);
            return;
        }

        const formatted = data.map((item) => {
            const date = new Date(item.referenceDate);
            const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}`;

            return {
                date: formattedDate,
                progressPercentage: parseFloat(item.progressPercentage.toFixed(2)),
                totalTasks: item.totalTasks,
                completedTasks: item.completedTasks,
                delayedTasks: item.delayedTasks
            };
        });

        setChartData(formatted);
    }, [data]);

    // Custom Tooltip
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const item = payload[0].payload;
            return (
                <div className="chart-tooltip">
                    <p className="tooltip-date"><strong>{item.date}</strong></p>
                    <p className="tooltip-progress">
                        Progresso: <strong>{item.progressPercentage}%</strong>
                    </p>
                    <p className="tooltip-tasks">
                        Tarefas: <strong>{item.completedTasks}/{item.totalTasks}</strong>
                    </p>
                    <p className="tooltip-delayed">
                        Atrasadas: <strong>{item.delayedTasks}</strong>
                    </p>
                </div>
            );
        }
        return null;
    };

    if (chartData.length === 0) {
        return (
            <div className="okr-progress-history-container">
                <h3 className="history-title">Histórico de Progresso</h3>
                <p className="no-data">Nenhum dado de histórico disponível.</p>
            </div>
        );
    }

    return (
        <div className="okr-progress-history-container">
            <h3 className="history-title">Histórico de Progresso da OKR</h3>

            <div className="chart-wrapper">
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 60, bottom: 60 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E0E0" />
                        <XAxis 
                            dataKey="date" 
                            tick={{ fill: "#555", fontSize: 12 }} 
                            axisLine={{ stroke: '#ddd' }}
                            tickLine={false}
                            angle={-45}
                            textAnchor="end"
                            height={100}
                        />
                        <YAxis 
                            tick={{ fill: "#555", fontSize: 12 }} 
                            axisLine={{ stroke: '#ddd' }}
                            tickLine={false}
                            domain={[0, 100]}
                            label={{ value: 'Progresso (%)', angle: -90, position: 'insideLeft', offset: 10 }}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(47, 175, 59, 0.1)' }} />
                        <Bar 
                            dataKey="progressPercentage" 
                            fill="#2FAF3B"
                            radius={[8, 8, 0, 0]}
                            barSize={60}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default OKRProgressHistory;
