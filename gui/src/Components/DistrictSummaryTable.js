import "../App.css";
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
    <div>
      <table>
        <thead>
          <tr>
            <th>Availability</th>
            <th>Plan Name</th>
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
                <td key={header}>{distPlan[header].toString()}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button
          onClick={handlePrevClick}
          disabled={currentPage === 1}
          className={currentPage === 1 ? "disabled-button" : "default-button"}
        >
          Prev
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={handleNextClick}
          disabled={currentPage === totalPages}
          className={
            currentPage === totalPages ? "disabled-button" : "default-button"
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DistrictSummaryTable;
