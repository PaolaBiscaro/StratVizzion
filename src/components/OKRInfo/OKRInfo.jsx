import React from "react";
import OKRHeader from "./OKRHeader";
import OKRProgressBar from "./OKRProgressbar";
import OKRFooter from "./OKRFooter";
import "./OKRInfo.css";

function OKRInfo({
    title,
    description,
    cycleLabel,
    progress,
    iaAlerts = []
}) {
    return(
        <div className="info">
            <OKRHeader
                titleRequest={title}
                descRequest={description}
                cycleRequest={cycleLabel}
            />
            <OKRProgressBar progress={progress} />
            <OKRFooter iaAlerts={iaAlerts} />
        </div>
    );
}

export default OKRInfo;