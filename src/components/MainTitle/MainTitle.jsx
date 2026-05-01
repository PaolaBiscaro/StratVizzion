import React from "react";
import "./MainTitle.css";

function MainTitle({title, subtitle}){
    return(
        <div className="spacing">
            <h1 className="title-h1">{title}</h1>
            <p className="subtitle-h1">{subtitle}</p>
        </div>
    )
}

export default MainTitle;