import React from "react";
import { DirectorSideBarData } from "./DirectorSideBarData";
import "./SideBar.css";
import { FiLogOut } from "react-icons/fi";//Biblioteca de ícones

/* Explicação
    A SideBarData contém uma lista com todos as guias da side bar
    se precisar adicionar só adicionar no SideBarData
    Aqui ele vai fazer uma nova instância de div para cada item da lista
    a função on click vai levar para a página, se precisar mudar o nome
    da página ou até mudar a localização só mudar na SideBarData
 
    OBSERVAÇÃO
    Essa SideBar pode ser usada por ambas telas de diretor e cargo, precisaria adicionar um data das telas do Gestor e depois fazer verificação para definir quem é quem
    Podemos assim que tivermos um backend completo, fazer uma verificação simples
    se o cargo de quem estiver entrado for x fica tal tela, senão fica y

    if(user_role == "Manager"){
    ....
    }

    if(user_role == "Director"){
      ...
    }


    depois dessa lógica só teria que trocar o "DirectorSideBarData.map" dependendo do cargo
*/


function SideBar() {
  return (
    <div className="Sidebar">
      <div className="Profile"></div>
      <h1 className="User">User Request</h1>
      <h2 className="Role">Role Request</h2>
      <ul className="SideBarList">
        {DirectorSideBarData.map((val, key) => {
          return (
            <li key={key}
            className="Coluna"
            id={window.location.pathname == val.link ? "atual" : ""}
            onClick={() => { window.location.pathname = val.link }}>
              <div>{val.title}</div>
            </li>
          );
        })}
      </ul>
      <div className="Logout">
        <FiLogOut />
        <span onClick={()=>{window.location.pathname="/login"}}>Sair</span>
      </div>
    </div>
  );
}


/*
 OBSERVAÇÃO
 Algumas coisas faltam implementar as lógica, como a foto de perfil
 O nome do usuário
 e o cargo
 como essas funções funcionam por meio de requisições, estarei deixando elas quietas por enquanto
  entretando já estão com nomes de classe para facilitar mais tarde
 */

export default SideBar;