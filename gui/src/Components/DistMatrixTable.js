import React, { useState, useEffect } from "react";
import Defaults from "../Helpers/Defaults.js";

const DistMatrixTable = ({ matrixList }) => {
  document.body.style.cursor = "default";
  // const location = useLocation();
  // const matrixList = location.state.matrixList;
  // const stateID = location.state.stateID;
  // const currentDistrPlan = location.state.currentDistrPlan;
  // const distType = location.state.distType;
  // const headerText = location.state.headerText + " > DistanceMatrix";
  console.log(matrixList);

  const convertedObject2DArr = {};
  useEffect(() => {
    Defaults.changeMapSizeXbyY("100%", "50vw");
  }, []);
  for (const key in matrixList) {
    if (matrixList.hasOwnProperty(key)) {
      convertedObject2DArr[key] = matrixList[key].map((obj) => obj.item);
    }
  }
  // matrixList = { "key1": [[0, 1, 2], [0, 1, 2], [0, 1, 2]], "key2": [[9999, 1, 2], [0, 1, 2], [0, 1, 2]] }

  const [selectedKey, setSelectedKey] = useState(
    Object.keys(convertedObject2DArr)[0]
  );

  const handleSelectChange = (event) => {
    setSelectedKey(event.target.value);
  };

  const selectedMatrix = convertedObject2DArr[selectedKey];
  const numCols = selectedMatrix[0].length;

  // const geoData = <GeoJSON data={currentDistrPlan} />;
  // const center = Defaults.stateData.center[stateID].latlng;
  // const maxBound = Defaults.stateData.maxBound[stateID];
  // const zoom = 7;
  return (
    <>
      <table border="1">
        <thead>
          <tr>
            <th></th>
            {[...Array(numCols)].map((_, colIndex) => (
              <th key={colIndex}>P{colIndex + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {selectedMatrix.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <th>P{rowIndex + 1}</th>
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
    </>
  );
};

export default DistMatrixTable;
