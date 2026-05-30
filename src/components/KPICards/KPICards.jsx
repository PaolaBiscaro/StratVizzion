import React, { useEffect, useState } from 'react';
import './KPICards.css';

function KpiCards() {
    const cardsInfo = [
        { titulo: "OKR's concluídas em 2026", valor: "2/6", destaque: true },
        { titulo: "Quantidade de Projetos", valor: "5" },
        { titulo: "Total de KR's", valor: "24" },
        { titulo: "ROI", valor: "R$ 1.2 M", corValor: "#0F9D58" }
    ];

    const renderCircle = (valorString) => {
        const [concluido, total] = valorString.split('/').map(Number);
        
        const percentage = total > 0 ? concluido / total : 0;
        
    
        const radius = 45;
        const circumference = 2 * Math.PI * radius; 
        const strokeDashoffset = circumference - (percentage * circumference);

        return (
            <div className="kpi-circle-container">
                <svg width="120" height="120" viewBox="0 0 120 120">
                    <circle
                        cx="60"
                        cy="60"
                        r={radius}
                        fill="none"
                        stroke="#e0e0e0"
                        strokeWidth="8"
                    />
                    
                    <circle
                        cx="60"
                        cy="60"
                        r={radius}
                        fill="none"
                        stroke="#0F9D58"
                        strokeWidth="8"
                        strokeDasharray={circumference}
                        style={{ strokeDashoffset: strokeDashoffset }}
                        className="circle-progress"
                    />
                </svg>
                
               
                <div className="kpi-circle-text">
                    <span className="kpi-circle-done">{concluido}</span>
                    <span className="kpi-circle-total">/{total}</span>
                </div>
            </div>
        );
    };

    return (
        <div className="kpi-container">
            {cardsInfo.map((card, index) => (
                <div key={index} className={`kpi-card ${card.destaque ? 'card-horizontal' : 'card-vertical'}`}>
                    <h3 className="kpi-title">{card.titulo}</h3>

                    {card.destaque ? (
                        renderCircle(card.valor)
                    ) : (
                        <span
                            className="kpi-value"
                            style={{ color: card.corValor || "#4A4A4D" }}
                        >
                            {card.valor}
                        </span>
                    )}
                </div>
            ))}
        </div>
    );
}

export default KpiCards;