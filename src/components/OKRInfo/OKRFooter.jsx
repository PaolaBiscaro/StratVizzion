import React from "react";
import "./OKRFooter.css"

const defaultIaAlerts = [
    "Exemplo: Status geral do KR (atrasado, no prazo, adiantado).",
    "Exemplo: Principal risco detectado pela IA.",
    "Exemplo: Recomendacao de acao para o proximo ciclo."
];

function OKRFooter({ iaAlerts = defaultIaAlerts }) {
    const alerts = Array.isArray(iaAlerts) ? iaAlerts : [iaAlerts];

    return(
        <div className="footer">
            <p className="footer-ia-title"><strong>Avisos IA</strong></p>
            <ul className="footer-ia-list">
                {alerts.map((alert, index) => (
                    <li key={`ia-alert-${index}`}>{alert}</li>
                ))}
            </ul>
        </div>
    )
}

export default OKRFooter;