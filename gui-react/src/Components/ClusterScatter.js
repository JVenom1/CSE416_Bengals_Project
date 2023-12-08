// Import necessary libraries
import { useState, useEffect, useRef } from "react";
import "../App.css";
import "leaflet/dist/leaflet.css";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header.js";
import DefaultDistrMap from "./DefaultDistrMap.js";
import * as d3 from "d3";

const ClusterScatter = () => {
  // Ensemble CLicked
  const navigate = useNavigate();
  const location = useLocation();

  const stateID = location.state.stateID;
  const currentDistrPlan = location.state.currentDistrPlan;

  const coords = location.state.clusterCoords;
  const width = location.state.clusterScatterWidth;
  const height = location.state.clusterScatterHeight;
  const margin = { top: 40, right: 30, bottom: -250, left: 80 };
  const headerText = location.state.headerText + " > Cluster Scatter";
  const mainTitle = "Cluster Scatter";
  const xAxTitle = "Measure 1";
  const yAxTitle = "Measure 2";
  const svgRef = useRef();

  // Use useEffect to handle side effects when the component mounts
  useEffect(() => {
    changeMapSizeXbyY("85%", "40vw");

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(coords.x)])
      .range([margin.left, width - margin.left]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(coords.y)])
      .range([height / 2 + margin.top + 60, margin.top]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    // Add X Axis
    svg
      .append('g')
      .attr('transform', `translate(0, ${height / 2 + 3 * margin.top - 20})`)
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
      .attr('x', width / 2 + margin.left - 50)
      .attr('y', height + margin.top + margin.bottom)
      .attr('text-anchor', 'middle')
      .style('dy', '1.5em')  // Adjust the vertical offset as needed
      .text(xAxTitle);


    // Add Y Axis Label
    svg
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -height / 2 + margin.top + 60)
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


  //   // Function to change map size
  const changeMapSizeXbyY = (height = "100%", width = "40vw") => {
    const leafletContainer = document.querySelector(".leaflet-container");
    leafletContainer.style.width = width;
    leafletContainer.style.height = height;
  };
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
      <div className="app-container">
        <Header headerText={headerText} />
        <div className="main-container">
          <DefaultDistrMap stateID={stateID} currentDistrPlan={currentDistrPlan} />
          <div className="clustScatContainer">
            <svg ref={svgRef} width={width + margin.left + margin.right} height={height + margin.top + margin.bottom}></svg>
            {/* <svg ref={svgRef} viewBox={`0 0 ${width} ${height}`}></svg> */}
          </div>
        </div>
      </div>
    </>);
};

// Export the ClusterAnalysis component
export default ClusterScatter;
