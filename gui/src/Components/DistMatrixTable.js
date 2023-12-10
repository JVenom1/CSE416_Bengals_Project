import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import DefaultDistrMap from './DefaultDistrMap';

const DistMatrixTable = () => {
    document.body.style.cursor = 'default';
    const location = useLocation();
    const matrixList = location.state.matrixList;
    const stateID = location.state.stateID;
    const currentDistrPlan = location.state.currentDistrPlan;
    const headerText = location.state.headerText + " > DistanceMatrix";
    const convertedObject2DArr = {};
    useEffect(() => {
        changeMapSizeXbyY("85%", "40vw");
    }, []);
    for (const key in matrixList) {
        if (matrixList.hasOwnProperty(key)) {
            convertedObject2DArr[key] = matrixList[key].map(obj => obj.item);
        }
    }
    const changeMapSizeXbyY = (height = "100%", width = "40vw") => {
        const leafletContainer = document.querySelector(".leaflet-container");
        leafletContainer.style.width = width;
        leafletContainer.style.height = height;
    };
    // matrixList = { "key1": [[0, 1, 2], [0, 1, 2], [0, 1, 2]], "key2": [[9999, 1, 2], [0, 1, 2], [0, 1, 2]] }

    const [selectedKey, setSelectedKey] = useState(Object.keys(convertedObject2DArr)[0]);

    const handleSelectChange = (event) => {
        setSelectedKey(event.target.value);
    };

    const selectedMatrix = convertedObject2DArr[selectedKey];
    const numCols = selectedMatrix[0].length;

    return (<>
        <div className="app-container">
            <Header headerText={headerText} />
            <div className="main-container">
                <div className="map-container">
                    <DefaultDistrMap stateID={stateID} currentDistrPlan={currentDistrPlan} />
                </div>
                <div className="controls-container">
                    <h1>Distance Matrix</h1>
                    <table border="1">
                        <thead>
                            <tr>
                                <th></th>
                                {[...Array(numCols)].map((_, colIndex) => (
                                    <th key={colIndex}>D{colIndex + 1}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {selectedMatrix.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    <th>D{rowIndex + 1}</th>
                                    {row.map((cell, colIndex) => (
                                        <td key={colIndex}>{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>


                    <select value={selectedKey} onChange={handleSelectChange}>
                        {Object.keys(convertedObject2DArr).map((key) => (
                            <option key={key} value={key}>
                                {key}
                            </option>
                        ))}
                    </select>

                </div>
            </div>
        </div>
    </>
    );
};

export default DistMatrixTable;
