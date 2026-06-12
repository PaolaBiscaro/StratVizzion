import React from "react";
import "./KRTag.css";

function KRTag({ name, title, okr, onClick }) {
    return (
        <div 
            className="kr-tag" 
            onClick={onClick} 
            style={{ cursor: onClick ? "pointer" : "default" }}
        >
            <p className="kr-tag-name">{name}</p>
            {/* O h3 abaixo vai renderizar com sucesso o title (ex: "Aumentar a demanda do app") */}
            <h3 className="kr-tag-title">{title}</h3>
            <p className="kr-tag-okr">{okr}</p>
        </div>
    );
}

export default KRTag;