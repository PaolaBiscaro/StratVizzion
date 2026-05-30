import React, { useState } from "react";
import "../styles/Home.css";
import SideBar from "../components/Sidebar/SideBar";
import OKRMonitoring from "../components/OKRMonitoring/OKRMonitoring";
import { getOKR } from "../services/data/api_mock.js";
import Button from "../components/Button/Button";
import MainTitle from "../components/MainTitle/MainTitle";
import SearchBar from "../components/SearchBar/SearchBar";
import AutoHighlighter from "../components/Highlighter/AutoHighlighter";
import { useSearch } from "../context/SearchContext";
import KpiCards from "../components/KPICards/KPICards";
import LineChart from "../components/HomeDirectorLineChart/LineChart";
import AlertsPanel from "../components/AlertsPanel/AlertsPanel";
import FilterHome from "../components/FilterHome/FilterHome";

function Home() {
  const { setBusca } = useSearch();
  const listaParaExibirOkr = getOKR();

  const [mostrarConcluidas, setMostrarConcluidas] = useState(false);
  const [ordenarMaior, setOrdenarMaior] = useState(false);
  const [trimestre, setTrimestre] = useState("Todos");
  const [ano, setAno] = useState("2026");

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
    <div className="home-page-layout">
      <SideBar typeUser="Director" nameUser={"Paulo"} />
      <AutoHighlighter />

      <main id="content" className="home-main-content">

        <div className="home-header-wrapper">
          <MainTitle
            title="Olá, Paulo!"
            subtitle="Acompanhe o desenvolvimento de seus projetos"
          />
          <div className="home-search-area">
            <SearchBar onSearch={(valor) => setBusca(valor)} />
          </div>
        </div>

        <div className="home-columns-wrapper">
          <div className="home-left-column">
            <KpiCards />

            <div className="home-chart-container">
              <div className="home-chart-title-select">
              <select className="home-chart-select">
                <option>Selecionar OKR</option>
              </select>
              <h4 className="home-chart-title">Evolução do OKR</h4>
              </div>
              <LineChart />
            </div>

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

          <aside className="home-right-sidebar">
            <div className="home-alerts-card">
              <h3 className="home-alerts-title">Alertas</h3>
              <AlertsPanel />
            </div>

            <div className="home-btn-wrapper">
              <Button
                texto="Criar nova OKR"
                url="/nova-okr"
                variante="verde"
                className="HomeDirector"
                style={{ width: "100%", padding: "16px" }}
              />
            </div>
          </aside>

        </div>
      </main>
    </div>
  );
}

export default Home;