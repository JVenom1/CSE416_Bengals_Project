import React, { useState } from "react";
import "../CSS/App.css";
const DistrInitSummary = ({ distrDet }) => {
  const keys = Object.keys(distrDet);
  console.log(keys);
  const columnHeaders = [
    "percentdemvoters",
    "percentrepvoters",
    "percentwhite",
    "percentblack",
    "percentasian",
    "percentindian",
    "percentpacific",
    "percentother",
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
  // console.log(distrDet);
  return (
    <div className="solo-table-container">
      <table>
        <thead>
          <tr>
            <th>% Dem. Voters</th>
            <th>% Rep. Voters</th>
            <th>% White</th>
            <th>% Black</th>
            <th>% Asian</th>
            <th>% Indian</th>
            <th>% Pacific</th>
            <th>% Other</th>
          </tr>
        </thead>
        <tbody>
          <tr className="solo-tr">
            {columnHeaders.map((key) => (
              <td key={key}>{distrDet[key]}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default DistrInitSummary;
