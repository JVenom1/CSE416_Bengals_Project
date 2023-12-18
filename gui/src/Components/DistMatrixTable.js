import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import Defaults from "../Helpers/Defaults.js";

const DistMatrixTable = ({ matrixList }) => {
  const svgRef = useRef(null);
  const colorScale = d3.scaleSequential(d3.interpolateViridis);

  useEffect(() => {
    Defaults.changeMapSizeXbyY("100%", "50vw");
  }, []);

  const convertedObject2DArr = {};
  for (const key in matrixList) {
    if (matrixList.hasOwnProperty(key)) {
      convertedObject2DArr[key] = matrixList[key].map((obj) => obj.item);
    }
  }

  const [selectedKey, setSelectedKey] = useState(
    Object.keys(convertedObject2DArr)[0]
  );

  const handleSelectChange = (event) => {
    setSelectedKey(event.target.value);
  };

  const selectedMatrix = convertedObject2DArr[selectedKey];
  const numCols = selectedMatrix[0].length;

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const colorDomain = d3.extent(selectedMatrix.flat());
    colorScale.domain(colorDomain);

    svg.selectAll("*").remove();

    svg
      .selectAll("rect")
      .data(selectedMatrix.flat())
      .enter()
      .append("rect")
      .attr("x", (d, i) => (i % numCols) * 30)
      .attr("y", (d, i) => Math.floor(i / numCols) * 30)
      .attr("width", 30)
      .attr("height", 30)
      .attr("fill", (d) => colorScale(d));
  }, [selectedMatrix, numCols]);

  return (
    <>
      <svg ref={svgRef} />

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
