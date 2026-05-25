import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Registrando os elementos necessários do Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

function LineChart() {
    const data = {
        labels: ['03/01', '03/02', '03/03', '03/04', '03/05', '03/06', '03/07'],
        datasets: [
            {
                fill: true, // Preenche a área abaixo da linha
                label: 'Evolução',
                data: [10, 15, 30, 32, 45, 50, 58], // Dados baseados na sua imagem
                borderColor: '#60B27A', // Cor da linha (Verde)
                backgroundColor: 'rgba(96, 178, 122, 0.1)', // Fundo com transparência
                pointBackgroundColor: '#60B27A',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#60B27A',
                pointRadius: 5,
                tension: 0.4 // Suaviza a curva da linha
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false, // Oculta a legenda superior padrão
            },
        },
        scales: {
            y: {
                min: 0,
                max: 60,
                ticks: { stepSize: 20 },
                grid: { color: '#f0f0f0' }
            },
            x: {
                grid: { display: false } // Remove as linhas verticais
            }
        },
    };

    return (
        <div style={{ height: '220px', width: '100%' }}>
            <Line data={data} options={options} />
        </div>
    );
}

export default LineChart;