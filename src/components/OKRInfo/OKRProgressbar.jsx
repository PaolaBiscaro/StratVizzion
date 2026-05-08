import React from "react";
import { Line } from "rc-progress";
import "./OKRProgressbar.css";

function OKRProgressBar({ progress = 60 }) {
    const clampedProgress = Math.min(100, Math.max(0, progress));

    return (
        <div className="okr-progress-container">
            <div className="okr-progress-track">
                <Line
                    percent={clampedProgress}
                    strokeWidth={16}
                    trailWidth={16}
                    strokeColor="#18B273"
                    trailColor="#A7E2D1"
                    strokeLinecap="butt"
                    className="okr-progress-bar"
                />

                <span className="okr-progress-percent">{clampedProgress}%</span>
            </div>
        </div>
    );
}

export default OKRProgressBar;