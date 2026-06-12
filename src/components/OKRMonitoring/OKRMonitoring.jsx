import React from 'react';
import "./OKRMonitoring.css";
import { useNavigate } from "react-router-dom";


const OKRMonitoring = ({ id, titulo, porcentagem, prazo, descricao, totalTasks, pendingTasks, delayedTasks, botao, rota }) => {
  const navigate = useNavigate();

 
  return (

    <div key={id} className="item-card-okr">
      <div className="chart-container-okr">
        <div
          className="circle-progress-okr"
          style={{ "--percent-okr": porcentagem }}
        >
          <span className="percent-text-okr">{porcentagem}%</span>
        </div>
      </div>
      <h3 className="id-text-okr">{titulo}</h3>
      <p className="deadline-okr">Prazo: {prazo}</p>
      <p className="description-okr">{descricao}</p>
      
      {/* Informações de tarefas */}
      {totalTasks > 0 && (
        <div className="task-info-okr">
          <div className="task-stat">
            <span className="task-label">Total:</span>
            <span className="task-number">{totalTasks}</span>
          </div>
          <div className="task-stat">
            <span className="task-label">Pendentes/Atraso:</span>
            <span className="task-number">{pendingTasks + delayedTasks}</span>
          </div>
        </div>
      )}
      
      <button 
            className="btn-add-key-okr" 
            onClick={() => navigate(rota)}
        >
            {botao}
        </button>
    </div>

  );
};

export default OKRMonitoring;