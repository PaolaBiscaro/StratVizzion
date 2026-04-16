import React from "react";
import "./TextInput.css"

function TextInput({title="Title Request", inside="Insert inside text here", tamanho="64px", largura="1356px"}){
    const handleInput = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };
    
    return(
        <div className="TextInput">
            <label className="label" for>{title}</label>
            <textarea type="text" placeholder={inside} className="input" style={{minHeight : tamanho, width: largura} } onInput={handleInput}></textarea>
        </div>
    )
}

export default TextInput