import React from "react";
import "./FloatMenu.css"
import TooltipIcon from "../Tooltip/Tooltip";

function SelectMenu({ opcoes = [], title, inside, value, onChange, className,toolText,toolId }) {//Permite adicionar tamanho, valor e até o que acontece se 
  return (
    <div className="FloatMenu">
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <label className="Label">{title}</label>
      <TooltipIcon id={toolId} texto={toolText} />
      </div>
      <select className={`Select ${className}`} value={value} onChange={onChange}>
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