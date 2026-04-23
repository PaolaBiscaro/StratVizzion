import React from "react";
import "./OKRRoute.css"


function OKRRoute({OKRname="Q1_2026_003_OKR"}){
    return(
        <div className="title">
            <h1 >{OKRname}</h1>
            <h2>Home {">"} {OKRname} </h2>
        </div>
    )
}

export default OKRRoute;