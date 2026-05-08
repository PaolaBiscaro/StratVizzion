import React from "react";
import "./styles/variables.css";
import NewOKR from "./pages/NewOKR";
import NewKR from "./pages/NewKR";
import SideBar from "./components/Sidebar/SideBar";
import HomeManager from "./pages/HomeManager";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/HomeDirector";
import Manager from "./pages/HomeManager"
import ProfileConfiguration from "./pages/ProfileConfiguration";
import GenerateReport from "./pages/GenerateReport";
import ViewKeyResults from './pages/ViewKeyResults';
import KRDetails from "./pages/KRDetails";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";



/*Explicação
  Usando a biblioteca React router eu consigo colocar várias páginas diferentes
  que direcionam aos arquivos, assim ao rodar npm run dev é possível cada arquivo
  da pasta pages ter seu próprio URL

*/

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Cadastro" element={<Cadastro/>} />
        <Route path="/nova-okr" element={<NewOKR />} />
        <Route path="/nova-kr" element={<NewKR />} />
        <Route path="/home-manager" element={<Manager />} />
        <Route path="/home-director" element={<Home />} />
        <Route path="/meu-perfil" element={<ProfileConfiguration />} />
        <Route path="/relatorio" element={<GenerateReport />} />
        <Route path="/visualizar-kr" element={<ViewKeyResults />} />
        <Route path="/kr-detalhada" element={<KRDetails />} />
        <Route path="/okr-detalhada" element={<Home />} /> {/*Precisa verificar essa tela */}


      </Routes>

    </BrowserRouter>
  );
}

export default App;