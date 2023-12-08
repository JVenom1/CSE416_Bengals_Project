import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../api/posts.js"
const ClustSumTable = ({ ensembleName, clusterSum }) => {



    const keys = Object.keys(clusterSum);

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Ensemble</th>
                        {keys.map((key) => (
                            <th key={key}>{key}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{ensembleName}</td>
                        {keys.map((key) => (
                            <td key={key}>{clusterSum[key]}</td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
export default ClustSumTable;
