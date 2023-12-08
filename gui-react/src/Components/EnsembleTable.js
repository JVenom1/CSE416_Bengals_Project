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
    // const getEnsemble = async (stateID, index) => {
    //     try {
    //         const response = api.get(`/${stateID}/${index}`);
    //         const ensemble = response.data;
    //         return ensemble;
    //     } catch (err) {
    //         console.log(err)
    //         return null;
    //     }
    // }
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
    const handleEnsemClick = async (e) => {
        const ensembleIndex = parseInt(e.charAt(e.length - 1), 10) - 1;
        // then the details like Hispanic population vs black population
        const clusterCoords = await getClustCoords(stateID, ensembleIndex);
        // pass list of cluster in said ensemble
        // const clusterList = await getEnsemble(stateID, ensembleIndex);
        navigate("/ClusterScatter",
            {
                state: {
                    stateID: stateID,
                    headerText: headerText,
                    currentDistrPlan: currentDistrPlan,
                    clusterCoords: clusterCoords,
                    clusterScatterWidth: clusterScatterWidth,
                    clusterScatterHeight: clusterScatterHeight,
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
