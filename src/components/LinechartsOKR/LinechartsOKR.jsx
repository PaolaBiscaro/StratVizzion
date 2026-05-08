import React, { useEffect, useRef, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";
import "./LinechartsOKR.css";

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
    const containerRef = useRef(null);
    const [size, setSize] = useState({ width: 0, height: 210 });

    useEffect(() => {
        const element = containerRef.current;
        if (!element) return;

        const updateSize = () => {
            const rect = element.getBoundingClientRect();
            const width = Math.max(0, Math.floor(rect.width));

            // Fallback keeps chart stable when parent height is not resolved yet.
            const derivedHeight = rect.height > 0 ? rect.height : width / 2.2;
            const height = Math.max(210, Math.floor(derivedHeight));

            setSize({ width, height });
        };

        updateSize();

        const observer = new ResizeObserver(updateSize);
        observer.observe(element);

        return () => observer.disconnect();
    }, []);

    return (
        <div className="linechart-okr-wrapper" ref={containerRef}>
            {size.width > 0 && (
                <LineChart width={size.width} height={size.height} data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="" vertical={false} stroke="#E0E0E0" />
                    <XAxis dataKey="mes" tick={{ fill: "#4A4A4D" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#4A4A4D" }} axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Line type="monotone" dataKey="real" stroke="#2FAF3B" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="meta" stroke="#1CABC9" strokeWidth={2} dot={false} />
                </LineChart>
            )}
        </div>
    );
}

export default LineChartOKR;