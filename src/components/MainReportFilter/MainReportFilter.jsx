// import React, { useState } from "react";
// import './MainReportFilter.css'
// import { getProjetos } from "../../services/data/api_mock";
// import FilterPopoverContent from "./FilterPopoverContent";
// import Button from "../Button/Button";

// const FIELD_LABELS = {
//     equipes: "Equipes",
//     okr_geral: "Visão geral das OKR",
//     progresso_projeto: "Progresso do projeto",
//     todos_projetos: "Todos os projetos",
//     historico_okr: "Histórico de OKR",
//     key_results: "Key Results"
// };

// function MainReportFilter({ onPdfGenerated }) {
//     const [selectedItems, setSelectedItems] = useState({});
//     const [projetoSelecionado, setProjetoSelecionado] = useState("Projeto A");
//     const [okrSelecionada, setOkrSelecionada] = useState("TODAS");
//     const todasAsInformacoesProjetos = getProjetos();


//     const handleCheckboxChange = (id) => {
//         setSelectedItems((prev) => ({
//             ...prev,
//             [id]: !prev[id]
//         }));
//     };

//     const enviarParaAPI = async () => {
//     // 1. O payload que o Python espera (List[dict])
//     const payload = Object.keys(FIELD_LABELS).map(key => {
//         const isSelected = !!selectedItems[key];
//         return {
//             selected_field: FIELD_LABELS[key],
//             selected: isSelected ? 1 : 0,
//             filter: [], // Pode ser o projetoSelecionado se necessário
//             dados_banco: todasAsInformacoesProjetos // Seus dados do mock
//         };
//     });

//     try {
//         console.log("Enviando dados para o motor IA...");
//         const response = await fetch('http://127.0.0.1:8000/api/v1/gerar-relatorio', {
//             method: 'POST', // OBRIGATÓRIO ser POST
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(payload),
//         });

//         if (!response.ok) {
//             const errorData = await response.json();
//             throw new Error(errorData.detail || "Erro no servidor");
//         }

//         const resultado = await response.json();

//         if (resultado.pdf_base64) {
//             // Converter Base64 para PDF e baixar
//             // const linkSource = `data:application/pdf;base64,${resultado.pdf_base64}`;
//             // const downloadLink = document.createElement("a");
//             // downloadLink.href = linkSource;
//             // downloadLink.download = "Relatorio_Executivo.pdf";
//             // downloadLink.click();
//             // console.log("Relatório gerado com sucesso!");
//             onPdfGenerated(resultado.pdf_base64);
//                 alert("Relatório gerado! Clique em Visualizar.");
//         }
//     } catch (error) {
//         console.error("Erro na comunicação:", error);
//         alert("Erro: " + error.message);
//     }
// };
//     // const enviarParaAPI = () => {
//     //     const payload = Object.keys(FIELD_LABELS).map(key => {
//     //         const isSelected = !!selectedItems[key];
//     //         let filter = null;

//     //         if (isSelected) {
//     //             if (key === 'progresso_projeto') {
//     //                 filter = {
//     //                     key: projetoSelecionado,
//     //                     name: todasAsInformacoesProjetos[projetoSelecionado]?.name || "Projeto não encontrado"
//     //                 };
//     //             } else if (key === 'okr_geral' && okrSelecionada !== 'TODAS') {
//     //                 filter = {
//     //                     okr: okrSelecionada
//     //                 };
//     //             }
//     //         }


//     //         return {
//     //             selected_field: FIELD_LABELS[key],
//     //             selected: isSelected ? 1 : 0,
//     //             ...(filter && { filter })
//     //         };
//     //     });
//     //     console.log("Dados da API:", JSON.stringify(payload, null, 2));
//     // };


//     return (
//         <div className="container-filter">
//             <div className="row-filter">
//                 <div className="popover-filter">
//                     {/* Popover de seleção do projeto específico */}
//                     {selectedItems['progresso_projeto'] && (
//                         <FilterPopoverContent
//                             tipo="progresso_projeto"
//                             onSelectProject={setProjetoSelecionado}
//                             valorAtual={projetoSelecionado}
//                         />
//                     )}

//                     {/* Popover dinamico das equipes */}
//                     {selectedItems['equipes'] && (
//                         <div className="popover-inner">
//                             <p className="status-equipe">
//                                 {selectedItems['progresso_projeto']
//                                     ? `Equipe: ${todasAsInformacoesProjetos[projetoSelecionado]?.name || projetoSelecionado}`
//                                     : "Todas as Equipes"}
//                             </p>
//                         </div>
//                     )}

//                     {/* Popover para seleção das okr */}
//                     {selectedItems['okr_geral'] && (
//                         <FilterPopoverContent
//                             tipo="okr_geral"
//                             onSelectProject={setOkrSelecionada}
//                             valorAtual={okrSelecionada}
//                         />
//                     )}


//                 </div>

//                 <div className="report-popover">
//                     <h3 className="popover-title">Dados Inclusos</h3>

//                     <div className="popover-content">

//                         <label className="checkbox-item">
//                             <input type="checkbox" onChange={() => handleCheckboxChange('equipes')} />

//                             <span>Adicionar Quadro Jira/Equipes</span>
//                         </label>

//                         <label className="checkbox-item">
//                             <input
//                                 type="checkbox"
//                                 checked={!!selectedItems['okr_geral']}
//                                 onChange={() => handleCheckboxChange('okr_geral')} />

//                             <span>Visão geral das OKR</span>
//                         </label>
//                         {/*Adicionar uma opcao perguntando se inclui  */}

