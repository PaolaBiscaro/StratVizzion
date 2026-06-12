import React, { useState, useEffect } from "react";
import SideBar from "../components/Sidebar/SideBar";
import OKRConcluded from "../components/OKRConcluded/OKRConcluded";
import OKRMonitoring from "../components/OKRMonitoring/OKRMonitoring.jsx";
import ArcChart from "../components/OKRChart/OKRChart";
import Button from "../components/Button/Button";
import MainTitle from "../components/MainTitle/MainTitle";
import SearchBar from "../components/SearchBar/SearchBar";
import AutoHighlighter from "../components/Highlighter/AutoHighlighter";
import { useSearch } from "../context/SearchContext";
import api from "../services/api/client";
import KpiCards from "../components/KPICards/KPICards";
import LineChart from "../components/HomeDirectorLineChart/LineChart";
import AlertsPanel from "../components/AlertsPanel/AlertsPanel";
import FilterHome from "../components/FilterHome/FilterHome";

const OKR_STATUS = {
  1: "Criado",
  2: "Ativo",
  3: "Concluido",
};

const CYCLE_LABEL = {
  1: "Q1",
  2: "Q2",
  3: "Q3",
  4: "Q4",
};

// function Home() {
//   useEffect(() => {
//   const fetchOkrs = async () => {
//     try {
//       const { data } = await getOkrs();S
//     } catch (error) {
//       console.error("Erro ao buscar OKRs:", error);
//     }
//   };

//   fetchOkrs();
// }, []);
// }

function Home() {
  const { setBusca } = useSearch();

  const [okrs, setOkrs] = useState([]);
  const [cycles, setCycles] = useState({});

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userName = user.name || "Usuário";
  const userRole = user.role || "";

  useEffect(() => {
    const fetchOkrs = async () => {
      try {
        const { data } = await api.get("/okr");

        const cycleIds = [...new Set(data.map((okr) => okr.cycleId))];
        const cycleResults = await Promise.all(
          cycleIds.map((id) => api.get(`/cycles/${id}`))
        );

        const cycleMap = {};
        cycleResults.forEach(({ data: cycle }) => {
          cycleMap[cycle.id] = cycle;
        });

        setCycles(cycleMap);
        setOkrs(data);
      } catch (error) {
        console.error("Erro ao buscar OKRs:", error);
      }
    };

    fetchOkrs();
  }, []);

  const okrsConcluidas = okrs.filter((okr) => okr.status === 3);
  const okrsEmMonitoramento = okrs.filter((okr) => okr.status !== 3);

  const getCycleLabel = (cycleId) => {
    const cycle = cycles[cycleId];
    if (!cycle) return "—";
    return `${CYCLE_LABEL[cycle.cyclesEnum]}/${cycle.year}`;
  };

  return (
    <div className="page-layout">
      <SideBar typeUser={userRole} nameUser={userName} />

      <AutoHighlighter />

      <main id="content" className="home-main-content">
        <div className="home-header-wrapper">
          <MainTitle
            title={`Olá, ${userName}!`}
            subtitle="Acompanhe o desenvolvimento de seus projetos"
          />
          <SearchBar onSearch={(valor) => setBusca(valor)} />
        </div>

        <div className="monitoring-container-okr">
          <div className="header-okr">
            <h3 className="title-card">OKR - Objetivos e Resultados-Chave</h3>
          </div>
          <div className="content-wrapper-okr">
            <div className="cards-row-okr">
              {okrsEmMonitoramento.map((okr) => (
                <OKRMonitoring
                  key={okr.id}
                  id={okr.id}
                  porcentagem={okr.porcentagem ?? 0}
                  prazo={getCycleLabel(okr.cycleId)}
                  descricao={okr.description}
                  botao="Ver detalhes"
                  rota={`/okr-detalhada/${okr.id}`}
                />
              ))}
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

        <OKRConcluded okrs={okrsConcluidas} />
      </main>
    </div>
  );
}

export default Home;