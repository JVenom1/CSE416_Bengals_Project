import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/App.css";
import api from "../api/posts.js";
const ClusterDetailTable = ({
  clusterDet,
  stateID,
  ensembleIndex,
  currentDistrPlan,
  headerText,
}) => {
  const navigate = useNavigate();
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPlans, setSelectedPlans] = useState([]);

  const totalPages = Math.ceil(clusterDet.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // get all headers
  // const columnHeaders = Object.keys(clusterDet[0]);
  const columnHeaders = [
    "name",
    "plancount",
    "averagedemocraticvoters",
    "averagerepublicanvoters",
    "averageasian",
    "averageblack",
    "averagenative",
    "averageother",
    "averagepacific",
    "averagesplit",
    "averagewhite",
  ];
  const columnHeaderMapping = {
    averageasian: "Avg Asian",
    averageblack: "Avg Black",
    averagedemocraticvoters: "Avg Dem. Voters",
    averagenative: "Avg Native",
    averageother: "Avg Other",
    averagepacific: "Avg Pacific",
    averagerepublicanvoters: "Avg Rep. Voters",
    averagesplit: "Avg Split",
    averagewhite: "Avg White",
    name: "Cluster",
    plancount: "Plan Count",
  };

  const handlePrevClick = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextClick = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };
  const handleClustClick = async (index) => {
    console.log(index);
    const getCoords = async (stateID, ensembleIndex, clusterIndex) => {
      try {
        const response = await api.get(
          `/${stateID}/${ensembleIndex}/${clusterIndex}/plan_coordinates`
        );
        return response.data;
      } catch (error) {
        console.log(error);
      }
    };

    const getAllDistrictPlans = async (
      stateID,
      ensembleIndex,
      clusterIndex
    ) => {
      try {
        const response = await api.get(
          `/${stateID}/${ensembleIndex}/${clusterIndex}`
        );
        return response.data;
      } catch (error) {
        console.log(error);
      }
    };
    // assuming x[i] where i is cluster index
    try {
      document.body.style.cursor = "wait";
      const coords = await getCoords(stateID, ensembleIndex, index);
      const districtPlanList = await getAllDistrictPlans(
        stateID,
        ensembleIndex,
        index
      );
      const distrInitalSummary = "get district init Summary";
      navigate("/DistrictAnalysis", {
        state: {
          stateID: stateID,
          currentDistrPlan: currentDistrPlan,
          clusterIndex: index,
          ensembleIndex: ensembleIndex,
          // .availibility .x .y
          districtCoords: coords,
          // [i].availability .averageoppertunitydistrictcount .name .split
          districtPlanList: districtPlanList,
          headerText: headerText,
          distrInitalSummary: distrInitalSummary,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              {columnHeaders.map((header) => (
                <th key={header}>{columnHeaderMapping[header]}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {clusterDet.slice(startIndex, endIndex).map((distPlan, index) => (
              <tr key={index}>
                {columnHeaders.map((header) => (
                  <td
                    className={header === "name" ? "default-button" : null}
                    key={header}
                    onClick={() => {
                      if (header === "name") {
                        const clusterIndex =
                          parseInt(distPlan[header].trim().substring(7)) - 1;
                        handleClustClick(clusterIndex);
                      }
                    }}
                  >
                    {header === "name"
                      ? distPlan[header].trim().substring(7)
                      : distPlan[header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination-container">
          <button
            onClick={handlePrevClick}
            disabled={currentPage === 1}
            className={"pagination-btn"}
          >
            Prev
          </button>
          <span className="pages">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={handleNextClick}
            disabled={currentPage === totalPages}
            className="pagination-btn"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};
export default ClusterDetailTable;
