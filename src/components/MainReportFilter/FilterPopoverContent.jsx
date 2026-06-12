import React, { useState, useEffect } from "react";
import { getAllProjetos } from "../../services/data/api_mock.js";
// Importamos as funções reais que buscam do banco
import { getOkrListRaw, getJiraProjectsRaw } from "../../services/filtersGenerateReport.js"; 
import './FilterPopoverContent.css'

function FilterPopoverContent({ tipo, onSelectProject, valorAtual, tituloCustomizado }) {
    // Estado para guardar as OKRs reais vindas da API
    const [okrsReais, setOkrsReais] = useState([]);
    const [carregando, setCarregando] = useState(false);

    // Estado para guardar as equipes do Jira reais vindas da API
    const [projetosJira, setProjetosJira] = useState([]);
    const [carregandoJira, setCarregandoJira] = useState(false);

    // Efeito para buscar as OKRs do banco assim que o componente de OKR for aberto
    useEffect(() => {
        if (tipo === 'okr_geral') {
            const carregarDadosDoBanco = async () => {
                setCarregando(true);
                try {
                    const dados = await getOkrListRaw();
                    setOkrsReais(dados || []);
                } catch (error) {
                    console.error("Erro ao carregar OKRs reais para o popover", error);
                } finally {
                    setCarregando(false);
                }
            };
            carregarDadosDoBanco();
        }
    }, [tipo]);

    // Efeito para buscar as equipes do Jira assim que o componente de Equipes for aberto
    useEffect(() => {
        if (tipo === 'equipes') {
            const carregarEquipesJira = async () => {
                setCarregandoJira(true);
                try {
                    const dados = await getJiraProjectsRaw();
                    setProjetosJira(dados || []);
                } catch (error) {
                    console.error("Erro ao carregar projetos do Jira no popover", error);
                } finally {
                    setCarregandoJira(false);
                }
            };
            carregarEquipesJira();
        }
    }, [tipo]);
    
    const handleChange = (e) => {
        if (onSelectProject) {
            onSelectProject(e.target.value); 
        }
    };

    const renderConteudo = () => {
        switch (tipo) {
            case 'progresso_projeto': {
                const projetos = getAllProjetos(); 
                return (
                    <div className="popover-inner">
                        <p className="title-popover">Selecione o Projeto:</p>
                        <select 
                            className="filter-select" 
                            onChange={handleChange}
                            value={valorAtual} 
                        >
                            {projetos.map(proj => (
                                <option key={proj.key} value={proj.key}>
                                    {proj.key} - {proj.name}
                                </option>
                            ))}
                        </select>
                    </div>
                );
            }

            case 'okr_geral': {
                return (
                    <div className="popover-inner">
                        {/* 🔥 Exibe o título customizado se ele existir, senão usa o padrão do projeto */}
                        <p className="title-popover">
                            {tituloCustomizado || "Configuração de OKR"}
                        </p>
                        
                        {/* Checkbox para Selecionar Todas */}
                        <label className="checkbox-item" style={{marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px'}}>
                            <input 
                                type="checkbox" 
                                checked={valorAtual === 'TODAS'} 
                                onChange={() => onSelectProject(valorAtual === 'TODAS' ? '' : 'TODAS')} 
                            />
                            <span>Selecionar Todas</span>
                        </label>

                        <p style={{fontSize: '12px'}}>Ou escolha uma específica:</p>
                        <select 
                            className="filter-select" 
                            onChange={handleChange}
                            value={valorAtual}
                            disabled={valorAtual === 'TODAS' || carregando}
                        >
                            <option value="">
                                {carregando ? "Carregando objetivos..." : "Selecione uma OKR..."}
                            </option>
                            
                            {okrsReais.map(okr => {
                                const idOkr = okr.Id || okr.id;
                                const textoExibicao = okr.Title || okr.title || "";

                                return (
                                    <option key={idOkr} value={idOkr}>
                                        ID {idOkr} - {textoExibicao}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                );
            }

            case 'equipes': {
                return (
                    <div className="popover-inner">
                        <p className="title-popover">Configuração de Equipes</p>
                        <p style={{ fontSize: '12px', marginBottom: '8px' }}>Selecione a equipe do Jira:</p>
                        <select
                            className="filter-select"
                            onChange={handleChange}
                            value={valorAtual}
                            disabled={carregandoJira}
                        >
                            <option value="TODOS">
                                {carregandoJira ? "Carregando equipes..." : "Todas as equipes (Grupo Jira)"}
                            </option>
                            {projetosJira.map(proj => (
                                <option key={proj.id} value={proj.id}>
                                    {proj.name} ({proj.key})
                                </option>
                            ))}
                        </select>
                    </div>
                );
            }

            default:
                return <p>Selecione uma opção válida.</p>;
        }
    };

    return (
        <div className="popover-container">
            {renderConteudo()}
        </div>
    );
}

export default FilterPopoverContent;