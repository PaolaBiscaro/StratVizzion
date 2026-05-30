import React from 'react';
import './TeamStats.css';
import {FiAlertCircle, FiCheck} from 'react-icons/fi';
import ProgressBar from '../ProgressBar/ProgressBar.jsx';

const TeamStats = () => {
    return (
        <div className="team-stats-container">
            <div className="team-stats-header">
                <h2>{'{Minha equipe de Software}'}</h2>
                <select className="okr-select">
                    <option>Selecionar OKR</option>
                </select>
            </div>

            <div className="stats-cards-row">
                <div className="stat-card backlog">
                    <h3>28</h3>
                    <p>Backlog</p>
                </div>
                <div className="stat-card atrasadas">
                    <h3>9</h3>
                    <p>Tarefas Atrasadas</p>
                    <span className="icon"><FiAlertCircle size={25} /></span>
                </div>
                <div className="stat-card concluidas">
                    <h3>5</h3>
                    <p>Tarefas Concluídas</p>
                    <span className="icon"><FiCheck size={25} /></span>
                </div>
            </div>

            <div className="progress-section-manager">
                <div className="progress-text">
                    <span>Tarefas em Andamento</span>
                    <strong>6/10</strong>
                </div>
                <div className="progress-bar-bg">
                    <ProgressBar progress={60} />
                </div>
            </div>
        </div>
    );
};

export default TeamStats;