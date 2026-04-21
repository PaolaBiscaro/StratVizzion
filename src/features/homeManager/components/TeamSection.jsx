import React from 'react';
import "../styles/TeamSection.css";

// O card define o "contrato": eu preciso de nomeEquipe, membros e cliente.
const TeamSection = ({ nomeEquipe, membros, cliente }) => {
  return (
    
    <div className="team-card-hm">
      <h3 className="title-card-hm">{nomeEquipe}</h3>
      <p className="subtitle-card-hm">
        <strong>Membros:</strong> {membros}
      </p>
      <h4 className="client-team-car-hm">{cliente}</h4>
    </div>
  );
};

export default TeamSection;