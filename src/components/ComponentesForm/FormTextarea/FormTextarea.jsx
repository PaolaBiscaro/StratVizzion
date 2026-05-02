import "../../../styles/variables.css"
import React from "react";
import "./FormTextarea.css";

function FormTextarea({ title, inside, value, onChange, tamanho, className }) {
  return (
    <div className={`float-menu-formTextarea ${className || ""}`}>
      <label className="label-formTextarea">{title}</label>
      <textarea
        placeholder={inside}
        className="textarea-formInput"
        style={{ height: tamanho || "100px" }} 
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default FormTextarea;