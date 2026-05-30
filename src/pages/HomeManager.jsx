import React, { useState } from 'react';
import SideBar from '../components/Sidebar/SideBar.jsx';
import MainTitle from '../components/MainTitle/MainTitle.jsx';
import SearchBar from "../components/SearchBar/SearchBar";
import AutoHighlighter from "../components/Highlighter/AutoHighlighter";
import { useSearch } from "../context/SearchContext";
import TeamStats from '../components/TeamStats/TeamStats.jsx';
import OKRMonitoring from '../components/OKRMonitoring/OKRMonitoring.jsx';
import FilterHome from '../components/FilterHome/FilterHome.jsx';
import MembersPanel from '../components/MembersPanel/MembersPanel.jsx';
import Button from '../components/Button/Button.jsx'; 
import { getOKR } from "../services/data/api_mock.js";
import '../styles/HomeManager.css';
import '../styles/variables.css';

const HomeManager = () => {
  const { setBusca } = useSearch();
  const listaParaExibirOkr = getOKR();
  const [mostrarConcluidas, setMostrarConcluidas] = useState(false);
  const [ordenarMaior, setOrdenarMaior] = useState(false);
  const [trimestre, setTrimestre] = useState('Todos');
  const [ano, setAno] = useState('2026');

    let okrsFiltradas = listaParaExibirOkr.filter((okr) => {
    if (okr.ano !== ano) return false;

    if (trimestre !== "Todos" && okr.ciclo !== trimestre) return false;
    const isConcluida = okr.porcentagem >= 100 || okr.status === "Concluído";
    if (mostrarConcluidas) {
      return isConcluida;
    } else {
      return !isConcluida;
    }
  });

  if (ordenarMaior) {
    okrsFiltradas.sort((a, b) => b.porcentagem - a.porcentagem);
  }

  return (
    <div className="dashboard-layout">
      <SideBar typeUser={"Manager"} nameUser={"Paulo Peres"} />
      
      <main className="dashboard-main">
        <AutoHighlighter />
        
        <div className="dashboard-header">
          <MainTitle
            title="Olá, Kaio!"
            subtitle="Acompanhe o desenvolvimento de seus projetos"
          />
          <div className="header-actions">
            <SearchBar onSearch={(valor) => setBusca(valor)} />
          </div>
        </div>

        <div className="dashboard-content-wrapper">
          <div className="dashboard-left-column">
            <TeamStats />
          
            <div className="home-okr-header">
              <h3 className="home-okr-title">Visualização das OKR's - 2026</h3>
              <FilterHome
                mostrarConcluidas={mostrarConcluidas}
                setMostrarConcluidas={setMostrarConcluidas}
                ordenarMaior={ordenarMaior}
                setOrdenarMaior={setOrdenarMaior}
                trimestre={trimestre}
                setTrimestre={setTrimestre}
                ano={ano}
                setAno={setAno}
              />
            </div>
            
            <div className="monitoring-container-okr">
              <div className="home-cards-grid">
                {okrsFiltradas.length > 0 ? (
                  okrsFiltradas.map((okr) => (
                    <OKRMonitoring
                      key={okr.id}
                      id={okr.id}
                      porcentagem={okr.porcentagem}
                      prazo={`${okr.ciclo}/${okr.ano}`}
                      descricao={okr.descricao}
                      botao="Ver detalhes"
                    />
                  ))
                ) : (
                  <p style={{ padding: "20px", color: "#666" }}>Nenhuma OKR encontrada para estes filtros.</p>
                )}
              </div>
            </div>
          </div>

          <div className="dashboard-right-column">
            <MembersPanel />
            <div className="home-btn-wrapper">
              <Button
                texto="Criar nova OKR"
                url="/nova-okr"
                variante="verde"
                className="HomeDirector"
                style={{ width: "100%", padding: "16px", marginTop: "20px" }}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomeManager;