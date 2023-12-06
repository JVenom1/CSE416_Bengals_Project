import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as d3 from "d3";
import axios from "axios";
import { api } from "./HomePage";
const ScatterPlot = ({
  currEnsemble,
  stateID,
  currentDistrictPlan,
  clusterScatterWidth,
  clusterScatterHeight,
  ensembleIndex,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const svgRef = useRef();
  const margin = { top: 40, right: 30, bottom: 250, left: 80 };
  // const currentDistrictPlanThis = async (stateID) => {
  //   const response = await axios.get(`${api}/${stateID}/2020plan`);
  //   return response.data;
  // };
  // const currEnsemble = async (stateID) => {
  //   const response = await axios.get(`${api}/${stateID}/${ensembleIndex}`);
  //   return response.data;
  // };
  const currentDistrictPlanThis = currentDistrictPlan;
  useEffect(() => {
    if (!currEnsemble) return;
    const width = clusterScatterWidth - margin.left - margin.right;
    const height = clusterScatterHeight - margin.top - margin.bottom;
    const mainTitle = "Cluster Scatter";
    const xAxTitle = "African American Pop";
    const yAxTitle = "African American Pop > 50";

    const svg = d3
      .select(svgRef.current)
      .attr("width", clusterScatterWidth)
      .attr("height", clusterScatterHeight)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(currEnsemble.clusterCoordinate.x)])
      .range([0, width]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(currEnsemble.clusterCoordinate.y)])
      .range([height, 0]);

    // Add X-axis
    const xAxisGroup = svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale));

    // Add X-axis title
    svg
      .append("text")
      .attr("x", margin.left + width / 2) // Adjusted to consider left margin
      .attr("y", clusterScatterHeight - margin.bottom + 10) // Adjusted to consider bottom margin
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text(xAxTitle);

    // Add Y-axis
    svg.append("g").call(d3.axisLeft(yScale));

    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left)
      .attr("x", 0 - (margin.top + height / 2)) // Adjusted to consider top margin and center it vertically
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text(yAxTitle);

    // Add main title
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", -margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "20px")
      .style("text-decoration", "underline")
      .text(mainTitle);

    svg
      .selectAll("circle")
      .data(currEnsemble.clusterCoordinate.x)
      .enter()
      .append("circle")
      .attr("cx", (d, i) => xScale(d))
      .attr("cy", (d, i) => yScale(currEnsemble.clusterCoordinate.y[i]))
      .attr("r", (d, i) => currEnsemble.clusterCoordinate.radius[i])
      .attr("fill", () => selectOrangeColor())
      .attr("data-value", (d, i) => i) // Assigning the index as a data attribute
      .on("click", (event) => handlePointClick(event));
  }, [currEnsemble, clusterScatterWidth, clusterScatterHeight]);

  const handlePointClick = (e) => {
    let clusterPointIndex = e.target.getAttribute("data-value");
    clusterPointIndex = 0; //for testings
    // check if theres data
    navigate("/ClusterAnalysis", {
      state: {
        // removed not needed distance measures for this part
        currEnsemble: {
          cluster: currEnsemble.cluster[clusterPointIndex],
          clusterDetails: currEnsemble.clusterDetails[clusterPointIndex],
          clusterCoordinate: {
            x: currEnsemble.clusterCoordinate.x[clusterPointIndex],
            y: currEnsemble.clusterCoordinate.y[clusterPointIndex],
            radius: currEnsemble.clusterCoordinate.radius[clusterPointIndex],
          },
        },
        stateID: stateID,
        ensembleIndex: ensembleIndex,
        currentDistrictPlan: currentDistrictPlanThis,
      },
    });
  };

  const selectOrangeColor = () => {
    const randomShade = Math.floor(Math.random() * 255);
    return `rgb(238, 160, 3)`;
  };

  return <svg ref={svgRef}></svg>;
};

export default ScatterPlot;
