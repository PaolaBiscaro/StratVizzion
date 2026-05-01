import React from "react";
import { getAllProjetos, getEquipes } from "../../services/data/api_mock.js";
import './FilterPopoverContent.css'

function FilterPopoverContent({ tipo }) {
    
    const renderConteudo = () => {
        switch (tipo) {
            case 'progresso_projeto':
               { const projetos = getAllProjetos(); 
                return (
                    <div className="popover-inner">
                        <p className="title-popover">Selecione o Projeto:</p>
                        <select className="filter-select ">
                            <option value="">Escolha um projeto...</option>
                            {projetos.map(proj => (
                                <option key={proj.key} value={proj.key}>
                                    {proj.key} - {proj.name}
                                </option>
                            ))}
                        </select>
                    </div>
                );}

            case 'equipes':
                {const equipes = getEquipes();
                return (
                    <div className="popover-inner">
                        <p>Selecione a Equipe:</p>
                        <ul className="filter-list">
                            {equipes.map(eq => (
                                <li key={eq.id}>{eq.nome}</li>
                            ))}
                        </ul>
                    </div>
                );}

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