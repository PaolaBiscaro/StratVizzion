import React, { useState, useEffect } from 'react';
import './MembersPanel.css';
import { getOkrTeam } from '../../services/api/manager';

const getColorFromName = (name) => {
    const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f1c40f', '#9b59b6', '#e67e22', '#1abc9c'];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
};

const MembersPanel = ({ okrId }) => {
    const [members, setMembers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        console.log("1. ID DA OKR NO MEMBERS PANEL:", okrId)
        if (!okrId) {
            setMembers([]);
            return;
        }

        const fetchTeam = async () => {
            setIsLoading(true);
            try {
                const response = await getOkrTeam(okrId);
                const listaMembros = response.data && response.data.length > 0 
                    ? response.data[0].members 
                    : [];

                setMembers(listaMembros);
                
            } catch (error) {
                console.error("Erro ao carregar membros da equipe:", error);

            } finally {
                setIsLoading(false);
            }
        };

        fetchTeam();
    }, [okrId]);

    return (
        <div className="members-panel">
            <div className="members-list-wrapper">
                <h3 className="members-title">Membros</h3>

                {!okrId && <p style={{ color: '#888', fontSize: '13px', marginTop: '10px' }}>Selecione uma OKR para ver a equipa.</p>}
                {isLoading && <p style={{ color: '#888', fontSize: '13px', marginTop: '10px' }}>A carregar equipa...</p>}

                <div style={{ marginTop: '15px' }}>
                    {!isLoading && members.length > 0 && members.map((member, index) => {
                        
                        const name = member.name || "Membro";
                        const initial = name.charAt(0).toUpperCase();
                        const bgColor = getColorFromName(name);

                        return (
                            <div className="member-item" key={member.accountId || index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
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
                                        width: '35px',
                                        height: '35px',
                                        marginRight: '10px'
                                    }}
                                >
                                    {initial}
                                </div>
                                <span className="member-name">{name}</span>
                            </div>
                        );
                    })}
                </div>

                {!isLoading && okrId && members.length === 0 && (
                    <p style={{ color: '#888', fontSize: '13px', marginTop: '10px' }}>Nenhum membro encontrado.</p>
                )}
            </div>
        </div>
    );
};

export default MembersPanel;