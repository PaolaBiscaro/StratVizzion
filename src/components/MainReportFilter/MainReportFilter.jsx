import React, { useState } from "react";
import './MainReportFilter.css'
import { getProjetos } from "../../services/data/api_mock";
import FilterPopoverContent from "./FilterPopoverContent";
import Button from "../Button/Button";

const FIELD_LABELS = {
    equipes: "Equipes",
    okr_geral: "Visão geral das OKR",
    progresso_projeto: "Progresso do projeto",
    todos_projetos: "Todos os projetos",
    historico_okr: "Histórico de OKR",
    key_results: "Key Results"
};

function MainReportFilter() {
    const [selectedItems, setSelectedItems] = useState({});
    const [projetoSelecionado, setProjetoSelecionado] = useState("Projeto A");
    const [okrSelecionada, setOkrSelecionada] = useState("TODAS");
    const todasAsInformacoesProjetos = getProjetos();


    const handleCheckboxChange = (id) => {
        setSelectedItems((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const enviarParaAPI = () => {
        const payload = Object.keys(FIELD_LABELS).map(key => {
            const isSelected = !!selectedItems[key];
            let filter = null;

            if (isSelected) {
                if (key === 'progresso_projeto') {
                    filter = {
                        key: projetoSelecionado,
                        name: todasAsInformacoesProjetos[projetoSelecionado]?.name || "Projeto não encontrado"
                    };
                } else if (key === 'okr_geral' && okrSelecionada !== 'TODAS') {
                    filter = {
                        okr: okrSelecionada
                    };
                }
            }


            return {
                selected_field: FIELD_LABELS[key],
                selected: isSelected ? 1 : 0,
                ...(filter && { filter })
            };
        });
        console.log("Dados da API:", JSON.stringify(payload, null, 2));
    };


    return (
        <div className="container-filter">
            <div className="row-filter">
                <div className="popover-filter">
                    {/* Popover de seleção do projeto específico */}
                    {selectedItems['progresso_projeto'] && (
                        <FilterPopoverContent
                            tipo="progresso_projeto"
                            onSelectProject={setProjetoSelecionado}
                            valorAtual={projetoSelecionado}
                        />
                    )}

                    {/* Popover dinamico das equipes */}
                    {selectedItems['equipes'] && (
                        <div className="popover-inner">
                            <p className="status-equipe">
                                {selectedItems['progresso_projeto']
                                    ? `Equipe: ${todasAsInformacoesProjetos[projetoSelecionado]?.name || projetoSelecionado}`
                                    : "Todas as Equipes"}
                            </p>
                        </div>
                    )}

                    {/* Popover para seleção das okr */}
                    {selectedItems['okr_geral'] && (
                        <FilterPopoverContent
                            tipo="okr_geral"
                            onSelectProject={setOkrSelecionada}
                            valorAtual={okrSelecionada}
                        />
                    )}


                </div>

                <div className="report-popover">
                    <h3 className="popover-title">Dados Inclusos</h3>

                    <div className="popover-content">

                        <label className="checkbox-item">
                            <input type="checkbox" onChange={() => handleCheckboxChange('equipes')} />

                            <span>Adicionar Equipes</span>
                        </label>

                        <label className="checkbox-item">
                            <input
                                type="checkbox"
                                checked={!!selectedItems['okr_geral']}
                                onChange={() => handleCheckboxChange('okr_geral')} />

                            <span>Visão geral das OKR</span>
                        </label>

                        <label className="checkbox-item">
                            <input
                                type="checkbox"
                                checked={!!selectedItems['progresso_projeto']}
                                onChange={() => handleCheckboxChange('progresso_projeto')}
                            />

                            <span>Progresso do projeto</span>
                        </label>

                        {/* <label className="checkbox-item">
                            <input type="checkbox" onChange={() => handleCheckboxChange('pendencias')} />
                            <span>Projetos Pendentes</span>
                        </label> */}

                        <label className="checkbox-item">
                            <input type="checkbox" onChange={() => handleCheckboxChange('todos_projetos')} />

                            <span>Todos os projetos</span>
                        </label>

                        <label className="checkbox-item">
                            <input type="checkbox" onChange={() => handleCheckboxChange('historico_okr')} />

                            <span>Histórico de OKR</span>
                        </label>

                        <label className="checkbox-item">
                            <input type="checkbox" onChange={() => handleCheckboxChange('key_results')} />

                            <span>Todas as Key Results</span>
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