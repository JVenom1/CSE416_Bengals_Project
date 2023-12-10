import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../api/posts.js"
const EnsembleTable = ({ headerText, ensembleDetails, ensembleTableWidth, ensembleTableHeight, stateID, currentDistrPlan }) => {

    const navigate = useNavigate();
    const rowsPerPage = 6;
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
    const getEnsemble = async (stateID, ensembleIndex) => {
        try {
            const response = await api.get(`/${stateID}/${ensembleIndex}/inital_summary`);
            const ensemble = response.data;
            return ensemble;
        } catch (err) {
            console.log(err)
            return null;
        }
    }
    // Cluster Distances 
    const getClustCoords = async (stateID, ensemIndex) => {
        try {
            const response = await api.get(`/${stateID}/${ensemIndex}/cluster_coordinates`);
            const clusterDetailsList = response.data;
            return clusterDetailsList;
        } catch (error) {
            console.log(error);
        }
    }
    const getAllDistanceMeasures = async (stateID, ensembleIndex) => {
        try {
            const response = await api.get(`/${stateID}/${ensembleIndex}/distance_measures`);
            return response.data;
        }
        catch (error) {
            console.log(error)
        }
    }
    const handleDistanceMeasClick = async (ensembleName) => {
        const ensembleIndex = parseInt(ensembleName.charAt(ensembleName.length - 1), 10) - 1;
        document.body.style.cursor = 'wait';
        const allDistanceMeasuresMatrix = await getAllDistanceMeasures(stateID, ensembleIndex);
        navigate("/DistMatrixTable",
            {
                state:
                {
                    stateID: stateID,
                    headerText: headerText,
                    currentDistrPlan: currentDistrPlan,
                    matrixList: allDistanceMeasuresMatrix
                }
            });
    }
    const handleEnsemClick = async (ensembleName) => {
        const ensembleIndex = parseInt(ensembleName.charAt(ensembleName.length - 1), 10) - 1;
        // then the details like Hispanic population vs black population
        document.body.style.cursor = 'wait';
        const clusterCoords = await getClustCoords(stateID, ensembleIndex);
        // pass list of cluster in said ensemble
        const clusterSum = await getEnsemble(stateID, ensembleIndex);
        navigate("/ClusterAnalysis",
            {
                state: {
                    stateID: stateID,
                    headerText: headerText,
                    currentDistrPlan: currentDistrPlan,
                    clusterCoords: clusterCoords,
                    clusterScatterWidth: clusterScatterWidth,
                    clusterScatterHeight: clusterScatterHeight,
                    clusterSum: clusterSum,
                    ensembleName: ensembleName,
                    ensembleIndex: ensembleIndex,
                    //  matrix soon to have 3 key:value pairs for the 3 distances (now its just data)
                    //  .data=array[ixi]

                }
            });
    }

    return (
        <div className="table-container" >
            <table style={{ padding: '10px' }}>
                <thead>
                    <tr>
                        <th>Ensemble Name</th>
                        <th>Ensemble Size</th>
                        <th>Cluster Count</th>
                        <th>Cluster Analysis</th>
                        <th>Distance Measures</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedEnsembleDetails.map((row, index) => (
                        <tr key={index}>
                            <td>{row.name}</td>
                            <td>{row.ensemblesize}</td>
                            <td>{row.clustercount}</td>
                            <td>
                                <button onClick={() => handleEnsemClick(row.name)}>
                                    {`CA-${index + 1}`}
                                </button>
                            </td>
                            <td>
                                <button onClick={() => handleDistanceMeasClick(row.name)}>
                                    {`DM-${index + 1}`}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div style={{ padding: '10px' }}>
                <button onClick={handlePrevClick} disabled={currentPage === 1}>
                    Prev
                </button>
                <span style={{ padding: '5px' }}>{`Page ${currentPage}`}</span>
                <button onClick={handleNextClick} disabled={currentPage === Math.ceil(ensembleDetails.length / rowsPerPage)}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default EnsembleTable;
