import React from 'react';
import "../styles/OKRMonitoring.css";


const OKRMonitoring = ({ id, porcentagem, prazo, descricao }) => {
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
      <button className="btn-add-key-okr">Adicionar KeyResult</button>
    </div>

  );
};

export default OKRMonitoring;