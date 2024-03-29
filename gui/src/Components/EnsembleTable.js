import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/posts.js";
const EnsembleTable = ({
  headerText,
  ensembleDetails,
  stateID,
  currentDistrPlan,
}) => {
  const navigate = useNavigate();
  const rowsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const startIdx = (currentPage - 1) * rowsPerPage;
  const endIdx = startIdx + rowsPerPage;
  const displayedEnsembleDetails = ensembleDetails.slice(startIdx, endIdx);
  const clusterScatterWidth = window.innerWidth * 0.5; // 50% of the screen width
  const clusterScatterHeight = window.innerHeight;
  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    const totalPages = Math.ceil(ensembleDetails.length / rowsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const getClusterSum = async (stateID, ensembleIndex) => {
    try {
      const response = await api.get(
        `/${stateID}/${ensembleIndex}/inital_summary`
      );
      const ensembleSum = response.data;
      return ensembleSum;
    } catch (err) {
      console.log(err);
      return null;
    }
  };
  const getClusterDetailsHd = async (stateID, ensembleIndex) => {
    try {
      const response = await api.get(
        `/${stateID}/${ensembleIndex}/cluster_details`
      );
      const clusters = response.data;
      return clusters;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  const getClustCoordsHd = async (stateID, ensemIndex) => {
    try {
      const response = await api.get(
        `/${stateID}/${ensemIndex}/cluster_coordinates`
      );
      const clusterSum = response.data;
      return clusterSum;
    } catch (error) {
      console.log(error);
    }
  };
  const getClusterDetailsOp = async (stateID, ensembleIndex) => {
    try {
      const response = await api.get(
        `/${stateID}/${ensembleIndex}/cluster_detailsop`
      );
      const clusters = response.data;
      return clusters;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  const getClustCoordsOp = async (stateID, ensemIndex) => {
    try {
      const response = await api.get(
        `/${stateID}/${ensemIndex}/cluster_coordinatesop`
      );
      const clusterSum = response.data;
      return clusterSum;
    } catch (error) {
      console.log(error);
    }
  };
  const getAvgPlanHD = async (stateID, ensemIndex) => {
    try {
      const response = await api.get(`/${stateID}/${ensemIndex}/average_plans`);
      const avgPlans = response.data;
      return avgPlans;
    } catch (error) {
      console.log(error);
    }
  };
  const getAvgPlanOP = async (stateID, ensemIndex) => {
    try {
      const response = await api.get(
        `/${stateID}/${ensemIndex}/average_plansop`
      );
      const avgPlans = response.data;
      return avgPlans;
    } catch (error) {
      console.log(error);
    }
  };
  const getAllDistanceMeasures = async (stateID, ensembleIndex) => {
    try {
      const hd = await api.get(
        `/${stateID}/${ensembleIndex}/distance_measures`
      );
      const op = await api.get(
        `/${stateID}/${ensembleIndex}/distance_measuresop`
      );
      // console.log(hd);
      // console.log(op);

      return { hd: hd.data, op: op.data };
    } catch (error) {
      console.log(error);
    }
  };
  const handleClustAnalysisClick = async (ensembleName) => {
    const ensembleIndex =
      parseInt(ensembleName.charAt(ensembleName.length - 1), 10) - 1;
    document.body.style.cursor = "wait";
    const clusterCoordsHd = await getClustCoordsHd(stateID, ensembleIndex);
    const clustersDetsHd = await getClusterDetailsHd(stateID, ensembleIndex);
    const clusterCoordsOp = await getClustCoordsOp(stateID, ensembleIndex);
    const clustersDetsOp = await getClusterDetailsOp(stateID, ensembleIndex);

    const clusterSum = await getClusterSum(stateID, ensembleIndex);
    const distMeas = await getAllDistanceMeasures(stateID, ensembleIndex);
    const avgPlansHD = await getAvgPlanHD(stateID, ensembleIndex);
    const avgPlansOP = await getAvgPlanOP(stateID, ensembleIndex);
    console.log(avgPlansHD);
    navigate("/ClusterAnalysis", {
      state: {
        stateID: stateID,
        headerText: headerText,
        currentDistrPlan: currentDistrPlan,
        clustersDetsHd: clustersDetsHd,
        clusterCoordsHd: clusterCoordsHd,
        clustersDetsOp: clustersDetsOp,
        clusterCoordsOp: clusterCoordsOp,
        clusterScatterWidth: clusterScatterWidth,
        clusterScatterHeight: clusterScatterHeight,
        clusterSum: clusterSum,
        ensembleName: ensembleName,
        ensembleIndex: ensembleIndex,
        distMeas: distMeas,
        avgPlansHD: avgPlansHD,
        avgPlansOP: avgPlansOP,
      },
    });
  };
  console.log(ensembleDetails);
  const totalPages = Math.ceil(ensembleDetails.length / rowsPerPage);
  return (
    <div className="table-container">
      <table style={{ padding: "10px" }}>
        <thead>
          <tr>
            <th>Ensemble #</th>
            <th>Ensemble Size</th>
            <th>Cluster Count</th>
            <th>Avg Split</th>
            <th>More Details</th>
          </tr>
        </thead>
        <tbody>
          {displayedEnsembleDetails.map((row, index) => (
            <tr key={index}>
              {<td>{row.name.trim().substring(9)}</td>}
              <td>{row.ensemblesize}</td>
              <td>{row.clustercount}</td>
              <td>{row.averagesplit}</td>
              <td>
                <button
                  className="default-button"
                  onClick={() => handleClustAnalysisClick(row.name)}
                >
                  {`Cluster Analysis`}
                </button>
                {/* <button
                  className="default-button"
                  onClick={() => handleDistanceMeasClick(row.name, "OT")}
                >
                  {`Optimal Transport`}
                </button>
                <button
                  className="default-button"
                  onClick={() => handleDistanceMeasClick(row.name, "HD")}
                >
                  {`Hamming Distance`}
                </button> */}
                {/* <div>
                  <select
                    className="default-dropdown"
                    value={selectedDistance}
                    onChange={(e) => handleDistanceMeasClick(e.target.value)}
                  >
                    <option disabled value="">
                      Select Distance Measure
                    </option>
                    <option value="OT">Optimal Transport</option>
                    <option value="HD">Hamming Distance</option>
                  </select>
                </div> */}
              </td>
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
        {totalPages !== 0 ? (
          <span className="pages">{`Page ${currentPage} of ${totalPages}`}</span>
        ) : (
          <span className="pages">{`Page ${0} of ${totalPages}`}</span>
        )}
        <button
          className="pagination-btn"
          onClick={handleNextClick}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EnsembleTable;
