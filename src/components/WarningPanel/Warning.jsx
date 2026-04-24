import React from "react";
import Panel from "../Panel/Panel";
import Botao from "../Button/Button";
import "./Warning.css"
import { IoIosWarning } from "react-icons/io";


function Warning({warningMessage="Insert Warning messages here"}){
    return(
        <Panel>
            <div>
                <h1 className="warning-title"><IoIosWarning />Atenção</h1>
                <div className="container-button">
                    <Botao texto={"Enviar Alerta"}className={"alert"}></Botao>
                </div>
            </div>
        </Panel>
    )
}

export default Warning;