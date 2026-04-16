import React from "react";
import SideBar from "../components/SideBar"
import OKRTitle from "../components/NewOkrTitle/NewOKRTitle";
import TextInput from "../components/TextInput/TextInput";
import SelectMenu from "../components/FloatMenu/FloatMenu";
import Button from "../components/Button/Button";

function NewOKR(){
    return(
        <div style={{ display: "flex" }}>
           <SideBar/>
            <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <OKRTitle/>
            <TextInput title="Título da OKR" inside="EX:Aumentar a retenção de usuários ativos"/>
            <TextInput title="Descrição" inside="Contexto e Justificativa do objetivo..." tamanho="103px"/>
            <SelectMenu opcoes={[{value: "Q1", label:"Q1 2026"},{value: "Q2", label:"Q2 2026"},{value: "Q3", label:"Q3 2026"},{value: "Q4", label:"Q4 2026"}]} title="Ciclo" inside="-- Selecionar --" />
            <Button texto={"Salvar"} className={"Salvar"}/>
            <Button texto={"Limpar Campos"} variante="branco" className={"Limpar"}/> 
           </div>
        </div>
        );

        
}
//Botão de Salvar deve ser implementando um método POST Posteriormente


export default NewOKR;