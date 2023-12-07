import React, { useState } from 'react';

const EnsembleTable = ({ ensembleDetails, ensembleTableWidth, ensembleTableHeight }) => {
    const rowsPerPage = 6; // Number of rows to display per page
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
    const handleEnsemClick = (e) => {
        alert("clicked" + e);
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
                            <td onClick={() => handleEnsemClick(row.name)} style={{ cursor: 'pointer' }}>{row.name}</td>
                            <td>{row.ensemblesize}</td>
                            <td>{row.clustercount}</td>
                        </tr>
                    ))}
                </tbody>
            </table >

            <div>
                <button onClick={handlePrevClick} disabled={currentPage === 1}>
                    Prev
                </button>
                <span>{`Page ${currentPage}`}</span>
                <button onClick={handleNextClick} disabled={currentPage === Math.ceil(ensembleDetails.length / rowsPerPage)}>
                    Next
                </button>
            </div>
        </div >
    );
};

export default EnsembleTable;
