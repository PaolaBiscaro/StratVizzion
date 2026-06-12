import React from "react";
import "./TaskStatsCard.css";

function TaskStatsCard({ history = [] }) {
    // Pega o último registro de histórico
    const lastRecord = history && history.length > 0 ? history[history.length - 1] : null;

    if (!lastRecord) {
        return (
            <div className="task-stats-card">
                <h3 className="task-stats-title">Estatísticas de Tarefas</h3>
                <p className="task-stats-empty">Nenhum dado disponível</p>
            </div>
        );
    }

    const totalTasks = lastRecord.totalTasks || 0;
    const completedTasks = lastRecord.completedTasks || 0;
    const delayedTasks = lastRecord.delayedTasks || 0;
    const pendingTasks = Math.max(0, totalTasks - completedTasks - delayedTasks);

    return (
        <div className="task-stats-card">
            <h3 className="task-stats-title">Estatísticas de Tarefas (Atualizado)</h3>
            <div className="task-stats-grid">
                <div className="stat-item">
                    <span className="stat-label">Total</span>
                    <span className="stat-number total">{totalTasks}</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">Concluído</span>
                    <span className="stat-number completed">{completedTasks}</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">Pendente</span>
                    <span className="stat-number pending">{pendingTasks}</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">Atrasado</span>
                    <span className="stat-number delayed">{delayedTasks}</span>
                </div>
            </div>
        </div>
    );
}

export default TaskStatsCard;
