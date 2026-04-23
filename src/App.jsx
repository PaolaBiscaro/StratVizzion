import React from "react";
import "./styles/variables.css";
import NewOKR from "./pages/NewOKR";
import NewKR from "./pages/NewKR";
import SideBar from "./components/Sidebar/SideBar";
import HomeManager from "./features/homeManager";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/HomeDirector";
import Manager from "./features/homeManager/index"
import ProfileConfiguration from "./pages/ProfileConfiguration";



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
          <Route path="/HomeManager" element={<Manager/>}/>
          <Route path="/ProfileConfiguration" element={<ProfileConfiguration />} />
        </Routes>

      </BrowserRouter>
  );
}

export default App;