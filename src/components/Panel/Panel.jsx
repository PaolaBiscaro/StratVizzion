import React from "react";
import "./Panel.css"
import { IoIosWarning } from "react-icons/io";

function Panel({children}){
    return(
        <div className="panel">
            {children}
        </div>
    )
}

export default Panel;