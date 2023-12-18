import React, { useState } from "react";
import "../CSS/App.css";
const DistrInitSummary = ({ distrDet }) => {
  const keys = Object.keys(distrDet);
  console.log(keys);
  const columnHeaders = [
    "percentasian",
    "percentblack",
    "percentdemvoters",
    "percentindian",
    "percentother",
    "percentpacific",
    "percentrepvoters",
    "percentwhite",
  ];
  const columnHeaderMapping = {
    percentasian: "% Asian",
    percentblack: "% Black",
    percentdemvoters: "% Dem. Voters",
    percentindian: "% Indian",
    percentother: "% Other",
    percentpacific: "% Pacific",
    percentrepvoters: "% Rep. Voters",
    percentwhite: "% White",
  };
  return (
    <div className="solo-table-container">
      <table>
        <thead>
          <tr>
            <th>% Asian</th>
            <th>% Black</th>
            <th>% Dem. Voters</th>
            <th>% Indian</th>
            <th>% Other</th>
            <th>% Pacific</th>
            <th>% Rep. Voters</th>
            <th>% White</th>
          </tr>
        </thead>
        <tbody>
          <tr className="solo-tr">
            {keys.map((key) => (
              <td key={key}>{distrDet[key]}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default DistrInitSummary;
