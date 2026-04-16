import React from "react";
import SideBar from "../components/SideBar"
import OKRTitle from "../components/NewOkrTitle/NewOKRTitle";
import TextInput from "../components/TextInput/TextInput";

function NewOKR(){
    return(
        <div style={{ display: "flex" }}>
           <SideBar/>
            <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <OKRTitle/>
            <TextInput title="Título da OKR" inside="EX:Aumentar a retenção de usuários ativos"/>
            <TextInput title="Descrição" inside="Contexto e Justificativa do objetivo..." tamanho="103px"/>
           </div>
        </div>
        );
}


export default NewOKR;