import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

const defaultData = [
    { mes: "Jan", real: 5, meta: 2 },
    { mes: "Fev", real: 8, meta: 3 },
    { mes: "Mar", real: 6, meta: 4 },
    { mes: "Abr", real: 15, meta: 10 },
    { mes: "Mai", real: 30, meta: 25 },
    { mes: "Jun", real: 35, meta: 80 },
    { mes: "Jul", real: 40, meta: 85 },
    { mes: "Ago", real: 38, meta: 60 },
    { mes: "Set", real: 20, meta: 15 },
    { mes: "Out", real: 10, meta: 8 },
    { mes: "Nov", real: 5, meta: 4 },
    { mes: "Dez", real: 3, meta: 2 },
];

function LineChartOKR({ data = defaultData }) {
    return (
        <ResponsiveContainer width="115%" height={300}>
            <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="" vertical={false} stroke="#E0E0E0" />
                <XAxis dataKey="mes" tick={{ fill: "#4A4A4D" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#4A4A4D" }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="real" stroke="#2FAF3B" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="meta" stroke="#1CABC9" strokeWidth={2} dot={false} />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default LineChartOKR;