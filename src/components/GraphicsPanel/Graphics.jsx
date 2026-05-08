import React from "react";
import Panel from "../Panel/Panel";
import LineChartOKR from "../LinechartsOKR/LinechartsOKR";
import "./Graphics.css"

function GraphicsPanel({ statusDetail = "Espaço reservado para mensagens geradas por IA." }) {
    return (
        <Panel>
            <div className="graphics-content">
                <div className="graphics-chart">
                    <LineChartOKR
                        data={[
                            { mes: "Jan", real: 10, meta: 5 },
                            { mes: "Fev", real: 20, meta: 15 },
                        ]}
                    />
                </div>

                <div className="graphics-side">
                    <div className="graphics-message-panel">
                        <span>{statusDetail}</span>
                    </div>
                </div>
            </div>
        </Panel>
    );
}

export default GraphicsPanel;