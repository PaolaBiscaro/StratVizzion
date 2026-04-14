import React from "react";
import "./styles/variables.css";
import SideBar from "./components/SideBar";
import Button from "./components/Button/Button";

function App() {
  return (
    <div>
      <Button texto={"Criar nova OKR"} url={"/TESTE"} variante="Branco"/>
    </div>
  );
}

export default App;