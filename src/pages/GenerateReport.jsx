import React from 'react';
import MainTitle from "../components/MainTitle/MainTitle";
import SideBar from '../components/Sidebar/SideBar';
import MainReportFilter from '../components/MainReportFilter/MainReportFilter'
import "../styles/variables.css"

const GenerateReport = () => {

    return (
        <div className="page-layout">
            <SideBar />

            <main>
                <MainTitle
                    title={"Gerar Relatórios"}
                    subtitle={"Escolha os indicadores e o período para gerar uma visão detalhada do seu projeto."}
                />
                
                <p>Pré-visualização da impressão</p>

                    <div className='selection-box'>
                        
                        <MainReportFilter />
                    </div>
               
            </main>
        </div>
    );
}

export default GenerateReport;