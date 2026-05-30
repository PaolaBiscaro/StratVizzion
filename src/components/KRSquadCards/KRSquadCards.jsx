import React from "react";
import "./KRSquadCards.css";

function KRSquadCards({ squads = [] }) {
    const defaultSquads = [
        { squad: "Minha equipe de software", kr: "KR-01 - Atender as chamadas em pelo menos 5 minutos" },
        { squad: "Minha equipe de software", kr: "" },
        { squad: "Minha equipe de software", kr: "" },
    ];

    const data = squads.length > 0 ? squads : defaultSquads;

    return (
        <div className="kr-squad-cards">
            {data.map((item, index) => (
                <div key={index} className="kr-squad-card">
                    <p className="kr-squad-name">
                        <strong>Squad:</strong> {item.squad}
                    </p>
                    {item.kr && <p className="kr-squad-kr">{item.kr}</p>}
                </div>
            ))}
        </div>
    );
}

export default KRSquadCards;