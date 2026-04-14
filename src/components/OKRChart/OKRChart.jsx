import React from "react";
import { PieChart, Pie } from "recharts";
import "./OKRChart.css";
import Botao from "../Button/Button";

function ArcChart({ value = 86, title="OKR_REQUEST", date="12/12/1999", description ="Insert Description Request Here"}) {
  const data = [
    { value: value, fill: "#1CABC9" }, //Mostra o quanto tem em branco
    { value: 100 - value, fill: "#E0E0E0" },//Mostra o quanto falta em branco
  ];

  return (
    <div className="arc-container">
      <PieChart width={200} height={200}>
        <Pie
          data={data}
          cx={100}
          cy={110}
          startAngle={180}
          endAngle={0}
          innerRadius={70}
          outerRadius={100}
          dataKey="value"
          strokeWidth={0}

          
        />
        
      </PieChart>
      <div className="arc-label">
        {value}<span className="arc-percent">%</span>
      </div>
      <div className="OKRData">
        <p className="title">{title}</p>
        <p className="date">{date}</p>
        <p className="description">{description}</p>
        <Botao className="Detalhes" texto={"Ver Detalhes"} url={"/Detalhes"} variante="branco"/>
      </div>
    </div>
  );
}

export default ArcChart;