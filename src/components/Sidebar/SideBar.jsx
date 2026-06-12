import React, { useState, useEffect } from "react"; // 1. Adicione o useState e useEffect aqui
import { useNavigate, useLocation } from "react-router-dom"; 
import { DirectorSideBarData } from "./DirectorSideBarData";
import { ManagerSideBarData } from "./ManagerSideBarData"; 
import "./SideBar.css";
import { FiLogOut } from "react-icons/fi";

function SideBar() {
  const navigate = useNavigate();
  const location = useLocation(); 

  // 2. CORREÇÃO: Transformamos o user em um Estado do React
  const [user, setUser] = useState(() => {
    const userString = localStorage.getItem("user");
    return userString ? JSON.parse(userString) : null;
  });

  // 3. NOVO: Efeito que fica ouvindo a tela de perfil ser salva
  useEffect(() => {
    const handleProfileUpdate = () => {
      const userString = localStorage.getItem("user");
      setUser(userString ? JSON.parse(userString) : null);
    };

    // Começa a ouvir o evento
    window.addEventListener("userProfileUpdated", handleProfileUpdate);
    
    // Limpa o ouvinte quando a barra sumir da tela
    return () => window.removeEventListener("userProfileUpdated", handleProfileUpdate);
  }, []);

// 4. Suas variáveis dinâmicas continuam iguais (mas agora reagem ao estado!)
  const isDirector = user?.role === 1;
  const typeUser = isDirector ? "Director" : "Manager";
  const sidebarData = isDirector ? DirectorSideBarData : ManagerSideBarData;

  // PRIMEIRO: Definimos como o nome vai aparecer
  const partesNome = user?.name ? user.name.split(" ") : ["Usuário"];
  const primeiroNome = partesNome.length > 1 
      ? `${partesNome[0]} ${partesNome[1]}` 
      : partesNome[0];  

  // DEPOIS: Extraímos a inicial da variável que já existe
  const inicial = primeiroNome.charAt(0).toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login"); 
  };

  return (
    <div className="Sidebar">
      
      {/* Aqui entra a mágica do Avatar com a inicial */}
      <div 
        className="Profile" 
        onClick={() => navigate("/meu-perfil")} 
        style={{ 
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#10B981", /* O tom de verde do seu sistema */
          color: "#FFFFFF",
          fontSize: "28px",
          fontWeight: "bold",
          borderRadius: "50%", /* Faz virar um círculo perfeito */
          width: "85px",
          height: "85px",
          margin: "0 auto 16px auto", /* Centraliza na Sidebar e afasta do nome */
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)" /* Um sombreado leve para destacar */
        }}
        title="Configurações de Perfil"
      >
        {inicial}
      </div>

      <div className="User-Info">
        <h1 className="User">{primeiroNome}</h1> 
        <h2 className="Role">{typeUser}</h2>
      </div>

      <ul className="SideBarList">
        {sidebarData.map((val, key) => {
          return (
            <li 
              key={key}
              className="Coluna"
              id={location.pathname === val.link ? "atual" : ""}
              onClick={() => navigate(val.link)}
            >
              <div className="icon-container">{val.icon}</div>
              <div className="title-container">{val.title}</div>
            </li>
          );
        })}
      </ul>

      <div 
        className="Logout" 
        onClick={handleLogout} 
        style={{ cursor: "pointer" }}
      >
        <FiLogOut />
        <span>Sair</span>
      </div>
    </div>
  );
}

export default SideBar;