import React, { useState } from "react";
import "./KRTaskItem.css";
import { FiCheckSquare, FiSquare } from "react-icons/fi";

const statusStyles = {
    "Em andamento": { color: "#128D5F", border: "1px solid #128D5F", background: "transparent" },
    "Concluído": { color: "white", background: "#128D5F", border: "none" },
    "A fazer": { color: "white", background: "#A0A0A0", border: "none" },
    "Bloqueado": { color: "white", background: "#F27457", border: "none" }
};

function TaskItem({ squad, title, initialStatus, userInitials }) {
    const [status, setStatus] = useState(initialStatus);
    const isCompleted = status === "Concluído";

    const toggleComplete = () => {
        setStatus(prev => prev === "Concluído" ? "Em andamento" : "Concluído");
    };

    return (
        <div className={`task-item ${isCompleted ? "task-completed" : ""}`}>
            <div className="task-left">
                <button onClick={toggleComplete} className="checkbox-btn">
                    {isCompleted ? <FiCheckSquare className="icon-checked" /> : <FiSquare />}
                </button>
                <span className="dot" style={{ backgroundColor: isCompleted ? "#A0A0A0" : "#F27457" }}></span>
                <span className="task-badge">{squad}</span>
                <p className={`task-text ${isCompleted ? "text-strikethrough" : ""}`}>
                    {title}
                </p>
            </div>

            <div className="task-right">
                <div className="user-avatar">{userInitials}</div>
                <div className="status-badge" style={statusStyles[status]}>
                    {status}
                </div>
            </div>
        </div>
    );
}

export default TaskItem;