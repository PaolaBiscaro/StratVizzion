import React, { useState, useEffect } from 'react';
import SideBar from '../components/Sidebar/SideBar.jsx';
import MainTitle from '../components/MainTitle/MainTitle.jsx';
import SearchBar from "../components/SearchBar/SearchBar";
import "../styles/ViewKeyResults.css";
import { useNavigate } from 'react-router-dom';

// Seus componentes reaproveitáveis
import FilterTab from "../components/FilterTab/FilterTab";
import KRTag from "../components/KRTag/KRTag";
import KRSubTag from "../components/KRSubTag/KRSubTag";

// Instância correta da API
import api from '../services/api';

const ViewKeyResults = () => {
    const navigate = useNavigate(); 
    
    // Estados para gerenciamento dos dados da API
    const [okrs, setOkrs] = useState([]); // Guarda a lista de OKRs para o dropdown
    const [keyResults, setKeyResults] = useState([]); // Guarda todas as KRs unificadas com as métricas do Jira
    const [selectedOkrId, setSelectedOkrId] = useState(""); // Controle do item selecionado no dropdown
    const [loading, setLoading] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false); // Estado para o botão de atualizar/sincronizar

    // ==========================================
    // FUNÇÃO ISOLADA PARA BUSCAR OS DADOS
    // ==========================================
    const fetchAllData = async () => {
        setLoading(true);
        try {
            // 1. Busca todas as OKRs cadastradas no banco
            const okrResponse = await api.get('/okr');
            const okrsList = okrResponse.data || [];
            setOkrs(okrsList);

            if (okrsList.length > 0) {
                // 2. Dispara requisições simultâneas para buscar as KRs de cada OKR
                const promises = okrsList.map(okr => api.get(`/keyresults/okr/${okr.id}`));
                const resultados = await Promise.all(promises);
                
                // Junta todos os arrays de Key Results em uma única lista plana
                const todasKrs = resultados.flatMap(res => res.data || []);

                // 3. ENRIQUECIMENTO DOS DADOS: Busca as métricas de tarefas do Jira para cada KR
                const krsComMetricas = await Promise.all(
                    todasKrs.map(async (kr) => {
                        try {
                            const jiraResponse = await api.get(`/api/JiraTask/keyresults/${kr.id}`);
                            return {
                                ...kr,
                                totalTasks: jiraResponse.data?.metrics?.totalTasks || 0,
                                completedTasks: jiraResponse.data?.metrics?.completedTasks || 0
                            };
                        } catch (jiraError) {
                            console.error(`Erro ao buscar tarefas do Jira para a KR ${kr.id}:`, jiraError);
                            return { ...kr, totalTasks: 0, completedTasks: 0 };
                        }
                    })
                );

                setKeyResults(krsComMetricas);
            }
        } catch (error) {
            console.error("Erro ao carregar os dados de OKRs e Key Results:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllData();
    }, []);

    // ==========================================
    // FILTRAGEM EM TEMPO REAL (CLIENT-SIDE)
    // ==========================================
    const filteredKrs = selectedOkrId 
        ? keyResults.filter(kr => String(kr.okrId) === String(selectedOkrId))
        : keyResults;

    // ==========================================
    // SINCRONIZAÇÃO DAS TAREFAS DO JIRA
    // ==========================================
    const handleSyncAll = async () => {
        if (filteredKrs.length === 0) return;
        
        setIsSyncing(true);
        try {
            // Dispara em paralelo o POST de sincronização para cada KR listada no momento
            const syncPromises = filteredKrs.map(kr => 
                api.post(`/api/JiraTask/okrs/${kr.id}/sync`)
            );
            
            await Promise.all(syncPromises);
            alert("Sincronização com o Jira concluída com sucesso!");
            
            // Recarrega os dados atualizados do banco para atualizar as barras de progresso
            await fetchAllData();
        } catch (error) {
            console.error("Erro ao sincronizar tarefas com o Jira:", error);
            alert("Ocorreu um erro ao tentar sincronizar os dados com o Jira.");
        } finally {
            setIsSyncing(false);
        }
    };

    return (
        <div className="page-layout">
            <SideBar typeUser="Manager" nameUser={"Paulo"} />
            <main id="content" className="view-kr-container">
                <div className="header-section">
                    <MainTitle 
                        title="Visualizar Key Results" 
                        subtitle="Analise o progresso e evolução dos seus resultados-chave." 
                    />
                    <SearchBar onSearch={(valor) => console.log(valor)} />
                </div>

                {/* Linha de filtros contendo o dropdown seletor e o Botão de Atualizar */}
                <div className='filter-tabs-row' style={{ display: 'flex', alignItems: 'center', justifyContent: 'between', width: '100%', gap: '12px', flexWrap: 'wrap' }}>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div className="okr-filter-dropdown-container" style={{ position: 'relative' }}>
                            <select 
                                className="btn-filter-secondary"
                                value={selectedOkrId}
                                onChange={(e) => setSelectedOkrId(e.target.value)}
                                style={{
                                    appearance: 'none',
                                    WebkitAppearance: 'none',
                                    MozAppearance: 'none',
                                    paddingRight: '30px',
                                    cursor: 'pointer',
                                    background: '#FFF',
                                    border: '1px solid #E5E7EB',
                                    borderRadius: '100px',
                                    padding: '8px 16px',
                                    fontSize: '14px',
                                    color: '#374151',
                                    fontWeight: '500'
                                }}
                            >
                                <option value="">Filtrar por OKR (Mostrar Todas)</option>
                                {okrs.map(okr => (
                                    <option key={okr.id} value={okr.id}>
                                        {okr.title ? `OKR-0${okr.id} : ${okr.title}` : `OKR 0${okr.id}`}
                                    </option>
                                ))}
                            </select>
                            <span style={{
                                position: 'absolute',
                                right: '12px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                pointerEvents: 'none',
                                color: '#6B7280',
                                fontSize: '10px'
                            }}>▼</span>
                        </div>
                    </div>

                    {/* BOTÃO DE ATUALIZAR / SINCRONIZAR JIRA */}
                    <button
                        onClick={handleSyncAll}
                        disabled={isSyncing || filteredKrs.length === 0}
                        style={{
                            marginLeft: 'auto',
                            background: isSyncing ? '#9CA3AF' : '#10B981', 
                            color: '#FFF',
                            border: 'none',
                            borderRadius: '100px',
                            padding: '8px 20px',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: isSyncing || filteredKrs.length === 0 ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                            transition: 'background 0.2s ease'
                        }}
                    >
                        {isSyncing ? (
                            <>
                                <span className="spinner" style={{
                                    width: '14px',
                                    height: '14px',
                                    border: '2px solid #FFF',
                                    borderTopColor: 'transparent',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    animation: 'spin 1s linear infinite'
                                }}></span>
                                Sincronizando Jira...
                            </>
                        ) : (
                            <>
                                Atuais KRs ({filteredKrs.length})
                            </>
                        )}
                    </button>
                </div>

                <div className="results-list">
                    {loading ? (
                        <div style={{ padding: "40px", textAlign: "center", color: "#6B7280" }}>
                            Carregando resultados operacionais...
                        </div>
                    ) : filteredKrs.length === 0 ? (
                        <div style={{ padding: "40px", textAlign: "center", color: "#9CA3AF", fontStyle: "italic" }}>
                            Nenhuma Key Result encontrada para os critérios selecionados.
                        </div>
                    ) : (
                        filteredKrs.map(kr => {
                            // CÁLCULO DA PORCENTAGEM POR QUANTIDADE DE TAREFAS
                            const total = kr.totalTasks || 0;
                            const concluidas = kr.completedTasks || 0;
                            const porcentagemTarefas = total > 0 ? Math.round((concluidas / total) * 100) : 0;

                            return (
                                <div key={kr.id} className="kr-card-container">
                                    <div className="kr-card-top">
                                        {/* 1. O COMPONENTE VERDE recebe o title da KR */}
                                        <KRTag 
                                            name={`0${kr.id}`} 
                                            title={kr.title || "Sem título"} 
                                            okr={`OKR00${kr.okrId}`} 
                                            onClick={() => navigate(`/kr-detalhada/${kr.id}`)}
                                        />
                                        <KRSubTag 
                                            deadline="30 Jun 2026" 
                                            value={kr.currentValue || "0k"} 
                                            goal={kr.targetValue || "100k"} 
                                        />
                                    </div>
                                    
                                    {/* 2. O COMPONENTE DE TEXTO CINZA exibe a descrição da KR */}
                                    {kr.description && (
                                        <div className="kr-card-description" style={{ margin: '12px 0', fontSize: '14px', color: '#6B7280', fontWeight: '400' }}>
                                            {kr.description}
                                        </div>
                                    )}
                                   
                                    {/* BARRA DE PROGRESSO DINÂMICA */}
                                    <div className="progress-section">
                                        <div className="progress-track">
                                            <div 
                                                className="progress-fill" 
                                                style={{ 
                                                    width: `${porcentagemTarefas}%`,
                                                    transition: 'width 0.3s ease-in-out'
                                                }}
                                            ></div>
                                        </div>
                                        <span className="progress-label">
                                            {porcentagemTarefas}% ({concluidas}/{total})
                                        </span>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </main>
            {/* CSS inline rápido para animar o spinner do botão se necessário */}
            <style>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}

export default ViewKeyResults;