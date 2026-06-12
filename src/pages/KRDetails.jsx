import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom"; 
import { FiRefreshCw } from "react-icons/fi"; 
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
import { getUsers } from "../services/api/user"; 
import { getKrDetails, syncJiraTasks } from "../services/api/manager"; 

const getInitials = (name) => {
    if (!name) return "U"; 
    const names = name.trim().split(" ");
    if (names.length >= 2) {
        return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    }
    return names[0].substring(0, 2).toUpperCase();
};

export default function KRDetails() {
    const { setBusca } = useSearch();
   const { id: keyResultId } = useParams(); 

    const [userData, setUserData] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [metrics, setMetrics] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [filtroAtivo, setFiltroAtivo] = useState("Todas");
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [isSyncing, setIsSyncing] = useState(false);

    const handleSync = async () => {
        setIsSyncing(true); 
        try {
            console.log(`1. Iniciando sincronização para o ID: ${keyResultId}...`);
            const response = await syncJiraTasks(keyResultId);
            
            console.log("2. Sucesso! Resposta do C#:", response.data);  
            setRefreshTrigger(prev => prev + 1);
        } catch (error) {
           if (error.response) {
                console.error("3. O C# recusou a requisição. Status:", error.response.status);
                console.error("Detalhes do erro:", error.response.data);
            } else {
                console.error("3. Erro de rede ou o backend está fora do ar:", error.message);
            }
        } finally {
            setIsSyncing(false); 
        }
    };

    useEffect(() => {
        const carregarDetalhesKR = async () => {
            setIsLoading(true);
            try {
                const userResponse = await getUsers();
                setUserData(userResponse.data);
                if (keyResultId) {
                    const krResponse = await getKrDetails(keyResultId);
                    const data = krResponse.data;
                    setMetrics(data.metrics || null);
                    const tarefasMapeadas = (data.tasks || []).map(task => ({
                        id: task.id,
                        squad: task.jiraIssueKey || "Tarefa",
                        title: task.summary || "Sem Resumo",
                        status: task.status || "A fazer", 
                        userInitials: getInitials(task.assigneeName),
                        originalData: task 
                    }));

                    setTasks(tarefasMapeadas);
                }

            } catch (error) {
                console.error("Erro ao carregar detalhes da KR:", error);
            } finally {
                setIsLoading(false);
            }
        };

        carregarDetalhesKR();
    }, [keyResultId, refreshTrigger]);

    const counts = useMemo(() => {
        return {
            Todas: tasks.length,
            "Em andamento": tasks.filter(t => t.status === "Em andamento" || t.status === "In Progress").length,
            "A fazer": tasks.filter(t => t.status === "A fazer" || t.status === "To Do").length,
            "Concluído": tasks.filter(t => t.status === "Concluído" || t.status === "Done").length,
            "Bloqueado": tasks.filter(t => t.status === "Bloqueado" || t.status === "Blocked").length,
        };
    }, [tasks]);

    const tarefasFiltradas = tasks.filter(task =>
        filtroAtivo === "Todas" ? true : 
        task.status === filtroAtivo || 
        (filtroAtivo === "Em andamento" && task.status === "In Progress") ||
        (filtroAtivo === "A fazer" && task.status === "To Do") ||
        (filtroAtivo === "Concluído" && task.status === "Done") ||
        (filtroAtivo === "Bloqueado" && task.status === "Blocked")
    );

    if (isLoading && tasks.length === 0) return <div>Carregando detalhes...</div>;

    const primeiroNome = userData?.name ? userData.name.split(" ")[0] : "Usuário";
    
    const krTitleDynamic = tasks.length > 0 ? tasks[0].originalData.keyResultTitle : "Carregando título da KR...";

    return (
        <div className="page-layout">
            <SideBar />
            <AutoHighlighter />
            <main id="content">
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    marginBottom: "40px"
                }}>
                    <MainTitle
                        title={`Olá, ${primeiroNome}`}
                        subtitle={`KR > KR-${keyResultId || "0"}`}
                    />
                    <SearchBar onSearch={(valor) => setBusca(valor)} />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "20px", backgroundColor: "#fff", padding: "30px", borderRadius: "15px" }}>
                    <KRTag 
                        name={`KR-${keyResultId || "0"}`} 
                        title={krTitleDynamic} 
                        okr="OKR" 
                    />
                    <KRSubTag deadline="30 Jun 2026" value="0" goal="100" />
                    
                    <ProgressBar progress={Math.round(metrics?.completionPercentage || 0)} />
                </div>

                <div style={{ marginTop: "30px" }}>
                    <h3 style={{ color: "#5F6368", fontSize: "14px", fontWeight: "600", marginBottom: "15px" }}>
                        TAREFAS DO JIRA
                    </h3>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                        <div style={{ display: "flex", gap: "10px" }}>
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
                    <button 
                            onClick={handleSync} 
                            disabled={isLoading || isSyncing} 
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                padding: "8px 16px",
                                borderRadius: "8px",
                                border: "1px solid #ddd",
                                backgroundColor: (isLoading || isSyncing) ? "#f1f1f1" : "#fff",
                                color: "#5F6368",
                                fontWeight: "500",
                                cursor: (isLoading || isSyncing) ? "not-allowed" : "pointer",
                                transition: "all 0.2s"
                            }}
                        >
                            <FiRefreshCw style={{ animation: (isLoading || isSyncing) ? "spin 1s linear infinite" : "none" }} />
                            {isSyncing ? "Sincronizando..." : isLoading ? "Carregando..." : ""}
                        </button>
                    </div>
                </div>

                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    paddingBottom: "80px" 
                }}>
                    {tarefasFiltradas.length > 0 ? (
                        tarefasFiltradas.map(task => (
                            <KRTaskItem
                                key={task.id}
                                squad={task.squad}
                                title={task.title}
                                initialStatus={task.status}
                                userInitials={task.userInitials}
                            />
                        ))
                    ) : (
                        <p style={{ padding: "20px", color: "#666" }}>Nenhuma tarefa encontrada neste status.</p>
                    )}
                </div>

                <KRTaskFooter
                    total={counts["Todas"]}
                    completed={counts["Concluído"]}
                    inProgress={counts["Em andamento"]}
                    blocked={counts["Bloqueado"]}
                />

            </main>
        </div>
    );
}