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



/*Explicação
  Usando a biblioteca React router eu consigo colocar várias páginas diferentes
  que direcionam aos arquivos, assim ao rodar npm run dev é possível cada arquivo
  da pasta pages ter seu próprio URL

*/

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/NewOKR" element={<NewOKR />} />
        <Route path="/NewKR" element={<NewKR />} />
        <Route path="/home" element={<Home />} />
        <Route path="/HomeManager" element={<Manager />} />
        <Route path="/ProfileConfiguration" element={<ProfileConfiguration />} />
        <Route path="/relatorio" element={<GenerateReport />} />
        <Route path="/ViewKeyResults" element={<ViewKeyResults />} />
        <Route path="/KRDetails" element={<KRDetails />} />


      </Routes>

    </BrowserRouter>
  );
}

export default App;