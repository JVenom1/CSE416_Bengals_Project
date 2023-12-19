// Import necessary libraries
import { useEffect, useRef } from "react";
import "../CSS/App.css";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";
import * as d3 from "d3";
import api from "../api/posts.js";

const ClusterScatter = ({
  _selectedDets,
  avgPlansHD,
  avgPlansOP,
  _stateID,
  _currentDistrPlan,
  _clusterCoords,
  _clusterScatterWidth,
  _clusterScatterHeight,
  _ensembleIndex,
  _headerText,
}) => {
  // Ensemble CLicked
  const navigate = useNavigate();
  const selectedDets = _selectedDets;
  const stateID = _stateID;
  const headerText = _headerText;
  const currentDistrPlan = _currentDistrPlan;
  const coords = _clusterCoords;
  const ensembleIndex = _ensembleIndex;
  const margin = { top: 100, right: 30, bottom: 290, left: -70 };
  const width = _clusterScatterWidth - margin.left - margin.right + 100;
  const height = _clusterScatterHeight - margin.top - margin.bottom + 200;
  const mainTitle = "Cluster MDS Scatterplot";
  const xAxTitle = "Dimension 1";
  const yAxTitle = "Dimension 2";
  const svgRef = useRef();

  // Use useEffect to handle side effects when the component mounts
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    const xScale = d3
      .scaleLinear()
      .domain([d3.min(coords.x) * 1.2, d3.max(coords.x) * 1.2])
      .range([margin.left, width + margin.left]);

    const yScale = d3
      .scaleLinear()
      .domain([d3.min(coords.y) * 1.2, d3.max(coords.y) * 1.2])
      .range([height + margin.top, margin.top]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    // Add X Axis
    svg
      .append("g")
      .attr("transform", `translate(0, ${height + margin.top})`)

      .call(xAxis)
      .selectAll("text") // Select only the tick text elements
      .style("font-size", "1.5em"); // Adjust the font size as needed

    // Add Y Axis
    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(yAxis)
      .selectAll("text") // Select only the tick text elements
      .style("font-size", "1.5em"); // Adjust the font size as needed

    // Add Title
    svg
      .append("text")
      .attr("x", width / 2 + margin.left)
      .attr("y", margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "2.5em")
      .text(mainTitle);

    // Add X Axis Label
    svg
      .append("text")
      .attr("x", width / 2 + margin.left)
      .attr("y", height + margin.top + margin.bottom - 230)
      .attr("text-anchor", "middle")
      .style("dy", "1.5em") // Adjust the vertical offset as needed
      .style("font-size", "1.8em")
      .text(xAxTitle);

    // Add Y Axis Label
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2 + margin.top - 150)
      .attr("y", margin.left - 50)
      .attr("text-anchor", "middle")
      .style("font-size", "1.8em")
      .text(yAxTitle);
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    // const legend = svg
    //   .append("g")
    //   .attr("transform", `translate(${width + margin.left}, ${margin.top})`);

    // legend
    //   .append("circle")
    //   .attr("cx", 10)
    //   .attr("cy", 10)
    //   .attr("r", 6)
    //   .style("fill", "green");

    // legend
    //   .append("circle")
    //   .attr("cx", 10)
    //   .attr("cy", 30)
    //   .attr("r", 6)
    //   .style("fill", "grey");

    // legend
    //   .append("text")
    //   .attr("x", 25)
    //   .attr("y", 10)
    //   .text("Clickable")
    //   .style("font-size", "1.2em")
    //   .attr("alignment-baseline", "middle");

    // legend
    //   .append("text")
    //   .attr("x", 25)
    //   .attr("y", 30)
    //   .text("Not Clickable")
    //   .style("font-size", "1.2em")
    //   .attr("alignment-baseline", "middle");
    // Add Circles
    svg
      .selectAll("circle")
      .data(coords.x)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d))
      .attr("cy", (d, i) => yScale(coords.y[i]))
      .attr("x", (d) => d)
      .attr("y", (d, i) => coords.y[i])
      .attr("r", (d, i) => coords.radius[i])
      .attr("clustIndex", (d, i) => i)
      .on("mouseover", function (event, d, i) {
        const x = parseFloat(event.target.getAttribute("x")).toFixed(3);
        const y = parseFloat(event.target.getAttribute("y")).toFixed(3);

        const clusterSize =
          selectedDets[parseInt(event.target.getAttribute("clustIndex"))]
            .plancount;
        const name = `Cluster ${
          parseInt(event.target.getAttribute("clustIndex")) + 1
        }`;
        tooltip.transition().duration(200).style("opacity", 0.9);
        tooltip
          .html(`${name} (Size:${clusterSize}): Coords(${x}, ${y}) `)
          .style("left", event.pageX + "px")
          .style("top", event.pageY - 28 + "px");
        // Change cursor to pointer on hover
        d3.select(this).style("cursor", "pointer");
      })
      .on("mouseout", function () {
        // Reset cursor on mouseout
        tooltip.transition().duration(200).style("opacity", 0);
        d3.select(this).style("cursor", "default");
      })
      .on("click", (event) => {
        tooltip.transition().duration(200).style("opacity", 0);
        handleScatterPlotClick(event);
      })
      .style("fill", "green");
  });
  const getDistrSum = async (stateID) => {
    try {
      const response = await api.get(`/${stateID}/state_details`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const getCoordsHd = async (stateID, ensembleIndex, clusterIndex) => {
    try {
      const response = await api.get(
        `/${stateID}/${ensembleIndex}/${clusterIndex}/plan_coordinates`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getAllDistrictPlansHd = async (
    stateID,
    ensembleIndex,
    clusterIndex
  ) => {
    try {
      const response = await api.get(
        `/${stateID}/${ensembleIndex}/${clusterIndex}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const getCoordsOp = async (stateID, ensembleIndex, clusterIndex) => {
    try {
      const response = await api.get(
        `/${stateID}/${ensembleIndex}/${clusterIndex}/plan_coordinatesop`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getAllDistrictPlansOp = async (
    stateID,
    ensembleIndex,
    clusterIndex
  ) => {
    try {
      const response = await api.get(
        `/${stateID}/${ensembleIndex}/${clusterIndex}/op`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const getAvgPlanHD = async (stateID, ensembleIndex, planNumber) => {
    try {
      const response = await api.get(
        `/${stateID}/${ensembleIndex}/${planNumber}/district_plan`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  const getAvgPlanOP = async (stateID, ensembleIndex, planNumber) => {
    try {
      const response = await api.get(
        `/${stateID}/${ensembleIndex}/${planNumber}/district_plan`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  const handleScatterPlotClick = async (event) => {
    // assuming x[i] where i is cluster index
    const clusterIndex = event.target.getAttribute("clustIndex");
    try {
      document.body.style.cursor = "wait";
      const coordsHd = await getCoordsHd(stateID, ensembleIndex, clusterIndex);
      const districtPlanListHd = await getAllDistrictPlansHd(
        stateID,
        ensembleIndex,
        clusterIndex
      );
      const coordsOp = await getCoordsOp(stateID, ensembleIndex, clusterIndex);
      const districtPlanListOp = await getAllDistrictPlansOp(
        stateID,
        ensembleIndex,
        clusterIndex
      );
      const distrInitalSummary = await getDistrSum(stateID);
      const avgPlanHD = await getAvgPlanHD(
        stateID,
        ensembleIndex,
        avgPlansHD.plans[clusterIndex]
      );
      const avgPlanOP = await getAvgPlanOP(
        stateID,
        ensembleIndex,
        avgPlansOP.plans[clusterIndex]
      );

      navigate("/DistrictAnalysis", {
        state: {
          stateID: stateID,
          // currentDistrPlan: currentDistrPlan, // comment
          avgDitrPlanHD: avgPlanHD,
          avgDitrPlanOP: avgPlanOP,
          clusterIndex: clusterIndex,
          ensembleIndex: ensembleIndex,
          // .availibility .x .y
          districtCoordsHd: coordsHd,
          districtCoordsOp: coordsOp,
          // [i].availability .averageoppertunitydistrictcount .name .split
          districtPlanListHd: districtPlanListHd,
          districtPlanListOp: districtPlanListOp,

          headerText: headerText,
          distrInitalSummary: distrInitalSummary,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${_clusterScatterWidth + 30} ${
          _clusterScatterHeight + 30
        }`}
        preserveAspectRatio="xMidYMid meet"
        width="100%"
        height="100%"
      ></svg>
    </>
  );
};

export default ClusterScatter;
