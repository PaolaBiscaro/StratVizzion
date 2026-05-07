import React from "react";
import "./KRSubTag.css";
import { FiCalendar, FiTrendingUp } from "react-icons/fi"; 

function KRSubTag({ deadline, value, goal }) {
    return (
        <div className="kr-subtag">
            <p className="kr-subtag-item">
                <FiCalendar className="kr-icon" />
                <span>Prazo: {deadline}</span>
            </p>
            
            <p className="kr-subtag-item">
                <FiTrendingUp className="kr-icon" />
                <span>Valor atual: {value} · Meta: {goal}</span>
            </p>
        </div>
    );
}

export default KRSubTag;