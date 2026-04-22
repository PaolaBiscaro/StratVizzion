import React from "react";
import { Tooltip } from "react-tooltip";
import "./Tooltip.css";

function TooltipIcon({ id, texto }) {
  return (
    <>
      <span className="tooltip-icon" data-tooltip-id={id} data-tooltip-content={texto}>
        ?
      </span>
      <Tooltip id={id} />
    </>
  );
}

export default TooltipIcon;