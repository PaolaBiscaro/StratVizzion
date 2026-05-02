import React from 'react';
import MainTitle from "../components/MainTitle/MainTitle";
import SideBar from '../components/Sidebar/SideBar';
import MainReportFilter from '../components/MainReportFilter/MainReportFilter'
import "../styles/variables.css"
import SearchBar from "../components/SearchBar/SearchBar";
import AutoHighlighter from "../components/Highlighter/AutoHighlighter";
import { useSearch } from "../context/SearchContext";
import PDFViewer from '../components/PDFViewer/PDFViewer';
import '../styles/GenerateReport.css'


const GenerateReport = () => {
    const { setBusca } = useSearch();

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
                        title="Gerar Relatórios"
                        subtitle="Escolha os indicadores e o período para gerar uma visão detalhada do seu projeto e as OKR's"
                    />

                    <SearchBar onSearch={(valor) => setBusca(valor)} />
                </div>

                <p>Pré-visualização da impressão</p>

                <div className='selection-box'>
                    <PDFViewer/>
                    <MainReportFilter />
                </div>
            </main>

        </div>
    );
}

export default GenerateReport;