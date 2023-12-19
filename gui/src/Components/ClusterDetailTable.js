import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/App.css";
import api from "../api/posts.js";
const ClusterDetailTable = ({
  avgPlansHD,
  avgPlansOP,
  clusterDet,
  stateID,
  ensembleIndex,
  currentDistrPlan,
  headerText,
}) => {
  const navigate = useNavigate();
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  // const [selectedPlans, setSelectedPlans] = useState([]);

  const totalPages = Math.ceil(clusterDet.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // get all headers
  // const r = Object.keys(clusterDet[0]);
  const columnHeaders = [
    "name",
    "plancount",
    "averagesplit",
    "averagedistance",
    "averageopportunity",
  ];
  const columnHeaderMapping = {
    averagedistance: "Avg Distance",
    averageopportunity: "Avg Opportunity Distr.",
    averagesplit: "Avg Split",
    name: "Cluster",
    plancount: "Plan Count",
  };

  const handlePrevClick = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextClick = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };
  const handleClustClick = async (clusterIndex) => {
    const getCoordsHd = async (stateID, ensembleIndex, clusterIndex) => {
      try {
        const response = await api.get(
          `/${stateID}/${ensembleIndex}/${clusterIndex}/plan_coordinates`
        );
        return response.data;
      } catch (error) {
        console.log(error);
      }
    };

    const getAllDistrictPlansHd = async (
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
    const getCoordsOp = async (stateID, ensembleIndex, clusterIndex) => {
      try {
        const response = await api.get(
          `/${stateID}/${ensembleIndex}/${clusterIndex}/plan_coordinatesop`
        );
        return response.data;
      } catch (error) {
        console.log(error);
      }
    };

    const getAllDistrictPlansOp = async (
      stateID,
      ensembleIndex,
      clusterIndex
    ) => {
      try {
        const response = await api.get(
          `/${stateID}/${ensembleIndex}/${clusterIndex}/op`
        );
        return response.data;
      } catch (error) {
        console.log(error);
      }
    };
    const getDistrSum = async (stateID) => {
      try {
        const response = await api.get(`/${stateID}/state_details`);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    };
    const getAvgPlan = async (stateID, ensembleIndex, planNumber) => {
      try {
        const response = await api.get(
          `/${stateID}/${ensembleIndex}/${planNumber}/district_plan`
        );
        return response.data;
      } catch (error) {
        console.log(error);
        return null;
      }
    };

    // assuming x[i] where i is cluster index
    try {
      document.body.style.cursor = "wait";
      const coordsHd = await getCoordsHd(stateID, ensembleIndex, clusterIndex);
      const districtPlanListHd = await getAllDistrictPlansHd(
        stateID,
        ensembleIndex,
        clusterIndex
      );
      const coordsOp = await getCoordsOp(stateID, ensembleIndex, clusterIndex);
      const districtPlanListOp = await getAllDistrictPlansOp(
        stateID,
        ensembleIndex,
        clusterIndex
      );
      const distrInitalSummary = await getDistrSum(stateID);
      const avgPlanHD = await getAvgPlan(
        stateID,
        ensembleIndex,
        avgPlansHD.plans[clusterIndex]
      );
      const avgPlanOP = await getAvgPlan(
        stateID,
        ensembleIndex,
        avgPlansOP.plans[clusterIndex]
      );
      navigate("/DistrictAnalysis", {
        state: {
          stateID: stateID,
          avgDitrPlanHD: avgPlanHD,
          avgDitrPlanOP: avgPlanOP,
          // currentDistrPlan: currentDistrPlan,
          clusterIndex: clusterIndex,
          ensembleIndex: ensembleIndex,
          // .availibility .x .y
          districtCoordsHd: coordsHd,
          districtCoordsOp: coordsOp,
          // [i].availability .averageoppertunitydistrictcount .name .split
          districtPlanListHd: districtPlanListHd,
          districtPlanListOp: districtPlanListOp,
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
                    key={header}
                    onClick={() => {
                      if (header === "name") {
                        const clusterIndex =
                          parseInt(distPlan[header].trim().substring(7)) - 1;
                        handleClustClick(clusterIndex);
                      }
                    }}
                  >
                    {header === "name" ? (
                      <button
                        className={header === "name" ? "cluster-button" : null}
                      >
                        {distPlan[header].trim().substring(7)}
                      </button>
                    ) : (
                      distPlan[header]
                    )}
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
