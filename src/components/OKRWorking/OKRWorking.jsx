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
                <ArcChart value={86} title="OKR_0001" date="29/03/2027" description="Atingir R$ 500 mil em Novos Negócios até o final do trimestre."/>
                <ArcChart value={20} title="OKR_0002" date="30/04/2027" description="Reduzir o custo por aquisição (CPA) de R$45 para R$28." />
                <ArcChart value={1} title="OKR_0003" date="30/05/2027" description="Atingir taxa de conversão do onboarding de 40% para 62%." />
                <ArcChart value={50} title="OKR_0004" date="29/03/2027" description="Atingir R$ 500 mil em Novos Negócios até o final do trimestre." />
<<<<<<< HEAD

=======
>>>>>>> b30ef7ff8735834dee5fe07461a5973962cac538
            </div>
        </div>
    );
}

export default OKRCHart;