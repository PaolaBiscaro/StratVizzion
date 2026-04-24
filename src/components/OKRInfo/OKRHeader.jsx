import React from "react";
import "./OKRHeader.css"

function OKRHeader({titleRequest="Title Request", descRequest="Desc Request", cycleRequest="Cycle Request"}){
    return(
        <div className="OKRHeader">
            <p><strong>Titulo:</strong> {titleRequest}</p>
            <p><strong>Descrição:</strong> {descRequest}</p>
            <p><strong>Período final definida:</strong> {cycleRequest}</p>
        </div>
    )
}

export default OKRHeader;