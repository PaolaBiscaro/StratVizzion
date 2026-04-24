import React from "react";
import Panel from "../Panel/Panel";
import LineChartOKR from "../LinechartsOKR/LinechartsOKR";
import "./Graphics.css"

function GraphicsPanel({ statusMessage = "Insert IA Status message here" }) {
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
                <span className="graphics-message">{statusMessage}</span>
            </div>
        </Panel>
    );
}

export default GraphicsPanel;