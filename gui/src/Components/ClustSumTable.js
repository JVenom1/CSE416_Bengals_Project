import React from "react";
const ClustSumTable = ({ ensembleName, clusterSum }) => {
  const keys = Object.keys(clusterSum);
  // averagedistancehd | averagedistanceot | numberofplans
  // console.log(keys)
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Ensemble</th>
            <th>Avg Hamming</th>
            <th>Avg Optimal Transport</th>
            <th># of Plans</th>
            {/* {keys.map((key) => (
                            <th key={key}>{key}</th>
                        ))} */}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{ensembleName}</td>
            {keys.map((key) => (
              <td key={key}>{clusterSum[key]}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default ClustSumTable;
