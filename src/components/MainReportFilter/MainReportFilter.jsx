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

function MainReportFilter({ onPdfGenerated }) {
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

    const enviarParaAPI = async () => {
    // 1. O payload que o Python espera (List[dict])
    const payload = Object.keys(FIELD_LABELS).map(key => {
        const isSelected = !!selectedItems[key];
        return {
            selected_field: FIELD_LABELS[key],
            selected: isSelected ? 1 : 0,
            filter: [], // Pode ser o projetoSelecionado se necessário
            dados_banco: todasAsInformacoesProjetos // Seus dados do mock
        };
    });

    try {
        console.log("Enviando dados para o motor IA...");
        const response = await fetch('http://127.0.0.1:8000/api/v1/gerar-relatorio', {
            method: 'POST', // OBRIGATÓRIO ser POST
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Erro no servidor");
        }

        const resultado = await response.json();

        if (resultado.pdf_base64) {
            // Converter Base64 para PDF e baixar
            // const linkSource = `data:application/pdf;base64,${resultado.pdf_base64}`;
            // const downloadLink = document.createElement("a");
            // downloadLink.href = linkSource;
            // downloadLink.download = "Relatorio_Executivo.pdf";
            // downloadLink.click();
            // console.log("Relatório gerado com sucesso!");
            onPdfGenerated(resultado.pdf_base64);
                alert("Relatório gerado! Clique em Visualizar.");
        }
    } catch (error) {
        console.error("Erro na comunicação:", error);
        alert("Erro: " + error.message);
    }
};
    // const enviarParaAPI = () => {
    //     const payload = Object.keys(FIELD_LABELS).map(key => {
    //         const isSelected = !!selectedItems[key];
    //         let filter = null;

    //         if (isSelected) {
    //             if (key === 'progresso_projeto') {
    //                 filter = {
    //                     key: projetoSelecionado,
    //                     name: todasAsInformacoesProjetos[projetoSelecionado]?.name || "Projeto não encontrado"
    //                 };
    //             } else if (key === 'okr_geral' && okrSelecionada !== 'TODAS') {
    //                 filter = {
    //                     okr: okrSelecionada
    //                 };
    //             }
    //         }


    //         return {
    //             selected_field: FIELD_LABELS[key],
    //             selected: isSelected ? 1 : 0,
    //             ...(filter && { filter })
    //         };
    //     });
    //     console.log("Dados da API:", JSON.stringify(payload, null, 2));
    // };


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