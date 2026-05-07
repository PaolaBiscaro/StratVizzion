
import React from "react";
import { getAllProjetos, getOKR } from "../../services/data/api_mock.js";
import './FilterPopoverContent.css'


// Adicionado 'valorAtual' às props
function FilterPopoverContent({ tipo, onSelectProject, valorAtual }) {

    
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
                const okrs = getOKR() || []; 
                return (
                    <div className="popover-inner">
                        <p className="title-popover">Configuração de OKR</p>
                        
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
                            disabled={valorAtual === 'TODAS'}
                        >
                            <option value="">Selecione uma OKR...</option>
                            {okrs.map(okr => (
                                <option key={okr.id} value={okr.id}>
                                    {okr.id} - {okr.descricao.substring(0, 30)}...
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