//                         <label className="checkbox-item">
//                             <input
//                                 type="checkbox"
//                                 checked={!!selectedItems['todas_okrs']}
//                                 onChange={() => handleCheckboxChange('todas_okrs')}
//                             />

//                             <span>Adicionar Keys Results</span>
//                         </label>

//                         {/* <label className="checkbox-item">
//                             <input type="checkbox" onChange={() => handleCheckboxChange('pendencias')} />
//                             <span>Projetos Pendentes</span>
//                         </label> */}

//                         <label className="checkbox-item">
//                             <input type="checkbox" onChange={() => handleCheckboxChange('todos_projetos')} />

//                             <span>Incluir tarefas</span>
//                             {/*Adicionar uma pop-up que abre uma selecao de todas as tarefas e coloca atrasado em andamento */}
//                         </label>

//                         <label className="checkbox-item">
//                             <input type="checkbox" onChange={() => handleCheckboxChange('historico_okr')} />

//                             <span>Histórico de OKR</span>
//                         </label>

//                         <label className="checkbox-item">
//                             <input type="checkbox" onChange={() => handleCheckboxChange('key_results')} />

//                             <span>Todas as Key Results</span>
//                         </label>

//                     </div>
//                     <div className="format-button">
//                         <Button texto="Confirmar Seleção" className="Salvar" onClick={enviarParaAPI} />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
import React, { useState } from "react";
import './MainReportFilter.css';
import FilterPopoverContent from "./FilterPopoverContent";
import Button from "../Button/Button";
// Importando as rotas tratadas e preparadas para o novo formato do banco
import { 
    getOkr, 
    getTeamByOkr, 
    getOkrHistories, 
    getTasksByOkr, 
    getKeyResultsByOkr 
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
    // Estado para armazenar qual squad do Jira está selecionada ("TODOS" ou o ID da Squad)
    const [projetoJiraSelecionado, setProjetoJiraSelecionado] = useState("TODOS");

    const handleCheckboxChange = (id) => {
        setSelectedItems((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const enviarParaAPI = async () => {
        // 🔥 VALIDAÇÃO: Validação do "Incluir tarefas" (todos_projetos)
        if (selectedItems['todos_projetos']) {
            // Se a chave equipes não estiver marcada OU o select estiver em "TODOS"
            if (!selectedItems['equipes'] || projetoJiraSelecionado === "TODOS") {
                alert("Por favor, adicione e selecione uma equipe específica antes de incluir as tarefas!");
                return; // Para a execução aqui e não envia para o Python
            }
        }

        console.log("%c Enviando dados filtrados para o motor IA...", "color: #007bff; font-weight: bold;");

        // Monta o payload buscando dados APENAS das chaves ativas e removendo as inativas
        const payloadPromises = Object.keys(FIELD_LABELS).map(async (key) => {
            const isSelected = !!selectedItems[key];
            
            // SE NÃO FOR SELECIONADO, RETORNA NULL (é completamente arrancado do array final)
            if (!isSelected) return null;

            let dadosFiltrados = [];

            try {
                // Passa dinamicamente os IDs selecionados para as rotas da API
                if (key === 'equipes') {
                    dadosFiltrados = await getTeamByOkr(okrSelecionada, projetoJiraSelecionado);
                } else if (key === 'okr_geral') {
                    dadosFiltrados = await getOkr();
                } else if (key === 'historico_okr') {
                    dadosFiltrados = await getOkrHistories(okrSelecionada);
                } else if (key === 'todos_projetos') {
                    // CORREÇÃO: Agora passa o projetoJiraSelecionado para filtrar as tarefas dinamicamente por equipe!
                    dadosFiltrados = await getTasksByOkr(okrSelecionada, projetoJiraSelecionado);
                } else if (key === 'key_results') {
                    dadosFiltrados = await getKeyResultsByOkr(okrSelecionada);
                }
            } catch (err) {
                console.error(`Erro ao alimentar a chave [${key}]:`, err);
                dadosFiltrados = [];
            }

            // Define quais filtros textuais ou IDs estão ativos para enviar no JSON
            const filtrosAtivos = [];
            if (okrSelecionada !== "TODAS") filtrosAtivos.push(okrSelecionada);
            if (projetoJiraSelecionado !== "TODOS") filtrosAtivos.push(projetoJiraSelecionado);

            return {
                selected_field: FIELD_LABELS[key],
                selected: 1,
                filter: filtrosAtivos,
                dados_banco: dadosFiltrados
            };
        });

        // Resolve todas as buscas e remove os itens 'null'
        const payloadFinal = (await Promise.all(payloadPromises)).filter(Boolean);

        console.log("JSON RÍGIDO ENVIADO AO PYTHON (Apenas selecionados):", JSON.stringify(payloadFinal, null, 2));

        try {
            const response = await fetch('http://127.0.0.1:8000/api/v1/gerar-relatorio', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
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
                    {/* Popover dinâmico das equipes */}
                    {selectedItems['equipes'] && (
                        <FilterPopoverContent
                            tipo="equipes"
                            onSelectProject={setProjetoJiraSelecionado}
                            valorAtual={projetoJiraSelecionado}
                        />
                    )}

                    {/* Popover dinâmico para seleção de OKRs na Visão Geral */}
                    {selectedItems['okr_geral'] && (
                        <FilterPopoverContent
                            tipo="okr_geral"
                            onSelectProject={setOkrSelecionada} 
                            valorAtual={okrSelecionada}
                        />
                    )}

                    {/* Popover dinâmico quando marcar "Adicionar Key Results" */}
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