import React from "react";
import Panel from "../Panel/Panel";
import Botao from "../Button/Button";
import "./Warning.css";
import { IoIosWarning } from "react-icons/io";

function Warning({ warningMessage = "Insert Warning messages here" }) {
    return (
        <Panel>
            <div className="warning-content">
                <h1 className="warning-title">
                    <IoIosWarning /> Atenção
                </h1>
                <span className="warning-message">{warningMessage}</span>
                <div className="warning-footer">
                    <Botao texto="Enviar Alerta" className="alert" variante="verde" />
                </div>
            </div>
        </Panel>
    );
}

export default Warning;