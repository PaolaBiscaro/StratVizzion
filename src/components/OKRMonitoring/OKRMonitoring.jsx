import React from 'react';
import "./OKRMonitoring.css";
import { useNavigate } from "react-router-dom";


const OKRMonitoring = ({ id, porcentagem, prazo, descricao, botao, rota }) => {
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
      <h3 className="id-text-okr">{id}</h3>
      <p className="deadline-okr">Prazo: {prazo}</p>
      <p className="description-okr">{descricao}</p>
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