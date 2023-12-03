import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as d3 from "d3";

const ScatterPlot = ({
  ensemble,
  stateID,
  clusterScatterWidth,
  clusterScatterHeight,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const svgRef = useRef();
  const margin = { top: 40, right: 30, bottom: 250, left: 30 };

  useEffect(() => {
    if (!ensemble) return;
    const width = clusterScatterWidth - margin.left - margin.right;
    const height = clusterScatterHeight - margin.top - margin.bottom;
    const mainTitle = "Scatter Plot";
    const xAxTitle = "x-axis";
    const yAxTitle = "y-axis";

    const svg = d3
      .select(svgRef.current)
      .attr("width", clusterScatterWidth)
      .attr("height", clusterScatterHeight)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(ensemble.clusterCoordinate.x)])
      .range([0, width]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(ensemble.clusterCoordinate.y)])
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
      .data(ensemble.clusterCoordinate.x)
      .enter()
      .append("circle")
      .attr("cx", (d, i) => xScale(d))
      .attr("cy", (d, i) => yScale(ensemble.clusterCoordinate.y[i]))
      .attr("r", (d, i) => ensemble.clusterCoordinate.radius[i])
      .attr("fill", () => getRandomOrangeColor())
      .on("click", (event) => handlePointClick());
  }, [ensemble, clusterScatterWidth, clusterScatterHeight]);

  const handlePointClick = (i) => {
    i = 0;
    // check if theres data
    if (ensemble.clusterDetails[i]) {
      navigate("/ClusterAnalysis", {
        state: {
          currCluster: {
            cluster: ensemble.cluster[i],
            clusterDetails: ensemble.clusterDetails[i],
            clusterCoordinate: {
              x: ensemble.clusterCoordinate.x[i],
              y: ensemble.clusterCoordinate.y[i],
              radius: ensemble.clusterCoordinate.radius[i],
            },
            clusterAssociationCoordinate: {
              optimalTransport:
                ensemble.clusterAssociationCoordinate.optimalTransport,
              hammingDistance:
                ensemble.clusterAssociationCoordinate.hammingDistance,
              totalVariation:
                ensemble.clusterAssociationCoordinate.totalVariation,
            },
            distanceMeasure: {
              optimalTransport: ensemble.distanceMeasure.optimalTransport,
              hammingDistance: ensemble.distanceMeasure.hammingDistance,
              totalVariation: ensemble.distanceMeasure.totalVariation,
            },
          },
          stateID: stateID,
        },
      });
    } else {
      alert("No Data");
    }
  };

  const getRandomOrangeColor = () => {
    const randomShade = Math.floor(Math.random() * 255);
    return `rgb(255, ${randomShade}, 0)`;
  };

  return <svg ref={svgRef}></svg>;
};

export default ScatterPlot;