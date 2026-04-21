import React, { useState } from 'react';
import TeamSection from "./components/TeamSection.jsx";
import { getEquipes, getOKR } from "../../services/data/api_mock.js";
import OKRMonitoring from "./components/OKRMonitoring.jsx";
import "./styles/main.css";
import SideBar from '../../components/Sidebar/SideBar.jsx';


const EquipesPage = () => {
  const listaParaExibirEquipes = getEquipes();
  const listaParaExibirOkr = getOKR();

  const [showOKR, setShowOKR] = useState(false);

  

return (
  <div className="page-layout">
    <SideBar />

    <main className="main-hm">
      <h1 className='title-welcome-hm'>Olá, Kaio!</h1>
      <p className='subtitle-hm'>Acompanhe o desenvolvimento dos seus times</p>

      <div className="container-cards">
        {listaParaExibirEquipes.map((equipe) => (
          <TeamSection
            key={equipe.id}
            nomeEquipe={equipe.nome}
            membros={equipe.dev}
            cliente={equipe.cli}
          />
        ))}
      </div>

      <div className="monitoring-container-okr">
        <div
          className="header-okr"
          onClick={() => setShowOKR(!showOKR)}
          style={{ cursor: 'pointer' }}
        >
          <h2 className="main-title-okr">Andamento das OKR</h2>
          <span className="toggle-icon-okr">
            {showOKR ? "▲" : "▼"}
          </span>
        </div>

        {showOKR && (
          <div className="content-wrapper-okr">
            <div className="cards-row-okr">
              {listaParaExibirOkr.map((okr) => (
                <OKRMonitoring
                  key={okr.id}
                  id={okr.id}
                  porcentagem={okr.porcentagem}
                  prazo={okr.prazo}
                  descricao={okr.descricao}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  </div>
);
}

export default EquipesPage;