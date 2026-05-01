import React from "react";
import "./OKRWorking.css"
import ArcChart from "../OKRChart/OKRChart";


/*ANOTAÇÃO 
    Esse aqui vai ser o componente principal
    que vai ser receber o componente dos gráficos
*/



function OKRCHart() {
    return (
        <div className="OKRChart">
            <h3 className="title-card">OKR - Objetivos e Resultados-Chave</h3>
            <div className="okr-cards"> {/* 👈 envolve os cards */}
                <ArcChart />
                <ArcChart />
                <ArcChart />
            </div>
        </div>
    );
}

export default OKRCHart;