import React, { useState, useEffect } from "react";
import './MainReportFilter.css';
import FilterPopoverContent from "./FilterPopoverContent";
import Button from "../Button/Button";
import {
    getOkr,
    getTeamByOkr,
    getOkrHistories,
    getTasksByOkr,
    getKeyResultsByOkr,
    getAllManagers
} from "../../services/filtersGenerateReport";

const FIELD_LABELS = {
    equipes: "Equipes",
    okr_geral: "Visão geral das OKR",
    todos_projetos: "Todos os projetos",
    historico_okr: "Histórico de OKR",
    key_results: "Key Results"
};

function MainReportFilter({ onPdfGenerated }) {
    const [selectedItems, setSelectedItems] = useState({});
    const [okrSelecionada, setOkrSelecionada] = useState("TODAS");
    const [projetoJiraSelecionado, setProjetoJiraSelecionado] = useState("TODOS");

    // Altere apenas a inicialização do estado e o useEffect dentro do MainReportFilter:

    const [managersList, setManagersList] = useState([]);
    const [selectedManagerId, setSelectedManagerId] = useState("");

    useEffect(() => {
        const fetchManagers = async () => {
            const data = await getAllManagers();
            if (data && data.length > 0) {
                setManagersList(data);

                // Tenta obter o ID do usuário logado no localStorage para deixar selecionado por padrão
                let defaultId = "98e6457f-be1f-4dde-84b2-bd22c1fb8bf9"; // Seu ID padrão
                try {
                    const userString = localStorage.getItem('user');
                    if (userString) {
                        const userObj = JSON.parse(userString);
                        if (userObj && userObj.id) defaultId = userObj.id;
                    }
                } catch (e) {
                    console.error(e);
                }

                // Se o usuário logado estiver na lista retornada, seleciona ele. Senão, pega o primeiro da lista.
                const userExisteNaLista = data.some(m => (m.id || m.Id) === defaultId);
                setSelectedManagerId(userExisteNaLista ? defaultId : (data[0].id || data[0].Id));
            }
        };
        fetchManagers();
    }, []);

    // Força o reset do projeto selecionado caso mude o Manager para não quebrar o filtro cruzado
    const handleManagerChange = (e) => {
        setSelectedManagerId(e.target.value);
        setProjetoJiraSelecionado("TODOS");
    };

    const handleCheckboxChange = (id) => {
        setSelectedItems((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const enviarParaAPI = async () => {
        if (selectedItems['todos_projetos']) {
            if (!selectedItems['equipes'] || projetoJiraSelecionado === "TODOS") {
                alert("Por favor, adicione e selecione uma equipe específica antes de incluir as tarefas!");
                return;
            }
        }

        console.log("%c Enviando dados filtrados para o motor IA...", "color: #0b8b18; font-weight: bold;");

        const activeManagerId = selectedManagerId || null;
        const currentManagerObj = managersList.find(m => (m.id || m.Id) === activeManagerId);

        const payloadPromises = Object.keys(FIELD_LABELS).map(async (key) => {
            const isSelected = !!selectedItems[key];
            if (!isSelected) return null;

            let dadosFiltrados = [];

            try {
                if (key === 'equipes') {
                    dadosFiltrados = await getTeamByOkr(okrSelecionada, projetoJiraSelecionado, activeManagerId);
                } else if (key === 'okr_geral') {
                    dadosFiltrados = await getOkr(activeManagerId);
                } else if (key === 'historico_okr') {
                    dadosFiltrados = await getOkrHistories(okrSelecionada);
                } else if (key === 'todos_projetos') {
                    dadosFiltrados = await getTasksByOkr(okrSelecionada, projetoJiraSelecionado, activeManagerId);
                } else if (key === 'key_results') {
                    dadosFiltrados = await getKeyResultsByOkr(okrSelecionada);
                }
            } catch (err) {
                console.error(`Erro ao alimentar a chave [${key}]:`, err);
                dadosFiltrados = [];
            }

            const filtrosAtivos = [];
            if (okrSelecionada !== "TODAS") filtrosAtivos.push(okrSelecionada);
            if (projetoJiraSelecionado !== "TODOS") filtrosAtivos.push(projetoJiraSelecionado);
            if (activeManagerId && currentManagerObj) {
                filtrosAtivos.push(`MANAGER_${(currentManagerObj.name || currentManagerObj.Name).toUpperCase()}`);
            }

            return {
                selected_field: FIELD_LABELS[key],
                selected: 1,
                filter: filtrosAtivos,
                dados_banco: dadosFiltrados
            };
        });

        const payloadFinal = (await Promise.all(payloadPromises)).filter(Boolean);
        console.log("JSON ENVIADO AO PYTHON:", JSON.stringify(payloadFinal, null, 2));

        try {
            const response = await fetch('http://127.0.0.1:8000/api/v1/gerar-relatorio', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payloadFinal),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "Erro no servidor");
            }

            const resultado = await response.json();
            if (resultado.pdf_base64) {
                onPdfGenerated(resultado.pdf_base64);
                alert("Relatório gerado! Clique em Visualizar.");
            }
        } catch (error) {
            console.error("Erro na comunicação:", error);
            alert("Erro: " + error.message);
        }
    };

    return (
        <div className="container-filter">
            <div className="row-filter">
                <div className="popover-filter">
                    {selectedItems['equipes'] && (
                        <div className="popover-filter">
                            {selectedItems['equipes'] && (
                                <FilterPopoverContent
                                    tipo="equipes"
                                    onSelectProject={setProjetoJiraSelecionado}
                                    valorAtual={projetoJiraSelecionado}
                                    // Garante que o ID da Paola seja enviado para o componente de equipes
                                    managerId={selectedManagerId}
                                />
                            )}
                            {/* ... restante dos popovers */}
                        </div>
                    )}

                    {selectedItems['okr_geral'] && (
                        <FilterPopoverContent
                            tipo="okr_geral"
                            onSelectProject={setOkrSelecionada}
                            valorAtual={okrSelecionada}
                        />
                    )}

                    {selectedItems['key_results'] && !selectedItems['okr_geral'] && (
                        <FilterPopoverContent
                            tipo="okr_geral"
                            onSelectProject={setOkrSelecionada}
                            valorAtual={okrSelecionada}
                            tituloCustomizado="Selecione a OKR para exibir todas as Key Results"
                        />
                    )}
                </div>

                <div className="report-popover">
                    <h3 className="popover-title">Dados Inclusos no Relatório</h3>

                    <div className="popover-content">
                        {/* 🔥 SELETOR COMBOBOX DO MANAGER */}
                        {managersList.length > 0 && (
                            <div className="manager-select-container" style={{ marginBottom: '15px', display: 'flex', flexDirection: 'column' }}>
                                <label style={{ fontWeight: 'bold', color: '#0c894f', marginBottom: '5px' }}>
                                    Selecionar Manager responsável:
                                </label>
                                <select
                                    className="select-manager-dropdown"
                                    value={selectedManagerId}
                                    onChange={handleManagerChange}
                                    style={{
                                        padding: '8px',
                                        borderRadius: '5px',
                                        border: '1px solid #007bff',
                                        backgroundColor: '#fff',
                                        fontWeight: '500',
                                        color: '#333'
                                    }}
                                >
                                    {managersList.map((manager) => (
                                        <option key={manager.id || manager.Id} value={manager.id || manager.Id}>
                                            {manager.name || manager.Name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <label className="checkbox-item">
                            <input type="checkbox" checked={!!selectedItems['equipes']} onChange={() => handleCheckboxChange('equipes')} />
                            <span>Adicionar Quadro Jira/Equipes</span>
                        </label>

                        <label className="checkbox-item">
                            <input type="checkbox" checked={!!selectedItems['okr_geral']} onChange={() => handleCheckboxChange('okr_geral')} />
                            <span>Visão geral das OKR</span>
                        </label>

                        <label className="checkbox-item">
                            <input type="checkbox" checked={!!selectedItems['key_results']} onChange={() => handleCheckboxChange('key_results')} />
                            <span>Adicionar Keys Results</span>
                        </label>

                        <label className="checkbox-item">
                            <input type="checkbox" checked={!!selectedItems['todos_projetos']} onChange={() => handleCheckboxChange('todos_projetos')} />
                            <span>Incluir tarefas</span>
                        </label>

                        <label className="checkbox-item">
                            <input type="checkbox" checked={!!selectedItems['historico_okr']} onChange={() => handleCheckboxChange('historico_okr')} />
                            <span>Histórico de OKR</span>
                        </label>
                    </div>

                    <div className="format-button">
                        <Button texto="Confirmar Seleção" className="Salvar" onClick={enviarParaAPI} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainReportFilter;