import React from "react";
import "./styles/variables.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewOKR from "./pages/NewOKR";
import NewKR from "./pages/NewKR";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/NewOKR" element={<NewOKR/>}/>
      <Route path="/NewKR" element={<NewKR/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;