import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const DistrictScatter = ({ data }) => {
  const chartRef = useRef();

  useEffect(() => {
    if (!data) return;

    const margin = { top: 40, right: 30, bottom: 80, left: 80 }; // Adjust margins as needed
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Create scales with switched axes
    const xScale = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([0, width]);
    const yScale = d3.scaleLinear().domain([0, 1]).range([height, 0]);

    // Create the scatter plot
    const svg = d3.select(chartRef.current);

    svg.selectAll("*").remove(); // Clear previous content

    svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create circles for each data point
    for (let i = 0; i < data.length; i++) {
      svg
        .append("circle")
        .attr("cx", xScale(i))
        .attr("cy", yScale(data[i][0]))
        .attr("r", 5)
        .style("fill", "steelblue");
    }

    // Add axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg.append("g").attr("transform", `translate(0, ${height})`).call(xAxis);

    svg.append("g").call(yAxis);

    // Add axis labels
    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("transform", `translate(-50,${height / 2})rotate(-90)`)
      .text("Distances");

    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("transform", `translate(${width / 2},${height + 50})`)
      .text("Districts");
  }, [data]);

  return <svg ref={chartRef} />;
};

export default DistrictScatter;
