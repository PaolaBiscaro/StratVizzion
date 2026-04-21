import React, { useMemo } from "react";
import "./OKRChart.css";
import Button from "../Button/Button";
import { PieChart, Pie } from "recharts";

function ArcChart({
  value = 86,
  title = "OKR_REQUEST",
  date = "12/12/1999",
  description = "Insert Description Request Here",
  onButtonClick
}) {

  const data = useMemo(() => [
    { value: value, fill: "#1CABC9" },
    { value: 100 - value, fill: "#E0E0E0" },
  ], [value]);

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
          stroke="none"
          isAnimationActive={true} // melhora performance se não precisar animar
        />
      </PieChart>

      <div className="arc-label">
        {value}
        <span className="arc-percent">%</span>
      </div>

      <div className="OKRData">
        <p className="title">{title}</p>
        <p className="date">{date}</p>
        <p className="description">{description}</p>


        <Button className="details" texto={"Ver Detalhes"} url={"/OKR_1021Desc"} variante="branco">
        </Button>

      </div>
    </div>
  );
}

export default ArcChart;