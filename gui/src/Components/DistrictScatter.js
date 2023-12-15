import "../CSS/App.css";
import * as d3 from "d3";
import { useEffect, useRef } from "react";
import api from "../api/posts.js";
import test from "../Data/DistrictPlans/WI.json";
const DistrictScatter = ({
  _stateID,
  _ensembleIndex,
  _clusterIndex,
  _width,
  _height,
  _coords,
  _districtPlans,
  _setSelectedPlan,
  _selectedPlan,
  _oldPlan,
}) => {
  // api.get(`/${stateID}/${ensembleIndex}/${clusterIndex}/${districtIndex}`)
  const oldPlan = _oldPlan;
  const stateID = _stateID;
  const ensembleIndex = _ensembleIndex;
  const clusterIndex = _clusterIndex;
  const setSelectedPlan = _setSelectedPlan;
  const selectedPlan = _selectedPlan;

  // const districtPlans = _districtPlans;
  const margin = { top: 40, right: 30, bottom: 250, left: 50 };
  const coords = _coords;
  const width = _width - margin.left - margin.right;
  const height = _height - margin.top - margin.bottom - 75;
  const mainTitle = "District Scatter";
  const xAxTitle = "Measure 1";
  const yAxTitle = "Measure 2";
  const svgRef = useRef();
  // Use useEffect to handle side effects when the component mounts

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const xScale = d3
      .scaleLinear()
      .domain([d3.min(coords.x) - 0.05, d3.max(coords.x) + 0.05])
      .range([margin.left, width + margin.left]);

    const yScale = d3
      .scaleLinear()
      .domain([d3.min(coords.y) - 0.05, d3.max(coords.y) + 0.05])
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
      .style("font-size", "1.5em")
      .text(mainTitle);

    // Add X Axis Label
    svg
      .append("text")
      .attr("x", width / 2 + margin.left)
      .attr("y", height + margin.top + margin.bottom - 200)
      .attr("text-anchor", "middle")
      .style("dy", "1.5em") // Adjust the vertical offset as needed
      .text(xAxTitle);

    // Add Y Axis Label
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2 + margin.top - 70)
      .attr("y", margin.left - 35)
      .attr("text-anchor", "middle")
      .text(yAxTitle);

    // Add Circles
    svg
      .selectAll("circle")
      .data(coords.x)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d))
      .attr("cy", (d, i) => yScale(coords.y[i]))
      .attr("r", () => 5)
      .attr("available", (d, i) => coords.availibility[i])
      .attr("district-index", (d, i) => i)
      .on("mouseover", function () {
        // Change cursor to pointer on hover
        if (d3.select(this).attr("available") === "true") {
          d3.select(this).style("cursor", "pointer");
        } else {
          d3.select(this).style("cursor", "not-allowed");
        }
      })
      .on("mouseout", function () {
        // Reset cursor on mouseout
        d3.select(this).style("cursor", "default");
      })
      .on("click", (event) => handleScatterPlotClick(event))
      .style("fill", (d, i) => (coords.availibility[i] ? "green" : "grey"));
  });

  const handleScatterPlotClick = async (e) => {
    console.log(e.target.getAttribute("available"));
    if (e.target.getAttribute("available") === "true") {
      if (oldPlan === null) {
        console.log("clicked");
        if (e.target.getAttribute("available")) {
          try {
            // const response = await api.get(`/2/0/0/1`);
            const districtIndex = e.target.getAttribute("district-index");
            // scatterClickedIndex(districtIndex);
            // const response = await api.get(
            //   `/${stateID}/${ensembleIndex}/${clusterIndex}/${districtIndex}`
            // );
            // const plan = response.data;
            // setSelectedPlan(plan);

            setSelectedPlan(test);
          } catch (err) {
            console.log(err);
          }
        }
      } else {
        setSelectedPlan(null);
      }
    } else {
      // alert("No Data Click A Green Dot");
    }
  };
  return (
    <>
      <svg
        ref={svgRef}
        width={width + margin.left + margin.right}
        height={height + margin.top + margin.bottom - 190}
      ></svg>
    </>
  );
};

export default DistrictScatter;
