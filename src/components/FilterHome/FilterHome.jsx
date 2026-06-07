import React from 'react';
import { FiArrowUp } from 'react-icons/fi';
import './FilterHome.css';

function FilterHome({
    mostrarConcluidas, setMostrarConcluidas,
    ordenarMaior, setOrdenarMaior,
    trimestre, setTrimestre,
    ano, setAno
}) {

    return (
        <div className="filter-bar-container">
            <button
                className={`filter-btn filter-btn-simple ${mostrarConcluidas ? 'active' : ''}`}
                onClick={() => setMostrarConcluidas(!mostrarConcluidas)}
            >
                Concluídas
            </button>

            <button
                className={`filter-btn filter-btn-icon ${ordenarMaior ? 'active' : ''}`}
                onClick={() => setOrdenarMaior(!ordenarMaior)}
            >
                <FiArrowUp className="filter-icon" />
                Maior
            </button>
            <div className="filter-select-wrapper">
                <select
                    className="filter-select-home"
                    value={trimestre}
                    onChange={(e) => setTrimestre(e.target.value)}
                >
                    <option value="Todos">Todos</option>
                    <option value="Q1">Q1</option>
                    <option value="Q2">Q2</option>
                    <option value="Q3">Q3</option>
                    <option value="Q4">Q4</option>
                </select>
            </div>

            <div className="filter-select-wrapper filter-select-green">
                <select
                    className="filter-select-home"
                    value={ano}
                    onChange={(e) => setAno(e.target.value)}
                >
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                </select>
            </div>
        </div>
    );
}

export default FilterHome;