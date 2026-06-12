import React, { useState, useEffect } from "react";
import SideBar from "../components/Sidebar/SideBar";
import OKRConcluded from "../components/OKRConcluded/OKRConcluded";
import OKRMonitoring from "../components/OKRMonitoring/OKRMonitoring.jsx";
import Button from "../components/Button/Button";
import MainTitle from "../components/MainTitle/MainTitle";
import SearchBar from "../components/SearchBar/SearchBar";
import AutoHighlighter from "../components/Highlighter/AutoHighlighter";
import { useSearch } from "../context/SearchContext";
import api from "../services/api/client";
import AlertsPanel from "../components/AlertsPanel/AlertsPanel";
import { getOkrMetrics } from "../services/api/manager";
import "../styles/Home.css";

const CYCLE_LABEL = { 1: "Q1", 2: "Q2", 3: "Q3", 4: "Q4" };

function Home() {
  const { setBusca } = useSearch();
  const [okrs, setOkrs] = useState([]);
  const [cycles, setCycles] = useState({});
  const [selectedOkrId, setSelectedOkrId] = useState(null);
  const [okrMetrics, setOkrMetrics] = useState({});
  const [consolidatedMetrics, setConsolidatedMetrics] = useState({
    totalTasks: 0,
    completedTasks: 0,
    delayedTasks: 0,
  });

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userName = user.name || "Usuário";

  useEffect(() => {
    const fetchOkrs = async () => {
      try {
        const { data } = await api.get("/okr");
        const cycleIds = [...new Set(data.map((okr) => okr.cycleId))];
        const cycleResults = await Promise.all(cycleIds.map((id) => api.get(`/cycles/${id}`)));

        const cycleMap = {};
        cycleResults.forEach(({ data: cycle }) => { cycleMap[cycle.id] = cycle; });

        setCycles(cycleMap);
        setOkrs(data);

        const metricsMap = {};
        for (const okr of data) {
          try {
            const metricsResponse = await getOkrMetrics(okr.id);
            const lastMetric = metricsResponse.data?.length > 0 ? metricsResponse.data[metricsResponse.data.length - 1] : null;
            metricsMap[okr.id] = lastMetric ? {
              progressPercentage: lastMetric.progressPercentage || 0,
              totalTasks: lastMetric.totalTasks || 0,
              completedTasks: lastMetric.completedTasks || 0,
              delayedTasks: lastMetric.delayedTasks || 0,
              pendingTasks: Math.max(0, (lastMetric.totalTasks || 0) - (lastMetric.completedTasks || 0) - (lastMetric.delayedTasks || 0)),
            } : { progressPercentage: 0, totalTasks: 0, completedTasks: 0, delayedTasks: 0, pendingTasks: 0 };
          } catch (error) {
            metricsMap[okr.id] = { progressPercentage: 0, totalTasks: 0, completedTasks: 0, delayedTasks: 0, pendingTasks: 0 };
          }
        }
        setOkrMetrics(metricsMap);

        try {
          const { data: allHistories } = await api.get("/api/OkrHistories");
          const latestHistoriesByOkr = {};
          allHistories.forEach((history) => {
            if (!latestHistoriesByOkr[history.okrId] || new Date(history.referenceDate) > new Date(latestHistoriesByOkr[history.okrId].referenceDate)) {
              latestHistoriesByOkr[history.okrId] = history;
            }
          });
          const consolidated = Object.values(latestHistoriesByOkr).reduce((acc, history) => ({
            totalTasks: acc.totalTasks + (history.totalTasks || 0),
            completedTasks: acc.completedTasks + (history.completedTasks || 0),
            delayedTasks: acc.delayedTasks + (history.delayedTasks || 0),
          }), { totalTasks: 0, completedTasks: 0, delayedTasks: 0 });
          setConsolidatedMetrics(consolidated);
        } catch (error) {
          setConsolidatedMetrics({ totalTasks: 0, completedTasks: 0, delayedTasks: 0 });
        }
      } catch (error) {
        console.error("Erro ao buscar OKRs:", error);
      }
    };
    fetchOkrs();
  }, []);

  const okrsConcluidas = okrs.filter((okr) => okr.status === 3);
  const okrsEmMonitoramento = okrs.filter((okr) => okr.status !== 3);
  const okrsFiltradas = selectedOkrId ? okrsEmMonitoramento.filter((okr) => okr.id === Number(selectedOkrId)) : okrsEmMonitoramento;

  const getCycleLabel = (cycleId) => {
    const cycle = cycles[cycleId];
    return cycle ? `${CYCLE_LABEL[cycle.cyclesEnum]}/${cycle.year}` : "—";
  };

  return (
    <div className="page-layout">
      <SideBar />
      <AutoHighlighter />

      <main id="content" className="home-main-content">
        <div className="home-header-wrapper">
          <MainTitle title={`Olá, ${userName}!`} subtitle="Acompanhe o desenvolvimento de seus projetos" />
          <SearchBar onSearch={(valor) => setBusca(valor)} />
        </div>

        <div className="monitoring-container-okr">
          <div className="left-column-okr">
            <div className="header-okr">
              <h3 className="title-card">Visualização das OKR's - 2026</h3>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <label style={{ fontSize: "13px", color: "var(--color-text-secondary)", whiteSpace: "nowrap" }}>Filtrar OKR</label>
                <select value={selectedOkrId ?? ""} onChange={(e) => setSelectedOkrId(e.target.value || null)} style={{ padding: "6px 12px", borderRadius: "10px", border: "1px solid #D9E0E6", fontSize: "13px", cursor: "pointer", minWidth: "200px" }}>
                  <option value="">Todas as OKRs</option>
                  {okrsEmMonitoramento.map((okr) => (<option key={okr.id} value={okr.id}>{okr.title || `OKR #${okr.id}`}</option>))}
                </select>
              </div>
            </div>

            <div className="content-wrapper-okr">
              <div className="cards-row-okr">
                {okrsFiltradas.length > 0 ? (
                  okrsFiltradas.map((okr) => (
                    <OKRMonitoring key={okr.id} {...okr} porcentagem={okrMetrics[okr.id]?.progressPercentage} prazo={getCycleLabel(okr.cycleId)} totalTasks={okrMetrics[okr.id]?.totalTasks} pendingTasks={okrMetrics[okr.id]?.pendingTasks} delayedTasks={okrMetrics[okr.id]?.delayedTasks} botao="Ver detalhes" rota={`/okr-detalhada/${okr.id}`} />
                  ))
                ) : (<p style={{ color: "var(--color-text-secondary)", fontSize: "14px" }}>Nenhuma OKR encontrada.</p>)}
              </div>
            </div>
          </div>

          <aside className="home-right-sidebar">
            <div className="home-alerts-card">
              <h3 className="home-alerts-title">Alertas</h3>
              <AlertsPanel totalTasks={consolidatedMetrics.totalTasks} completedTasks={consolidatedMetrics.completedTasks} delayedTasks={consolidatedMetrics.delayedTasks} />
            </div>
          </aside>
        </div>

        <div className="home-btn-wrapper">
          <Button texto="Criar nova OKR" url="/nova-okr" variante="verde" style={{ width: "auto", padding: "16px 32px" }} />
        </div>
      </main>
    </div>
  );
}

export default Home;