import React from "react";
import "./TextInput.css"
import TooltipIcon from "../Tooltip/Tooltip";

function TextInput({ title, inside, tamanho, value, onChange, className, toolText, toolId }) {
  const handleInput = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  return (
    <div className="FloatMenu">
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <label className="Label">{title}</label>
        <TooltipIcon id={toolId} texto={toolText} />
      </div>
      <textarea
        placeholder={inside}
        className={`input ${className}`}
        style={{ minHeight: tamanho || "64px" }}
        value={value}
        onChange={onChange}
        onInput={handleInput}
      />
    </div>
  );
}

export default TextInput;