import React from "react";
import { Line } from "rc-progress";
import "./OKRProgressbar.css"

function OKRProgressBar({ progress = 60 }) {
    const clampedProgress = Math.min(100, Math.max(0, progress));

    return (
        <div className="progress-container">
            <div className="progress-wrapper">
                <Line
                    percent={clampedProgress}
                    strokeWidth={2}
                    strokeColor="#0FB174"
                    trailColor="#6FE0C6"
                    trailWidth={2}
                    strokeLinecap="round"
                    className="progress-bar"
                />
            </div>
        </div>
    );
}

export default OKRProgressBar;