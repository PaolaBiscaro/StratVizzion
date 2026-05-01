import React, { useState } from "react";
import './MainReportFilter.css'
import { getEquipes, getOKR, getProjetos } from "../../services/data/api_mock";
import FilterPopoverContent from "./FilterPopoverContent";

function MainReportFilter() {
    const [selectedItems, setSelectedItems] = useState({});

    const mock_data = {
        equipes: getEquipes(),
        okrs: getOKR(),
        progresso_projeto: getProjetos(),
        pendencias: [],
        todos_projetos: [],
        historico_okr: []
    }

    const handleCheckboxChange = (id) => {
        setSelectedItems((prev) => ({
            ...prev,
            [id]: !prev[id] // Inverte o valor (true/false)
        }));
    };

    const enviarParaAPI = () => {
        const payload = Object.keys(selectedItems)
            .filter(key => selectedItems[key] === true)
            .map(key => ({
                id: key,
                selected: 1,
                data: mock_data[key] || []
            }));

        console.log("Enviando para API:", payload);
    };

    return (
        <div className="container-filter">
            <div className="row">
                <div className="popover-filter">
                    {selectedItems['progresso_projeto'] && (
                        <FilterPopoverContent tipo="progresso_projeto" />
                    )}
                </div>


                <div className="report-popover">
                    <h3 className="popover-title">Dados Inclusos</h3>

                    <div className="popover-content">
                        <label className="checkbox-item">
                            <input
                                type="checkbox"
                                onChange={() => handleCheckboxChange('equipes')}
                            />
                            <span>Equipes</span>
                        </label>

                        <label className="checkbox-item">
                            <input
                                type="checkbox"
                                onChange={() => handleCheckboxChange('okr_geral')}
                            />
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



                        <label className="checkbox-item">
                            <input
                                type="checkbox"
                                onChange={() => handleCheckboxChange('pendencias')}
                            />
                            <span>Projetos Pendentes</span>
                        </label>

                        <label className="checkbox-item">
                            <input
                                type="checkbox"
                                onChange={() => handleCheckboxChange('todos_projetos')}
                            />
                            <span>Todos os projetos</span>
                        </label>

                        <label className="checkbox-item">
                            <input
                                type="checkbox"
                                onChange={() => handleCheckboxChange('historico_okr')}
                            />
                            <span>Histórico de OKR</span>
                        </label>

                        <label className="checkbox-item">
                            <input
                                type="checkbox"
                                onChange={() => handleCheckboxChange('historico_okr')}
                            />
                            <span>Retirar comentários da I.A.</span>
                        </label>
                    </div>

                    <button onClick={enviarParaAPI} className="btn-gerar">
                        Confirmar Seleção
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MainReportFilter;