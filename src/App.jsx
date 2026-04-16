import React from "react";
import "./styles/variables.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewOKR from "./pages/NewOKR";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/NewOKR" element={<NewOKR/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;