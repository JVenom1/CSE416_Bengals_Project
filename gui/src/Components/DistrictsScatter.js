import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const DistrictsScatter = ({
  districtPlan,
  districtPlanCoordinate,
  distPlan2Setter,
}) => {
  const scatterRef = useRef(null);

  useEffect(() => {
    if (!districtPlan || !districtPlanCoordinate) return;

    d3.select(scatterRef.current).selectAll("*").remove();

    const margin = { top: 25, right: 40, bottom: 50, left: 50 };
    const width = 600 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const svg = d3
      .select(scatterRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const xScale = d3
      .scaleLinear()
      .domain([0, districtPlanCoordinate.x.length])
      .range([0, width]);
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(districtPlanCoordinate.y)])
      .range([height, 0]);

    svg
      .selectAll("circle")
      .data(districtPlanCoordinate.x)
      .enter()
      .append("circle")
      .attr("cx", (d, i) => xScale(i))
      .attr("cy", (d, i) => yScale(districtPlanCoordinate.y[i]))
      .attr("r", 5)
      .attr("fill", (d, i) =>
        districtPlanCoordinate.color[i] ? "green" : "grey"
      )
      .attr("data-value", (d, i) => i) // Assigning the index as a data attribute
      .on("click", (event) => handlePointClick(event));

    // Add X-axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale));

    // Add Y-axis
    svg.append("g").call(d3.axisLeft(yScale));

    // Optional: Add chart title and axis labels
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height + margin.top + 10)
      .style("text-anchor", "middle")
      .text("District Coords X");

    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - height / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("District Coords Y");

    return () => {
      svg.selectAll("*").remove();
    };
  }, [districtPlan, districtPlanCoordinate]);

  const handlePointClick = (event) => {
    const distrIndex = event.target.getAttribute("data-value");
    if (event.target.getAttribute("fill") === "green") {
      const selectedPlan = districtPlan[distrIndex].plan;
      distPlan2Setter(selectedPlan);
      console.log("Clicked on plan:", selectedPlan);
    }
  };

  return <div ref={scatterRef} className="scatter-plot"></div>;
};

export default DistrictsScatter;
