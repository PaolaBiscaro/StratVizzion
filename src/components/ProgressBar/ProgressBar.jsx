import React, { useEffect, useState } from "react";
import "./ProgressBar.css";

function ProgressBar({ progress }) {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => setWidth(progress), 100);
        return () => clearTimeout(timer);
    }, [progress]);

    return (
        <div className="progress-container">
            <div 
                className="progress-fill" 
                style={{ width: `${width}%` }}
            >
                <span className="progress-text">{progress}%</span>
            </div>
        </div>
    );
}

export default ProgressBar;