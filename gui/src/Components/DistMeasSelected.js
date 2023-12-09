import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import "../App.css";
import "leaflet/dist/leaflet.css";
import { useLocation, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import mNum from "../Helpers/mNum.js";
import hammingDistanceArray from "../Data/DistanceMeasure5plans/hamming_distance.json";
import optimalTransportArray from "../Data/DistanceMeasure5plans/optimal_transport.json";
import totalVariationArray from "../Data/DistanceMeasure5plans/total_variation.json";

const DistMeasPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const stateID = location.state.stateID;
  const currentDistrictPlan = location.state.currentDistrictPlan;
  const mapMaxBounds = mNum.stateZoomBounds.stateID;
  const mapCenter = mNum.stateCenter[stateID].latlng;
  const ensembleIndex = location.state.buttonIndex;
  const goToHomePage = () => {
    navigate("/");
  };
  useEffect(() => {
    changeMapSizeXbyY("100%", "30vw");
  }, []);
  const changeMapSizeXbyY = (height = "100%", width = "50vw") => {
    const leafletContainer = document.querySelector(".leaflet-container");
    leafletContainer.style.width = width;
    leafletContainer.style.height = height;
  };
  // gets ensemble data
  const ensemble = location.state.ensemble;
  const svgRef = useRef(null);
  const [selectedMeasure, setSelectedMeasure] = useState("hamming_distance");

  const distanceMatrixData = {
    hamming_distance: hammingDistanceArray,
    optimal_transport: optimalTransportArray,
    total_variation: totalVariationArray,
  };

  const handleChangeMeasure = (measure) => {
    setSelectedMeasure(measure);
    updateScatterPlot(measure);
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
  const updateScatterPlot = (measure) => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    // Choose the appropriate xCoords based on the selected measure
    const xCoords =
      measure === "hamming_distance"
        ? ensemble[ensembleIndex].clusterAssociationCoordinate.hammingDistance
            .Coords.x
        : measure === "optimal_transport"
        ? ensemble[ensembleIndex].clusterAssociationCoordinate.optimalTransport
            .Coords.x
        : ensemble[ensembleIndex].clusterAssociationCoordinate.totalVariation
            .Coords.x;

    // Choose the appropriate yCoords based on the selected measure
    const yCoords =
      measure === "hamming_distance"
        ? ensemble[ensembleIndex].clusterAssociationCoordinate.hammingDistance
            .Coords.y
        : measure === "optimal_transport"
        ? ensemble[ensembleIndex].clusterAssociationCoordinate.optimalTransport
            .Coords.y
        : ensemble[ensembleIndex].clusterAssociationCoordinate.totalVariation
            .Coords.y;

    const data = xCoords.map((x, index) => ({
      ensembleSize: yCoords[index],
      clusterNumber: x,
      // Additional properties if needed
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
  };

  useEffect(() => {
    updateScatterPlot(selectedMeasure);
  }, [ensemble, ensembleIndex, selectedMeasure, svgRef]);

  return (
    <>
      <div className="mapWrapper">
        <MapContainer
          center={mapCenter}
          zoom={7}
          minZoom={7}
          maxBounds={mapMaxBounds}
          maxZoom={7}
          dragging={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <GeoJSON data={currentDistrictPlan} />
        </MapContainer>
        <button className="home-button" onClick={goToHomePage}>
          Home
        </button>

        <div className="main-container">
          <div className="matrix-container">
            <div className="dropdown-container">
              <label htmlFor="distanceMeasure">
                Choose a distance measure:
              </label>
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
        </div>
      </div>
    </>
  );
};

export default DistMeasPage;
