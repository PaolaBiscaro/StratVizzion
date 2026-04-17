import React from "react";
import "./FloatMenu.css"

function SelectMenu({ opcoes = [], title, inside, value, onChange }) {//Permite adicionar tamanho, valor e até o que acontece se 
  return (
    <div className="FloatMenu">
      <label className="Label">{title}</label>
      <select className="Select" value={value} onChange={onChange}>
        <option value="" disabled>{inside}</option>
        {opcoes.map((opcao) => (
          <option key={opcao.value} value={opcao.value}>
            {opcao.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectMenu;