import React from "react";
import "./OKRProgressBar.css";

function OKRProgressBar({ progress = 60 }) {
    return (
        <div className="progress-container">
            <div className="progress-bar">
                <div 
                    className="progress-fill" 
                    style={{ width: `${progress}%` }}
                />
            </div>
            <span className="progress-label">{progress}%</span>
        </div>
    );
}

export default OKRProgressBar;