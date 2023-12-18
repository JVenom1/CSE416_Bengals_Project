import { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

const ClusterAssociationScatter = ({
  _coords,
  setSelectedOption,
  selectedOption,
  clusterScatterWidth,
  clusterScatterHeight,
}) => {
  const margin = { top: 70, right: 30, bottom: 250, left: 80 };
  const width = clusterScatterWidth - margin.left - margin.right;
  const height = clusterScatterHeight - margin.top - margin.bottom - 150;
  const mainTitle = "Ensemble vs Cluster";
  const xAxTitle = "Ensemble Size";
  const yAxTitle = "Cluster Count";
  const svgRef = useRef();
  const coords = _coords;
  const [selectedOptionInternal, setSelectedOptionInternal] =
    useState("Hamming Distance");

  useEffect(() => {
    setSelectedOption(selectedOptionInternal);
  }, [selectedOptionInternal, setSelectedOption]);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

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
      .append("g")
      .attr("transform", `translate(0, ${height + margin.top})`)
      .call(xAxis);

    // Add Y Axis
    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(yAxis);

    // Add Title
    svg
      .append("text")
      .attr("x", width / 2 + margin.left)
      .attr("y", margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "2.5em")
      .text(mainTitle);

    // const dropdown = svg
    //   .append("foreignObject")
    //   .attr("x", width / 2 + margin.left + 200) // Adjust the position as needed
    //   .attr("y", margin.top / 2 - 30) // Adjust the position as needed
    //   .attr("width", 200)
    //   .attr("height", 40)
    //   .append("xhtml:select")
    //   .on("change", (e) => handleChange(e));

    // dropdown
    //   .selectAll("option")
    //   .data(["Hamming Distance", "Optimal Transport"])
    //   .enter()
    //   .append("xhtml:option")
    //   .attr("value", (d) => d)
    //   .text((d) => (d === selectedOption ? `${d}` : d));

    // Add X Axis Label
    svg
      .append("text")
      .attr("x", width / 2 + margin.left)
      .attr("y", height + margin.top + margin.bottom - 200)
      .attr("text-anchor", "middle")
      .style("dy", "1.5em") // Adjust the vertical offset as needed
      .style("font-size", "1.2em")
      .text(xAxTitle);

    // Add Y Axis Label
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2 - margin.top)
      .attr("y", margin.left - 40)
      .attr("text-anchor", "middle")
      .style("font-size", "1.2em")
      .text(yAxTitle);

    // Add Circles
    svg
      .selectAll("circle")
      .data(coords.x)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d))
      .attr("cy", (d, i) => yScale(coords.y[i]))
      .attr("r", 5)
      .style("fill", "black");

    // Add Line
    const line = d3
      .line()
      .x((d, i) => xScale(coords.x[i]))
      .y((d, i) => yScale(d))
      .curve(d3.curveMonotoneX); // You can choose a different curve type if needed

    svg
      .append("path")
      .data([coords.y])
      .attr("d", line)
      .attr("fill", "none")
      .attr("stroke", "blue")
      .attr("stroke-width", 2);
  }, [
    _coords,
    clusterScatterWidth,
    clusterScatterHeight,
    width,
    height,
    selectedOptionInternal,
  ]);

  const handleChange = (e) => {
    // console.log("Selected value:", e.target.value);
    setSelectedOptionInternal(e.target.value);
    setSelectedOption(e.target.value);
  };
  return (
    <>
      <select value={selectedOptionInternal} onChange={handleChange}>
        <option value="Hamming Distance">Hamming Distance</option>
        <option value="Optimal Transport">Optimal Transport</option>
      </select>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${clusterScatterWidth} ${clusterScatterHeight}`}
        preserveAspectRatio="xMidYMid meet"
        width="100%"
        height="100%"
      ></svg>
    </>
  );
};

export default ClusterAssociationScatter;
