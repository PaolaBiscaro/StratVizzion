import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SideBar from "../components/Sidebar/SideBar";
import OKRRoute from "../components/OKRDetailsTitle/OKRRoute";
import OKRInfo from "../components/OKRInfo/OKRInfo";
import StickyNote from "../components/StickyNote/StickyNote";
import KRTable from "../components/KRTable/KRTable";
import "../styles/OKRDetails.css";
import { getOkrById } from "../services/api/okrs";
import { getKeyResultsByOkr } from "../services/api/keyresults";
import { getCycleById } from "../services/api/cycles";

const CYCLE_LABEL = { 1: "Q1", 2: "Q2", 3: "Q3", 4: "Q4" };

function OKRDetails() {
  const { okrId } = useParams();

  const [okr, setOkr] = useState(null);
  const [krs, setKrs] = useState([]);
  const [cycle, setCycle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: okrData } = await getOkrById(okrId);
        setOkr(okrData);

        const [krsResult, cycleResult] = await Promise.all([
          getKeyResultsByOkr(okrId),
          getCycleById(okrData.cycleId),
        ]);

        setKrs(krsResult.data);
        setCycle(cycleResult.data);
      } catch (err) {
        console.error("Erro ao buscar dados da OKR:", err);
        setError("Não foi possível carregar os dados da OKR.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [okrId]);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;
  if (!okr) return <div>OKR não encontrada.</div>;

  const cycleLabel = cycle
    ? `${CYCLE_LABEL[cycle.cyclesEnum]} / ${cycle.year}`
    : `Ciclo ${okr.cycleId}`;

  const krsForTable = krs.map((kr) => ({
    id: kr.id,
    title: kr.title,
    currentValue: kr.currentValue,
    goalValue: kr.goalValue,
    unit: kr.unit,
    limitDate: kr.limitDate,
    status:
      kr.currentValue >= kr.goalValue
        ? "concluida"
        : new Date(kr.limitDate) < new Date()
        ? "atraso"
        : "pendente",
  }));

  const progress =
    krs.length > 0
      ? Math.round(
          krs.reduce(
            (acc, kr) => acc + (kr.currentValue / kr.goalValue) * 100,
            0
          ) / krs.length
        )
      : 0;

  return (
    <div className="okr-details-page">
      <SideBar />

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
          <StickyNote okrId={okr.id} />
        </div>

        <KRTable krs={krsForTable} />
      </main>
    </div>
  );
}

export default OKRDetails;