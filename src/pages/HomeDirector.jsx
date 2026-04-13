import React from "react";
import SideBar from "../components/Sidebar/SideBar";
import Entrada from "../components/Entrada/Entrada";
import OKRWorking from "../components/OKRWorking/OKRWorking";
import OKRConcluded from "../components/OKRConcluded/OKRConcluded";


function Home() {
  return (
    <div style={{ display: "flex" }}>
      <SideBar />
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <Entrada userName="UserRequest" />
        <OKRWorking/>
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}> 
          <OKRConcluded/>
        </div>
      </div>
    </div>
  );
}

export default Home;

/*
    O Username precisa depois ser trocado pelo nome de usuário
    necessário da api do backend funcionando para isso
*/