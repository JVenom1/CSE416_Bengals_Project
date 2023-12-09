import React, { useState } from 'react';

const MatrixTable = ({ matrixList }) => {

    const convertedObject2DArr = {};

    for (const key in matrixList) {
        if (matrixList.hasOwnProperty(key)) {
            convertedObject2DArr[key] = matrixList[key].map(obj => obj.item);
        }
    }

    console.log(convertedObject2DArr);
    matrixList = { "key1": [[0, 1, 2], [0, 1, 2], [0, 1, 2]], "key2": [[9999, 1, 2], [0, 1, 2], [0, 1, 2]] }
    console.log(matrixList)

    const [selectedKey, setSelectedKey] = useState(Object.keys(convertedObject2DArr)[0]);

    const handleSelectChange = (event) => {
        setSelectedKey(event.target.value);
    };

    const selectedMatrix = convertedObject2DArr[selectedKey];
    const numCols = selectedMatrix[0].length;

    return (
        <div>
            <label>
                Select Matrix:
                <select value={selectedKey} onChange={handleSelectChange}>
                    {Object.keys(convertedObject2DArr).map((key) => (
                        <option key={key} value={key}>
                            {key}
                        </option>
                    ))}
                </select>
            </label>

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
        </div>
    );
};

export default MatrixTable;
