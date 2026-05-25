import React from 'react';
import './KPICards.css';

function KpiCards() {
    const cardsInfo = [
        { titulo: "OKR's concluídas em 2026", valor: "2/6", destaque: true },
        { titulo: "Quantidade de Projetos", valor: "5" },
        { titulo: "Total de KR's", valor: "24" },
        { titulo: "ROI", valor: "R$ 1.2 M", corValor: "#0F9D58" }
    ];

    return (
        <div className="kpi-container">
            {cardsInfo.map((card, index) => (
                // Adicionamos um template string para aplicar a classe correta
                <div key={index} className={`kpi-card ${card.destaque ? 'card-horizontal' : 'card-vertical'}`}>
                    <h3 className="kpi-title">{card.titulo}</h3>

                    {card.destaque ? (
                        <div className="kpi-circle">{card.valor}</div>
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