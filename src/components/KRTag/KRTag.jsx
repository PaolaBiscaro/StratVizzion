import React from "react";
import "./KRTag.css";

function KRTag({name, title, okr}) {
    return(
        <div className="kr-tag">
            <p className="kr-tag-name">{name}</p>
            <h3 className="kr-tag-title">{title}</h3>
            <p className="kr-tag-okr">{okr}</p>
        </div>
    )
}

export default KRTag;