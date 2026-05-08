import React, { useState } from 'react';
import SideBar from '../components/Sidebar/SideBar.jsx';
import MainTitle from '../components/MainTitle/MainTitle.jsx';
import SearchBar from "../components/SearchBar/SearchBar";
import { FiltersBar } from '../components/FiltersBar/FiltersBar.jsx';
import "../styles/ViewKeyResults.css";

// Seus componentes criados anteriormente
import FilterTab from "../components/FilterTab/FilterTab";
import KRTag from "../components/KRTag/KRTag";
import KRSubTag from "../components/KRSubTag/KRSubTag";

const ViewKeyResults = () => {
    const [filters, setFilters] = useState({});
    
    // Dados fictícios baseados na sua imagem
    const data = [
        { id: 1, name: "KR-02", title: "Aumentar DAU de 50k para 75k até 30/jun", okr: "OKR001", deadline: "25 Jun 2026", value: "61k", goal: "75k", progress: 60 },
        { id: 2, name: "KR-02", title: "Aumentar DAU de 50k para 75k até 30/jun", okr: "OKR001", deadline: "25 Jun 2026", value: "61k", goal: "75k", progress: 60 },
        { id: 3, name: "KR-02", title: "Aumentar DAU de 50k para 75k até 30/jun", okr: "OKR001", deadline: "25 Jun 2026", value: "61k", goal: "75k", progress: 60 },
    ];

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

                {/* Linha de Filtros (Pills verdes/brancos) */}
                <div className='filter-tabs-row'>
                    <FilterTab label="Todas" count={6} isActive={true} />
                    <button className="btn-filter-secondary">Agrupar por OKR</button>
                    <button className="btn-filter-secondary">A - Z</button>
                    <button className="btn-filter-secondary">Dt. Conclusão</button>
                    <button className="btn-filter-secondary">Porcentagem</button>
                </div>

                <div className="results-list">
                    {data.map(kr => (
                        <div key={kr.id} className="kr-card-container">
                            <div className="kr-card-top">
                                <KRTag name={kr.name} title={kr.title} okr={kr.okr} />
                                <KRSubTag deadline={kr.deadline} value={kr.value} goal={kr.goal} />
                            </div>
                            
                            {/* Barra de Progresso Customizada */}
                            <div className="progress-section">
                                <div className="progress-track">
                                    <div 
                                        className="progress-fill" 
                                        style={{ width: `${kr.progress}%` }}
                                    ></div>
                                </div>
                                <span className="progress-label">{kr.progress}%</span>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default ViewKeyResults;