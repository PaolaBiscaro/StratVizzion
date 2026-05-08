import React from "react";
import { useParams } from "react-router-dom";
import SideBar from "../components/Sidebar/SideBar";
import OKRRoute from "../components/OKRDetailsTitle/OKRRoute";
import OKRInfo from "../components/OKRInfo/OKRInfo";
import Warning from "../components/WarningPanel/Warning";
import GraphicsPanel from "../components/GraphicsPanel/Graphics";
import { getOKR } from "../services/data/api_mock";
import "../styles/OKRDetails.css";

// Cada OKR deve ter sua própria página de Detalhes!

function OKRDetails() {
    const { okrId } = useParams();
    const okrList = getOKR();
    const selectedOkr = okrList.find((item) => item.id === okrId) || okrList[0];

    const iaAlertsByStatus = {
        "Concluído": [
            "A IA acha que esta tudo certo.",
            "Parece que terminou mesmo.",
            "Talvez so continuar olhando de vez em quando."
        ],
        "Em andamento": [
            "A IA acha que esta indo, mas ainda falta bastante.",
            "Pode atrasar se o time diminuir o ritmo.",
            "Sugestao simples: focar no que da mais resultado."
        ],
        "Não iniciado": [
            "A IA viu que ainda nao comecou.",
            "Risco de atrasar e alto se continuar parado.",
            "Melhor comecar logo com uma tarefa pequena."
        ]
    };

    const warningByStatus = {
        "Concluído": "Alerta baixo: OKR concluida.",
        "Em andamento": "Alerta medio: precisa manter ritmo.",
        "Não iniciado": "Alerta alto: ainda nao comecou."
    };

    const chartByStatus = {
        "Concluído": [
            { mes: "Jan", real: 35, meta: 20 },
            { mes: "Fev", real: 55, meta: 40 },
            { mes: "Mar", real: 78, meta: 60 },
            { mes: "Abr", real: 100, meta: 80 }
        ],
        "Em andamento": [
            { mes: "Jan", real: 8, meta: 10 },
            { mes: "Fev", real: 22, meta: 25 },
            { mes: "Mar", real: 38, meta: 45 },
            { mes: "Abr", real: selectedOkr.porcentagem, meta: 60 }
        ],
        "Não iniciado": [
            { mes: "Jan", real: 0, meta: 10 },
            { mes: "Fev", real: 0, meta: 20 },
            { mes: "Mar", real: 0, meta: 35 },
            { mes: "Abr", real: selectedOkr.porcentagem, meta: 50 }
        ]
    };

    const iaAlerts = iaAlertsByStatus[selectedOkr.status] || iaAlertsByStatus["Em andamento"];
    const warningMessage = warningByStatus[selectedOkr.status] || warningByStatus["Em andamento"];
    const chartData = chartByStatus[selectedOkr.status] || chartByStatus["Em andamento"];
    const statusDetail = `Oi, eu sou uma IA simples. Eu vejo a ${selectedOkr.id} com ${selectedOkr.porcentagem}% no ciclo ${selectedOkr.ciclo}/${selectedOkr.ano}. O status agora e ${selectedOkr.status}.`;

    return (
        <div className="okr-details-page">
            <SideBar
                typeUser={"Director"}
                nameUser={"Paulo"}
            />

            <main className="okr-details-main">
                <OKRRoute OKRname={selectedOkr.id} />
                <OKRInfo
                    title={selectedOkr.id}
                    description={selectedOkr.descricao}
                    cycleLabel={`${selectedOkr.ciclo}/${selectedOkr.ano}`}
                    progress={selectedOkr.porcentagem}
                    iaAlerts={iaAlerts}
                />

                <div className="okr-details-bottom">
                    <div className="okr-details-warning">
                        <Warning warningMessage={warningMessage} />
                    </div>

                    <div className="okr-details-graphics">
                        <GraphicsPanel statusDetail={statusDetail} chartData={chartData} />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default OKRDetails;