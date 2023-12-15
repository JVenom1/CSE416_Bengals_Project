import "../CSS/App.css";
import { useState } from "react";

const DistrictSummaryTable = ({ distPlanList }) => {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPlans, setSelectedPlans] = useState([]);

  const totalPages = Math.ceil(distPlanList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const columnHeaders = Object.keys(distPlanList[0]);
  console.log(distPlanList[0].availibility);

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
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Availability</th>
            <th>Plan #</th>
            <th>Num Oppertunity Dist Count</th>
            <th>Rep./Dem. Splits</th>
            {/* {columnHeaders.map((header) => (
                            <th key={header}>{header}</th>
                        ))} */}
          </tr>
        </thead>
        <tbody>
          {distPlanList.slice(startIndex, endIndex).map((distPlan, index) => (
            <tr key={index}>
              {columnHeaders.map((header) => (
                <td key={header}>
                  {header === "name"
                    ? distPlan[header].trim().substring(4)
                    : distPlan[header].toString()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination-container">
        <button
          className="pagination-btn"
          onClick={handlePrevClick}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span className="pages">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          className="pagination-btn"
          onClick={handleNextClick}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DistrictSummaryTable;
