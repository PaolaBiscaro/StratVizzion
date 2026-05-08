import React from "react";
import { DirectorSideBarData } from "./DirectorSideBarData";
import { ManagerSideBarData } from "./ManagerSideBarData"; 
import "./SideBar.css";
import { FiLogOut } from "react-icons/fi";

// Adicionamos nameUser nas propriedades do componente
function SideBar({ typeUser, nameUser }) {
  const sidebarData = typeUser === "Director" ? DirectorSideBarData : ManagerSideBarData;

  return (
    <div className="Sidebar">
      <div 
        className="Profile" 
        onClick={() => { window.location.pathname = "/ProfileConfiguration" }} 
        style={{ cursor: "pointer" }}
      >
        {/* Espaço para foto de perfil */}
      </div>

      <div className="User-Info">
        {/* Agora exibimos o nome que vier pela prop nameUser */}
        <h1 className="User">{nameUser}</h1> 
        <h2 className="Role">{typeUser}</h2>
      </div>

      <ul className="SideBarList">
        {sidebarData.map((val, key) => {
          return (
            <li 
              key={key}
              className="Coluna"
              id={window.location.pathname === val.link ? "atual" : ""}
              onClick={() => { window.location.pathname = val.link }}
            >
              <div className="icon-container">{val.icon}</div>
              <div className="title-container">{val.title}</div>
            </li>
          );
        })}
      </ul>

      <div className="Logout">
        <FiLogOut />
        <span onClick={() => { window.location.pathname = "/login" }}>Sair</span>
      </div>
    </div>
  );
}

export default SideBar;