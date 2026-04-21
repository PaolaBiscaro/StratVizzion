import React from "react";
import "./Button.css"
/*
EXPLICAÇÃO
ESSE BOTÃO É 1 SÓ QUE DUAS VARIANTES, no campo "variante" escreva "verde" parao botão verde ou "branco" para o botão branco 
se o campo não for passado, ele de padrão vai ser verde
ATENÇÃO- as variantes podem ser escritas também como "Verde" ou "Branco"
*/

function BotaoVerde({ texto, url, variante = "verde", className, onClick }) {//Permite adicionar tamanho, valor e até o que acontece se clicar se necessário, como uma função de apagar ou um post
  return (
    <div>
      <button
        className={`Button Button--${variante} ${className}`}
        onClick={onClick || (() => { window.location.pathname = url })}
      >
        {texto}
      </button>
    </div>
  );
}

export default BotaoVerde;