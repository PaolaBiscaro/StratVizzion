import React from "react";
import "./KRTaskFooter.css";

function TaskFooter({ total, completed, inProgress, blocked }) {
    return (
        <footer className="task-footer">
            <span>{total} tarefas no total</span>
            <span>{completed} concluídas</span>
            <span>{inProgress} em andamento</span>
            <span>{blocked} bloqueadas</span>
        </footer>
    );
}

export default TaskFooter;