
import React from "react";
import "./FormSelect.css";


function FormSelect({ opcoes = [], title, inside, value, onChange, className }) {
  return (

    <div className={`float-menu-formSelect ${className || ""}`}>
      <label className="label-formSelect">{title}</label>

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