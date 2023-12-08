// Import necessary libraries
import { useState, useEffect, useRef } from "react";
import "../App.css";
import "leaflet/dist/leaflet.css";
import { useLocation } from "react-router-dom";
import Header from "./Header.js";
import DefaultDistrMap from "./DefaultDistrMap.js";
import * as d3 from "d3";

const ClusterScatter = ({ _stateID, _currentDistrPlan, _clusterCoords, _clusterScatterWidth, _clusterScatterHeight }) => {
  // Ensemble CLicked
  const stateID = _stateID;
  const currentDistrPlan = _currentDistrPlan;
  const coords = _clusterCoords;
  const margin = { top: 40, right: 30, bottom: 250, left: 50 };
  const width = _clusterScatterWidth - margin.left - margin.right;;
  const height = _clusterScatterHeight - margin.top - margin.bottom;
  const mainTitle = "Cluster Scatter";
  const xAxTitle = "Measure 1";
  const yAxTitle = "Measure 2";
  const svgRef = useRef();

  // Use useEffect to handle side effects when the component mounts
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(coords.x)])
      .range([margin.left, width + margin.left]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(coords.y)])
      .range([height + margin.top, margin.top]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    // Add X Axis
    svg
      .append('g')
      .attr('transform', `translate(0, ${height + margin.top})`)
      .call(xAxis);

    // Add Y Axis
    svg
      .append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(yAxis);

    // Add Title
    svg
      .append('text')
      .attr('x', width / 2 + margin.left)
      .attr('y', margin.top / 2)
      .attr('text-anchor', 'middle')
      .style('font-size', '1.5em')
      .text(mainTitle);

    // Add X Axis Label
    svg
      .append('text')
      .attr('x', width / 2 + margin.left)
      .attr('y', height + margin.top + margin.bottom - 200)
      .attr('text-anchor', 'middle')
      .style('dy', '1.5em')  // Adjust the vertical offset as needed
      .text(xAxTitle);


    // Add Y Axis Label
    svg
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -height / 2 + margin.top)
      .attr('y', margin.left - 30)
      .attr('text-anchor', 'middle')
      .text(yAxTitle);

    // Add Circles
    svg
      .selectAll('circle')
      .data(coords.x)
      .enter()
      .append('circle')
      .attr('cx', (d) => xScale(d))
      .attr('cy', (d, i) => yScale(coords.y[i]))
      .attr('r', (d, i) => coords.radius[i])
      .attr('clustIndex', (d, i) => i)
      .on("click", (event) => handleScatterPlotClick(event))
      .style('fill', 'green');

  }, [width, height, margin, xAxTitle, yAxTitle, mainTitle]);


  const handleScatterPlotClick = async (event) => {
    // assuming x[i] where i is cluster index
    let clusterIndex = event.target.getAttribute("clustIndex");
    alert(`point ${clusterIndex} clicked`)
    try {
      // navigate('/DistrictCompare', { state: { clusterIndex: clusterIndex } });
    } catch (error) {

    }

  };
  return (
    <>
      {/* <svg ref={svgRef} viewBox={`0 0 ${width} ${height}`}></svg> */}
      {/* <div className="clustScatContainer"> */}
      <svg ref={svgRef} width={width + margin.left + margin.right} height={height + margin.top + margin.bottom}></svg>

    </>);
};

// Export the ClusterAnalysis component
export default ClusterScatter;
