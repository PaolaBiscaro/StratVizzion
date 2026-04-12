import React from "react";
import "./styles/variables.css";
import SideBar from "./components/SideBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/HomeDirector";


/*Explicação
  Usando a biblioteca React router eu consigo colocar várias páginas diferentes
  que direcionam aos arquivos, assim ao rodar npm run dev é possível cada arquivo
  da pasta pages ter seu próprio URL

*/

function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/home" element={<Home />} />
    </Routes>

    </BrowserRouter>
  );
}

export default App;