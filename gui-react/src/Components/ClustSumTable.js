import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../api/posts.js"
const ClustSumTable = ({ ensembleDetails, ensembleTableWidth, ensembleTableHeight, stateID, currentDistrPlan }) => {
    // dont think ill need this .js
    const navigate = useNavigate();
    const rowsPerPage = 6;
    const [currentPage, setCurrentPage] = useState(1);

    const startIdx = (currentPage - 1) * rowsPerPage;
    const endIdx = startIdx + rowsPerPage;
    const displayedEnsembleDetails = ensembleDetails.slice(startIdx, endIdx);

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
    const getEnsemble = async (stateID, index) => {
        try {
            const response = api.get(`/${stateID}/${index}`);
            const ensemble = response.data;
            return ensemble;
        } catch (err) {
            console.log(err)
            return null;
        }
    }
    const getClustSum = async (stateID, index) => {
        try {
            const response = await api.get(`/${stateID}/${index}/inital_summary`);
            const clusterSummary = response.data;
            return clusterSummary;
        } catch (error) {
            console.log(error);
        }
    }
    const handleEnsemClick = async (e) => {
        const ensembleIndex = parseInt(e.charAt(e.length - 1), 10) - 1;
        // then the details like Hispanic population vs black population
        const clusterSummary = await getClustSum(stateID, ensembleIndex);
        // pass list of cluster in said ensemble
        const clusterList = await getEnsemble(stateID, ensembleIndex);
        navigate("/ClusterAnalysis", { state: { ensemble: clusterList, stateID: stateID, currentDistrPlan: currentDistrPlan, clusterSummary: clusterSummary } })
        alert("clicked" + e);
    }

    return (<></>);
}
export default ClustSumTable;
