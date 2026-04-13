import React from "react";
import "./styles/variables.css";
import SideBar from "./components/SideBar";
import HomeManager from "./features/homeManager";
import TeamSection from "./features/homeManager/components/TeamSection";

function App() {
  return (
    <div className="app-layout">
      <SideBar />
      <div className="content">
      <HomeManager/>
      </div>
    </div>
  );
}

export default App;