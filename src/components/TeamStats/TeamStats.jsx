import React, { useState, useEffect } from 'react';
import './TeamStats.css';
import { FiAlertCircle, FiCheck } from 'react-icons/fi';
import ProgressBar from '../ProgressBar/ProgressBar.jsx';
import { getOkrMetrics } from '../../services/api/manager'; 

const TeamStats = ({ equipeNome, okrs, selectedOkrId, setSelectedOkrId }) => {
    const [metrics, setMetrics] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // NOVO: Efeito para auto-selecionar a primeira OKR quando a lista carregar
    useEffect(() => {
        if (okrs && okrs.length > 0 && !selectedOkrId) {
            setSelectedOkrId(okrs[0].id);
        }
    }, [okrs, selectedOkrId, setSelectedOkrId]);

    // O seu efeito de buscar métricas continua igualzinho!
    useEffect(() => {
        if (!selectedOkrId) {
            setMetrics(null);
            return;
        }

        const fetchMetrics = async () => {
            setIsLoading(true);
            try {
                const response = await getOkrMetrics(selectedOkrId);
                
                const dadosHistorico = response.data && response.data.length > 0 
                    ? response.data[0] 
                    : null;

                setMetrics(dadosHistorico);
            } catch (error) {
                console.error("Erro ao carregar métricas da OKR:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMetrics();
    }, [selectedOkrId]);


    const total = metrics?.totalTasks || 0;
    const concluidas = metrics?.completedTasks || 0;
    const atrasadas = metrics?.delayedTasks || 0;
    const porcentagem = metrics?.progressPercentage || 0;
    const backlog = total - concluidas;

    return (
        <div className="team-stats-container">
            <div className="team-stats-header">
                <h2>{`${equipeNome || 'Carregando equipe...'}`}</h2>
                
                <select 
                    className="okr-select" 
                    value={selectedOkrId} 
                    onChange={(e) => setSelectedOkrId(e.target.value)}
                >
                    {/* Mantemos uma opção padrão de fallback caso o usuário não tenha OKRs */}
                    <option value="" disabled>Selecionar OKR</option>
                    
                    {okrs && okrs.map(okr => (
                        <option key={okr.id} value={okr.id}>
                            {okr.title || okr.descricao || "Sem Nome"}
                        </option>
                    ))}
                </select>   
            </div>

            <div className="stats-cards-row">
                <div className="stat-card backlog">
                    <h3>{isLoading ? "..." : backlog}</h3>
                    <p>Backlog</p>
                </div>
                <div className="stat-card atrasadas">
                    <h3>{isLoading ? "..." : atrasadas}</h3>
                    <p>Tarefas Atrasadas</p>
                    <span className="icon"><FiAlertCircle size={25} /></span>
                </div>
                <div className="stat-card concluidas">
                    <h3>{isLoading ? "..." : concluidas}</h3>
                    <p>Tarefas Concluídas</p>
                    <span className="icon"><FiCheck size={25} /></span>
                </div>
            </div>

            <div className="progress-section-manager">
                <div className="progress-text">
                    <span>Tarefas em Andamento</span>
                    <strong>{isLoading ? "Carregando..." : `${concluidas}/${total}`}</strong>
                </div>
                <div className="progress-bar-bg">
                    <ProgressBar progress={Math.round(porcentagem)} />
                </div>
            </div>
        </div>
    );
};

export default TeamStats;