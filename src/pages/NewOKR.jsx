import React from "react";
import SideBar from "../components/SideBar"
import OKRTitle from "../components/NewOkrTitle/NewOKRTitle";
import TextInput from "../components/TextInput/TextInput";
import SelectMenu from "../components/FloatMenu/FloatMenu";

function NewOKR(){
    return(
        <div style={{ display: "flex" }}>
           <SideBar/>
            <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <OKRTitle/>
            <TextInput title="Título da OKR" inside="EX:Aumentar a retenção de usuários ativos"/>
            <TextInput title="Descrição" inside="Contexto e Justificativa do objetivo..." tamanho="103px"/>
            <SelectMenu opcoes={[{value: "Q1_2026", label:"Q1 2026"},{value: "Q2_2026", label:"Q2 2026"},{value: "Q3_2026", label:"Q3 2026"},{value: "Q4_2026", label:"Q4 2026"}]} title="Ciclo" inside="-- Selecionar --" />
           </div>
        </div>
        );
}


export default NewOKR;