import React from "react";
import SideBar from "../components/SideBar";
import Entrada from "../components/Entrada";

function Home() {
  return (
    <div style={{ display: "flex" }}>
      <SideBar/>
      <Entrada userName="UserRequest"/>
    </div>
  );
}

/*
    O Username precisa depois ser trocado pelo nome de usuário
    necessário da api do backend funcionando para isso
*/
export default Home;