import React from "react";
import "./FloatMenu.css"

function SelectMenu({opcoes = [], inside="Insert PlaceHolder Here", title="Insert Title here"}){
    return(
    <div className="FloatMenu">
        <label className="Label">{title}</label>
        <select className="Select">
            <option value="" disabled selected>{inside}</option>
            {opcoes.map((opcao) => (
            <option key={opcao.value} value={opcao.value}>
            {opcao.label}
             </option>
      ))}
        </select>
    </div>
    )
}

export default SelectMenu;