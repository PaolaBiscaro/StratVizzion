import React from "react";
import { useParams } from "react-router-dom";
import SideBar from "../components/Sidebar/SideBar";
import OKRRoute from "../components/OKRDetailsTitle/OKRRoute";
import OKRInfo from "../components/OKRInfo/OKRInfo";
import StickyNote from "../components/StickyNote/StickyNote";
import KRSquadCards from "../components/KRSquadCards/KRSquadCards";
import KRTable from "../components/KRTable/KRTable";
import { getOKR } from "../services/data/api_mock";
import "../styles/OKRDetails.css";

function OKRDetails() {
    const { okrId } = useParams();
    const okrList = getOKR();
    const selectedOkr = okrList.find((item) => item.id === okrId) || okrList[0];

    const stickyNotesByStatus = {
        "Concluído": [
            "OKR concluída com sucesso no ciclo.",
            "Avaliar aprendizados para o próximo ciclo."
        ],
        "Em andamento": [
            "Informar a equipe de Marketing para antecipar a campanha, para 07/07/2026.",
            "Não pode atrasar a funcionalidade Y, avisar o Robson"
        ],
        "Não iniciado": [
            "Risco alto: OKR ainda não foi iniciada.",
            "Definir responsável e prazo de início urgente."
        ]
    };

    const notes = stickyNotesByStatus[selectedOkr.status] || stickyNotesByStatus["Em andamento"];

    const squads = [
        { squad: "Minha equipe de software", kr: "KR-01 - Atender as chamadas em pelo menos 5 minutos" },
        { squad: "Minha equipe de software", kr: "" },
        { squad: "Minha equipe de software", kr: "" },
    ];

    const mockKrsByOkr = {
        OKR_0001: [
            { id: "KR_001", status: "pendente" },
            { id: "KR_002", status: "pendente" },
            { id: "KR_003", status: "pendente" },
            { id: "KR_004", status: "atraso" },
            { id: "KR_005", status: "concluida" },
        ],
        OKR_0002: [
            { id: "KR_006", status: "pendente" },
            { id: "KR_007", status: "atraso" },
            { id: "KR_008", status: "concluida" },
        ],
        OKR_0003: [
            { id: "KR_009", status: "pendente" },
            { id: "KR_010", status: "pendente" },
            { id: "KR_011", status: "atraso" },
            { id: "KR_012", status: "atraso" },
            { id: "KR_013", status: "concluida" },
            { id: "KR_014", status: "concluida" },
        ],
        OKR_0004: [
            { id: "KR_015", status: "atraso" },
            { id: "KR_016", status: "concluida" },
        ],
        OKR_0005: [
            { id: "KR_017", status: "pendente" },
            { id: "KR_018", status: "pendente" },
            { id: "KR_019", status: "concluida" },
            { id: "KR_020", status: "concluida" },
        ],
    };

    const krs = mockKrsByOkr[selectedOkr.id] || [
        { id: "KR_102", status: "pendente" },
        { id: "KR_102", status: "pendente" },
        { id: "KR_102", status: "atraso" },
        { id: "KR_102", status: "concluida" },
    ];

    return (
        <div className="okr-details-page">
            <SideBar
                typeUser={"Director"}
                nameUser={"Paulo"}
            />

            <main className="okr-details-main">
                <OKRRoute OKRname={selectedOkr.id} />

                <div className="okr-details-top">
                    <OKRInfo
                        okrId={selectedOkr.id}
                        title={selectedOkr.titulo}
                        description={selectedOkr.descricao}
                        cycleLabel={`${selectedOkr.ciclo} ${selectedOkr.ano}`}
                        progress={selectedOkr.porcentagem}
                    />
                    <StickyNote notes={notes} okrId={selectedOkr.id} />
                </div>

                <KRSquadCards squads={squads} />
                <KRTable krs={krs} />
            </main>
        </div>
    );
}

export default OKRDetails;