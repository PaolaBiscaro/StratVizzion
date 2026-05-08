import React from "react";
import OKRHeader from "./OKRHeader";
import OKRProgressBar from "./OKRProgressbar";
import OKRFooter from "./OKRFooter";
import "./OKRInfo.css";

function OKRInfo(){
    const mockIaStatusTopics = [
        "Exemplo: KR em observacao, com pequenas variacoes semanais.",
        "Exemplo: Risco medio de atraso se houver bloqueio de dependencia.",
        "Exemplo: Sugerido reforcar tarefas de maior impacto nesta sprint."
    ];

    return(
        <div className="info">
            <OKRHeader />
            <OKRProgressBar progress={50}/>
            <OKRFooter iaAlerts={mockIaStatusTopics} />
        </div>
    );
}

export default OKRInfo;