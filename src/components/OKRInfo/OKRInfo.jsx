import React from "react";
import OKRHeader from "./OKRHeader";
import "./OKRInfo.css";

function OKRInfo({
    okrId,
    title,
    description,
    cycleLabel,
    progress,
}) {
    return (
        <div className="info">
            <OKRHeader
                okrId={okrId}
                titleRequest={title}
                descRequest={description}
                cycleRequest={cycleLabel}
                progress={progress}
            />
        </div>
    );
}

export default OKRInfo;