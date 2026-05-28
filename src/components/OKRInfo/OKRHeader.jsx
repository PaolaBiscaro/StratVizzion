import React from "react";
import "./OKRHeader.css";

function OKRHeader({
    okrId = "OKR_003",
    titleRequest = "Title Request",
    descRequest = "Desc Request",
    cycleRequest = "Cycle Request",
    progress = 0
}) {
    return (
        <div className="OKRHeader">
            <span className="okr-header-label">{okrId}</span>
            <p><strong>Título:</strong> {titleRequest}</p>
            <p className="okr-header-desc"><strong>Descrição:</strong> {descRequest}</p>
            <div className="okr-header-footer">
                <p>
                    <strong>Período final definida:</strong>{" "}
                    <span className="okr-cycle-value">{cycleRequest}</span>
                </p>
                <span className="okr-header-progress">{progress}%</span>
            </div>
        </div>
    );
}

export default OKRHeader;