import React from "react";
import "./OKRConcluded.css"


function OKRConclued({ okrs = [] }){
    return(
    <div className="OKRConcluded">
        <h3 className="title-card">OKR Concluídas</h3>

        {okrs.length > 0 ? (
            <div className="okr-concluded-list">
                {okrs.map((okr) => (
                    <div className="okr-concluded-item" key={okr.id}>
                        <strong>{okr.id}</strong>
                        <span>{okr.descricao}</span>
                    </div>
                ))}
            </div>
        ) : (
            <p className="okr-concluded-empty">Nenhuma OKR concluída no momento.</p>
        )}

    </div>    
    )
}


export default OKRConclued;