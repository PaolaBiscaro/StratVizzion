import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SideBar from "../components/Sidebar/SideBar";
import OKRRoute from "../components/OKRDetailsTitle/OKRRoute";
import OKRInfo from "../components/OKRInfo/OKRInfo";
import StickyNote from "../components/StickyNote/StickyNote";
import KRSquadCards from "../components/KRSquadCards/KRSquadCards";
import KRTable from "../components/KRTable/KRTable";
import "../styles/OKRDetails.css";
import { getOkrById } from "../services/api/okrs";
import { getKeyResultsByOkr } from "../services/api/keyresults";

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
  const [cycle, setCycle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: okrData } = await getOkrById(okrId);
        setOkr(okrData);

        const { data: krsData } = await getKeyResultsByOkr(okrId);
        setKrs(krsData);
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

  const squads = [
    { squad: "Minha equipe de software", kr: krs[0]?.title || "" },
    { squad: "Minha equipe de software", kr: krs[1]?.title || "" },
    { squad: "Minha equipe de software", kr: krs[2]?.title || "" },
  ];

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

  const progress = krs.length > 0
    ? Math.round(krs.reduce((acc, kr) => acc + (kr.currentValue / kr.goalValue) * 100, 0) / krs.length)
    : 0;

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
        <KRTable krs={krsForTable} />
      </main>
    </div>
  );
}

export default OKRDetails;