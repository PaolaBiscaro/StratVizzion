// 

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
            <h3 className="kr-tag-title">{title}</h3>
            <p className="kr-tag-okr">{okr}</p>
        </div>
    );
}

export default KRTag;