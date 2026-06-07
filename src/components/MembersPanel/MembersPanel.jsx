import React from 'react';
import './MembersPanel.css';

const MembersPanel = () => {
    return (
        <div className="members-panel">
            <div className="members-list-wrapper">
                <h3 className="members-title">Membros</h3>

                <div className="member-item">
                    <div className="member-avatar"></div>
                    <span className="member-name">Caio Cesar</span>
                </div>
            </div>
        </div>
    );
};

export default MembersPanel;