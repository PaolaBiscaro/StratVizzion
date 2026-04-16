import React from "react";
import "./TextInput.css"

function TextInput({title="Title Request", inside="Insert inside text here", tamanho="64px"}){
    const handleInput = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };
    
    return(
        <div className="TextInput">
            <label className="label">{title}</label>
            <textarea type="text" placeholder={inside} className="input" style={{minHeight : tamanho} } onInput={handleInput}></textarea>
        </div>
    )
}

export default TextInput