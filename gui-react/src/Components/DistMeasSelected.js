import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import "../App.css";
import "leaflet/dist/leaflet.css";
import { useLocation, useNavigate } from "react-router-dom";
import hammingDistanceArray from "../Data/DistanceMeasure5plans/hamming_distance.json";
import optimalTransportArray from "../Data/DistanceMeasure5plans/optimal_transport.json";

const DistMeasPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const goToHomePage = () => {
    navigate("/");
  };
  // gets ensemble data
  const ensemble = location.state.ensemble;
  const svgRef = useRef(null);
  const [selectedMeasure, setSelectedMeasure] = useState("hamming_distance");

  const distanceMatrixData = {
    hamming_distance: hammingDistanceArray,
    optimal_transport: optimalTransportArray,
    // total_variation: totalVariationArray,
  };

  const handleChangeMeasure = (measure) => {
    setSelectedMeasure(measure);
  };
  const MatrixDisplay = ({ matrix }) => {
    const numRows = matrix.length;
    const numCols = matrix[0]?.length || 0;

    // Generate row and column headers
    const rowHeaders = Array.from(
      { length: numRows },
      (_, index) => `D${index + 1}`
    );
    const colHeaders = Array.from(
      { length: numCols },
      (_, index) => `D${index + 1}`
    );

    // Render the matrix with row and column headers
    return (
      <div className="matrix-display">
        <div className="matrix-title">District x vs District y Distances</div>
        <table>
          <thead>
            <tr>
              <th></th>
              {colHeaders.map((colHeader, index) => (
                <th key={index}>{colHeader}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.keys(matrix).map((rowKey, rowIndex) => (
              <tr key={rowIndex}>
                <th>{rowHeaders[rowIndex]}</th>
                {matrix[rowKey].map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // Calculate data for scatter plot
    const data = ensemble.map((item, ensembleIndex) => ({
      ensembleSize: item.cluster.reduce(
        (total, cluster) => total + cluster.districtPlanCoordinate.x.length,
        0
      ),
      clusterNumber: ensembleIndex + 1,
    }));

    // Set up scales
    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.clusterNumber)])
      .range([50, 400]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.ensembleSize)])
      .range([300, 50]);

    // Create circles for each data point
    svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.clusterNumber))
      .attr("cy", (d) => yScale(d.ensembleSize))
      .attr("r", 5)
      .style("fill", "steelblue");

    // Connect all points with a line
    svg
      .append("path")
      .datum(data)
      .attr(
        "d",
        d3
          .line()
          .x((d) => xScale(d.clusterNumber))
          .y((d) => yScale(d.ensembleSize))
      )
      .attr("fill", "none")
      .attr("stroke", "steelblue");

    // Add axes
    svg
      .append("g")
      .attr("transform", `translate(0, 300)`)
      .call(d3.axisBottom(xScale));
    svg
      .append("g")
      .attr("transform", `translate(50, 0)`)
      .call(d3.axisLeft(yScale));

    // Add labels
    svg
      .append("text")
      .attr("x", 225)
      .attr("y", 340)
      .style("text-anchor", "middle")
      .text("Cluster Number");

    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -150)
      .attr("y", 15)
      .style("text-anchor", "middle")
      .text("Ensemble Size");

    // Add title
    svg
      .append("text")
      .attr("x", 250)
      .attr("y", 20)
      .style("text-anchor", "middle")
      .style("font-size", "18px")
      .text("Connected Scatter Plot");
  }, [ensemble]);

  return (
    <>
      <button onClick={goToHomePage}>Home</button>
      <div className="matrix-container">
        <div className="dropdown-container">
          <label htmlFor="distanceMeasure">Choose a distance measure:</label>
          <select
            id="distanceMeasure"
            value={selectedMeasure}
            onChange={(e) => handleChangeMeasure(e.target.value)}
          >
            <option value="hamming_distance">Hamming Distance</option>
            <option value="optimal_transport">Optimal Transport</option>
            <option value="total_variation">Total Variation</option>
          </select>
        </div>
        <div className="matrix-display">
          <MatrixDisplay matrix={distanceMatrixData[selectedMeasure]} />
        </div>
      </div>
      <svg ref={svgRef} width={500} height={400} />
    </>
  );
};

export default DistMeasPage;
