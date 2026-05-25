import React from 'react';
import './AlertsPanel.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function AlertsPanel() {
    const data = {
        labels: ['Positivas', 'Atenção', 'Negativas'],
        datasets: [
            {
                data: [50, 20, 16],
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
        { label: 'Positivas', color: '#0F9D58' },
        { label: 'Atenção', color: '#FBE85A' },
        { label: 'Negativas', color: '#EA4335' }
    ];

    return (
        <div className="alerts-panel-container">

            <div className="alerts-chart-wrapper">
                <Doughnut data={data} options={options} />
                <div className="alerts-chart-text">
                    <h2>86</h2>
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
                        <span className="alerts-legend-text">{item.label}</span>
                    </div>
                ))}
            </div>

            <select className="alerts-select">
                <option>Selecionar OKR</option>
            </select>

        </div>
    );
}

export default AlertsPanel;