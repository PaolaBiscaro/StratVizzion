import React from "react";
import SideBar from "../components/Sidebar/SideBar";
import Entrada from "../components/Entrada/Entrada";
import OKRWorking from "../components/OKRWorking/OKRWorking";
import OKRConcluded from "../components/OKRConcluded/OKRConcluded";
import ArcChart from "../components/OKRChart/OKRChart";
import Button from "../components/Button/Button";
import MainTitle from "../components/MainTitle/MainTitle";

function Home() {
  return (
    <div className="page-layout">
      <SideBar />
      <main >
        <MainTitle
          title={"Olá, UserRequest!"}
          subtitle={"Acompanhe o desenvolvimento de seus projetos"}
        />

        {/* <Entrada userName="UserRequest" /> */}
        
        <OKRWorking />
          
       
        <OKRConcluded />

      </main>
      <Button texto="Criar nova OKR" url="/NewOKR" variante="verde" className={"HomeDirector"} />

    </div>
  );
}

export default Home;

/*
    O Username precisa depois ser trocado pelo nome de usuário
    necessário da api do backend funcionando para isso
*/