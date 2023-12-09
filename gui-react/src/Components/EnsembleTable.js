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
    const handleEnsemClick = async (ensembleName) => {
        console.log(ensembleName)
        const ensembleIndex = parseInt(ensembleName.charAt(ensembleName.length - 1), 10) - 1;
        // then the details like Hispanic population vs black population
        const clusterCoords = await getClustCoords(stateID, ensembleIndex);
        // pass list of cluster in said ensemble
        const clusterSum = await getEnsemble(stateID, ensembleIndex);
        const allDistanceMeasuresMatrix = await getAllDistanceMeasures(stateID, ensembleIndex);
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
                    distanceMatrixObj: allDistanceMeasuresMatrix,
                }
            });
    }

    return (
        <div className="table-container" >
            <table>
                <thead>
                    <tr>
                        <th>Ensemble Name</th>
                        <th>Ensemble Size</th>
                        <th>Cluster Count</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedEnsembleDetails.map((row, index) => (
                        <tr key={index}>
                            <td className='ensemble-button' onClick={() => handleEnsemClick(row.name)}>{row.name}</td>
                            <td>{row.ensemblesize}</td>
                            <td>{row.clustercount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div>
                <button onClick={handlePrevClick} disabled={currentPage === 1}>
                    Prev
                </button>
                <span>{`Page ${currentPage}`}</span>
                <button onClick={handleNextClick} disabled={currentPage === Math.ceil(ensembleDetails.length / rowsPerPage)}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default EnsembleTable;
