import React, { useState, useEffect, useMemo } from "react";
import SideBar from "../components/Sidebar/SideBar";
import MainTitle from "../components/MainTitle/MainTitle";
import SearchBar from "../components/SearchBar/SearchBar";
import AutoHighlighter from "../components/Highlighter/AutoHighlighter";
import { useSearch } from "../context/SearchContext";
import KRTag from "../components/KRTag/KRTag";
import KRSubTag from "../components/KRSubTag/KRSubTag";
import ProgressBar from "../components/ProgressBar/ProgressBar";
import KRTaskItem from "../components/KRTaskItem/KRTaskItem";
import FilterTab from "../components/FilterTab/FilterTab";
import KRTaskFooter from "../components/KRTaskFooter/KRTaskFooter";

// Usando a sua instância correta da API
import api from '../services/api';

export default function ViewKeyResults() {
    const { setBusca } = useSearch();

    // Estados de controle dos dados
    const [okrs, setOkrs] = useState([]);
    const [selectedOkrId, setSelectedOkrId] = useState("all");
    const [keyResults, setKeyResults] = useState([]);
    const [jiraTasks, setJiraTasks] = useState([]);
    const [metrics, setMetrics] = useState({ completionPercentage: 0 });
    const [loading, setLoading] = useState(false);
    const [filtroAtivo, setFiltroAtivo] = useState("Todas");

    // ==========================================
    // FUNÇÕES DE INTEGRAÇÃO DE ROTAS (CORRIGIDAS)
    // ==========================================
    const getOkrListRaw = async () => {     
        try {
            const response = await api.get(`/okr`);
            return response.data || [];
        } catch (error) {
            console.error('Erro ao buscar lista crua de Okrs:', error);
            return [];
        }
    };

    const getKeyResultsByOkr = async (okrId) => {
        try {
            if (!okrId) return [];
            const response = await api.get(`/keyresults/okr/${okrId}`);
            return response.data || [];
        } catch (error) {
            console.error(`Erro ao buscar Key Results para a OKR ID ${okrId}:`, error);
            return [];
        }
    };

    const getJiraDataByOkr = async (okrId) => {
        try {
            if (!okrId) return null;
            const idLimpo = String(okrId).includes('_') ? parseInt(okrId.split('_')[1], 10) : okrId;
            const response = await api.get(`/api/JiraTask/okrs/${idLimpo}`);
            return response.data || null;
        } catch (error) {
            console.error(`Erro ao buscar dados analíticos do Jira para a OKR ID ${okrId}:`, error);
            return null;
        }
    };

    const getAllKeyResultsCombined = async (okrsList) => {
        try {
            if (!okrsList || okrsList.length === 0) return [];
            const promises = okrsList.map(okr => api.get(`/keyresults/okr/${okr.id}`));
            const resultados = await Promise.all(promises);
            return resultados.flatMap(res => res.data || []);
        } catch (error) {
            console.error('Erro ao agregar todas as Key Results das OKRs:', error);
            return [];
        }
    };

    // 1. Carrega todas as OKRs do banco assim que a tela abre
    useEffect(() => {
        const fetchInitialOkrs = async () => {
            const dados = await getOkrListRaw();
            setOkrs(dados);
        };
        fetchInitialOkrs();
    }, []);

    // 2. Busca de Key Results e tarefas conforme a OKR selecionada muda
    useEffect(() => {
        const fetchDadosTela = async () => {
            setLoading(true);
            try {
                let listaKrs = [];
                let idParaTarefas = 1; // ID padrão se for 'all'

                if (selectedOkrId === "all") {
                    if (okrs.length > 0) {
                        listaKrs = await getAllKeyResultsCombined(okrs);
                        if (okrs[0]?.id) idParaTarefas = okrs[0].id; // Tenta pegar o ID da primeira OKR válida
                    }
                } else {
                    listaKrs = await getKeyResultsByOkr(selectedOkrId);
                    idParaTarefas = selectedOkrId;
                }

                setKeyResults(listaKrs);

                // Carrega o JSON analítico do Jira
                const jiraData = await getJiraDataByOkr(idParaTarefas);
                if (jiraData) {
                    setJiraTasks(jiraData.tasks || []);
                    setMetrics(jiraData.metrics || { completionPercentage: 0 });
                } else {
                    setJiraTasks([]);
                    setMetrics({ completionPercentage: 0 });
                }

            } catch (error) {
                console.error("Erro ao sincronizar dados:", error);
                setJiraTasks([]);
                setMetrics({ completionPercentage: 0 });
            } finally {
                setLoading(false);
            }
        };

        if (okrs.length > 0 || selectedOkrId !== "all") {
            fetchDadosTela();
        }
    }, [selectedOkrId, okrs]);

    // Padroniza as strings de status que chegam do Jira
    const traduzirStatusJira = (status) => {
        if (!status) return "A fazer";
        const s = status.toLowerCase();
        if (s === "concluído" || s === "concluido" || s === "done") return "Concluído";
        if (s === "em andamento" || s === "in progress") return "Em andamento";
        if (s === "bloqueado" || s === "blocked") return "Bloqueado";
        return "A fazer";
    };

    // 3. Contadores das abas de tarefas (Reativos)
    const counts = useMemo(() => {
        return {
            Todas: jiraTasks.length,
            "Em andamento": jiraTasks.filter(t => traduzirStatusJira(t.status) === "Em andamento").length,
            "A fazer": jiraTasks.filter(t => traduzirStatusJira(t.status) === "A fazer").length,
            "Concluído": jiraTasks.filter(t => traduzirStatusJira(t.status) === "Concluído").length,
            "Bloqueado": jiraTasks.filter(t => traduzirStatusJira(t.status) === "Bloqueado").length,
        };
    }, [jiraTasks]);

    // Filtra a exibição da lista com base na aba ativa
    const tarefasFiltradas = useMemo(() => {
        return jiraTasks.filter(task =>
            filtroAtivo === "Todas" ? true : traduzirStatusJira(task.status) === filtroAtivo
        );
    }, [jiraTasks, filtroAtivo]);

    return (
        <div className="page-layout">
            <SideBar typeUser={"Manager"} nameUser={"Kaio"} />
            <AutoHighlighter />
            <main id="content">
                
                {/* Header principal */}
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    marginBottom: "40px"
                }}>
                    <MainTitle
                        title="Visualizar Key Results"
                        subtitle={selectedOkrId === "all" ? "Todas as OKRs" : `OKR > ID ${selectedOkrId}`}
                    />
                    <SearchBar onSearch={(valor) => setBusca(valor)} />
                </div>

                {/* Seleção de OKRs */}
                <div style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: "20px", 
                    backgroundColor: "#fff", 
                    padding: "20px 30px", 
                    borderRadius: "15px",
                    marginBottom: "20px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.02)"
                }}>
                    <button
                        onClick={() => setSelectedOkrId("all")}
                        style={{
                            padding: "10px 20px",
                            borderRadius: "20px",
                            border: "none",
                            backgroundColor: selectedOkrId === "all" ? "#047857" : "#F3F4F6",
                            color: selectedOkrId === "all" ? "#fff" : "#4B5563",
                            fontWeight: "600",
                            cursor: "pointer",
                            transition: "all 0.2s"
                        }}
                    >
                        Selecionar Todas
                    </button>

                    <div style={{ height: "24px", width: "1px", backgroundColor: "#E5E7EB" }} />

                    <select
                        value={selectedOkrId === "all" ? "" : selectedOkrId}
                        onChange={(e) => setSelectedOkrId(Number(e.target.value))}
                        style={{
                            padding: "8px 16px",
                            borderRadius: "8px",
                            border: "1px solid #047857",
                            backgroundColor: "#fff",
                            color: "#047857",
                            fontWeight: "500",
                            outline: "none",
                            cursor: "pointer"
                        }}
                    >
                        <option value="" disabled={selectedOkrId === "all"}>
                            {selectedOkrId === "all" ? "Filtrar por OKR específica..." : "Todas as OKRs"}
                        </option>
                        {okrs.map((okr) => (
                            <option key={okr.id} value={okr.id}>
                                ID {okr.id} - {okr.title || "Sem título"}
                            </option>
                        ))}
                    </select>
                </div>

                {loading ? (
                    <div style={{ backgroundColor: "#fff", padding: "40px", borderRadius: "15px", textAlign: "center", color: "#6B7280" }}>
                        Processando métricas dinâmicas do Jira...
                    </div>
                ) : (
                    <>
                        {/* Bloco de Progresso */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "20px", backgroundColor: "#fff", padding: "30px", borderRadius: "15px" }}>
                            {keyResults.length > 0 ? (
                                keyResults.slice(0, 1).map((kr) => (
                                    <React.Fragment key={kr.id}>
                                        <KRTag name={`KR-0${kr.id || kr.okrId}`} title={kr.title} okr={`OKR-${kr.okrId}`} />
                                        <KRSubTag deadline="30 Jun 2026" value="50k" goal="75k" />
                                    </React.Fragment>
                                ))
                            ) : (
                                <KRTag name="KR" title="Nenhuma Key Result encontrada" okr="---" />
                            )}
                            
                            <ProgressBar progress={metrics.completionPercentage || 0} />
                        </div>

                        {/* Seção das Abas de Filtros */}
                        <div style={{ marginTop: "30px" }}>
                            <h3 style={{ color: "#5F6368", fontSize: "14px", fontWeight: "600", marginBottom: "15px" }}>
                                TAREFAS VINCULADAS NO JIRA
                            </h3>

                            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                                {Object.keys(counts).map((label) => (
                                    <FilterTab
                                        key={label}
                                        label={label}
                                        count={counts[label]}
                                        isActive={filtroAtivo === label}
                                        onClick={() => setFiltroAtivo(label)}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Lista Dinâmica de Itens */}
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                            paddingBottom: "100px"
                        }}>
                            {tarefasFiltradas.length === 0 ? (
                                <div style={{ color: "#9CA3AF", fontStyle: "italic", padding: "10px" }}>
                                    Nenhuma tarefa com o status "{filtroAtivo}".
                                </div>
                            ) : (
                                tarefasFiltradas.map(task => (
                                    <KRTaskItem
                                        key={task.id}
                                        squad={task.keyResultTitle || "Squad Geral"} 
                                        title={`${task.jiraIssueKey} - ${task.summary}`}
                                        initialStatus={traduzirStatusJira(task.status)}
                                        userInitials={task.assigneeName ? task.assigneeName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) : "N/A"}
                                    />
                                ))
                            )}
                        </div>

                        {/* Footer Reativo */}
                        <KRTaskFooter
                            total={counts["Todas"]}
                            completed={counts["Concluído"]}
                            inProgress={counts["Em andamento"]}
                            blocked={counts["Bloqueado"]}
                        />
                    </>
                )}
            </main>
        </div>
    );
}