import React from 'react';

const TeamSection = ({ nomeEquipe, membros, cliente }) => {
  return (
    <div className="team-card" style={{
      border: '1px solid #ddd',
      borderRadius: '12px',
      padding: '20px',
      backgroundColor: '#fff',
      textAlign: 'center',
      minWidth: '250px'
    }}>
      <h3 style={{ color: '#2c7a7b', textDecoration: 'underline' }}>{nomeEquipe}</h3>
      <p style={{ fontSize: '0.9rem', margin: '15px 0' }}>
        <strong>Membros:</strong> {membros}
      </p>
      <h4 style={{ color: '#555' }}>{cliente}</h4>
    </div>
  );
};

export default TeamSection;