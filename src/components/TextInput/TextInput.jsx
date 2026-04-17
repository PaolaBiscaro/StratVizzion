import React from "react";
import "./TextInput.css"

function TextInput({ title, inside, tamanho, value, onChange }) {//Permite adicionar tamanho, valor e até o que acontece se mudar
  const handleInput = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  return (
    <div className="FloatMenu">
      <label className="Label">{title}</label>
      <textarea
        placeholder={inside}
        className="input"
        style={{ minHeight: tamanho || "64px" }}
        value={value}
        onChange={onChange}
        onInput={handleInput}
      />
    </div>
  );
}

export default TextInput