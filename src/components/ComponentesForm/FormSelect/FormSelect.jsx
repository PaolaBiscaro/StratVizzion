
import React from "react";
import "./FormSelect.css";
import TooltipIcon from "../../Tooltip/Tooltip";


function FormSelect({ opcoes = [], title, inside, value, onChange, className, toolid, tooltext }) {
  return (

    <div className={`float-menu-formSelect ${className || ""}`}>
      <div>
      <label className="label-formSelect">{title}</label>
      <TooltipIcon id={toolid} text={tooltext}/>
      </div>

      <select
        className="select-formInput"
        value={value}
        onChange={onChange}
      >
        <option value="" disabled>{inside}</option>
        {opcoes.map((opcao) => (
          <option key={opcao.value} value={opcao.value} title={opcao.label}>
            {opcao.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FormSelect;