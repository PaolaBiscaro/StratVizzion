import React from "react";
import "./Entrada.css";

function Entrada({userName}){
    return(
        <div className="Entrada">
            <h1 className="titulo">Olá, {userName}!</h1>
            <p className="subtexto">Acompanhe o desenvolvimento de seus projetos</p>
        </div>

    )
}

export default Entrada;