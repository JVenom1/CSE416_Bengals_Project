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
  const [selectedDistance, setSelectedDistance] = useState("");

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
  const getClusterDetails = async (stateID, ensembleIndex) => {
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

  const getClustCoords = async (stateID, ensemIndex) => {
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
  const getAssocCoords = async (stateID, ensemIndex) => {
    try {
      const response = await api.get(
        `/${stateID}/${ensemIndex}/cluster_association_coordinates`
      );
      const clusterAssoc = response.data;
      return clusterAssoc;
    } catch (error) {
      console.log(error);
    }
  };
  const getAllDistanceMeasures = async (stateID, ensembleIndex) => {
    try {
      const hd = await api.get(`/${stateID}/${ensembleIndex}/cluster_details`)
        .data;
      const ot = await api.get(
        `/${stateID}/${ensembleIndex}/cluster_details_op`
      );
      console.log(hd);
      return { hd: hd, ot: ot };
    } catch (error) {
      console.log(error);
    }
  };
  // const handleDistanceMeasClick = async (ensembleName, distType) => {
  //   const ensembleIndex =
  //     parseInt(ensembleName.charAt(ensembleName.length - 1), 10) - 1;
  //   document.body.style.cursor = "wait";

  //   let allDistanceMeasuresMatrix = await getAllDistanceMeasures(
  //     stateID,
  //     ensembleIndex
  //   );
  //   navigate("/DistMatrixTable", {
  //     state: {
  //       stateID: stateID,
  //       headerText: headerText,
  //       currentDistrPlan: currentDistrPlan,
  //       matrixList: allDistanceMeasuresMatrix,
  //       distType: distType,
  //     },
  //   });
  // };
  const handleEnsemClick = async (ensembleName) => {
    const ensembleIndex =
      parseInt(ensembleName.charAt(ensembleName.length - 1), 10) - 1;
    // then the details like Hispanic population vs black population
    document.body.style.cursor = "wait";
    const clusterCoords = await getClustCoords(stateID, ensembleIndex);
    // pass list of cluster in said ensemble
    const clusterSum = await getClusterSum(stateID, ensembleIndex);
    // const clusterAssocCoords = await getAssocCoords(stateID, ensembleIndex);
    const clusters = await getClusterDetails(stateID, ensembleIndex);
    const distMeas = await getAllDistanceMeasures(stateID, ensembleIndex);
    console.log(distMeas);
    navigate("/ClusterAnalysis", {
      state: {
        stateID: stateID,
        headerText: headerText,
        currentDistrPlan: currentDistrPlan,
        clusters: clusters,
        clusterCoords: clusterCoords,
        clusterScatterWidth: clusterScatterWidth,
        clusterScatterHeight: clusterScatterHeight,
        clusterSum: clusterSum,
        ensembleName: ensembleName,
        ensembleIndex: ensembleIndex,
        distMeas: distMeas,
        // clusterAssocCoords: clusterAssocCoords,
        //  matrix soon to have 3 key:value pairs for the 3 distances (now its just data)
        //  .data=array[ixi]
      },
    });
  };
  const totalPages = Math.ceil(ensembleDetails.length / rowsPerPage);
  return (
    <div className="table-container">
      <table style={{ padding: "10px" }}>
        <thead>
          <tr>
            <th>Ensemble #</th>
            <th>Ensemble Size</th>
            <th>Cluster Count</th>
            <th>More Details</th>
          </tr>
        </thead>
        <tbody>
          {displayedEnsembleDetails.map((row, index) => (
            <tr key={index}>
              {<td>{row.name.trim().substring(9)}</td>}
              <td>{row.ensemblesize}</td>
              <td>{row.clustercount}</td>
              <td>
                <button
                  className="default-button"
                  onClick={() => handleEnsemClick(row.name)}
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

export default EnsembleTable;
