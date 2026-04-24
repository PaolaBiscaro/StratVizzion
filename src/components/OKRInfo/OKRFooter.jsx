import React from "react";
import "./OKRFooter.css"

function OKRFooter({footerRequest="Insert AI Footer request here"}){
    return(
        <div className="footer">
            <p>{footerRequest}</p>
        </div>
    )
}

export default OKRFooter;