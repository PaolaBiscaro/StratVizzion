import React from "react";
import "./FilterTab.css";
import "../../styles/variables.css";

function FilterTab({ label, count, isActive, onClick }) {
    return (
        <button 
            className={`filter-tab ${isActive ? "active" : ""}`} 
            onClick={onClick}
        >
            {label}({count})
        </button>
    );
}

export default FilterTab;