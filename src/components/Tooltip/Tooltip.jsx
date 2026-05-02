import React from "react";
import { Tooltip } from "react-tooltip";
import "./Tooltip.css";

function TooltipIcon({ id, text }) {
  return (
    <>
      <span className="tooltip-icon" data-tooltip-id={id} data-tooltip-content={text}>
        ?
      </span>
      <Tooltip id={id} />
    </>
  );
}

export default TooltipIcon;