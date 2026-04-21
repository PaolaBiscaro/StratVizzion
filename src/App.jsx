import React from "react";
import "./styles/variables.css";
import SideBar from "./components/SideBar";
import HomeManager from "./features/homeManager";
import Button from "./components/Button/Button";

function App() {
  return (
    <div className="app-layout">
      <SideBar/>
      {/* <Button texto={"Criar nova OKR"} url={"/TESTE"} variante="branco"/> */}
      <div className="content-homemanager">
      <HomeManager/>
      </div>
    </div>
  );
}

export default App;