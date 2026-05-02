import React from "react";
import "./FormInput.css"
import "../../../styles/variables.css"
import TooltipIcon from "../../Tooltip/Tooltip";


// function FormInput({ title, inside, value }) {//Permite adicionar tamanho, valor e até o que acontece se mudar
//   // const handleInput = (e) => {
//   //   e.target.style.height = "auto";
//   //   e.target.style.height = e.target.scrollHeight + "px";
//   // };

//   return (
//     <div className="float-menu-formInput">
//       <label className="label-formInput">{title}</label>
//       <input 
//         placeholder={inside}
//         className= "input-formInput" 
//         // style={{ minHeight: tamanho || "64px" }}
//         value={value}
//         // onChange={onChange}
//         // onInput={handleInput}
//       />
//     </div>
//   );
// }

function FormInput({ title, inside, value, onChange, className, toolid, tooltext}) { 
  return (
    /* Concatenamos a classe padrão com a classe que vem por fora */
    <div className={`float-menu-formInput ${className || ""}`}>
      <div>
        <label className="label-formInput">{title}</label>
        <TooltipIcon id={toolid} text={tooltext}/>
      </div>
      <input 
        placeholder={inside}
        className="input-formInput" 
        value={value}
        onChange={onChange}
      />
    </div>
  );
}


export default FormInput