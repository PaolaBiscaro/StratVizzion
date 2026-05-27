import React from "react";
import "./KRTable.css";

function KRTable({ krs = [] }) {
    const defaultKrs = [
        { id: "KR_102" },
        { id: "KR_102" },
        { id: "KR_102" },
        { id: "KR_102" },
    ];

    const data = krs.length > 0 ? krs : defaultKrs;

    const total = data.length;
    const pendentes = data.filter(k => k.status === "pendente").length || 3;
    const atraso = data.filter(k => k.status === "atraso").length || 1;
    const concluidas = data.filter(k => k.status === "concluida").length || 4;

    return (
        <div className="kr-table-wrapper">
            <table className="kr-table">
                <thead>
                    <tr>
                        <th className="kr-table-col-id"></th>
                        <th>TOTAL</th>
                        <th>PENDENTES</th>
                        <th>ATRASO</th>
                        <th>CONCLUIDAS</th>
                    </tr>
                    <tr className="kr-table-summary">
                        <td></td>
                        <td>{total}</td>
                        <td>{pendentes}</td>
                        <td>{atraso}</td>
                        <td>{concluidas}</td>
                    </tr>
                </thead>
                <tbody>
                    {data.map((kr, index) => (
                        <tr key={index} className="kr-table-row">
                            <td className="kr-table-id">{kr.id}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default KRTable;