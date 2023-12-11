import React, { useState } from "react";
const ClusterDetailTable = ({ clusterDet }) => {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPlans, setSelectedPlans] = useState([]);

  const totalPages = Math.ceil(clusterDet.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const columnHeaders = Object.keys(clusterDet[0]);

  const handlePrevClick = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextClick = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handleCheckboxChange = (index) => {
    // Handle checkbox change
    const updatedSelectedPlans = [...selectedPlans];
    updatedSelectedPlans[index] = !selectedPlans[index];

    // true false list where true display the plan
    setSelectedPlans(updatedSelectedPlans);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Avg Split</th>
            <th>Name</th>
            <th>Opportunity Districts</th>
            <th>Plan Amount</th>
            {/* {columnHeaders.map((header) => (
                            <th key={header}>{header}</th>
                        ))} */}
          </tr>
        </thead>
        <tbody>
          {clusterDet.slice(startIndex, endIndex).map((distPlan, index) => (
            <tr key={index}>
              {/* <td>
                                {distPlan.availability === "Available" ? (
                                    <input
                                        type="checkbox"
                                        checked={selectedPlans[index] || false}
                                        onChange={() => handleCheckboxChange(index)}
                                    />
                                ) : (
                                    "X"
                                )}
                            </td> */}
              {columnHeaders.map((header) => (
                <td key={header}>{distPlan[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button
          onClick={handlePrevClick}
          disabled={currentPage === 1}
          className={currentPage === 1 ? "disabled-button" : "pagination-btn"}
        >
          Prev
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={handleNextClick}
          disabled={currentPage === totalPages}
          className={
            currentPage === totalPages ? "disabled-button" : "pagination-btn"
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default ClusterDetailTable;
