import React, { useState, useMemo } from "react";
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

export default function KRDetails() {
    const { setBusca } = useSearch();

    const [tasks, setTasks] = useState([
        { id: 1, squad: "Squad 1", title: "Task 2", status: "Em andamento", userInitials: "JS" },
        { id: 2, squad: "Squad 1", title: "Task 1", status: "A fazer", userInitials: "JS" },
        { id: 3, squad: "Squad 2", title: "Task 1", status: "Bloqueado", userInitials: "JS" },
        { id: 4, squad: "Squad 1", title: "Task 3", status: "Concluído", userInitials: "JS" },
        { id: 5, squad: "Squad 1", title: "Task 2", status: "Em andamento", userInitials: "JS" },
        { id: 6, squad: "Squad 1", title: "Task 1", status: "A fazer", userInitials: "JS" },
        { id: 7, squad: "Squad 2", title: "Task 1", status: "Bloqueado", userInitials: "JS" },
        { id: 8, squad: "Squad 1", title: "Task 3", status: "Concluído", userInitials: "JS" },
    ]);

    const [filtroAtivo, setFiltroAtivo] = useState("Todas");

    const counts = useMemo(() => {
        return {
            Todas: tasks.length,
            "Em andamento": tasks.filter(t => t.status === "Em andamento").length,
            "A fazer": tasks.filter(t => t.status === "A fazer").length,
            "Concluído": tasks.filter(t => t.status === "Concluído").length,
            "Bloqueado": tasks.filter(t => t.status === "Bloqueado").length,
        };
    }, [tasks]);

    const tarefasFiltradas = tasks.filter(task =>
        filtroAtivo === "Todas" ? true : task.status === filtroAtivo
    );

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
                        title="Olá, UserRequest"
                        subtitle="KR > KR-02"
                    />
                    <SearchBar onSearch={(valor) => setBusca(valor)} />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "20px", backgroundColor: "#fff", padding: "30px", borderRadius: "15px" }}>
                    <KRTag name="KR-02" title="Aumentar DAU de 50k para 75k  até 30/Jun" okr="OKR-01" />
                    <KRSubTag deadline="30 Jun 2026" value="50k" goal="75k" />
                    <ProgressBar progress={59} />
                </div>

                <div style={{ marginTop: "30px" }}>
                    <h3 style={{ color: "#5F6368", fontSize: "14px", fontWeight: "600", marginBottom: "15px" }}>
                        TAREFAS DO JIRA
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


                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    paddingBottom: "80px" // Espaço extra para o footer não cobrir a última tarefa
                }}>
                    {tarefasFiltradas.map(task => (
                        <KRTaskItem
                            key={task.id}
                            squad={task.squad}
                            title={task.title}
                            initialStatus={task.status}
                            userInitials={task.userInitials}
                        />
                    ))}
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