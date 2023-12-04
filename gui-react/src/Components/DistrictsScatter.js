// DistrictsScatter.js

import React, { useState, useEffect } from "react";
import * as d3 from "d3";

const DistrictsScatter = ({ data, onClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const districtsPerPage = 4;

  const chartRef = React.useRef();

  useEffect(() => {
    if (!data) return;

    const start = (currentPage - 1) * districtsPerPage;
    const end = start + districtsPerPage;

    const paginatedData = data.slice(start, end);

    const margin = { top: 40, right: 30, bottom: 80, left: 80 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const xScale = d3
      .scaleLinear()
      .domain([0, paginatedData.length - 1])
      .range([0, width]);
    const yScale = d3.scaleLinear().domain([0, 1]).range([height, 0]);

    const svg = d3.select(chartRef.current);

    svg.selectAll("*").remove(); // Clear previous content

    svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create circles for each data point
    for (let i = 0; i < paginatedData.length; i++) {
      svg
        .append("circle")
        .attr("cx", xScale(i))
        .attr("cy", yScale(paginatedData[i][0]))
        .attr("r", 5)
        .style("fill", "steelblue")
        .on("click", () => onClick(start + i)); // Handle click with the correct index
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

    // Render pagination buttons
    renderPaginationButtons();
  }, [data, currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const renderPaginationButtons = () => {
    const totalPages = Math.ceil(data.length / districtsPerPage);

    return (
      <div>
        {Array.from({ length: totalPages }).map((_, index) => (
          <button key={index} onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    );
  };

  return <svg ref={chartRef} />;
};

export default DistrictsScatter;
