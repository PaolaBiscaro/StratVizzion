import "../../../styles/variables.css"
import React from "react";
import TooltipIcon from "../../Tooltip/Tooltip";
import "./FormTextarea.css";

function FormTextarea({ title, inside, value, onChange, tamanho, className, toolid, tooltext }) {
  return (
    <div className={`float-menu-formTextarea ${className || ""}`}>
      <div>
        <label className="label-formTextarea">{title}</label>
        <TooltipIcon id={toolid} text={tooltext}/>
      </div>
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