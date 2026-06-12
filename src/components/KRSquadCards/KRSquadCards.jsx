import React, { useState } from "react";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import "./KRSquadCards.css";

const getColorFromName = (name) => {
    const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f1c40f', '#9b59b6', '#e67e22', '#1abc9c'];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
};

function KRSquadCards({ squads = [] }) {
    const [expandedSquads, setExpandedSquads] = useState({});

    const defaultSquads = [
        { jiraProjectId: 1, members: [], kr: "" },
    ];

    const data = squads.length > 0 ? squads : defaultSquads;

    const toggleSquad = (index) => {
        setExpandedSquads(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    return (
        <div className="kr-squad-cards-container">
            <h3 className="kr-squad-section-title">Squads e Membros</h3>
            <div className="kr-squad-cards">
                {data.map((squad, index) => {
                    const isExpanded = expandedSquads[index] !== false; // Começa expandido por padrão
                    return (
                    <div key={index} className="kr-squad-card">
                        <div className="kr-squad-header">
                            <div className="squad-header-content">
                                <p className="kr-squad-project-id">
                                    <strong>Squad:</strong> {squad.jiraProjectId}
                                </p>
                                {squad.members && squad.members.length > 0 && (
                                    <span className="squad-member-count">({squad.members.length} membros)</span>
                                )}
                            </div>
                            <button 
                                className="squad-expand-btn"
                                onClick={() => toggleSquad(index)}
                                title={isExpanded ? "Minimizar" : "Expandir"}
                            >
                                {isExpanded ? <MdExpandLess size={24} /> : <MdExpandMore size={24} />}
                            </button>
                        </div>

                        {/* Seção de Membros */}
                        {isExpanded && squad.members && squad.members.length > 0 ? (
                            <div className="kr-squad-members">
                                <p className="kr-squad-members-title"><strong>Membros da Equipe</strong></p>
                                <div className="members-list">
                                    {squad.members.map((member, memberIndex) => {
                                        const name = member.name || "Membro";
                                        const initial = name.charAt(0).toUpperCase();
                                        const bgColor = getColorFromName(name);
                                        const completionRate = member.totalTasks > 0 
                                            ? Math.round((member.completedTasks / member.totalTasks) * 100)
                                            : 0;

                                        return (
                                            <div key={member.accountId || memberIndex} className="member-card">
                                                <div className="member-header">
                                                    <div 
                                                        className="member-avatar" 
                                                        style={{ 
                                                            backgroundColor: bgColor, 
                                                            color: '#fff',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            fontWeight: 'bold',
                                                            borderRadius: '50%',
                                                            width: '36px',
                                                            height: '36px',
                                                            fontSize: '14px',
                                                            flexShrink: 0
                                                        }}
                                                    >
                                                        {initial}
                                                    </div>
                                                    <div className="member-info">
                                                        <span className="member-name">{name}</span>
                                                    </div>
                                                </div>

                                                <div className="member-tasks">
                                                    <div className="task-stat">
                                                        <span className="task-label">Total:</span>
                                                        <span className="task-value">{member.totalTasks}</span>
                                                    </div>
                                                    <div className="task-stat">
                                                        <span className="task-label">Concluídas:</span>
                                                        <span className="task-value task-completed">{member.completedTasks}</span>
                                                    </div>
                                                    <div className="task-stat">
                                                        <span className="task-label">Atrasadas:</span>
                                                        <span className="task-value task-delayed">{member.delayedTasks}</span>
                                                    </div>
                                                </div>

                                                <div className="member-progress">
                                                    <div className="progress-bar-container">
                                                        <div className="progress-bar">
                                                            <div 
                                                                className="progress-fill"
                                                                style={{ width: `${completionRate}%` }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                    <span className="progress-text">{completionRate}% completo</span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ) : (
                            <p className="no-members">Nenhum membro nesta equipe</p>
                        )}
                    </div>
                    );
                })}
            </div>
        </div>
    );
}

export default KRSquadCards;