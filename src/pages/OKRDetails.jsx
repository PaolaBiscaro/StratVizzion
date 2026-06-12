import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SideBar from "../components/Sidebar/SideBar";
import OKRRoute from "../components/OKRDetailsTitle/OKRRoute";
import OKRInfo from "../components/OKRInfo/OKRInfo";
import StickyNote from "../components/StickyNote/StickyNote";
import KRSquadCards from "../components/KRSquadCards/KRSquadCards";
import KRTable from "../components/KRTable/KRTable";
import OKRProgressHistory from "../components/OKRProgressHistory/OKRProgressHistory";
import TaskStatsCard from "../components/TaskStatsCard/TaskStatsCard";
import "../styles/OKRDetails.css";
import { getOkrById } from "../services/api/okrs";
import { getKeyResultsByOkr } from "../services/api/keyresults";
import { getOkrMetrics, getOkrTeam } from "../services/api/manager";

const OKR_STATUS = { 1: "Criado", 2: "Ativo", 3: "Concluido" };
const CYCLE_LABEL = { 1: "Q1", 2: "Q2", 3: "Q3", 4: "Q4" };

const stickyNotesByStatus = {
  1: ["OKR criada, aguardando início.", "Definir responsável e prazo de início."],
  2: [
    "Informar a equipe de Marketing para antecipar a campanha, para 07/07/2026.",
    "Não pode atrasar a funcionalidade Y, avisar o Robson",
  ],
  3: ["OKR concluída com sucesso no ciclo.", "Avaliar aprendizados para o próximo ciclo."],
};

function OKRDetails() {
  const { okrId } = useParams();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [okr, setOkr] = useState(null);
  const [krs, setKrs] = useState([]);
  const [progress, setProgress] = useState(0);
  const [cycle, setCycle] = useState(null);
  const [squads, setSquads] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: okrData } = await getOkrById(okrId);
        setOkr(okrData);

        const { data: krsData } = await getKeyResultsByOkr(okrId);
        setKrs(krsData);

        // Busca o progresso da API, similar ao HomeManager
        try {
          const historyResponse = await getOkrMetrics(okrId);
          const historico = historyResponse.data && historyResponse.data.length > 0
            ? historyResponse.data[0]
            : null;
          
          const progressPercentage = historico ? historico.progressPercentage : 0;
          setProgress(progressPercentage);

          // Armazena todo o histórico para o gráfico
          const historicoCompleto = historyResponse.data && Array.isArray(historyResponse.data)
            ? historyResponse.data
            : [];
          setHistory(historicoCompleto);
        } catch (error) {
          console.error(`Erro ao buscar métricas da OKR ${okrId}:`, error);
          setProgress(0);
          setHistory([]);
        }

        // Busca squads (projetos Jira) com membros agrupados por projeto
        try {
          const teamResponse = await getOkrTeam(okrId);
          
          // Monta squads com dados já estruturados pelo backend
          const squadsComMembros = teamResponse.data && Array.isArray(teamResponse.data)
            ? teamResponse.data.map((squad) => ({
                jiraProjectId: squad.jiraProjectId,
                members: squad.members || [],
                kr: krsData.length > 0 ? krsData[0].title : ""
              }))
            : [];

          setSquads(squadsComMembros);
        } catch (error) {
          console.error("Erro ao buscar squads e membros:", error);
          setSquads([]);
        }
      } catch (error) {
        console.error("Erro ao buscar dados da OKR:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [okrId]);

  if (loading) return <div>Carregando...</div>;
  if (!okr) return <div>OKR não encontrada.</div>;

  const cycleLabel = cycle
    ? `${CYCLE_LABEL[cycle.cyclesEnum]} / ${cycle.year}`
    : `Ciclo ${okr.cycleId}`;

  const notes = stickyNotesByStatus[okr.status] || stickyNotesByStatus[2];

  const krsForTable = krs.map((kr) => ({
    id: kr.id,
    title: kr.title,
    currentValue: kr.currentValue,
    goalValue: kr.goalValue,
    unit: kr.unit,
    limitDate: kr.limitDate,
    status: kr.currentValue >= kr.goalValue ? "concluida" : 
            new Date(kr.limitDate) < new Date() ? "atraso" : "pendente",
  }));

  return (
    <div className="okr-details-page">
      <SideBar/>

      <main className="okr-details-main">
        <OKRRoute OKRname={okr.title} />

        <div className="okr-details-top">
          <OKRInfo
            okrId={okr.id}
            title={okr.title}
            description={okr.description}
            cycleLabel={cycleLabel}
            progress={progress}
          />
          <StickyNote notes={notes} okrId={okr.id} />
        </div>

        <KRSquadCards squads={squads} />
        <TaskStatsCard history={history} />
        <KRTable krs={krsForTable} />
        <OKRProgressHistory data={history} />
      </main>
    </div>
  );
}

export default OKRDetails;