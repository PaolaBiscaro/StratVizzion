import React from "react";
import OKRHeader from "./OKRHeader";
import OKRProgressBar from "./OKRProgressbar";
import OKRFooter from "./OKRFooter";
import "./OKRInfo.css";

function OKRInfo(){
    return(
        <div className="info">
            <OKRHeader/>
            <OKRProgressBar progress={100}/>
            <OKRFooter/>
        </div>
    );
}

export default OKRInfo;