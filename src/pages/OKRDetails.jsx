import React from "react";
import SideBar from "../components/Sidebar/SideBar";
import OKRRoute from "../components/OKRDetailsTitle/OKRRoute";
import OKRInfo from "../components/OKRInfo/OKRInfo";
import Warning from "../components/WarningPanel/Warning";
import GraphicsPanel from "../components/GraphicsPanel/Graphics";
import "../styles/OKRDetails.css";

// Cada OKR deve ter sua própria página de Detalhes!

function OKRDetails() {
    return (
        <div className="okr-details-page">
            <SideBar
                typeUser={"Director"}
                nameUser={"Paulo"}
            />

            <main className="okr-details-main">
                <OKRRoute />
                <OKRInfo />

                <div className="okr-details-bottom">
                    <div className="okr-details-warning">
                        <Warning />
                    </div>

                    <div className="okr-details-graphics">
                        <GraphicsPanel />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default OKRDetails;