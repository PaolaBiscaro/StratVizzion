import React from "react";
import SideBar from "../components/Sidebar/SideBar";
import OKRRoute from "../components/OKRDetailsTitle/OKRRoute";
import OKRInfo from "../components/OKRInfo/OKRInfo";

// Cada OKR deve ter sua própria página de Detalhes!

function OKRDetails(){
    return(
    <div style={{ display: "flex" }}>
      <SideBar />
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <OKRRoute />
        <OKRInfo/>
    </div>
    </div>
        );
}


export default OKRDetails;