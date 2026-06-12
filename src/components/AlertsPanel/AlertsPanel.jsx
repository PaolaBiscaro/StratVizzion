import React from 'react';
import './AlertsPanel.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function AlertsPanel({ totalTasks = 0, completedTasks = 0, delayedTasks = 0 }) {
    const pendingTasks = Math.max(0, totalTasks - completedTasks - delayedTasks);

    const data = {
        labels: ['Concluídas', 'Em andamento', 'Atrasadas'],
        datasets: [
            {
                data: [completedTasks, pendingTasks, delayedTasks],
                backgroundColor: ['#0F9D58', '#FBBC04', '#EA4335'],
                borderWidth: 0,
                cutout: '80%',
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: { enabled: true }
        },
    };

    const legendItems = [
        { label: 'Concluídas', color: '#0F9D58', value: completedTasks },
        { label: 'Em andamento', color: '#FBE85A', value: pendingTasks },
        { label: 'Atrasadas', color: '#EA4335', value: delayedTasks }
    ];

    return (
        <div className="alerts-panel-container">

            <div className="alerts-chart-wrapper">
                <Doughnut data={data} options={options} />
                <div className="alerts-chart-text">
                    <h2>{totalTasks}</h2>
                    <span>Total</span>
                </div>
            </div>

            <p className="alerts-subtitle">Qnt de tarefas no Jira</p>

            <div className="alerts-legend-container">
                {legendItems.map((item, index) => (
                    <div key={index} className="alerts-legend-item">
                        <div
                            className="alerts-legend-color"
                            style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="alerts-legend-text">{item.label}: {item.value}</span>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default AlertsPanel;