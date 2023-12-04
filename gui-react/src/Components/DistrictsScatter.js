import React, { useState, useEffect } from "react";
import * as d3 from "d3";

const DistrictsScatter = ({ data, onClick }) => {
  const [scatterData, setScatterData] = useState([]);

  useEffect(() => {
    // Format the data for the scatter plot
    const formattedData = data.x.map((x, index) => ({
      x,
      y: data.y[index],
      color: data.color[index],
    }));

    setScatterData(formattedData);
  }, [data]);

  useEffect(() => {
    // Create scatter plot when scatterData changes
    const width = 300; // Set the desired width of your scatter plot
    const height = 200; // Set the desired height of your scatter plot

    const svg = d3.select("#scatter-plot-container").select("svg");

    svg.selectAll("*").remove(); // Clear previous content

    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(scatterData, (d) => d.x)])
      .range([0, width]);
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(scatterData, (d) => d.y)])
      .range([height, 0]);

    // Create circles for each data point
    svg
      .selectAll("circle")
      .data(scatterData)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yScale(d.y))
      .attr("r", 5) // Set the radius of the circles
      .attr("fill", (d) => (d.color ? "green" : "grey")) // Color based on boolean value
      .attr("cursor", (d) => (d.color ? "pointer" : "default")) // Set cursor based on boolean value
      .on("click", (d) => (d.color ? onClick(d) : null)); // Trigger onClick if the point is clickable
  }, [scatterData, onClick]);

  return (
    <div id="scatter-plot-container">
      {/* SVG container for the scatter plot */}
      <svg width={300} height={200}></svg>
    </div>
  );
};

export default DistrictsScatter;
