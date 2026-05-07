import React, { useState } from 'react'; // CORREÇÃO 1: Importar o useState
import SideBar from '../components/Sidebar/SideBar.jsx';
import MainTitle from '../components/MainTitle/MainTitle.jsx';
import SearchBar from "../components/SearchBar/SearchBar";
import AutoHighlighter from "../components/Highlighter/AutoHighlighter";
import { useSearch } from "../context/SearchContext";
import { FiltersBar } from '../components/FiltersBar/FiltersBar.jsx';

const KR_FILTER_CONFIGS = [
    { key: 'title', label: 'Título', type: 'text' },
    { key: 'status', label: 'Status', type: 'select', options: ['Aberto', 'Em Foco', 'Concluído'] },
    { key: 'owner', label: 'Responsável', type: 'select', options: ['Time A', 'Time B'] },
];

const ViewKeyResults = () => {
    const { setBusca } = useSearch();
    const [filters, setFilters] = useState({});

    const data = [];

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const filteredKRs = data.filter(kr => {
        return Object.entries(filters).every(([key, value]) => {
            if (!value) return true;
  
            return String(kr[key] || "").toLowerCase().includes(String(value).toLowerCase());
        });
    });

    return (
        <div className="page-layout">
            <SideBar />
            <AutoHighlighter />
            <main id="content">
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    marginBottom: "40px"
                }}>
                    <MainTitle
                        title="Gestão de Key Results"
                        subtitle="Analise o progresso e evolução dos seus resultados-chave."
                    />
                    <SearchBar onSearch={(valor) => setBusca(valor)} />
                </div>

                <div className='filter-kr'>
                    <FiltersBar
                        configs={KR_FILTER_CONFIGS}
                        values={filters}
                        onChange={handleFilterChange}
                    />
                </div>

                {/* Exemplo de uso: Use filteredKRs para renderizar sua lista/tabela */}
                <div className="results-container">
                    {filteredKRs.map(kr => (
                        <div key={kr.id}>{kr.title}</div>
                    ))}
                </div>

            </main>
        </div>
    );
}

export default ViewKeyResults;